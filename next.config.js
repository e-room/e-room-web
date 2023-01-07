module.exports = {
  reactStrictMode: false,
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "https://dev.e-room.app/:path*",
  //     },
  //   ];
  // },
  staticPageGenerationTimeout: 100,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  env: {
    NEXT_PUBLIC_KAKAO_APP_KEY: "7825714128d19a402fd2f559cd77866c",
  },
};
