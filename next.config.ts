import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Portfolio thumbnails are bundled locally (see Experience.tsx). The only
    // remote image left is the showreel poster, served by YouTube.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
