/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.ctfassets.net', 'downloads.ctfassets.net'],
  },
};

module.exports = nextConfig;
