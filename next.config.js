/** @type {import('next').NextConfig} */
const nextConfig = {
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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.medium.com',
        port: '',
        pathname: '**/*',
      },
    ],
  },
}

module.exports = nextConfig
