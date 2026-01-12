/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  reactStrictMode: false,

  images: {
    remotePatterns: [
      //Development Config
      // {
      //   protocol: 'http',
      //   hostname: 'localhost',
      //   port:'7000',
      //   pathname: '/uploads/**',
      // },
      //Production Config

      {
        protocol: 'https',
        hostname: 'blogapp-backend-q7hl.onrender.com',
        pathname: '/uploads/**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
