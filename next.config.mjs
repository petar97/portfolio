/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/portfolio',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
