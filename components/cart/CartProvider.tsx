"use client";

import { createContext, useContext, useEffect, useReducer, useRef, useState, type ReactNode } from "react";
import type { Product } from "@/types/commerce";
import type { CartLine, ResolvedCartLine } from "@/types/cart";
import { addCartItem, CART_STORAGE_KEY, cartLineKey, MAX_CART_QUANTITY, normalizeCartLines, readCartStorage, resolveCartLines, serializeCart } from "@/lib/cart";
import CartDrawer from "./CartDrawer";

interface CartState { items: CartLine[]; ready: boolean }
type CartAction = { type: "restore"; items: CartLine[] } | { type: "add"; item: CartLine } | { type: "remove"; key: string } | { type: "quantity"; key: string; quantity: number } | { type: "clear" };
function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "restore": return { items: action.items, ready: true };
    case "add": return { ...state, items: addCartItem(state.items, action.item) };
    case "remove": return { ...state, items: state.items.filter((line) => cartLineKey(line) !== action.key) };
    case "quantity": return { ...state, items: state.items.map((line) => cartLineKey(line) === action.key ? { ...line, quantity: action.quantity } : line) };
    case "clear": return { ...state, items: [] };
  }
}

interface CartContextValue {
  lines: ResolvedCartLine[];
  ready: boolean;
  totalQuantity: number;
  subtotal: number;
  addItem: (item: CartLine) => boolean;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  openBag: (trigger: HTMLButtonElement) => void;
}
const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("Cart controls must be rendered within CartProvider.");
  return context;
}

export default function CartProvider({ children, catalogue, currency }: { children: ReactNode; catalogue: readonly Product[]; currency: string }) {
  const [state, dispatch] = useReducer(reducer, { items: [], ready: false });
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    let items: CartLine[] = [];
    try { items = readCartStorage(window.localStorage.getItem(CART_STORAGE_KEY), catalogue); } catch { /* Storage may be unavailable; the in-memory bag still works. */ }
    dispatch({ type: "restore", items });
    const synchronize = (event: StorageEvent) => {
      if (event.key === CART_STORAGE_KEY || event.key === null) dispatch({ type: "restore", items: readCartStorage(event.newValue, catalogue) });
    };
    window.addEventListener("storage", synchronize);
    return () => window.removeEventListener("storage", synchronize);
  }, [catalogue]);

  useEffect(() => {
    if (!state.ready) return;
    try {
      const serialized = serializeCart(state.items);
      if (window.localStorage.getItem(CART_STORAGE_KEY) !== serialized) window.localStorage.setItem(CART_STORAGE_KEY, serialized);
    } catch { /* Keep the bag usable if persistence is denied or full. */ }
  }, [state]);

  const lines = resolveCartLines(state.items, catalogue);
  const value: CartContextValue = {
    lines,
    ready: state.ready,
    totalQuantity: lines.reduce((sum, entry) => sum + entry.line.quantity, 0),
    subtotal: lines.reduce((sum, entry) => sum + entry.unitPrice * entry.line.quantity, 0),
    addItem(item) {
      if (!state.ready) return false;
      const [validated] = normalizeCartLines([item], catalogue);
      const product = catalogue.find((entry) => entry.id === item.productId);
      if (!validated || product?.availability === "out-of-stock" || product?.currency !== currency) return false;
      if (state.items.some((line) => cartLineKey(line) === cartLineKey(item) && line.quantity >= MAX_CART_QUANTITY)) return false;
      dispatch({ type: "add", item: validated });
      return true;
    },
    removeItem: (key) => dispatch({ type: "remove", key }),
    updateQuantity(key, quantity) {
      if (Number.isSafeInteger(quantity) && quantity >= 1 && quantity <= MAX_CART_QUANTITY) dispatch({ type: "quantity", key, quantity });
    },
    clearCart: () => dispatch({ type: "clear" }),
    openBag(button) { trigger.current = button; setOpen(true); },
  };

  return <CartContext.Provider value={value}>{children}<CartDrawer open={open} currency={currency} onClose={() => setOpen(false)} returnFocus={trigger} /></CartContext.Provider>;
}
