"use client";

import { motion } from "framer-motion";
import { stats } from "@/data/stats";

export function LifeStats() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="grid grid-cols-2 gap-10 text-center md:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
          >
            <p className="text-3xl font-medium text-text md:text-4xl">{stat.value}</p>
            <p className="mt-2 text-sm uppercase tracking-widest text-text-secondary">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
