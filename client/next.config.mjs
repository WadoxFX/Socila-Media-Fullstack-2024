/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    clientUrl: 'http://localhost:3000',
    serverUrl: 'https://social-media-server-ashy.vercel.app/',
  },
  images: {
    remotePatterns: [{ hostname: 'localhost' }],
  },
  reactStrictMode: false
}

export default nextConfig
