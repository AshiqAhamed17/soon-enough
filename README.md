# Soon Enough

> "Collecting places. Chasing memories. Becoming who I'm meant to be."

A personal, static record of cafés, restaurants, places, and the memories attached to them — built as a calm, photography-led digital sanctuary rather than a review site or portfolio.

Every page ends the same way: **"See you somewhere."**

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) (v4, CSS-first theme)
- [Framer Motion](https://www.framer.com/motion/) for subtle, intentional motion
- [Lucide Icons](https://lucide.dev)
- [Geist](https://vercel.com/font) via `next/font/google`

Fully static — no backend, no auth, no database, no CMS. All content lives in typed TypeScript files under `/data`, so real memories replace placeholder ones by editing data and swapping images, never by touching code.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
/app             routes (Next.js App Router)
/components      shared UI (nav, footer, cards, page sections)
/data            typed content — cafés, quotes, life stats, etc.
/types           shared TypeScript types per content type
/public/images   photography, organized by section
```

## Deployment

Deploys to [Vercel](https://vercel.com) with zero configuration.
