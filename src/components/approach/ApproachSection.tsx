"use client";

import { useLang } from "@/context/LangContext";

export default function ApproachSection() {
  const { isRtl } = useLang();

  const steps = [
    {
      num: "01",
      icon: "🔍",
      title: { en: "Discovery & Context", ar: "الاستكشاف والسياق" },
      desc: {
        en: "We audit your current operations, understand your margins, and define the core problem your storefront must solve.",
        ar: "ندرس عملياتك الحالية، ونفهم هوامش أرباحك، ونحدد المشكلة الأساسية التي يجب أن يحلها المتجر."
      }
    },
    {
      num: "02",
      icon: "📋",
      title: { en: "Pricing & Strategy", ar: "التسعير والاستراتيجية" },
      desc: {
        en: "Before design, we define catalog architecture, local checkout requirements, and how shipping and pricing align.",
        ar: "قبل التصميم، نحدد بنية الكتالوج، ومتطلبات الدفع المحلي، وكيفية مواءمة الشحن والتسعير."
      }
    },
    {
      num: "03",
      icon: "🎨",
      title: { en: "Identity & Interface", ar: "الهوية والواجهة" },
      desc: {
        en: "We design a high-end interface that is optimized for conversion, making sure it visually matches the product's value.",
        ar: "نصمم واجهة مستخدم راقية ومحسنة للتحويل، للتأكد من مواءمتها بصرياً مع قيمة المنتج الحقيقية."
      }
    },
    {
      num: "04",
      icon: "💻",
      title: { en: "Shopify Engineering", ar: "هندسة شوبيفاي" },
      desc: {
        en: "We code custom Shopify Liquid setups, optimize assets for fast mobile load speeds, and integrate payments.",
        ar: "نبرمج قوالب شوبيفاي مخصصة وسريعة، ونحسن الأصول للتحميل السريع على الموبايل، ونربط بوابات الدفع."
      }
    },
    {
      num: "05",
      icon: "🚀",
      title: { en: "Go-to-Market Launch", ar: "الدخول للسوق والإطلاق" },
      desc: {
        en: "We set up tracking analytics, verify domain routing, and execute a structured checklist for a smooth go-live.",
        ar: "نضبط تحليلات التتبع، ونتحقق من مسارات النطاقات، وننفذ قائمة فحص منظمة لإطلاق آمن للجمهور."
      }
    },
    {
      num: "06",
      icon: "📈",
      title: { en: "Data-Driven Growth", ar: "النمو الموجه بالبيانات" },
      desc: {
        en: "We scale acquisition via performance campaigns and optimize conversion rates based on real buyer actions.",
        ar: "نوسع انتشار الماركة عبر حملات تسويق النمو ونحسن معدلات التحويل بناءً على سلوك المشترين الفعلي."
      }
    }
  ];

  return (
    <section id="approach" className="w-full max-w-[1400px] mx-auto px-6 md:px-8 py-20 relative z-20 select-none">
      {/* Section Header */}
      <div className="flex flex-col gap-2 text-left rtl:text-right mb-12">
        <span className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase font-medium">
          {isRtl ? "منهجية العمل" : "Our Approach"}
        </span>
        <h2 className="font-display font-black text-3xl sm:text-4xl xl:text-5xl text-white tracking-tight">
          {isRtl ? "نظام تشغيل لبناء المتاجر." : "A system for building storefronts."}
        </h2>
      </div>

      {/* Grid of 6 steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="glass-panel-a glass-specular p-6 flex flex-col gap-4 group hover:border-white/10 transition-all duration-300"
          >
            {/* Top row */}
            <div className="flex justify-between items-center">
              {/* Icon Badges */}
              <div className="w-11 h-11 rounded-xl bg-accent/5 border border-accent/15 text-accent flex items-center justify-center text-lg">
                {step.icon}
              </div>
              <span className="font-mono text-[11px] font-bold text-accent">
                {step.num}
              </span>
            </div>

            {/* Title / Description */}
            <div className="flex flex-col gap-2 text-left rtl:text-right">
              <h3 className="font-display font-bold text-lg text-white group-hover:text-accent transition-colors duration-300">
                {isRtl ? step.title.ar : step.title.en}
              </h3>
              <p className="text-[13px] text-ink-2 leading-relaxed">
                {isRtl ? step.desc.ar : step.desc.en}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
