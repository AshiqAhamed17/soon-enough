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
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl text-4xl font-medium text-white md:text-6xl"
        >
          Collecting places. Chasing memories. Becoming who I&apos;m meant to be.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-6 max-w-xl text-base text-white/80 md:text-lg"
        >
          A quiet record of the cafés, cities, and streets that shaped me.
        </motion.p>
      </div>
    </div>
  );
}
