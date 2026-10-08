import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/commerce/ProductGrid";
import WishlistView from "@/components/wishlist/WishlistView";
import styles from "@/components/wishlist/wishlist.module.css";
import { products } from "@/data/products";

export const metadata: Metadata = { title: "Wishlist", description: "Your saved VANTA pieces." };
export default function WishlistPage() {
  return <><header><AnnouncementBar /><Navbar /></header><main className={styles.main}><WishlistView><ProductGrid products={products} variant="collection" wishlistOnly /></WishlistView></main><Footer /></>;
}
