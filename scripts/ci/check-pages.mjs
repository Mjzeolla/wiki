#!/usr/bin/env node
import assert from 'node:assert/strict';
import { access, readFile, readdir, stat } from 'node:fs/promises';
import { join, extname, relative, sep } from 'node:path';
import { basePath } from '../../src/config/hosting/index.mjs';
import { documentationRedirects } from '../../src/config/redirects/index.mjs';

async function files(dir) {
  return (
    await Promise.all(
      (await readdir(dir, { withFileTypes: true })).map((entry) =>
        entry.isDirectory() ? files(join(dir, entry.name)) : join(dir, entry.name),
      ),
    )
  ).flat();
}
async function exists(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}
await access('out/.nojekyll');
await access('out/404.html');
const htmlFiles = (await files('out')).filter((file) => extname(file) === '.html');
let checked = 0;
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const exportedPath = relative('out', file)
    .split(sep)
    .join('/')
    .replace(/index\.html$/, '');
  const documentUrl = new URL(`${basePath}/${exportedPath}`, 'https://export.invalid');
  for (const match of html.matchAll(/(?:href|src)="([^"]*)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (!href || href.startsWith('#') || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) continue;
    const url = new URL(href, documentUrl).pathname;
    assert(
      !basePath || url === basePath || url.startsWith(`${basePath}/`),
      `${file}: URL escapes base path: ${url}`,
    );
    const path = decodeURIComponent(url.slice(basePath.length));
    const target = join('out', path);
    assert(
      (await exists(target)) || (await exists(join(target, 'index.html'))),
      `${file}: missing export target ${url}`,
    );
    checked++;
  }
}
const search = JSON.parse(await readFile('out/api/search', 'utf8'));
assert(search && typeof search === 'object', 'Missing static search data');
for (const { source, destination } of documentationRedirects) {
  const html = await readFile(join('out', source, 'index.html'), 'utf8');
  assert(html.includes(`${basePath}${destination}/`), `Incorrect redirect: ${source}`);
}
assert((await readFile('out/llms.txt', 'utf8')).includes('Knowledge'));
console.log(
  `Validated ${htmlFiles.length} exported HTML files, ${checked} asset/navigation URLs, static search, LLM index, and redirects.`,
);
