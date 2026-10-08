import type { SizeGuide } from "@/data/productInformation";
import styles from "./product.module.css";
export default function SizeGuideContent({ guide }: { guide: SizeGuide }) {
  return <><table className={styles.table}><caption>{guide.title}</caption><thead><tr><th scope="col">Size</th>{guide.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead><tbody>{guide.rows.map((row) => <tr key={row.size}><th scope="row">{row.size}</th>{row.measurements.map((value, index) => <td key={guide.columns[index]}>{value}</td>)}</tr>)}</tbody></table><p className={styles.guideNote}>{guide.note}</p></>;
}
