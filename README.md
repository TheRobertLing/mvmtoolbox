# mvmtoolbox.tf

A collection of tools for players of Mann vs. Machine, built with [Nuxt](https://nuxt.com) and [Nuxt UI](https://ui.nuxt.com).

## Setup

```bash
pnpm install
```

The server browser calls the Steam Web API, so it needs a key in `.env`:

```bash
NUXT_STEAM_WEB_API_KEY=your-key
```

## Commands

| Command          | What it does                                    |
| ---------------- | ----------------------------------------------- |
| `pnpm dev`       | Start the dev server on `http://localhost:3000` |
| `pnpm build`     | Build for production                            |
| `pnpm preview`   | Preview the production build                    |
| `pnpm lint`      | Run ESLint                                      |
| `pnpm typecheck` | Run the type checker                            |
| `pnpm format`    | Format with Prettier                            |

## Structure

```
app/                          shell: layout, theme, tools list
layers/
  home/                       /
  about/                      /about
  server-browser/             /server-browser
    nuxt.config.ts            route rules and runtime config for this route
    app/
      pages/                  the route's page
      components/             page-level components, plus one folder per widget
      composables/
      utils/
    server/
      api/v1/server-browser/  this layer's API routes
      steam/                  Steam Web API client
    shared/api/               request and response schemas, used by app and server
```

### Rules

1. **`app/` is the shell.** It holds the layout, the theme, the tools list, and anything two or more routes use.
2. **One layer per route.** `layers/<route>/` holds everything that route needs: its page, components, composables, server API, shared schemas, route rules and runtime config.
3. **A widget is a folder, not a layer.** It lives at `app/components/<Widget>/` with a root component of the same name. Nuxt merges every layer into one global namespace, so a nested layer adds depth without adding a boundary.
4. **Narrowest scope.** Code lives in the narrowest place that covers everything using it. Move it up to `app/` when a second route needs it.
5. **The layer name is the namespace.** API routes go under `/api/v1/<layer>/`. Cache names, `useFetch` keys and `useState` keys are written `<layer>:<name>`.

Imports that cross folders use the `#layers/<layer>/` alias; siblings in the same folder use a relative path. Neither includes a file extension.

### Adding a tool

1. Create `layers/<name>/` with a `nuxt.config.ts` and `app/pages/<name>.vue`. Nuxt registers every folder in `layers/` automatically.
2. Add its entry to `tools` in `app/app.config.ts`, or remove `disabled` if it is already listed. The nav and the home page both read that list.
