import Link from "next/link";
import { storeConfig } from "@/config/store";
import { primaryNavigation } from "@/data/navigation";
import styles from "./storefront.module.css";
import BagTrigger from "./cart/BagTrigger";
import Search from "./search/Search";
import { products } from "@/data/products";
import WishlistLink from "./wishlist/WishlistLink";
import MobileMenu from "./MobileMenu";

const searchProducts = products.map(({ id, slug, name, colors, category, price, currency, images }) => ({ id, slug, name, colors, category, price, currency, images }));

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
        <li><Search products={searchProducts} /></li>
        <li><WishlistLink /></li>
        <li><BagTrigger /></li>
      </ul>
      <div className={styles.mobileControls}><Search products={searchProducts} mobile /><MobileMenu items={primaryNavigation} /></div>
    </nav>
  );
}
