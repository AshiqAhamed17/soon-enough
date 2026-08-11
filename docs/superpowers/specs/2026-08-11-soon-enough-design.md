# Soon Enough — Design Spec

Date: 2026-08-11
Source: `plan1.md`

## 1. Purpose

A personal, static website that functions as a digital sanctuary — a coffee-table-book-like record of cafés, restaurants, places, and memories, plus a "manifestation board" of future travel. Emotional goal over informational goal. Not a portfolio, not a review site.

## 2. Scope & Sequencing

The full plan (Home, Cafés, Restaurants, Places, Gallery, Timeline, Soon Enough, North Star, memory pages, quotes, dark mode) is too large for one implementation pass. This spec covers the **whole roadmap at a high level** and defines an **MVP-first, phased build**:

- Phase 1 proves the design language on Home + Cafés (the most fully-specified content type in `plan1.md`).
- Every subsequent content type (Restaurants, Places) reuses the Cafés template pattern.
- Gallery, Timeline, Soon Enough, and North Star are structurally distinct and get their own phases.
- Dark mode is deferred until the light-mode design language is locked, to avoid doubling design decisions up front.

Each phase must ship a real, visitable, polished increment — never a half-built page.

## 3. Content Decisions

- **Initial content is placeholder, not real memories.** Realistic sample cafés/stats/quotes now; the user swaps in real photos and stories later by editing `/data/*.ts` and replacing files in `/public/images/*`.
- **Images are curated real stock photography** (e.g. via Unsplash), not solid-color placeholders — because the design is photography-led and must be judged with real imagery, not filler.
- **Navigation shows the full planned site structure from Phase 0**, even before every section is built — unbuilt sections route to a simple "coming soon" page. This is a deliberate exception to "no dead links": it makes the site feel whole sooner, per user preference.

## 4. Technology

- Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, shadcn/ui (used only for primitives like dialogs — restyled to disappear into the custom design, never left in default shadcn look).
- Geist font via `next/font/google`.
- No backend, no auth, no database, no CMS. All content in typed TypeScript files under `/data`. Deployable directly to Vercel.

## 5. Folder Structure

```
/app                → routes (App Router)
/components          → shared UI (nav, footer, card, hero, etc.)
/data                → typed content (cafes.ts, quotes.ts, stats.ts, ...)
/lib                 → helpers (e.g. date formatting)
/types               → shared TypeScript types per content type
/public/images        → photography, organized by section
/public/videos
/public/icons
```

## 6. Design System

- **Palette (light mode only for now):** warm off-white background, pure white cards, near-black text (not pure black), soft grey secondary text, muted coffee-brown accent for links/highlights/active nav state. Exact values tuned visually during Phase 0/1, not fixed in the abstract — but expressed as Tailwind CSS variables (`--color-bg`, `--color-card`, `--color-text`, `--color-text-secondary`, `--color-accent`) from day one so a later dark theme is a token swap, not a rewrite.
- **Typography:** Geist for both display and body. Oversized editorial headings for hero/section titles; calm, readable body text with generous line-height; letter-spaced small-caps-style labels for metadata (dates, categories, tags).
- **Spacing:** generous and air-heavy; whitespace is a design element. Section padding scales up (not down) on larger viewports.
- **Motion (Framer Motion):** slow fades (300–500ms ease-out), scroll-triggered image reveals (subtle opacity/clip, no bounce/spring overshoot), gentle card hover lift (2–4px translate + soft shadow increase), subtle parallax on the homepage hero image only, smooth page transitions. Every animation must be intentional — no motion added "because it looks cool."
- **Shape:** consistent soft rounded corners across cards, images, buttons — never pill-shaped, never sharp.
- **Dark mode** (Phase 9): "premium hardcover book" feeling — deep warm near-black background, warm off-white text, same coffee-brown accent. Implemented purely via the CSS variable tokens established in Phase 0.

## 7. Content & Data Architecture

- `/types/cafe.ts` defines the Café shape: `slug`, `name`, `city`, `heroImage`, `gallery: string[]`, `video?`, `location`, `visitDate`, `favouriteDrink`, `companions`, `music`, `weather`, `mood`, `story`, `lesson`, `whyItMatters`, `futureMe: { wouldReturn, wouldRecommend, whatChanged }`.
- `/data/cafes.ts` exports a typed array of 4–6 placeholder café entries built from this type.
- `/data/quotes.ts` — typed array of quote strings/attributions used throughout the site.
- `/data/stats.ts` — typed object for homepage life stats (places visited, cities, countries, coffees, favourite cafés/restaurants counts).
- Restaurants and Places (Phases 3–4) follow the identical pattern: own `/types/*.ts` + `/data/*.ts`, reusing the café page template with content-appropriate copy/fields.
- Images referenced by path under `/public/images/<section>/...` — swapping real photos later requires no code changes, only file replacement.

## 8. Page Inventory (target state, built across phases)

- `/` — Homepage: cinematic hero, life stats, featured memories, quotes, footer.
- `/cafes`, `/cafes/[slug]` — list + memory-page template.
- `/restaurants`, `/restaurants/[slug]` — same template pattern.
- `/places`, `/places/[slug]` — broader category, adapted template.
- `/gallery` — fullscreen photo browsing, keyboard navigation.
- `/timeline` — vertical, per-year expanding timeline.
- `/soon-enough` — manifestation board of future destinations.
- `/north-star` — philosophy/writing page.
- Every page ends with the same footer line: "See you somewhere."

## 9. Phased Roadmap

1. **Phase 0 — Foundation:** Next.js + TS + Tailwind scaffold, design tokens, Geist fonts, base layout (nav with full site structure incl. "coming soon" stub routes, footer), Vercel deploy skeleton.
2. **Phase 1 — Homepage:** hero (image, statement, subtitle, gentle animation), life stats strip, featured memories preview, quote styling.
3. **Phase 2 — Cafés (template phase):** types + data model, café list (large cards), individual café memory-page template (hero, gallery, snapshot, personal story, lesson, why-it-matters, future-me), 4–6 placeholder entries with curated photography.
4. **Phase 3 — Restaurants:** replicate the café template with restaurant data/copy.
5. **Phase 4 — Places:** broader category template (cities, museums, landmarks, viewpoints, etc.).
6. **Phase 5 — Gallery:** fullscreen lightbox, keyboard nav, elegant transitions, aggregating images across sections.
7. **Phase 6 — Timeline:** vertical expanding-year timeline referencing memories across all sections.
8. **Phase 7 — Soon Enough:** manifestation board (future destinations, dream coffee/meal/photograph, "Soon Enough" status).
9. **Phase 8 — North Star:** philosophy page; weave quotes throughout the whole site.
10. **Phase 9 — Dark mode:** token-based dark theme across every existing page.
11. **Phase 10 — Performance & polish:** Next/Image audit, lazy loading, accessibility pass, SEO metadata, motion polish, production deploy verification.

## 10. Verification Approach

No automated test suite — this is a static, content-driven site with no complex logic. Per phase: `next build` and `tsc --noEmit` must pass cleanly, and each new page/section gets a real browser walkthrough (dev server) to check visual quality, responsiveness, and that motion feels intentional — before moving to the next phase.

## 11. Out of Scope (for this spec)

- Backend, auth, database, CMS — explicitly excluded per `plan1.md`.
- Real personal content/photography — added later by the user directly in `/data` and `/public/images`.
- Multi-language support, comments, analytics — not mentioned in `plan1.md`, not included unless requested later.
