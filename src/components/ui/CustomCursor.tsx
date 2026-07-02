"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const aura = auraRef.current;
    if (!dot || !aura) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let ax = mx;
    let ay = my;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setVisible(true);

      // Instantly position the dot
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const render = () => {
      // Lerp aura position
      ax += (mx - ax) * 0.15;
      ay += (my - ay) * 0.15;
      
      aura.style.transform = `translate3d(${ax}px, ${ay}px, 0)`;
      rafId = requestAnimationFrame(render);
    };

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (
        target.closest("a") || 
        target.closest("button") || 
        target.closest("[role='button']") ||
        target.closest(".interactive")
      ) {
        setHovered(true);
      }
    };

    const handlePointerOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (
        target.closest("a") || 
        target.closest("button") || 
        target.closest("[role='button']") ||
        target.closest(".interactive")
      ) {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.addEventListener("pointerout", handlePointerOut, { passive: true });
    
    // Start animation loop
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Small dot */}
      <div
        ref={dotRef}
        className={cn(
          "fixed top-0 left-0 w-[7px] h-[7px] rounded-full bg-white/90 z-[99999] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-opacity duration-300 hidden md:block",
          visible ? "opacity-100" : "opacity-0"
        )}
      />
      {/* Aura border */}
      <div
        ref={auraRef}
        className={cn(
          "fixed top-0 left-0 w-9 h-9 rounded-full border border-accent/45 z-[99998] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out hidden md:block",
          visible ? "opacity-100" : "opacity-0",
          hovered ? "w-14 h-14 border-sky-400 bg-sky-400/5" : ""
        )}
      />
    </>
  );
}
