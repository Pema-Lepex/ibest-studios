"use client";

import { Float, Sparkles } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Clapperboard, Cloud, Dragon, FilmCamera, FilmReel } from "./models";
import Stage from "./Stage";

function Scene() {
  const { viewport } = useThree();
  // the canvas sits beside the copy on laptops and above it on phones;
  // keep everything inside the visible width so nothing gets clipped
  const narrow = viewport.width < 6;
  const half = viewport.width / 2;
  const orbit = Math.min(2.1, half - 0.55);
  const look = useRef(new THREE.Vector2());
  const props = useRef<THREE.Group>(null);
  const clouds = useRef<THREE.Group>(null);

  useFrame(({ pointer }, dt) => {
    look.current.lerp(pointer, 0.1);
    if (props.current) props.current.rotation.y += dt * 0.25;
    if (clouds.current) {
      clouds.current.children.forEach((c, i) => {
        c.position.x += dt * (0.12 + i * 0.03);
        if (c.position.x > half + 2) c.position.x = -half - 2;
      });
    }
  });

  const s = Math.min(narrow ? 0.85 : 1.1, viewport.height / 4.6);
  return (
    <>
      <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.8}>
        <Dragon look={look} scale={s} rotation={[0.05, -0.35, 0]} position={[0, -0.1, 0]} />
      </Float>

      {/* film props orbiting the dragon */}
      <group ref={props}>
        <Float speed={2.2} rotationIntensity={0.8} floatIntensity={1}>
          <Clapperboard scale={0.42 * s} position={[orbit, 1.0, 0.4]} rotation={[0.2, -0.6, 0.15]} />
        </Float>
        <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1}>
          <FilmReel scale={0.36 * s} position={[-orbit, 0.9, -0.3]} rotation={[0.3, 0.6, 0]} />
        </Float>
        <Float speed={2} rotationIntensity={0.6} floatIntensity={1}>
          <FilmCamera scale={0.42 * s} position={[0.2, -1.2, -orbit]} rotation={[0.1, 0.8, 0]} />
        </Float>
      </group>

      <group ref={clouds}>
        <Cloud seed={1} position={[-4, -1.6, -1.5]} scale={0.9} />
        <Cloud seed={2} position={[1.5, -2.0, -0.5]} scale={1.1} />
        <Cloud seed={3} position={[4.5, 1.9, -3]} scale={0.8} />
        <Cloud seed={4} position={[-2.5, 2.3, -3.5]} scale={0.7} />
      </group>
      <Sparkles count={narrow ? 40 : 80} scale={[10, 6, 5]} size={2.6} speed={0.3} color="#ffc928" opacity={0.9} />
    </>
  );
}

export default function HeroScene() {
  return (
    <Stage className="h-full w-full" camera={{ position: [0, 0.2, 6.5], fov: 40 }}>
      <Scene />
    </Stage>
  );
}
