import { notFound } from "next/navigation";
import { cafes } from "@/data/cafes";
import { CafeHero } from "@/components/cafe-hero";
import { CafeSnapshot } from "@/components/cafe-snapshot";

export function generateStaticParams() {
  return cafes.map((cafe) => ({ slug: cafe.slug }));
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
    </div>
  );
}
