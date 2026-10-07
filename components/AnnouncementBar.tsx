import { storeConfig } from "@/config/store";
import styles from "./storefront.module.css";

export default function AnnouncementBar() {
  return (
    <div className={styles.announcement}>
      <p className={styles.shipping}>{storeConfig.announcement.shipping}</p>
      <p>{storeConfig.announcement.campaign}</p>
      <p className={styles.currency}>{storeConfig.announcement.market}</p>
    </div>
  );
}
