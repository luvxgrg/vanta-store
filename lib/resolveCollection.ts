import { collections } from "@/data/collections";
import { products } from "@/data/products";

export function resolveCollection(slug: string) {
  const collection = collections.find((entry) => entry.slug === slug);
  if (!collection) return undefined;

  const selectedIds = new Set(collection.productIds);
  return {
    collection,
    products: products.filter((product) => selectedIds.has(product.id)),
  };
}
