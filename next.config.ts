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
};

export default nextConfig;
