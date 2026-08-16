import { quotes } from "@/data/quotes";

export function QuoteBanner({ index = 0 }: { index?: number }) {
  const quote = quotes[index % quotes.length];

  return (
    <section className="relative mx-auto max-w-2xl px-6 py-24 text-center">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 select-none text-[9rem] font-semibold leading-none text-accent/10"
      >
        &ldquo;
      </span>
      <p className="relative text-2xl italic leading-snug text-text md:text-3xl">
        {quote.text}
      </p>
      {quote.attribution && (
        <p className="relative mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary">
          {quote.attribution}
        </p>
      )}
    </section>
  );
}
