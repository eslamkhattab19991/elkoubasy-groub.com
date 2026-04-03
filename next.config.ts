import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/elkoubasy-groub.com',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
