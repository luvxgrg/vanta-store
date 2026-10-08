"use client";
import Link from "next/link";
import { useWishlist } from "./WishlistProvider";
import styles from "./wishlist.module.css";
export default function WishlistLink() {
  const { wishlistCount } = useWishlist();
  return <Link href="/wishlist" className={styles.navLink}>WISHLIST{wishlistCount ? ` (${wishlistCount})` : ""}</Link>;
}
