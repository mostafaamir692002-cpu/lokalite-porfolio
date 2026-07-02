"use client";

import { useEffect } from "react";

export default function GlassHighlightListener() {
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest(".glass-specular") as HTMLElement;
      if (!target) return;
      
      const rect = target.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      target.style.setProperty("--mx", `${x}%`);
      target.style.setProperty("--my", `${y}%`);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return null;
}
