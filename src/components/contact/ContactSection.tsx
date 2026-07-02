"use client";

import { useLang } from "@/context/LangContext";
import { SITE } from "@/data/site";

export default function ContactSection() {
  const { isRtl } = useLang();

  const channels = [
    { name: { en: "WhatsApp", ar: "واتساب" }, url: SITE.socials.whatsapp, icon: "💬" },
    { name: { en: "Email Us", ar: "البريد الإلكتروني" }, url: `mailto:${SITE.email}`, icon: "✉️" },
    { name: { en: "Instagram", ar: "إنستغرام" }, url: SITE.socials.instagram, icon: "📸" },
    { name: { en: "Facebook", ar: "فيسبوك" }, url: SITE.socials.facebook, icon: "👥" }
  ];

  return (
    <section id="contact" className="w-full max-w-[1400px] mx-auto px-6 md:px-8 py-20 relative z-20 select-none">
      <div className="relative rounded-[32px] border border-white/5 bg-gradient-to-b from-[#181a24]/80 to-[#0c0d12]/90 p-8 md:p-16 text-center shadow-[0_30px_70px_rgba(0,0,0,0.6)] overflow-hidden glass-specular">
        
        {/* Warm glow arcing from top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-radial from-accent/15 to-transparent blur-3xl pointer-events-none" />

        {/* Content stack */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          
          {/* Timeline kicker */}
          <span className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase font-semibold">
            {isRtl ? "تواصل معنا اليوم" : "Get In Touch Today"}
          </span>

          {/* Heading */}
          <h2 className="font-display font-black text-3xl sm:text-5xl xl:text-6xl text-white leading-tight max-w-[700px] tracking-tight">
            {isRtl ? (
              <>
                جاهز لبناء متجرك مع <span className="text-chrome-orange">لوكاليتـا؟</span>
              </>
            ) : (
              <>
                Ready to build your store with <span className="text-chrome-orange">Lokalita?</span>
              </>
            )}
          </h2>

          {/* Subtext */}
          <p className="font-sans text-[14px] sm:text-[16px] text-ink-2 max-w-[500px] leading-relaxed">
            {isRtl ? (
              "دعنا نتناقش في مكالمة سريعة لنراجع منتجاتك، وتفاصيل الكتالوج الخاص بك، واستراتيجية الدخول للسوق المناسبة لك."
            ) : (
              "Let's align on a short call to review your product catalog, local fulfillment requirements, and customized launch strategy."
            )}
          </p>

          {/* Primary Message CTA */}
          <a
            href={SITE.socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-b from-accent to-accent-deep border border-white/20 text-white font-sans font-bold text-[15px] px-8 py-4 rounded-xl shadow-[0_14px_34px_rgba(249,115,22,0.4)] hover:scale-[1.02] active:scale-[0.97] transition-all duration-200 group interactive"
          >
            <span>{isRtl ? "راسلنا الآن لبدء مشروعك" : "Send us a message to start"}</span>
            <span className="group-hover:translate-x-0.5 transition-transform duration-200">
              →
            </span>
          </a>

          {/* Reply timeline indicators */}
          <span className="text-[11px] font-mono text-ink-3 uppercase tracking-wider">
            {isRtl ? "● نرد عادةً في خلال ٤ ساعات" : "● Typically replies in 4 hours"}
          </span>

          {/* Secondary channel buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-4 max-w-[600px]">
            {channels.map((channel, idx) => (
              <a
                key={idx}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-white/5 bg-gradient-to-b from-[#23252f] to-[#14151b] text-ink-1 hover:text-white hover:border-white/10 active:scale-95 transition-all duration-200 shadow-[0_8px_20px_rgba(0,0,0,0.3)] text-xs font-semibold interactive"
              >
                <span className="text-sm">{channel.icon}</span>
                <span>{isRtl ? channel.name.ar : channel.name.en}</span>
              </a>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
