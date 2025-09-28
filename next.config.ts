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

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ftp.goit.study",
        port: "",
        pathname: "/img/lehlehka/**",
      },
    ],
  },
};

export default nextConfig;
