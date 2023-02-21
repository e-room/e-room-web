const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const config = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/apis/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_HOST}/:path*`,
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  env: {
    NEXT_PUBLIC_KAKAO_APP_KEY: process.env.NEXT_PUBLIC_KAKAO_APP_KEY,
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN],
  },
};
module.exports = process.env.NODE_ENV === "production" ? withPWA(config) : config;
