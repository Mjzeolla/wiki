#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const env = {
  ...process.env,
  WIKI_STATIC_EXPORT: 'true',
  NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH ?? '/wiki',
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mjzeolla.github.io',
};
for (const args of [
  ['exec', 'next', 'build'],
  ['exec', 'node', 'scripts/ci/finalize-pages.mjs'],
  ['exec', 'node', 'scripts/ci/check-pages.mjs'],
]) {
  const result = spawnSync('pnpm', args, { env, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
