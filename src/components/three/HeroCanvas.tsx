"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import SceneContent from "./SceneContent";

interface HeroCanvasProps {
  scrollProgress: number;
  bootProgress: number;
}

export default function HeroCanvas({ scrollProgress, bootProgress }: HeroCanvasProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 6.5], fov: 55 }}
      >
        <SceneContent scrollProgress={scrollProgress} bootProgress={bootProgress} />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
}
