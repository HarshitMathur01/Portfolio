import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Turbopack expects an absolute path for `root`.
    // Using `process.cwd()` avoids internal warnings/panics in some environments.
    root: process.cwd(),
  },
};

export default nextConfig;
