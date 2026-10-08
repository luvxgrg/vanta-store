import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { storeConfig } from "@/config/store";
import "./globals.css";
import CartProvider from "@/components/cart/CartProvider";
import WishlistProvider from "@/components/wishlist/WishlistProvider";
import { products } from "@/data/products";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${storeConfig.name} | Form Over Noise`,
    template: `%s | ${storeConfig.name}`,
  },
  description: storeConfig.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><WishlistProvider catalogue={products}><CartProvider catalogue={products} currency={storeConfig.currency}>{children}</CartProvider></WishlistProvider></body>
    </html>
  );
}
