"use client";

import { useEffect, useRef } from "react";
import type { SizeGuide as SizeGuideData } from "@/data/productInformation";
import styles from "./product.module.css";

export default function SizeGuide({ guide }: { guide: SizeGuideData }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const overflow = useRef<string | null>(null);

  useEffect(() => () => {
    if (overflow.current !== null) document.body.style.overflow = overflow.current;
  }, []);

  function open() {
    overflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
  }

  function closed() {
    if (overflow.current !== null) document.body.style.overflow = overflow.current;
    overflow.current = null;
    trigger.current?.focus({ preventScroll: true });
  }

  return (
    <>
      <button ref={trigger} type="button" className={styles.guideTrigger} onClick={open} aria-haspopup="dialog" aria-controls="size-guide">SIZE GUIDE ↗</button>
      <dialog ref={dialog} id="size-guide" className={styles.dialog} aria-labelledby="size-guide-title" onClose={closed}
        onKeyDown={(event) => {
          if (event.key === "Escape") { event.preventDefault(); dialog.current?.close(); }
          if (event.key === "Tab") { event.preventDefault(); event.currentTarget.querySelector<HTMLButtonElement>("button")?.focus(); }
        }}>
        <div className={styles.dialogHeader}>
          <h2 id="size-guide-title">SIZE GUIDE</h2>
          <button type="button" onClick={() => dialog.current?.close()} aria-label="Close size guide">CLOSE ×</button>
        </div>
        <table className={styles.table}>
          <caption>{guide.title}</caption>
          <thead><tr><th scope="col">Size</th>{guide.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
          <tbody>{guide.rows.map((row) => <tr key={row.size}><th scope="row">{row.size}</th>{row.measurements.map((value, index) => <td key={guide.columns[index]}>{value}</td>)}</tr>)}</tbody>
        </table>
        <p className={styles.guideNote}>{guide.note}</p>
      </dialog>
    </>
  );
}
