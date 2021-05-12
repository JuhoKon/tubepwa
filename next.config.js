/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
  },
  /*   future: {
    webpack5: true,
  }, */
  images: {
    domains: ["img.youtube.com", "lh3.googleusercontent.com"],
  },
});
