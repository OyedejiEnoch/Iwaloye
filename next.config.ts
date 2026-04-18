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
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/api/:path*`,
      },
      {
        source: "/storage/:path*",
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/storage/:path*`,
      },
    ];
  },
};

export default nextConfig;
