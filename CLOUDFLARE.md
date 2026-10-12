# Deploy branch 3.x to Cloudflare Pages Free

Use **Cloudflare Pages**, with the static Next.js export. The full OpenNext
Worker measured 11.34 MiB compressed, above the Workers Free 3 MiB limit.

## Git integration

1. Push these changes to branch `3.x`.
2. In Cloudflare, open **Workers & Pages → Create application → Pages → Connect to Git**.
3. Select this repository and set the production branch to `3.x`.
4. Set the framework preset to **None**, build command to `npm run build:cloudflare`,
   and output directory to `out`. Leave the root directory at the repository root.
5. Add build environment variables:
   - `NODE_VERSION`: `22.23.2`
   - `NEXT_PUBLIC_APP_URL`: the final public URL (for example `https://3x.intentui.com`)
6. Deploy. Connect the custom domain in the Pages project's **Custom domains** tab.

Use the same build variables for preview deployments, with their intended public URL.
Secrets belong in the Cloudflare dashboard, never in Git.

## Terminal deployment

```sh
npm ci
npx wrangler login
npx wrangler pages project create intentui-3x --production-branch=3.x
NEXT_PUBLIC_APP_URL=https://3x.intentui.com npm run deploy:cloudflare
```

If the Pages project already exists, skip creation and set `name` in
`wrangler.jsonc` to its actual project name. Build variables can also be set in
the ignored local `.env` file.

## What the static build does

- Exports HTML and client JavaScript; interactive components still run in the browser.
- Generates docs, blog posts, registry JSON, Markdown endpoints, RSS, robots, and sitemap during build.
  RSS uses the local registry and Git history, so the first deploy does not depend on a live domain or GitHub token.
- Copies Markdown endpoints to `/docs/<slug>.md` and translates routing rules to Pages `_redirects`.
- Uses `en-US` as the initial locale and serves images without a server image optimizer.
- Uses the shared Intent UI Open Graph image for exported page metadata. The `/og` endpoint is a build-time image.
- Refreshes server-generated content on each deployment. It requires no Worker, R2, or paid bindings.

`npm run dev` and `npm run build` retain the normal Next.js configuration.
Only `npm run build:cloudflare` enables static export.

The export checks Pages Free's 20,000-file and 25 MiB-per-file limits before deployment.
The `404.html` file ensures unknown URLs return a real 404 rather than a SPA fallback.

References: [Cloudflare static Next.js guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/),
[Pages limits](https://developers.cloudflare.com/pages/platform/limits/),
[OpenNext Worker limits](https://opennext.js.org/cloudflare).
