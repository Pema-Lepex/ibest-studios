"use client";

import { Float, PresentationControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { ServiceKey } from "@/data/site";
import { Clapperboard, Dragon, FilmCamera, Microphone, Monitor, ScriptBook, Stylus } from "./models";
import Stage from "./Stage";

const MODELS: Record<ServiceKey, React.ReactNode> = {
  dragon: <Dragon scale={1.05} rotation={[0.05, -0.4, 0]} />,
  monitor: <Monitor scale={0.95} rotation={[0, -0.3, 0]} />,
  pencil: <Stylus scale={1.05} />,
  camera: <FilmCamera scale={1.05} rotation={[0.1, -0.6, 0]} />,
  book: <ScriptBook scale={1.1} />,
  clapper: <Clapperboard scale={1.4} rotation={[0.1, 0.3, 0]} />,
  mic: <Microphone scale={1.05} position={[0, 0.3, 0]} />,
};

// Each model pops in with a springy scale when its service becomes active.
function Slot({ active, children }: { active: boolean; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const s = THREE.MathUtils.damp(g.scale.x, active ? 1 : 0, 7, dt);
    g.scale.setScalar(s);
    g.rotation.y += dt * 0.4;
    g.visible = s > 0.01;
  });
  return (
    <group ref={ref} scale={0}>
      {children}
    </group>
  );
}

export default function ServiceScene({ active }: { active: ServiceKey }) {
  return (
    <Stage className="h-full w-full" camera={{ position: [0, 0, 6], fov: 38 }}>
      <PresentationControls global={false} cursor snap polar={[-0.3, 0.3]} azimuth={[-0.8, 0.8]}>
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
          {(Object.keys(MODELS) as ServiceKey[]).map((k) => (
            <Slot key={k} active={k === active}>
              {MODELS[k]}
            </Slot>
          ))}
        </Float>
      </PresentationControls>
    </Stage>
  );
}
