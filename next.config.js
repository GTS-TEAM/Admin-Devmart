/** @type {import('next').NextConfig} */

// const withLess = require('@zeit/next-less');
// const withSass = require('@zeit/next-sass');
// const lessToJS = require('less-vars-to-js');
// const fs = require('fs');
const path = require('path');

// const themeVariables = lessToJS(
//    fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
// );

const nextConfig = {
   reactStrictMode: false,
   trailingSlash: false,
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
   images: {
      domains: [
         'res.cloudinary.com',
         'cf.shopee.vn',
         'loremflickr.com',
         'i.pinimg.com',
      ],
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
