import type { Product } from "@/types/commerce";
import { formatCurrency } from "@/lib/formatCurrency";
import { getRelatedProducts } from "@/lib/resolveProduct";
import { shippingAndReturns } from "@/data/productInformation";
import { collections } from "@/data/collections";
import ProductGrid from "@/components/commerce/ProductGrid";
import ProductGallery from "./ProductGallery";
import ProductPurchase from "./ProductPurchase";
import styles from "./product.module.css";

export default function ProductDetail({ product }: { product: Product }) {
  const related = getRelatedProducts(product);
  const collection = collections.find((entry) => entry.slug === product.collectionSlugs[0]);
  return (
    <>
      <div className={styles.layout}>
        <ProductGallery product={product} />
        <div className={styles.information}>
          {collection && <p className={styles.eyebrow}>{collection.name}</p>}
          <h1>{product.name}</h1>
          <div className={styles.meta}><p>{product.colors.map((color) => color.name).join(" / ")}</p><p>{formatCurrency(product.price, product.currency)}</p></div>
          <p className={styles.description}>{product.shortDescription}</p>
          <ProductPurchase key={product.id} product={product} />
          <div className={styles.accordions}>
            <details><summary>DETAILS</summary><p>{product.description}</p><ul>{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></details>
            <details><summary>COMPOSITION &amp; CARE</summary><p>{product.composition}</p><ul>{product.care.map((line) => <li key={line}>{line}</li>)}</ul></details>
            <details><summary>SHIPPING &amp; RETURNS</summary>{shippingAndReturns.map((line) => <p key={line}>{line}</p>)}</details>
          </div>
        </div>
      </div>
      {related.length > 0 && <section className={styles.related} aria-labelledby="related-title"><h2 id="related-title">YOU MAY ALSO LIKE</h2><ProductGrid products={related} variant="collection" /></section>}
    </>
  );
}
