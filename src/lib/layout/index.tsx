import { createBaseOptions } from '@knotaru/docs-ui';
import { publicPath, siteConfig } from '@/config/site';

export function baseOptions() {
  return createBaseOptions({
    title: siteConfig.name,
    githubUrl: siteConfig.repository,
    iconSrc: publicPath('/icon.svg'),
    links: [
      { text: 'Subjects', url: '/docs', on: 'nav' },
      { text: 'Infrastructure', url: '/docs/infrastructure', on: 'nav' },
      { text: 'Development', url: '/docs/development', on: 'nav' },
      { text: 'Playbooks', url: '/docs/playbooks', on: 'nav' },
    ],
  });
}
