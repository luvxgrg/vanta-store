import type { Product } from "@/types/commerce";
import { resolveProductSort, sortProducts } from "@/lib/productSort";
import ProductGrid from "./ProductGrid";
import SortControl from "./SortControl";
import CollectionFilters from "./CollectionFilters";
import CollectionHeader from "./CollectionHeader";
import type { Collection } from "@/types/commerce";
import { filterProducts, getProductFilterOptions, resolveProductFilters } from "@/lib/productFilters";

interface CollectionProductsProps {
  products: readonly Product[];
  collection: Collection;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CollectionProducts({ products, collection, searchParams }: CollectionProductsProps) {
  const query = await searchParams;
  const sort = resolveProductSort(query.sort);
  const filters = resolveProductFilters(query);
  const matchingProducts = filterProducts(products, filters);
  const orderedProducts = sortProducts(matchingProducts, sort);

  return (
    <>
      <CollectionHeader collection={collection} productCount={matchingProducts.length} />
      <CollectionFilters
        filters={filters}
        options={getProductFilterOptions(products)}
        productCount={matchingProducts.length}
        currency={products[0]?.currency ?? "INR"}
      >
        <SortControl sort={sort} />
      </CollectionFilters>
      {orderedProducts.length > 0 && (
      <ProductGrid
        products={orderedProducts}
        variant="collection"
        getProductHref={(product) => `/products/${product.slug}`}
      />
      )}
    </>
  );
}
