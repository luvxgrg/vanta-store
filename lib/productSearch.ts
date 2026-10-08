import type { Product } from "@/types/commerce";

export type SearchProduct = Pick<Product, "id" | "slug" | "name" | "colors" | "category" | "price" | "currency" | "images">;

export function searchProducts(products: readonly SearchProduct[], query: string): SearchProduct[] {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return products.filter((product) => {
    const text = [product.name, product.category, ...product.colors.map((color) => color.name)].join(" ").toLocaleLowerCase();
    return terms.every((term) => text.includes(term));
  });
}
