# Soon Enough — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build "Soon Enough" — a static, deeply personal digital sanctuary website (Next.js) documenting cafés, restaurants, places, and future travel dreams — as a sequence of small, polished, deployable increments.

**Architecture:** Next.js 15 App Router + TypeScript, fully static, no backend/DB/CMS. All content lives in typed files under `/data`, rendered through a small set of reusable page templates. Design tokens are CSS variables so light mode ships first and dark mode (Phase 9) is a token swap, not a rewrite.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS (v4, CSS-first `@theme` config), Framer Motion, Lucide Icons, shadcn/ui (primitives only, restyled), Geist font via `next/font/google`.

Design spec: `docs/superpowers/specs/2026-08-11-soon-enough-design.md`

## Global Constraints

- No backend, no authentication, no database, no CMS. Everything static; content lives in typed TypeScript files under `/data`, imported directly by pages.
- Deployable directly to Vercel.
- Every page ends with the same footer line: **"See you somewhere."**
- No automated test suite. Verification per task = `npx tsc --noEmit` clean + `npm run build` succeeds + a real browser walkthrough (dev server) confirming visual quality, responsiveness, and that motion feels intentional.
- Design tokens (colors, fonts) are CSS variables, defined once, light mode only until Phase 9 (dark mode).
- Images are curated real photography downloaded into `/public/images/...` — never solid-color placeholders. Swapping to real personal photos later means replacing files only, no code changes.
- Motion rules: slow fades (300–500ms, ease-out), scroll-triggered reveals, gentle hover lift (2–4px), no bounce/spring overshoot, no autoplay, no motion "because it looks cool."
- No loud gradients, no glassmorphism, no cyberpunk/gaming UI aesthetics.
- Rounded corners throughout (cards, images, buttons) — soft, never sharp, never pill-shaped.
- Navigation shows the full planned site structure from Phase 0 onward; unbuilt sections route to a shared `ComingSoon` stub page.

---

# Phase 0 — Foundation

## Task 0.1: Scaffold the Next.js project

**Files:**
- Create: entire Next.js project scaffold at repo root (package.json, tsconfig.json, next.config.ts, eslint config, app/, public/, globals.css, etc.)

**Interfaces:**
- Produces: a working `npm run dev` / `npm run build` Next.js 15 App Router + TypeScript + Tailwind project at the repo root.

- [ ] **Step 1: Scaffold into a temp directory (repo root already has `plan1.md` and `docs/`, which `create-next-app` will refuse to scaffold into directly)**

```bash
npx create-next-app@latest soon-enough-scaffold \
  --typescript --tailwind --eslint --app \
  --src-dir=false --import-alias "@/*" --use-npm --yes
```

If any flag is rejected because the installed `create-next-app` version changed its CLI, run `npx create-next-app@latest --help` first and adjust flags to the closest equivalents (typescript, tailwind, eslint, app router, no `src/` dir, `@/*` import alias, npm) — the goal, not the exact flags, is load-bearing.

- [ ] **Step 2: Merge the scaffold into the repo root and clean up**

```bash
rm -rf soon-enough-scaffold/.git
(cd soon-enough-scaffold && shopt -s dotglob && mv -- * ..)
rmdir soon-enough-scaffold
```

- [ ] **Step 3: Verify the build works**

Run: `npm run build`
Expected: build completes successfully with the default Next.js starter page.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 project with TypeScript, Tailwind, ESLint"
```

---

## Task 0.2: Design tokens (colors, fonts)

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx` (font setup only, if scaffold didn't already wire Geist)

**Interfaces:**
- Produces: Tailwind utility classes `bg-bg`, `bg-card`, `text-text`, `text-text-secondary`, `text-accent`, `border-border` available everywhere via Tailwind v4's CSS-first `@theme`.

- [ ] **Step 1: Inspect the generated `app/globals.css`**

If it starts with `@import "tailwindcss";` you're on Tailwind v4 (expected) — use the CSS-first approach below. If instead the project has a `tailwind.config.ts` with a `theme.extend` object (Tailwind v3), add the same color values under `theme.extend.colors` there instead (`bg: "var(--color-bg)"`, etc.) and skip the `@theme inline` block below.

- [ ] **Step 2: Replace the contents of `app/globals.css`**

```css
@import "tailwindcss";

:root {
  --color-bg: #faf8f4;
  --color-card: #ffffff;
  --color-text: #1c1917;
  --color-text-secondary: #78716c;
  --color-accent: #8b6f52;
  --color-border: #e7e2da;
}

@theme inline {
  --color-bg: var(--color-bg);
  --color-card: var(--color-card);
  --color-text: var(--color-text);
  --color-text-secondary: var(--color-text-secondary);
  --color-accent: var(--color-accent);
  --color-border: var(--color-border);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
}
```

- [ ] **Step 3: Confirm Geist fonts are wired in `app/layout.tsx`**

The default Next.js 15 scaffold already imports `Geist`/`Geist_Mono` from `next/font/google` and applies `--font-geist-sans` / `--font-geist-mono` variables to `<body>`. If `app/layout.tsx` doesn't already do this, add:

```tsx
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
```

and apply `${geistSans.variable} ${geistMono.variable}` as classes on `<body>`.

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: succeeds with no CSS/theme errors.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: add warm neutral design tokens to Tailwind theme"
```

---

## Task 0.3: Navigation and coming-soon stub pages

**Files:**
- Create: `components/coming-soon.tsx`
- Create: `components/nav.tsx`
- Create: `app/cafes/page.tsx` (stub, replaced in Phase 2)
- Create: `app/restaurants/page.tsx` (stub, replaced in Phase 3)
- Create: `app/places/page.tsx` (stub, replaced in Phase 4)
- Create: `app/gallery/page.tsx` (stub, replaced in Phase 5)
- Create: `app/timeline/page.tsx` (stub, replaced in Phase 6)
- Create: `app/soon-enough/page.tsx` (stub, replaced in Phase 7)
- Create: `app/north-star/page.tsx` (stub, replaced in Phase 8)

**Interfaces:**
- Produces: `ComingSoon({ title }: { title: string })` component; `Nav()` component with no props, reading the current route via `usePathname()`.

- [ ] **Step 1: Create the shared stub component**

```tsx
// components/coming-soon.tsx
import Link from "next/link";

export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm uppercase tracking-widest text-text-secondary">{title}</p>
      <h1 className="max-w-xl text-3xl font-medium text-text md:text-4xl">
        This chapter hasn&apos;t been written yet.
      </h1>
      <p className="text-text-secondary">Soon enough.</p>
      <Link
        href="/"
        className="mt-4 text-sm text-accent underline-offset-4 hover:underline"
      >
        Back home
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Create each stub page**

```tsx
// app/cafes/page.tsx
import { ComingSoon } from "@/components/coming-soon";

export default function CafesPage() {
  return <ComingSoon title="Cafés" />;
}
```

Repeat identically for the other five, swapping the folder, function name, and title:

- `app/restaurants/page.tsx` → `RestaurantsPage`, title `"Restaurants"`
- `app/places/page.tsx` → `PlacesPage`, title `"Places"`
- `app/gallery/page.tsx` → `GalleryPage`, title `"Gallery"`
- `app/timeline/page.tsx` → `TimelinePage`, title `"Timeline"`
- `app/soon-enough/page.tsx` → `SoonEnoughPage`, title `"Soon Enough"`
- `app/north-star/page.tsx` → `NorthStarPage`, title `"North Star"`

- [ ] **Step 3: Create the nav component**

```tsx
// components/nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/cafes", label: "Cafés" },
  { href: "/restaurants", label: "Restaurants" },
  { href: "/places", label: "Places" },
  { href: "/gallery", label: "Gallery" },
  { href: "/timeline", label: "Timeline" },
  { href: "/soon-enough", label: "Soon Enough" },
  { href: "/north-star", label: "North Star" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-medium tracking-tight text-text">
          Soon Enough
        </Link>

        <nav className="hidden gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  active ? "text-accent" : "text-text-secondary hover:text-text"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-text md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 border-t border-border px-6 py-6 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm text-text-secondary hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: succeeds; all seven new routes compile.

- [ ] **Step 5: Commit**

```bash
git add components/coming-soon.tsx components/nav.tsx app/cafes app/restaurants app/places app/gallery app/timeline app/soon-enough app/north-star
git commit -m "feat: add site navigation and coming-soon stub pages"
```

---

## Task 0.4: Footer

**Files:**
- Create: `components/footer.tsx`

**Interfaces:**
- Produces: `Footer()` component, no props.

- [ ] **Step 1: Create the footer**

```tsx
// components/footer.tsx
export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12 text-center">
      <p className="text-sm italic text-text-secondary">See you somewhere.</p>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/footer.tsx
git commit -m "feat: add footer with signature line"
```

---

## Task 0.5: Wire navigation and footer into the root layout

**Files:**
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `Nav()` from `components/nav.tsx`, `Footer()` from `components/footer.tsx`.

- [ ] **Step 1: Update the root layout**

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Soon Enough",
  description:
    "Collecting places. Chasing memories. Becoming who I'm meant to be.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-bg text-text antialiased`}
      >
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify manually**

Run: `npm run dev`, then in a browser visit `/`, `/cafes`, `/restaurants`, `/places`, `/gallery`, `/timeline`, `/soon-enough`, `/north-star`.
Expected: every route renders the nav, the correct stub or homepage content, and the footer; every nav link works; the active link is highlighted in accent color.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: wire navigation and footer into root layout"
```

---

## Task 0.6: Deploy skeleton to Vercel *(manual — user-run, not agent-executed)*

Deploying creates a live, shared, external resource, so this step is for the user to run directly rather than something an agent runs autonomously.

- [ ] Push the repo to a GitHub remote (or run `vercel` from the project root with the Vercel CLI installed).
- [ ] Import the project at vercel.com (or accept the CLI's prompts) — no environment variables or build settings are required; this is a zero-config static Next.js app.
- [ ] Confirm the deployed URL loads the homepage and every nav link resolves.

---

# Phase 1 — Homepage

## Task 1.1: Life stats data model

**Files:**
- Create: `types/stat.ts`
- Create: `data/stats.ts`

**Interfaces:**
- Produces: `Stat` type (`label: string`, `value: string`); `stats: Stat[]` array.

- [ ] **Step 1: Create the type**

```ts
// types/stat.ts
export interface Stat {
  label: string;
  value: string;
}
```

- [ ] **Step 2: Create the data**

```ts
// data/stats.ts
import type { Stat } from "@/types/stat";

export const stats: Stat[] = [
  { label: "Places visited", value: "47" },
  { label: "Cities", value: "23" },
  { label: "Countries", value: "9" },
  { label: "Cups of coffee (approx.)", value: "612" },
  { label: "Favourite cafés", value: "12" },
  { label: "Favourite restaurants", value: "8" },
];
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add types/stat.ts data/stats.ts
git commit -m "feat: add life stats data model"
```

---

## Task 1.2: Quotes data model

**Files:**
- Create: `types/quote.ts`
- Create: `data/quotes.ts`

**Interfaces:**
- Produces: `Quote` type (`text: string`, `attribution?: string`); `quotes: Quote[]` array.

- [ ] **Step 1: Create the type**

```ts
// types/quote.ts
export interface Quote {
  text: string;
  attribution?: string;
}
```

- [ ] **Step 2: Create the data**

```ts
// data/quotes.ts
import type { Quote } from "@/types/quote";

export const quotes: Quote[] = [
  { text: "Life is made of places worth remembering." },
  { text: "Collect moments, not milestones." },
  { text: "The world always has another street worth walking." },
  { text: "Some cafés become part of your story." },
  { text: "Hard work buys freedom. Freedom creates memories." },
];
```

- [ ] **Step 3: Commit**

```bash
git add types/quote.ts data/quotes.ts
git commit -m "feat: add quotes data"
```

---

## Task 1.3: Homepage hero

**Files:**
- Create: `public/images/home/hero.jpg` (downloaded)
- Create: `components/hero.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: `Hero()` component, no props, renders full-bleed image + heading + subtitle with parallax.

- [ ] **Step 1: Download the hero image (with fallback)**

```bash
mkdir -p public/images/home

fetch_image() {
  local dest="$1"; shift
  for url in "$@"; do
    if curl -fsSL "$url" -o "$dest" && file "$dest" | grep -qi image; then
      echo "OK: $dest <- $url"
      return 0
    fi
  done
  echo "FAILED to fetch $dest — stop and ask the user for an alternate image URL." >&2
  return 1
}

fetch_image public/images/home/hero.jpg \
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=2400&q=80" \
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2400&q=80"
```

If `fetch_image` fails on both URLs, stop and ask the user for a replacement image URL rather than proceeding with a broken or missing file.

- [ ] **Step 2: Create the hero component**

```tsx
// components/hero.tsx
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
```

- [ ] **Step 3: Replace the homepage**

```tsx
// app/page.tsx
import { Hero } from "@/components/hero";

export default function Home() {
  return <Hero />;
}
```

- [ ] **Step 4: Verify manually**

Run: `npm run dev`, visit `/`.
Expected: full-bleed hero image, heading fades/slides in, subtle parallax on scroll, text legible over the image via the gradient overlay.

- [ ] **Step 5: Commit**

```bash
git add public/images/home/hero.jpg components/hero.tsx app/page.tsx
git commit -m "feat: add cinematic homepage hero"
```

---

## Task 1.4: Life stats strip

**Files:**
- Create: `components/life-stats.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `stats` from `data/stats.ts`.
- Produces: `LifeStats()` component, no props.

- [ ] **Step 1: Create the component**

```tsx
// components/life-stats.tsx
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
```

- [ ] **Step 2: Wire into the homepage**

```tsx
// app/page.tsx
import { Hero } from "@/components/hero";
import { LifeStats } from "@/components/life-stats";

export default function Home() {
  return (
    <>
      <Hero />
      <LifeStats />
    </>
  );
}
```

- [ ] **Step 3: Verify manually**

Run: `npm run dev`, visit `/`, scroll past the hero.
Expected: stats fade in one-by-one as they enter the viewport, laid out in a clean grid.

- [ ] **Step 4: Commit**

```bash
git add components/life-stats.tsx app/page.tsx
git commit -m "feat: add life stats strip to homepage"
```

---

## Task 1.5: Featured memories preview (self-contained placeholder)

This section is intentionally self-contained with inline placeholder content — it gets rewired to real café data in Task 2.6, once café data exists.

**Files:**
- Create: `public/images/home/featured-1.jpg`, `featured-2.jpg`, `featured-3.jpg` (downloaded)
- Create: `components/featured-memories.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: `FeaturedMemories()` component, no props.

- [ ] **Step 1: Download the three images (with fallbacks)**

```bash
fetch_image() {
  local dest="$1"; shift
  for url in "$@"; do
    if curl -fsSL "$url" -o "$dest" && file "$dest" | grep -qi image; then
      echo "OK: $dest <- $url"
      return 0
    fi
  done
  echo "FAILED to fetch $dest — stop and ask the user for an alternate image URL." >&2
  return 1
}

fetch_image public/images/home/featured-1.jpg \
  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1600&q=80" \
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80"

fetch_image public/images/home/featured-2.jpg \
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1600&q=80" \
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80"

fetch_image public/images/home/featured-3.jpg \
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80" \
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"
```

If any `fetch_image` call fails on both URLs, stop and ask the user for a replacement rather than proceeding.

- [ ] **Step 2: Create the component**

```tsx
// components/featured-memories.tsx
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
```

- [ ] **Step 3: Wire into the homepage**

```tsx
// app/page.tsx
import { Hero } from "@/components/hero";
import { LifeStats } from "@/components/life-stats";
import { FeaturedMemories } from "@/components/featured-memories";

export default function Home() {
  return (
    <>
      <Hero />
      <LifeStats />
      <FeaturedMemories />
    </>
  );
}
```

- [ ] **Step 4: Verify manually**

Run: `npm run dev`, visit `/`, scroll to the featured memories section.
Expected: three cards fade in with a stagger, image scales gently on hover.

- [ ] **Step 5: Commit**

```bash
git add public/images/home/featured-1.jpg public/images/home/featured-2.jpg public/images/home/featured-3.jpg components/featured-memories.tsx app/page.tsx
git commit -m "feat: add featured memories preview section to homepage"
```

---

## Task 1.6: Quote banner and final homepage assembly

**Files:**
- Create: `components/quote-banner.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `quotes` from `data/quotes.ts`.
- Produces: `QuoteBanner({ index }: { index?: number })`.

- [ ] **Step 1: Create the component**

```tsx
// components/quote-banner.tsx
import { quotes } from "@/data/quotes";

export function QuoteBanner({ index = 0 }: { index?: number }) {
  const quote = quotes[index % quotes.length];

  return (
    <section className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="text-2xl italic text-text md:text-3xl">&ldquo;{quote.text}&rdquo;</p>
      {quote.attribution && (
        <p className="mt-4 text-sm text-text-secondary">{quote.attribution}</p>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Assemble the full homepage**

```tsx
// app/page.tsx
import { Hero } from "@/components/hero";
import { LifeStats } from "@/components/life-stats";
import { QuoteBanner } from "@/components/quote-banner";
import { FeaturedMemories } from "@/components/featured-memories";

export default function Home() {
  return (
    <>
      <Hero />
      <LifeStats />
      <QuoteBanner index={0} />
      <FeaturedMemories />
    </>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit && npm run build`
Expected: clean.

Then `npm run dev` and walk through the full homepage top to bottom: hero → stats → quote → featured memories → footer. Confirm it reads as one cohesive, calm, "coffee table book" page.

- [ ] **Step 4: Commit**

```bash
git add components/quote-banner.tsx app/page.tsx
git commit -m "feat: assemble homepage sections with quote banner"
```

---

# Phase 2 — Cafés (the template)

## Task 2.1: Café type definition

**Files:**
- Create: `types/cafe.ts`

**Interfaces:**
- Produces: `Cafe` and `FutureMe` types.

- [ ] **Step 1: Create the type**

```ts
// types/cafe.ts
export interface FutureMe {
  wouldReturn: boolean;
  wouldRecommend: boolean;
  whatChanged: string;
}

export interface Cafe {
  slug: string;
  name: string;
  city: string;
  country: string;
  heroImage: string;
  gallery: string[];
  video?: string;
  location: string;
  visitDate: string;
  favouriteDrink: string;
  companions: string;
  music: string;
  weather: string;
  mood: string;
  story: string;
  lesson: string;
  whyItMatters: string;
  futureMe: FutureMe;
}
```

- [ ] **Step 2: Commit**

```bash
git add types/cafe.ts
git commit -m "feat: add Cafe type definition"
```

---

## Task 2.2: Placeholder café data and photography

**Files:**
- Create: `data/cafes.ts`
- Create: `public/images/cafes/ozone-coffee-london/hero.jpg`, `gallery-1.jpg`, `gallery-2.jpg`
- Create: `public/images/cafes/kurasu-kyoto/hero.jpg`, `gallery-1.jpg`, `gallery-2.jpg`
- Create: `public/images/cafes/la-cafeotheque-paris/hero.jpg`, `gallery-1.jpg`, `gallery-2.jpg`
- Create: `public/images/cafes/tobys-estate-sydney/hero.jpg`, `gallery-1.jpg`, `gallery-2.jpg`

**Interfaces:**
- Consumes: `Cafe` type from `types/cafe.ts`.
- Produces: `cafes: Cafe[]` array of 4 entries.

- [ ] **Step 1: Download the photography**

```bash
fetch_image() {
  local dest="$1"; shift
  for url in "$@"; do
    if curl -fsSL "$url" -o "$dest" && file "$dest" | grep -qi image; then
      echo "OK: $dest <- $url"
      return 0
    fi
  done
  echo "FAILED to fetch $dest — stop and ask the user for an alternate image URL." >&2
  return 1
}

mkdir -p public/images/cafes/ozone-coffee-london
mkdir -p public/images/cafes/kurasu-kyoto
mkdir -p public/images/cafes/la-cafeotheque-paris
mkdir -p public/images/cafes/tobys-estate-sydney

fetch_image public/images/cafes/ozone-coffee-london/hero.jpg \
  "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=2000&q=80" \
  "https://images.unsplash.com/photo-1495774856032-8b90bbb32b32?auto=format&fit=crop&w=2000&q=80"
fetch_image public/images/cafes/ozone-coffee-london/gallery-1.jpg \
  "https://images.unsplash.com/photo-1495774856032-8b90bbb32b32?auto=format&fit=crop&w=1600&q=80" \
  "https://images.unsplash.com/photo-1495856458515-0637185db551?auto=format&fit=crop&w=1600&q=80"
fetch_image public/images/cafes/ozone-coffee-london/gallery-2.jpg \
  "https://images.unsplash.com/photo-1495856458515-0637185db551?auto=format&fit=crop&w=1600&q=80" \
  "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1600&q=80"

fetch_image public/images/cafes/kurasu-kyoto/hero.jpg \
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=2000&q=80" \
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=2000&q=80"
fetch_image public/images/cafes/kurasu-kyoto/gallery-1.jpg \
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1600&q=80" \
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1600&q=80"
fetch_image public/images/cafes/kurasu-kyoto/gallery-2.jpg \
  "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1600&q=80" \
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80"

fetch_image public/images/cafes/la-cafeotheque-paris/hero.jpg \
  "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?auto=format&fit=crop&w=2000&q=80" \
  "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=2000&q=80"
fetch_image public/images/cafes/la-cafeotheque-paris/gallery-1.jpg \
  "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1600&q=80" \
  "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?auto=format&fit=crop&w=1600&q=80"
fetch_image public/images/cafes/la-cafeotheque-paris/gallery-2.jpg \
  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1600&q=80" \
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80"

fetch_image public/images/cafes/tobys-estate-sydney/hero.jpg \
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2000&q=80" \
  "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=2000&q=80"
fetch_image public/images/cafes/tobys-estate-sydney/gallery-1.jpg \
  "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1600&q=80" \
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1600&q=80"
fetch_image public/images/cafes/tobys-estate-sydney/gallery-2.jpg \
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80" \
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"
```

If any download fails on both URLs, stop and ask the user for a replacement image URL for that specific file rather than proceeding with a broken file.

- [ ] **Step 2: Create the data file**

```ts
// data/cafes.ts
import type { Cafe } from "@/types/cafe";

export const cafes: Cafe[] = [
  {
    slug: "ozone-coffee-london",
    name: "Ozone Coffee",
    city: "London",
    country: "United Kingdom",
    heroImage: "/images/cafes/ozone-coffee-london/hero.jpg",
    gallery: [
      "/images/cafes/ozone-coffee-london/gallery-1.jpg",
      "/images/cafes/ozone-coffee-london/gallery-2.jpg",
    ],
    location: "Old Street, London",
    visitDate: "2024-03-14",
    favouriteDrink: "Flat white",
    companions: "Alone, with a notebook",
    music: "Low-fi jazz from the speakers behind the counter",
    weather: "Grey and drizzling, the kind that makes you want to stay inside",
    mood: "Restless, then calm",
    story:
      "I walked in soaking from the rain, ordered a flat white, and ended up staying three hours. Nobody rushed me. I wrote four pages I still reread sometimes.",
    lesson: "Some of the best thinking happens when you stop trying to leave.",
    whyItMatters:
      "It was the first café abroad where I felt like a local instead of a tourist — just another person with a laptop and nowhere urgent to be.",
    futureMe: {
      wouldReturn: true,
      wouldRecommend: true,
      whatChanged: "I started carrying a notebook everywhere after this.",
    },
  },
  {
    slug: "kurasu-kyoto",
    name: "Kurasu",
    city: "Kyoto",
    country: "Japan",
    heroImage: "/images/cafes/kurasu-kyoto/hero.jpg",
    gallery: [
      "/images/cafes/kurasu-kyoto/gallery-1.jpg",
      "/images/cafes/kurasu-kyoto/gallery-2.jpg",
    ],
    location: "Near Kyoto University",
    visitDate: "2024-11-02",
    favouriteDrink: "Hand-poured single origin, Ethiopian",
    companions: "A close friend from university",
    music: "Almost silence — just the pour-over kettle",
    weather: "Cool autumn morning, leaves turning",
    mood: "Quietly happy",
    story:
      "We didn't talk much. We just sat by the window watching the street, drinking coffee that took ten minutes to make on purpose. It felt like the opposite of everything back home.",
    lesson: "Slowness is not wasted time.",
    whyItMatters: "This is the café that taught me coffee could be a ritual, not just a habit.",
    futureMe: {
      wouldReturn: true,
      wouldRecommend: true,
      whatChanged: "I bought a pour-over set the week I got home.",
    },
  },
  {
    slug: "la-cafeotheque-paris",
    name: "La Caféothèque",
    city: "Paris",
    country: "France",
    heroImage: "/images/cafes/la-cafeotheque-paris/hero.jpg",
    gallery: [
      "/images/cafes/la-cafeotheque-paris/gallery-1.jpg",
      "/images/cafes/la-cafeotheque-paris/gallery-2.jpg",
    ],
    location: "Le Marais, Paris",
    visitDate: "2023-06-21",
    favouriteDrink: "Cortado",
    companions: "My sister, mid-argument that dissolved into laughter",
    music: "French radio, barely audible over conversation",
    weather: "Warm evening light through old windows",
    mood: "Nostalgic before the moment had even ended",
    story:
      "We'd been mid-disagreement about something neither of us remembers now. Somewhere between the first and second cortado, we forgot why we were annoyed and just talked for two hours.",
    lesson: "Most arguments don't survive good coffee and good light.",
    whyItMatters: "It's the place I think of whenever someone asks about my sister.",
    futureMe: {
      wouldReturn: true,
      wouldRecommend: true,
      whatChanged: "Nothing dramatic — just a softer memory of that trip.",
    },
  },
  {
    slug: "tobys-estate-sydney",
    name: "Toby's Estate",
    city: "Sydney",
    country: "Australia",
    heroImage: "/images/cafes/tobys-estate-sydney/hero.jpg",
    gallery: [
      "/images/cafes/tobys-estate-sydney/gallery-1.jpg",
      "/images/cafes/tobys-estate-sydney/gallery-2.jpg",
    ],
    location: "Chippendale, Sydney",
    visitDate: "2025-01-09",
    favouriteDrink: "Iced long black",
    companions: "A friend I hadn't seen in six years",
    music: "Nothing — just the espresso machine and traffic outside",
    weather: "Bright, hot, that particular Sydney summer light",
    mood: "Surprised by how easy it was to pick back up",
    story:
      "Six years apart and it took about four minutes before it felt like no time had passed at all. We sat outside until the ice in our coffees melted completely.",
    lesson: "The right friendships don't need maintenance, just a good chair to sit in.",
    whyItMatters: "It reminded me that distance doesn't have to mean losing people.",
    futureMe: {
      wouldReturn: true,
      wouldRecommend: true,
      whatChanged: "I started reaching out first, more often.",
    },
  },
];
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`
Expected: no type errors — all 4 entries satisfy `Cafe`.

- [ ] **Step 4: Commit**

```bash
git add data/cafes.ts public/images/cafes
git commit -m "feat: add placeholder café data with curated photography"
```

---

## Task 2.3: Café card and list page

**Files:**
- Create: `components/cafe-card.tsx`
- Modify: `app/cafes/page.tsx` (replaces the Phase 0 stub)

**Interfaces:**
- Consumes: `Cafe` type; `cafes` from `data/cafes.ts`.
- Produces: `CafeCard({ cafe }: { cafe: Cafe })`.

- [ ] **Step 1: Create the card component**

```tsx
// components/cafe-card.tsx
import Image from "next/image";
import Link from "next/link";
import type { Cafe } from "@/types/cafe";

export function CafeCard({ cafe }: { cafe: Cafe }) {
  return (
    <Link
      href={`/cafes/${cafe.slug}`}
      className="group block overflow-hidden rounded-2xl bg-card transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={cafe.heroImage}
          alt={cafe.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-medium text-text">{cafe.name}</h3>
        <p className="mt-1 text-sm text-text-secondary">
          {cafe.city}, {cafe.country}
        </p>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Replace the café list stub**

```tsx
// app/cafes/page.tsx
import { cafes } from "@/data/cafes";
import { CafeCard } from "@/components/cafe-card";

export default function CafesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-3xl font-medium text-text md:text-4xl">Cafés</h1>
      <p className="mt-3 max-w-xl text-text-secondary">
        Not reviews. Stories — one for every café that became part of mine.
      </p>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {cafes.map((cafe) => (
          <CafeCard key={cafe.slug} cafe={cafe} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify manually**

Run: `npm run dev`, visit `/cafes`.
Expected: 4 large café cards in a grid, hover lift + image zoom, each links out (404 for now — the detail route is built next).

- [ ] **Step 4: Commit**

```bash
git add components/cafe-card.tsx app/cafes/page.tsx
git commit -m "feat: add café list page with large cards"
```

---

## Task 2.4: Café memory-page — hero and snapshot

**Files:**
- Create: `app/cafes/[slug]/page.tsx`
- Create: `components/cafe-hero.tsx`
- Create: `components/cafe-snapshot.tsx`

**Interfaces:**
- Consumes: `Cafe` type; `cafes` from `data/cafes.ts`.
- Produces: `CafeHero({ cafe }: { cafe: Cafe })`, `CafeSnapshot({ cafe }: { cafe: Cafe })`.

- [ ] **Step 1: Create the hero section**

```tsx
// components/cafe-hero.tsx
import Image from "next/image";
import type { Cafe } from "@/types/cafe";

export function CafeHero({ cafe }: { cafe: Cafe }) {
  return (
    <div className="relative h-[60vh] w-full overflow-hidden">
      <Image src={cafe.heroImage} alt={cafe.name} fill priority className="object-cover" />
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
```

- [ ] **Step 2: Create the snapshot section**

```tsx
// components/cafe-snapshot.tsx
import type { Cafe } from "@/types/cafe";

export function CafeSnapshot({ cafe }: { cafe: Cafe }) {
  const rows: [string, string][] = [
    ["Location", cafe.location],
    ["Visited", cafe.visitDate],
    ["Weather", cafe.weather],
    ["Mood", cafe.mood],
    ["Music", cafe.music],
    ["With", cafe.companions],
    ["Favourite drink", cafe.favouriteDrink],
  ];

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="text-sm uppercase tracking-widest text-text-secondary">Snapshot</h2>
      <dl className="mt-6 grid gap-6 sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs uppercase tracking-widest text-text-secondary">{label}</dt>
            <dd className="mt-1 text-text">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
```

- [ ] **Step 3: Create the dynamic route**

Next.js 15 passes `params` as a `Promise` in page props — it must be awaited.

```tsx
// app/cafes/[slug]/page.tsx
import { notFound } from "next/navigation";
import { cafes } from "@/data/cafes";
import { CafeHero } from "@/components/cafe-hero";
import { CafeSnapshot } from "@/components/cafe-snapshot";

export function generateStaticParams() {
  return cafes.map((cafe) => ({ slug: cafe.slug }));
}

export default async function CafePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cafe = cafes.find((c) => c.slug === slug);
  if (!cafe) notFound();

  return (
    <div>
      <CafeHero cafe={cafe} />
      <CafeSnapshot cafe={cafe} />
    </div>
  );
}
```

- [ ] **Step 4: Verify manually**

Run: `npm run dev`, visit `/cafes/ozone-coffee-london` and the other three slugs, plus `/cafes/does-not-exist`.
Expected: each real slug shows hero + snapshot with correct data; the unknown slug renders Next's not-found page.

- [ ] **Step 5: Commit**

```bash
git add app/cafes/[slug]/page.tsx components/cafe-hero.tsx components/cafe-snapshot.tsx
git commit -m "feat: add café memory-page hero and snapshot sections"
```

---

## Task 2.5: Café memory-page — gallery, story, and future-me

**Files:**
- Create: `components/cafe-gallery.tsx`
- Create: `components/cafe-story.tsx`
- Create: `components/cafe-future-me.tsx`
- Modify: `app/cafes/[slug]/page.tsx`

**Interfaces:**
- Consumes: `Cafe` type.
- Produces: `CafeGallery`, `CafeStory`, `CafeFutureMe` — each `({ cafe }: { cafe: Cafe })`.

- [ ] **Step 1: Create the gallery section**

```tsx
// components/cafe-gallery.tsx
import Image from "next/image";
import type { Cafe } from "@/types/cafe";

export function CafeGallery({ cafe }: { cafe: Cafe }) {
  if (cafe.gallery.length === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="text-sm uppercase tracking-widest text-text-secondary">Gallery</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {cafe.gallery.map((src) => (
          <div key={src} className="relative h-72 w-full overflow-hidden rounded-2xl">
            <Image src={src} alt={cafe.name} fill className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create the story section**

```tsx
// components/cafe-story.tsx
import type { Cafe } from "@/types/cafe";

export function CafeStory({ cafe }: { cafe: Cafe }) {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h2 className="text-sm uppercase tracking-widest text-text-secondary">
        Why this place matters
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-text">{cafe.whyItMatters}</p>

      <h2 className="mt-12 text-sm uppercase tracking-widest text-text-secondary">
        The story
      </h2>
      <p className="mt-4 leading-relaxed text-text-secondary">{cafe.story}</p>

      <h2 className="mt-12 text-sm uppercase tracking-widest text-text-secondary">Lesson</h2>
      <p className="mt-4 text-lg italic text-text">{cafe.lesson}</p>
    </section>
  );
}
```

- [ ] **Step 3: Create the future-me section**

```tsx
// components/cafe-future-me.tsx
import type { Cafe } from "@/types/cafe";

export function CafeFutureMe({ cafe }: { cafe: Cafe }) {
  const { wouldReturn, wouldRecommend, whatChanged } = cafe.futureMe;

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h2 className="text-sm uppercase tracking-widest text-text-secondary">Future me</h2>
      <div className="mt-6 flex gap-8 text-text">
        <p>Would return: {wouldReturn ? "Yes" : "No"}</p>
        <p>Would recommend: {wouldRecommend ? "Yes" : "No"}</p>
      </div>
      <p className="mt-6 leading-relaxed text-text-secondary">{whatChanged}</p>
    </section>
  );
}
```

- [ ] **Step 4: Assemble the full café page**

```tsx
// app/cafes/[slug]/page.tsx
import { notFound } from "next/navigation";
import { cafes } from "@/data/cafes";
import { CafeHero } from "@/components/cafe-hero";
import { CafeSnapshot } from "@/components/cafe-snapshot";
import { CafeGallery } from "@/components/cafe-gallery";
import { CafeStory } from "@/components/cafe-story";
import { CafeFutureMe } from "@/components/cafe-future-me";

export function generateStaticParams() {
  return cafes.map((cafe) => ({ slug: cafe.slug }));
}

export default async function CafePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cafe = cafes.find((c) => c.slug === slug);
  if (!cafe) notFound();

  return (
    <div>
      <CafeHero cafe={cafe} />
      <CafeSnapshot cafe={cafe} />
      <CafeGallery cafe={cafe} />
      <CafeStory cafe={cafe} />
      <CafeFutureMe cafe={cafe} />
    </div>
  );
}
```

- [ ] **Step 5: Verify manually**

Run: `npx tsc --noEmit && npm run build`, then `npm run dev` and walk through all 4 café pages top to bottom.
Expected: hero → snapshot → gallery → why-it-matters/story/lesson → future-me → footer, for all 4 placeholder cafés, reading like a personal story, not a review.

- [ ] **Step 6: Commit**

```bash
git add components/cafe-gallery.tsx components/cafe-story.tsx components/cafe-future-me.tsx app/cafes/[slug]/page.tsx
git commit -m "feat: complete café memory-page template with story and future-me sections"
```

---

## Task 2.6: Wire homepage featured memories to real café data

**Files:**
- Modify: `components/featured-memories.tsx`
- Delete: `public/images/home/featured-1.jpg`, `featured-2.jpg`, `featured-3.jpg` (no longer referenced)

**Interfaces:**
- Consumes: `cafes` from `data/cafes.ts`.
- Produces: `FeaturedMemories()` — same signature, now data-driven.

- [ ] **Step 1: Replace the placeholder implementation**

```tsx
// components/featured-memories.tsx
import Image from "next/image";
import Link from "next/link";
import { cafes } from "@/data/cafes";

export function FeaturedMemories() {
  const featured = [...cafes]
    .sort((a, b) => (a.visitDate < b.visitDate ? 1 : -1))
    .slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="mb-10 text-2xl font-medium text-text md:text-3xl">
        Featured memories
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {featured.map((cafe) => (
          <Link
            key={cafe.slug}
            href={`/cafes/${cafe.slug}`}
            className="group overflow-hidden rounded-2xl bg-card"
          >
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={cafe.heroImage}
                alt={cafe.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-medium text-text">{cafe.name}</h3>
              <p className="mt-1 text-sm text-text-secondary">
                {cafe.city}, {cafe.country}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Remove the now-unused placeholder images**

```bash
git rm public/images/home/featured-1.jpg public/images/home/featured-2.jpg public/images/home/featured-3.jpg
```

- [ ] **Step 3: Verify manually**

Run: `npx tsc --noEmit && npm run build`, then `npm run dev` and visit `/`.
Expected: the 3 most recently visited cafés appear in "Featured memories," each card linking to a real, working café page.

- [ ] **Step 4: Commit**

```bash
git add components/featured-memories.tsx
git commit -m "feat: wire homepage featured memories to real café data"
```

---

# Future Phases — Roadmap Only (detailed plans written when reached)

Each phase below produces a real, visitable, polished increment, following the pattern established in Phases 0–2. A fresh brainstorm-informed plan gets written for each when we reach it, since the exact template details depend on how the Cafés template actually looks once it's live and reviewed.

**Phase 3 — Restaurants.** Reuse the café type/data/template pattern with restaurant-flavored fields and copy (experiences and celebrations, not food reviews). Replaces the `/restaurants` stub.

**Phase 4 — Places.** A broader content type covering cities, roads, museums, airports, landmarks, parks, bookstores, beaches, mountains, and viewpoints — adapted from the café template but generalized (not every place has a "favourite drink"). Replaces the `/places` stub.

**Phase 5 — Gallery.** Fullscreen photo viewing aggregating images already downloaded for cafés/restaurants/places, with keyboard navigation (arrow keys, escape) and elegant transitions. Replaces the `/gallery` stub.

**Phase 6 — Timeline.** A vertical, per-year expanding timeline referencing memories (photos, notes, milestones, trips) already captured across cafés/restaurants/places data. Replaces the `/timeline` stub.

**Phase 7 — Soon Enough.** The manifestation board: future destinations with dream coffee/meal/photograph, using the same card visual language as other sections but a distinct "Soon Enough" status and emotional register (subtitle: "The places I'll eventually find myself in."). Replaces the `/soon-enough` stub.

**Phase 8 — North Star.** A single well-written philosophy page (why hard work, travel, memory-collecting, freedom, and curiosity matter), plus weaving the quotes system throughout every existing page rather than confining it to the homepage. Replaces the `/north-star` stub.

**Phase 9 — Dark mode.** A "premium hardcover book" dark theme implemented purely by swapping the CSS variable values established in Phase 0 (`--color-bg`, `--color-card`, `--color-text`, `--color-text-secondary`, `--color-accent`, `--color-border`) behind a theme toggle, across every page built so far.

**Phase 10 — Performance & polish.** `next/image` audit across every section, lazy-loading verification, accessibility pass (contrast, focus states, keyboard nav on interactive elements), SEO metadata per page, final motion review, and a production deploy checklist.
