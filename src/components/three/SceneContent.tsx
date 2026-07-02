"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import MorphCore from "./MorphCore";
import Particles from "./Particles";
import OrbitLines from "./OrbitLines";
import { useMousePosition } from "@/hooks/useMousePosition";

interface SceneContentProps {
  scrollProgress: number;
  bootProgress: number;
}

export default function SceneContent({ scrollProgress, bootProgress }: SceneContentProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const mouse = useMousePosition();
  
  const mxv = useRef(0);
  const myv = useRef(0);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Lerp mouse variables for smooth rotation damping
    mxv.current += (mouse.rx * 0.5 - mxv.current) * 0.05;
    myv.current += (mouse.ry * 0.5 - myv.current) * 0.05;

    // Apply rotation transforms on main group
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.04 + mxv.current * 0.6;
      groupRef.current.rotation.x = myv.current * 0.4 + scrollProgress * 0.6;
    }

    // Scroll-driven camera pullback and shift
    camera.position.z = 6.5 + scrollProgress * 3.2;
    camera.position.y = scrollProgress * -1.2;
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef}>
      <MorphCore scrollProgress={scrollProgress} bootProgress={bootProgress} />
      <Particles bootProgress={bootProgress} />
      <OrbitLines />
    </group>
  );
}
