import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  
  async headers() {
    return [
      {
        // Empêcher l'indexation des images décoratives
        source: '/images/header/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
          {
            key: 'X-Robots-Tag',
            value: 'googlebot-image: noindex',
          },
        ],
      },
      {
        // Cache optimal pour toutes les images
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
