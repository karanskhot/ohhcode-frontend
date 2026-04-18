import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: false,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '://cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: ['192.168.31.21'],
};

export default nextConfig;
