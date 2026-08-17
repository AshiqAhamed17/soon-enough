"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Restaurant } from "@/types/restaurant";

const TILTS = ["mount-tilt-2", "mount-tilt-4", "mount-tilt-1", "mount-tilt-3"];

export function RestaurantGallery({ restaurant }: { restaurant: Restaurant }) {
  if (restaurant.gallery.length === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary/70">
        Gallery
      </p>
      <div className="mt-8 grid gap-10 sm:grid-cols-2">
        {restaurant.gallery.map((src, index) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
            className={`photo-mount rounded-sm p-3 ${TILTS[index % TILTS.length]}`}
          >
            <div className="relative h-72 w-full overflow-hidden">
              <Image
                src={src}
                alt={`${restaurant.name} — photo ${index + 1}`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
