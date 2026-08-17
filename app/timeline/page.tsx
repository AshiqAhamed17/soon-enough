import type { Metadata } from "next";
import { getMemoriesByYear } from "@/lib/memories";
import { Timeline } from "@/components/timeline";
import { QuoteBanner } from "@/components/quote-banner";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Every year, and the memories that made it worth remembering.",
};

export default function TimelinePage() {
  const groups = getMemoriesByYear();

  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary/70">
        The archive
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-text md:text-4xl">Timeline</h1>
      <p className="mt-3 max-w-xl text-text-secondary">
        Every year, and the memories that made it worth remembering.
      </p>
      <div className="mt-16">
        <Timeline groups={groups} />
      </div>
      <QuoteBanner index={0} />
    </div>
  );
}
