import { createPageUtilities } from '@knotaru/docs-ui';
import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { publicMarkdown, publicPath, siteConfig } from '@/config/site';

export const source = loader({
  baseUrl: siteConfig.docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

// Curated content uses extensionless file-relative links. Resolve them before Next Link
// applies basePath, so trailing-slash exports do not change their meaning.
const resolveFileHref = source.resolveHref.bind(source);
source.resolveHref = (href, parent) => {
  if (!href.startsWith('./') && !href.startsWith('../')) return href;
  const [, path, suffix] = href.match(/^([^?#]*)(.*)$/)!;
  const stem = path.replace(/\/$/, '');
  for (const candidate of [
    path,
    `${stem}.mdx`,
    `${stem}.md`,
    `${stem}/index.mdx`,
    `${stem}/index.md`,
  ]) {
    const resolved = resolveFileHref(candidate, parent);
    if (resolved !== candidate) return `${resolved}${suffix}`;
  }
  return href;
};

const pageUtilities = createPageUtilities<(typeof source)['$inferPage']>({
  contentBaseUrl: publicPath(siteConfig.docsContentRoute),
  imageBaseUrl: publicPath(siteConfig.docsImageRoute),
});

export const { getPageImage, getPageMarkdownUrl } = pageUtilities;
export async function getLLMText(page: (typeof source)['$inferPage']) {
  return publicMarkdown(await pageUtilities.getLLMText(page));
}
