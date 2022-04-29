/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
   reactStrictMode: false,
   trailingSlash: true,
   webpackDevMiddleware: (config) => {
      config.watchOptions = {
         poll: 1000,
         aggregateTimeout: 300,
      };
      return config;
   },
   sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
   },
   webpack(config) {
      config.module.rules.push({
         test: /\.svg$/i,
         issuer: /\.[jt]sx?$/,
         use: ['@svgr/webpack'],
      });

      return config;
   },
};

module.exports = nextConfig;
