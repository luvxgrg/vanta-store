"use client";

import { useEffect, useRef } from "react";
import type { SizeGuide as SizeGuideData } from "@/data/productInformation";
import styles from "./product.module.css";
import Link from "next/link";
import SizeGuideContent from "./SizeGuideContent";

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
          if (event.key === "Tab") {
            const controls = [...event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]")];
            const first = controls[0], last = controls[controls.length - 1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
          }
        }}>
        <div className={styles.dialogHeader}>
          <h2 id="size-guide-title">SIZE GUIDE</h2>
          <button type="button" onClick={() => dialog.current?.close()} aria-label="Close size guide">CLOSE ×</button>
        </div>
        <SizeGuideContent guide={guide} />
        <Link href="/size-guide" className={styles.guideTrigger} onClick={() => dialog.current?.close()}>FULL SIZE GUIDE →</Link>
      </dialog>
    </>
  );
}
