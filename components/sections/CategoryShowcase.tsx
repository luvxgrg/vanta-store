import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/types/commerce";
import type { CategoryShowcaseItem } from "@/data/categoryShowcase";
import styles from "./category-showcase.module.css";

interface CategoryShowcaseProps {
  items: readonly CategoryShowcaseItem[];
  collections: readonly Collection[];
}

export default function CategoryShowcase({ items, collections }: CategoryShowcaseProps) {
  return (
    <section className={styles.section} aria-labelledby="category-showcase-title">
      <h2 id="category-showcase-title" className={styles.heading}>SHOP BY CATEGORY</h2>
      <ul className={styles.grid}>
        {items.map((item) => {
          const collection = collections.find((entry) => entry.slug === item.collectionSlug);
          if (!collection) return null;

          return (
            <li key={collection.id} className={item.emphasis === "dominant" ? styles.dominant : undefined}>
              <Link href={`/collections/${collection.slug}`} className={styles.categoryLink}>
                <div className={styles.imagePanel}>
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes={item.emphasis === "dominant"
                      ? "(min-width: 768px) 58vw, 100vw"
                      : "(min-width: 768px) 42vw, 100vw"}
                    className={styles.image}
                    style={{ objectPosition: item.objectPosition }}
                  />
                </div>
                <div className={styles.caption}>
                  <h3>{collection.name}</h3>
                  <span className={styles.explore}>EXPLORE <span aria-hidden="true">↗</span></span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
