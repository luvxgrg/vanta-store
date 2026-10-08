import { storeConfig } from "@/config/store";
import styles from "./storefront.module.css";
import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className={styles.announcement}>
      <p className={styles.shipping}>{storeConfig.announcement.shipping}</p>
      <p><Link href="/collections/drop-001-form">{storeConfig.announcement.campaign}</Link></p>
      <p className={styles.currency}>{storeConfig.announcement.market}</p>
    </div>
  );
}
