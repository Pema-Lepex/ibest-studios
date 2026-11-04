"use client";

import { Float, Sparkles } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Clapperboard, Cloud, Dragon } from "./models";
import Stage from "./Stage";

// Druk has wandered off set: he drifts and looks around while the slate reads "Scene 404".
function Scene() {
  const { viewport } = useThree();
  const look = useRef(new THREE.Vector2());
  const dragon = useRef<THREE.Group>(null);
  const s = Math.min(1, viewport.height / 4.4, viewport.width / 4.2);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    // glance left and right as if searching, unless the visitor moves the pointer
    const searching = new THREE.Vector2(Math.sin(t * 0.9) * 0.9, Math.sin(t * 0.5) * 0.2);
    look.current.lerp(pointer.lengthSq() > 0.0001 ? pointer : searching, 0.08);
    if (dragon.current) {
      dragon.current.position.x = Math.sin(t * 0.4) * 0.25;
      dragon.current.rotation.z = Math.sin(t * 0.7) * 0.12;
    }
  });

  return (
    <>
      <group ref={dragon}>
        <Float speed={1.4} floatIntensity={0.8} rotationIntensity={0.2}>
          <Dragon look={look} scale={s} rotation={[0.05, 0.25, 0]} position={[-0.2 * s, 0.1, 0]} />
        </Float>
      </group>
      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.9}>
        <Clapperboard scene="404" take="?" scale={0.5 * s} position={[1.35 * s, -0.85 * s, 0.6]} rotation={[0.1, -0.5, -0.2]} />
      </Float>
      <Cloud seed={5} position={[-1.8 * s, -1.4 * s, -0.6]} scale={0.8 * s} />
      <Cloud seed={6} position={[1.7 * s, 1.5 * s, -1.6]} scale={0.6 * s} />
      <Sparkles count={50} scale={[7, 5, 4]} size={2.4} speed={0.3} color="#ffc928" />
    </>
  );
}

export default function LostScene() {
  return (
    <Stage className="h-full w-full" camera={{ position: [0, 0.1, 6], fov: 40 }}>
      <Scene />
    </Stage>
  );
}
