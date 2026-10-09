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
  metadataBase: new URL("https://vanta-store-drab.vercel.app"),
  title: {
    default: `${storeConfig.name} | Form Over Noise`,
    template: `%s | ${storeConfig.name}`,
  },
  description: storeConfig.description,
  openGraph: {
    type: "website",
    siteName: storeConfig.name,
    title: `${storeConfig.name} | Form Over Noise`,
    description: storeConfig.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${storeConfig.name} | Form Over Noise`,
    description: storeConfig.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "VANTA — Form Over Noise." }],
  },
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
