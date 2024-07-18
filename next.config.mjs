/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
    images: {
        domains: ['avatars.githubusercontent.com'],
      },
};

export default nextConfig;
