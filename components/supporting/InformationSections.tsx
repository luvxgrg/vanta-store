import styles from "./supporting.module.css";
export interface InformationSection { title: string; copy: string }
export default function InformationSections({ sections }: { sections: readonly InformationSection[] }) {
  return <div className={styles.sections}>{sections.map((section) => <section key={section.title} className={styles.row}><h2>{section.title}</h2><p>{section.copy}</p></section>)}</div>;
}
