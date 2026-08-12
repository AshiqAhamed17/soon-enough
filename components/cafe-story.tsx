import type { Cafe } from "@/types/cafe";

export function CafeStory({ cafe }: { cafe: Cafe }) {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h2 className="text-sm uppercase tracking-widest text-text-secondary">
        Why this place matters
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-text">{cafe.whyItMatters}</p>

      <h2 className="mt-12 text-sm uppercase tracking-widest text-text-secondary">
        The story
      </h2>
      <p className="mt-4 leading-relaxed text-text-secondary">{cafe.story}</p>

      <h2 className="mt-12 text-sm uppercase tracking-widest text-text-secondary">Lesson</h2>
      <p className="mt-4 text-lg italic text-text">{cafe.lesson}</p>
    </section>
  );
}
