/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://leleka-backend-1.onrender.com/:path*'
      }
    ]
  }
}

module.exports = nextConfig