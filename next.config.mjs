/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  basePath: "/portfolio",
  assetPrefix: '/portfolio/',
  output: "export",
  reactStrictMode: true,
};

module.exports = nextConfig;
