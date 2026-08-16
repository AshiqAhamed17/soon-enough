"use client";

import { motion } from "framer-motion";
import { stats } from "@/data/stats";

export function LifeStats() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <p className="mb-10 text-center font-mono text-xs uppercase tracking-[0.3em] text-text-secondary/70">
        In numbers, so far
      </p>
      <div className="grid grid-cols-2 divide-y divide-border border-y border-border sm:divide-x sm:divide-y-0 md:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
            className="px-4 py-8 text-center"
          >
            <p className="text-3xl font-semibold text-text md:text-4xl">{stat.value}</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-text-secondary">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
