import type { Product } from "@/types/commerce";
import ProductCard from "./ProductCard";
import styles from "./commerce.module.css";
import WishlistGridItem from "@/components/wishlist/WishlistGridItem";

interface ProductGridProps {
  products: readonly Product[];
  getProductHref?: (product: Product) => string;
  variant?: "homepage" | "collection";
  wishlistOnly?: boolean;
  eagerFirstRow?: boolean;
}

export default function ProductGrid({ products, getProductHref, variant = "homepage", wishlistOnly = false, eagerFirstRow = false }: ProductGridProps) {
  const isCollection = variant === "collection";
  return (
    <ul className={`${styles.grid}${isCollection ? ` ${styles.collectionGrid}` : ""}`}>
      {products.map((product, index) => {
        const card = <ProductCard
            product={product}
            href={getProductHref?.(product)}
            imageSizes={isCollection ? "(min-width: 1200px) 25vw, (min-width: 768px) 33vw, 50vw" : undefined}
            imageLoading={eagerFirstRow && index < 2 ? "eager" : "lazy"}
          />;
        return wishlistOnly ? <WishlistGridItem key={product.id} productId={product.id}>{card}</WishlistGridItem> : <li key={product.id}>{card}</li>;
      })}
    </ul>
  );
}
