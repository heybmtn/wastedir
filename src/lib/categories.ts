import { CATEGORIES, type Category } from '../content/config';

export function slugifyCategory(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const CATEGORY_BY_SLUG = new Map<string, Category>(
  CATEGORIES.map((category) => [slugifyCategory(category), category])
);

// A curated subset of CATEGORIES shown as shortcut tiles on the home page,
// with shorter display labels than the full category names.
export const FEATURED_CATEGORIES: { category: Category; label: string }[] = [
  { category: 'Rubbish & Waste Removal', label: 'Rubbish Removal' },
  { category: 'Garden & Green Waste', label: 'Garden Waste' },
  { category: 'Scrap Metal & Salvage', label: 'Scrap Metal' },
  { category: 'Skips & Containers', label: 'Skip Hire' },
  { category: 'House & Garage Clearance', label: 'House Clearance' },
  { category: 'Document Shredding & Data Destruction', label: 'Document Shredding' },
  { category: 'Commercial & Trade Waste', label: 'Commercial Waste' },
  { category: 'Electrical & IT Recycling', label: 'Electrical' },
];
