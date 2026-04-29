// Telegram bot ↔ Anthropic Claude bridge
// Receives Telegram webhook → asks Claude → replies to user.

const ANTHROPIC_MODEL = "claude-sonnet-4-5";
const MAX_TOKENS = 1024;
const SYSTEM_PROMPT =
    "Ты помощник Руслана Асылгараева — лицензированного брокера премиальной недвижимости в Дубае и ОАЭ. " +
    "Отвечаешь на русском языке, кратко и по делу. " +
    "Если спрашивают о брокере, его услугах, рынке Дубая, инвестициях, Golden Visa, " +
    "налогах, рынке недвижимости ОАЭ — отвечай экспертно. На посторонние темы тоже " +
    "отвечай нормально, но напоминай о профиле брокера, если уместно.";

async function tg(method, body, token) {
    const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    return res.json();
}

async function askClaude(message, apiKey) {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
        body: JSON.stringify({
            model: ANTHROPIC_MODEL,
            max_tokens: MAX_TOKENS,
            system: SYSTEM_PROMPT,
            messages: [{ role: "user", content: message }],
        }),
    });

    const data = await res.json();
    if (!res.ok) {
        const msg = (data && data.error && data.error.message) || JSON.stringify(data);
        throw new Error(`Anthropic ${res.status}: ${msg}`);
    }
    const block = (data.content || []).find((b) => b.type === "text");
    return block ? block.text : "(пустой ответ)";
}

exports.handler = async (event) => {
    const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

    if (!TG_TOKEN || !ANTHROPIC_KEY) {
        return { statusCode: 500, body: "Missing env vars" };
    }

    if (event.httpMethod === "GET") {
        return {
            statusCode: 200,
            body: "ok — telegram bridge alive",
        };
    }

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method not allowed" };
    }

    let update;
    try {
        update = JSON.parse(event.body || "{}");
    } catch {
        return { statusCode: 400, body: "bad json" };
    }

    const msg = update.message || update.edited_message;
    if (!msg || !msg.chat) {
        return { statusCode: 200, body: "no message" };
    }

    const chatId = msg.chat.id;
    const text = (msg.text || "").trim();

    if (!text) {
        await tg("sendMessage", {
            chat_id: chatId,
            text: "Пришлите текстовое сообщение.",
        }, TG_TOKEN);
        return { statusCode: 200, body: "ok" };
    }

    if (text === "/start") {
        await tg("sendMessage", {
            chat_id: chatId,
            text:
                "Здравствуйте! Это бот Руслана Асылгараева — лицензированного брокера в Дубае.\n\n" +
                "Можете задать любой вопрос про недвижимость в ОАЭ, инвестиции, Golden Visa или просто пообщаться. " +
                "Отвечает Claude.\n\n" +
                "Сайт: https://jombler-dubai.netlify.app\n" +
                "WhatsApp: +971 54 544 10 60",
        }, TG_TOKEN);
        return { statusCode: 200, body: "ok" };
    }

    await tg("sendChatAction", { chat_id: chatId, action: "typing" }, TG_TOKEN);

    try {
        const reply = await askClaude(text, ANTHROPIC_KEY);
        const chunks = splitMessage(reply, 4000);
        for (const chunk of chunks) {
            await tg("sendMessage", { chat_id: chatId, text: chunk }, TG_TOKEN);
        }
    } catch (err) {
        await tg("sendMessage", {
            chat_id: chatId,
            text: "Ошибка: " + (err.message || "не удалось получить ответ"),
        }, TG_TOKEN);
    }

    return { statusCode: 200, body: "ok" };
};

function splitMessage(text, limit) {
    if (text.length <= limit) return [text];
    const out = [];
    let s = text;
    while (s.length > limit) {
        let cut = s.lastIndexOf("\n", limit);
        if (cut < 0 || cut < limit / 2) cut = s.lastIndexOf(" ", limit);
        if (cut < 0) cut = limit;
        out.push(s.slice(0, cut));
        s = s.slice(cut).trim();
    }
    if (s) out.push(s);
    return out;
}
