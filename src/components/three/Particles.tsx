"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticlesProps {
  bootProgress: number;
}

export default function Particles({ bootProgress }: ParticlesProps) {
  const shaderMatRef = useRef<THREE.ShaderMaterial>(null);

  // We budget 4000 particles
  const count = 4000;

  const [positions, colors, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const scl = new Float32Array(count);

    const cA = new THREE.Color("#FF9F0A"); // orange-soft
    const cB = new THREE.Color("#E5E7EB"); // white/grey
    const cC = new THREE.Color("#F97316"); // sparks orange

    for (let i = 0; i < count; i++) {
      const r = 3 + Math.pow(Math.random(), 0.6) * 9;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.7;
      pos[i * 3 + 2] = r * Math.cos(ph);

      const m = Math.random();
      const c = m < 0.6 ? cA : m < 0.85 ? cB : cC;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      scl[i] = Math.random() * 1.6 + 0.3;
    }

    return [pos, col, scl];
  }, [count]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (shaderMatRef.current) {
      shaderMatRef.current.uniforms.uTime.value = t;
      // Smoothstep bootProgress
      const eased = bootProgress * bootProgress * (3 - 2 * bootProgress);
      shaderMatRef.current.uniforms.uProgress.value = eased;
    }
  });

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aColor"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-aScale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={shaderMatRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uSize: { value: 38 },
          uPr: { value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1 },
          uProgress: { value: 0 },
        }}
        vertexShader={`
          attribute float aScale;
          attribute vec3 aColor;
          uniform float uTime;
          uniform float uSize;
          uniform float uPr;
          uniform float uProgress;
          varying vec3 vC;
          varying float vA;
          void main() {
            vec3 p = position;
            p *= mix(2.4, 1.0, uProgress);
            p.y += sin(uTime * 0.3 + position.x * 0.4) * 0.35;
            p.x += cos(uTime * 0.22 + position.z * 0.4) * 0.35;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = uSize * aScale * uPr * (1.0 / -mv.z);
            vC = aColor;
            vA = mix(0.25, 1.0, uProgress);
          }
        `}
        fragmentShader={`
          varying vec3 vC;
          varying float vA;
          void main() {
            float d = distance(gl_PointCoord, vec2(0.5));
            float s = smoothstep(0.5, 0.0, d);
            s = pow(s, 1.6);
            gl_FragColor = vec4(vC, s * 0.85 * vA);
          }
        `}
      />
    </points>
  );
}
