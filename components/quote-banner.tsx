import { quotes } from "@/data/quotes";

export function QuoteBanner({ index = 0 }: { index?: number }) {
  const quote = quotes[index % quotes.length];

  return (
    <section className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="text-2xl italic text-text md:text-3xl">&ldquo;{quote.text}&rdquo;</p>
      {quote.attribution && (
        <p className="mt-4 text-sm text-text-secondary">{quote.attribution}</p>
      )}
    </section>
  );
}
