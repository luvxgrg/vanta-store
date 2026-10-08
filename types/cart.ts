import type { Product, ProductVariant } from "./commerce";

export interface CartLine {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface ResolvedCartLine {
  key: string;
  line: CartLine;
  product: Product;
  variant: ProductVariant;
  unitPrice: number;
}
