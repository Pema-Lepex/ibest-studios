import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site — `npm run build` emits plain HTML/CSS/JS into `out/`.
  output: "export",
  trailingSlash: true,
  // let phones and other devices on the local network open the dev server (e.g. http://10.x.x.x:3000)
  allowedDevOrigins: ["10.*.*.*", "192.168.*.*", "172.*.*.*", "*.local"],
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
