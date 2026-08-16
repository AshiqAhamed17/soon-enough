"use client";

import { motion } from "framer-motion";
import type { Restaurant } from "@/types/restaurant";

export function RestaurantStory({ restaurant }: { restaurant: Restaurant }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto max-w-2xl px-6 py-16"
    >
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary/70">
        Why this place matters
      </p>
      <p className="mt-4 text-lg leading-relaxed text-text">{restaurant.whyItMatters}</p>

      <p className="mt-12 font-mono text-xs uppercase tracking-[0.3em] text-text-secondary/70">
        The story
      </p>
      <p className="mt-4 leading-relaxed text-text-secondary">{restaurant.story}</p>

      <div className="relative mt-14 border-l-2 border-accent/30 pl-6">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-2 -top-6 select-none text-6xl font-semibold leading-none text-accent/15"
        >
          &ldquo;
        </span>
        <p className="text-xl italic leading-snug text-text">{restaurant.lesson}</p>
      </div>
    </motion.section>
  );
}
