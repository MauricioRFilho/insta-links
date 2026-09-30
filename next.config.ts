import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /** Cloudflare Pages does not support Next.js Image Optimization API */
    unoptimized: true,
  },
};

export default nextConfig;
