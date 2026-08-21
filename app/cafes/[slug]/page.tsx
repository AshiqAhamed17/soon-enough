import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cafes } from "@/data/cafes";
import { CafeHero } from "@/components/cafe-hero";
import { CafeSnapshot } from "@/components/cafe-snapshot";
import { CafeMap } from "@/components/cafe-map";
import { CafeGallery } from "@/components/cafe-gallery";
import { CafeStory } from "@/components/cafe-story";
import { CafeFutureMe } from "@/components/cafe-future-me";

export function generateStaticParams() {
  return cafes.map((cafe) => ({ slug: cafe.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cafe = cafes.find((c) => c.slug === slug);
  if (!cafe) return {};

  return {
    title: cafe.name,
    description: cafe.whyItMatters,
  };
}

export default async function CafePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cafe = cafes.find((c) => c.slug === slug);
  if (!cafe) notFound();

  return (
    <div>
      <CafeHero cafe={cafe} />
      <CafeSnapshot cafe={cafe} />
      <CafeMap cafe={cafe} />
      <CafeGallery cafe={cafe} />
      <CafeStory cafe={cafe} />
      <CafeFutureMe cafe={cafe} />
    </div>
  );
}
