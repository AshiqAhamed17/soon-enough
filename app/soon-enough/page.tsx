import type { Metadata } from "next";
import { soonEnough } from "@/data/soon-enough";
import { SoonEnoughCard } from "@/components/soon-enough-card";

export const metadata: Metadata = {
  description: "The places I'll eventually find myself in.",
};

export default function SoonEnoughPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary/70">
        The manifestation board
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-text md:text-4xl">Soon Enough</h1>
      <p className="mt-3 max-w-xl text-text-secondary">
        The places I&apos;ll eventually find myself in.
      </p>

      <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2">
        {soonEnough.map((destination, i) => (
          <SoonEnoughCard key={destination.slug} destination={destination} tiltIndex={i} />
        ))}
      </div>

      <p className="mx-auto mt-24 max-w-md text-center text-lg italic leading-relaxed text-text-secondary">
        One day.
        <br />
        Not today.
        <br />
        But soon enough.
      </p>
    </div>
  );
}
