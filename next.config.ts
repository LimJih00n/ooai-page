import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/ocean5i/index_v2.html",
      },
      {
        source: "/services",
        destination: "/ocean5i/services_v2.html",
      },
      {
        source: "/about",
        destination: "/ocean5i/about_v2.html",
      },
    ];
  },
};

export default nextConfig;
