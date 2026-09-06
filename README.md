# WasteList

A static directory site for **paid** recycling & waste services, organised by town. Built
with [Astro](https://astro.build), no backend, no database — all content lives in the repo
as data files under `src/content/`.

This directory is for paid/commercial businesses only (scrap merchants, skip hire,
clearance companies, etc.) — not free local-authority services such as council-run
Household Waste Recycling Centres (HWRCs) or council bin collections. Keep that in mind
when adding towns/listings.

## Stack

- Astro (static output, no adapter)
- TypeScript content schemas (Zod)
- Vanilla JS for search and service/material facet filtering (progressive enhancement —
  everything works without JS, JS just adds filtering)
- Plain CSS, no framework

## Project structure

```
src/
  content/
    config.ts        # Zod schemas + CATEGORIES/SERVICES/MATERIALS taxonomies
    towns/            # one JSON file per town
    listings/         # one JSON file per listing
  lib/
    categories.ts     # category <-> URL slug helpers, featured-categories list
  components/
    ListingResults.astro # shared facet chips + listing cards, used by town & category pages
  layouts/
    BaseLayout.astro
  pages/
    index.astro                    # home page: hero, search, browse-by-service, popular towns
    [town]/index.astro             # town page: listings for one town
    categories/index.astro         # all categories, with listing counts
    categories/[category]/index.astro # cross-town listings for one category
    blog/index.astro               # blog post list
    blog/[slug]/index.astro        # single blog post
    get-listed/index.astro         # public intake form
  styles/
    global.css
public/
  robots.txt
  favicon.svg
  _headers
```

## Adding a town

Create a new file in `src/content/towns/`, named after the slug, e.g.
`src/content/towns/newtown.json`:

```json
{
  "name": "Newtown",
  "slug": "newtown",
  "region": "Some County",
  "intro": "Optional one-line description shown on the town page.",
  "lat": 51.9,
  "lon": -0.15
}
```

`slug` must be URL-safe (lowercase, hyphens) and is used to build the route `/newtown/`
and to link listings to this town. `lat`/`lon` are optional — when set, the town becomes
eligible for the home page's "Use my location" nearest-town lookup (a town without
coordinates just never gets suggested by that feature; everything else about it works
normally).

## Adding a listing

Create a new file in `src/content/listings/`, e.g.
`src/content/listings/newtown-skip-hire.json`:

```json
{
  "name": "Newtown Skip Hire Co",
  "town": "newtown",
  "categories": ["Skips & Containers", "Rubbish & Waste Removal"],
  "services": ["Skip Hire", "Waste Collection"],
  "materials": ["Household Waste", "Garden Waste"],
  "address": "1 Example Road, Newtown",
  "postcode": "NT1 1AA",
  "phone": "01234 000000",
  "website": "https://example.com",
  "description": "Optional description of the service.",
  "acceptedMaterials": ["fridges and freezers", "car batteries"],
  "hours": "Mon–Sun 8am–6pm"
}
```

Only `name`, `town`, `categories`, and `services` are required — every other field is
optional and only rendered when present. `town` must match an existing town's `slug`.

There are three separate, purpose-built lists, each defined in `src/content/config.ts`:

- **`categories`** (array, required, ≥1) — the directory buckets a business is browsable
  under. A business can sit under more than one, e.g. a scrap merchant could list both
  `Scrap Metal & Salvage` and `Vehicle & Tyre Recycling`. Fixed values (`CATEGORIES`):

  1. Rubbish & Waste Removal
  2. Garden & Green Waste
  3. Scrap Metal & Salvage
  4. Skips & Containers
  5. House & Garage Clearance
  6. Commercial & Trade Waste
  7. Building & Construction Waste
  8. Furniture & Appliance Recycling
  9. Electrical & IT Recycling
  10. Paper, Cardboard & Packaging
  11. Specialist & Hazardous Waste
  12. Document Shredding & Data Destruction
  13. Vehicle & Tyre Recycling
  14. Wood & Timber Recycling
  15. Other Recycling & Waste Services

- **`services`** (array, required, ≥1) — what the business *does* (the action). Fixed
  values (`SERVICES`): Skip Hire, Waste Collection, House Clearance, Garage Clearance,
  Office & Commercial Clearance, Man & Van Removal, Document Shredding, Scrap Collection,
  Site Clearance, Demolition & Strip-out, Grab Hire.

- **`materials`** (array, optional) — what the business *accepts or processes*. Fixed
  values (`MATERIALS`): Household Waste, Garden Waste, Metal, Wood, Cardboard & Paper,
  Plastic, Glass, Soil & Rubble, Electronics & WEEE, Batteries, Textiles, Furniture &
  Appliances, Tyres, Hazardous Materials, Construction Waste.

Keeping `services` and `materials` separate (rather than one flat tag list) is what
powers the town page's two-facet filter: selecting chips within a facet is OR'd together,
selecting across both facets is AND'd (e.g. "Metal" + "Wood" materials AND "Scrap
Collection" service).

`acceptedMaterials` is a separate, free-text field for display-only specifics (e.g. "fridges
and freezers") that don't need to match the controlled `materials` list.

## Category pages

Every value in `CATEGORIES` automatically gets a static page at
`/categories/<slug>/` listing every matching business across all towns (not just one), plus
a `/categories/` index of all 15 with counts. Slugs are generated from the category name by
`slugifyCategory()` in `src/lib/categories.ts` (e.g. "Scrap Metal & Salvage" →
`scrap-metal-and-salvage`) — nothing to maintain by hand when adding listings. The home
page's "Browse by service" grid links to a curated subset of 8 categories
(`FEATURED_CATEGORIES` in the same file, with shorter display labels) plus a "More →" link
to the full `/categories/` index.

## Adding a blog post

Create a new Markdown file in `src/content/posts/`, e.g.
`src/content/posts/my-new-post.md`:

```md
---
title: "My New Post"
description: "One-line summary shown on the blog index."
publishDate: 2026-09-06
---

Write the post body here in plain Markdown.
```

The filename (minus `.md`) becomes the URL slug (`/blog/my-new-post/`). That's the
whole workflow — no other files need touching. The post appears automatically on
`/blog/` (newest first, by `publishDate`) and gets its own static page at build time.
`updatedDate` is optional and only shown if set.

## Data sourcing

The Oxfordshire listings in `src/content/listings/` are real UK businesses (not
placeholders), found via web search. Each one has a genuine business name and website URL
found in current search results, which is the best available signal that a listing is
"live and working" — this repo's tooling can't directly fetch arbitrary external sites to
confirm each one loads. Contact details (phone/address/postcode) are included only where a
search result actually stated them; fields left out simply weren't found, rather than
guessed. If you find a listing that's gone stale (closed, changed number, dead site) or
incorrect, please fix or remove it — accuracy matters more than coverage.

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
