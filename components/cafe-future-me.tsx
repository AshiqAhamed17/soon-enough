import type { Cafe } from "@/types/cafe";

export function CafeFutureMe({ cafe }: { cafe: Cafe }) {
  const { wouldReturn, wouldRecommend, whatChanged } = cafe.futureMe;

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h2 className="text-sm uppercase tracking-widest text-text-secondary">Future me</h2>
      <div className="mt-6 flex gap-8 text-text">
        <p>Would return: {wouldReturn ? "Yes" : "No"}</p>
        <p>Would recommend: {wouldRecommend ? "Yes" : "No"}</p>
      </div>
      <p className="mt-6 leading-relaxed text-text-secondary">{whatChanged}</p>
    </section>
  );
}
