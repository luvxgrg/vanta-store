"use client";

import { useWishlist } from "./WishlistProvider";
import styles from "./wishlist.module.css";

export default function WishlistButton({ productId, label, compact = false }: { productId: string; label: string; compact?: boolean }) {
  const { ready, isWishlisted, toggleItem } = useWishlist();
  const saved = isWishlisted(productId);
  return <button type="button" disabled={!ready} className={compact ? styles.iconButton : styles.saveButton} aria-pressed={saved}
    aria-label={saved ? `Remove ${label} from wishlist` : `Add ${label} to wishlist`} onClick={() => toggleItem(productId)}>
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5"><path d="M12 20s-8-5.1-8-10.5a4.5 4.5 0 0 1 8-2.8 4.5 4.5 0 0 1 8 2.8C20 14.9 12 20 12 20Z" /></svg>
    {!compact && <span>{saved ? "SAVED" : "SAVE"}</span>}
  </button>;
}
