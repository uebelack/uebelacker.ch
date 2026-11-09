// GFM is on because the legal pages are ordinary markdown documents and want
// ordinary markdown tables; MDX ships without it.
//
// The plugin is named as a string rather than required: Turbopack serializes the
// loader's options and refuses a function value, so `[remarkGfm]` fails the build
// with "does not have serializable options".
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [['remark-gfm', {}]],
  },
});

const nextConfig = withMDX({
  reactStrictMode: true,
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
      {
        protocol: 'https',
        hostname: 'nag.ch',
        port: '',
        pathname: '**/*',
      },
    ],
  },
  pageExtensions: ['js', 'mdx'],
});

module.exports = nextConfig;
