"use client";

import { useEffect, useRef, useState } from "react";
import type { Product, ProductSelection } from "@/types/commerce";
import { getProductSelection } from "@/lib/productSelection";
import SizeGuide from "./SizeGuide";
import { sizeGuides } from "@/data/productInformation";
import styles from "./product.module.css";
import { useCart } from "@/components/cart/CartProvider";

export default function ProductPurchase({ product }: { product: Product }) {
  const [size, setSize] = useState("");
  const [error, setError] = useState("");
  const [selection, setSelection] = useState<ProductSelection>();
  const [added, setAdded] = useState(false);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { addItem, ready } = useCart();
  const unavailable = product.availability === "out-of-stock";

  useEffect(() => () => {
    if (feedbackTimer.current !== null) clearTimeout(feedbackTimer.current);
  }, []);

  function handleAddToBag() {
    const next = getProductSelection(product, size);
    if (!next) {
      setError("Choose a size to continue.");
      return;
    }
    setError("");
    if (!addItem({ productId: next.productId, variantId: next.variantId, quantity: next.quantity })) {
      setError("This selection could not be added. Check the bag quantity and try again.");
      return;
    }
    setSelection(next);
    setAdded(true);
    if (feedbackTimer.current !== null) clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className={styles.purchase}>
      <fieldset className={styles.sizes} aria-describedby={error ? "size-error" : undefined}>
        <legend>SELECT SIZE</legend>
        <div className={styles.sizeRow}>
          {product.sizes.map((value) => (
            <label key={value} className={styles.sizeOption}>
              <input type="radio" name={`size-${product.id}`} value={value} checked={size === value}
                onChange={() => {
                  setSize(value);
                  setError("");
                  setSelection(undefined);
                  setAdded(false);
                  if (feedbackTimer.current !== null) clearTimeout(feedbackTimer.current);
                }} />
              <span>{value}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <SizeGuide guide={sizeGuides[product.sizeGuideId]} />
      {error && <p id="size-error" className={styles.message} role="alert">{error}</p>}
      <button type="button" className={styles.addButton} onClick={handleAddToBag} disabled={unavailable || !ready}>
        {unavailable ? "UNAVAILABLE" : added ? "ADDED TO BAG" : "ADD TO BAG →"}
      </button>
      <p className={styles.message} role="status">
        {selection ? `Added to bag / ${selection.size}.` : ""}
      </p>
    </div>
  );
}
