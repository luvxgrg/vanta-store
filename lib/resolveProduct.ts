import { products } from "@/data/products";
import type { Product } from "@/types/commerce";

export function resolveProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const others = products.filter((entry) => entry.id !== product.id);
  return [
    ...others.filter((entry) => entry.category === product.category),
    ...others.filter((entry) => entry.category !== product.category && entry.collectionSlugs.some((slug) => product.collectionSlugs.includes(slug))),
  ].slice(0, limit);
}

