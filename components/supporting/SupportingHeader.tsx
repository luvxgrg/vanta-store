import styles from "./supporting.module.css";

export default function SupportingHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <header className={styles.header}><p className={styles.eyebrow}>{eyebrow}</p><h1>{title}</h1>{description && <p className={styles.intro}>{description}</p>}</header>;
}
