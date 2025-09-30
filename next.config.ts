import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ftp.goit.study",
        port: "",
        pathname: "/img/lehlehka/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // ✅ добавляем Cloudinary
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://leleka-backend-1.onrender.com/api/:path*",
        //  destination: "https://leleka-backendmy.onrender.com/api/:path*",
        // destination: "http://localhost:3000/api/:path*",
      },
    ];
  }
};

export default nextConfig;
