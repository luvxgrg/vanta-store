import { storeConfig } from "@/config/store";
import type { Product, ProductImage } from "@/types/commerce";

interface ConceptProduct {
  id: string;
  slug: string;
  name: string;
  color: string;
  category: string;
  price: number;
  shortDescription: string;
  description: string;
  featured: boolean;
  images?: ProductImage[];
}

// Fictional catalogue and pricing for the portfolio concept.
// Descriptions express design intent, not verified manufacturing claims.
const catalogue: ConceptProduct[] = [
  {
    id: "vanta-001",
    slug: "form-heavyweight-tee-black",
    images: [{ src: "/images/vanta/products/image-01.jpg", alt: "Model wearing an oversized black T-shirt against a light grey studio background" }],
    name: "Form Heavyweight Tee",
    color: "Black",
    category: "tees",
    price: 1499,
    shortDescription: "An oversized tee with a structured silhouette.",
    description: "A heavyweight tee concept with dropped shoulders and a generous body, designed around proportion and everyday layering.",
    featured: true,
  },
  {
    id: "vanta-002",
    slug: "form-heavyweight-tee-bone",
    images: [{ src: "/images/vanta/products/image-04.jpg", alt: "Model wearing an oversized white T-shirt and grey shorts against a dark studio background" }],
    name: "Form Heavyweight Tee",
    color: "Bone",
    category: "tees",
    price: 1499,
    shortDescription: "The Form silhouette in a warm neutral tone.",
    description: "An oversized heavyweight tee concept in bone, pairing a substantial silhouette with restrained detailing.",
    featured: true,
  },
  {
    id: "vanta-003",
    slug: "structure-graphic-tee-washed-black",
    images: [{ src: "/images/vanta/products/image-06.jpg", alt: "Crouching model wearing a black T-shirt with large grey and colored graphics" }],
    name: "Structure Graphic Tee",
    color: "Washed Black",
    category: "tees",
    price: 1799,
    shortDescription: "A relaxed graphic tee with architectural influence.",
    description: "A washed-black tee concept combining a relaxed shape with graphics inspired by architectural forms.",
    featured: true,
  },
  {
    id: "vanta-004",
    slug: "negative-space-tee-concrete",
    images: [{ src: "/images/vanta/products/image-09.jpg", alt: "Rear view of a model wearing a plain grey T-shirt against a neutral studio background" }],
    name: "Negative Space Tee",
    color: "Concrete",
    category: "tees",
    price: 1599,
    shortDescription: "A minimal tee shaped around space and proportion.",
    description: "A concrete-grey tee concept with an easy silhouette and considered negative space in its graphic direction.",
    featured: true,
  },
  {
    id: "vanta-005",
    slug: "division-overshirt-black",
    name: "Division Overshirt",
    color: "Black",
    category: "tops",
    price: 2999,
    shortDescription: "A relaxed overshirt for considered layering.",
    description: "A black overshirt concept with a roomy shape and a clean front, designed to layer over the Form tees.",
    featured: false,
  },
  {
    id: "vanta-006",
    slug: "form-long-sleeve-bone",
    name: "Form Long Sleeve",
    color: "Bone",
    category: "tops",
    price: 1999,
    shortDescription: "An extended Form silhouette in bone.",
    description: "A long-sleeve top concept carrying the relaxed proportions of Form into a versatile layering piece.",
    featured: false,
  },
  {
    id: "vanta-007",
    slug: "wide-structure-trouser-black",
    name: "Wide Structure Trouser",
    color: "Black",
    category: "bottoms",
    price: 3299,
    shortDescription: "Wide-leg trousers with a deliberate drape.",
    description: "A black trouser concept with a wide leg and an understated profile, designed to balance oversized tops.",
    featured: false,
  },
  {
    id: "vanta-008",
    slug: "utility-cargo-charcoal",
    name: "Utility Cargo",
    color: "Charcoal",
    category: "bottoms",
    price: 3499,
    shortDescription: "Utility-inspired trousers in charcoal.",
    description: "A cargo trouser concept with a relaxed leg and functional pocket placement as its design direction.",
    featured: false,
  },
  {
    id: "vanta-009",
    slug: "relaxed-sweatpant-concrete",
    name: "Relaxed Sweatpant",
    color: "Concrete",
    category: "bottoms",
    price: 2499,
    shortDescription: "A relaxed foundation for everyday dressing.",
    description: "A concrete-grey sweatpant concept with generous proportions and a simple silhouette for casual layering.",
    featured: false,
  },
  {
    id: "vanta-010",
    slug: "form-zip-hoodie-black",
    name: "Form Zip Hoodie",
    color: "Black",
    category: "layers",
    price: 3499,
    shortDescription: "A roomy zip layer with a clean profile.",
    description: "A black zip hoodie concept designed around a generous body and uncomplicated layering.",
    featured: false,
  },
  {
    id: "vanta-011",
    slug: "structure-hoodie-washed-grey",
    name: "Structure Hoodie",
    color: "Washed Grey",
    category: "layers",
    price: 3299,
    shortDescription: "An oversized pullover in washed grey.",
    description: "A pullover hoodie concept with a substantial shape and a washed-grey palette informed by concrete surfaces.",
    featured: false,
  },
  {
    id: "vanta-012",
    slug: "technical-bomber-black",
    name: "Technical Bomber",
    color: "Black",
    category: "layers",
    price: 4999,
    shortDescription: "A bomber silhouette with technical design cues.",
    description: "A black bomber concept with a rounded silhouette and restrained utility detailing, intended as the drop's outer layer.",
    featured: false,
  },
];

export const products: Product[] = catalogue.map((item, index) => {
  const sizes = ["S", "M", "L", "XL", "XXL"];

  return {
    id: item.id,
    slug: item.slug,
    name: item.name,
    shortDescription: item.shortDescription,
    description: item.description,
    price: item.price,
    currency: storeConfig.currency,
    images: item.images ?? [],
    category: item.category,
    // This concept catalogue uses shared silhouettes for all audiences.
    audience: "unisex",
    collectionSlugs: ["drop-001-form", item.category],
    colors: [{ name: item.color }],
    sizes,
    options: [
      { name: "Color", values: [item.color] },
      { name: "Size", values: sizes },
    ],
    variants: sizes.map((size) => ({
      id: `${item.id}-${size.toLowerCase()}`,
      optionValues: { Color: item.color, Size: size },
    })),
    badges: ["NEW"],
    featured: item.featured,
    bestseller: false,
    newArrival: true,
    catalogueOrder: index + 1,
    // Inventory has not been connected for this concept catalogue.
    availability: "unknown",
    details: [item.shortDescription, "Part of Drop 001 / Form.", "Unisex concept silhouette."],
    composition: "Final fibre composition and fabric specifications are not confirmed for this concept piece.",
    care: ["Care instructions will be confirmed with the final garment label."],
    sizeGuideId: item.category === "bottoms" ? "bottoms" : "oversized",
  };
});
