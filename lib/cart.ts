import type { Product } from "@/types/commerce";
import type { CartLine, ResolvedCartLine } from "@/types/cart";

export const CART_STORAGE_KEY = "vanta:cart:v1";
// Frontend quantity limit, not an inventory claim.
export const MAX_CART_QUANTITY = 99;

export function cartLineKey(line: Pick<CartLine, "productId" | "variantId">): string {
  return JSON.stringify([line.productId, line.variantId]);
}

export function resolveCartLines(lines: readonly CartLine[], catalogue: readonly Product[]): ResolvedCartLine[] {
  return lines.flatMap((line) => {
    const product = catalogue.find((entry) => entry.id === line.productId);
    const variant = product?.variants.find((entry) => entry.id === line.variantId);
    if (!product || !variant) return [];
    return [{ key: cartLineKey(line), line, product, variant, unitPrice: variant.price ?? product.price }];
  });
}

export function normalizeCartLines(value: unknown, catalogue: readonly Product[]): CartLine[] {
  if (!Array.isArray(value)) return [];
  const merged = new Map<string, CartLine>();
  for (const entry of value) {
    if (!entry || typeof entry !== "object") continue;
    const { productId, variantId, quantity } = entry;
    if (typeof productId !== "string" || typeof variantId !== "string" || !Number.isSafeInteger(quantity) || quantity < 1) continue;
    const product = catalogue.find((item) => item.id === productId);
    if (!product?.variants.some((variant) => variant.id === variantId)) continue;
    const key = cartLineKey({ productId, variantId });
    merged.set(key, { productId, variantId, quantity: Math.min(MAX_CART_QUANTITY, (merged.get(key)?.quantity ?? 0) + quantity) });
  }
  return [...merged.values()];
}

export function readCartStorage(raw: string | null, catalogue: readonly Product[]): CartLine[] {
  try {
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed?.version === 1 ? normalizeCartLines(parsed.items, catalogue) : [];
  } catch {
    return [];
  }
}

export function serializeCart(lines: readonly CartLine[]): string {
  return JSON.stringify({ version: 1, items: lines });
}

export function addCartItem(lines: readonly CartLine[], item: CartLine): CartLine[] {
  const key = cartLineKey(item);
  const existing = lines.some((line) => cartLineKey(line) === key);
  return existing
    ? lines.map((line) => cartLineKey(line) === key ? { ...line, quantity: Math.min(MAX_CART_QUANTITY, line.quantity + item.quantity) } : line)
    : [...lines, { ...item }];
}
