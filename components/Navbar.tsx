import Link from "next/link";
import { storeConfig } from "@/config/store";
import { primaryNavigation } from "@/data/navigation";
import styles from "./storefront.module.css";
import BagTrigger from "./cart/BagTrigger";

const utilities = ["SEARCH", "WISHLIST"];

export default function Navbar() {
  return (
    <nav className={styles.navbar} aria-label="Primary">
      <Link href="/" className={styles.wordmark} aria-label={`${storeConfig.name} home`}>
        {storeConfig.name}<sup>®</sup>
      </Link>
      <ul className={styles.categories}>
        {primaryNavigation.map((item) => (
          <li key={item.id}>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <a role="link" aria-disabled="true" title="Coming soon">
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
      <BagTrigger mobile />
      <ul className={styles.utilities}>
        {utilities.map((label) => (
          <li key={label}>
            <a role="link" aria-disabled="true" title="Coming soon">
              {label}
            </a>
          </li>
        ))}
        <li><BagTrigger /></li>
      </ul>
      <button
        type="button"
        className={styles.menu}
        disabled
        title="Mobile navigation coming soon"
      >
        MENU
      </button>
    </nav>
  );
}
