"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={ref} className="relative h-[85vh] w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/images/home/hero.jpg"
          alt="A quiet street somewhere worth remembering"
          fill
          preload
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-white/70"
        >
          Soon Enough
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="max-w-4xl text-[2.75rem] font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          Collecting places. Chasing memories. Becoming who I&apos;m meant to be.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
          className="mt-7 max-w-xl text-base text-white/80 md:text-lg"
        >
          A quiet record of the cafés, cities, and streets that shaped me.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="block h-8 w-px bg-white/50"
          />
        </motion.div>
      </div>
    </div>
  );
}
