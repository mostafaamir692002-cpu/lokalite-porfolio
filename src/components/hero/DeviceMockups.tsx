"use client";

import { useLang } from "@/context/LangContext";

export default function DeviceMockups() {
  const { isRtl } = useLang();

  const handleViewProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    const event = new CustomEvent("open-project", { detail: "SEAFOOD MOOD" });
    window.dispatchEvent(event);
  };

  return (
    <div 
      className="relative w-[500px] h-[340px] flex-shrink-0 select-none scale-[0.85] sm:scale-95 lg:scale-100 origin-center"
      style={{ perspective: "1000px" }}
      dir="ltr"
    >
      {/* Laptop Mockup (Back Layer) */}
      <div 
        className="absolute left-[30px] top-[35px] transition-transform duration-500 hover:scale-[1.02] animate-mockup-laptop opacity-0"
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
            <span className="font-semibold text-white tracking-widest font-mono">Seafood Mood Store</span>
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
          
          {/* Body with Real Screenshot */}
          <div 
            className="flex-1 bg-[#0d0f17] relative overflow-hidden cursor-pointer"
            onClick={handleViewProject}
          >
            <img 
              src="/assets/fishmonger_preview.jpg" 
              alt="Seafood Mood Storefront" 
              className="w-full h-full object-cover object-top opacity-85 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
      </div>

      {/* Phone Mockup (Middle Layer, overlapping) */}
      <div 
        className="absolute left-[10px] top-[75px] transition-all duration-500 hover:scale-[1.03] animate-mockup-phone opacity-0"
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

          {/* Body Content with Real Screenshot */}
          <div 
            className="flex-1 bg-[#10121a] relative overflow-hidden cursor-pointer"
            onClick={handleViewProject}
          >
            <img 
              src="/assets/fishmonger_preview.jpg" 
              alt="Seafood Mood Mobile" 
              className="w-full h-full object-cover object-top opacity-85 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
      </div>

      {/* "Latest Project" Glass Card (Front Layer) */}
      <div 
        className="absolute bottom-[15px] right-[-20px] transition-all duration-500 hover:scale-[1.03] glass-panel-b glass-specular w-[220px] p-4 flex flex-col gap-3 animate-mockup-card opacity-0 cursor-pointer"
        style={{ zIndex: 30 }}
        onClick={handleViewProject}
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
              src="/assets/fishmonger_preview.jpg"
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
          <span className="text-[10px] text-accent font-medium hover:underline">
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
