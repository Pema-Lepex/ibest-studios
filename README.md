# iBEST Studios — website

Static studio site built with Next.js (App Router, `output: "export"`), Tailwind CSS v4, Motion and React Three Fiber.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site written to ./out — upload that folder to any host
```

## Editing content

All text, productions, videos, services, Educare Skill shelves, testimonials and contact details live in `src/data/site.ts`.
Videos are referenced by their YouTube ID; thumbnails load from YouTube automatically.
Artwork (posters, series art, team photo, Educare shelves) is in `public/img/`.

> Before launch: confirm the Google Play link for Educare Skill in `src/data/site.ts` (`educare.playStore`).

## Structure

- `src/components/` — page sections (Hero, PosterWall, About, Featured, Works, Pipeline, Services, Educare, Testimonials, Careers, Contact)
- `src/components/three/models.tsx` — procedural 3D models (Druk the baby dragon, Dr. Carrot, film camera, clapperboard, mic, film reel, stylus, editing monitor, script book, clouds)
- `src/components/three/*Scene.tsx` — the three WebGL scenes; each pauses rendering when off-screen
