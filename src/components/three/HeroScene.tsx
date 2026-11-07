"use client";

import { Float, Sparkles } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Component, Suspense, useEffect, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { HeroCharacter } from "./HeroCharacter";
import { Clapperboard, FilmCamera, FilmReel } from "./models";
import Stage from "./Stage";

// Nono is 22.2 units tall in the model, with the origin at the feet
const CHARACTER_SCALE = 0.155;
const CHARACTER_HEIGHT = 22.2;

// If the model can't load, keep the rest of the scene instead of losing all the 3D
class ModelBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function Scene({ greet }: { greet: boolean }) {
  const { viewport, gl } = useThree();
  // the canvas sits beside the copy on laptops and above it on phones;
  // keep everything inside the visible width so nothing gets clipped
  const narrow = viewport.width < 6;
  const half = viewport.width / 2;
  const orbit = Math.min(2.4, half - 0.4);
  const cursor = useRef(new THREE.Vector2());
  const props = useRef<THREE.Group>(null);

  // follow the cursor across the whole page, not only over the canvas
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const box = gl.domElement.getBoundingClientRect();
      const reach = window.innerWidth / 2;
      cursor.current.set(
        THREE.MathUtils.clamp((e.clientX - (box.left + box.width / 2)) / reach, -1, 1),
        THREE.MathUtils.clamp(-(e.clientY - (box.top + box.height / 2)) / reach, -1, 1),
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [gl]);

  useFrame(({ clock }) => {
    // each prop sways around its own spot, so none of them crosses the character
    const t = clock.getElapsedTime();
    props.current?.children.forEach((prop, i) => {
      prop.rotation.y = Math.sin(t * 0.3 + i * 2) * 0.3;
    });
  });

  const s = Math.min(narrow ? 0.85 : 1.1, viewport.height / 4.6);
  return (
    <>
      <Float speed={1.6} rotationIntensity={0.1} floatIntensity={0.5}>
        <ModelBoundary>
          <Suspense fallback={null}>
            <HeroCharacter
              cursor={cursor}
              greet={greet}
              scale={s * CHARACTER_SCALE}
              rotation={[0.05, -0.2, 0]}
              position={[0, (-CHARACTER_HEIGHT / 2) * CHARACTER_SCALE * s, 0]}
            />
          </Suspense>
        </ModelBoundary>
      </Float>

      {/* film props floating either side of the character */}
      <group ref={props}>
        <group>
          <Float speed={2.2} rotationIntensity={0.8} floatIntensity={1}>
            <Clapperboard scale={0.38 * s} position={[orbit, 1.1, 0]} rotation={[0.2, -0.6, 0.15]} />
          </Float>
        </group>
        <group>
          <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1}>
            <FilmReel scale={0.32 * s} position={[-orbit, 1.0, 0]} rotation={[0.3, 0.6, 0]} />
          </Float>
        </group>
        <group>
          <Float speed={2} rotationIntensity={0.6} floatIntensity={1}>
            <FilmCamera scale={0.36 * s} position={[-orbit * 0.84, -1.2, 0]} rotation={[0.1, 0.8, 0]} />
          </Float>
        </group>
      </group>

      <Sparkles count={narrow ? 40 : 80} scale={[10, 6, 5]} size={2.6} speed={0.3} color="#ffc928" opacity={0.9} />
    </>
  );
}

export default function HeroScene({ greet = false }: { greet?: boolean }) {
  return (
    <Stage className="h-full w-full" camera={{ position: [0, 0.2, 6.5], fov: 40 }} dpr={[1, 2]}>
      <Scene greet={greet} />
    </Stage>
  );
}
