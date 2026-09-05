# WasteList

A static directory site for recycling & waste services, organised by town. Built with
[Astro](https://astro.build), no backend, no database — all content lives in the repo as
data files under `src/content/`.

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
    config.ts        # Zod schemas for `towns` and `listings` collections
    towns/            # one JSON file per town
    listings/         # one JSON file per listing
  layouts/
    BaseLayout.astro
  pages/
    index.astro       # home page: town list + search
    [town]/index.astro # town page: listings + service/material facet filtering
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
  "categories": ["Rubbish & Waste Removal", "Skips & Containers"],
  "services": ["Waste Collection", "Skip Hire"],
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
  values (`SERVICES`): Skip Hire, Waste Collection, Drop-off / Recycling Centre, House
  Clearance, Garage Clearance, Office & Commercial Clearance, Man & Van Removal, Document
  Shredding, Scrap Collection, Site Clearance, Demolition & Strip-out, Grab Hire.

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
