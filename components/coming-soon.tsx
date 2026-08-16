"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary/70"
      >
        {title}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="max-w-xl text-3xl font-semibold text-text md:text-4xl"
      >
        This chapter hasn&apos;t been written yet.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="italic text-text-secondary"
      >
        Soon enough.
      </motion.p>
      <Link
        href="/"
        className="group mt-4 font-mono text-xs uppercase tracking-[0.15em] text-accent"
      >
        <span className="border-b border-accent/40 pb-0.5 transition-colors group-hover:border-accent">
          Back home
        </span>
      </Link>
    </div>
  );
}
