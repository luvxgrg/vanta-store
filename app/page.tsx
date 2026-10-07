import AnnouncementBar from "@/components/AnnouncementBar";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import NewDrop from "@/components/sections/NewDrop";

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
      </main>
    </>
  );
}
