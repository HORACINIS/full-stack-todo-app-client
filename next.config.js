/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/v1/todos/:path*',
        destination: '/:path*' // for production
        // destination: 'http://localhost:4000/api/v1/todos/:path*' // Proxy to Backend for when in development
      }
    ]
  }
}

module.exports = nextConfig
