export interface ServiceMode {
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  meters: [string, number][];
}

export const SERVICE_MODES: ServiceMode[] = [
  {
    title: { en: "Product Strategy & Positioning", ar: "استراتيجية وتموضع المنتج" },
    description: {
      en: "Before any design starts, we define what the product should be, how it's priced, and who it's for. Every decision that follows depends on getting this right.",
      ar: "قبل ما يبدأ أي تصميم، نحدد المنتج هيكون إيه وهيتسعر إزاي ومين جمهوره. كل قرار بعد كده بيعتمد على صح التصاحيح ده."
    },
    meters: [["Market Discovery", 92], ["Pricing Architecture", 88], ["Product Thinking", 95]]
  },
  {
    title: { en: "Shopify Development", ar: "تطوير شوبيفاي" },
    description: {
      en: "We build the store end to end — catalog structure, checkout flow, payment setup, and custom theme development. Built to load fast and convert.",
      ar: "بنبني المتجر من الأول للآخر — بنية الكتالوج، مسار الدفع، ضبط المدفوعات، وتطوير القالب المخصص. مبني ليكون سريع ويحوّل الزوار لعملاء."
    },
    meters: [["Catalog Architecture", 94], ["Checkout Optimization", 91], ["Theme Development", 93]]
  },
  {
    title: { en: "Brand Identity & Design", ar: "هوية العلامة والتصميم" },
    description: {
      en: "Logo, color system, typography, and packaging — built to work consistently across the store, social media, and every customer touchpoint.",
      ar: "الشعار وألوان الهوية والخطوط والتغليف — مبنيين للعمل بثبات عبر المتجر والسوشيال ميديا وكل نقطة تواصل مع العميل."
    },
    meters: [["Visual Identity", 90], ["Brand Consistency", 93], ["Packaging Design", 85]]
  },
  {
    title: { en: "Go-to-Market & Launch", ar: "الإطلاق والدخول للسوق" },
    description: {
      en: "We plan and execute the launch — pricing, channels, messaging, and the full path from first visit to purchase. A finished store needs a proper launch.",
      ar: "بنخطط وننفذ الإطلاق — التسعير والقنوات والرسائل والطريق من أول زيارة للشراء. المتجر الجاهز محتاج إطلاق صح."
    },
    meters: [["Launch Planning", 92], ["Channel Strategy", 89], ["Conversion Funnels", 94]]
  },
  {
    title: { en: "Performance Marketing", ar: "التسويق الرقمي" },
    description: {
      en: "Paid media, SEO, and conversion rate optimization — driven by real data from the store, not generic playbooks.",
      ar: "إعلانات مدفوعة وتحسين محركات البحث وتحسين معدلات التحويل — بناءً على بيانات حقيقية من المتجر، مش خطط عامة."
    },
    meters: [["Paid Media", 88], ["SEO Strategy", 91], ["CRO", 90]]
  }
];
