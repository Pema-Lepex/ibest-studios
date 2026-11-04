"use client";

// Procedural studio props, built from primitives so the site ships no model files.

import { useFrame, type ThreeElements } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type GroupProps = ThreeElements["group"];

const SAFFRON = "#ffc928";
const EMBER = "#e3262b";
const METAL = "#163447";
const CHROME = "#c9d6df";

function Reel({ radius = 0.55, depth = 0.12, color = METAL, spin = 1 }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z -= dt * spin;
  });
  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius, radius, depth, 48]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </mesh>
      {/* film wound on the reel */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius * 0.72, radius * 0.72, depth * 1.05, 48]} />
        <meshStandardMaterial color="#1a120c" roughness={0.6} />
      </mesh>
      {/* cut-outs */}
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * radius * 0.42, Math.sin(a) * radius * 0.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[radius * 0.17, radius * 0.17, depth * 1.2, 24]} />
            <meshStandardMaterial color={SAFFRON} metalness={0.4} roughness={0.3} />
          </mesh>
        );
      })}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius * 0.12, radius * 0.12, depth * 1.4, 24]} />
        <meshStandardMaterial color={CHROME} metalness={1} roughness={0.2} />
      </mesh>
    </group>
  );
}

export function FilmCamera(props: GroupProps) {
  return (
    <group {...props}>
      {/* body */}
      <mesh>
        <boxGeometry args={[1.5, 1.05, 0.8]} />
        <meshStandardMaterial color={METAL} metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0, 0.405]}>
        <boxGeometry args={[1.3, 0.85, 0.02]} />
        <meshStandardMaterial color={EMBER} metalness={0.3} roughness={0.4} />
      </mesh>
      {/* lens */}
      <group position={[0.95, -0.05, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <mesh position={[0, 0.0, 0]}>
          <cylinderGeometry args={[0.3, 0.34, 0.4, 40]} />
          <meshStandardMaterial color="#111" metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.32, 0]}>
          <cylinderGeometry args={[0.38, 0.3, 0.3, 40]} />
          <meshStandardMaterial color="#151515" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.475, 0]}>
          <cylinderGeometry args={[0.31, 0.31, 0.02, 40]} />
          <meshPhysicalMaterial color="#0d2a4a" metalness={0.2} roughness={0} clearcoat={1} emissive="#1d4f8c" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <torusGeometry args={[0.345, 0.025, 12, 48]} />
          <meshStandardMaterial color={SAFFRON} metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      {/* reels */}
      <group position={[-0.4, 1.05, 0]}>
        <Reel radius={0.5} spin={1.6} />
      </group>
      <group position={[0.45, 0.95, 0]}>
        <Reel radius={0.4} spin={2.2} />
      </group>
      {/* viewfinder + handle */}
      <mesh position={[-0.95, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.16, 0.4, 24]} />
        <meshStandardMaterial color="#111" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.75, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.5, 16]} />
        <meshStandardMaterial color={CHROME} metalness={1} roughness={0.25} />
      </mesh>
      {/* rec light */}
      <mesh position={[0.55, 0.38, 0.42]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#ff2b2b" emissive="#ff2b2b" emissiveIntensity={3} />
      </mesh>
    </group>
  );
}

export function Clapperboard({
  animate = true,
  scene = "01",
  take = "03",
  ...props
}: GroupProps & { animate?: boolean; scene?: string; take?: string }) {
  const arm = useRef<THREE.Group>(null);
  const stripes = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 32;
    const g = c.getContext("2d")!;
    for (let i = 0; i < 10; i++) {
      g.fillStyle = i % 2 ? "#f4efe6" : "#111";
      g.beginPath();
      g.moveTo(i * 32 - 16, 32);
      g.lineTo(i * 32 + 8, 0);
      g.lineTo(i * 32 + 40, 0);
      g.lineTo(i * 32 + 16, 32);
      g.fill();
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  const slate = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 384;
    const g = c.getContext("2d")!;
    g.fillStyle = "#121212";
    g.fillRect(0, 0, 512, 384);
    g.strokeStyle = "#f4efe6";
    g.lineWidth = 4;
    g.strokeRect(16, 16, 480, 352);
    g.beginPath();
    g.moveTo(16, 140);
    g.lineTo(496, 140);
    g.moveTo(16, 260);
    g.lineTo(496, 260);
    g.moveTo(256, 140);
    g.lineTo(256, 368);
    g.stroke();
    g.fillStyle = "#e3262b";
    g.font = "bold 76px sans-serif";
    g.fillText("iBEST", 40, 108);
    g.fillStyle = "#f4efe6";
    g.font = "28px monospace";
    g.fillText(`SCENE  ${scene}`, 36, 210);
    g.fillText(`TAKE  ${take}`, 276, 210);
    g.fillText("ROLL  A", 36, 330);
    g.fillText("24 FPS", 276, 330);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [scene, take]);

  useFrame(({ clock }) => {
    if (!arm.current || !animate) return;
    const t = clock.getElapsedTime() % 2.6;
    // snap shut quickly, then slowly open again
    const open = t < 0.15 ? 1 - t / 0.15 : Math.min(1, (t - 0.6) / 1.2);
    arm.current.rotation.z = THREE.MathUtils.lerp(0, 0.5, Math.max(0, open));
  });

  return (
    <group {...props}>
      <mesh>
        <boxGeometry args={[1.6, 1.2, 0.06]} />
        <meshStandardMaterial attach="material-0" color="#121212" />
        <meshStandardMaterial attach="material-1" color="#121212" />
        <meshStandardMaterial attach="material-2" color="#121212" />
        <meshStandardMaterial attach="material-3" color="#121212" />
        <meshStandardMaterial attach="material-4" map={slate} roughness={0.6} />
        <meshStandardMaterial attach="material-5" color="#121212" />
      </mesh>
      <mesh position={[0, 0.66, 0]}>
        <boxGeometry args={[1.6, 0.14, 0.07]} />
        <meshStandardMaterial map={stripes} />
      </mesh>
      <group ref={arm} position={[-0.8, 0.74, 0]}>
        <mesh position={[0.8, 0.07, 0]}>
          <boxGeometry args={[1.6, 0.14, 0.07]} />
          <meshStandardMaterial map={stripes} />
        </mesh>
      </group>
    </group>
  );
}

export function Microphone(props: GroupProps) {
  return (
    <group {...props}>
      <mesh position={[0, 0.7, 0]}>
        <capsuleGeometry args={[0.32, 0.5, 8, 24]} />
        <meshStandardMaterial color={CHROME} metalness={0.9} roughness={0.35} wireframe />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <capsuleGeometry args={[0.29, 0.48, 8, 24]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <torusGeometry args={[0.33, 0.035, 12, 40]} />
        <meshStandardMaterial color={SAFFRON} metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.0, 0]}>
        <cylinderGeometry args={[0.22, 0.16, 0.6, 32]} />
        <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.3} />
      </mesh>
      {/* yoke */}
      <mesh position={[0, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.45, 0.04, 12, 40, Math.PI]} />
        <meshStandardMaterial color={CHROME} metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.75, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.0, 12]} />
        <meshStandardMaterial color={CHROME} metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[0, -1.25, 0]}>
        <cylinderGeometry args={[0.5, 0.55, 0.06, 40]} />
        <meshStandardMaterial color={EMBER} metalness={0.4} roughness={0.4} />
      </mesh>
    </group>
  );
}

export function Stylus(props: GroupProps) {
  return (
    <group {...props}>
      {/* drawing tablet */}
      <mesh position={[0, -0.9, 0]} rotation={[-0.25, 0, 0]}>
        <boxGeometry args={[2.2, 0.08, 1.5]} />
        <meshStandardMaterial color="#141414" metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.85, 0.01]} rotation={[-0.25, 0, 0]}>
        <boxGeometry args={[1.9, 0.02, 1.2]} />
        <meshStandardMaterial color="#1f1f22" emissive={SAFFRON} emissiveIntensity={0.08} />
      </mesh>
      <group rotation={[0.3, 0, -0.6]} position={[0.2, 0.1, 0.2]}>
        <mesh>
          <cylinderGeometry args={[0.09, 0.09, 1.8, 6]} />
          <meshStandardMaterial color={SAFFRON} metalness={0.2} roughness={0.4} flatShading />
        </mesh>
        <mesh position={[0, -1.05, 0]}>
          <coneGeometry args={[0.09, 0.3, 6]} />
          <meshStandardMaterial color="#f4d9b0" flatShading />
        </mesh>
        <mesh position={[0, -1.17, 0]}>
          <coneGeometry args={[0.03, 0.08, 6]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[0, 0.95, 0]}>
          <cylinderGeometry args={[0.095, 0.095, 0.15, 12]} />
          <meshStandardMaterial color={CHROME} metalness={1} roughness={0.2} />
        </mesh>
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.16, 12]} />
          <meshStandardMaterial color={EMBER} />
        </mesh>
      </group>
    </group>
  );
}

export function FilmReel(props: GroupProps) {
  const strip = useRef<THREE.Mesh>(null);
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.9, -0.2, 0),
        new THREE.Vector3(1.3, -0.8, 0.2),
        new THREE.Vector3(0.6, -1.3, 0.4),
        new THREE.Vector3(-0.4, -1.2, 0.1),
        new THREE.Vector3(-1.2, -1.5, -0.2),
      ]),
    [],
  );
  return (
    <group {...props}>
      <Reel radius={1} depth={0.16} spin={0.8} />
      <mesh ref={strip}>
        <tubeGeometry args={[curve, 64, 0.04, 6, false]} />
        <meshStandardMaterial color="#2b1d12" roughness={0.5} />
      </mesh>
    </group>
  );
}

// A tiny live timeline editor drawn onto the monitor screen each frame.
function createEditorScreen() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 320;
  const texture = new THREE.CanvasTexture(c);
  texture.colorSpace = THREE.SRGBColorSpace;
  const g = c.getContext("2d")!;
  const colors = ["#ffc928", "#e3262b", "#2a8fd6", "#7cc4a4"];
  const draw = (time: number) => {
    g.fillStyle = "#0b0b0d";
    g.fillRect(0, 0, 512, 320);
    const grd = g.createLinearGradient(0, 0, 512, 180);
    grd.addColorStop(0, "#2a8fd6");
    grd.addColorStop(1, "#f7941d");
    g.fillStyle = grd;
    g.fillRect(16, 16, 300, 170);
    g.fillStyle = "#0b0b0d";
    g.beginPath();
    g.arc(166 + Math.sin(time) * 60, 100, 40, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#1c1c20";
    g.fillRect(330, 16, 166, 170);
    for (let r = 0; r < 4; r++) {
      for (let k = 0; k < 4; k++) {
        g.fillStyle = colors[(r + k) % 4];
        g.globalAlpha = 0.85;
        g.fillRect(16 + k * 124 + r * 18, 206 + r * 26, 100, 18);
      }
    }
    g.globalAlpha = 1;
    g.fillStyle = "#ff2b2b";
    g.fillRect(16 + ((time * 80) % 480), 196, 3, 116);
    texture.needsUpdate = true;
  };
  return { texture, draw };
}

export function Monitor(props: GroupProps) {
  const screen = useMemo(() => createEditorScreen(), []);
  useFrame(({ clock }) => screen.draw(clock.getElapsedTime()));
  return (
    <group {...props}>
      <mesh>
        <boxGeometry args={[2.4, 1.5, 0.1]} />
        <meshStandardMaterial color="#141414" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.051]}>
        <planeGeometry args={[2.25, 1.38]} />
        <meshStandardMaterial map={screen.texture} emissiveMap={screen.texture} emissive="#ffffff" emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[0, -1.0, -0.1]}>
        <boxGeometry args={[0.16, 0.6, 0.08]} />
        <meshStandardMaterial color={CHROME} metalness={1} roughness={0.25} />
      </mesh>
      <mesh position={[0, -1.3, 0]}>
        <boxGeometry args={[0.9, 0.05, 0.5]} />
        <meshStandardMaterial color={CHROME} metalness={1} roughness={0.25} />
      </mesh>
    </group>
  );
}

/* ---------------- Dr. Carrot ---------------- */

export type CarrotStage = { progress: React.RefObject<number> };

const CARROT = new THREE.Color("#ff7a1a");
const LEAF = new THREE.Color("#3fbf5a");
const CLAY = new THREE.Color("#9a9a9a");
const SKETCH = new THREE.Color(SAFFRON);
const WHITE = new THREE.Color("#ffffff");
const DARK = new THREE.Color("#141414");

// Dr. Carrot from the Educare Skill series, rendered differently per pipeline stage.
export function DrCarrot({ progress }: CarrotStage) {
  const root = useRef<THREE.Group>(null);
  const bones = useRef<THREE.Group>(null);
  const leaves = useRef<THREE.Group>(null);
  const lastStage = useRef(-1);

  const mats = useMemo(
    () => ({
      body: new THREE.MeshStandardMaterial({ color: CLAY, roughness: 0.6 }),
      leaf: new THREE.MeshStandardMaterial({ color: CLAY, roughness: 0.6 }),
      white: new THREE.MeshStandardMaterial({ color: CLAY, roughness: 0.3 }),
      dark: new THREE.MeshStandardMaterial({ color: CLAY, roughness: 0.3 }),
      frame: new THREE.MeshStandardMaterial({ color: CLAY, roughness: 0.3, metalness: 0.5 }),
      coat: new THREE.MeshStandardMaterial({ color: CLAY, roughness: 0.7 }),
    }),
    [],
  );

  const bodyGeo = useMemo(() => {
    // lathe a carrot profile: round shoulders tapering to a tip
    const pts: THREE.Vector2[] = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const y = 1.2 - t * 3.0;
      const r = t < 0.15 ? Math.sin((t / 0.15) * Math.PI * 0.5) * 0.85 : 0.85 * Math.pow(1 - (t - 0.15) / 0.85, 0.9) + 0.02;
      pts.push(new THREE.Vector2(Math.max(r, 0.001), y));
    }
    const g = new THREE.LatheGeometry(pts, 40);
    g.computeVertexNormals();
    return g;
  }, []);

  useFrame(({ clock }, dt) => {
    const p = progress.current ?? 0;
    const stage = Math.min(4, Math.floor(p * 5));
    const local = p * 5 - stage; // 0..1 within a stage
    const t = clock.getElapsedTime();

    const sketch = stage === 0;
    if (lastStage.current !== stage) {
      // only recompile materials when the stage actually changes
      lastStage.current = stage;
      Object.values(mats).forEach((m) => {
        m.wireframe = sketch;
        m.flatShading = stage === 1;
        m.needsUpdate = true;
      });
    }

    const colorMix = stage >= 2 ? (stage === 2 ? Math.min(1, local * 2) : 1) : 0;
    const base = sketch ? SKETCH : CLAY;
    mats.body.color.copy(base).lerp(CARROT, colorMix);
    mats.leaf.color.copy(base).lerp(LEAF, colorMix);
    mats.white.color.copy(base).lerp(WHITE, colorMix);
    mats.dark.color.copy(base).lerp(DARK, colorMix);
    mats.frame.color.copy(base).lerp(new THREE.Color(SAFFRON), colorMix);
    mats.coat.color.copy(base).lerp(WHITE, colorMix);
    const glow = stage === 4 ? 0.15 + Math.sin(t * 2) * 0.05 : 0;
    mats.body.emissive.copy(CARROT).multiplyScalar(glow);

    if (root.current) {
      const animate = stage >= 3;
      const bounce = animate ? Math.abs(Math.sin(t * 3)) * 0.25 : 0;
      root.current.position.y = bounce;
      root.current.scale.y = animate ? 1 - Math.max(0, 0.08 - bounce) : 1;
      root.current.rotation.y += dt * (stage === 4 ? 0.8 : 0.35);
    }
    if (leaves.current) leaves.current.rotation.z = stage >= 3 ? Math.sin(t * 6) * 0.12 : 0;
    if (bones.current) bones.current.visible = stage === 3;
  });

  return (
    <group ref={root}>
      <mesh geometry={bodyGeo} material={mats.body} />
      {/* ridges */}
      {[-0.2, -0.7, -1.2].map((y, i) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.body}>
          <torusGeometry args={[0.72 - i * 0.18, 0.015, 6, 40]} />
        </mesh>
      ))}
      {/* leaves */}
      <group ref={leaves} position={[0, 1.2, 0]}>
        {[-0.5, 0, 0.5].map((a, i) => (
          <mesh key={i} position={[Math.sin(a) * 0.3, 0.45, 0]} rotation={[0, 0, a]} material={mats.leaf}>
            <coneGeometry args={[0.18, 1, 12]} />
          </mesh>
        ))}
      </group>
      {/* eyes + glasses */}
      {[-0.28, 0.28].map((x) => (
        <group key={x} position={[x, 0.45, 0.7]}>
          <mesh material={mats.white}>
            <sphereGeometry args={[0.17, 24, 24]} />
          </mesh>
          <mesh position={[0, 0, 0.12]} material={mats.dark}>
            <sphereGeometry args={[0.08, 16, 16]} />
          </mesh>
          <mesh position={[0, 0, 0.08]} material={mats.frame}>
            <torusGeometry args={[0.22, 0.025, 10, 32]} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.45, 0.8]} material={mats.frame}>
        <boxGeometry args={[0.14, 0.03, 0.03]} />
      </mesh>
      {/* smile */}
      <mesh position={[0, 0.08, 0.7]} rotation={[0.25, 0, Math.PI]} material={mats.dark}>
        <torusGeometry args={[0.2, 0.035, 8, 24, Math.PI]} />
      </mesh>
      {/* doctor's coat collar + stethoscope */}
      <mesh position={[0, -0.25, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.coat}>
        <torusGeometry args={[0.66, 0.08, 10, 40]} />
      </mesh>
      <mesh position={[0.25, -0.6, 0.55]} material={mats.frame}>
        <sphereGeometry args={[0.09, 16, 16]} />
      </mesh>
      {/* arms */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.85, -0.35, 0]} rotation={[0, 0, s * 0.9]} material={mats.body}>
          <capsuleGeometry args={[0.07, 0.5, 4, 12]} />
        </mesh>
      ))}
      {/* rig bones (only on the rigging stage) */}
      <group ref={bones}>
        {[
          [0, -1.4, 0],
          [0, -0.4, 0],
          [0, 0.6, 0],
          [0, 1.4, 0],
          [-0.9, -0.35, 0],
          [0.9, -0.35, 0],
        ].map((p, i) => (
          <mesh key={i} position={p as [number, number, number]}>
            <octahedronGeometry args={[0.09]} />
            <meshBasicMaterial color="#5ec8ff" depthTest={false} />
          </mesh>
        ))}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 2.8, 6]} />
          <meshBasicMaterial color="#5ec8ff" depthTest={false} />
        </mesh>
        <mesh position={[0, -0.38, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.015, 0.015, 1.8, 6]} />
          <meshBasicMaterial color="#5ec8ff" depthTest={false} />
        </mesh>
      </group>
    </group>
  );
}

/* ---------------- Script book (content writing) ---------------- */

export function ScriptBook(props: GroupProps) {
  const page = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 320;
    const g = c.getContext("2d")!;
    g.fillStyle = "#fff8ef";
    g.fillRect(0, 0, 256, 320);
    g.fillStyle = "#013954";
    g.font = "bold 22px monospace";
    g.fillText("SCENE 1", 24, 40);
    g.fillStyle = "#9aa9b3";
    for (let i = 0; i < 11; i++) g.fillRect(24, 64 + i * 22, 140 + ((i * 53) % 70), 6);
    g.fillStyle = "#e3262b";
    g.fillRect(24, 300, 60, 4);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  const turning = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (turning.current) turning.current.rotation.y = -0.15 - (Math.sin(clock.getElapsedTime() * 1.2) * 0.5 + 0.5) * 2.6;
  });
  return (
    <group {...props}>
      <group rotation={[-0.9, 0, 0]}>
        {/* cover */}
        <mesh position={[0, 0, -0.04]}>
          <boxGeometry args={[2.3, 1.5, 0.06]} />
          <meshStandardMaterial color={EMBER} roughness={0.6} />
        </mesh>
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 0.56, 0, 0.02]} rotation={[0, s * -0.08, 0]}>
            <boxGeometry args={[1.08, 1.4, 0.08]} />
            <meshStandardMaterial attach="material-0" color="#f3ead9" />
            <meshStandardMaterial attach="material-1" color="#f3ead9" />
            <meshStandardMaterial attach="material-2" color="#f3ead9" />
            <meshStandardMaterial attach="material-3" color="#f3ead9" />
            <meshStandardMaterial attach="material-4" map={page} />
            <meshStandardMaterial attach="material-5" color="#f3ead9" />
          </mesh>
        ))}
        {/* turning page */}
        <group ref={turning} position={[0, 0, 0.07]}>
          <mesh position={[0.53, 0, 0]}>
            <planeGeometry args={[1.06, 1.38]} />
            <meshStandardMaterial map={page} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>
      <group position={[0.9, 0.35, 0.4]} rotation={[0.4, 0.2, -0.9]} scale={0.6}>
        <mesh>
          <cylinderGeometry args={[0.09, 0.09, 1.8, 6]} />
          <meshStandardMaterial color={SAFFRON} flatShading />
        </mesh>
        <mesh position={[0, -1.05, 0]}>
          <coneGeometry args={[0.09, 0.3, 6]} />
          <meshStandardMaterial color="#f4d9b0" flatShading />
        </mesh>
      </group>
    </group>
  );
}

/* ---------------- Druk — the baby dragon mascot ---------------- */

const DRAGON = "#3fa9f5";
const DRAGON_DARK = "#1f7fc7";
const BELLY = "#fff1d6";

function Wing({ side }: { side: 1 | -1 }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.bezierCurveTo(0.4, 0.5, 0.9, 0.9, 1.25, 0.75);
    s.bezierCurveTo(1.1, 0.5, 1.15, 0.35, 1.2, 0.15);
    s.bezierCurveTo(1.0, 0.2, 0.9, 0.05, 0.92, -0.12);
    s.bezierCurveTo(0.7, -0.05, 0.55, -0.2, 0.5, -0.35);
    s.bezierCurveTo(0.3, -0.2, 0.1, -0.15, 0, 0);
    return s;
  }, []);
  return (
    <mesh scale={[side, 1, 1]}>
      <extrudeGeometry args={[shape, { depth: 0.04, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 2 }]} />
      <meshStandardMaterial color="#f7941d" roughness={0.5} side={THREE.DoubleSide} />
    </mesh>
  );
}

export function Dragon({ look, ...props }: GroupProps & { look?: React.RefObject<THREE.Vector2> }) {
  const head = useRef<THREE.Group>(null);
  const wingL = useRef<THREE.Group>(null);
  const wingR = useRef<THREE.Group>(null);
  const tail = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);

  const tailCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -0.55, -0.45),
        new THREE.Vector3(0.35, -0.85, -0.85),
        new THREE.Vector3(0.9, -0.7, -1.0),
        new THREE.Vector3(1.15, -0.3, -0.85),
        new THREE.Vector3(1.0, 0.0, -0.6),
      ]),
    [],
  );
  const tailTip = useMemo(() => tailCurve.getPoint(1), [tailCurve]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const flap = Math.sin(t * 7) * 0.45;
    if (wingL.current) wingL.current.rotation.y = 0.5 + flap;
    if (wingR.current) wingR.current.rotation.y = -0.5 - flap;
    if (tail.current) tail.current.rotation.y = Math.sin(t * 2) * 0.25;
    if (body.current) body.current.position.y = Math.sin(t * 2) * 0.08;
    // blink every few seconds
    if (eyes.current) eyes.current.scale.y = t % 3.6 < 0.12 ? 0.1 : 1;
    if (head.current) {
      const lx = look?.current?.x ?? Math.sin(t * 0.6) * 0.4;
      const ly = look?.current?.y ?? 0;
      head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, lx * 0.6, 0.08);
      head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, -ly * 0.35, 0.08);
      head.current.rotation.z = Math.sin(t * 1.3) * 0.06;
    }
  });

  return (
    <group {...props}>
      <group ref={body}>
        {/* body */}
        <mesh position={[0, -0.25, 0]} scale={[0.78, 0.86, 0.72]}>
          <sphereGeometry args={[0.8, 40, 40]} />
          <meshStandardMaterial color={DRAGON} roughness={0.45} />
        </mesh>
        <mesh position={[0, -0.3, 0.3]} scale={[0.52, 0.66, 0.4]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color={BELLY} roughness={0.6} />
        </mesh>
        {/* belly stripes */}
        {[-0.05, -0.28, -0.51].map((y) => (
          <mesh key={y} position={[0, y, 0.6]} rotation={[0.25, 0, 0]} scale={[1, 0.4, 0.4]}>
            <torusGeometry args={[0.24 - Math.abs(y + 0.28) * 0.25, 0.018, 6, 24, Math.PI]} />
            <meshStandardMaterial color="#f2d7a6" />
          </mesh>
        ))}
        {/* arms */}
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 0.5, -0.15, 0.35]} rotation={[0.6, 0, s * 0.6]}>
            <capsuleGeometry args={[0.1, 0.28, 6, 12]} />
            <meshStandardMaterial color={DRAGON} roughness={0.45} />
          </mesh>
        ))}
        {/* feet */}
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 0.32, -0.92, 0.18]} scale={[1, 0.6, 1.3]}>
            <sphereGeometry args={[0.2, 20, 20]} />
            <meshStandardMaterial color={DRAGON_DARK} roughness={0.5} />
          </mesh>
        ))}
        {/* wings */}
        <group ref={wingL} position={[-0.25, 0.15, -0.4]}>
          <Wing side={-1} />
        </group>
        <group ref={wingR} position={[0.25, 0.15, -0.4]}>
          <Wing side={1} />
        </group>
        {/* spine spikes */}
        {[0.25, 0.0, -0.25, -0.5].map((y, i) => (
          <mesh key={y} position={[0, y, -0.55 + i * 0.02]} rotation={[-0.6 - i * 0.2, 0, 0]}>
            <coneGeometry args={[0.08, 0.2, 8]} />
            <meshStandardMaterial color={SAFFRON} roughness={0.4} />
          </mesh>
        ))}
        {/* tail */}
        <group ref={tail}>
          <mesh>
            <tubeGeometry args={[tailCurve, 40, 0.11, 12, false]} />
            <meshStandardMaterial color={DRAGON} roughness={0.45} />
          </mesh>
          <mesh position={tailTip} rotation={[0.3, 0, -0.6]}>
            <coneGeometry args={[0.16, 0.35, 4]} />
            <meshStandardMaterial color={EMBER} roughness={0.4} />
          </mesh>
        </group>

        {/* head */}
        <group ref={head} position={[0, 0.75, 0.05]}>
          <mesh scale={[1, 0.92, 0.95]}>
            <sphereGeometry args={[0.62, 40, 40]} />
            <meshStandardMaterial color={DRAGON} roughness={0.45} />
          </mesh>
          {/* snout */}
          <mesh position={[0, -0.18, 0.48]} scale={[0.42, 0.28, 0.3]}>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial color={BELLY} roughness={0.6} />
          </mesh>
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * 0.1, -0.1, 0.72]}>
              <sphereGeometry args={[0.035, 12, 12]} />
              <meshStandardMaterial color="#0b2a3a" />
            </mesh>
          ))}
          {/* smile */}
          <mesh position={[0, -0.28, 0.68]} rotation={[0.3, 0, Math.PI]}>
            <torusGeometry args={[0.1, 0.018, 8, 20, Math.PI]} />
            <meshStandardMaterial color="#0b2a3a" />
          </mesh>
          {/* eyes */}
          <group ref={eyes} position={[0, 0.08, 0]}>
            {[-1, 1].map((s) => (
              <group key={s} position={[s * 0.24, 0, 0.47]}>
                <mesh scale={[1, 1.15, 0.8]}>
                  <sphereGeometry args={[0.16, 24, 24]} />
                  <meshStandardMaterial color="#ffffff" roughness={0.2} />
                </mesh>
                <mesh position={[0, -0.01, 0.1]}>
                  <sphereGeometry args={[0.1, 20, 20]} />
                  <meshStandardMaterial color="#0b2a3a" roughness={0.2} />
                </mesh>
                <mesh position={[0.04, 0.05, 0.18]}>
                  <sphereGeometry args={[0.03, 10, 10]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
              </group>
            ))}
          </group>
          {/* cheeks */}
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * 0.4, -0.15, 0.4]} scale={[1, 0.6, 0.4]}>
              <sphereGeometry args={[0.09, 16, 16]} />
              <meshStandardMaterial color="#ff8fa3" transparent opacity={0.8} />
            </mesh>
          ))}
          {/* horns */}
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * 0.28, 0.55, -0.05]} rotation={[-0.3, 0, s * -0.45]}>
              <coneGeometry args={[0.08, 0.42, 12]} />
              <meshStandardMaterial color={SAFFRON} roughness={0.4} />
            </mesh>
          ))}
          {/* ear fins */}
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * 0.6, 0.12, -0.05]} rotation={[0, 0, s * -1.2]} scale={[1, 1, 0.35]}>
              <coneGeometry args={[0.13, 0.36, 10]} />
              <meshStandardMaterial color="#f7941d" roughness={0.5} />
            </mesh>
          ))}
          {/* mane */}
          {[-0.5, -0.25, 0, 0.25, 0.5].map((x) => (
            <mesh key={x} position={[x * 0.5, 0.45, -0.38]} rotation={[-0.9, 0, x * -0.6]}>
              <coneGeometry args={[0.07, 0.22, 8]} />
              <meshStandardMaterial color={EMBER} roughness={0.4} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

/* ---------------- Soft cloud cluster ---------------- */

export function Cloud({ seed = 1, ...props }: GroupProps & { seed?: number }) {
  const puffs = useMemo(() => {
    const out: { p: [number, number, number]; r: number }[] = [];
    let x = seed * 9.73;
    const rand = () => ((x = (x * 16807) % 2147483647) / 2147483647 + 1) % 1;
    for (let i = 0; i < 9; i++) {
      const edge = 1 - Math.abs(i - 4) / 5; // bigger puffs in the middle
      out.push({ p: [(i - 4) * 0.3, edge * 0.18 + rand() * 0.08, rand() * 0.25], r: 0.16 + edge * 0.26 + rand() * 0.06 });
    }
    return out;
  }, [seed]);
  return (
    <group {...props}>
      <group scale={[1, 0.62, 0.7]}>
        {puffs.map((pf, i) => (
          <mesh key={i} position={pf.p}>
            <sphereGeometry args={[pf.r, 20, 20]} />
            <meshStandardMaterial color="#cfe6f7" roughness={1} transparent opacity={0.85} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
