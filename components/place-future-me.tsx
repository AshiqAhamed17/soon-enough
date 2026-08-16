"use client";

import { motion } from "framer-motion";
import type { Place } from "@/types/place";

function Chip({ label, value }: { label: string; value: boolean }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-secondary">
        {label}
      </span>
      <span className={`text-sm font-semibold ${value ? "text-accent" : "text-text-secondary"}`}>
        {value ? "Yes" : "No"}
      </span>
    </div>
  );
}

export function PlaceFutureMe({ place }: { place: Place }) {
  const { wouldReturn, wouldRecommend, whatChanged } = place.futureMe;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto max-w-2xl px-6 py-16"
    >
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary/70">
        Future me
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Chip label="Would return" value={wouldReturn} />
        <Chip label="Would recommend" value={wouldRecommend} />
      </div>
      <p className="mt-6 leading-relaxed text-text-secondary">{whatChanged}</p>
    </motion.section>
  );
}
