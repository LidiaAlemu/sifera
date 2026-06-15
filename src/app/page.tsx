import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FeaturedMenu from "@/components/FeaturedMenu";
import About from "@/components/About";
import UpcomingEvents from "@/components/UpcomingEvents";
import BooksPreview from "@/components/BooksPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturedMenu />
      <About />
      <UpcomingEvents />
      <BooksPreview />
    </>
  );
}