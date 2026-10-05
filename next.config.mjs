import { createMDX } from 'fumadocs-mdx/next';
import { documentationRedirects } from './src/config/redirects/index.mjs';
import { basePath, staticExport } from './src/config/hosting/index.mjs';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: staticExport ? 'export' : 'standalone',
  basePath,
  trailingSlash: staticExport,
  images: { unoptimized: staticExport },
  ...(staticExport
    ? {}
    : {
        async redirects() {
          return documentationRedirects;
        },
      }),
};

export default withMDX(config);
