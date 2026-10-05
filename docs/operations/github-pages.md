# GitHub Pages hosting

The wiki supports a Next.js static export for GitHub Pages alongside its normal Node server build.
The default project address is `https://mjzeolla.github.io/wiki/`. It becomes available only after
Pages is enabled and a deployment succeeds.

## Activate deployment

1. Confirm the content is intended for the site's audience. The source repository is private;
   that alone does not make the Pages site private. Private-repository Pages hosting also depends
   on the GitHub plan. See [Pages availability](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
   and [site visibility](https://docs.github.com/en/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site).
2. In repository **Settings → Pages → Build and deployment**, choose **GitHub Actions** as source.
3. Configure the `github-pages` environment to allow deployments from `main`. Add reviewers if
   the publishing workflow requires human review.
4. Commit and merge the reviewed changes. A push to `main` runs CI and the separate **GitHub Pages**
   workflow, which deploys its validated artifact. Alternatively, run **GitHub Pages** manually
   on `main` using the Actions tab.
5. Open the deployment URL reported by the job. Verify search, a direct nested page load,
   Markdown copy, and an old redirected URL.

The workflow never changes repository visibility or automatically enables Pages. No personal
access token is needed: only the deployment job receives `pages: write` and `id-token: write`.
Pull requests build and validate without publishing or querying the Pages configuration.

## What the workflow checks

The **CI** workflow (`.github/workflows/ci.yml`) runs the normal validation/build and external-link
checks. The **GitHub Pages** workflow (`.github/workflows/pages.yml`) owns `pages-build` and
`deploy-pages`. It uses the same push, pull-request, and manual triggers.

Before exporting, `pages-build` independently runs `pnpm run ci`: lint, Markdown checks, formatting,
type checks, routes, and the normal production build. It then exports the static site and validates
HTML assets/navigation, search JSON, Markdown indexes, and legacy redirect pages. This repeats the
validation gate so a manual Pages run cannot bypass it or depend on a CI run for a different commit.
External-link checks remain a separate CI signal because network availability is not deterministic.

`deploy-pages` only runs on `main`, after a successful Pages build. Deployment concurrency prevents
overlapping publication. Failed builds do not replace the deployed artifact.

## Local preview

```bash
mise exec -- pnpm build:pages
```

This generates `out/` with a `/wiki` base path. Serve it beneath that prefix, not at a server root.
For example, from the repository root:

```bash
mkdir -p /tmp/wiki-pages-preview
ln -s "$PWD/out" /tmp/wiki-pages-preview/wiki
python3 -m http.server 8080 --bind 127.0.0.1 --directory /tmp/wiki-pages-preview
```

Use a fresh preview directory if the symlink already exists. Open
[the preview](http://localhost:8080/wiki/docs/). Stop the server with Ctrl+C when finished.
The export contains all curated content, notes, static search data, and LLM text endpoints.

To test root hosting instead:

```bash
NEXT_PUBLIC_BASE_PATH='' NEXT_PUBLIC_SITE_URL=https://wiki.example.com mise exec -- pnpm build:pages
```

`NEXT_PUBLIC_BASE_PATH` must be empty or start with `/` without a trailing slash. `NEXT_PUBLIC_SITE_URL`
sets the metadata base. CI derives the published URL and prefix from `configure-pages`, so a
custom domain configured in Pages is reflected in the next build. Rebuild after changing either.

## Static behavior

- Search downloads a generated index and searches in the browser; no live search server is needed.
- Documentation, Open Graph images, and LLM/Markdown responses are generated during the build.
- Next.js redirects become small HTML fallback pages with a link, meta refresh, and JavaScript
  that preserves query parameters and fragments. These are not HTTP 301/308 responses.
- GitHub Pages serves `404.html` for unknown paths; there is no catch-all SPA rewrite.
- The normal `pnpm build` still creates standalone server output. Use `pnpm start` only for that
  output, not for `out/`.

## Troubleshooting and rollback

| Symptom                         | Check                                                                                         |
| ------------------------------- | --------------------------------------------------------------------------------------------- |
| Configure Pages returns 404     | Pages is enabled with Actions as source and the account plan supports this repository         |
| Assets or navigation return 404 | Build-time base path matches the deployed domain/path; rebuild after a domain change          |
| Search returns HTML             | `/api/search` must be the exported JSON file, without an added trailing slash                 |
| Deploy waits or is rejected     | `github-pages` environment rules permit the selected branch and required reviews are complete |
| Old URL does not move           | Its source/destination is in `src/config/redirects/index.mjs` and export validation passes    |

To roll back content or application behavior, revert the relevant commit through the normal review
process and deploy the new `main` build. For an urgent removal, use Pages settings to unpublish the
site, then fix the issue before enabling it again. Unpublishing cannot retract copies visitors
already downloaded.

Sources: [GitHub custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages),
[Next.js static exports](https://nextjs.org/docs/app/guides/static-exports), and
[Fumadocs static search](https://www.fumadocs.dev/docs/headless/search/orama#static-mode).
