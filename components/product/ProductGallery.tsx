import Image from "next/image";
import type { Product } from "@/types/commerce";
import styles from "./product.module.css";

export default function ProductGallery({ product }: { product: Product }) {
  const images = product.images.filter((image, index, all) => all.findIndex((entry) => entry.src === image.src) === index);
  return (
    <div className={`${styles.gallery} ${images.length > 1 ? styles.multiple : ""}`} aria-label={`${product.name} imagery`}>
      {images.length ? images.map((image, index) => (
        <div className={styles.imagePanel} key={image.src}>
          <Image src={image.src} alt={image.alt} fill
            sizes={images.length > 1 ? "(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 60vw, 100vw"}
            className={styles.image} preload={index === 0} />
        </div>
      )) : (
        <div className={`${styles.imagePanel} ${styles.study}`}>
          <span>{product.category}</span><span>PRODUCT STUDY</span>
        </div>
      )}
    </div>
  );
}
