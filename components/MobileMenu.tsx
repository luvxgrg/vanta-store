"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { NavigationItem } from "@/data/navigation";
import styles from "./mobile-menu.module.css";

export default function MobileMenu({ items }: { items: readonly NavigationItem[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const overflow = useRef<string | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 1024px)");
    const resize = () => { if (breakpoint.matches) dialog.current?.close(); };
    breakpoint.addEventListener("change", resize);
    return () => {
      breakpoint.removeEventListener("change", resize);
      if (overflow.current !== null) document.body.style.overflow = overflow.current;
    };
  }, []);
  function show() {
    overflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    setOpen(true);
  }
  function closed() {
    if (overflow.current !== null) document.body.style.overflow = overflow.current;
    overflow.current = null;
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  }
  return <><button ref={trigger} type="button" className={styles.trigger} aria-haspopup="dialog" aria-expanded={open} aria-controls="mobile-menu" onClick={show}>MENU</button>
    <dialog ref={dialog} id="mobile-menu" className={styles.panel} aria-labelledby="mobile-menu-title" onClose={closed} onKeyDown={(event) => {
      if (event.key === "Escape") { event.preventDefault(); dialog.current?.close(); }
      if (event.key !== "Tab") return;
      const controls = [...event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]")];
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}><header><h2 id="mobile-menu-title">VANTA / MENU</h2><button type="button" aria-label="Close menu" onClick={() => dialog.current?.close()}>CLOSE ×</button></header><nav aria-label="Mobile"><ul>{items.filter((item) => item.href).map((item) => <li key={item.id}><Link href={item.href!} onClick={() => dialog.current?.close()}>{item.label}</Link></li>)}<li><Link href="/wishlist" onClick={() => dialog.current?.close()}>WISHLIST</Link></li></ul></nav></dialog></>;
}
