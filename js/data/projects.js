/* ============================================================
   DATA · PROJECTS — single source of truth for project content.
   Every project is a real, live business. Renders as comprehensive
   case studies inside the OS modal system.
   ============================================================ */
(function (MOS) {
  "use strict";

  MOS.data = MOS.data || {};

  MOS.data.PROJECTS = [
    {
      id: "ROYAL SEA",
      glyph: "R",
      glyphClass: "wc-3",
      tag: { en: "Premium Seafood Commerce", ar: "متجر مأكولات بحرية فاخرة" },
      title: "Royal Sea",
      website: "https://royal-sea-eg.com",
      status: { en: "Live", ar: "مشروع حي" },
      previewImage: "https://royal-sea-eg.com/cdn/shop/files/ChatGPT_Image_Jun_3_2026_09_47_12_PM.png?v=1780512456&width=1200",
      problem_short: {
        en: "How do you sell high-end seafood online without the store itself feeling cheap?",
        ar: "إزاي تبيع مأكولات بحرية فاخرة وقوالب المتاجر التقليدية بتبان رخيصة؟"
      },
      outcome_short: {
        en: "A bilingual store: 38 products, full Arabic and English, and a checkout that stays out of the way.",
        ar: "نظام تجارة كامل بلغتين — ٣٨ منتج، تعريب شامل، وتجربة دفع بدون أي عقبات."
      },
      card: {
        en: "A bilingual Shopify store for a high-end seafood brand — 38 products, built, translated, and tested across Arabic and English.",
        ar: "نظام تجارة إلكترونية كامل على شوبيفاي بلغتين لبراند مأكولات بحرية فاخر — كتالوج ٣٨ منتج اتبنى واتراجع من الأول للآخر."
      },
      meta: {
        en: ["Brand Experience", "Commerce Architecture", "Catalog Design"],
        ar: ["تجربة العلامة", "بنية التجارة", "تصميم الكتالوج"]
      },
      focusTags: {
        en: ["Brand Building", "Commerce System", "Product Catalog", "Bilingual UX", "Customer Journey"],
        ar: ["بناء العلامة", "نظام التجارة", "كتالوج المنتجات", "تجربة ثنائية اللغة", "رحلة العميل"]
      },
      techs: {
        en: ["Shopify Engine", "Catalog Architecture", "Customer Journey", "Bilingual Localization"],
        ar: ["محرك شوبيفاي", "بنية الكتالوج", "رحلة العميل", "التعريب المزدوج"]
      },
      focus: {
        en: ["Brand Building", "Commerce Experience", "Product Catalog Architecture", "Customer Journey", "Operational Thinking"],
        ar: ["بناء العلامة التجارية", "تجربة التجارة الإلكترونية", "بنية كتالوج المنتجات", "رحلة العميل", "التفكير التشغيلي"]
      },
      overview: {
        en: "Royal Sea sells high-quality seafood straight to customers. They already had the reputation offline; the job was an online store that matched it — clear, fast, and trustworthy enough to buy from on the first visit.",
        ar: "رويال سي بيبيع مأكولات بحرية عالية الجودة للعملاء مباشرة. سُمعتهم كانت قوية أوفلاين أصلاً، فالشغل كان إننا نعمل متجر أونلاين على نفس المستوى — واضح، سريع، وتثق فيه وتشتري منه من أول زيارة."
      },
      businessContext: {
        en: "High-end seafood is a trust purchase. The store had to make freshness obvious, be upfront about sourcing, and make the price make sense — from the first screen.",
        ar: "شراء مأكولات بحرية غالية قرار قائم على الثقة. فالمتجر كان لازم يبيّن الطزاجة بوضوح، يكون صريح في مصدر المنتج، ويخلّي السعر منطقي — من أول شاشة."
      },
      problem: {
        en: "Off-the-shelf templates looked cheap and didn't carry the quality. On top of that, sourcing details, fresh-vs-frozen, and delivery scheduling added friction that lost people at checkout.",
        ar: "القوالب الجاهزة شكلها رخيص ومبتوصّلش الجودة. وكمان تفاصيل المصدر، والتفريق بين الطازة والمجمّد، ومواعيد التوصيل كانت بتعقّد الموضوع وبتخلّي الناس تسيب صفحة الدفع."
      },
      solution: {
        en: "Built a custom Shopify setup with a tight, high-end look. Organized the 38-product catalog around clear freshness cues, set up local checkout, and made picking a delivery slot simple for Cairo.",
        ar: "بنيت متجر شوبيفاي مخصّص بشكل راقي ومرتّب. نظّمت الكتالوج (٣٨ منتج) حول إشارات طزاجة واضحة، ظبطت الدفع المحلي، وسهّلت اختيار ميعاد التوصيل للقاهرة."
      },
      decisions: {
        en: [
          "Catalog Separation: Split fresh catch from frozen collections to align expectations on delivery time.",
          "Visual Quality Signals: Designed custom badges for catch location (e.g., Red Sea, Mediterranean) to build instant trust.",
          "Frictionless Checkout: Removed nested steps in cart, reducing details down to delivery date and time slots."
        ],
        ar: [
          "فصل الكتالوج: قسمنا المنتجات لمجموعات طازة ومجمدة لتنسيق توقعات العميل عن وقت التوصيل.",
          "إشارات الثقة البصرية: عملنا شارات مخصصة لمكان الصيد (البحر الأحمر، المتوسط) لبناء مصداقية فورية.",
          "تبسيط الدفع: لغينا الخطوات الكتيرة في السلة واختصرنا البيانات المطلوبة في تاريخ التوصيل والميعاد المفضل."
        ]
      },
      systemArchitecture: {
        en: "Wired Shopify's Liquid backend into a streamlined frontend. Configured local payment gateways, Arabic domain routing, and structured metadata for SEO search queries.",
        ar: "ربطنا خلفية شوبيفاي بواجهة سريعة وخفيفة. ضبطنا بوابات الدفع المحلية، وتوجيه النطاق العربي، وهيكلة البيانات الوصفية لمحركات البحث."
      },
      outcome: {
        en: "The result is a fast bilingual store that's easy to browse and buy from — one that finally looks as good as the seafood it sells.",
        ar: "النتيجة متجر سريع بلغتين سهل تتصفّحه وتشتري منه — وأخيراً شكله بقى على قد جودة المأكولات اللي بيبيعها."
      },
      stats: [
        { lbl: "CATALOG SIZE", val: "38 SKUs", desc: "Structured, translated & QA'd end-to-end" },
        { lbl: "LOCALIZATION", val: "100% AR/EN", desc: "Catalogs, pages & metadata fully synced" }
      ],
      link: "https://royal-sea-eg.com"
    },
    {
      id: "MEDIEVAL ALOUD",
      glyph: "M",
      glyphClass: "wc-1",
      tag: { en: "Luxury Fragrance Brand", ar: "دار عطور فاخرة" },
      title: "Medieval Aloud",
      website: "https://medieval-aloud.com",
      status: { en: "Live", ar: "مشروع حي" },
      previewImage: "https://medieval-aloud.com/cdn/shop/files/ChatGPT_Image_May_24_2026_06_48_23_PM.png?v=1779637738&width=1200",
      problem_short: {
        en: "A luxury oud and musk brand nobody could find in Gulf search — with product copy that read generic.",
        ar: "دار عطور عود ومسك فاخرة بدون ظهور في محركات البحث الخليجية — ونصوص بتبان عادية."
      },
      outcome_short: {
        en: "Rewrote the brand voice, built SEO around how the Gulf actually searches, and gave it a storefront that reads like a boutique.",
        ar: "إعادة صياغة كاملة لنبرة البراند، بنية SEO خليجية، ومتجر يحس بنفسه محل عطور فاخر."
      },
      card: {
        en: "A Shopify store for an oud and musk house — full Arabic localization, brand copy rewritten, and SEO built for the Gulf market.",
        ar: "نظام تجارة لدار عطور عربية فاخرة (العود والمسك) على شوبيفاي بتعريب كامل، وصياغة راقية، وبنية SEO مظبوطة للسوق الخليجي."
      },
      meta: {
        en: ["Luxury Positioning", "Brand Voice", "Search Architecture"],
        ar: ["تموضع الفخامة", "نبرة الصوت للبراند", "بنية البحث"]
      },
      focusTags: {
        en: ["Brand Strategy", "Luxury Positioning", "Content Direction", "Gulf SEO", "Commerce Experience"],
        ar: ["استراتيجية البراند", "تموضع الفخامة", "توجيه المحتوى", "SEO خليجي", "تجربة التجارة"]
      },
      techs: {
        en: ["Shopify Engine", "Premium Copywriting", "SEO Optimization", "Gulf Market Adaptability"],
        ar: ["محرك شوبيفاي", "كتابة النصوص الفاخرة", "تحسين الـ SEO", "ملاءمة السوق الخليجي"]
      },
      focus: {
        en: ["Brand Strategy", "Luxury Positioning", "Product System Design", "Ecommerce Experience", "Content & Visual Direction"],
        ar: ["استراتيجية البراند", "تموضع الفخامة", "تصميم نظام المنتجات", "تجربة التجارة الإلكترونية", "التوجيه البصري والمحتوى"]
      },
      overview: {
        en: "Medieval Aloud is a fragrance house built around oud, musk, and Arabian oils. You can't smell a product online, so the store leans on its writing, a clean layout, and a brand voice that fits what the perfumes actually cost.",
        ar: "ميدييفال ألاود دار عطور قايمة على العود والمسك والزيوت العربية. إنت مبتقدرش تشمّ المنتج أونلاين، فالمتجر بيعتمد على الكتابة، وتصميم نضيف، ونبرة براند على قد سعر العطور فعلاً."
      },
      businessContext: {
        en: "You buy fragrance on imagination, so the store has to do the work with words, clean type, and positioning that signals quality — turning a search into a sale.",
        ar: "شراء العطر بيعتمد على الخيال. فالمتجر لازم يشتغل بالكلمة، والخطوط النضيفة، والتموضع اللي بيوحي بالجودة — عشان يحوّل البحث لشراء."
      },
      problem: {
        en: "Oud and musk are often mislabeled online, so search gets confusing. The brand was invisible in the Gulf, and the product copy didn't sound like it belonged to a serious fragrance house.",
        ar: "العود والمسك كتير بيتسمّوا غلط أونلاين، فالبحث بيلخبط. البراند كان مش ظاهر خالص في الخليج، ونصوص المنتجات مكانتش بتحسّ إنها بتاعة دار عطور محترمة."
      },
      solution: {
        en: "Organized the catalog by scent family, rewrote the Arabic and English product copy so it actually sounds like the brand, and built SEO around the oud and musk terms people search in the Gulf.",
        ar: "رتّبت الكتالوج حسب عائلات العطر، وأعدت كتابة نصوص المنتجات بالعربي والإنجليزي بحيث تبان فعلاً نبرة البراند، وبنيت SEO حوالين كلمات العود والمسك اللي الناس بتدوّر بيها في الخليج."
      },
      decisions: {
        en: [
          "Story-First Layout: Put ingredients and notes above tech specs to build sensory appeal.",
          "Gulf Copy Tuning: Refined the Arabic copy line-by-line using premium Gulf vocabulary instead of generic translations.",
          "Clean Checkout Path: Simplified the steps to purchase on mobile device screen sizes to optimize conversions in fast-paced markets."
        ],
        ar: [
          "تنسيق القصة أولاً: حطينا المكونات والنوتات العطرية فوق المواصفات الفنية لإثارة رغبة العميل.",
          "ضبط نصوص الخليج: صقلنا النصوص العربية سطر سطر لتتناسب مع لهجة وقاموس الفخامة في الخليج بدلاً من الترجمة الحرفية.",
          "مسار دفع سريع: بسّطنا خطوات الشراء على الموبايل لرفع معدل التحويل في أسواق سريعة الحركة."
        ]
      },
      systemArchitecture: {
        en: "Configured clean Shopify Liquid structuring, optimized page asset sizes for fast mobile loads in Saudi Arabia and the UAE, and set up bilingual URL mapping.",
        ar: "ضبطنا هيكل شوبيفاي ليكون سريع وخفيف، وحسّنا أحجام ملفات الموقع لسرعة تحميل فائقة في السعودية والإمارات، وعملنا روابط متوافقة بين اللغتين."
      },
      outcome: {
        en: "A fully localized fragrance store that sounds like itself — and is findable where its buyers actually are, in the Gulf.",
        ar: "متجر عطور معرّب بالكامل بيتكلم بنبرته الحقيقية — وموجود ويتلاقى في المكان اللي عملاؤه فيه، الخليج."
      },
      stats: [
        { lbl: "SEO COVERAGE", val: "100%", desc: "Bilingual search-optimized metadata" },
        { lbl: "BRAND VOICE", val: "Rebuilt", desc: "Gulf-grade Arabic copy, product-by-product" }
      ],
      link: "https://medieval-aloud.com"
    },
    {
      id: "SEAFOOD MOOD",
      glyph: "S",
      glyphClass: "wc-4",
      tag: { en: "Seafood Commerce Platform", ar: "منصة تجارة مأكولات بحرية" },
      title: "Seafood Mood",
      website: "https://seafood-mood.com",
      status: { en: "Live", ar: "مشروع حي" },
      previewImage: "https://www.seafood-mood.com/cdn/shop/files/5_9b25aaa5-430f-430c-a9e5-2630fd9e93a0.png?v=1774365601&width=1200",
      problem_short: {
        en: "Fresh seafood stock changes by the day — and a static cart turns that into failed orders and delivery chaos.",
        ar: "مخزون الأسماك الطازجة بيتغير يومياً — السلة التقليدية بتسبب فشل في الطلبات وفوضى في التوصيل."
      },
      outcome_short: {
        en: "A store that tracks stock live, sends order updates over WhatsApp, and keeps the whole order flow digital.",
        ar: "محرك تجارة ديناميكي — مزامنة مخزون حية، متابعة واتساب أوتوماتيكية، وعمليات طلبات ١٠٠% رقمية."
      },
      card: {
        en: "A seafood store built around stock that changes daily — live availability, live pricing, and fulfillment connected from cart to delivery.",
        ar: "منصة تجارة ديناميكية لطلب الأسماك الطازجة — تدفقات المخزون، الأسعار الحية، ومنطق التوريد متصلين من الأول للآخر."
      },
      meta: {
        en: ["Platform Design", "Operational Flow", "Inventory Systems"],
        ar: ["تصميم المنصة", "التدفق التشغيلي", "أنظمة المخزون"]
      },
      focusTags: {
        en: ["Digital Commerce", "Inventory Operations", "Customer Experience", "Workflow Design", "Fulfillment Logic"],
        ar: ["التجارة الرقمية", "عمليات المخزون", "تجربة العميل", "تصميم التدفقات", "منطق التوريد"]
      },
      techs: {
        en: ["Commerce Engine", "Dynamic Pricing Workflows", "Order Routing System", "UX Design"],
        ar: ["محرك التجارة", "تدفقات التسعير الديناميكي", "نظام توجيه الطلبات", "تصميم تجربة المستخدم"]
      },
      focus: {
        en: ["Digital Commerce", "Customer Experience", "Product Structure", "Business Workflow Design"],
        ar: ["التجارة الرقمية", "تجربة العملاء", "هيكل المنتجات", "تصميم تدفقات عمل البيزنس"]
      },
      overview: {
        en: "Seafood Mood brings the day's catch to city buyers. The catch and its price change daily, so the store stays tied to what's actually in stock instead of pretending everything is always available.",
        ar: "سيفود مود بيوصّل صيد اليوم للناس في المدن. الصيد وسعره بيتغيّروا كل يوم، فالمتجر بيفضل مربوط باللي متوفر فعلاً بدل ما يدّعي إن كل حاجة موجودة على طول."
      },
      businessContext: {
        en: "Fresh seafood is volatile: sourcing shifts daily, prices move with the catch, and people still expect a reliable delivery slot. The store had to absorb all that and stay dependable.",
        ar: "تجارة المأكولات البحرية الطازة متقلّبة: المصدر بيتغيّر يومياً، والسعر بيتحرّك مع الصيد، والناس برضه عايزة ميعاد توصيل موثوق. المتجر كان لازم يستوعب ده كله ويفضل معتمد عليه."
      },
      problem: {
        en: "A static cart breaks the moment something sells out mid-day. Sourcing and fulfillment weren't connected either, which meant manual order fixes and late delivery calls.",
        ar: "السلة الثابتة بتبوظ أول ما حاجة تخلص نص اليوم. وكمان المصدر والتوصيل مكانوش متوصّلين، وده معناه تعديل طلبات يدوي ومكالمات توصيل متأخرة."
      },
      solution: {
        en: "Built a store that keeps availability current, adjusts delivery options to what logistics can actually handle, and organizes incoming orders for direct routing.",
        ar: "بنيت متجر بيخلّي التوفّر محدّث، وبيظبط خيارات التوصيل على قد اللي اللوجستيات تقدر تعمله فعلاً، وبيرتّب الطلبات الجاية للتوجيه المباشر."
      },
      decisions: {
        en: [
          "Dynamic Inventory Sync: Set up automated stock thresholds to hide sold-out catches instantly.",
          "Visual Freshness Cards: Rebuilt the cards layout to show catch dates and delivery windows clearly.",
          "Unified Customer View: Integrated customer accounts with automated WhatsApp tracking alerts."
        ],
        ar: [
          "مزامنة المخزون الديناميكية: ضبطنا حدود المخزون التلقائية لإخفاء الأسماك المباعة فوراً وتجنب الطلبات الملغاة.",
          "كروت الطزاجة البصرية: أعدنا تصميم الكروت لعرض تاريخ الصيد ومواعيد التوصيل بوضوح للعميل.",
          "حساب موحد للعميل: ربطنا حسابات العملاء بتنبيهات تتبع أوتوماتيكية عبر الواتساب."
        ]
      },
      systemArchitecture: {
        en: "Integrated commerce backend with automated dispatching pipelines, localized address-mapping systems, and payment gateway APIs.",
        ar: "ربطنا خلفية المتجر بمسارات توزيع آلية، وأنظمة لتحديد العناوين محلياً، وبوابات الدفع الإلكتروني."
      },
      outcome: {
        en: "A seafood store that takes the guesswork out of daily stock — smoother operations, and a quick, reliable order for the buyer.",
        ar: "متجر مأكولات بحرية شال التخمين من موضوع المخزون اليومي — تشغيل أسلس، وطلب سريع وموثوق للعميل."
      },
      stats: [
        { lbl: "INVENTORY SYNC", val: "Real-time", desc: "Live stock visibility eliminates mid-day failures" },
        { lbl: "ORDER FLOW", val: "100% Digital", desc: "WhatsApp calls fully replaced by automated loop" }
      ],
      link: "https://seafood-mood.com"
    },
    {
      id: "UNITED",
      glyph: "U",
      glyphClass: "wc-2",
      tag: { en: "B2B Fresh Produce Supplier", ar: "مورد حاصلات طازجة B2B" },
      title: "UNITED",
      website: "https://united-ffv.com",
      status: { en: "Live", ar: "مشروع حي" },
      previewImage: "assets/united_preview.jpg",
      problem_short: {
        en: "A B2B produce supplier running wholesale over WhatsApp and phone calls — wrong invoices, expired stock, and no real visibility.",
        ar: "مورد جملة بيدير طلباته على الواتساب والتليفون — أخطاء فواتير، منتجات تالفة، وصفر رؤية."
      },
      outcome_short: {
        en: "Took the whole supply chain digital: a contract-pricing portal, automatic PDF invoices, and warehouse packing lists.",
        ar: "رقمنة كاملة لسلسلة التوريد — بوابة أسعار العقود، فواتير PDF أوتوماتيكية، وقوائم تعبئة المخازن."
      },
      card: {
        en: "A B2B ordering and operations system for a fresh-produce supplier — ordering, invoicing, and warehouse logistics in one place.",
        ar: "نظام عمليات وتجارة B2B متكامل لمورد حاصلات زراعية طازجة — أتمتة الطلبات، الفواتير، ولوجستيات سلاسل التوريد."
      },
      meta: {
        en: ["B2B Infrastructure", "Supply Chain Systems", "Operational Automation"],
        ar: ["بنية تحتية B2B", "أنظمة سلاسل التوريد", "أتمتة العمليات"]
      },
      focusTags: {
        en: ["B2B Commerce", "Supply Chain Design", "Workflow Automation", "Operations", "Digital Transformation"],
        ar: ["التجارة B2B", "تصميم سلاسل التوريد", "أتمتة العمليات", "التشغيل", "التحول الرقمي"]
      },
      techs: {
        en: ["Operations Design", "Invoice Automation", "Logistics Routing", "Wholesale Portal UX"],
        ar: ["تصميم العمليات", "أتمتة الفواتير", "توجيه اللوجستيات", "واجهة بوابة الجملة"]
      },
      focus: {
        en: ["Business Systems", "Operations", "B2B Commerce", "Supply Chain Thinking", "Digital Transformation"],
        ar: ["أنظمة الأعمال", "العمليات", "التجارة بين الشركات", "تفكير سلاسل التوريد", "التحول الرقمي"]
      },
      overview: {
        en: "UNITED supplies fresh fruit and vegetables to hotels, restaurants, and caterers. They were running the whole wholesale operation by hand, so the work was turning it into a digital system that cuts the paperwork and handles the daily shipping cycle.",
        ar: "يونايتد هي مورد B2B كبير للفواكه والخضروات للفنادق والمطاعم وشركات التموين. أعدنا هيكلة دورة طلبات الجملة اليدوية لنظام عمليات رقمي قوي بيقضي على المجهود الإداري وبيأتمت دورات الشحن اليومية."
      },
      businessContext: {
        en: "B2B commerce operates on volume and accuracy. Restaurant kitchens need precise produce deliveries, customized price contracts must be dynamically honored, and invoicing must align with corporate accounting schedules without human errors.",
        ar: "التجارة بين الشركات (B2B) بتعتمد على الحجم والدقة. مطابخ المطاعم بتحتاج توصيل دقيق للخضار والفاكهة، وأسعار العقود المخصصة لازم تتنفذ أوتوماتيكياً، وإصدار الفواتير لازم يتطابق مع الأنظمة المحاسبية للشركات بدون أخطاء بشرية."
      },
      problem: {
        en: "The supplier relied on phone calls and WhatsApp sheets, creating invoice mismatches and logistics delays. Fresh produce expired in warehouses due to lack of real-time demand visibility, leading to high product waste.",
        ar: "كان المورد بيعتمد على المكالمات الهاتفية وقوائم الواتساب، وده كان بيعمل أخطاء في الفواتير وتأخير في التوصيل. كمان المنتجات الطازة كانت بتبوظ في المخازن لعدم وجود رؤية لحظية للطلب، مما أدى لهدر كبير للمنتجات."
      },
      solution: {
        en: "Engineered a wholesale digital portal where buyers place contract-priced orders. Integrated an automated invoice generation engine and a warehouse packing list system synchronized with shipping dispatch schedules.",
        ar: "صممنا بوابة رقمية للجملة بيقوم المشترين من خلالها بطلب احتياجاتهم بأسعار عقودهم المحددة. ودمجنا محرك أوتوماتيكي لإصدار الفواتير ونظام لقوائم التعبئة في المخازن متزامن مع مواعيد الشحن."
      },
      decisions: {
        en: [
          "Contract-Based Pricing: Built custom price profiles so each restaurant group sees their pre-negotiated wholesale rates.",
          "Automated PDF Invoicing: Programmed direct PDF creation on order confirmation to bypass accounting bottlenecks.",
          "Warehouse Manifest Generation: Configured automated sorting of items by weight and cooling requirements to speed up packing."
        ],
        ar: [
          "التسعير القائم على العقود: بنينا ملفات أسعار مخصصة عشان كل مجموعة مطاعم تظهرلها أسعار الجملة المتفاوض عليها مسبقاً.",
          "أتمتة فواتير PDF: برمجنا إصدار فواتير الـ PDF تلقائياً عند تأكيد الطلب لتخطي الاختناق المحاسبي.",
          "قوائم ترتيب المخازن: عملنا ترتيب تلقائي للمنتجات حسب الوزن والاحتياج للتبريد لتسريع عملية التعبئة للسيارات."
        ]
      },
      systemArchitecture: {
        en: "Wired the wholesale commerce flow with custom database pricing structures, logistics dispatch routes, and invoice print templates.",
        ar: "ربطنا تدفق تجارة الجملة بقواعد بيانات أسعار مخصصة، ومسارات التوزيع اللوجستية، وقوالب طباعة الفواتير."
      },
      outcome: {
        en: "Digitized the entire supply chain workflow. Reduced order errors to near zero, accelerated invoice delivery, and optimized warehouse space by aligning inventory with real culinary buyer demand.",
        ar: "حولنا كامل سلسلة التوريد للرقمية. قللنا أخطاء الطلبات لـ صفر تقريباً، وسرّعنا تسليم الفواتير، وحسّنا استخدام مساحات المخازن بربط المخزون بالطلب الفعلي."
      },
      stats: [
        { lbl: "INVOICING SPEED", val: "Instant", desc: "Auto-PDF on order confirm — zero manual entry" },
        { lbl: "ORDER ACCURACY", val: "~100%", desc: "Contract-price validation eliminates entry errors" }
      ],
      link: "https://united-ffv.com"
    },
    {
      id: "PANTOUFLA",
      glyph: "P",
      glyphClass: "wc-5",
      tag: { en: "Lifestyle Footwear Brand", ar: "براند أحذية لايف ستايل" },
      title: "Pantoufla",
      website: "https://pantoufla.com",
      status: { en: "Live", ar: "مشروع حي" },
      previewImage: "assets/pantoufla_preview.jpg",
      problem_short: {
        en: "A Cairo footwear brand starting from zero — no identity, no store, no plan.",
        ar: "براند أحذية قاهري بيبدأ من الصفر — بدون هوية، بدون متجر، بدون خطة."
      },
      outcome_short: {
        en: "Brand identity, a Shopify store, and a bilingual catalog — all built in six weeks.",
        ar: "هوية براند كاملة، متجر شوبيفاي، وكتالوج بلغتين من الأول للآخر في ٦ أسابيع."
      },
      card: {
        en: "A from-scratch brand and store for a Cairo slippers and casual-footwear label — identity, catalog, and launch handled together.",
        ar: "بناء براند ومتجر من الصفر لبراند شباشب وأحذية كاجوال قاهري — هوية، كتالوج، وإطلاق في نظام واحد."
      },
      meta: {
        en: ["Brand Identity", "Commerce Launch", "Go-to-Market"],
        ar: ["هوية العلامة", "إطلاق المتجر", "الدخول للسوق"]
      },
      focusTags: {
        en: ["Brand Build", "Visual Identity", "Commerce System", "Launch Strategy", "Bilingual UX"],
        ar: ["بناء البراند", "الهوية البصرية", "نظام التجارة", "استراتيجية الإطلاق", "تجربة ثنائية اللغة"]
      },
      techs: {
        en: ["Brand Strategy", "Shopify Build", "Visual Identity", "Product Photography Direction"],
        ar: ["استراتيجية البراند", "بناء شوبيفاي", "الهوية البصرية", "توجيه تصوير المنتج"]
      },
      focus: {
        en: ["Brand Creation", "Commerce Architecture", "Identity Design", "Launch Strategy", "Customer Journey"],
        ar: ["خلق البراند", "بنية التجارة", "تصميم الهوية", "استراتيجية الإطلاق", "رحلة العميل"]
      },
      overview: {
        en: "Pantoufla is a Cairo footwear brand — slippers and casual shoes. I built it from scratch: the name and visual identity first, then a full Shopify store ready to sell.",
        ar: "بانتوفلا براند أحذية قاهري — شباشب وأحذية كاجوال. بنيته من الصفر: الاسم والهوية البصرية الأول، وبعدها متجر شوبيفاي كامل جاهز للبيع."
      },
      businessContext: {
        en: "There are cheap slippers everywhere and pricey shoes everywhere, but little in between that feels considered. Pantoufla needed to stay warm and approachable while still looking like a real, consistent brand.",
        ar: "فيه شباشب رخيصة في كل حتة وأحذية غالية في كل حتة، بس مفيش كتير في النص بيحسّ إنه معمول بعناية. بانتوفلا كان لازم تفضل دافية وقريبة، وفي نفس الوقت شكلها براند حقيقي ومتّسق."
      },
      problem: {
        en: "The founders had a clear product vision but no brand framework, no digital storefront, and no strategy for entering a crowded market. They needed a full launch system, not just a website.",
        ar: "المؤسسين كان عندهم رؤية واضحة للمنتج، بس من غير هوية، من غير متجر، ومن غير خطة لدخول سوق زحمة. كانوا محتاجين نظام إطلاق كامل، مش مجرد موقع."
      },
      solution: {
        en: "Designed the identity from scratch — logo, colors, typography, and packaging — then built a bilingual Shopify store with a catalog that's easy to browse by style.",
        ar: "صممت الهوية من الأساس — الشعار، الألوان، الخطوط، ولغة التغليف — وبعدها بنيت متجر شوبيفاي بلغتين بكتالوج سهل تتصفّحه حسب الستايل."
      },
      decisions: {
        en: [
          "Arabic-First Naming: Designed the brand language to work in Egyptian Arabic first, English second — not the other way around.",
          "Warm Visual Language: Chose a soft, earthy color palette that communicates comfort without looking generic.",
          "Built for Browsing: Organized the store so a shopper lands on the right pair quickly — by style — instead of dry product categories."
        ],
        ar: [
          "التسمية بالعربي أولاً: صممنا لغة البراند لتشتغل بالعربي المصري أولاً، الإنجليزي ثانياً — مش العكس.",
          "لغة بصرية دافية: اخترنا لوحة ألوان ناعمة وترابية بتوصل إحساس الراحة من غير ما تبان عادية.",
          "متصمّم للتصفّح: رتّبت المتجر بحيث الزبون يوصل لأنسب موديل بسرعة — حسب الستايل — مش حسب تصنيفات منتج جافة."
        ]
      },
      systemArchitecture: {
        en: "Built on Shopify with custom theme modifications, bilingual product content, and a streamlined checkout flow optimized for Egyptian mobile users.",
        ar: "بُني على شوبيفاي بتعديلات ثيم مخصصة، ومحتوى منتجات ثنائي اللغة، ومسار دفع مبسط محسّن لمستخدمي الموبايل المصريين."
      },
      outcome: {
        en: "Launched a fully operational brand and commerce system in 6 weeks. Pantoufla entered the market with a clear identity, a working store, and a go-to-market plan ready to execute.",
        ar: "أطلقت براند ومتجر شغّال بالكامل في ٦ أسابيع. بانتوفلا نزلت السوق بهوية واضحة، متجر شغّال، وخطة إطلاق جاهزة."
      },
      stats: [
        { lbl: "TIME TO LAUNCH", val: "6 Weeks", desc: "Zero-to-live: brand + store + strategy" },
        { lbl: "CATALOG BUILD", val: "Bilingual", desc: "AR/EN product content, SEO-structured" }
      ],
      link: "https://pantoufla.com"
    },
    {
      id: "THE FISHMONGER",
      glyph: "F",
      glyphClass: "wc-6",
      tag: { en: "Full-Stack Seafood Marketplace", ar: "منصة مأكولات بحرية متكاملة" },
      title: "Fishmonger / Al Hoot",
      website: "https://alhoot-eg.com",
      status: { en: "Live", ar: "مشروع حي" },
      previewImage: "assets/fishmonger_preview.jpg",
      problem_short: {
        en: "A growing seafood marketplace needed a real platform — not a template store — with a proper dashboard, secure accounts, and role-based control.",
        ar: "ماركت بليس مأكولات بحرية بينمو كان محتاج منصة حقيقية — مش متجر قالب جاهز — بداشبورد كامل، حسابات آمنة، وتحكّم بالصلاحيات."
      },
      outcome_short: {
        en: "Built and hardened a full-stack platform: dashboard, product management, auth, analytics, role-based permissions, and advanced Supabase RLS.",
        ar: "بنينا وأمّنّا منصة فول-ستاك: داشبورد، إدارة منتجات، تسجيل دخول، تحليلات، صلاحيات بالأدوار، وSupabase RLS متقدم."
      },
      card: {
        en: "A full-stack seafood marketplace engineered for control and trust — admin dashboard, secure auth, analytics, and database-level security.",
        ar: "ماركت بليس مأكولات بحرية فول-ستاك متبني للتحكّم والثقة — داشبورد إدارة، تسجيل دخول آمن، تحليلات، وأمان على مستوى قاعدة البيانات."
      },
      meta: {
        en: ["Full-Stack Build", "Admin Dashboard", "Supabase RLS"],
        ar: ["بناء فول-ستاك", "داشبورد إدارة", "Supabase RLS"]
      },
      focusTags: {
        en: ["Full-Stack Platform", "Admin Dashboard", "Authentication", "Analytics", "Security Hardening"],
        ar: ["منصة فول-ستاك", "داشبورد إدارة", "المصادقة", "التحليلات", "تأمين النظام"]
      },
      techs: {
        en: ["Supabase", "Row-Level Security", "Auth & RBAC", "Analytics"],
        ar: ["Supabase", "أمان على مستوى الصف", "مصادقة وصلاحيات", "تحليلات"]
      },
      focus: {
        en: ["Platform Engineering", "Database Architecture", "Access Control", "Security", "Operations"],
        ar: ["هندسة المنصة", "بنية قاعدة البيانات", "التحكّم بالوصول", "الأمان", "العمليات"]
      },
      overview: {
        en: "Fishmonger / Al Hoot is a full-stack seafood marketplace. I built and stabilized the platform end to end — an admin dashboard, product management, authentication, analytics, role-based permissions, a clean database architecture, security hardening, and advanced Supabase Row-Level Security.",
        ar: "فيش مونجر / الحوت هو ماركت بليس مأكولات بحرية فول-ستاك. بنيت وثبّتت المنصة من الأول للآخر — داشبورد إدارة، إدارة منتجات، مصادقة، تحليلات، صلاحيات بالأدوار، بنية قاعدة بيانات نضيفة، تأمين النظام، وSupabase Row-Level Security متقدم."
      },
      businessContext: {
        en: "A seafood marketplace handling real orders and inventory can't run on a fragile template. It needed secure accounts, controlled team access, reliable data, and a dashboard the business could actually operate from.",
        ar: "ماركت بليس مأكولات بحرية بيتعامل مع طلبات ومخزون حقيقي مينفعش يشتغل على قالب هش. كان محتاج حسابات آمنة، وصول فريق متحكّم فيه، بيانات موثوقة، وداشبورد البيزنس يقدر يشتغل منه فعلاً."
      },
      problem: {
        en: "The platform needed to be both built and stabilized: proper authentication, role-based permissions so each team member sees only what they should, trustworthy analytics, and database-level security to protect orders and customer data.",
        ar: "المنصة كانت محتاجة تتبني وتتثبّت: مصادقة سليمة، صلاحيات بالأدوار بحيث كل عضو يشوف اللي يخصّه بس، تحليلات موثوقة، وأمان على مستوى قاعدة البيانات يحمي الطلبات وبيانات العملاء."
      },
      solution: {
        en: "Engineered a full-stack platform on Supabase: an operations dashboard, product management, secure auth with role-based access control, analytics, and a hardened database with advanced Row-Level Security policies isolating data by role.",
        ar: "هندست منصة فول-ستاك على Supabase: داشبورد عمليات، إدارة منتجات، مصادقة آمنة بصلاحيات بالأدوار، تحليلات، وقاعدة بيانات مؤمّنة بسياسات Row-Level Security متقدمة بتعزل البيانات حسب الدور."
      },
      decisions: {
        en: [
          "Security at the Database Layer: Enforced access with Supabase Row-Level Security, so permissions hold even if the front-end is bypassed.",
          "Role-Based Access Control: Modeled clear roles so each team member's dashboard exposes only the data and actions they own.",
          "Build then Stabilize: Prioritized hardening, reliable data, and analytics so the platform could be trusted in daily operations."
        ],
        ar: [
          "الأمان في طبقة قاعدة البيانات: فرضت الوصول بـSupabase Row-Level Security، فالصلاحيات بتفضل صامدة حتى لو اتخطّى الواجهة.",
          "التحكّم بالوصول بالأدوار: عملت أدوار واضحة بحيث داشبورد كل عضو يعرض البيانات والإجراءات اللي تخصّه بس.",
          "نبني الأول وبعدين نثبّت: ركّزت على التأمين، البيانات الموثوقة، والتحليلات عشان المنصة يُعتمد عليها في التشغيل اليومي."
        ]
      },
      systemArchitecture: {
        en: "Full-stack architecture on Supabase: a relational database schema, authentication and role-based permissions, an admin/operations dashboard, analytics, and advanced Row-Level Security policies hardening every table.",
        ar: "معمارية فول-ستاك على Supabase: سكيمة قاعدة بيانات علائقية، مصادقة وصلاحيات بالأدوار، داشبورد إدارة/عمليات، تحليلات، وسياسات Row-Level Security متقدمة بتأمّن كل جدول."
      },
      outcome: {
        en: "Delivered a stable, secure full-stack marketplace the team operates daily — with controlled access, trustworthy analytics, and database-level protection for orders and customer data.",
        ar: "سلّمت ماركت بليس فول-ستاك مستقر وآمن الفريق بيشتغل عليه يوميًا — بوصول متحكّم فيه، تحليلات موثوقة، وحماية على مستوى قاعدة البيانات للطلبات وبيانات العملاء."
      },
      stats: [
        { lbl: "PLATFORM", val: "Full-Stack", desc: "Dashboard, auth, analytics, RBAC" },
        { lbl: "SECURITY", val: "RLS Hardened", desc: "Supabase Row-Level Security on every table" }
      ],
      link: "https://alhoot-eg.com"
    }
  ];

  /* lookup by id for the modal */
  MOS.data.PROJECT_BY_ID = {};
  MOS.data.PROJECTS.forEach(function (p) { MOS.data.PROJECT_BY_ID[p.id] = p; });
})(window.MOS = window.MOS || {});
