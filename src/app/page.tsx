import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FeaturedMenu from "@/components/FeaturedMenu";
import About from "@/components/About";
import UpcomingEvents from "@/components/UpcomingEvents";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturedMenu />
      <About />
      <UpcomingEvents />
    </>
  );
}