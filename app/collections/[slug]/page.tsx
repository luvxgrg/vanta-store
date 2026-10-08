import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CollectionProducts from "@/components/commerce/CollectionProducts";
import CollectionFallback from "@/components/commerce/CollectionFallback";
import styles from "@/components/commerce/collection.module.css";
import { collections } from "@/data/collections";
import { resolveCollection } from "@/lib/resolveCollection";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export function generateStaticParams() {
  return collections.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolveCollection(slug);
  if (!resolved) notFound();
  return { title: resolved.collection.name, description: resolved.collection.description };
}

async function CollectionContent({ params, searchParams }: CollectionPageProps) {
  const { slug } = await params;
  const resolved = resolveCollection(slug);
  if (!resolved) notFound();

  return (
    <CollectionProducts collection={resolved.collection} products={resolved.products} searchParams={searchParams} />
  );
}

export default function CollectionPage({ params, searchParams }: CollectionPageProps) {
  return (
    <>
      <header>
        <AnnouncementBar />
        <Navbar />
      </header>
      <main className={styles.main}>
        <Suspense fallback={<CollectionFallback />}>
          <CollectionContent params={params} searchParams={searchParams} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
