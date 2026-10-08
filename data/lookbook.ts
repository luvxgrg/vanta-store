import type { ProductImage } from "@/types/commerce";

export interface LookbookImage {
  id: string;
  image: ProductImage;
  composition: "detail" | "portrait" | "editorial" | "closing";
  objectPosition: string;
}

export const lookbookImages: LookbookImage[] = [
  {
    id: "look-01",
    image: { src: "/images/vanta/products/image-02.jpg", alt: "Close-up of the neckline and dropped sleeves of an oversized black T-shirt" },
    composition: "detail",
    objectPosition: "55% 50%",
  },
  {
    id: "look-02",
    image: { src: "/images/vanta/products/image-05.jpg", alt: "Model wearing a white oversized T-shirt and sunglasses against a dark background" },
    composition: "portrait",
    objectPosition: "50% 40%",
  },
  {
    id: "look-03",
    image: { src: "/images/vanta/products/image-07.jpg", alt: "Model in a graphic black T-shirt and detailed jeans standing in a shop aisle" },
    composition: "editorial",
    objectPosition: "50% 40%",
  },
  {
    id: "look-04",
    image: { src: "/images/vanta/products/image-11.jpg", alt: "Model pulling on a muted green jacket over a black graphic T-shirt and shorts" },
    composition: "closing",
    objectPosition: "50% 35%",
  },
];
