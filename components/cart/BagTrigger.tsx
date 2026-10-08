"use client";

import { useCart } from "./CartProvider";
import styles from "./cart.module.css";

export default function BagTrigger({ mobile = false }: { mobile?: boolean }) {
  const { totalQuantity, openBag, ready } = useCart();
  return <button type="button" className={`${styles.trigger} ${mobile ? styles.mobileTrigger : ""}`} disabled={!ready} aria-haspopup="dialog" aria-controls="cart-drawer" onClick={(event) => openBag(event.currentTarget)}>BAG ({totalQuantity})</button>;
}
