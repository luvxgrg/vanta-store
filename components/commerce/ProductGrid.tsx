import type { Product } from "@/types/commerce";
import ProductCard from "./ProductCard";
import styles from "./commerce.module.css";

interface ProductGridProps {
  products: readonly Product[];
  getProductHref?: (product: Product) => string;
  variant?: "homepage" | "collection";
}

export default function ProductGrid({ products, getProductHref, variant = "homepage" }: ProductGridProps) {
  const isCollection = variant === "collection";
  return (
    <ul className={`${styles.grid}${isCollection ? ` ${styles.collectionGrid}` : ""}`}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
            product={product}
            href={getProductHref?.(product)}
            imageSizes={isCollection ? "(min-width: 1200px) 25vw, (min-width: 768px) 33vw, 50vw" : undefined}
          />
        </li>
      ))}
    </ul>
  );
}
