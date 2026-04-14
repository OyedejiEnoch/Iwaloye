import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vickey-noncultivatable-breana.ngrok-free.dev',
        port: '',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: 'election.test',
        port: '',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'iwaloye.up.railway.app',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
