/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/v1/todos/:path*',
        destination: '/:path*'
      }
    ]
  }
}

module.exports = nextConfig
