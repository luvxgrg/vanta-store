import { products } from "@/data/products";
import type { Collection } from "@/types/commerce";

export const collections: Collection[] = [
  {
    id: "vanta-new-in",
    slug: "new-in",
    name: "NEW IN",
    eyebrow: "COLLECTION / 001",
    description: "The latest forms from Drop 001. Considered pieces for everyday movement.",
    productIds: products.filter((product) => product.newArrival).map((product) => product.id),
  },
  {
    id: "vanta-men",
    slug: "men",
    name: "MEN",
    eyebrow: "COLLECTION / 002",
    description: "Shared silhouettes. Generous proportions and a restrained everyday wardrobe.",
    productIds: products.filter((product) => product.audience === "men" || product.audience === "unisex").map((product) => product.id),
  },
  {
    id: "vanta-women",
    slug: "women",
    name: "WOMEN",
    eyebrow: "COLLECTION / 003",
    description: "Shared silhouettes. Everyday forms shaped around space and movement.",
    productIds: products.filter((product) => product.audience === "women" || product.audience === "unisex").map((product) => product.id),
  },
  {
    id: "vanta-drop-001",
    slug: "drop-001-form",
    eyebrow: "DROP / 001",
    name: "DROP 001 — FORM",
    description: "The first VANTA concept drop: form, proportion and movement.",
    productIds: products.filter((product) => product.collectionSlugs.includes("drop-001-form")).map((product) => product.id),
  },
  {
    id: "vanta-tees",
    slug: "tees",
    eyebrow: "COLLECTION / 004",
    name: "TEES",
    description: "Oversized essentials and restrained graphic concepts.",
    productIds: products.filter((product) => product.category === "tees").map((product) => product.id),
  },
  {
    id: "vanta-tops",
    slug: "tops",
    eyebrow: "COLLECTION / 005",
    name: "TOPS",
    description: "Long sleeves and overshirts for considered layering.",
    productIds: products.filter((product) => product.category === "tops").map((product) => product.id),
  },
  {
    id: "vanta-bottoms",
    slug: "bottoms",
    eyebrow: "COLLECTION / 006",
    name: "BOTTOMS",
    description: "Wide, relaxed and utility-inspired silhouettes.",
    productIds: products.filter((product) => product.category === "bottoms").map((product) => product.id),
  },
  {
    id: "vanta-layers",
    slug: "layers",
    eyebrow: "COLLECTION / 007",
    name: "LAYERS",
    description: "Hoodies and outerwear with a focus on shape.",
    productIds: products.filter((product) => product.category === "layers").map((product) => product.id),
  },
];
