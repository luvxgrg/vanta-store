"use client";

import { useEffect, useRef, type RefObject } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/formatCurrency";
import { useCart } from "./CartProvider";
import CartItem from "./CartItem";
import styles from "./cart.module.css";

export default function CartDrawer({ open, currency, onClose, returnFocus }: { open: boolean; currency: string; onClose: () => void; returnFocus: RefObject<HTMLButtonElement | null> }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const { lines, subtotal, totalQuantity, clearCart } = useCart();

  useEffect(() => {
    const element = dialog.current;
    if (!open || !element) return;
    const focusTarget = returnFocus.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      focusTarget?.focus({ preventScroll: true });
    };
  }, [open, returnFocus]);

  // Removing a focused line must leave a usable focus target in the drawer.
  useEffect(() => {
    if (open && dialog.current && !dialog.current.contains(document.activeElement)) closeButton.current?.focus();
  }, [lines, open]);

  return (
    <dialog ref={dialog} id="cart-drawer" className={styles.drawer} aria-labelledby="cart-title" onCancel={(event) => { event.preventDefault(); onClose(); }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = [...event.currentTarget.querySelectorAll<HTMLElement>("button:not(:disabled), a[href]")].filter((entry) => entry.getClientRects().length > 0);
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }}>
      <div className={styles.drawerContent}>
        <header className={styles.drawerHeader}><h2 id="cart-title">BAG ({totalQuantity})</h2><button ref={closeButton} type="button" onClick={onClose} aria-label="Close bag">CLOSE ×</button></header>
        {lines.length ? <>
          <div className={styles.lines}><ul>{lines.map((entry) => <CartItem key={entry.key} entry={entry} close={onClose} />)}</ul><button type="button" className={styles.clear} onClick={clearCart}>CLEAR BAG</button></div>
          <footer className={styles.summary}><div className={styles.subtotal} aria-live="polite"><span>SUBTOTAL</span><span>{formatCurrency(subtotal, currency)}</span></div><button type="button" className={styles.checkout} disabled>CHECKOUT</button><p>Checkout is not available in this concept store.</p></footer>
        </> : <div className={styles.empty}><h3>YOUR BAG IS EMPTY.</h3><Link href="/collections/drop-001-form" onClick={onClose}>EXPLORE THE COLLECTION →</Link></div>}
      </div>
    </dialog>
  );
}
