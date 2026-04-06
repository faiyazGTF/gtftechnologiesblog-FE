/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ['api-blog.gtftechnologies.com', 'localhost'],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
