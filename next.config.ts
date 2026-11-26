import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Let phones on the same Wi-Fi (e.g. http://192.168.29.203:3000) load the dev build.
  // Without this, dev mode blocks the JS for non-localhost origins and nothing is tappable.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  cacheComponents: true,
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
