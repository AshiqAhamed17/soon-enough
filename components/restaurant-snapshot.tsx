"use client";

import { motion } from "framer-motion";
import type { Restaurant } from "@/types/restaurant";

export function RestaurantSnapshot({ restaurant }: { restaurant: Restaurant }) {
  const visitedLabel = new Date(restaurant.visitDate).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const rows: [string, string][] = [
    ["Location", restaurant.location],
    ["Visited", visitedLabel],
    ["Weather", restaurant.weather],
    ["Mood", restaurant.mood],
    ["Music", restaurant.music],
    ["With", restaurant.companions],
    ["Signature dish", restaurant.signatureDish],
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto max-w-4xl px-6 py-16"
    >
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary/70">
        Snapshot
      </p>
      <dl className="mt-6 grid divide-y divide-border border-y border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        {rows.map(([label, value]) => (
          <div key={label} className="px-1 py-4 sm:px-6">
            <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-secondary">
              {label}
            </dt>
            <dd className="mt-1.5 text-text">{value}</dd>
          </div>
        ))}
      </dl>
    </motion.section>
  );
}
