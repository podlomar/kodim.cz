// import { config } from 'dotenv';
import type { NextConfig } from 'next'

// console.log('NODE ENV', process.env.NODE_ENV);

// config({ path: `../.env.${process.env.NODE_ENV}` });

const nextConfig: NextConfig = {
  output: 'standalone',
  // images: {
  //   disableStaticImages: true,
  // },
  async redirects() {
    return [
      {
        source: '/analyza-dat/:path*',
        destination: '/czechitas/:path*',
        permanent: true,
      },
      {
        source: '/programovani/:path*',
        destination: '/czechitas/:path*',
        permanent: true,
      },
      {
        source: '/vyvoj-webu/:path*',
        destination: '/czechitas/:path*',
        permanent: true,
      },
    ];
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config;
  },
  experimental: {
    turbo: {
      rules: {
        '*.icon.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

export default nextConfig;