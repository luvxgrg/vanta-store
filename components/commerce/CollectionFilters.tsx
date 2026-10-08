"use client";

import { useEffect, useRef, useState, useTransition, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  emptyProductFilters, filterGroups, writeProductFilters,
  type FilterGroup, type ProductFilters, type ProductFilterOptions,
} from "@/lib/productFilters";
import styles from "./collection-filters.module.css";
import toolbarStyles from "./collection-toolbar.module.css";

interface CollectionFiltersProps {
  filters: ProductFilters;
  options: ProductFilterOptions;
  productCount: number;
  currency: string;
  children: ReactNode;
}

const groupLabels: Record<FilterGroup, string> = {
  category: "Category", color: "Color", size: "Size", availability: "Availability",
};

export default function CollectionFilters({ filters, options, productCount, currency, children }: CollectionFiltersProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(filters);
  const [error, setError] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef<string | null>(null);

  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 768px)");
    const closeOnResize = () => dialog.current?.close();
    breakpoint.addEventListener("change", closeOnResize);
    return () => {
      breakpoint.removeEventListener("change", closeOnResize);
      if (previousOverflow.current !== null) document.body.style.overflow = previousOverflow.current;
    };
  }, []);

  function closed() {
    setOpen(false);
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
    trigger.current?.focus({ preventScroll: true });
  }

  function togglePanel() {
    if (dialog.current?.open) {
      dialog.current.close();
      return;
    }
    setDraft(filters);
    setError("");
    if (window.matchMedia("(max-width: 767px)").matches) {
      previousOverflow.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      dialog.current?.showModal();
    } else {
      dialog.current?.show();
    }
    setOpen(true);
  }

  function navigate(next: ProductFilters) {
    const url = new URL(window.location.href);
    const query = writeProductFilters(url.searchParams, next).toString();
    startTransition(() => router.push(`${url.pathname}${query ? `?${query}` : ""}${url.hash}`, { scroll: false }));
  }

  function toggleValue(group: FilterGroup, value: string) {
    setDraft((current) => ({
      ...current,
      [group]: current[group].includes(value) ? current[group].filter((entry) => entry !== value) : [...current[group], value],
    }));
  }

  function apply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (draft.minPrice !== undefined && draft.maxPrice !== undefined && draft.minPrice > draft.maxPrice) {
      setError("Minimum price must not exceed maximum price.");
      return;
    }
    navigate(draft);
    dialog.current?.close();
  }

  function clearAll() {
    const empty = emptyProductFilters();
    setDraft(empty);
    setError("");
    navigate(empty);
  }

  const active = filterGroups.flatMap((group) => filters[group].map((value) => ({
    key: `${group}:${value}`,
    label: `${groupLabels[group]}: ${options[group].find((option) => option.value === value)?.label ?? value}`,
    remove: () => navigate({ ...filters, [group]: filters[group].filter((entry) => entry !== value) }),
  })));
  if (filters.minPrice !== undefined) active.push({ key: "min-price", label: `Min: ${filters.minPrice} ${currency}`, remove: () => navigate({ ...filters, minPrice: undefined }) });
  if (filters.maxPrice !== undefined) active.push({ key: "max-price", label: `Max: ${filters.maxPrice} ${currency}`, remove: () => navigate({ ...filters, maxPrice: undefined }) });

  return (
    <div aria-busy={isPending}>
      <div className={`${toolbarStyles.toolbar} ${styles.toolbar}`}>
        <p className={toolbarStyles.count} role="status">
          {String(productCount).padStart(2, "0")} {productCount === 1 ? "PRODUCT" : "PRODUCTS"}
        </p>
        <button ref={trigger} type="button" className={styles.trigger} onClick={togglePanel} aria-expanded={open} aria-controls="collection-filter-panel">
          FILTER{active.length > 0 ? ` (${active.length})` : ""}
        </button>
        {children}
      </div>

      <dialog ref={dialog} id="collection-filter-panel" className={styles.panel} aria-labelledby="filter-title" onClose={closed}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            dialog.current?.close();
          }
          if (event.key === "Tab" && event.currentTarget.matches(":modal")) {
            const controls = [...event.currentTarget.querySelectorAll<HTMLElement>("button:not(:disabled), input:not(:disabled)")]
              .filter((control) => control.getClientRects().length > 0);
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first?.focus();
            }
          }
        }}>
        <form onSubmit={apply}>
          <div className={styles.panelHeader}>
            <h2 id="filter-title">FILTER</h2>
            <button type="button" onClick={() => dialog.current?.close()} aria-label="Close filters">CLOSE ×</button>
          </div>
          <div className={styles.groups}>
            {filterGroups.map((group) => (
              <fieldset key={group}>
                <legend>{groupLabels[group]}</legend>
                {options[group].map((option) => (
                  <label key={option.value} className={styles.choice}>
                    <input type="checkbox" checked={draft[group].includes(option.value)} onChange={() => toggleValue(group, option.value)} />
                    <span>{option.label}</span>
                  </label>
                ))}
              </fieldset>
            ))}
            <fieldset>
              <legend>Price / {currency}</legend>
              <div className={styles.priceFields}>
                <label>Minimum
                  <input type="number" min="0" step="any" inputMode="decimal" value={draft.minPrice ?? ""}
                    onChange={(event) => { setError(""); setDraft((current) => ({ ...current, minPrice: event.target.value === "" ? undefined : Number(event.target.value) })); }} />
                </label>
                <label>Maximum
                  <input type="number" min="0" step="any" inputMode="decimal" value={draft.maxPrice ?? ""}
                    onChange={(event) => { setError(""); setDraft((current) => ({ ...current, maxPrice: event.target.value === "" ? undefined : Number(event.target.value) })); }} />
                </label>
              </div>
              {error && <p role="alert" className={styles.error}>{error}</p>}
            </fieldset>
          </div>
          <div className={styles.actions}>
            <button type="button" disabled={isPending} onClick={clearAll}>CLEAR ALL</button>
            <button type="submit" disabled={isPending}>VIEW RESULTS →</button>
          </div>
        </form>
      </dialog>

      {active.length > 0 && (
        <div className={styles.active} aria-label="Active filters">
          {active.map((filter) => <button key={filter.key} type="button" disabled={isPending} onClick={filter.remove} aria-label={`Remove ${filter.label}`}>{filter.label} <span aria-hidden="true">×</span></button>)}
          <button type="button" disabled={isPending} onClick={clearAll}>CLEAR ALL</button>
        </div>
      )}
      {productCount === 0 && (
        <div className={styles.empty}>
          <h2>NO MATCHING FORMS.</h2>
          <p>Try another combination or clear your filters.</p>
          <button type="button" disabled={isPending} onClick={clearAll}>RESET FILTERS →</button>
        </div>
      )}
    </div>
  );
}
