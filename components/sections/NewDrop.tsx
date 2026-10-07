import ProductGrid from "@/components/commerce/ProductGrid";
import { products } from "@/data/products";
import { collections } from "@/data/collections";
import styles from "./new-drop.module.css";

export default function NewDrop() {
  const drop = collections.find((collection) => collection.slug === "drop-001-form");
  const newProducts = products
    .filter((product) => product.featured && product.newArrival && product.collectionSlugs.includes("drop-001-form"))
    .slice(0, 4);

  return (
    <section className={styles.section} aria-labelledby="new-drop-title">
      <div className={styles.heading}>
        <h2 id="new-drop-title">NEW DROP</h2>
        {drop && <p>{drop.name}</p>}
      </div>
      <ProductGrid products={newProducts} />
    </section>
  );
}
