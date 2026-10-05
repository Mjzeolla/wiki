export const siteConfig = {
  name: 'Wiki',
  description: 'A personal knowledge base for technical learning, durable notes, and playbooks.',
  repository: 'https://github.com/Mjzeolla/wiki',
  docsRoute: '/docs',
  docsContentRoute: '/llms.mdx/docs',
  docsImageRoute: '/og/docs',
} as const;

// Next Link applies basePath itself; use this helper for raw assets and fetch URLs only.
export function publicPath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;
}

export function publicMarkdown(text: string) {
  return text.replace(/\((\/docs)(?=[/)#])/g, `(${publicPath('/docs')}`);
}
