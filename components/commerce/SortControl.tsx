"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { productSortOptions, type ProductSort } from "@/lib/productSort";
import styles from "./collection-toolbar.module.css";

export default function SortControl({ sort }: { sort: ProductSort }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function changeSort(value: string) {
    const url = new URL(window.location.href);
    url.searchParams.set("sort", value);
    startTransition(() => {
      router.push(`${url.pathname}${url.search}${url.hash}`, { scroll: false });
    });
  }

  return (
    <div className={styles.sortControl} aria-busy={isPending}>
      <label htmlFor="collection-sort">SORT</label>
      <select
        id="collection-sort"
        name="sort"
        value={sort}
        disabled={isPending}
        onChange={(event) => changeSort(event.target.value)}
      >
        {productSortOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}
