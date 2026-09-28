import { createPageUtilities } from '@knotaru/docs-ui';
import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { siteConfig } from '@/config/site';

export const source = loader({
  baseUrl: siteConfig.docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export const { getLLMText, getPageImage, getPageMarkdownUrl } = createPageUtilities<
  (typeof source)['$inferPage']
>({
  contentBaseUrl: siteConfig.docsContentRoute,
  imageBaseUrl: siteConfig.docsImageRoute,
});
