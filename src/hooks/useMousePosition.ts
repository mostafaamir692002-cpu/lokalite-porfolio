"use client";

import { useEffect, useState } from "react";

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Normalized values (-1 to 1)
      const rx = (clientX - innerWidth / 2) / (innerWidth / 2);
      const ry = (clientY - innerHeight / 2) / (innerHeight / 2);

      setMousePosition({
        x: clientX,
        y: clientY,
        rx,
        ry,
      });

      // Write CSS variables globally for custom cursor and specular highlights
      document.documentElement.style.setProperty("--cursor-x", `${clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}
