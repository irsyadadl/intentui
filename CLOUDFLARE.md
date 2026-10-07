# Deploy Intent UI 2.x to Cloudflare Workers

This branch deploys as the `intentui-2x` Worker at `https://2x.intentui.com`.
Use Node.js 22 and Bun 1.3.14. Commit `bun.lock` with the configuration changes.
The OpenNext adapter and Wrangler versions are pinned for this branch's Next.js 15.3.4.

## Deploy from your computer

Stop the local Next.js dev server before building in the same checkout, since both
commands use `.next`.

```sh
bun install --frozen-lockfile
bunx wrangler login
bun run deploy:cloudflare
```

The Cloudflare account must contain the `intentui.com` zone. The custom domain in
`wrangler.jsonc` connects `2x.intentui.com` to the Worker during deployment.
Resolve any existing DNS record for this hostname if Cloudflare reports a conflict.

To build without deploying:

```sh
bun run build:cloudflare
```

To validate the generated Worker without publishing:

```sh
bunx opennextjs-cloudflare deploy -- --dry-run
```

## Deploy from Cloudflare Workers Builds

Connect this repository to a Worker named `intentui-2x`, with these build settings:

| Setting | Value |
| --- | --- |
| Production branch | `2.x` |
| Root directory | `/` |
| Build command | `bun install --frozen-lockfile && bun run build:cloudflare` |
| Deploy command | `bunx opennextjs-cloudflare deploy` |

Set these **build variables**:

| Variable | Value |
| --- | --- |
| `SKIP_DEPENDENCY_INSTALL` | `true` |
| `BUN_VERSION` | `1.3.14` |
| `NODE_VERSION` | `22.23.2` |
| `NEXT_PUBLIC_SITE_URL` | `https://2x.intentui.com` |

The explicit install command uses `bun.lock` even if another package manager's
lockfile is present. The build generates the registry, search index, and stubs
before creating `.open-next/worker.js` and `.open-next/assets`.

## Runtime behavior

The root URL redirects permanently to `/docs/getting-started/introduction`.

Prerendered pages use the static assets cache. This archive needs no R2 bucket,
database, or cache queue. Showcase, icons, and colors links go to the corresponding
pages on `https://intentui.com`.
Images are served directly without requiring a Cloudflare Images binding.
Registry aliases such as `/r/ui/card` redirect to `/r/ui-card.json`.

Wrangler minifies the Worker for the Free plan. The verified dry-run size is
2726.77 KiB compressed (about 2.66 MiB), below the 3 MiB Free plan limit.
Social preview images live in `public/` so their binary contents are static assets.
The runtime syntax highlighter includes only languages used by the docs and demos.

Metadata, sitemap, and registry dependency URLs use `NEXT_PUBLIC_SITE_URL`, defaulting
to `https://2x.intentui.com`. Set this variable before building if the domain changes.

References: [OpenNext setup](https://opennext.js.org/cloudflare/get-started),
[Worker size limits](https://opennext.js.org/cloudflare#note-on-worker-size-limits),
[Cloudflare build image settings](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/).
