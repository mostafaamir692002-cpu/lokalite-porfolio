"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MorphCoreProps {
  scrollProgress: number;
  bootProgress: number;
}

export default function MorphCore({ scrollProgress, bootProgress }: MorphCoreProps) {
  const morphMatRef = useRef<THREE.ShaderMaterial>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (morphMatRef.current) {
      morphMatRef.current.uniforms.uTime.value = t;
      morphMatRef.current.uniforms.uMix.value = Math.sin(scrollProgress * Math.PI);
    }

    const sc = (0.25 + 0.75 * bootProgress) * (1 + scrollProgress * 0.25);

    if (icoRef.current) {
      icoRef.current.rotation.y = -t * 0.08;
      icoRef.current.rotation.z = t * 0.03;
      icoRef.current.scale.setScalar(sc);
    }

    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.06;
      coreRef.current.scale.setScalar(sc);
    }
  });

  return (
    <group>
      {/* Morphing Icosahedron */}
      <mesh ref={icoRef}>
        <icosahedronGeometry args={[1.7, 3]} />
        <shaderMaterial
          ref={morphMatRef}
          wireframe
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{
            uTime: { value: 0 },
            uColorA: { value: new THREE.Color("#FF9F0A") },
            uColorB: { value: new THREE.Color("#F59E0B") },
            uMix: { value: 0 },
          }}
          vertexShader={`
            uniform float uTime;
            varying float vD;
            float ns(vec3 p){
              return sin(p.x * 1.6 + uTime) * 0.5 + sin(p.y * 1.8 + uTime * 1.1) * 0.5 + sin(p.z * 1.4 + uTime * 0.9) * 0.5;
            }
            void main() {
              float d = ns(position * 1.1) * 0.22;
              vD = d;
              vec3 p = position + normal * d;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
            }
          `}
          fragmentShader={`
            uniform vec3 uColorA;
            uniform vec3 uColorB;
            uniform float uMix;
            varying float vD;
            void main() {
              float t = clamp(vD * 1.8 + 0.5, 0.0, 1.0);
              vec3 c = mix(uColorA, uColorB, t);
              c = mix(c, vec3(0.918, 0.345, 0.047), uMix * 0.5);
              gl_FragColor = vec4(c, 0.38);
            }
          `}
        />
      </mesh>

      {/* Faint solid core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshBasicMaterial color="#0A1128" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
