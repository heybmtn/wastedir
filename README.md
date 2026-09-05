# WasteList

A static directory site for recycling & waste services, organised by town. Built with
[Astro](https://astro.build), no backend, no database — all content lives in the repo as
data files under `src/content/`.

## Stack

- Astro (static output, no adapter)
- TypeScript content schemas (Zod)
- Vanilla JS for search and tag filtering (progressive enhancement — everything works
  without JS, JS just adds filtering)
- Plain CSS, no framework

## Project structure

```
src/
  content/
    config.ts        # Zod schemas for `towns` and `listings` collections
    towns/            # one JSON file per town
    listings/         # one JSON file per listing
  layouts/
    BaseLayout.astro
  pages/
    index.astro       # home page: town list + search
    [town]/index.astro # town page: listings + tag chip filtering
  styles/
    global.css
public/
  robots.txt
```

## Adding a town

Create a new file in `src/content/towns/`, named after the slug, e.g.
`src/content/towns/newtown.json`:

```json
{
  "name": "Newtown",
  "slug": "newtown",
  "region": "Some County",
  "intro": "Optional one-line description shown on the town page."
}
```

`slug` must be URL-safe (lowercase, hyphens) and is used to build the route `/newtown/`
and to link listings to this town.

## Adding a listing

Create a new file in `src/content/listings/`, e.g.
`src/content/listings/newtown-hwrc.json`:

```json
{
  "name": "Newtown Recycling Centre",
  "town": "newtown",
  "category": "HWRC",
  "tags": ["household waste", "garden waste", "drop-off", "council-run", "free"],
  "address": "1 Example Road, Newtown",
  "postcode": "NT1 1AA",
  "phone": "01234 000000",
  "website": "https://example.com",
  "description": "Optional description of the service.",
  "acceptedMaterials": ["general household waste", "garden waste"],
  "hours": "Mon–Sun 8am–6pm"
}
```

Only `name`, `town`, `category`, and `tags` are required — every other field is optional and
only rendered when present. `town` must match an existing town's `slug`. `tags` drive the
filter chips shown on that town's page, so keep them short and reusable across listings
(e.g. `household waste`, `garden waste`, `electronics/WEEE`, `batteries`, `textiles`,
`scrap metal`, `hazardous`, `construction waste`, `drop-off`, `collection service`,
`council-run`, `free`).

## Local development

```bash
npm install
npm run dev       # starts a local dev server
npm run build     # type-checks and builds a static site into dist/
npm run preview   # serves the built dist/ locally
```

## Deploying to Cloudflare Pages

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Framework preset:** none required / Astro (static) — no adapter is needed since the
  site outputs fully static HTML.
- No environment variables, secrets, or backend services are required.

Before deploying, update the `site` value in `astro.config.mjs` to your production domain
so the sitemap and canonical URLs are correct.
