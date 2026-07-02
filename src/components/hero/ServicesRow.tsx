"use client";

import { useLang } from "@/context/LangContext";
import { SERVICES } from "@/data/site";

export default function ServicesRow() {
  const { isRtl } = useLang();

  const serviceData = [
    {
      ...SERVICES[0],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
      label: { en: "Shopify Development", ar: "تطوير شوبيفاي" },
      desc: { en: "Custom stores built for performance and scale.", ar: "متاجر مخصصة مبنية للسرعة والأداء والنمو." }
    },
    {
      ...SERVICES[1],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.5 7.5" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      ),
      label: { en: "Brand Identity", ar: "هوية العلامة والتصميم" },
      desc: { en: "Distinctive identities that connect and convert.", ar: "تصميم هويات بصرية مميزة تترك انطباعاً وتزيد المبيعات." }
    },
    {
      ...SERVICES[2],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5" />
          <path d="M14 9l-4 4" />
          <path d="M9 14l-4-4" />
          <path d="M9 14l3 3c.8 1.4 1.5 2 3 2l4-4c0-1.5-.6-2.2-2-3l-3-3" />
          <path d="M15 9l3-3c.8-1.4 1.5-2 3-2l-4 4c0 1.5-.6 2.2-2 3l-3 3" />
          <path d="M9 14c-2.5 0-6-4.5-6-4.5l4-4s4.5 3.5 4.5 6" />
          <path d="M15 9c2.5 0 6 4.5 6 4.5l-4 4s-4.5-3.5-4.5-6" />
        </svg>
      ),
      label: { en: "Launch & Tracking", ar: "الإطلاق والدخول للسوق" },
      desc: { en: "Everything set for a smooth and data-driven launch.", ar: "إعداد متكامل ودقيق لتجربة إطلاق ناجحة مبنية على البيانات." }
    },
    {
      ...SERVICES[3],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
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
