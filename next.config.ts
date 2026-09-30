import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    /** Cloudflare Pages static hosting does not support Next.js Image Optimization API */
    unoptimized: true,
  },
};

export default nextConfig;
