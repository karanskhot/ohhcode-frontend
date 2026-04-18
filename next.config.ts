import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '://cloudinary.com',
      },
    ],
  },
  allowedDevOrigins: ['192.168.31.21'],
};

export default nextConfig;
