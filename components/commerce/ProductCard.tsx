import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/formatCurrency";
import type { Product } from "@/types/commerce";
import styles from "./commerce.module.css";
import WishlistButton from "@/components/wishlist/WishlistButton";

interface ProductCardProps {
  product: Product;
  href?: string;
  imageSizes?: string;
  imageLoading?: "eager" | "lazy";
}

export default function ProductCard({
  product,
  href = `/products/${product.slug}`,
  imageSizes = "(min-width: 1024px) 25vw, 50vw",
  imageLoading = "lazy",
}: ProductCardProps) {
  const [primaryImage] = product.images;
  const onSale = product.compareAtPrice !== undefined && product.compareAtPrice > product.price;
  const content = (
    <>
      <div className={styles.imageSurface}>
        {primaryImage ? (
            <Image
              src={primaryImage.src}
              alt={primaryImage.alt}
              fill
              sizes={imageSizes}
              loading={imageLoading}
              className={styles.productImage}
            />
        ) : (
          <div className={styles.productStudy} aria-hidden="true">
            <span>{product.category}</span>
            <span>PRODUCT STUDY</span>
          </div>
        )}
        {product.badges.length > 0 && (
          <ul className={styles.badges} aria-label="Product labels">
            {product.badges.map((badge) => <li key={badge}>{badge}</li>)}
          </ul>
        )}
      </div>
      <div className={styles.details}>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.meta}>
          <p className={styles.color}>{product.colors.map((color) => color.name).join(" / ")}</p>
          <p className={styles.price}>
            {onSale && (
              <>
                <span className={styles.srOnly}>Original price: </span>
                <s className={styles.comparePrice}>
                  {formatCurrency(product.compareAtPrice!, product.currency)}
                </s>
                <span className={styles.srOnly}>Current price: </span>
              </>
            )}
            <span>{formatCurrency(product.price, product.currency)}</span>
          </p>
        </div>
      </div>
    </>
  );

  return (
    <article className={styles.card}>
      {href ? <Link href={href} className={styles.cardLink}>{content}</Link> : content}
      <div className={styles.wishlistControl}><WishlistButton productId={product.id} label={`${product.name}, ${product.colors.map((color) => color.name).join(" / ")}`} compact /></div>
    </article>
  );
}
