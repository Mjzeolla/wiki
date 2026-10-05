export const staticExport = process.env.WIKI_STATIC_EXPORT === 'true';
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

if (basePath && !/^\/[A-Za-z0-9_-]+(?:\/[A-Za-z0-9_-]+)*$/.test(basePath)) {
  throw new Error(
    'NEXT_PUBLIC_BASE_PATH must be empty or a path such as /wiki (no trailing slash).',
  );
}
