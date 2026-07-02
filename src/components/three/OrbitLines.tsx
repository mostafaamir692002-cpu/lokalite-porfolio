"use client";

import { useMemo } from "react";
import * as THREE from "three";

export default function OrbitLines() {
  const rings = useMemo(() => [
    { rx: 4, ry: 2, rotZ: 0.5, rotX: 0.8 },
    { rx: 5.5, ry: 2.5, rotZ: -0.3, rotX: 0.9 },
    { rx: 3, ry: 1.5, rotZ: 1.2, rotX: 0.7 },
  ], []);

  const lines = useMemo(() => {
    return rings.map((ring) => {
      const points = [];
      const segments = 128;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * ring.rx, Math.sin(theta) * ring.ry, 0));
      }
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color("#3B82F6"),
        transparent: true,
        opacity: 0.25,
      });
      const line = new THREE.Line(geom, mat);
      line.rotation.set(ring.rotX, 0, ring.rotZ);
      return line;
    });
  }, [rings]);

  return (
    <group>
      {lines.map((line, idx) => (
        <primitive key={idx} object={line} />
      ))}
    </group>
  );
}
