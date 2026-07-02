"use client";

import { useLang } from "@/context/LangContext";
import { SITE } from "@/data/site";

export default function AboutSection() {
  const { isRtl } = useLang();

  const aboutTags = [
    { en: "Shopify Partner", ar: "شريك شوبيفاي" },
    { en: "Custom Storefronts", ar: "متاجر مخصصة" },
    { en: "Performance Marketing", ar: "تسويق النمو" },
    { en: "Local Payments Integration", ar: "ربط الدفع المحلي" },
    { en: "Conversion Optimization", ar: "تحسين التحويل" },
    { en: "Bilingual Operations", ar: "تشغيل ثنائي اللغة" }
  ];

  return (
    <section id="about" className="w-full max-w-[1400px] mx-auto px-6 md:px-8 py-20 relative z-20 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-stretch">
        
        {/* Left Column: Monogram & Visual Indicators */}
        <div className="rounded-3xl border border-white/5 bg-gradient-to-b from-[#1a1b23] to-[#0a0b0f] p-8 flex flex-col justify-between min-h-[380px] shadow-[0_22px_60px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          {/* Top Status */}
          <div className="flex justify-between items-center z-10">
            <span className="font-mono text-[9px] tracking-wider text-ink-3 uppercase">
              {isRtl ? "تأسس في القاهرة" : "Est. Cairo, EG"}
            </span>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-success font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_#30D158]" />
              {isRtl ? "متاح للعمل" : "Available"}
            </div>
          </div>

          {/* Center Monogram disc */}
          <div className="flex-1 flex items-center justify-center relative">
            <div className="w-[180px] h-[180px] rounded-full bg-gradient-to-tr from-white/[0.03] to-white/[0.01] border border-white/5 flex items-center justify-center relative group-hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 rounded-full bg-radial from-white/[0.04] to-transparent blur-md" />
              <img
                src="/assets/lokalita-logo-symbol.png"
                alt="Lokalita"
                className="w-32 h-32 object-contain filter brightness-150 contrast-125 drop-shadow-[0_0_20px_rgba(255,255,255,0.85)] z-10"
              />
            </div>
          </div>

          {/* Bottom coordinates */}
          <div className="flex justify-between items-end z-10">
            <span className="font-mono text-[9px] tracking-wider text-ink-2 uppercase">
              Lokalita Monogram
            </span>
            <span className="font-mono text-[9px] text-accent font-semibold">
              30.0444° N, 31.2357° E
            </span>
          </div>
        </div>

        {/* Right Column: Story Copy */}
        <div className="glass-panel-a glass-specular p-6 md:p-8 flex flex-col justify-between">
          <div className="flex flex-col gap-4 text-left rtl:text-right">
            <span className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase font-medium">
              {isRtl ? "عن الاستوديو" : "About Studio"}
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              {isRtl ? "شركاء في التجارة الإلكترونية." : "Partners in commerce."}
            </h2>
            
            {/* Bilingual Paragraphs */}
            <div className="space-y-4 text-[14.5px] leading-relaxed text-ink-1 mt-4">
              <p>
                {isRtl ? (
                  <>
                    استوديو <strong className="text-white font-semibold">لوكاليتـا</strong> هو شريك تقني وتصميمي لتجارة شوبيفاي في القاهرة. نحن لا نقوم بتثبيت قوالب جاهزة؛ بل نبني حلولاً مصممة بالكامل لتناسب طبيعة منتجك وعملائك.
                  </>
                ) : (
                  <>
                    <strong className="text-white font-semibold">Lokalita</strong> is a specialized Shopify commerce partner. We build custom-designed stores engineered from scratch to fit your specific product catalog and operational logistics.
                  </>
                )}
              </p>
              
              {/* Arabic secondary text details */}
              <p className="font-sans border-l-2 border-accent/25 pl-4 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4 text-ink-2 italic">
                {isRtl ? (
                  "رويال سي، بانتوفلا، الحوت... متاجر حقيقية صممناها لتكون سهلة في التصفح وسريعة في التحميل، وموثوقة كأدوات تشغيل للبيزنس قبل كل شيء."
                ) : (
                  "Royal Sea, Pantoufla, UNITED... real online stores we've built to look premium, load fast on mobile screens, and serve as reliable operational tools."
                )}
              </p>
            </div>
          </div>

          {/* Tags Pills stack */}
          <div className="flex flex-wrap gap-2 mt-8 border-t border-white/5 pt-6 justify-start">
            {aboutTags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] text-ink-0 px-3.5 py-1.5 rounded-xl bg-white/3 border border-white/5 font-sans hover:border-white/10 transition-colors duration-200"
              >
                {isRtl ? tag.ar : tag.en}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
