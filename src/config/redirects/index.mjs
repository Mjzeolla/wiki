const permanentRedirect = (source, destination) => ({
  source,
  destination,
  permanent: true,
});

const toolingRedirect = (page, section) =>
  permanentRedirect(
    `/docs/knowledge/tooling/${page}`,
    `/docs/knowledge/tooling/${section}/${page}`,
  );

const repositoryToolRedirect = (page, domain) =>
  permanentRedirect(
    `/docs/knowledge/tooling/repository/${page}`,
    `/docs/knowledge/tooling/repository/${domain}/${page}`,
  );

const repositoryToolDomains = {
  'additional-quality': 'linting',
  'ci-cd': 'automation',
  eslint: 'linting',
  husky: 'hooks',
  markdownlint: 'linting',
  mise: 'toolchains',
  npm: 'toolchains/javascript',
  pnpm: 'toolchains/javascript',
  pip: 'toolchains/python',
  poetry: 'toolchains/python',
  'pre-commit': 'hooks',
  prettier: 'formatting',
  'scripting-layer': 'automation',
  uv: 'toolchains/python',
};

export const documentationRedirects = [
  permanentRedirect(
    '/docs/knowledge/tooling/frontend/frameworks/vite',
    '/docs/knowledge/tooling/frontend/build-tools/vite',
  ),
  permanentRedirect(
    '/docs/knowledge/tooling/frontend/nextjs',
    '/docs/knowledge/tooling/frontend/frameworks/nextjs',
  ),
  permanentRedirect('/docs/playbooks/new-mac', '/docs/playbooks/development/new-mac'),
  ...[
    'developer-toolchain',
    'dotfiles-and-automation',
    'first-hour',
    'packages-and-apps',
    'security-and-backups',
    'terminal-and-shell',
  ].map((page) =>
    permanentRedirect(
      `/docs/playbooks/new-mac/${page}`,
      `/docs/playbooks/development/new-mac/${page}`,
    ),
  ),
  ...Object.entries(repositoryToolDomains).flatMap(([page, domain]) => [
    toolingRedirect(page, `repository/${domain}`),
    repositoryToolRedirect(page, domain),
  ]),
  permanentRedirect(
    '/docs/knowledge/tooling/repository/package-management',
    '/docs/knowledge/tooling/repository/toolchains/javascript',
  ),
  permanentRedirect(
    '/docs/knowledge/tooling/repository/package-management/pnpm',
    '/docs/knowledge/tooling/repository/toolchains/javascript/pnpm',
  ),
  toolingRedirect('application-stack', 'frontend'),
  toolingRedirect('classnames', 'frontend/styling/class-composition'),
  toolingRedirect('clsx', 'frontend/styling/class-composition'),
  toolingRedirect('cva', 'frontend/styling/class-composition'),
  toolingRedirect('helpers', 'ai-development'),
  toolingRedirect('monorepos', 'services'),
  toolingRedirect('node', 'services'),
  toolingRedirect('playwright', 'testing'),
  toolingRedirect('redux-toolkit', 'frontend/state-and-data'),
  toolingRedirect('rtk', 'ai-development'),
  toolingRedirect('rtk-query', 'frontend/state-and-data'),
  toolingRedirect('shadcn-ui', 'frontend/ui-libraries'),
  toolingRedirect('radix-ui', 'frontend/ui-libraries'),
  toolingRedirect('headless-ui', 'frontend/ui-libraries'),
  toolingRedirect('react-aria', 'frontend/ui-libraries'),
  toolingRedirect('strategy', 'testing'),
  toolingRedirect('structure', 'testing'),
  toolingRedirect('tailwind-css', 'frontend/styling'),
  toolingRedirect('tailwind-merge', 'frontend/styling/class-composition'),
  toolingRedirect('tanstack-query', 'frontend/state-and-data'),
  toolingRedirect('testing-library', 'testing'),
  toolingRedirect('typescript', 'frontend/types-and-validation'),
  toolingRedirect('vitest', 'testing'),
  toolingRedirect('zod', 'frontend/types-and-validation'),
  ...[
    ['typescript', 'types-and-validation'],
    ['zod', 'types-and-validation'],
    ['tailwind-css', 'styling'],
    ['clsx', 'styling/class-composition'],
    ['classnames', 'styling/class-composition'],
    ['tailwind-merge', 'styling/class-composition'],
    ['cva', 'styling/class-composition'],
  ].map(([page, section]) =>
    permanentRedirect(
      `/docs/knowledge/tooling/frontend/${page}`,
      `/docs/knowledge/tooling/frontend/${section}/${page}`,
    ),
  ),
  permanentRedirect(
    '/docs/knowledge/tooling/react-query',
    '/docs/knowledge/tooling/frontend/state-and-data/tanstack-query',
  ),
];
