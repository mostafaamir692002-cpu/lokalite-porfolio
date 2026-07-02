"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import { SERVICE_MODES } from "@/data/services";
import { cn } from "@/lib/cn";

export default function ServicesSection() {
  const { isRtl, t } = useLang();
  const [activeIdx, setActiveIdx] = useState(0);

  const activeMode = SERVICE_MODES[activeIdx];

  return (
    <section id="services" className="w-full max-w-[1400px] mx-auto px-6 md:px-8 py-20 relative z-20 select-none">
      {/* Section Header */}
      <div className="flex flex-col gap-2 text-left rtl:text-right mb-12">
        <span className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase font-medium">
          {isRtl ? "خدماتنا وتخصصاتنا" : "Core Disciplines"}
        </span>
        <h2 className="font-display font-black text-3xl sm:text-4xl xl:text-5xl text-white tracking-tight">
          {isRtl ? "تخصصات مصممة للنمو السريع." : "Disciplines built for growth."}
        </h2>
      </div>

      {/* Grid Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
        
        {/* Left Column: Selectors */}
        <div className="flex flex-col gap-2">
          {SERVICE_MODES.map((mode, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "w-full text-left rtl:text-right p-5 rounded-2xl border transition-all duration-300 flex justify-between items-center gap-4 cursor-pointer",
                activeIdx === idx
                  ? "bg-gradient-to-b from-[#23252f] to-[#15161d] border-white/10 shadow-[0_10px_24px_rgba(0,0,0,0.45)] text-white"
                  : "bg-transparent border-transparent text-ink-2 hover:bg-white/3 hover:text-white"
              )}
            >
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] tracking-wider uppercase opacity-60">
                  0{idx + 1}
                </span>
                <span className="font-display font-bold text-[16px] leading-tight">
                  {isRtl ? mode.title.ar : mode.title.en}
                </span>
              </div>
              <div className={cn(
                "w-7 h-7 rounded-full border flex items-center justify-center text-xs transition-all duration-300",
                activeIdx === idx 
                  ? "border-accent/40 bg-accent/15 text-accent" 
                  : "border-white/10 bg-white/5 text-ink-2"
              )}>
                {isRtl ? "←" : "→"}
              </div>
            </button>
          ))}
        </div>

        {/* Right Column: Readout Details & Metrics */}
        <div className="glass-panel-a glass-specular p-6 md:p-8 flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-1.5 border-b border-white/5 pb-4">
            <span className="font-mono text-[10px] text-accent font-bold">
              0{activeIdx + 1} / SERVICE DETAILS
            </span>
            <h3 className="font-display font-black text-xl md:text-2xl text-white tracking-tight leading-tight">
              {isRtl ? activeMode.title.ar : activeMode.title.en}
            </h3>
            <p className="text-[13.5px] text-ink-2 leading-relaxed mt-2">
              {isRtl ? activeMode.description.ar : activeMode.description.en}
            </p>
          </div>

          {/* Metrics Stack */}
          <div className="flex flex-col gap-5">
            <span className="font-mono text-[9px] tracking-wider text-ink-3 uppercase">
              {isRtl ? "مؤشرات الكفاءة" : "Proficiency & Tools"}
            </span>
            
            <div className="space-y-4">
              {activeMode.meters.map(([name, progress], idx) => (
                <div key={idx} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-ink-1">{name}</span>
                    <span className="text-accent font-bold">{progress}%</span>
                  </div>
                  {/* Progress bar wrapper */}
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden border border-white/5">
                    <div 
                      className="h-full bg-gradient-to-r from-accent to-accent-deep transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
