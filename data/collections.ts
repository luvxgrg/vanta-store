import { products } from "@/data/products";
import type { Collection } from "@/types/commerce";

export const collections: Collection[] = [
  {
    id: "vanta-drop-001",
    slug: "drop-001-form",
    name: "DROP 001 — FORM",
    description: "The first VANTA concept drop: form, proportion and movement.",
    productIds: products.map((product) => product.id),
  },
  {
    id: "vanta-tees",
    slug: "tees",
    name: "TEES",
    description: "Oversized essentials and restrained graphic concepts.",
    productIds: products.filter((product) => product.category === "tees").map((product) => product.id),
  },
  {
    id: "vanta-tops",
    slug: "tops",
    name: "TOPS",
    description: "Long sleeves and overshirts for considered layering.",
    productIds: products.filter((product) => product.category === "tops").map((product) => product.id),
  },
  {
    id: "vanta-bottoms",
    slug: "bottoms",
    name: "BOTTOMS",
    description: "Wide, relaxed and utility-inspired silhouettes.",
    productIds: products.filter((product) => product.category === "bottoms").map((product) => product.id),
  },
  {
    id: "vanta-layers",
    slug: "layers",
    name: "LAYERS",
    description: "Hoodies and outerwear with a focus on shape.",
    productIds: products.filter((product) => product.category === "layers").map((product) => product.id),
  },
];
