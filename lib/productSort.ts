import type { Product } from "@/types/commerce";

export const productSortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
] as const;

export type ProductSort = (typeof productSortOptions)[number]["value"];

export function resolveProductSort(value: string | string[] | undefined): ProductSort {
  return productSortOptions.find((option) => option.value === value)?.value ?? "featured";
}

export function sortProducts(products: readonly Product[], sort: ProductSort): Product[] {
  const ordered = [...products];
  switch (sort) {
    case "newest":
      return ordered.sort((a, b) => b.catalogueOrder - a.catalogueOrder);
    case "price-low":
      return ordered.sort((a, b) => a.price - b.price);
    case "price-high":
      return ordered.sort((a, b) => b.price - a.price);
    default:
      return ordered;
  }
}
