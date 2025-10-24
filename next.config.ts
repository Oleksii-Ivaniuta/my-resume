import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'my-resume-backend-1.onrender.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
