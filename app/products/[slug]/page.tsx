import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/product/ProductDetail";
import styles from "@/components/product/product.module.css";
import { products } from "@/data/products";
import { resolveProduct } from "@/lib/resolveProduct";

interface ProductPageProps { params: Promise<{ slug: string }> }

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = resolveProduct((await params).slug);
  if (!product) notFound();
  return { title: `${product.name} — ${product.colors.map((color) => color.name).join(" / ")}`, description: product.shortDescription };
}

async function ProductContent({ params }: ProductPageProps) {
  const product = resolveProduct((await params).slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}

function ProductFallback() {
  return <div className={styles.layout} role="status" aria-label="Loading product" aria-busy="true"><div className={`${styles.imagePanel} ${styles.placeholder}`} /><div className={styles.loadingInfo} aria-hidden="true" /></div>;
}

export default function ProductPage({ params }: ProductPageProps) {
  return <><header><AnnouncementBar /><Navbar /></header><main className={styles.main}><Suspense fallback={<ProductFallback />}><ProductContent params={params} /></Suspense></main><Footer /></>;
}
