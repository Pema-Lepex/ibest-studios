"use client";

import Image, { StaticImageData } from "next/image";
import { Tilt } from "@/components/motion";

interface TeamMemberCardProps {
  name: string;
  designation: string;
  bio?: string;
  image: string | StaticImageData;
}

export default function TeamMemberCard({
  name,
  designation,
  bio,
  image,
}: TeamMemberCardProps) {
  return (
    <Tilt max={5} className="h-full perspective-[1000px]">
      <div className="group relative h-full overflow-hidden rounded-2xl border border-cream/10 bg-ink-850 transition-colors duration-500 hover:border-gold-500/40">
        <div className="relative aspect-4/5 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top grayscale transition-all duration-700 ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink-850 via-ink-850/20 to-transparent" />
        </div>

        {/* Name plate lifts over the photo's lower edge. */}
        <div className="relative -mt-16 p-6">
          <h3 className="font-raleway text-xl font-bold text-cream transition-colors duration-300 group-hover:text-gold-500">
            {name}
          </h3>
          <p className="mt-1 text-xs uppercase tracking-widest text-gold-500">
            {designation}
          </p>
          {bio && (
            <p className="mt-4 text-sm leading-relaxed text-mist">{bio}</p>
          )}
        </div>
      </div>
    </Tilt>
  );
}
