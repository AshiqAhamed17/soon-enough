"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { href: "/cafes", label: "Cafés" },
  { href: "/restaurants", label: "Restaurants" },
  { href: "/places", label: "Places" },
  { href: "/map", label: "Map" },
  { href: "/gallery", label: "Gallery" },
  { href: "/timeline", label: "Timeline" },
  { href: "/soon-enough", label: "Soon Enough" },
  { href: "/north-star", label: "North Star" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/95 backdrop-blur-sm">
      <div className="mx-auto hidden max-w-6xl items-center justify-between px-6 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-text-secondary/70 md:flex">
        <span>A Personal Archive</span>
        <span>Vol. 01 — Ongoing</span>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between border-t border-border/70 px-6 py-5 md:border-t-0">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-text transition-colors hover:text-accent"
        >
          Soon Enough
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <nav className="flex gap-7">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${
                    active ? "text-accent" : "text-text-secondary hover:text-text"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            className="text-text"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-5 border-t border-border px-6 py-6 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-mono text-xs uppercase tracking-[0.15em] text-text-secondary hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
