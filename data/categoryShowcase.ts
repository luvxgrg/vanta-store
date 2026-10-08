import type { ProductImage } from "@/types/commerce";

export interface CategoryShowcaseItem {
  collectionSlug: string;
  image: ProductImage;
  objectPosition: string;
  emphasis?: "dominant";
}

// Temporary editorial photography, separate from the commerce catalogue.
export const categoryShowcase: CategoryShowcaseItem[] = [
  {
    collectionSlug: "tees",
    image: {
      src: "/images/vanta/products/image-03.jpg",
      alt: "Model wearing a plain oversized black T-shirt outside a brick building",
    },
    objectPosition: "50% 40%",
    emphasis: "dominant",
  },
  {
    collectionSlug: "bottoms",
    image: {
      src: "/images/vanta/products/image-13.jpg",
      alt: "Model in beige trousers and black boots leaning against a wooden panel",
    },
    objectPosition: "50% 75%",
  },
  {
    collectionSlug: "layers",
    image: {
      src: "/images/vanta/products/image-12.jpg",
      alt: "Model wearing a black jacket layered over a white T-shirt",
    },
    objectPosition: "60% 45%",
  },
];
