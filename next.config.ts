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
  // ✅ Add this to suppress the cross-origin warning
  allowedDevOrigins: ["*"],
};

export default nextConfig;