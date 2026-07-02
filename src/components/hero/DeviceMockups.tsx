"use client";

import { useLang } from "@/context/LangContext";

export default function DeviceMockups() {
  const { isRtl } = useLang();

  const handleOpenProject = (projectId: string) => {
    const event = new CustomEvent("open-project", { detail: projectId });
    window.dispatchEvent(event);
  };

  return (
    <div 
      className="relative w-[680px] h-[480px] flex-shrink-0 select-none scale-[0.82] sm:scale-90 lg:scale-100 origin-center"
      style={{ perspective: "1200px" }}
      dir="ltr"
    >
      {/* 1. LAPTOP MOCKUP (z-index: 10) */}
      <div 
        className="absolute left-[95px] top-[115px] transition-transform duration-500 hover:scale-[1.01] animate-mockup-laptop opacity-0"
        style={{
          transform: "rotateY(-14deg) rotateX(8deg) rotateZ(-1deg)",
          transformStyle: "preserve-3d",
          zIndex: 10
        }}
      >
        {/* Laptop Screen Body */}
        <div className="relative w-[540px] h-[330px] rounded-[18px] bg-[#090b11] border-[10px] border-[#0a0d16] border-l-[#1c2235] border-t-[#181d2f] shadow-[0_30px_70px_rgba(0,0,0,0.85),_0_0_40px_rgba(14,165,233,0.1),_0_0_20px_rgba(249,115,22,0.06)] overflow-hidden flex flex-col">
          {/* Bezel Camera Dot & Lens Reflection */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-void-0 border border-white/10 z-20 flex items-center justify-center">
            <div className="w-0.5 h-0.5 rounded-full bg-sky-500/80" />
          </div>
          
          {/* Browser Chrome Header */}
          <div className="px-4 py-2 border-b border-white/5 bg-void-0/60 flex justify-between items-center text-[7px] text-ink-2 select-none z-10">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-semibold text-white/50 tracking-wider font-mono scale-90">medieval-aloud.com</span>
            <div className="flex gap-2 text-white/30">
              <span>🔒</span>
            </div>
          </div>
          
          {/* Screen Content - Medieval Aloud Project */}
          <div 
            className="flex-1 bg-[#060810] relative overflow-hidden cursor-pointer group"
            onClick={() => handleOpenProject("MEDIEVAL ALOUD")}
          >
            <img 
              src="https://medieval-aloud.com/cdn/shop/files/ChatGPT_Image_May_24_2026_06_48_23_PM.png?v=1779637738&width=1200" 
              alt="Medieval Aloud Storefront" 
              className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-95 transition-opacity duration-300"
            />
            {/* Glossy Reflection Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/8 via-transparent to-transparent opacity-40 pointer-events-none" />
            {/* Orange Cinematic Light Edge Highlight */}
            <div className="absolute inset-0 border-l border-l-accent/20 border-t border-t-accent/10 pointer-events-none" />
          </div>
        </div>

        {/* MacBook Base Lip (3D Keyboard bevel) */}
        <div 
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[103%] h-2.5 bg-gradient-to-b from-[#1c2235] via-[#0a0d16] to-[#05060b] border border-white/10 rounded-b-md shadow-md"
          style={{ transform: "rotateX(20deg)" }}
        />
      </div>

      {/* 2. PHONE SHADOW CAST ON LAPTOP (z-index: 15) */}
      <div 
        className="absolute left-[10px] top-[160px] w-[145px] h-[260px] bg-black/60 rounded-[24px] blur-[8px] pointer-events-none"
        style={{
          transform: "rotateY(-12deg) rotateX(6deg) rotateZ(-1.5deg) translateY(12px) translateX(-5px)",
          zIndex: 15
        }}
      />

      {/* 3. PHONE MOCKUP (z-index: 20, overlapping laptop) */}
      <div 
        className="absolute left-[10px] top-[160px] transition-all duration-500 hover:scale-[1.02] animate-mockup-phone opacity-0"
        style={{
          transform: "rotateY(-12deg) rotateX(6deg) rotateZ(-1.5deg)",
          transformStyle: "preserve-3d",
          zIndex: 20
        }}
      >
        {/* Phone Case Body */}
        <div className="w-[145px] h-[260px] rounded-[24px] bg-[#090b11] border-[5px] border-[#0a0d16] border-l-[#1c2235] border-t-[#181d2f] shadow-[0_20px_45px_rgba(0,0,0,0.7),_inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden flex flex-col relative">
          {/* Dynamic Island Notch */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 h-3 rounded-full bg-[#0a0d16] z-20 flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-slate-900 ml-3" />
          </div>

          {/* Screen Content - Royal Sea Project */}
          <div 
            className="flex-1 bg-[#060810] relative overflow-hidden cursor-pointer group"
            onClick={() => handleOpenProject("ROYAL SEA")}
          >
            <img 
              src="https://royal-sea-eg.com/cdn/shop/files/ChatGPT_Image_Jun_3_2026_09_47_12_PM.png?v=1780512456&width=1200" 
              alt="Royal Sea Mobile" 
              className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-95 transition-opacity duration-300"
            />
            {/* Screen reflection sheen */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-30 pointer-events-none" />
            {/* Orange Cinematic Light Edge Highlight */}
            <div className="absolute inset-0 border-l border-l-accent/20 border-t border-t-accent/10 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 4. "LATEST PROJECT" GLASS CARD (z-index: 30, overlapping bottom-right of laptop) */}
      <div 
        className="absolute bottom-[15px] right-[-20px] transition-all duration-500 hover:scale-[1.03] glass-panel-b glass-specular w-[210px] p-4 flex flex-col gap-3 shadow-[0_25px_60px_rgba(0,0,0,0.75),_inset_0_1px_0_rgba(255,255,255,0.15)] animate-mockup-card opacity-0"
        style={{ zIndex: 30 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center select-none">
          <span className="text-[9px] font-mono tracking-wider text-ink-2 uppercase font-medium">
            {isRtl ? "معرض المشاريع" : "Portfolio Showcase"}
          </span>
          <div className="w-5 h-5 rounded-full border border-white/15 bg-white/5 flex items-center justify-center">
            <span className="text-[8px] text-white">✨</span>
          </div>
        </div>

        {/* Portfolio Showcase Description */}
        <div className="flex flex-col min-w-0 gap-1">
          <h6 className="font-display font-bold text-xs text-white leading-tight">
            {isRtl ? "متاجر صُنعت لتبيع" : "Stores Built to Sell"}
          </h6>
          <p className="text-[9.5px] text-ink-2 leading-normal mt-0.5">
            {isRtl 
              ? "مجموعة مختارة من علامات شوبيفاي الفاخرة التي قمنا بتصميمها وتطويرها." 
              : "A selection of custom premium Shopify storefronts designed and engineered by Lokalita."}
          </p>
        </div>

        {/* Action Link Row */}
        <a 
          href="#work"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex justify-between items-center border-t border-white/5 pt-2 select-none group/btn cursor-pointer"
        >
          <span className="text-[9px] text-accent font-semibold uppercase tracking-wider group-hover/btn:underline">
            {isRtl ? "تصفح كل المشاريع" : "Explore All Work"}
          </span>
          <div className="w-4 h-4 rounded-full border border-accent/30 flex items-center justify-center">
            <span className="text-[8px] text-accent">↓</span>
          </div>
        </a>
      </div>
    </div>
  );
}
