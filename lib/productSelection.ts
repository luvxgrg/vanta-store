import type { Product, ProductSelection } from "@/types/commerce";

export function getProductSelection(product: Product, size: string): ProductSelection | undefined {
  if (!product.sizes.includes(size)) return undefined;
  const variant = product.variants.find((entry) => entry.optionValues.Size === size);
  if (!variant) return undefined;
  return { productId: product.id, variantId: variant.id, size, quantity: 1 };
}
