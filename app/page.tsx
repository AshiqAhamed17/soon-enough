import { Hero } from "@/components/hero";
import { LifeStats } from "@/components/life-stats";
import { QuoteBanner } from "@/components/quote-banner";
import { FeaturedMemories } from "@/components/featured-memories";

export default function Home() {
  return (
    <>
      <Hero />
      <LifeStats />
      <QuoteBanner index={0} />
      <FeaturedMemories />
    </>
  );
}
