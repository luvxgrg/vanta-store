"use client";

import Image from "next/image";
import Link from "next/link";
import type { ResolvedCartLine } from "@/types/cart";
import { formatCurrency } from "@/lib/formatCurrency";
import { MAX_CART_QUANTITY } from "@/lib/cart";
import { useCart } from "./CartProvider";
import styles from "./cart.module.css";

export default function CartItem({ entry, close }: { entry: ResolvedCartLine; close: () => void }) {
  const { removeItem, updateQuantity } = useCart();
  const { product, variant, line, unitPrice, key } = entry;
  const image = variant.image ?? product.images[0];
  const size = variant.optionValues.Size;
  const color = variant.optionValues.Color ?? product.colors.map((entry) => entry.name).join(" / ");
  const label = `${product.name}, ${color}, size ${size}`;
  return (
    <li className={styles.item}>
      <Link href={`/products/${product.slug}`} onClick={close} className={styles.imagePanel} aria-label={`View ${product.name}`}>
        {image ? <Image src={image.src} alt={image.alt} fill sizes="(min-width: 375px) 88px, 64px" className={styles.image} /> : <span className={styles.study}>PRODUCT STUDY</span>}
      </Link>
      <div className={styles.itemInfo}>
        <Link href={`/products/${product.slug}`} onClick={close} className={styles.name}>{product.name}</Link>
        <p className={styles.metadata}>{color} / {size}</p>
        <p className={styles.price}>{formatCurrency(unitPrice, product.currency)}</p>
        <div className={styles.lineActions}>
          <div className={styles.quantity} role="group" aria-label={`Quantity for ${label}`}>
            <button type="button" disabled={line.quantity === 1} onClick={() => updateQuantity(key, line.quantity - 1)} aria-label={`Decrease quantity for ${label}`}>−</button>
            <span aria-live="polite">{line.quantity}</span>
            <button type="button" disabled={line.quantity >= MAX_CART_QUANTITY} onClick={() => updateQuantity(key, line.quantity + 1)} aria-label={`Increase quantity for ${label}`}>+</button>
          </div>
          <button type="button" className={styles.remove} onClick={() => removeItem(key)} aria-label={`Remove ${label}`}>REMOVE</button>
        </div>
      </div>
    </li>
  );
}
