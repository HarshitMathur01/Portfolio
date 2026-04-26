import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: '.', // Silence the "multiple lockfiles" warning from Turbopack
  },
};

export default nextConfig;
