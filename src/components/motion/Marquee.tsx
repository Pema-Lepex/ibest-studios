"use client";

import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  /** Seconds for one full pass. Higher is slower. */
  speed?: number;
  reverse?: boolean;
  /** Freeze the scroll while the cursor is over it. */
  pauseOnHover?: boolean;
}

/**
 * Infinite horizontal scroller. The children are rendered twice and the track
 * translates exactly -50%, so the second copy lands where the first began and
 * the loop is seamless.
 */
export default function Marquee({
  children,
  className = "",
  speed = 40,
  reverse = false,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div className={`group mask-fade-x overflow-hidden ${className}`}>
      <div
        className={`flex w-max animate-marquee items-center ${
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        }`}
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
