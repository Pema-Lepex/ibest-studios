"use client";

import { ContactShadows, Grid, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { DrCarrot } from "./models";
import Stage from "./Stage";

function Turntable({ progress }: { progress: React.RefObject<number> }) {
  const sparkles = useRef<THREE.Group>(null);
  const grid = useRef<THREE.Group>(null);
  const key = useRef<THREE.SpotLight>(null);

  useFrame(() => {
    const stage = Math.min(4, Math.floor((progress.current ?? 0) * 5));
    if (sparkles.current) sparkles.current.visible = stage === 4;
    if (grid.current) grid.current.visible = stage <= 1;
    if (key.current) key.current.intensity = THREE.MathUtils.lerp(key.current.intensity, stage === 4 ? 80 : 10, 0.08);
  });

  return (
    <>
      <spotLight ref={key} position={[0, 5, 3]} angle={0.5} penumbra={0.8} intensity={10} color="#ffe2a8" />
      <group scale={0.72} position={[0, 0.15, 0]}>
        <DrCarrot progress={progress} />
      </group>
      <group ref={grid}>
        <Grid position={[0, -1.25, 0]} args={[10, 10]} cellColor="#1d4a63" sectionColor="#2a8fd6" fadeDistance={12} infiniteGrid />
      </group>
      <ContactShadows position={[0, -1.24, 0]} opacity={0.5} scale={6} blur={2.4} far={3} />
      <group ref={sparkles}>
        <Sparkles count={60} scale={[4, 4, 4]} size={4} speed={0.6} color="#ffc928" />
      </group>
    </>
  );
}

export default function PipelineScene({ progress }: { progress: React.RefObject<number> }) {
  return (
    <Stage className="h-full w-full" camera={{ position: [0, 0.4, 5.2], fov: 40 }}>
      <Turntable progress={progress} />
    </Stage>
  );
}
