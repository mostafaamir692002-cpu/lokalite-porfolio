"use client";

import { useLang } from "@/context/LangContext";
import { cn } from "@/lib/cn";

export default function DeviceMockups() {
  const { isRtl } = useLang();

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center select-none scale-[0.85] sm:scale-95 lg:scale-100 origin-center"
      style={{ perspective: "1000px" }}
    >
      {/* Laptop Mockup (Back Layer) */}
      <div 
        className="absolute top-4 transition-transform duration-500 hover:scale-[1.02] animate-mockup-laptop opacity-0"
        style={{
          transform: "rotateY(-15deg) rotateX(10deg) rotateZ(-1deg)",
          transformStyle: "preserve-3d",
          zIndex: 10
        }}
      >
        <div className="relative w-[440px] h-[270px] rounded-xl bg-[#090b11] border-[10px] border-[#181a20] shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
          {/* Bezel Camera Dot */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-void-0 border border-white/5 z-20" />
          
          {/* Header */}
          <div className="px-4 py-2 border-b border-white/5 bg-void-0/40 flex justify-between items-center text-[7px] text-ink-2">
            <span className="font-semibold text-white tracking-widest font-mono">Lokalita Skin</span>
            <div className="flex gap-3">
              <span>SHOP</span>
              <span>COLLECTIONS</span>
              <span>ABOUT</span>
              <span>CONTACT</span>
            </div>
            <div className="flex gap-2">
              <span>🔍</span>
              <span>🛒</span>
            </div>
          </div>
          {/* Body */}
          <div className="flex-1 bg-[#0d0f17] flex p-6 relative overflow-hidden">
            <div className="w-[60%] flex flex-col justify-center gap-2 z-10">
              <h4 className="font-display font-black text-sm text-white leading-tight">
                CLEAN INGREDIENTS.<br />
                BETTER LIVING.
              </h4>
              <p className="text-[6px] text-ink-2 max-w-[130px] leading-relaxed">
                Organic formulation crafted to nourish your skin with raw, natural extracts.
              </p>
              <button className="self-start mt-1.5 px-3 py-1 bg-white text-black font-semibold text-[7px] rounded hover:opacity-90 transition-opacity">
                SHOP NOW
              </button>
            </div>
            {/* Elegant Skincare bottles rendered in pure CSS */}
            <div className="absolute right-4 bottom-4 w-[110px] h-[130px] flex items-end justify-center gap-2">
              {/* Amber Serum Bottle */}
              <div className="w-8 h-20 bg-gradient-to-t from-amber-900 to-amber-950 rounded-md border border-white/10 flex flex-col items-center justify-between p-1 shadow-lg">
                <div className="w-2.5 h-3 bg-[#181a20] rounded-sm" />
                <div className="w-full h-8 bg-[#f4f6fb]/90 rounded-sm flex items-center justify-center shadow-inner">
                  <span className="text-[3px] text-black font-mono font-bold scale-90">SERUM</span>
                </div>
                <div className="h-3" />
              </div>
              {/* Blue Face Oil Bottle */}
              <div className="w-7.5 h-16 bg-gradient-to-t from-indigo-950 to-slate-900 rounded-md border border-white/10 flex flex-col items-center justify-between p-1 shadow-lg">
                <div className="w-2 h-2.5 bg-[#181a20] rounded-sm" />
                <div className="w-full h-6 bg-[#f4f6fb]/95 rounded-sm flex items-center justify-center">
                  <span className="text-[3px] text-black font-mono font-bold scale-90">FACE OIL</span>
                </div>
                <div className="h-2" />
              </div>
              {/* Cream Jar */}
              <div className="w-9 h-10 bg-gradient-to-t from-zinc-800 to-zinc-950 rounded-md border border-white/10 flex flex-col items-center justify-between p-0.5 shadow-lg">
                <div className="w-full h-2.5 bg-[#181a20] rounded-t-sm" />
                <div className="w-full h-5 bg-[#f4f6fb]/90 rounded-b-sm flex items-center justify-center">
                  <span className="text-[3px] text-black font-mono scale-90">CREAM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phone Mockup (Middle Layer, overlapping) */}
      <div 
        className="absolute top-20 left-[180px] transition-all duration-500 hover:scale-[1.03] animate-mockup-phone opacity-0"
        style={{
          transform: "rotateY(-12deg) rotateX(8deg) rotateZ(-2deg)",
          transformStyle: "preserve-3d",
          zIndex: 20
        }}
      >
        <div className="w-[140px] h-[240px] rounded-[24px] bg-[#090b11] border-[5px] border-[#181a20] shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col relative">
          {/* Speaker / Camera Notch */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-3 rounded-full bg-[#181a20] z-20 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 ml-2" />
          </div>

          {/* Body Content */}
          <div className="flex-1 bg-[#10121a] flex flex-col p-3 pt-6 text-[6px]">
            {/* Header */}
            <div className="flex justify-between items-center text-ink-2 font-mono mb-2">
              <span className="font-bold text-white">SKIN</span>
              <span>☰</span>
            </div>

            {/* Title */}
            <h5 className="font-display font-bold text-white text-[8px] leading-tight mb-2">
              Organic Skincare
            </h5>

            {/* Featured Product Card */}
            <div className="bg-white/5 rounded-lg border border-white/5 p-2 flex gap-2 items-center mb-2">
              <div className="w-6 h-10 bg-amber-900/60 rounded flex items-center justify-center">
                <span className="scale-50 text-[3px] text-white">🏺</span>
              </div>
              <div className="flex-1 flex flex-col gap-0.5">
                <span className="text-white font-medium">Clean Cleanser</span>
                <span className="text-accent">$24.00</span>
                <button className="self-start bg-white text-black rounded px-1.5 py-0.5 scale-75 origin-left">
                  Shop
                </button>
              </div>
            </div>

            {/* List items */}
            <div className="flex gap-2">
              <div className="flex-1 bg-white/5 border border-white/5 rounded p-1.5 flex flex-col gap-1 items-center">
                <span className="text-[10px]">🧴</span>
                <span className="text-white scale-90">Face Cream</span>
                <span className="text-ink-2 scale-75">$18.00</span>
              </div>
              <div className="flex-1 bg-white/5 border border-white/5 rounded p-1.5 flex flex-col gap-1 items-center">
                <span className="text-[10px]">🧼</span>
                <span className="text-white scale-90">Body Soap</span>
                <span className="text-ink-2 scale-75">$12.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* "Latest Project" Glass Card (Front Layer) */}
      <div 
        className="absolute bottom-6 right-[40px] transition-all duration-500 hover:scale-[1.03] glass-panel-b glass-specular w-[220px] p-4 flex flex-col gap-3 animate-mockup-card opacity-0"
        style={{ zIndex: 30 }}
      >
        <div className="flex justify-between items-center">
          <span className="text-[9px] font-mono tracking-wider text-ink-2 uppercase">
            {isRtl ? "أحدث المشاريع" : "Latest Project"}
          </span>
          <div className="w-5 h-5 rounded-full border border-white/15 bg-white/5 flex items-center justify-center">
            <span className="text-[8px] text-white">↗</span>
          </div>
        </div>

        {/* Project Snapshot */}
        <div className="flex gap-3 items-center">
          <div className="w-16 h-12 rounded-lg overflow-hidden bg-void-2 flex-shrink-0 relative">
            <img
              src="/assets/fishmonger_preview.webp"
              alt="Seafood Mood"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <div className="flex flex-col">
            <h6 className="font-display font-bold text-xs text-white">
              Seafood Mood
            </h6>
            <span className="text-[9px] text-ink-2 leading-tight">
              {isRtl ? "منصة تجارة مأكولات بحرية" : "Premium seafood store"}
            </span>
          </div>
        </div>

        {/* Action Link */}
        <div className="flex justify-between items-center border-t border-white/5 pt-2">
          <span className="text-[10px] text-accent font-medium hover:underline cursor-pointer">
            {isRtl ? "عرض دراسة الحالة" : "View Case Study"}
          </span>
          <div className="w-4 h-4 rounded-full border border-accent/30 flex items-center justify-center">
            <span className="text-[8px] text-accent">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}
