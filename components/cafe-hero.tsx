import Image from "next/image";
import type { Cafe } from "@/types/cafe";

export function CafeHero({ cafe }: { cafe: Cafe }) {
  return (
    <div className="relative h-[60vh] w-full overflow-hidden">
      <Image src={cafe.heroImage} alt={cafe.name} fill preload className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 px-6 py-10 md:px-12">
        <h1 className="text-3xl font-medium text-white md:text-5xl">{cafe.name}</h1>
        <p className="mt-2 text-white/80">
          {cafe.city}, {cafe.country}
        </p>
      </div>
    </div>
  );
}
