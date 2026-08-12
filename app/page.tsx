import { Hero } from "@/components/hero";
import { LifeStats } from "@/components/life-stats";
import { FeaturedMemories } from "@/components/featured-memories";

export default function Home() {
  return (
    <>
      <Hero />
      <LifeStats />
      <FeaturedMemories />
    </>
  );
}
