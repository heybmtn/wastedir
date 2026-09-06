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

const ICON_ATTRS =
  'viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';

const ICONS = {
  bin: `<svg ${ICON_ATTRS}><path d="M5 7h14M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M7 7l1 13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-13"/></svg>`,
  leaf: `<svg ${ICON_ATTRS}><path d="M12 21C12 21 5 16 5 10a7 7 0 0 1 14 0c0 6-7 11-7 11z"/><path d="M12 21V9"/></svg>`,
  wrench: `<svg ${ICON_ATTRS}><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.1 2.1-2-2 2.1-2.1z"/></svg>`,
  skip: `<svg ${ICON_ATTRS}><path d="M3 9h18M4 9h16l-1.5 9a1 1 0 0 1-1 .8H6.5a1 1 0 0 1-1-.8L4 9z"/></svg>`,
  house: `<svg ${ICON_ATTRS}><path d="M4 11l8-7 8 7M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9"/></svg>`,
  document: `<svg ${ICON_ATTRS}><path d="M7 3h7l4 4v10a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM14 3v4h4"/><path d="M8 19v2M11 19v2M14 19v2M17 19v2"/></svg>`,
  briefcase: `<svg ${ICON_ATTRS}><path d="M4 8h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zM9 8V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18"/></svg>`,
  bolt: `<svg ${ICON_ATTRS}><path d="M13 3 5 14h5l-1 7 9-12h-6l1-6z"/></svg>`,
} as const;

// A curated subset of CATEGORIES shown as shortcut tiles on the home page,
// with shorter display labels than the full category names.
export const FEATURED_CATEGORIES: { category: Category; label: string; icon: string }[] = [
  { category: 'Rubbish & Waste Removal', label: 'Rubbish Removal', icon: ICONS.bin },
  { category: 'Garden & Green Waste', label: 'Garden Waste', icon: ICONS.leaf },
  { category: 'Scrap Metal & Salvage', label: 'Scrap Metal', icon: ICONS.wrench },
  { category: 'Skips & Containers', label: 'Skip Hire', icon: ICONS.skip },
  { category: 'House & Garage Clearance', label: 'House Clearance', icon: ICONS.house },
  {
    category: 'Document Shredding & Data Destruction',
    label: 'Document Shredding',
    icon: ICONS.document,
  },
  { category: 'Commercial & Trade Waste', label: 'Commercial Waste', icon: ICONS.briefcase },
  { category: 'Electrical & IT Recycling', label: 'Electrical', icon: ICONS.bolt },
];
