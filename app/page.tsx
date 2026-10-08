import AnnouncementBar from "@/components/AnnouncementBar";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import NewDrop from "@/components/sections/NewDrop";
import CategoryShowcase from "@/components/sections/CategoryShowcase";
import { categoryShowcase } from "@/data/categoryShowcase";
import { collections } from "@/data/collections";

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
      </main>
    </>
  );
}
