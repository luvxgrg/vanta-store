import type { ProductImage } from "@/types/commerce";

export interface ShopTheLookData {
  id: string;
  image: ProductImage;
  objectPosition: string;
  productIds: string[];
  collectionSlug: string;
}

export const formLook: ShopTheLookData = {
  id: "form-look-001",
  image: {
    src: "/images/vanta/products/image-08.jpg",
    alt: "Model wearing a grey T-shirt and black trousers beside a railing outside a brick building",
  },
  objectPosition: "50% 55%",
  productIds: ["vanta-004", "vanta-007"],
  collectionSlug: "drop-001-form",
};
