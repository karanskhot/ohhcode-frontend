import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: false,
  async rewrites() {
    return [
      {
        // Jab bhi frontend /api/v1/... call karega
        source: '/api/v1/:path*',
        // Toh Vercel usey chupke se Railway pe bhej dega
        destination: 'https://ohhcode.up.railway.app*',
      },
    ];
  },
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
