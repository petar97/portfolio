/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/portfolio',
  assetPrefix: '/portfolio/',

  images: {
    unoptimized: true,
  },

  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
