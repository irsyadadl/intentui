# Bearer authentication

[Design Intent UI documentation](https://design.intentui.com/docs/getting-started) specifies tokens created in the licensed account's token interface, `REGISTRY_TOKEN` in a private `.env`, and the `@irsyad` URL/header configuration in [registry](registry.md). A different environment variable name is supported when the header placeholder matches it. Preserve configured URLs and additional headers. Re-check current documentation before setup.

Before a request, inspect only whether the expected header/placeholder exists and whether the referenced variable has a nonempty value in the CLI/MCP execution context. Return booleans or variable names, never values. Do not dump environment files, print Authorization headers, interpolate secrets into CLI arguments, or log unsanitized authentication/error responses. Never use frontend-exposed variables such as `NEXT_PUBLIC_*` or `VITE_*` for a registry secret.

Let shadcn resolve `${REGISTRY_TOKEN}`. Store real tokens only through the user's authorized secret workflow in an ignored env file or secure environment. Verify ignore coverage without printing the file. Do not commit tokens, put literal credentials in components.json, or copy premium source into fixtures or public references. A configured placeholder proves configuration, not working authentication.

For missing configuration, explain the single @irsyad namespace and header setup. For a missing variable, ask the user to configure it securely; do not request that they paste it into chat. For HTTP 401, stop installation and report authentication failed; verify variable availability, token validity, and CLI/MCP environment. For 403, report permission/license restrictions and direct the user to their account/access workflow. For 404, check the documented item and URL without assuming valid auth. Do not repeatedly retry an unchanged failed token, bypass licensing, or fall back to public components while claiming success.

Only claim authenticated installation after an authorized request and actual installation succeeded. Mocked tests do not prove licensed access. Source: [shadcn authentication](https://ui.shadcn.com/docs/registry/authentication).

## Optional read-only helper

Run `node <installed-skill>/scripts/inspect-registry.mjs <workspace> premium v4` (or `public v4`) after confirming v4 for a sanitized configuration/variable-presence result. It never prints URLs, headers or variable values, never sends requests, and reports authenticated=false until separate live access evidence is supplied to its API. It checks its process environment only; shadcn may load a private dotenv file separately. An unavailable variable in this helper therefore requires checking the actual CLI/MCP context, not concluding that the token is absent everywhere.

For a v4 Design project @irsyad also supplies public components; do not require @intentui or switch to it when credentials fail. Configuration, variable presence, actual access and installation are separate facts. An established v4 context should be reused, not redetected during every auth check. The CLI inspector performs no requests; only live catalog/item evidence can establish access, and that still does not prove dependency resolution or installation. Mock evidence never sets verified-live.
