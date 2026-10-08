export interface ProductImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProductColor {
  name: string;
  hex?: string;
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface ProductVariant {
  id: string;
  // Keys correspond to ProductOption names, e.g. Color and Size.
  optionValues: Record<string, string>;
  // Overrides the product price when a variant has different pricing.
  price?: number;
  image?: ProductImage;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  // Numeric prices are in major currency units (e.g. rupees), not paise.
  price: number;
  compareAtPrice?: number;
  currency: string;
  // Ordered: primary card image first, optional hover image second.
  // An empty array means photography has not been supplied yet.
  images: ProductImage[];
  category: string;
  audience: "men" | "women" | "unisex";
  collectionSlugs: string[];
  colors: ProductColor[];
  sizes: string[];
  options: ProductOption[];
  variants: ProductVariant[];
  badges: string[];
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  // Deterministic catalogue sequence; higher values sort first for Newest.
  // This is an editorial order, not a claimed release date.
  catalogueOrder: number;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  eyebrow?: string;
  productIds: string[];
}
