import type { Product } from "@/types/commerce";
import { resolveProductSort, sortProducts } from "@/lib/productSort";
import ProductGrid from "./ProductGrid";
import SortControl from "./SortControl";
import styles from "./collection-toolbar.module.css";

interface CollectionProductsProps {
  products: readonly Product[];
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CollectionProducts({ products, searchParams }: CollectionProductsProps) {
  const sort = resolveProductSort((await searchParams).sort);
  const orderedProducts = sortProducts(products, sort);

  return (
    <>
      <div className={styles.toolbar}>
        <p className={styles.count}>
          {String(products.length).padStart(2, "0")} {products.length === 1 ? "PRODUCT" : "PRODUCTS"}
        </p>
        <SortControl sort={sort} />
      </div>
      <ProductGrid
        products={orderedProducts}
        variant="collection"
        getProductHref={(product) => `/products/${product.slug}`}
      />
    </>
  );
}
