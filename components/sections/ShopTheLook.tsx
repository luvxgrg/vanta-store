import Image from "next/image";
import Link from "next/link";
import type { ShopTheLookData } from "@/data/shopTheLook";
import type { Product } from "@/types/commerce";
import { formatCurrency } from "@/lib/formatCurrency";
import styles from "./shop-the-look.module.css";

interface ShopTheLookProps {
  look: ShopTheLookData;
  products: readonly Product[];
}

export default function ShopTheLook({ look, products }: ShopTheLookProps) {
  const pieces = look.productIds.map((id) => {
    const product = products.find((item) => item.id === id);
    if (!product) throw new Error(`Shop the Look ${look.id}: unknown product ${id}`);
    return product;
  });

  return (
    <section className={styles.section} aria-labelledby={`${look.id}-title`}>
      <h2 id={`${look.id}-title`} className={styles.heading}>SHOP THE LOOK</h2>
      <div className={styles.photograph}>
        <Image
          src={look.image.src}
          alt={look.image.alt}
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          className={styles.image}
          style={{ objectPosition: look.objectPosition }}
        />
      </div>
      <div className={styles.pieces}>
        <ol className={styles.list}>
          {pieces.map((product, index) => (
            <li key={product.id}>
              <Link href={`/products/${product.slug}`} className={styles.productLink}>
                <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div className={styles.productInfo}>
                  <h3>{product.name}</h3>
                  <div className={styles.meta}>
                    <p className={styles.color}>{product.colors.map((color) => color.name).join(" / ")}</p>
                    <p className={styles.price}>{formatCurrency(product.price, product.currency)}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
        <Link href={`/collections/${look.collectionSlug}`} className={styles.cta}>
          SHOP THE LOOK <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
