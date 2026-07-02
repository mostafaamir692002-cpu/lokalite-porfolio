"use client";

import { useLang } from "@/context/LangContext";
import { CLIENTS } from "@/data/site";

export default function BrandStrip() {
  const { isRtl } = useLang();

  // Duplicate items for a seamless marquee loop
  const duplicatedClients = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <div className="w-full mt-10 py-4 border-t border-b border-white/5 flex flex-col md:flex-row items-center gap-6 select-none overflow-hidden">
      {/* Kicker Label */}
      <span className="text-[10px] font-mono tracking-[0.2em] text-ink-3 uppercase whitespace-nowrap shrink-0 md:pr-6 md:border-r md:border-white/10 rtl:md:pr-0 rtl:md:pl-6 rtl:md:border-r-0 rtl:md:border-l">
        {isRtl ? "شريك موثوق للماركات الطموحة" : "Trusted by ambitious brands"}
      </span>

      {/* Scrolling Marquee Container */}
      <div className="flex-1 overflow-hidden relative w-full [mask-image:linear-gradient(90deg,transparent_0%,#fff_15%,#fff_85%,transparent_100%)]">
        <div className="flex gap-12 items-center whitespace-nowrap animate-marquee">
          {duplicatedClients.map((client, index) => (
            <div key={index} className="flex items-center gap-3 shrink-0">
              {client.glyph && (
                <span className="text-[10px] text-accent/50 scale-90">
                  {client.glyph}
                </span>
              )}
              <span className="font-display font-extrabold text-[13px] text-ink-2 hover:text-white transition-colors duration-300 tracking-wider uppercase">
                {client.name}
              </span>
              <span className="text-white/10 select-none ml-12 font-light">/</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
