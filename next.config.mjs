/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/portfolio' : '';

// Fail the build rather than ship a contact form that can't send
if (isProd && !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
  throw new Error('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY is not set. Add it to .env.local, or as a GitHub Actions variable for deploys (see README).');
}
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd ? '/portfolio/' : '',
  basePath,
  // Export pages as dir/index.html so GitHub Pages serves the RSC payloads the router fetches
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  output: 'export'
};

export default nextConfig;
