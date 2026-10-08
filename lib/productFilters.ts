import type { Product } from "@/types/commerce";

export const filterGroups = ["category", "color", "size", "availability"] as const;
export type FilterGroup = (typeof filterGroups)[number];
export interface ProductFilters {
  category: string[];
  color: string[];
  size: string[];
  availability: string[];
  minPrice?: number;
  maxPrice?: number;
}
export interface FilterOption { value: string; label: string }
export type ProductFilterOptions = Record<FilterGroup, FilterOption[]>;
export type CollectionSearchParams = Record<string, string | string[] | undefined>;

export function emptyProductFilters(): ProductFilters {
  return { category: [], color: [], size: [], availability: [] };
}

function values(value: string | string[] | undefined): string[] {
  return [...new Set((Array.isArray(value) ? value : value ? [value] : []).map((entry) => entry.trim()).filter(Boolean))];
}

function price(value: string | string[] | undefined): number | undefined {
  if (typeof value !== "string" || !value.trim()) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

export function resolveProductFilters(params: CollectionSearchParams): ProductFilters {
  return {
    category: values(params.category),
    color: values(params.color),
    size: values(params.size),
    availability: values(params.availability),
    minPrice: price(params["min-price"]),
    maxPrice: price(params["max-price"]),
  };
}

export function filterProducts(products: readonly Product[], filters: ProductFilters): Product[] {
  return products.filter((product) =>
    (!filters.category.length || filters.category.includes(product.category)) &&
    (!filters.color.length || product.colors.some((color) => filters.color.includes(color.name))) &&
    (!filters.size.length || product.sizes.some((size) => filters.size.includes(size))) &&
    (!filters.availability.length || filters.availability.includes(product.availability)) &&
    (filters.minPrice === undefined || product.price >= filters.minPrice) &&
    (filters.maxPrice === undefined || product.price <= filters.maxPrice)
  );
}

export function getProductFilterOptions(products: readonly Product[]): ProductFilterOptions {
  const unique = (entries: string[]) => [...new Set(entries)];
  const option = (value: string) => ({ value, label: value });
  const availabilityLabels = { "in-stock": "In stock", "out-of-stock": "Out of stock", unknown: "Not specified" };
  return {
    category: unique(products.map((product) => product.category)).map((value) => ({ value, label: value.toUpperCase() })),
    color: unique(products.flatMap((product) => product.colors.map((color) => color.name))).map(option),
    size: unique(products.flatMap((product) => product.sizes)).map(option),
    availability: unique(products.map((product) => product.availability)).map((value) => ({ value, label: availabilityLabels[value as Product["availability"]] })),
  };
}

// Replace only filter-owned parameters; sort and future unrelated parameters survive.
export function writeProductFilters(params: URLSearchParams, filters: ProductFilters): URLSearchParams {
  const next = new URLSearchParams(params);
  for (const group of filterGroups) {
    next.delete(group);
    for (const value of filters[group]) next.append(group, value);
  }
  next.delete("min-price");
  next.delete("max-price");
  if (filters.minPrice !== undefined) next.set("min-price", String(filters.minPrice));
  if (filters.maxPrice !== undefined) next.set("max-price", String(filters.maxPrice));
  return next;
}
