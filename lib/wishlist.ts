export const WISHLIST_STORAGE_KEY = "vanta:wishlist:v1";

export function normalizeWishlist(value: unknown, validIds: readonly string[]): string[] {
  if (!Array.isArray(value)) return [];
  const allowed = new Set(validIds);
  return [...new Set(value.filter((id): id is string => typeof id === "string" && allowed.has(id)))];
}

export function readWishlist(raw: string | null, validIds: readonly string[]): string[] {
  try {
    const data = raw ? JSON.parse(raw) : null;
    return data?.version === 1 ? normalizeWishlist(data.productIds, validIds) : [];
  } catch { return []; }
}
