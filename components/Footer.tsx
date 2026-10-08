import Link from "next/link";
import { storeConfig } from "@/config/store";
import { primaryNavigation, type NavigationItem } from "@/data/navigation";
import styles from "./footer.module.css";

const groups: { title: string; items: readonly NavigationItem[] }[] = [
  { title: "SHOP", items: primaryNavigation },
  { title: "INFO", items: [
    { id: "about", label: "About", href: "/about" },
    { id: "shipping", label: "Shipping", href: "/shipping" },
    { id: "returns", label: "Returns", href: "/returns" },
    { id: "contact", label: "Contact", href: "/contact" },
    { id: "size-guide", label: "Size Guide", href: "/size-guide" },
  ] },
  { title: "FOLLOW", items: [
    { id: "instagram", label: "Instagram" },
    { id: "pinterest", label: "Pinterest" },
  ] },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Link href="/" className={styles.wordmark} aria-label={`${storeConfig.name} home`}>{storeConfig.name}</Link>
          <p>{storeConfig.tagline}</p>
        </div>
        <nav className={styles.groups} aria-label="Footer">
          {groups.map((group) => (
            <div key={group.title}>
              <h2>{group.title}</h2>
              <ul>
                {group.items.map((item) => (
                  <li key={item.id}>
                    {item.href ? <Link href={item.href}>{item.label}</Link> : (
                      <a role="link" aria-disabled="true" title="Not available in this concept store">{item.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <p className={styles.bottom}>© 2026 {storeConfig.name} — CONCEPT STORE</p>
    </footer>
  );
}
