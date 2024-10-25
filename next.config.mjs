/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd ? '/portfolio/' : '',
  basePath: isProd ? '/portfolio' : '',
  output: 'export'
};

export default nextConfig;
