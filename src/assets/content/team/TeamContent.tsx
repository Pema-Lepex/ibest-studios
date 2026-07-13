import { CEOImage } from "@/assets";

/**
 * Only real people belong in `members`. The previous version repeated the same
 * CEO entry nine times to fill the grid; the grid now handles a short list on
 * its own, so add teammates here as their photos arrive.
 */
export const TeamContent = {
  eyebrow: "The people",
  title: "A company is its people.",
  description:
    "We believe that a company makes people and its people completes the company. A company and people are inseparable! At iBEST, we believe our company is what values our people uphold and live.",
  members: [
    {
      name: "Tharchen",
      role: "CEO & Founder",
      bio: "Leads the studio's creative direction and its people — from the first storyboard to the final cut.",
      image: CEOImage,
    },
  ],
  /** Disciplines the studio is built from, shown as a scrolling strip. */
  disciplines: [
    "Creative directors",
    "Animators",
    "Illustrators",
    "Designers",
    "VFX artists",
    "Writers",
    "Cinematographers",
    "Sound engineers",
  ],
};
