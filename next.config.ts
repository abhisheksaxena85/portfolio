import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Allow opening the dev server from other devices on the local network
  // (e.g. http://192.168.x.x:3000 on a phone). Without this, Next blocks dev
  // assets cross-origin, the page never hydrates and buttons don't respond.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  partialPrefetching: true,
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
