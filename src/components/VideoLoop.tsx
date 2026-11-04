"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { thumb } from "@/data/site";
import { isBelowFastConnection, isConstrained, whenPageIdle } from "./idle";

// How long a video must stay on screen before it starts, so scrolling past one downloads nothing.
const DWELL_MS = 350;

const isPhone = () => window.matchMedia("(max-width: 767px)").matches;

// Autoplay is skipped for people who asked for less motion or less data, and on slow connections.
function useAutoplayAllowed() {
  return useSyncExternalStore(
    () => () => {},
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !isConstrained(),
    () => false,
  );
}

// Only a few players may run at once; the rest keep showing their poster until a slot frees up.
let activeSlots = 0;
const queue: (() => void)[] = [];
function acquireSlot(grant: () => void) {
  let held = false;
  const give = () => {
    held = true;
    activeSlots++;
    grant();
  };
  if (activeSlots < (isPhone() ? 1 : 2)) give();
  else queue.push(give);
  return () => {
    if (held) {
      activeSlots--;
      queue.shift()?.();
    } else {
      queue.splice(queue.indexOf(give), 1);
    }
  };
}

// The player lives in its own component so its state resets every time it unmounts.
// It fades in once YouTube reports playback. Some browsers (Safari, Low Power Mode,
// autoplay blockers) refuse to start, so we nudge it to play and reveal it anyway after a while.
function Player({ src, zoom, start }: { src: string; zoom: number; start: number }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const send = (msg: object) => frame.current?.contentWindow?.postMessage(JSON.stringify(msg), "*");
    let heard = false;
    // the player only reports state once it has received "listening", and it may not be ready on first try
    const listen = setInterval(() => !heard && send({ event: "listening", id: 1, channel: "widget" }), 400);
    const nudge = setTimeout(() => {
      send({ event: "command", func: "mute", args: [] });
      send({ event: "command", func: "playVideo", args: [] });
    }, 2500);
    const fallback = setTimeout(() => setShown(true), 8000);

    let duration = 0;
    let looping = false;
    let reveal: ReturnType<typeof setTimeout> | undefined;
    const restart = () => {
      looping = true;
      send({ event: "command", func: "seekTo", args: [start, true] });
      send({ event: "command", func: "playVideo", args: [] });
      setTimeout(() => (looping = false), 1500);
    };

    const onMessage = (e: MessageEvent) => {
      if (e.source !== frame.current?.contentWindow || typeof e.data !== "string") return;
      heard = true;
      try {
        const msg = JSON.parse(e.data);
        const info = msg.info ?? {};
        if (typeof info.duration === "number" && info.duration > 0) duration = info.duration;
        const state = msg.event === "onStateChange" ? msg.info : info.playerState;
        // 1 = playing: keep the poster up until YouTube's start-up icons have faded, then show the frame
        if (state === 1 && !reveal) reveal = setTimeout(() => setShown(true), 3500);
        // loop ourselves (no playlist = no prev/next buttons and no end screen)
        if (!looping && (state === 0 || (duration && typeof info.currentTime === "number" && info.currentTime > duration - 1.2))) restart();
      } catch {
        // not a player message
      }
    };
    window.addEventListener("message", onMessage);
    return () => {
      clearInterval(listen);
      clearTimeout(nudge);
      clearTimeout(fallback);
      clearTimeout(reveal);
      window.removeEventListener("message", onMessage);
    };
  }, [start]);

  return (
    <iframe
      ref={frame}
      src={`${src}&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`}
      title="iBEST Studios video"
      allow="autoplay; encrypted-media; picture-in-picture"
      tabIndex={-1}
      aria-hidden
      className={`pointer-events-none absolute left-1/2 top-1/2 h-[max(100cqh,56.25cqw)] w-[max(100cqw,177.78cqh)] -translate-x-1/2 -translate-y-1/2 border-0 transition-opacity duration-700 ${
        shown ? "opacity-100" : "opacity-0"
      }`}
      style={{ scale: zoom }}
    />
  );
}

/**
 * Muted, looping, chrome-less YouTube preview that fills its box like `object-fit: cover`.
 * A poster shows straight away; the player only starts once the page has loaded, the box has
 * stayed on screen for a moment and a slot is free. Background (`quiet`) videos only run on
 * laptops with a fast connection.
 */
export default function VideoLoop({
  id,
  start = 0,
  className = "",
  zoom = 1.32,
  label = "Loading tape",
  poster,
  priority = false,
  enabled = true,
  quiet = false,
}: {
  id: string;
  /** set false to keep the player unmounted even while on screen */
  enabled?: boolean;
  /** background use: no loading animation, the box stays transparent until playback */
  quiet?: boolean;
  start?: number;
  className?: string;
  /** extra scale to push YouTube's overlays out of frame */
  zoom?: number;
  label?: string;
  /** still image shown until playback; defaults to the video's YouTube thumbnail unless `quiet` */
  poster?: string;
  /** the poster is the main image on screen: load it right away */
  priority?: boolean;
}) {
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box);
  const allowed = useAutoplayAllowed();
  const [running, setRunning] = useState(false);
  const wanted = inView && allowed && enabled;

  useEffect(() => {
    if (!wanted || (quiet && (isPhone() || isBelowFastConnection()))) return;
    let release: (() => void) | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const cancelIdle = whenPageIdle(() => {
      timer = setTimeout(() => {
        release = acquireSlot(() => setRunning(true));
      }, DWELL_MS);
    });
    return () => {
      cancelIdle();
      clearTimeout(timer);
      release?.();
      setRunning(false);
    };
  }, [wanted, quiet]);

  const src =
    `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0` +
    `&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&start=${start}`;

  return (
    <div
      ref={box}
      // callers usually pass `absolute inset-0`; only fall back to `relative` when they don't position it
      className={`${/\b(absolute|fixed)\b/.test(className) ? "" : "relative"} overflow-hidden ${quiet ? "" : "bg-abyss"} ${className}`}
      style={{ containerType: "size" }}
    >
      {/* "tape loading" state instead of a thumbnail; the player fades in over it */}
      {!quiet && (
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[linear-gradient(110deg,#011f2e_30%,#0b5a80_50%,#011f2e_70%)] bg-[length:250%_100%] motion-safe:animate-[shimmer_2.2s_linear_infinite]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60">
              <span className="size-1.5 animate-blink rounded-full bg-red" />
              {label}
            </span>
          </div>
        </div>
      )}
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" aria-hidden data-poster fetchPriority={priority ? "high" : "auto"} loading={priority ? "eager" : "lazy"} decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        !quiet && (
          // YouTube's "hq" thumbnail is 4:3 with black bars; sizing it like this leaves the bars outside the box
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumb(id)} alt="" aria-hidden data-poster loading="lazy" decoding="async" className="absolute left-1/2 top-1/2 aspect-[4/3] w-[max(100cqw,177.78cqh)] max-w-none -translate-x-1/2 -translate-y-1/2" />
        )
      )}
      {running && <Player key={src} src={src} zoom={zoom} start={start} />}
    </div>
  );
}
