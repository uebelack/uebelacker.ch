const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

const nextConfig = withMDX({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    transpilePackages: ["ui"],
    appDir: true
  },
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
  },
  images: {
    deviceSizes: [480, 768, 976, 1024],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.medium.com',
        port: '',
        pathname: '**/*',
      },
    ],
  },
  pageExtensions: ['tsx', 'mdx', 'ts'],
});

module.exports = nextConfig
