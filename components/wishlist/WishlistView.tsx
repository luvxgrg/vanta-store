"use client";
import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { useWishlist } from "./WishlistProvider";
import styles from "./wishlist.module.css";
export default function WishlistView({ children }: { children: ReactNode }) {
  const { ready, wishlistCount } = useWishlist();
  const heading = useRef<HTMLHeadingElement>(null);
  const previousCount = useRef(wishlistCount);
  useEffect(() => {
    const element = heading.current;
    if (ready && wishlistCount < previousCount.current && element?.getClientRects().length &&
      (document.activeElement === document.body || document.activeElement?.closest("[hidden]"))) {
      const nextControl = element.closest("main")?.querySelector<HTMLButtonElement>("li:not([hidden]) article button");
      (nextControl ?? element).focus({ preventScroll: true });
    }
    previousCount.current = wishlistCount;
  }, [ready, wishlistCount]);
  return <><header className={styles.header}><h1 ref={heading} tabIndex={-1}>WISHLIST</h1><p role="status">{ready ? `${String(wishlistCount).padStart(2, "0")} SAVED ${wishlistCount === 1 ? "PIECE" : "PIECES"}` : "LOADING SAVED PIECES"}</p></header>
    {!ready ? <div className={styles.loading} aria-busy="true" /> : wishlistCount ? children : <div className={styles.empty}><h2>NO SAVED PIECES.</h2><p>Pieces you save will appear here.</p><Link href="/collections/drop-001-form">EXPLORE THE COLLECTION →</Link></div>}
  </>;
}
