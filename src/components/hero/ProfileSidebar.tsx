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
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M19.789 6.096a1.401 1.401 0 0 0-1.325-.94h-2.14L15.358.905A1.406 1.406 0 0 0 14.103.5h-4.2a1.406 1.406 0 0 0-1.256.405L7.68 5.156H5.539a1.401 1.401 0 0 0-1.325.94L2.03 12.352a1.406 1.406 0 0 0 .197 1.341l2.46 3.39A1.406 1.406 0 0 0 5.82 17.5h12.36a1.406 1.406 0 0 0 1.134-.417l2.46-3.39a1.406 1.406 0 0 0 .197-1.341zM9.903 1.9h4.2c.171 0 .328.095.408.248l.61 1.259H8.885l.61-1.259A.456.456 0 0 1 9.903 1.9zm8.277 14.2H5.82a.456.456 0 0 1-.368-.135L2.99 12.576a.456.456 0 0 1-.064-.436l2.183-6.284H18.89l2.183 6.284a.456.456 0 0 1-.064.436l-2.463 3.39a.456.456 0 0 1-.368.135z" />
        </svg>
      )
    },
    {
      label: { en: "Brand Identity", ar: "هوية العلامة والتصميم" },
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
          <path d="M12 2L3 11l9 9 9-9-9-9z" className="opacity-80" />
          <circle cx="12" cy="11" r="4" strokeDasharray="2 2" className="text-accent" />
          <circle cx="12" cy="11" r="1.5" fill="currentColor" />
          <line x1="12" y1="2" x2="12" y2="20" strokeWidth="1" className="opacity-30" />
          <line x1="3" y1="11" x2="21" y2="11" strokeWidth="1" className="opacity-30" />
        </svg>
      )
    },
    {
      label: { en: "Launch & Tracking", ar: "الإطلاق والدخول للسوق" },
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
          <path d="M12 2s4 4 4 10c0 3-1.5 5-4 7-2.5-2-4-4-4-7 0-6 4-10 4-10z" />
          <path d="M9 15v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3" className="opacity-60" />
          <path d="M15 15v3a2 2 0 012 2h1a2 2 0 012-2v-3" className="opacity-60" />
          <path d="M2 12a10 10 0 0110-10" strokeDasharray="3 3" className="text-accent" />
          <path d="M12 18v3" strokeWidth="2" className="text-accent" />
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
          <div className="w-16 h-16 rounded-full bg-void-2/80 border border-white/10 flex items-center justify-center p-0 flex-shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.05),_inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm relative overflow-hidden group select-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <img
              src="/assets/lokalita-logo-symbol.png"
              alt="Lokalita"
              className="w-[82%] h-[82%] object-contain filter brightness-150 contrast-125 drop-shadow-[0_0_14px_rgba(255,255,255,1.0)] drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
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
          {/* Globe/Website */}
          <a
            href={SITE.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Website"
            className="w-9 h-9 rounded-lg border border-white/5 bg-white/3 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all duration-200 text-ink-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </a>
          
          {/* Facebook */}
          <a
            href={SITE.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook"
            className="w-9 h-9 rounded-lg border border-white/5 bg-white/3 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all duration-200 text-ink-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
            </svg>
          </a>

          {/* Instagram */}
          <a
            href={SITE.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            className="w-9 h-9 rounded-lg border border-white/5 bg-white/3 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all duration-200 text-ink-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href={SITE.socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp"
            className="w-9 h-9 rounded-lg border border-white/5 bg-white/3 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all duration-200 text-ink-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.459 3.479 1.332 5.003L2 22l5.163-1.353c1.472.802 3.125 1.229 4.823 1.23h.005c5.505 0 9.993-4.487 9.993-9.99C22 6.48 17.519 2 12.012 2zm6.069 13.978c-.262.742-1.282 1.349-1.774 1.411-.476.06-1.077.087-1.745-.126-2.585-.826-4.636-3.754-4.802-3.977-.168-.223-1.328-1.765-1.328-3.366 0-1.6 1.025-2.387 1.258-2.613.232-.226.507-.282.675-.282h.478c.153 0 .359.014.52.399.167.399.574 1.399.625 1.5.05.101.085.22.018.354-.067.135-.1.223-.202.339-.101.116-.213.26-.304.356-.101.107-.208.223-.09.426.118.202.525.864 1.127 1.399.775.69 1.426.906 1.628 1.008.203.101.32.086.439-.052.12-.137.507-.59.643-.79.137-.2.274-.167.463-.097.19.07 1.2.566 1.406.669.206.103.343.155.394.243.05.088.05 1.108-.212 1.85z"/>
            </svg>
          </a>
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
