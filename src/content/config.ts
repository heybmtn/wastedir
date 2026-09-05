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
    category: z.enum(CATEGORIES),
    tags: z.array(z.string()),
    address: z.string().optional(),
    postcode: z.string().optional(),
    phone: z.string().optional(),
    website: z.string().optional(),
    description: z.string().optional(),
    acceptedMaterials: z.array(z.string()).optional(),
    hours: z.string().optional(),
  }),
});

export const collections = { towns, listings };
