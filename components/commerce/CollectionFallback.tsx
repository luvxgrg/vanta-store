import collectionStyles from "./collection.module.css";
import gridStyles from "./commerce.module.css";
import toolbarStyles from "./collection-toolbar.module.css";
import styles from "./collection-fallback.module.css";

export function ProductGridFallback() {
  return (
    <div role="status" aria-label="Loading collection products" aria-busy="true">
      <div className={toolbarStyles.toolbar} aria-hidden="true">
        <span className={styles.shortLine} />
        <span className={styles.control} />
      </div>
      <ul className={`${gridStyles.grid} ${gridStyles.collectionGrid} ${styles.grid}`} aria-hidden="true">
        {[0, 1, 2, 3].map((index) => (
          <li key={index}>
            <div className={gridStyles.imageSurface} />
            <div className={gridStyles.details}>
              <span className={styles.productName} />
              <span className={styles.productMeta} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CollectionFallback() {
  return (
    <>
      <div className={collectionStyles.header} aria-hidden="true">
        <span className={`${collectionStyles.eyebrow} ${styles.shortLine}`} />
        <div className={styles.title} />
        <div className={`${collectionStyles.description} ${styles.description}`} />
        <span className={`${collectionStyles.count} ${styles.shortLine}`} />
      </div>
      <ProductGridFallback />
    </>
  );
}
