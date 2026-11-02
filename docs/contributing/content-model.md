# Content model

## Choose an owner

Use this decision order:

1. Is it a repeatable procedure? Put it under `playbooks/`.
2. Is it a concise definition? Put it in its subject's glossary.
3. Is it technology-specific? Put it under infrastructure, languages, development,
   data, networking, security, or observability and then its technology owner.
4. Is it genuinely cross-technology? Put it under `architecture/`.
5. Is it unverified capture? Refine it before adding it to published documentation.

There is no `knowledge/`, central `glossary/`, or `notes/` content section.
The homepage links directly to subjects. Create a subsection only with useful content.

Reuse does not erase ownership. A Go concept referenced by an OpenSearch note still belongs
under Go if Go owns the behavior.

## Page maturity

Every page has one maturity status:

- `seedling`: initial capture that may be incomplete;
- `growing`: useful content that still needs refinement or evidence; or
- `evergreen`: durable material reviewed for accuracy and navigation.

Status describes confidence and maturity, not importance.

## Frontmatter

```yaml
---
title: Channel Ownership
description: Rules for safely creating, closing, and consuming Go channels.
tags:
  - go
  - concurrency
status: growing
aliases:
  - channel lifecycle
sources:
  - https://go.dev/ref/spec
---
```

`title`, `description`, `tags`, `status`, `aliases`, and `sources` are validated by the
Fumadocs collection schema. Keep tags lowercase and reuse an existing term when it has the
same meaning.

## Folder conventions

Use folders to express a real subject boundary and descriptive files as leaves. A subject
folder owns an `index.mdx`; add deeper concern folders only when their first real page is
created. Avoid empty taxonomy scaffolding and large domain roots containing unrelated page
files.

Use `meta.json` to define display names and ordering. Fumadocs omits unlisted pages whenever
a `pages` array is present, so update it with every new visible child.
