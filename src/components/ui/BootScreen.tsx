"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useLang } from "@/context/LangContext";

interface BootScreenProps {
  onComplete: () => void;
  onProgressUpdate: (progress: number) => void;
}

export default function BootScreen({ onComplete, onProgressUpdate }: BootScreenProps) {
  const [progress, setProgress] = useState(0);
  const [label, setLabel] = useState("Forming the system...");
  const { lang } = useLang();

  const onProgressUpdateRef = useRef(onProgressUpdate);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onProgressUpdateRef.current = onProgressUpdate;
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    document.body.classList.add("is-locked");

    const stages = [
      lang === "ar" ? "جاري تشكيل النظام..." : "Forming the system...",
      lang === "ar" ? "جاري معايرة الزجاج..." : "Calibrating the glass...",
      lang === "ar" ? "جاهز." : "Ready.",
    ];

    let currentStage = 0;
    const stageInterval = setInterval(() => {
      currentStage += 1;
      if (currentStage < stages.length) {
        setLabel(stages[currentStage]);
      } else {
        clearInterval(stageInterval);
      }
    }, 800);

    const bootObj = { p: 0 };
    const tl = gsap.to(bootObj, {
      p: 100,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        const val = Math.round(bootObj.p);
        setProgress(val);
        onProgressUpdateRef.current(val / 100);
      },
      onComplete: () => {
        clearInterval(stageInterval);
        setTimeout(() => {
          document.body.classList.remove("is-locked");
          
          // Animate loader fade-out
          gsap.to("#bootScreen", {
            opacity: 0,
            pointerEvents: "none",
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => onCompleteRef.current(),
          });
        }, 300);
      },
    });

    // Safety timeout: never trap user
    const safety = setTimeout(() => {
      clearInterval(stageInterval);
      document.body.classList.remove("is-locked");
      onCompleteRef.current();
    }, 4500);

    return () => {
      clearInterval(stageInterval);
      clearTimeout(safety);
      tl.kill();
    };
  }, [lang]);

  return (
    <div
      id="bootScreen"
      className="fixed inset-0 bg-[#060810] z-[99999] flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center max-w-[280px] w-full text-center">
        {/* Monogram/Logo in Loader */}
        <div className="relative w-20 h-20 mb-8">
          <img
            src="/assets/lokalita-logo-symbol.png"
            alt="Lokalita"
            className="w-full h-full object-contain filter brightness-125 contrast-110 drop-shadow-[0_0_12px_rgba(255,255,255,0.45)]"
          />
        </div>
        
        {/* Progress percent */}
        <div className="font-mono text-sm tracking-[0.2em] text-ink-0 mb-3">
          {progress}%
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-[1px] bg-white/5 rounded-full overflow-hidden mb-4 border border-white/5">
          <div
            className="h-full bg-accent transition-all duration-75 ease-out shadow-[0_0_8px_#F97316]"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Label */}
        <div className="font-mono text-[10px] tracking-[0.2em] text-ink-2 uppercase h-4">
          {label}
        </div>
      </div>
    </div>
  );
}
