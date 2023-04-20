/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.ctfassets.net"],
  },
  staticPageGenerationTimeout: 1000,
}

module.exports = nextConfig // eslint-disable-line
