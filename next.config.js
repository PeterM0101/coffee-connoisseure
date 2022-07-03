/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["images.unsplash.com", "fastly.4sqi.net"],
  },
  target: "serverless",
};

module.exports = nextConfig;
