/* import type { NextConfig } from "next";

const nextConfig: NextConfig = {
};



export default nextConfig; */

// next.config.js or next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['flagcdn.com'],
  },
  // Add other config options here as needed
};

export default nextConfig;
