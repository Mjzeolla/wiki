# Personal Wiki

A content-first personal knowledge base rendered with Fumadocs. The repository separates
durable knowledge, repeatable playbooks, raw notes, and glossary definitions so each idea
has a clear owner and lifecycle.

## Content map

```text
content/docs/
├── knowledge/
│   ├── languages/             language-specific learning such as Go
│   ├── platforms/             application-specific knowledge such as OpenSearch
│   ├── concepts/              ideas that cross technologies
│   └── practices/             durable engineering approaches
├── playbooks/
│   ├── development/           repeatable development procedures
│   │   └── new-mac/           workstation bootstrap and recovery
│   ├── operations/            maintenance, deployment, and recovery
│   └── troubleshooting/       symptom-driven diagnostic procedures
├── notes/
│   ├── inbox/                 fast, unprocessed capture
│   ├── daily/                 chronological learning logs
│   └── evergreen/             durable observations without a narrower owner
└── glossary/
    ├── engineering/
    ├── distributed-systems/
    └── general/
```

Capture unfinished material in `notes/inbox`, preserve chronological context under
`notes/daily`, and promote useful material into Knowledge, Playbooks, or the Glossary.

## Development

Install [Mise](https://mise.jdx.dev/getting-started.html), then run:

```bash
make setup
make run
```

You can also run `mise run dev` directly; `make dev` remains an alias for `make run`.
Stop the development server with Ctrl+C.

Open [http://localhost:3000/docs](http://localhost:3000/docs).

Set `NEXT_PUBLIC_SITE_URL` to the deployed site origin so generated social metadata uses
production URLs. The value defaults to `http://localhost:3000` for local development; see
`.env.example`.

Before finishing a change:

```bash
make validate
```

The complete check runs ESLint, Markdownlint, Prettier, Fumadocs type generation,
TypeScript, local content-link validation, and a production Next.js build.

Link checks are split by purpose:

```bash
make test   # validate documentation routes, anchors, and redirects
make links  # validate local targets and external HTTP(S) URLs
```

Redirects are declared centrally under `src/config/redirects/`. Validation rejects duplicate
sources, redirect chains, live-page shadowing, and destinations that are not generated from an MDX
page. External link validation uses Lychee and runs as a separate CI job because network
availability should not make the formatter, type checker, or production build nondeterministic.

## Git hooks

Husky installs versioned hooks from the package `prepare` lifecycle:

- `pre-commit` applies Prettier formatting, then checks Markdown, lint, and local content links.
- `pre-push` runs the complete deterministic CI suite and production build. External links run in
  hosted CI or explicitly through `make links`.

Run `make hooks` to reinstall hooks without reinstalling dependencies.

## Architecture

The site uses `@knotaru/docs-ui` for shared Fumadocs presentation, search, LLM routes, Open Graph
helpers, and content-link validation. This repository continues to own its content taxonomy, source
configuration, routes, metadata, and deployment.

See [Content model](docs/contributing/content-model.md) and
[Development standards](docs/contributing/development.md) before adding new structure or
tooling.

## GitHub Pages

The CI workflow checks the Node deployment and documentation links. The separate **GitHub Pages**
workflow runs validation and builds the static export. Pull requests validate the export; successful
builds on `main` deploy through the `github-pages` environment.
See [GitHub Pages hosting](docs/operations/github-pages.md) for activation, visibility, preview,
custom domains, and rollback.

```bash
mise exec -- pnpm build:pages
```
