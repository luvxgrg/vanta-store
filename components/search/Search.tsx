"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { searchProducts, type SearchProduct } from "@/lib/productSearch";
import { formatCurrency } from "@/lib/formatCurrency";
import styles from "./search.module.css";

const popular = [
  { label: "TEES", slug: "tees" },
  { label: "LAYERS", slug: "layers" },
  { label: "BOTTOMS", slug: "bottoms" },
  { label: "DROP 001", slug: "drop-001-form" },
];

export default function Search({ products, mobile = false }: { products: readonly SearchProduct[]; mobile?: boolean }) {
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const overflow = useRef<string | null>(null);
  const [query, setQuery] = useState("");
  const results = searchProducts(products, query);

  useEffect(() => () => {
    if (overflow.current !== null) document.body.style.overflow = overflow.current;
  }, []);

  function open() {
    setQuery("");
    overflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    input.current?.focus();
  }

  function closed() {
    if (overflow.current !== null) document.body.style.overflow = overflow.current;
    overflow.current = null;
    trigger.current?.focus({ preventScroll: true });
  }

  return (
    <>
      <button ref={trigger} type="button" className={`${styles.trigger} ${mobile ? styles.mobile : ""}`} onClick={open} aria-haspopup="dialog" aria-controls={`${id}-dialog`}>SEARCH</button>
      <dialog ref={dialog} id={`${id}-dialog`} className={styles.panel} aria-labelledby={`${id}-title`} onClose={closed}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            dialog.current?.close();
            return;
          }
          if (event.key !== "Tab") return;
          const controls = [...event.currentTarget.querySelectorAll<HTMLElement>("button, input, a[href]")].filter((control) => control.getClientRects().length > 0);
          const first = controls[0], last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
        }}>
        <div className={styles.header}><h2 id={`${id}-title`}>SEARCH</h2><button type="button" aria-label="Close search" onClick={() => dialog.current?.close()}>×</button></div>
        <label htmlFor={`${id}-query`} className={styles.srOnly}>Search products by name, category or color</label>
        <input ref={input} id={`${id}-query`} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="WHAT ARE YOU LOOKING FOR?" autoComplete="off" spellCheck={false} className={styles.input} />
        {!query.trim() ? <div className={styles.popular}><h3>POPULAR</h3><ul>{popular.map((item) => <li key={item.slug}><Link href={`/collections/${item.slug}`} onClick={() => dialog.current?.close()}>{item.label}</Link></li>)}</ul></div> : <>
          <p className={styles.count} role="status">{results.length} {results.length === 1 ? "RESULT" : "RESULTS"}</p>
          {results.length ? <ul className={styles.results}>{results.map((product) => <li key={product.id}><Link href={`/products/${product.slug}`} onClick={() => dialog.current?.close()} className={styles.result}>
            <div className={styles.imagePanel}>{product.images[0] ? <Image src={product.images[0].src} alt={product.images[0].alt} fill sizes="72px" className={styles.image} /> : <span>PRODUCT<br />STUDY</span>}</div>
            <div className={styles.info}><h3>{product.name}</h3><div className={styles.meta}><p>{product.colors.map((color) => color.name).join(" / ")}</p><p>{formatCurrency(product.price, product.currency)}</p></div></div>
          </Link></li>)}</ul> : <p className={styles.empty}>NO MATCHING FORMS.<br /><span>Try a product name, category or color.</span></p>}
        </>}
      </dialog>
    </>
  );
}
