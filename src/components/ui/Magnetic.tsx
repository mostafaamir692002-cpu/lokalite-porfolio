"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";

interface MagneticProps {
  children: ReactNode;
}

export default function Magnetic({ children }: MagneticProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // We target the direct child to apply translate
    const child = el.firstElementChild as HTMLElement;
    if (!child) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = child.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      gsap.to(child, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(child, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto"
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="inline-block">
      {children}
    </div>
  );
}
