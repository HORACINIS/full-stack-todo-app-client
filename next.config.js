/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/v1/todos/:path*',
        destination: 'http://localhost:4000/api/v1/todos/:path*' // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig
