"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => String(Math.floor(n)).padStart(2, "0");

function Timecode() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const id = setInterval(() => setT((performance.now() - start) / 1000), 1000 / 12);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="tabular-nums">
      {pad(t / 3600)}:{pad((t / 60) % 60)}:{pad(t % 60)}:{pad((t * 24) % 24)}
    </span>
  );
}

// Camera-monitor overlay: frame corners, REC light, running timecode and slate labels.
export default function Viewfinder({
  title,
  cam = "CAM A",
  compact = false,
  className = "",
}: {
  title?: string;
  cam?: string;
  compact?: boolean;
  className?: string;
}) {
  const corner = compact ? "size-4" : "size-5 sm:size-8";
  const inset = compact ? "inset-2.5" : "inset-3 sm:inset-5";
  const text = compact ? "text-[9px]" : "text-[10px] sm:text-xs";
  return (
    <div className={`pointer-events-none absolute ${inset} ${className}`} aria-hidden>
      <span className={`absolute left-0 top-0 ${corner} border-l-2 border-t-2 border-white/80`} />
      <span className={`absolute right-0 top-0 ${corner} border-r-2 border-t-2 border-white/80`} />
      <span className={`absolute bottom-0 left-0 ${corner} border-b-2 border-l-2 border-white/80`} />
      <span className={`absolute bottom-0 right-0 ${corner} border-b-2 border-r-2 border-white/80`} />

      <div className={`absolute left-3 top-2 flex items-center gap-2 font-mono ${text} uppercase tracking-widest text-white drop-shadow sm:left-5 sm:top-3`}>
        <span className="flex items-center gap-1.5 rounded bg-red px-1.5 py-0.5 font-semibold">
          <span className="size-1.5 animate-blink rounded-full bg-white" /> REC
        </span>
        <Timecode />
      </div>
      <div className={`absolute right-3 top-2 flex items-center gap-2 font-mono ${text} uppercase tracking-widest text-white/90 drop-shadow sm:right-5 sm:top-3`}>
        {!compact && <span className="hidden sm:inline">4K · 24FPS</span>}
        <span>{cam}</span>
        <span className="flex h-2.5 w-5 items-center border border-white/80 p-px">
          <span className="h-full w-3/4 bg-white/90" />
        </span>
      </div>

      {!compact && (
        <div className="absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 opacity-50 sm:size-8">
          <span className="absolute left-1/2 top-0 h-full w-px bg-white" />
          <span className="absolute left-0 top-1/2 h-px w-full bg-white" />
        </div>
      )}

      {title && (
        <div className={`absolute bottom-2 left-3 max-w-[70%] truncate font-mono ${text} uppercase tracking-widest text-white drop-shadow sm:bottom-3 sm:left-5`}>
          {title}
        </div>
      )}
    </div>
  );
}
