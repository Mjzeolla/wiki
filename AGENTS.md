# Agent instructions

These instructions apply to the entire repository.

## Purpose

Maintain a content-first personal wiki. Optimize for durable ownership, discovery, and
future revision rather than capturing every thought directly into permanent structure.

## Content ownership

- Put technology-specific knowledge under its language or platform owner.
- Put repeatable procedures under `playbooks/`, not beside explanatory knowledge.
- Use `notes/inbox/` for unfinished capture and promote mature material regularly.
- Keep glossary entries concise and link to deeper knowledge pages.
- Prefer focused concern directories over flat collections of unrelated pages.
- Omit empty placeholder directories; create a concern when its first real page exists.

## Application structure

- Keep site configuration under `src/config/<concern>/`.
- Keep reusable application behavior under `src/lib/<concern>/`.
- Keep route-specific code under `src/app/`.
- Keep shared Fumadocs presentation in `@knotaru/docs-ui`; do not copy its implementation.
- Preserve the content/application boundary: content must remain ordinary Markdown or MDX.

## Quality

- Use kebab-case paths and descriptive leaf names.
- Add `meta.json` when navigation order or display naming matters.
- Include title, description, tags, and maturity status in curated pages.
- Cite primary sources for non-obvious or version-sensitive claims.
- Keep examples free of credentials, private data, and environment-specific secrets.
- Update local links when moving content.

## Validation

Run `make check` while editing and `make ci` before completion. Do not weaken content,
formatting, lint, type, link, or build checks merely to accept a new page.

## Git

Preserve unrelated changes. Do not stage, commit, push, publish, deploy, or mutate external
systems unless the user explicitly requests it.
