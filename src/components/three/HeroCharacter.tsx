"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const MODEL = "/models/nono.glb";

// Three.js strips dots from node names, so Blender's DEF-spine.006 loads as DEF-spine006
const BONES = {
  head: "DEF-spine006",
  lowerSpine: "DEF-spine001",
  midSpine: "DEF-spine002",
  chest: "DEF-spine003",
  upperChest: "DEF-spine004",
  neck: "DEF-spine005",
  armL: "DEF-upper_armL",
  armR: "DEF-upper_armR",
  shoulderL: "DEF-shoulderL",
  shoulderR: "DEF-shoulderR",
};
type BoneKey = keyof typeof BONES;

const OPEN_EYES = 0.3; // the character file's resting eyelids
const IDLE_AFTER = 4; // seconds without cursor movement before Nono looks around
const EYE_REACH = 0.075; // how far the iris slides across the eyeball

// The Kuzuzangpo greeting, played once per page load after the intro screen
// Hands come to the front with open palms, then a slight bow with the gaze lowered, then back.
const BOW_DELAY = 0.5; // seconds after the intro before it starts
const HANDS_IN = [0, 0.6]; // seconds into the greeting
const BOW_DOWN = [0.35, 1.3];
const BOW_UP = [2.05, 3.05];
const HANDS_OUT = [2.65, 3.35];
const GREETING_END = 3.35;
const SPEECH_START = 0.5;
const BOW_ANGLES = { lowerSpine: 0.1, midSpine: 0.1, chest: 0.1, neck: 0.08, head: 0.16 }; // radians, about 31 degrees in all
const SYLLABLES = ["MouthU", "MouthU", "MouthA", "MouthO"]; // ku-zu-zang-po
const SYLLABLE_TIME = 0.27;
let greeted = false;

// The reaction to clicking on Nono: a big smile and a little hop
const CHEER_TIME = 1.7;
const HOP_TIME = 0.5;
const HOP_HEIGHT = 1.1; // model units

const Z_AXIS = new THREE.Vector3(0, 0, 1);
const X_AXIS = new THREE.Vector3(1, 0, 0);

const q1 = new THREE.Quaternion();
const q2 = new THREE.Quaternion();
const euler = new THREE.Euler();
const { damp } = THREE.MathUtils;
const random = (min: number, max: number) => min + Math.random() * (max - min);

// Eyelid weight through a blink: quick to close, slower to open
function blinkCurve(p: number) {
  if (p < 0.35) return p / 0.35;
  return 1 - (p - 0.35) / 0.65;
}

type Props = ThreeElements["group"] & { cursor?: React.RefObject<THREE.Vector2>; greet?: boolean };
type Eye = { texture: THREE.Texture; side: number };
type PoseExtras = { translation: number[]; rotation: number[]; scale: number[] };
const { smootherstep, smoothstep } = THREE.MathUtils;

// Nono, exported from Blender. The cursor drives the eyes first and the head follows;
// blinks, breathing and arm sway run on top, and Nono looks around when left alone.
export function HeroCharacter({ cursor, greet = false, ...props }: Props) {
  const { scene } = useGLTF(MODEL);
  const hop = useRef<THREE.Group>(null);

  const rig = useMemo(() => {
    const bones = {} as Record<BoneKey, THREE.Object3D | undefined>;
    (Object.keys(BONES) as BoneKey[]).forEach((key) => {
      bones[key] = scene.getObjectByName(BONES[key]);
    });
    // arm bones carry the hands-in-front pose from the export; blend to it during the greeting
    const handBones: { bone: THREE.Object3D; restP: THREE.Vector3; restQ: THREE.Quaternion; restS: THREE.Vector3; p: THREE.Vector3; q: THREE.Quaternion; s: THREE.Vector3 }[] = [];
    scene.traverse((o) => {
      const pose = o.userData.handsFront as PoseExtras | undefined;
      if (!pose) return;
      handBones.push({
        bone: o,
        restP: o.position.clone(),
        restQ: o.quaternion.clone(),
        restS: o.scale.clone(),
        p: new THREE.Vector3().fromArray(pose.translation),
        q: new THREE.Quaternion().fromArray(pose.rotation),
        s: new THREE.Vector3().fromArray(pose.scale),
      });
    });
    const faces: THREE.Mesh[] = [];
    const eyes: THREE.Mesh[] = [];
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      if (mesh.morphTargetDictionary?.Blink !== undefined) faces.push(mesh);
      if ((mesh.material as THREE.Material).name.startsWith("Nono_Eye")) eyes.push(mesh);
    });
    return {
      bones,
      handBones,
      faces,
      eyes,
      rest: {
        head: bones.head?.quaternion.clone(),
        lowerSpine: bones.lowerSpine?.quaternion.clone(),
        midSpine: bones.midSpine?.quaternion.clone(),
        chest: bones.chest?.quaternion.clone(),
        neck: bones.neck?.quaternion.clone(),
        upperChestY: bones.upperChest?.position.y ?? 0,
        shoulderLY: bones.shoulderL?.position.y ?? 0,
        shoulderRY: bones.shoulderR?.position.y ?? 0,
      },
    };
  }, [scene]);

  const eyeMaps = useRef<Eye[]>([]);
  const calm = useRef(false);

  useEffect(() => {
    calm.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // give each eye its own texture transform, so the iris can slide independently of the shared file;
    // the two eyeballs are mirrored, so the same movement needs opposite signs
    eyeMaps.current = rig.eyes.map((mesh) => {
      const material = mesh.material as THREE.MeshStandardMaterial;
      const owned = material.userData.perEye ? material : material.clone();
      if (!owned.userData.perEye) {
        const texture = material.map!.clone();
        texture.needsUpdate = true;
        owned.map = texture;
        owned.emissiveMap = texture;
        owned.userData.perEye = true;
        mesh.material = owned;
      }
      return { texture: owned.map!, side: mesh.name.endsWith("001") ? 1 : -1 };
    });
  }, [rig]);

  const state = useRef({
    head: new THREE.Vector2(),
    eye: new THREE.Vector2(),
    target: new THREE.Vector2(),
    last: new THREE.Vector2(),
    tilt: 0,
    tiltTarget: 0,
    smile: 0,
    smileTarget: 0,
    lastMove: -Infinity,
    nextGlance: 0,
    nextBlink: 2,
    blinkStart: -1,
    doubleBlink: false,
    bowStart: -1,
    smileUntil: 0,
    cheerWanted: false,
    cheerStart: -1,
  });

  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 0.1);
    const t = clock.getElapsedTime();
    const s = state.current;
    const { bones, handBones, rest, faces } = rig;
    const moving = !calm.current;

    // The greeting: bend forward, say the word, come back up smiling
    if (greet && !greeted && moving) {
      greeted = true;
      s.bowStart = t + BOW_DELAY;
    }
    let bow = 0;
    let hands = 0;
    let mouth = -1;
    let mouthAmount = 0;
    if (s.bowStart >= 0 && t >= s.bowStart) {
      const b = t - s.bowStart;
      bow = smootherstep(b, BOW_DOWN[0], BOW_DOWN[1]) * (1 - smootherstep(b, BOW_UP[0], BOW_UP[1]));
      hands = smoothstep(b, HANDS_IN[0], HANDS_IN[1]) * (1 - smoothstep(b, HANDS_OUT[0], HANDS_OUT[1]));
      if (b >= GREETING_END) {
        s.bowStart = -1;
        s.smileUntil = t + 2.5;
      }
      const syllable = (b - SPEECH_START) / SYLLABLE_TIME;
      if (syllable >= 0 && syllable < SYLLABLES.length) {
        mouth = Math.floor(syllable);
        mouthAmount = Math.sin((syllable - mouth) * Math.PI) * 0.55;
      }
    }
    const greeting = s.bowStart >= 0;

    // Click reaction, ignored during the greeting
    if (s.cheerWanted) {
      s.cheerWanted = false;
      if (!greeting) {
        s.cheerStart = t;
        s.tiltTarget = Math.random() < 0.5 ? -0.1 : 0.1;
      }
    }
    let cheer = 0;
    if (s.cheerStart >= 0) {
      const c = t - s.cheerStart;
      cheer = smoothstep(c, 0, 0.14) * (1 - smoothstep(c, CHEER_TIME - 0.6, CHEER_TIME));
      if (c >= CHEER_TIME) s.cheerStart = -1;
      if (hop.current) hop.current.position.y = moving && c < HOP_TIME ? Math.sin((c / HOP_TIME) * Math.PI) * HOP_HEIGHT : 0;
    }

    // Where to look: the cursor, or somewhere of Nono's own choosing when idle
    if (cursor?.current && !cursor.current.equals(s.last)) {
      s.last.copy(cursor.current);
      s.lastMove = t;
    }
    if (greeting) {
      s.target.set(0, -0.55); // the gaze stays lowered: staring is considered impolite
      s.tiltTarget = 0;
    } else if (s.cheerStart >= 0) {
      s.target.copy(s.last);
    } else if (t < s.smileUntil) {
      s.target.copy(s.last);
      s.smileTarget = 0.3;
    } else if (t - s.lastMove < IDLE_AFTER) {
      s.target.copy(s.last);
      s.tiltTarget = 0;
      s.smileTarget = 0;
    } else if (moving && t > s.nextGlance) {
      s.nextGlance = t + random(2.2, 5);
      const centre = Math.random() < 0.35;
      s.target.set(centre ? 0 : random(-0.7, 0.7), centre ? 0 : random(-0.2, 0.35));
      s.tiltTarget = Math.random() < 0.5 ? random(-0.09, 0.09) : 0;
      s.smileTarget = Math.random() < 0.4 ? random(0.16, 0.3) : 0;
    }

    // The eyes get there first, then the head catches up and the eyes relax back
    s.eye.x = damp(s.eye.x, s.target.x, 16, dt);
    s.eye.y = damp(s.eye.y, s.target.y, 16, dt);
    s.head.x = damp(s.head.x, s.target.x, 2.6, dt);
    s.head.y = damp(s.head.y, s.target.y, 2.6, dt);
    s.tilt = damp(s.tilt, s.tiltTarget, 2, dt);
    s.smile = damp(s.smile, s.smileTarget, 2.5, dt);

    if (bones.head && rest.head) {
      q1.setFromEuler(euler.set(-s.head.y * 0.25 + bow * BOW_ANGLES.head, s.head.x * 0.5, s.tilt));
      bones.head.quaternion.copy(rest.head).multiply(q1);
    }
    (["lowerSpine", "midSpine", "chest", "neck"] as const).forEach((key) => {
      const restQ = rest[key];
      if (!restQ) return;
      q1.setFromAxisAngle(X_AXIS, bow * BOW_ANGLES[key]);
      bones[key]?.quaternion.copy(restQ).multiply(q1);
    });
    const irisX = THREE.MathUtils.clamp((s.eye.x - s.head.x * 0.75) * 1.5 + s.head.x * 0.35, -1, 1) * EYE_REACH;
    const irisY = THREE.MathUtils.clamp((s.eye.y - s.head.y * 0.75) * 1.5 + s.head.y * 0.35, -1, 1) * EYE_REACH;
    eyeMaps.current.forEach(({ texture, side }) => texture.offset.set(irisX * side, -irisY));

    // Blink at random, sometimes twice in a row
    let blink = OPEN_EYES;
    if (moving || s.blinkStart >= 0) {
      if (s.blinkStart < 0 && t > s.nextBlink) s.blinkStart = t;
      if (s.blinkStart >= 0) {
        const p = (t - s.blinkStart) / 0.2;
        if (p >= 1) {
          s.blinkStart = -1;
          s.doubleBlink = !s.doubleBlink && Math.random() < 0.2;
          s.nextBlink = t + (s.doubleBlink ? 0.12 : random(2.4, 6));
        } else {
          blink = OPEN_EYES + (1 - OPEN_EYES) * blinkCurve(p);
        }
      }
    }
    faces.forEach((mesh) => {
      const dict = mesh.morphTargetDictionary!;
      const weights = mesh.morphTargetInfluences!;
      // happy eyes pull the lids down too, so ease the resting lids off as the smile grows
      const lids = Math.max(blink, OPEN_EYES + bow * 0.28); // eyelids lower with the bow
      weights[dict.Blink] = lids * (1 - Math.max(s.smile, cheer));
      if (dict.HappyEye !== undefined) weights[dict.HappyEye] = Math.max(s.smile * 0.9, cheer * 0.75);
      // the gentle smile stays low, because higher values part the lips and show the teeth; a click earns a grin
      if (dict.HappyMouth !== undefined) weights[dict.HappyMouth] = Math.max(s.smile * 0.35, cheer * 0.6);
      ["MouthU", "MouthA", "MouthO"].forEach((name) => {
        if (dict[name] !== undefined) weights[dict[name]] = mouth >= 0 && SYLLABLES[mouth] === name ? mouthAmount : 0;
      });
    });

    // Arm bones start each frame from the blend between the relaxed and hands-in-front poses
    handBones.forEach(({ bone, restP, restQ, restS, p, q, s: scale }) => {
      bone.position.lerpVectors(restP, p, hands);
      bone.quaternion.slerpQuaternions(restQ, q, hands);
      bone.scale.lerpVectors(restS, scale, hands);
    });

    if (!moving) return;

    // Breathing: the chest swells and lifts the shoulders and head a touch
    const breath = (Math.sin(t * 1.5) + 1) / 2;
    bones.chest?.scale.set(1 + breath * 0.016, 1, 1 + breath * 0.022);
    bones.upperChest?.scale.set(1 / (1 + breath * 0.016), 1, 1 / (1 + breath * 0.022));
    bones.upperChest?.position.setY(rest.upperChestY + breath * 0.05);
    const lift = breath * 0.05;
    bones.shoulderL?.position.setY(rest.shoulderLY + lift);
    bones.shoulderR?.position.setY(rest.shoulderRY + lift);
    // the upper arms were reset by the blend above, so this doesn't build up
    [bones.armL, bones.armR].forEach((bone) => bone?.position.setY(bone.position.y + lift));

    // Arm sway: a slow drift out from the body, stilled while the hands are in front; a click lifts the arms a touch
    const sway = 1 - hands;
    if (bones.armL) {
      q1.setFromAxisAngle(Z_AXIS, (Math.sin(t * 0.75) * 0.03 + breath * 0.012) * sway + cheer * 0.16);
      q2.setFromAxisAngle(X_AXIS, Math.sin(t * 0.5 + 1) * 0.035 * sway);
      bones.armL.quaternion.premultiply(q2).premultiply(q1);
    }
    if (bones.armR) {
      q1.setFromAxisAngle(Z_AXIS, (-Math.sin(t * 0.68 + 0.8) * 0.03 - breath * 0.012) * sway - cheer * 0.16);
      q2.setFromAxisAngle(X_AXIS, Math.sin(t * 0.55 + 2.4) * 0.035 * sway);
      bones.armR.quaternion.premultiply(q2).premultiply(q1);
    }
  });

  return (
    <group {...props}>
      <group ref={hop}>
        <primitive object={scene} />
      </group>
      {/* a simple hit shape, so hovering doesn't test every hair triangle */}
      <mesh
        visible={false}
        position={[0, 11, 0]}
        onClick={() => {
          state.current.cheerWanted = true;
        }}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "";
        }}
      >
        <capsuleGeometry args={[5.5, 11, 4, 12]} />
      </mesh>
    </group>
  );
}

useGLTF.preload(MODEL);
