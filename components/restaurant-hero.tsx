"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Restaurant } from "@/types/restaurant";

export function RestaurantHero({ restaurant }: { restaurant: Restaurant }) {
  return (
    <div className="relative h-[65vh] w-full overflow-hidden">
      <Image
        src={restaurant.heroImage}
        alt={restaurant.name}
        fill
        preload
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />
      <div className="absolute bottom-0 left-0 px-6 py-12 md:px-14 md:py-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-white/70"
        >
          {restaurant.city}, {restaurant.country}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl"
        >
          {restaurant.name}
        </motion.h1>
      </div>
    </div>
  );
}
