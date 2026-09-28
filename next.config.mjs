import { createMDX } from 'fumadocs-mdx/next';
import { documentationRedirects } from './src/config/redirects/index.mjs';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'standalone',
  async redirects() {
    return documentationRedirects;
  },
};

export default withMDX(config);
