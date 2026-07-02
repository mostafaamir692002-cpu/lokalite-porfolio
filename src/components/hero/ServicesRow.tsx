"use client";

import { useLang } from "@/context/LangContext";
import { SERVICES } from "@/data/site";

export default function ServicesRow() {
  const { isRtl } = useLang();

  const serviceData = [
    {
      ...SERVICES[0],
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M19.789 6.096a1.401 1.401 0 0 0-1.325-.94h-2.14L15.358.905A1.406 1.406 0 0 0 14.103.5h-4.2a1.406 1.406 0 0 0-1.256.405L7.68 5.156H5.539a1.401 1.401 0 0 0-1.325.94L2.03 12.352a1.406 1.406 0 0 0 .197 1.341l2.46 3.39A1.406 1.406 0 0 0 5.82 17.5h12.36a1.406 1.406 0 0 0 1.134-.417l2.46-3.39a1.406 1.406 0 0 0 .197-1.341zM9.903 1.9h4.2c.171 0 .328.095.408.248l.61 1.259H8.885l.61-1.259A.456.456 0 0 1 9.903 1.9zm8.277 14.2H5.82a.456.456 0 0 1-.368-.135L2.99 12.576a.456.456 0 0 1-.064-.436l2.183-6.284H18.89l2.183 6.284a.456.456 0 0 1-.064.436l-2.463 3.39a.456.456 0 0 1-.368.135z" />
        </svg>
      ),
      label: { en: "Shopify Development", ar: "تطوير شوبيفاي" },
      desc: { en: "Custom stores built for performance and scale.", ar: "متاجر مخصصة مبنية للسرعة والأداء والنمو." }
    },
    {
      ...SERVICES[1],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M12 2L3 11l9 9 9-9-9-9z" className="opacity-80" />
          <circle cx="12" cy="11" r="4" strokeDasharray="2 2" className="text-accent" />
          <circle cx="12" cy="11" r="1.5" fill="currentColor" />
          <line x1="12" y1="2" x2="12" y2="20" strokeWidth="1" className="opacity-30" />
          <line x1="3" y1="11" x2="21" y2="11" strokeWidth="1" className="opacity-30" />
        </svg>
      ),
      label: { en: "Brand Identity", ar: "هوية العلامة والتصميم" },
      desc: { en: "Distinctive identities that connect and convert.", ar: "تصميم هويات بصرية مميزة تترك انطباعاً وتزيد المبيعات." }
    },
    {
      ...SERVICES[2],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M12 2s4 4 4 10c0 3-1.5 5-4 7-2.5-2-4-4-4-7 0-6 4-10 4-10z" />
          <path d="M9 15v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3" className="opacity-60" />
          <path d="M15 15v3a2 2 0 012 2h1a2 2 0 012-2v-3" className="opacity-60" />
          <path d="M2 12a10 10 0 0110-10" strokeDasharray="3 3" className="text-accent" />
          <path d="M12 18v3" strokeWidth="2" className="text-accent" />
        </svg>
      ),
      label: { en: "Launch & Tracking", ar: "الإطلاق والدخول للسوق" },
      desc: { en: "Everything set for a smooth and data-driven launch.", ar: "إعداد متكامل ودقيق لتجربة إطلاق ناجحة مبنية على البيانات." }
    }
  ];

  return (
    <div className="w-full mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
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
