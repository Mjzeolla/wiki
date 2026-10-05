#!/usr/bin/env node
import { mkdir, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { basePath } from '../../src/config/hosting/index.mjs';
import { documentationRedirects } from '../../src/config/redirects/index.mjs';

const escape = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const redirects = [{ source: '/', destination: '/docs' }, ...documentationRedirects];
for (const { source, destination } of redirects) {
  await access(join('out', destination, 'index.html'));

  const target = `${basePath}${destination}/`;
  const directory = join('out', source);
  await mkdir(directory, { recursive: true });
  await writeFile(
    join(directory, 'index.html'),
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Page moved</title><meta http-equiv="refresh" content="0;url=${escape(target)}"><link rel="canonical" href="${escape(target)}"></head><body><a href="${escape(target)}">Continue to this page</a><script>location.replace(${JSON.stringify(target)}+location.search+location.hash)</script></body></html>`,
  );
}
await writeFile('out/.nojekyll', '');
console.log(`Generated ${redirects.length} static redirect pages.`);
