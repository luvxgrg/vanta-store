import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import NewDrop from "@/components/sections/NewDrop";
import CategoryShowcase from "@/components/sections/CategoryShowcase";
import { categoryShowcase } from "@/data/categoryShowcase";
import { collections } from "@/data/collections";
import CampaignFeature from "@/components/sections/CampaignFeature";
import { formCampaign } from "@/data/campaignFeature";
import ShopTheLook from "@/components/sections/ShopTheLook";
import { formLook } from "@/data/shopTheLook";
import { products } from "@/data/products";
import Lookbook from "@/components/sections/Lookbook";
import { lookbookImages } from "@/data/lookbook";
import Manifesto from "@/components/sections/Manifesto";
import Newsletter from "@/components/sections/Newsletter";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <header>
        <AnnouncementBar />
        <Navbar />
      </header>
      <main>
        <Hero />
        <NewDrop />
        <CategoryShowcase items={categoryShowcase} collections={collections} />
        <CampaignFeature campaign={formCampaign} />
        <ShopTheLook look={formLook} products={products} />
        <Lookbook images={lookbookImages} />
        <Manifesto />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
