import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Replace with your WordPress domain for production
      },
    ],
  },
};

export default nextConfig;
