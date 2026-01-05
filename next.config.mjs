/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  reactStrictMode: false,

  images: {
    remotePatterns: [
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
