import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    // As imagens em public/images/opt já estão em WebP no tamanho de uso.
    unoptimized: true,
  },
};

export default nextConfig;
