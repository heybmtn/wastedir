import { defineCollection, z } from 'astro:content';

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
    category: z.string(),
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
