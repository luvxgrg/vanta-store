import { storeConfig } from "@/config/store";
import styles from "./manifesto.module.css";

export default function Manifesto() {
  return (
    <section className={styles.section} aria-labelledby="manifesto-title">
      <p className={styles.eyebrow}>{storeConfig.name} / 001</p>
      <h2 id="manifesto-title" className={styles.statement}>CLOTHING WITHOUT THE NOISE.</h2>
      <div className={styles.copy}>
        <p>Built around proportion, movement and restraint.</p>
        <p>{storeConfig.name} explores everyday pieces through considered silhouettes, functional details and a quieter visual language.</p>
        <p className={styles.closing}>{storeConfig.tagline}</p>
      </div>
    </section>
  );
}
