"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

// Shared canvas: pauses rendering when off-screen and caps pixel ratio for phones.
export default function Stage({
  children,
  camera = { position: [0, 0, 6] as [number, number, number], fov: 40 },
  className = "",
  dpr = [1, 1.5],
}: {
  children: React.ReactNode;
  camera?: { position: [number, number, number]; fov: number };
  className?: string;
  dpr?: [number, number];
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className={className}>
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={dpr}
        camera={camera}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ touchAction: "pan-y" }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 5, 4]} intensity={1.6} />
        <pointLight position={[-4, -2, 3]} intensity={16} color="#f7941d" />
        <pointLight position={[4, 2, -3]} intensity={14} color="#2a8fd6" />
        {/* local studio environment — no network HDRI */}
        <Environment resolution={128}>
          <Lightformer form="rect" intensity={3} position={[0, 5, -4]} scale={[10, 2, 1]} />
          <Lightformer form="rect" intensity={2} color="#ffc928" position={[-5, 1, 2]} scale={[2, 6, 1]} rotation-y={Math.PI / 2} />
          <Lightformer form="ring" intensity={2} color="#2a8fd6" position={[5, 0, 2]} scale={3} rotation-y={-Math.PI / 2} />
        </Environment>
        {children}
      </Canvas>
    </div>
  );
}
