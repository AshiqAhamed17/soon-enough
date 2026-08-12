"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const FEATURED_PLACEHOLDER = [
  {
    image: "/images/home/featured-1.jpg",
    title: "A flat white in the rain",
    caption: "London taught me stillness.",
  },
  {
    image: "/images/home/featured-2.jpg",
    title: "Streets I didn't plan to walk",
    caption: "Some cities you don't visit, you fall into.",
  },
  {
    image: "/images/home/featured-3.jpg",
    title: "Coffee that took ten minutes",
    caption: "Kyoto taught me that slow isn't wasted.",
  },
];

export function FeaturedMemories() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="mb-10 text-2xl font-medium text-text md:text-3xl">
        Featured memories
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {FEATURED_PLACEHOLDER.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            className="group overflow-hidden rounded-2xl bg-card"
          >
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-medium text-text">{item.title}</h3>
              <p className="mt-1 text-sm text-text-secondary">{item.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
