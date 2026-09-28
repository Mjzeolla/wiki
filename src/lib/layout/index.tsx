import { createBaseOptions } from '@knotaru/docs-ui';
import { siteConfig } from '@/config/site';

export function baseOptions() {
  return createBaseOptions({
    title: siteConfig.name,
    githubUrl: siteConfig.repository,
    iconSrc: '/icon.svg',
    links: [
      { text: 'Knowledge', url: '/docs/knowledge', on: 'nav' },
      { text: 'Notes', url: '/docs/notes', on: 'nav' },
      { text: 'Glossary', url: '/docs/glossary', on: 'nav' },
      { text: 'Playbooks', url: '/docs/playbooks', on: 'nav' },
    ],
  });
}
