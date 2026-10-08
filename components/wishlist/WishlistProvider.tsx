"use client";

import { createContext, useContext, useEffect, useReducer, type ReactNode } from "react";
import type { Product } from "@/types/commerce";
import { readWishlist, WISHLIST_STORAGE_KEY } from "@/lib/wishlist";

interface State { ids: string[]; ready: boolean }
type Action = { type: "restore"; ids: string[] } | { type: "add" | "remove" | "toggle"; id: string };
function reducer(state: State, action: Action): State {
  if (action.type === "restore") return { ids: action.ids, ready: true };
  const exists = state.ids.includes(action.id);
  if (action.type === "remove" || (action.type === "toggle" && exists)) return { ...state, ids: state.ids.filter((id) => id !== action.id) };
  return exists ? state : { ...state, ids: [...state.ids, action.id] };
}
interface WishlistContextValue {
  ready: boolean;
  wishlistCount: number;
  wishlistProducts: Product[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  toggleItem: (id: string) => void;
  isWishlisted: (id: string) => boolean;
}
const WishlistContext = createContext<WishlistContextValue | null>(null);
export function useWishlist() {
  const value = useContext(WishlistContext);
  if (!value) throw new Error("Wishlist controls require WishlistProvider.");
  return value;
}

export default function WishlistProvider({ catalogue, children }: { catalogue: readonly Product[]; children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { ids: [], ready: false });
  useEffect(() => {
    const ids = catalogue.map((product) => product.id);
    let restored: string[] = [];
    try { restored = readWishlist(localStorage.getItem(WISHLIST_STORAGE_KEY), ids); } catch { /* In-memory state remains available. */ }
    dispatch({ type: "restore", ids: restored });
    const synchronize = (event: StorageEvent) => {
      if (event.key === WISHLIST_STORAGE_KEY || event.key === null) dispatch({ type: "restore", ids: readWishlist(event.newValue, ids) });
    };
    window.addEventListener("storage", synchronize);
    return () => window.removeEventListener("storage", synchronize);
  }, [catalogue]);
  useEffect(() => {
    if (!state.ready) return;
    try {
      const serialized = JSON.stringify({ version: 1, productIds: state.ids });
      if (localStorage.getItem(WISHLIST_STORAGE_KEY) !== serialized) localStorage.setItem(WISHLIST_STORAGE_KEY, serialized);
    } catch { /* Saving is optional when browser storage is denied. */ }
  }, [state]);
  function operate(type: "add" | "remove" | "toggle", id: string) {
    if (state.ready && catalogue.some((product) => product.id === id)) dispatch({ type, id });
  }
  return <WishlistContext.Provider value={{ ready: state.ready, wishlistCount: state.ids.length,
    wishlistProducts: state.ids.flatMap((id) => { const product = catalogue.find((entry) => entry.id === id); return product ? [product] : []; }),
    addItem: (id) => operate("add", id), removeItem: (id) => operate("remove", id), toggleItem: (id) => operate("toggle", id), isWishlisted: (id) => state.ids.includes(id),
  }}>{children}</WishlistContext.Provider>;
}
