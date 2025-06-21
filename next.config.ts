

/* import type { NextConfig } from "next";

const nextConfig: NextConfig = {
};



export default nextConfig; */

// next.config.js or next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
    ],
  },
  allowedDevOrigins: ["192.168.1.7"], 
};

export default nextConfig;

