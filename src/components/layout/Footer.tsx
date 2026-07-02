"use client";

import { useLang } from "@/context/LangContext";
import { SITE } from "@/data/site";

export default function Footer() {
  const { isRtl } = useLang();

  return (
    <footer className="w-full max-w-[1400px] mx-auto px-6 md:px-8 pt-12 pb-6 relative z-20 select-none text-center">
      {/* Big typography banner */}
      <div className="font-display font-black text-[34px] sm:text-[7vw] xl:text-[110px] leading-none tracking-[-0.04em] text-[#121626]/30 uppercase select-none pointer-events-none">
        {isRtl ? "ابنِ. أطلق. انمُ." : "Build. Launch. Grow."}
      </div>

      {/* Meta Row */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-12 pt-6 border-t border-white/5 font-mono text-[11px] tracking-wider text-ink-3 uppercase">
        {/* Copyright */}
        <span>
          © {new Date().getFullYear()} {SITE.name} | {isRtl ? "شريك شوبيفاي المتميز" : "Shopify Ecommerce Partner"}
        </span>

        {/* Studio Email contact */}
        <a 
          href={`mailto:${SITE.email}`}
          className="hover:text-white transition-colors duration-200"
        >
          {SITE.email}
        </a>

        {/* Location / Status */}
        <span>
          {isRtl ? "القاهرة، مصر" : "Cairo, Egypt"}
        </span>
      </div>

      {/* iOS Home Indicator Bar decoration */}
      <div className="flex justify-center mt-10">
        <div className="w-36 h-1 rounded-full bg-white/15" />
      </div>
    </footer>
  );
}
