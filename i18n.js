(function () {
    'use strict';

    const DICT = {
        ru: {
            // Common header / nav / footer
            'nav.home': 'Главная',
            'nav.services': 'Услуги',
            'nav.contacts': 'Контакты',
            'header.cta': 'Связаться с брокером',
            'header.ariaNav': 'Основная навигация',
            'logo.aria': 'На главную',
            'burger.openLabel': 'Открыть меню',
            'burger.closeLabel': 'Закрыть меню',
            'sticky.aria': 'Написать в WhatsApp',
            'footer.phone': 'Телефон',
            'footer.social': 'Социальные сети',
            'footer.office': 'Офис',
            'footer.copyright': '© 2026. Все права защищены.',

            // META: home
            'meta.home.title': 'Недвижимость Дубай | Руслан Асылгараев — RERA-лицензированный брокер',
            'meta.home.desc': 'Подбор недвижимости в Дубае под инвестиции и Golden Visa. 4 года на рынке ОАЭ, 50+ сделок, прямая работа с Emaar, DAMAC, Sobha. Off-market объекты от $500K до $10M+.',
            'meta.home.descShort': 'Подбор недвижимости в Дубае под инвестиции и Golden Visa. 4 года, 50+ сделок, off-market объекты от $500K.',

            // META: services
            'meta.services.title': 'Услуги брокера в Дубае | Покупка, продажа, инвестиции — Руслан Асылгараев',
            'meta.services.desc': 'Услуги частного брокера в Дубае: покупка и продажа люксовой недвижимости, инвестиции, off-market сделки, сопровождение через DLD и эскроу. Прямая работа с Emaar, DAMAC, Sobha.',
            'meta.services.descShort': 'Услуги частного брокера в Дубае: покупка, продажа, инвестиции, off-market.',

            // META: dubai
            'meta.dubai.title': 'Недвижимость в Дубае по районам | Palm Jumeirah, Downtown, Marina',
            'meta.dubai.desc': 'Обзор ключевых районов Дубая для покупки и инвестиций: Palm Jumeirah, Downtown, Dubai Marina, Business Bay, Emirates Hills, Dubai Hills Estate. Цены, доходность, отбор брокера.',
            'meta.dubai.descShort': 'Обзор районов Дубая: Palm Jumeirah, Downtown, Marina, Business Bay и другие.',

            // META: abu-dhabi
            'meta.abu.title': 'Недвижимость в Абу-Даби по районам | Saadiyat, Yas, Al Reem',
            'meta.abu.desc': 'Обзор ключевых районов Абу-Даби для покупки и инвестиций: Saadiyat Island, Yas Island, Al Reem Island, Al Maryah Island, Corniche, Al Raha Beach. Цены и доходность.',
            'meta.abu.descShort': 'Обзор районов Абу-Даби: Saadiyat, Yas, Al Reem и другие.',

            // META: contacts
            'meta.contacts.title': 'Контакты | Руслан Асылгараев — частный брокер в Дубае',
            'meta.contacts.desc': 'Свяжитесь с RERA-лицензированным брокером в Дубае. WhatsApp +971 54 544 10 60, Telegram @Ruslan_Emirates, офис Palm Jumeirah, Golden Mile 8.',
            'meta.contacts.descShort': 'WhatsApp, Telegram, Instagram, email. Офис на Palm Jumeirah, Dubai.',

            // HOME: hero
            'home.hero.eyebrow': 'Premium Real Estate · Dubai · UAE',
            'home.hero.title': 'Ваш личный брокер<br>люксовой недвижимости<br>в Арабских Эмиратах',
            'home.hero.lead': 'RERA-лицензированный брокер. 4 года на рынке ОАЭ, 50+ закрытых сделок, прямая работа с 20+ застройщиками. Off-market объекты от $500K до $10M+.',
            'home.hero.ctaForm': 'Получить подборку за 24 часа',
            'home.hero.ctaWa': 'Написать в WhatsApp',

            // HOME: about
            'home.about.eyebrow': 'Обо мне',
            'home.about.title': 'Эксперт рынка<br>люксовой недвижимости',
            'home.about.p1': 'Я — Руслан Асылгараев, частный брокер с лицензией RERA. 4 года работаю с инвесторами и покупателями из России, СНГ и Европы. Закрыл более 50 сделок в Дубае и Абу-Даби — от студий в JVC до пентхаусов на Palm Jumeirah.',
            'home.about.p2': 'Подбираю объекты под задачу: жильё для жизни, инвестиционные апартаменты с высокой доходностью, проекты от застройщиков на старте продаж и off-market объекты от частных владельцев.',
            'home.about.point1': 'Прямой доступ к закрытому инвентарю 20+ застройщиков',
            'home.about.point2': 'Юридически чистые сделки через DLD и эскроу-счета',
            'home.about.point3': 'Стратегии для сохранения и роста капитала',
            'home.about.cta': 'Связаться со мной →',
            'home.about.badgeSub': 'Все Эмираты',

            // HOME: services preview
            'home.services.eyebrow': 'Что я предлагаю',
            'home.services.title': 'Полный спектр услуг<br>в недвижимости ОАЭ',
            'home.services.purchase.title': 'Покупка',
            'home.services.purchase.desc': 'Подбор объекта под ваш бюджет, цели и стиль жизни. От апартаментов до вилл премиум-класса.',
            'home.services.sale.title': 'Продажа',
            'home.services.sale.desc': 'Профессиональная оценка, маркетинг, фотосессия и поиск платёжеспособного покупателя.',
            'home.services.invest.title': 'Инвестиции',
            'home.services.invest.desc': 'Стратегии с потенциалом доходности от 6,7% годовых: новостройки, аренда, перепродажа на стадии готовности.',
            'home.services.support.title': 'Сопровождение',
            'home.services.support.desc': 'Юридическая проверка, оформление документов, перевод средств и регистрация сделки в DLD.',

            // HOME: why dubai
            'home.why.eyebrow': 'Дубай 2026 в цифрах',
            'home.why.title': 'Почему рынок остаётся №1<br>для частного капитала',
            'home.why.m1.value': 'AED 682,5 млрд',
            'home.why.m1.sub': '$186 млрд',
            'home.why.m1.desc': 'Общий объём сделок в Дубае за 2025 год — рекорд за всю историю рынка (+30,7% к 2024).',
            'home.why.m2.desc': 'Рост цен в prime-сегменте за 2025 — 2-е место в мире после Токио.',
            'home.why.m3.desc': 'Средняя валовая доходность от аренды — против 2–4% в Лондоне, Нью-Йорке, Сингапуре.',
            'home.why.m4.desc': 'Подоходный налог для физлиц на доход от аренды и прирост капитала. Без CGT, без налога на наследство.',
            'home.why.cta': 'Получить персональную подборку →',

            // HOME: cities
            'home.cities.eyebrow': 'Где я работаю',
            'home.cities.title': 'Два эмирата —<br>безграничные возможности',
            'home.cities.label': 'Эмират',
            'home.cities.dubai.title': 'Дубай',
            'home.cities.dubai.desc': 'Palm Jumeirah, Downtown, Marina, Business Bay и другие премиум-районы.',
            'home.cities.cta': 'Смотреть районы →',
            'home.cities.abu.title': 'Абу-Даби',
            'home.cities.abu.desc': 'Saadiyat, Yas Island, Al Reem и другие острова и районы столицы.',

            // HOME: off-market
            'home.off.eyebrow': 'Off-market доступ',
            'home.off.title': 'Доступ к объектам,<br>которых нет на порталах',
            'home.off.p1': '30–50% сделок в премиум-сегменте Дубая ($10M+) проходят off-market — через прямые отношения брокера с девелоперами и частными владельцами. Это VIP-allocations до публичного launch (с дисконтом 5–20%), приоритет по этажам и видам, а также тихие resale-сделки от HNWI-клиентов.',
            'home.off.p2': 'Работаю с 20+ застройщиками ОАЭ напрямую. Среди партнёров — Emaar, DAMAC, Sobha, Nakheel, Meraas, Binghatti, Select Group, Ellington, Omniyat. Это означает доступ к pre-launch инвентарю Bvlgari Lighthouse, Six Senses Marina, Mercedes-Benz Places, Como Residences и другим знаковым проектам — до того, как они попадают на Bayut.',
            'home.off.cta': 'Запросить off-market подборку',

            // HOME: stats
            'home.stats.l1': 'года на рынке<br>недвижимости ОАЭ',
            'home.stats.l2': 'закрытых сделок с инвесторами<br>из России и СНГ',
            'home.stats.l3': 'застройщиков<br>в прямой работе',
            'home.stats.l4': 'лицензированный брокер<br>Dubai Land Department',
            'home.stats.note': 'Все сделки регистрируются в DLD и проходят через эскроу-счета согласно закону №8 о RERA.',

            // HOME: lead magnet form
            'home.lead.eyebrow': 'Персональный подбор',
            'home.lead.title': 'Подбор 3 объектов под вашу цель —<br>за 24 часа',
            'home.lead.lead': 'Расскажите о бюджете и цели — пришлю персональную подборку с расчётом ROI, плана рассрочки и потенциала роста. Включая off-market объекты, которых нет на Bayut и PropertyFinder.',
            'form.name': 'Имя',
            'form.namePh': 'Иван Иванов',
            'form.budget': 'Бюджет',
            'form.budgetPh': 'Выберите бюджет',
            'form.budget.up500': 'До $500K',
            'form.budget.500to1m': '$500K – $1M',
            'form.budget.1mto3m': '$1M – $3M',
            'form.budget.3mto10m': '$3M – $10M',
            'form.budget.10mPlus': '$10M+',
            'form.goal': 'Цель',
            'form.goalPh': 'Выберите цель',
            'form.goal.cashflow': 'Доход от аренды (cashflow)',
            'form.goal.appreciation': 'Прирост капитала / перепродажа',
            'form.goal.golden': 'Переезд + Golden Visa',
            'form.goal.preservation': 'Сохранение капитала (trophy asset)',
            'form.contact': 'Контакт (телефон / WhatsApp)',
            'form.contactPh': '+7 900 000 00 00',
            'home.lead.submit': 'Получить подборку в WhatsApp',
            'home.lead.note': 'Конфиденциально. Не передаём контакты третьим лицам. Ответ в течение 4–6 часов в рабочее время Дубая (GMT+4).',

            // HOME: faq
            'home.faq.eyebrow': 'Частые вопросы',
            'home.faq.title': 'Что важно знать<br>перед сделкой',
            'home.faq.q1': 'Какой минимальный бюджет имеет смысл рассматривать в Дубае?',
            'home.faq.a1': 'От $500K — это вход в Jumeirah Village Circle (JVC) с доходностью 7,4–8,5% годовых и квалификация на 2-летнюю Investor Visa. От AED 2M ($545K) — порог для Golden Visa на 10 лет.',
            'home.faq.q2': 'Как защищены деньги при покупке off-plan?',
            'home.faq.a2': 'По закону №8 от 2007 года все платежи поступают на проектный эскроу-счёт под надзором DLD. Девелопер не получает доступ к средствам до подтверждённых milestones, верифицированных независимым инженером и одобренных RERA. Незарегистрированный проект — это уголовная ответственность для девелопера.',
            'home.faq.q3': 'Какие реальные расходы при покупке сверх цены объекта?',
            'home.faq.a3': '4% DLD transfer fee, 2% брокерская комиссия (+5% VAT), AED 4 200 trustee fee, AED 580 title deed, при ипотеке — 0,25% регистрация ипотеки + 1% bank processing. Итого: 6–8% кэшем для готовой недвижимости, 8–9,5% с ипотекой. С 1 февраля 2025 банки больше не финансируют DLD-fee и комиссию в составе кредита.',
            'home.faq.q4': 'Какая реальная доходность от аренды после всех расходов?',
            'home.faq.a4': 'Зависит от района. В Dubai Marina (long-term, AED 3M, 2BR) net yield составляет ~4,2% после service charges (AED 18/sqft), management fee 5%, vacancy buffer и страховки. В JVC чистая доходность выше — 5,5–6,5%. Short-term (Airbnb) даёт 8–11% gross в Downtown/Marina, но требует DET-лицензии и отнимает 20% на operator.',
            'home.faq.q5': 'Можно ли купить недвижимость и получить Golden Visa, если я гражданин РФ?',
            'home.faq.a5': 'Да. UAE не делает национальных ограничений на freehold. Порог — AED 2M (~$545K) на DLD-сертифицированную стоимость, 10 лет визы, без минимального срока пребывания, family sponsorship для супруга, детей без возрастных ограничений и родителей. Срок оформления — 5–7 недель. Допускается ипотека и off-plan от approved developers.',
            'home.faq.q6': 'Как переводить деньги из России в 2026 году?',
            'home.faq.a6': 'Несколько compliant-путей: SWIFT через несанкционные банки РФ (Райффайзен, ЮниКредит, ОТП, Ренессанс), физический ввоз с обязательной декларацией от AED 60K, через VARA-licensed крипто-биржи (OKX, Binance FZE, Crypto.com) с конвертацией в AED. Все варианты требуют полного KYC и подтверждения SOF/SOW. Подбираю канал индивидуально под клиента.',

            // SERVICES
            'services.hero.eyebrow': 'Услуги и направления',
            'services.hero.title': 'Работаю с лучшими объектами<br>по всем Эмиратам',
            'services.hero.lead': 'От апартаментов на Palm Jumeirah до коммерческих площадей в Business Bay — подбираю и сопровождаю сделки любого масштаба.',
            'services.dir.eyebrow': 'Направления работы',
            'services.dir.title': 'Что мы продаём<br>и покупаем',
            'services.d1.title': 'Люксовая недвижимость',
            'services.d1.desc': 'Виллы, пентхаусы и апартаменты в самых престижных районах: Palm Jumeirah, Emirates Hills, Downtown Dubai, Bluewaters, Jumeirah Bay Island. Эксклюзивные объекты с дизайнерским ремонтом и видом на Burj Khalifa или море.',
            'services.d2.title': 'Инвестиционные объекты',
            'services.d2.desc': 'Подбор недвижимости с высокой доходностью от аренды и роста капитализации. Анализ рынка, прогноз ROI, стратегии flip и buy-to-let. Помогаю клиентам зарабатывать на дубайском рынке.',
            'services.d3.title': 'Новостройки от застройщика',
            'services.d3.desc': 'Прямые продажи от Emaar, DAMAC, Sobha, Nakheel, MERAAS, Select Group. Лучшие цены на старте, рассрочки до 8 лет, эксклюзивные предложения, закрытые превью проектов.',
            'services.d4.title': 'Готовое жильё (secondary)',
            'services.d4.desc': 'Объекты на вторичном рынке с возможностью сразу заехать или сдать в аренду. Проверенные квартиры, виллы и таунхаусы с историей доходности и юридической чистотой.',
            'services.d5.title': 'Коммерческая недвижимость',
            'services.d5.desc': 'Офисы, ритейл-площади, отельные апартаменты и складские комплексы. Подбор под бизнес-задачи и для пассивного дохода. Сделки в DIFC, Business Bay, JLT и других ключевых деловых районах.',
            'services.adv.eyebrow': 'Почему выбирают меня',
            'services.adv.title': 'Преимущества<br>работы со мной',
            'services.adv1.title': 'Личное участие',
            'services.adv1.desc': 'Работаю с каждым клиентом лично — никаких ассистентов и колл-центров. Вы общаетесь напрямую со мной от первого звонка до получения ключей.',
            'services.adv2.title': 'Прозрачные сделки',
            'services.adv2.desc': 'Все договоры зарегистрированы в DLD, оплаты через эскроу-счета. Вы всегда знаете, на каком этапе сделка и куда идут ваши средства.',
            'services.adv3.title': 'Закрытые предложения',
            'services.adv3.desc': 'Доступ к off-market объектам и проектам до старта официальных продаж. Вы получаете лучшие условия раньше остального рынка.',
            'services.adv4.title': 'Поддержка после сделки',
            'services.adv4.desc': 'Помогаю с управлением недвижимостью, поиском арендаторов, ремонтом и перепродажей. Сопровождаю клиентов годами.',
            'services.proc.eyebrow': 'Как мы работаем',
            'services.proc.title': 'Простой процесс<br>в четыре шага',
            'services.s1.title': 'Знакомство',
            'services.s1.desc': 'Обсуждаем ваши цели, бюджет, предпочтения по локации и тип недвижимости. Определяем стратегию.',
            'services.s2.title': 'Подбор объектов',
            'services.s2.desc': 'Готовлю шорт-лист из 5–10 подходящих вариантов с подробным анализом, фото, видео и расчётом доходности.',
            'services.s3.title': 'Просмотр и сделка',
            'services.s3.desc': 'Организую просмотры онлайн или офлайн, веду переговоры с продавцом, готовлю и согласовываю договор.',
            'services.s4.title': 'Передача и сервис',
            'services.s4.desc': 'Сопровождаю регистрацию в DLD, передачу ключей и подключение коммунальных. Остаюсь на связи и после.',
            'services.cta.title': 'Расскажите о вашей задаче',
            'services.cta.desc': 'Бесплатная консультация — подберу объекты и стратегию под ваш бюджет.',
            'services.cta.btn': 'Связаться в WhatsApp',

            // DUBAI
            'dubai.hero.eyebrow': 'Эмират · Дубай',
            'dubai.hero.title': 'Дубай',
            'dubai.hero.lead': 'Город небоскрёбов, искусственных островов и закрытых вилл. Шесть ключевых районов, в которых сосредоточена премиум-недвижимость — для жизни и для инвестиций.',
            'dubai.dist.eyebrow': 'Районы для покупки',
            'dubai.dist.title': '6 локаций<br>для жизни и инвестиций',
            'districts.startPrice': 'Старт цены',
            'districts.yield': 'Доходность',
            'dubai.tag.premium': 'Премиум',
            'dubai.tag.center': 'Центр',
            'dubai.tag.rental': 'Аренда',
            'dubai.tag.invest': 'Инвестиции',
            'dubai.tag.exclusive': 'Эксклюзив',
            'dubai.tag.family': 'Семейный',
            'dubai.d1.desc': 'Искусственный остров в форме пальмы. Виллы и пентхаусы на первой береговой линии, частные пляжи, отели Atlantis и One&Only.',
            'dubai.d2.desc': 'Сердце города с Burj Khalifa, Dubai Mall и поющими фонтанами. Апартаменты в башнях с видом на самое высокое здание мира.',
            'dubai.d3.desc': 'Высотный набережный район с яхт-клубом и набережной The Walk. Студии и апартаменты, идеальные для краткосрочной аренды.',
            'dubai.d4.desc': 'Деловой район рядом с Downtown с современными башнями. Высокий спрос на аренду от бизнес-публики и экспатов.',
            'dubai.d5.desc': 'Закрытый посёлок дизайнерских вилл вокруг гольф-поля Montgomerie. «Беверли-Хиллз Дубая» — для частной жизни.',
            'dubai.d6.desc': 'Зелёный мастер-план с парком, школами и гольф-полем. Виллы, таунхаусы и апартаменты для семей с детьми.',
            'dubai.cta.title': 'Не нашли свой район?',
            'dubai.cta.desc': 'Дубай — это десятки локаций. Расскажите о бюджете и целях — подберу ровно то, что нужно.',
            'dubai.cta.btn': 'Получить подбор в WhatsApp',
            'dubai.other.eyebrow': 'Также работаю в',
            'dubai.other.title': 'Абу-Даби',
            'dubai.other.desc': 'Saadiyat, Yas Island, Al Reem — острова и районы столицы ОАЭ с премиум-недвижимостью.',
            'dubai.other.link': 'Смотреть районы Абу-Даби →',

            // ABU DHABI
            'abu.hero.eyebrow': 'Эмират · Абу-Даби',
            'abu.hero.title': 'Абу-Даби',
            'abu.hero.lead': 'Столица ОАЭ — спокойнее, статуснее и стабильнее Дубая. Шесть ключевых островов и районов с премиум-недвижимостью для жизни и инвестиций.',
            'abu.dist.eyebrow': 'Районы для покупки',
            'abu.dist.title': '6 локаций<br>в столице Эмиратов',
            'abu.tag.cultural': 'Культурный',
            'abu.tag.entertainment': 'Развлечения',
            'abu.tag.young': 'Молодой',
            'abu.tag.business': 'Бизнес',
            'abu.tag.center': 'Центр',
            'abu.tag.coastal': 'Прибрежный',
            'abu.d1.desc': 'Остров музеев с Louvre Abu Dhabi и будущим Guggenheim. Виллы и апартаменты у природного пляжа, премиум-отели Saadiyat.',
            'abu.d2.desc': 'Развлекательный остров с Ferrari World, трассой Формулы-1 и Yas Mall. Современные апарты с активной арендной доходностью.',
            'abu.d3.desc': 'Современный остров со стеклянными башнями и набережной. Доступный вход в премиальный сегмент столицы.',
            'abu.d4.desc': 'Финансовый центр Абу-Даби (ADGM) со штаб-квартирами банков и пятизвёздочными отелями. Премиум-апарты для топ-менеджмента.',
            'abu.d5.desc': 'Историческая набережная в центре города с парками, пляжами и видом на залив. Респектабельный район столицы.',
            'abu.d6.desc': 'Приморский мастер-план с лагунами, каналами и марина. Апартаменты и виллы для тихой жизни у воды.',
            'abu.cta.title': 'Нужен подбор в Абу-Даби?',
            'abu.cta.desc': 'Расскажите о бюджете и задаче — пришлю шорт-лист объектов с расчётом доходности.',
            'abu.cta.btn': 'Получить подбор в WhatsApp',
            'abu.other.eyebrow': 'Также работаю в',
            'abu.other.title': 'Дубай',
            'abu.other.desc': 'Palm Jumeirah, Downtown, Marina, Business Bay — главные премиум-районы города небоскрёбов.',
            'abu.other.link': 'Смотреть районы Дубая →',

            // CONTACTS
            'contacts.hero.eyebrow': 'Контакты',
            'contacts.hero.title': 'Свяжитесь<br>со мной',
            'contacts.hero.lead': 'Отвечу в течение 30 минут в любом удобном для вас мессенджере. Консультации бесплатны.',
            'contacts.card.title': 'Прямой контакт',
            'contacts.row.phone': 'Телефон',
            'contacts.row.office': 'Адрес офиса',
            'contacts.address': 'Golden Mile 8, Palm Jumeirah, Dubai, UAE',
            'contacts.form.title': 'Написать сообщение',
            'contacts.form.hint': 'Заполните форму — отправлю вам ответ в WhatsApp.',
            'contacts.form.name': 'Ваше имя',
            'contacts.form.phone': 'Телефон',
            'contacts.form.message': 'Сообщение',
            'contacts.form.messagePh': 'Расскажите, что вы ищете — район, бюджет, цели',
            'contacts.form.submit': 'Отправить в WhatsApp',
            'contacts.form.note': 'Нажимая на кнопку, вы соглашаетесь на обработку персональных данных.',
            'contacts.map.eyebrow': 'Расположение офиса',

            // JS messages (forms / WhatsApp templates)
            'err.name': 'Укажите имя',
            'err.budget': 'Выберите бюджет',
            'err.goal': 'Выберите цель',
            'err.phone': 'Проверьте формат телефона',
            'err.namePhone': 'Пожалуйста, укажите имя и телефон.',
            'wa.lead.greet': 'Здравствуйте, Руслан! Меня зовут',
            'wa.lead.budget': 'Бюджет:',
            'wa.lead.goal': 'Цель:',
            'wa.lead.shortlist': 'Хотел(а) бы получить подборку из 3 объектов.',
            'wa.lead.contact': 'Мой контакт:',
            'wa.contact.greet': 'Здравствуйте! Меня зовут',
            'wa.contact.phone': 'Телефон:',
            'wa.contact.message': 'Сообщение:',
            'wa.contact.fallback': 'Хочу узнать подробнее о недвижимости в Дубае.',
            'wa.opening': 'Открываем WhatsApp… Если не открылся — ',
            'wa.clickHere': 'нажмите сюда',
            'wa.failed': 'Не удалось открыть WhatsApp автоматически. ',
            'wa.openManual': 'Открыть вручную'
        },

        en: {
            // Common header / nav / footer
            'nav.home': 'Home',
            'nav.services': 'Services',
            'nav.contacts': 'Contacts',
            'header.cta': 'Contact broker',
            'header.ariaNav': 'Main navigation',
            'logo.aria': 'Home',
            'burger.openLabel': 'Open menu',
            'burger.closeLabel': 'Close menu',
            'sticky.aria': 'Message on WhatsApp',
            'footer.phone': 'Phone',
            'footer.social': 'Social media',
            'footer.office': 'Office',
            'footer.copyright': '© 2026. All rights reserved.',

            // META: home
            'meta.home.title': 'Dubai Real Estate | Ruslan Asylgaraev — RERA-licensed Broker',
            'meta.home.desc': 'Curated Dubai real estate for investment and the Golden Visa. 4 years in the UAE market, 50+ closed deals, direct access to Emaar, DAMAC, Sobha. Off-market properties from $500K to $10M+.',
            'meta.home.descShort': 'Curated Dubai real estate for investment and the Golden Visa. 4 years, 50+ deals, off-market from $500K.',

            // META: services
            'meta.services.title': 'Dubai Broker Services | Buy, Sell, Invest — Ruslan Asylgaraev',
            'meta.services.desc': 'Private broker services in Dubai: buying and selling luxury real estate, investments, off-market deals, end-to-end handling via DLD and escrow. Direct access to Emaar, DAMAC, Sobha.',
            'meta.services.descShort': 'Private Dubai broker services: buy, sell, invest, off-market.',

            // META: dubai
            'meta.dubai.title': 'Dubai Real Estate by District | Palm Jumeirah, Downtown, Marina',
            'meta.dubai.desc': 'A guide to Dubai’s key districts for buying and investment: Palm Jumeirah, Downtown, Dubai Marina, Business Bay, Emirates Hills, Dubai Hills Estate. Prices, yields, broker shortlist.',
            'meta.dubai.descShort': 'Dubai districts overview: Palm Jumeirah, Downtown, Marina, Business Bay and more.',

            // META: abu-dhabi
            'meta.abu.title': 'Abu Dhabi Real Estate by District | Saadiyat, Yas, Al Reem',
            'meta.abu.desc': 'A guide to Abu Dhabi’s key districts for buying and investment: Saadiyat Island, Yas Island, Al Reem Island, Al Maryah Island, Corniche, Al Raha Beach. Prices and yields.',
            'meta.abu.descShort': 'Abu Dhabi districts overview: Saadiyat, Yas, Al Reem and more.',

            // META: contacts
            'meta.contacts.title': 'Contacts | Ruslan Asylgaraev — Private Broker in Dubai',
            'meta.contacts.desc': 'Get in touch with a RERA-licensed broker in Dubai. WhatsApp +971 54 544 10 60, Telegram @Ruslan_Emirates, office on Palm Jumeirah, Golden Mile 8.',
            'meta.contacts.descShort': 'WhatsApp, Telegram, Instagram, email. Office on Palm Jumeirah, Dubai.',

            // HOME: hero
            'home.hero.eyebrow': 'Premium Real Estate · Dubai · UAE',
            'home.hero.title': 'Your private broker<br>for luxury real estate<br>in the United Arab Emirates',
            'home.hero.lead': 'RERA-licensed broker. 4 years in the UAE market, 50+ closed deals, direct access to 20+ developers. Off-market properties from $500K to $10M+.',
            'home.hero.ctaForm': 'Get a curated shortlist in 24 hours',
            'home.hero.ctaWa': 'Message on WhatsApp',

            // HOME: about
            'home.about.eyebrow': 'About me',
            'home.about.title': 'A luxury real estate<br>market expert',
            'home.about.p1': 'I’m Ruslan Asylgaraev, a private RERA-licensed broker. For 4 years I have been working with investors and buyers from Russia, the CIS and Europe. I have closed 50+ deals across Dubai and Abu Dhabi — from JVC studios to Palm Jumeirah penthouses.',
            'home.about.p2': 'I match properties to your goal: a home to live in, high-yield investment apartments, off-plan launches and off-market deals from private owners.',
            'home.about.point1': 'Direct access to closed inventory of 20+ developers',
            'home.about.point2': 'Legally clean transactions via DLD and escrow accounts',
            'home.about.point3': 'Strategies for capital preservation and growth',
            'home.about.cta': 'Contact me →',
            'home.about.badgeSub': 'All Emirates',

            // HOME: services preview
            'home.services.eyebrow': 'What I offer',
            'home.services.title': 'A full range of UAE<br>real estate services',
            'home.services.purchase.title': 'Buying',
            'home.services.purchase.desc': 'Properties matched to your budget, goals and lifestyle. From apartments to premium villas.',
            'home.services.sale.title': 'Selling',
            'home.services.sale.desc': 'Professional valuation, marketing, photography and qualified buyer search.',
            'home.services.invest.title': 'Investments',
            'home.services.invest.desc': 'Strategies with 6.7%+ annual yield potential: off-plan, rental, resale at handover.',
            'home.services.support.title': 'End-to-end handling',
            'home.services.support.desc': 'Legal due diligence, paperwork, fund transfers and DLD registration.',

            // HOME: why dubai
            'home.why.eyebrow': 'Dubai 2026 in numbers',
            'home.why.title': 'Why the market remains #1<br>for private capital',
            'home.why.m1.value': 'AED 682.5 bn',
            'home.why.m1.sub': '$186 bn',
            'home.why.m1.desc': 'Total Dubai deal volume in 2025 — an all-time market record (+30.7% vs 2024).',
            'home.why.m2.desc': 'Prime segment price growth in 2025 — 2nd in the world after Tokyo.',
            'home.why.m3.desc': 'Average gross rental yield — vs 2–4% in London, New York, Singapore.',
            'home.why.m4.desc': 'Personal income tax on rental income and capital gains. No CGT, no inheritance tax.',
            'home.why.cta': 'Get a personal shortlist →',

            // HOME: cities
            'home.cities.eyebrow': 'Where I work',
            'home.cities.title': 'Two emirates —<br>boundless opportunities',
            'home.cities.label': 'Emirate',
            'home.cities.dubai.title': 'Dubai',
            'home.cities.dubai.desc': 'Palm Jumeirah, Downtown, Marina, Business Bay and other premium districts.',
            'home.cities.cta': 'View districts →',
            'home.cities.abu.title': 'Abu Dhabi',
            'home.cities.abu.desc': 'Saadiyat, Yas Island, Al Reem and other islands and districts of the capital.',

            // HOME: off-market
            'home.off.eyebrow': 'Off-market access',
            'home.off.title': 'Properties not listed<br>on public portals',
            'home.off.p1': '30–50% of premium Dubai deals ($10M+) close off-market — through direct broker relationships with developers and private owners. That means VIP allocations before public launch (5–20% discount), priority on floors and views, and quiet resale deals from HNWI clients.',
            'home.off.p2': 'I work directly with 20+ UAE developers. Partners include Emaar, DAMAC, Sobha, Nakheel, Meraas, Binghatti, Select Group, Ellington, Omniyat. That means access to pre-launch inventory at Bvlgari Lighthouse, Six Senses Marina, Mercedes-Benz Places, Como Residences and other landmark projects — before they hit Bayut.',
            'home.off.cta': 'Request off-market shortlist',

            // HOME: stats
            'home.stats.l1': 'years in the<br>UAE real estate market',
            'home.stats.l2': 'closed deals with investors<br>from Russia & the CIS',
            'home.stats.l3': 'developers in<br>direct partnership',
            'home.stats.l4': 'licensed broker<br>Dubai Land Department',
            'home.stats.note': 'Every deal is registered with the DLD and processed via escrow accounts under RERA Law No. 8.',

            // HOME: lead magnet form
            'home.lead.eyebrow': 'Personal shortlist',
            'home.lead.title': 'Three properties matched to your goal —<br>in 24 hours',
            'home.lead.lead': 'Tell me your budget and goal — I will send a personal shortlist with ROI, payment plan and growth potential. Includes off-market properties not listed on Bayut or PropertyFinder.',
            'form.name': 'Name',
            'form.namePh': 'John Smith',
            'form.budget': 'Budget',
            'form.budgetPh': 'Select budget',
            'form.budget.up500': 'Up to $500K',
            'form.budget.500to1m': '$500K – $1M',
            'form.budget.1mto3m': '$1M – $3M',
            'form.budget.3mto10m': '$3M – $10M',
            'form.budget.10mPlus': '$10M+',
            'form.goal': 'Goal',
            'form.goalPh': 'Select goal',
            'form.goal.cashflow': 'Rental income (cashflow)',
            'form.goal.appreciation': 'Capital appreciation / resale',
            'form.goal.golden': 'Relocation + Golden Visa',
            'form.goal.preservation': 'Capital preservation (trophy asset)',
            'form.contact': 'Contact (phone / WhatsApp)',
            'form.contactPh': '+1 555 000 0000',
            'home.lead.submit': 'Get shortlist on WhatsApp',
            'home.lead.note': 'Confidential. We do not share contacts with third parties. Reply within 4–6 hours during Dubai working hours (GMT+4).',

            // HOME: faq
            'home.faq.eyebrow': 'FAQ',
            'home.faq.title': 'What you should know<br>before the deal',
            'home.faq.q1': 'What is the minimum budget worth considering in Dubai?',
            'home.faq.a1': 'From $500K — entry into Jumeirah Village Circle (JVC) with 7.4–8.5% annual yield and qualification for the 2-year Investor Visa. From AED 2M ($545K) — the threshold for a 10-year Golden Visa.',
            'home.faq.q2': 'How is your money protected when buying off-plan?',
            'home.faq.a2': 'Under Law No. 8 of 2007, all payments go to a project escrow account supervised by the DLD. The developer cannot access funds until milestones are confirmed by an independent engineer and approved by RERA. An unregistered project is a criminal offence for the developer.',
            'home.faq.q3': 'What real costs apply on top of the property price?',
            'home.faq.a3': '4% DLD transfer fee, 2% broker commission (+5% VAT), AED 4,200 trustee fee, AED 580 title deed; with mortgage — 0.25% mortgage registration + 1% bank processing. Totals: 6–8% in cash for ready property, 8–9.5% with mortgage. From 1 February 2025 banks no longer finance the DLD fee or commission as part of the loan.',
            'home.faq.q4': 'What is the real rental yield after all expenses?',
            'home.faq.a4': 'It depends on the district. In Dubai Marina (long-term, AED 3M, 2BR) net yield is ~4.2% after service charges (AED 18/sqft), 5% management fee, vacancy buffer and insurance. In JVC net yield is higher — 5.5–6.5%. Short-term (Airbnb) yields 8–11% gross in Downtown/Marina but requires a DET licence and ~20% to the operator.',
            'home.faq.q5': 'Can a Russian citizen buy property and get the Golden Visa?',
            'home.faq.a5': 'Yes. The UAE has no national restrictions on freehold ownership. The threshold is AED 2M (~$545K) on DLD-certified value, a 10-year visa, no minimum stay requirement, family sponsorship for spouse, children with no age limit and parents. Processing takes 5–7 weeks. Mortgage and off-plan from approved developers are allowed.',
            'home.faq.q6': 'How do you transfer money from Russia in 2026?',
            'home.faq.a6': 'Several compliant routes: SWIFT via non-sanctioned Russian banks (Raiffeisen, UniCredit, OTP, Renaissance), physical import with mandatory declaration above AED 60K, via VARA-licensed crypto exchanges (OKX, Binance FZE, Crypto.com) with conversion to AED. All routes require full KYC and SOF/SOW evidence. I select the channel individually for each client.',

            // SERVICES
            'services.hero.eyebrow': 'Services and directions',
            'services.hero.title': 'Working with the best properties<br>across the UAE',
            'services.hero.lead': 'From apartments on Palm Jumeirah to commercial space in Business Bay — I source and handle deals of any scale.',
            'services.dir.eyebrow': 'Service lines',
            'services.dir.title': 'What we sell<br>and buy',
            'services.d1.title': 'Luxury real estate',
            'services.d1.desc': 'Villas, penthouses and apartments in the most prestigious districts: Palm Jumeirah, Emirates Hills, Downtown Dubai, Bluewaters, Jumeirah Bay Island. Exclusive properties with designer interiors and views of Burj Khalifa or the sea.',
            'services.d2.title': 'Investment properties',
            'services.d2.desc': 'Properties with strong rental yield and capital growth potential. Market analysis, ROI projections, flip and buy-to-let strategies. I help clients earn on the Dubai market.',
            'services.d3.title': 'Off-plan from developers',
            'services.d3.desc': 'Direct sales from Emaar, DAMAC, Sobha, Nakheel, MERAAS, Select Group. Best launch prices, payment plans up to 8 years, exclusive offers, closed project previews.',
            'services.d4.title': 'Ready (secondary) properties',
            'services.d4.desc': 'Resale market properties — move in or rent out immediately. Vetted apartments, villas and townhouses with a yield history and clean title.',
            'services.d5.title': 'Commercial real estate',
            'services.d5.desc': 'Offices, retail space, hotel apartments and warehouse complexes. For business needs and passive income. Deals in DIFC, Business Bay, JLT and other key business districts.',
            'services.adv.eyebrow': 'Why clients choose me',
            'services.adv.title': 'Advantages<br>of working with me',
            'services.adv1.title': 'Personal involvement',
            'services.adv1.desc': 'I work with every client personally — no assistants or call centres. You speak directly to me from the first call to the keys handover.',
            'services.adv2.title': 'Transparent deals',
            'services.adv2.desc': 'All contracts are registered with the DLD, payments go through escrow. You always know the deal stage and where your money is.',
            'services.adv3.title': 'Closed offers',
            'services.adv3.desc': 'Access to off-market properties and projects before official launch. You get the best terms ahead of the rest of the market.',
            'services.adv4.title': 'Post-deal support',
            'services.adv4.desc': 'I help with property management, finding tenants, renovations and resale. I support clients for years after the deal.',
            'services.proc.eyebrow': 'How we work',
            'services.proc.title': 'A simple process<br>in four steps',
            'services.s1.title': 'Discovery',
            'services.s1.desc': 'We discuss your goals, budget, location preferences and property type. We define a strategy.',
            'services.s2.title': 'Property shortlist',
            'services.s2.desc': 'I prepare a shortlist of 5–10 fitting options with detailed analysis, photos, video and yield calculations.',
            'services.s3.title': 'Viewings and deal',
            'services.s3.desc': 'I arrange online or offline viewings, negotiate with the seller, prepare and finalise the contract.',
            'services.s4.title': 'Handover and service',
            'services.s4.desc': 'I handle DLD registration, keys handover and utilities setup. I stay in touch afterwards.',
            'services.cta.title': 'Tell me about your project',
            'services.cta.desc': 'Free consultation — I will match properties and strategy to your budget.',
            'services.cta.btn': 'Message on WhatsApp',

            // DUBAI
            'dubai.hero.eyebrow': 'Emirate · Dubai',
            'dubai.hero.title': 'Dubai',
            'dubai.hero.lead': 'A city of skyscrapers, artificial islands and gated villas. Six key districts that hold the heart of premium real estate — for living and for investment.',
            'dubai.dist.eyebrow': 'Districts to buy in',
            'dubai.dist.title': '6 locations<br>for living and investing',
            'districts.startPrice': 'Starting price',
            'districts.yield': 'Yield',
            'dubai.tag.premium': 'Premium',
            'dubai.tag.center': 'Centre',
            'dubai.tag.rental': 'Rental',
            'dubai.tag.invest': 'Investment',
            'dubai.tag.exclusive': 'Exclusive',
            'dubai.tag.family': 'Family',
            'dubai.d1.desc': 'Man-made island in the shape of a palm. Beachfront villas and penthouses, private beaches, Atlantis and One&Only resorts.',
            'dubai.d2.desc': 'The heart of the city — Burj Khalifa, Dubai Mall and the dancing fountains. Tower apartments with views of the world’s tallest building.',
            'dubai.d3.desc': 'High-rise waterfront district with a yacht club and The Walk promenade. Studios and apartments ideal for short-term rentals.',
            'dubai.d4.desc': 'Business district next to Downtown with modern towers. Strong rental demand from corporate tenants and expats.',
            'dubai.d5.desc': 'Gated community of designer villas around the Montgomerie golf course. The “Beverly Hills of Dubai” — for private living.',
            'dubai.d6.desc': 'Green master plan with parks, schools and a golf course. Villas, townhouses and apartments for families with children.',
            'dubai.cta.title': 'Didn’t find your district?',
            'dubai.cta.desc': 'Dubai has dozens of locations. Tell me your budget and goals — I’ll match exactly what you need.',
            'dubai.cta.btn': 'Get shortlist on WhatsApp',
            'dubai.other.eyebrow': 'I also work in',
            'dubai.other.title': 'Abu Dhabi',
            'dubai.other.desc': 'Saadiyat, Yas Island, Al Reem — islands and districts of the UAE capital with premium real estate.',
            'dubai.other.link': 'View Abu Dhabi districts →',

            // ABU DHABI
            'abu.hero.eyebrow': 'Emirate · Abu Dhabi',
            'abu.hero.title': 'Abu Dhabi',
            'abu.hero.lead': 'The UAE capital — calmer, more prestigious and more stable than Dubai. Six key islands and districts with premium real estate for living and investing.',
            'abu.dist.eyebrow': 'Districts to buy in',
            'abu.dist.title': '6 locations<br>in the UAE capital',
            'abu.tag.cultural': 'Cultural',
            'abu.tag.entertainment': 'Entertainment',
            'abu.tag.young': 'Up-and-coming',
            'abu.tag.business': 'Business',
            'abu.tag.center': 'Centre',
            'abu.tag.coastal': 'Coastal',
            'abu.d1.desc': 'The museum island, home to Louvre Abu Dhabi and the upcoming Guggenheim. Villas and apartments by a natural beach, premium Saadiyat resorts.',
            'abu.d2.desc': 'Entertainment island with Ferrari World, the Formula 1 circuit and Yas Mall. Modern apartments with strong rental yield.',
            'abu.d3.desc': 'Modern island of glass towers and a corniche. An accessible entry into the capital’s premium segment.',
            'abu.d4.desc': 'Abu Dhabi’s financial centre (ADGM) with banking HQs and five-star hotels. Premium apartments for top management.',
            'abu.d5.desc': 'Historic central waterfront with parks, beaches and bay views. A respectable district of the capital.',
            'abu.d6.desc': 'Coastal master plan with lagoons, canals and a marina. Apartments and villas for quiet life by the water.',
            'abu.cta.title': 'Need a shortlist in Abu Dhabi?',
            'abu.cta.desc': 'Tell me your budget and goal — I’ll send a shortlist with yield analysis.',
            'abu.cta.btn': 'Get shortlist on WhatsApp',
            'abu.other.eyebrow': 'I also work in',
            'abu.other.title': 'Dubai',
            'abu.other.desc': 'Palm Jumeirah, Downtown, Marina, Business Bay — the main premium districts of the city of skyscrapers.',
            'abu.other.link': 'View Dubai districts →',

            // CONTACTS
            'contacts.hero.eyebrow': 'Contacts',
            'contacts.hero.title': 'Get in<br>touch',
            'contacts.hero.lead': 'I reply within 30 minutes on any messenger. Consultations are free.',
            'contacts.card.title': 'Direct contact',
            'contacts.row.phone': 'Phone',
            'contacts.row.office': 'Office address',
            'contacts.address': 'Golden Mile 8, Palm Jumeirah, Dubai, UAE',
            'contacts.form.title': 'Send a message',
            'contacts.form.hint': 'Fill in the form — I’ll reply on WhatsApp.',
            'contacts.form.name': 'Your name',
            'contacts.form.phone': 'Phone',
            'contacts.form.message': 'Message',
            'contacts.form.messagePh': 'Tell me what you’re looking for — district, budget, goals',
            'contacts.form.submit': 'Send via WhatsApp',
            'contacts.form.note': 'By submitting you agree to the processing of personal data.',
            'contacts.map.eyebrow': 'Office location',

            // JS messages (forms / WhatsApp templates)
            'err.name': 'Please enter your name',
            'err.budget': 'Select a budget',
            'err.goal': 'Select a goal',
            'err.phone': 'Check phone format',
            'err.namePhone': 'Please enter your name and phone.',
            'wa.lead.greet': 'Hello Ruslan! My name is',
            'wa.lead.budget': 'Budget:',
            'wa.lead.goal': 'Goal:',
            'wa.lead.shortlist': 'I’d like to receive a shortlist of 3 properties.',
            'wa.lead.contact': 'My contact:',
            'wa.contact.greet': 'Hello! My name is',
            'wa.contact.phone': 'Phone:',
            'wa.contact.message': 'Message:',
            'wa.contact.fallback': 'I’d like to know more about Dubai real estate.',
            'wa.opening': 'Opening WhatsApp… If it didn’t open — ',
            'wa.clickHere': 'click here',
            'wa.failed': 'Couldn’t open WhatsApp automatically. ',
            'wa.openManual': 'Open manually'
        }
    };

    const STORAGE_KEY = 'site_lang';
    const DEFAULT_LANG = 'ru';

    function getLang() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved === 'ru' || saved === 'en') return saved;
        } catch (e) { /* localStorage unavailable */ }
        return DEFAULT_LANG;
    }

    function applyLang(lang) {
        const dict = DICT[lang] || DICT.ru;
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const k = el.getAttribute('data-i18n');
            if (dict[k] !== undefined) el.textContent = dict[k];
        });

        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const k = el.getAttribute('data-i18n-html');
            if (dict[k] !== undefined) el.innerHTML = dict[k];
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const k = el.getAttribute('data-i18n-placeholder');
            if (dict[k] !== undefined) el.setAttribute('placeholder', dict[k]);
        });

        document.querySelectorAll('[data-i18n-content]').forEach(el => {
            const k = el.getAttribute('data-i18n-content');
            if (dict[k] !== undefined) el.setAttribute('content', dict[k]);
        });

        document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
            const k = el.getAttribute('data-i18n-aria-label');
            if (dict[k] !== undefined) el.setAttribute('aria-label', dict[k]);
        });

        document.querySelectorAll('[data-i18n-alt]').forEach(el => {
            const k = el.getAttribute('data-i18n-alt');
            if (dict[k] !== undefined) el.setAttribute('alt', dict[k]);
        });

        const titleKey = document.body && document.body.getAttribute('data-title-key');
        if (titleKey && dict[titleKey] !== undefined) {
            document.title = dict[titleKey];
        }

        document.querySelectorAll('.lang-btn').forEach(btn => {
            const isActive = btn.getAttribute('data-lang') === lang;
            btn.classList.toggle('is-active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });

        document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
    }

    function setLang(lang) {
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
        applyLang(lang);
    }

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.lang-btn');
        if (!btn) return;
        const lang = btn.getAttribute('data-lang');
        if (lang) setLang(lang);
    });

    const initial = getLang();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => applyLang(initial));
    } else {
        applyLang(initial);
    }

    window.I18N = {
        dict: DICT,
        getLang: getLang,
        setLang: setLang,
        apply: applyLang,
        t: function (key) {
            const d = DICT[getLang()] || DICT.ru;
            return d[key] !== undefined ? d[key] : key;
        }
    };
})();
