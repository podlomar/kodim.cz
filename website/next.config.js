export default {
  output: 'standalone',
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
};
