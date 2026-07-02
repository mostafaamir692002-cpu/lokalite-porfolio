"use client";

import { useLang } from "@/context/LangContext";
import { SITE } from "@/data/site";
import { cn } from "@/lib/cn";

export default function ProfileSidebar() {
  const { isRtl, t } = useLang();

  const disciplines = [
    {
      label: { en: "Shopify Development", ar: "تطوير شوبيفاي" },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      )
    },
    {
      label: { en: "Brand Identity", ar: "هوية العلامة والتصميم" },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.5 7.5" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      )
    },
    {
      label: { en: "Launch & Tracking", ar: "الإطلاق والدخول للسوق" },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
          <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5" />
          <path d="M14 9l-4 4" />
          <path d="M9 14l-4-4" />
          <path d="M9 14l3 3c.8 1.4 1.5 2 3 2l4-4c0-1.5-.6-2.2-2-3l-3-3" />
          <path d="M15 9l3-3c.8-1.4 1.5-2 3-2l-4 4c0 1.5-.6 2.2-2 3l-3 3" />
          <path d="M9 14c-2.5 0-6-4.5-6-4.5l4-4s4.5 3.5 4.5 6" />
          <path d="M15 9c2.5 0 6 4.5 6 4.5l-4 4s-4.5-3.5-4.5-6" />
        </svg>
      )
    },
    {
      label: { en: "Performance Marketing", ar: "التسويق الرقمي" },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-4 w-full md:max-w-[250px] shrink-0 select-none">
      {/* Profile Card */}
      <div className="glass-panel-a glass-specular p-5 flex flex-col animate-sidebar-card opacity-0">
        {/* Profile Header */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-lg bg-void-2/60 border border-white/5 flex items-center justify-center p-1 flex-shrink-0">
            <img
              src="/assets/lokalita-logo-symbol.png"
              alt="Lokalita"
              className="w-full h-full object-contain filter brightness-125 contrast-110 drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="font-display font-bold text-[15px] text-white leading-tight">
              Lokalita
            </h3>
            <span className="text-[11px] text-ink-2 truncate">
              {isRtl ? " التجارة الإلكترونية" : SITE.tagline}
            </span>
          </div>
        </div>

        {/* Orange Divider */}
        <div className="w-10 h-0.5 bg-accent rounded-full my-4" />

        {/* Tagline */}
        <p className="text-[13px] text-ink-1 leading-relaxed">
          {isRtl ? (
            <>
              نحن نقوم ببناء، وإطلاق، وتنمية أعمال شوبيفاي{" "}
              <strong className="text-accent font-semibold">المتميزة</strong>.
            </>
          ) : (
            <>
              We build, launch, and grow{" "}
              <strong className="text-accent font-semibold">premium</strong> Shopify
              businesses.
            </>
          )}
        </p>

        {/* Social Icons */}
        <div className="flex gap-2 mt-4">
          <a
            href={SITE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg border border-white/5 bg-white/3 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all duration-200 text-ink-2"
          >
            <span className="text-xs uppercase font-mono scale-90">web</span>
          </a>
          {Object.entries(SITE.socials).map(([key, url]) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-white/5 bg-white/3 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all duration-200 text-ink-2"
            >
              <span className="text-xs uppercase font-mono scale-90">
                {key === "facebook" ? "fb" : key === "instagram" ? "ig" : "wa"}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="glass-panel-a glass-specular px-4 py-3 flex justify-between items-center animate-sidebar-card opacity-0">
        <span className="font-mono text-[9px] tracking-wider text-ink-2 uppercase">
          {isRtl ? "حالة النظام" : "System Status"}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse shadow-[0_0_8px_#30D158]" />
          <span className="text-xs font-semibold text-success">
            {isRtl ? "متصل" : "Online"}
          </span>
        </div>
      </div>

      {/* Core Disciplines */}
      <div className="glass-panel-a glass-specular p-4 flex flex-col gap-3 animate-sidebar-card opacity-0">
        <span className="font-mono text-[9px] tracking-wider text-ink-2 uppercase border-b border-white/5 pb-2 mb-1">
          {isRtl ? "التخصصات الرئيسية" : "Core Disciplines"}
        </span>
        <div className="flex flex-col gap-2">
          {disciplines.map((d, index) => (
            <div
              key={index}
              className="flex items-center gap-3 hover:translate-x-0.5 transition-transform duration-200"
            >
              <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-xs text-accent">
                {d.icon}
              </div>
              <span className="text-[12px] font-medium text-ink-0 leading-tight">
                {t(d.label)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
