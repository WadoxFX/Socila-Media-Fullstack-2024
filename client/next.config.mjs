/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    clientUrl: 'http://localhost:3000',
    serverUrl: 'http://localhost:8080/',
  },
  images: {
    remotePatterns: [{ hostname: 'localhost' }],
  },
  reactStrictMode: false
}

export default nextConfig
