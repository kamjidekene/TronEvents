/**
 * Next Config
 * @type {import('next').NextConfig}
 */

// const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  images: {
    loader: "akamai",
    path: "",
  },
  trailingSlash: true,
  // assetPrefix: isProd ? "https://blocevent-r5euy.spheron.app/" : "",
};

module.exports = nextConfig;
