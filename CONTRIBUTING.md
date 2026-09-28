# Contributing

## Add content

1. Choose the narrowest durable owner using the
   [content model](docs/contributing/content-model.md).
2. Create a focused folder when the subject needs multiple pages; avoid adding broad page
   dumps at a domain root.
3. Add or update `meta.json` when navigation ordering changes.
4. Link related knowledge, playbooks, notes, and glossary terms instead of duplicating them.
5. Run `make check` and preview the affected pages.

## Change the application

Read [Development standards](docs/contributing/development.md). Reuse
`@knotaru/docs-ui` before adding presentation or content-processing code locally. Keep
configuration, library concerns, and routes in their owning directories.

## Validate

```bash
make check
make ci
```

The production build is required before handing off changes that affect routing, source
configuration, dependencies, or shared UI behavior.
