import Image from "next/image";
import type { LookbookImage } from "@/data/lookbook";
import styles from "./lookbook.module.css";

const imageSizes = {
  detail: "(min-width: 768px) 58vw, 100vw",
  portrait: "(min-width: 768px) 33vw, 80vw",
  editorial: "(min-width: 768px) 67vw, 100vw",
  closing: "(min-width: 768px) 25vw, 75vw",
};

export default function Lookbook({ images }: { images: readonly LookbookImage[] }) {
  return (
    <section className={styles.section} aria-labelledby="lookbook-title">
      <div className={styles.heading}>
        <h2 id="lookbook-title">LOOKBOOK</h2>
        <p>DROP 001 / FORM</p>
      </div>
      <div className={styles.gallery}>
        {images.map((item, index) => (
          <figure key={item.id} className={`${styles.frame} ${styles[item.composition]}`}>
            <div className={styles.imagePanel}>
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes={imageSizes[item.composition]}
                className={styles.image}
                style={{ objectPosition: item.objectPosition }}
              />
            </div>
            <figcaption>LOOK {String(index + 1).padStart(2, "0")}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
