"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Memory } from "@/lib/memories";

export function Timeline({ groups }: { groups: Array<{ year: string; memories: Memory[] }> }) {
  return (
    <div className="relative flex flex-col gap-16">
      <div
        aria-hidden
        className="absolute bottom-2 left-[3px] top-2 w-px bg-border sm:left-[7px]"
      />
      {groups.map((group) => (
        <div key={group.year} className="relative pl-8 sm:pl-12">
          <span
            aria-hidden
            className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-accent sm:h-3.5 sm:w-3.5"
          />
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-3xl font-semibold text-text md:text-4xl"
          >
            {group.year}
          </motion.h2>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {group.memories.map((memory, i) => (
              <motion.div
                key={memory.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
              >
                <Link href={memory.href} className="group flex gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm">
                    <Image
                      src={memory.heroImage}
                      alt={memory.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-secondary">
                      {memory.category} · {memory.city}
                    </p>
                    <h3 className="mt-1 font-semibold text-text">{memory.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-text-secondary">{memory.note}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
