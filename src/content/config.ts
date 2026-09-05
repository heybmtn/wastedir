import { defineCollection, z } from 'astro:content';

export const CATEGORIES = [
  'Rubbish & Waste Removal',
  'Garden & Green Waste',
  'Scrap Metal & Salvage',
  'Skips & Containers',
  'House & Garage Clearance',
  'Commercial & Trade Waste',
  'Building & Construction Waste',
  'Furniture & Appliance Recycling',
  'Electrical & IT Recycling',
  'Paper, Cardboard & Packaging',
  'Specialist & Hazardous Waste',
  'Document Shredding & Data Destruction',
  'Vehicle & Tyre Recycling',
  'Wood & Timber Recycling',
  'Other Recycling & Waste Services',
] as const;

// What a business DOES.
export const SERVICES = [
  'Skip Hire',
  'Waste Collection',
  'House Clearance',
  'Garage Clearance',
  'Office & Commercial Clearance',
  'Man & Van Removal',
  'Document Shredding',
  'Scrap Collection',
  'Site Clearance',
  'Demolition & Strip-out',
  'Grab Hire',
] as const;

// What a business ACCEPTS or PROCESSES.
export const MATERIALS = [
  'Household Waste',
  'Garden Waste',
  'Metal',
  'Wood',
  'Cardboard & Paper',
  'Plastic',
  'Glass',
  'Soil & Rubble',
  'Electronics & WEEE',
  'Batteries',
  'Textiles',
  'Furniture & Appliances',
  'Tyres',
  'Hazardous Materials',
  'Construction Waste',
] as const;

const towns = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    region: z.string().optional(),
    intro: z.string().optional(),
  }),
});

const listings = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    town: z.string(),
    // A business can sit under more than one directory category
    // (e.g. a scrap merchant under both Scrap Metal & Salvage and
    // Vehicle & Tyre Recycling).
    categories: z.array(z.enum(CATEGORIES)).min(1),
    // What the business does.
    services: z.array(z.enum(SERVICES)).min(1),
    // What the business accepts or processes. Kept separate from
    // `services` so filtering/search can facet on either independently.
    materials: z.array(z.enum(MATERIALS)).optional(),
    address: z.string().optional(),
    postcode: z.string().optional(),
    phone: z.string().optional(),
    website: z.string().optional(),
    description: z.string().optional(),
    // Free-text specifics for display only (e.g. "fridges and freezers"),
    // distinct from the controlled `materials` list used for filtering.
    acceptedMaterials: z.array(z.string()).optional(),
    hours: z.string().optional(),
  }),
});

export const collections = { towns, listings };
