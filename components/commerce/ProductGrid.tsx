import type { Product } from "@/types/commerce";
import ProductCard from "./ProductCard";
import styles from "./commerce.module.css";

interface ProductGridProps {
  products: readonly Product[];
  getProductHref?: (product: Product) => string;
}

export default function ProductGrid({ products, getProductHref }: ProductGridProps) {
  return (
    <ul className={styles.grid}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} href={getProductHref?.(product)} />
        </li>
      ))}
    </ul>
  );
}
