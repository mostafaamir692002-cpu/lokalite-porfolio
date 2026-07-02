"use client";

import { useLang } from "@/context/LangContext";
import { SERVICES } from "@/data/site";

export default function ServicesRow() {
  const { isRtl } = useLang();

  const serviceData = [
    {
      ...SERVICES[0],
      icon: "🛍️",
      label: { en: "Shopify Development", ar: "تطوير شوبيفاي" },
      desc: { en: "Custom stores built for performance and scale.", ar: "متاجر مخصصة مبنية للسرعة والأداء والنمو." }
    },
    {
      ...SERVICES[1],
      icon: "🎨",
      label: { en: "Brand Identity", ar: "هوية العلامة والتصميم" },
      desc: { en: "Distinctive identities that connect and convert.", ar: "تصميم هويات بصرية مميزة تترك انطباعاً وتزيد المبيعات." }
    },
    {
      ...SERVICES[2],
      icon: "🚀",
      label: { en: "Launch & Tracking", ar: "الإطلاق والدخول للسوق" },
      desc: { en: "Everything set for a smooth and data-driven launch.", ar: "إعداد متكامل ودقيق لتجربة إطلاق ناجحة مبنية على البيانات." }
    },
    {
      ...SERVICES[3],
      icon: "📊",
      label: { en: "Performance Marketing", ar: "التسويق الرقمي" },
      desc: { en: "Data-driven campaigns that drive real growth.", ar: "حملات تسويقية مدروسة ومحسنة لتحقيق أعلى عوائد أرباح." }
    }
  ];

  return (
    <div className="w-full mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
        {serviceData.map((s, idx) => (
          <div
            key={idx}
            className="bg-[#0b0e17]/80 backdrop-blur-md p-6 flex flex-col justify-between min-h-[160px] group transition-all duration-300 hover:bg-[#101424]/90 glass-specular"
          >
            {/* Card Top */}
            <div className="flex flex-col gap-3">
              {/* Icon Circle */}
              <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-base text-accent">
                {s.icon}
              </div>
              
              {/* Text */}
              <div className="flex flex-col gap-1">
                <h4 className="font-display font-bold text-white text-[14px] leading-tight">
                  {isRtl ? s.label.ar : s.label.en}
                </h4>
                <p className="text-[11px] text-ink-2 leading-relaxed max-w-[200px]">
                  {isRtl ? s.desc.ar : s.desc.en}
                </p>
              </div>
            </div>

            {/* Card Bottom: Orange Circle Arrow */}
            <div className="flex justify-end mt-4">
              <div className="w-8 h-8 rounded-full border border-accent/25 bg-accent/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 transform group-hover:translate-x-0.5">
                <span className="text-xs font-semibold">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
