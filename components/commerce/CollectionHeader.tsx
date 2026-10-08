import type { Collection } from "@/types/commerce";
import styles from "./collection.module.css";

interface CollectionHeaderProps {
  collection: Collection;
  productCount: number;
}

export default function CollectionHeader({ collection, productCount }: CollectionHeaderProps) {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>{collection.eyebrow ?? "COLLECTION"}</p>
      <h1>{collection.name}</h1>
      <p className={styles.description}>{collection.description}</p>
      <p className={styles.count}>
        {String(productCount).padStart(2, "0")} {productCount === 1 ? "PRODUCT" : "PRODUCTS"}
      </p>
    </header>
  );
}
