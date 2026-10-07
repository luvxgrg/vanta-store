import Image from "next/image";
import { storeConfig } from "@/config/store";
import styles from "./storefront.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="campaign-title">
      <div className={styles.campaignVisual}>
        <Image
          src="/images/vanta/campaign/hero.jpg"
          alt="VANTA streetwear campaign in a concrete architectural setting"
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          preload
          className={styles.campaignImage}
        />
        <p className={styles.visualBrand}>{storeConfig.name}</p>
        <p className={styles.visualCaption}>CAMPAIGN 001</p>
      </div>
      <div className={styles.heroContent}>
        <p className={styles.dropLabel}>DROP 001 / FORM</p>
        <h1 id="campaign-title" className={styles.headline}>
          <span>FORM</span>
          <span>OVER</span>
          <span>NOISE.</span>
        </h1>
        <p className={styles.description}>
          Clothing reduced to what matters: form, proportion and movement.
        </p>
        <a
          className={styles.shopLink}
          role="link"
          aria-disabled="true"
          title="Drop shopping coming soon"
        >
          SHOP THE DROP <span aria-hidden="true">→</span>
        </a>
        <p className={styles.marker}>01 / 26</p>
      </div>
    </section>
  );
}
