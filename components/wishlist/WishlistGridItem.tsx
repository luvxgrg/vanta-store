"use client";
import type { ReactNode } from "react";
import { useWishlist } from "./WishlistProvider";
export default function WishlistGridItem({ productId, children }: { productId: string; children: ReactNode }) {
  const { isWishlisted } = useWishlist();
  return <li hidden={!isWishlisted(productId)}>{children}</li>;
}
