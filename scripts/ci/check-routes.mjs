#!/usr/bin/env node

import { readdir } from 'node:fs/promises';
import { dirname, extname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { documentationRedirects } from '../../src/config/redirects/index.mjs';

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), '../..');
const contentRoot = join(repositoryRoot, 'content/docs');

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? listFiles(path) : [path];
    }),
  );

  return files.flat();
}

function documentationRoute(file) {
  const path = relative(contentRoot, file).split(sep).join('/');
  const withoutExtension = path.slice(0, -extname(path).length);
  const slug = withoutExtension === 'index' ? '' : withoutExtension.replace(/\/index$/, '');
  return slug ? `/docs/${slug}` : '/docs';
}

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exitCode = 1;
}

const files = await listFiles(contentRoot);
const routes = new Set(files.filter((file) => extname(file) === '.mdx').map(documentationRoute));
const sources = new Set();

for (const redirect of documentationRedirects) {
  if (!redirect.source?.startsWith('/docs') || !redirect.destination?.startsWith('/docs')) {
    fail(`redirects must use absolute documentation paths: ${JSON.stringify(redirect)}`);
    continue;
  }

  if (sources.has(redirect.source)) {
    fail(`duplicate redirect source: ${redirect.source}`);
  }
  sources.add(redirect.source);

  if (redirect.source === redirect.destination) {
    fail(`redirect cannot point to itself: ${redirect.source}`);
  }

  if (routes.has(redirect.source)) {
    fail(`redirect source shadows a live documentation page: ${redirect.source}`);
  }

  if (!routes.has(redirect.destination)) {
    fail(`redirect destination does not exist: ${redirect.source} -> ${redirect.destination}`);
  }

  if (documentationRedirects.some(({ source }) => source === redirect.destination)) {
    fail(`redirect chains are not allowed: ${redirect.source} -> ${redirect.destination}`);
  }
}

if (!process.exitCode) {
  console.log(
    `Validated ${routes.size} documentation routes and ${documentationRedirects.length} redirects.`,
  );
}
