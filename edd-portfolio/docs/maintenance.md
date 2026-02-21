# Project Maintenance Manual

This manual details how to safely modify content, design variables, and perform regular technical maintenance on the Apple x Anime Portfolio.

## 1. Content Updates (`data/cvData.ts`)
The entire application is completely data-driven. Do not modify React components to add a new skill or project.
- **Location:** `src/data/cvData.ts`
- **Adding an Experience:** Insert a new object at the *top* of the `experiences` array to keep reverse-chronological order. The `ExperienceTimeline` component will inherently auto-generate the neon timeline dots.
- **Adding a Project:** Ensure you assign a valid `category`. The `ProjectsGallery` will auto-parse new categories and add them to the filter tabs without manual logic modifications.

## 2. Asset Management
- We use the internal `OptimizedImage` component.
- To add a new image:
  1. Compress the image (WebP is strongly recommended).
  2. Drop it into `public/` or `src/assets/`.
  3. Reference the path. If utilizing `blurDataURL` for progressive loading, generate a tiny 10x10 base64 string of the image and pass it as a prop.

## 3. Style Configurations
Global theme colors, Apple-like spacing, and Anime animation timings are isolated.
- **Colors:** Modify `tailwind.config.js` -> `theme.extend.colors`. The entire UI will re-skin dynamically using those core RGB values.
- **Glassmorphism:** To adjust the "Apple blur", edit the `.apple-glass` utility in `src/index.css`.
- **Neon Glows:** To adjust the spread of the anime glows on hover, edit the `.neon-glow-*` classes in `src/index.css`.

## 4. Build & Deployment Health
Before pushing to production (Vercel):
1. Run `npm run build`. TypeScript (`tsc -b`) will halt the build if any data mutations in `cvData.ts` broke component prop expectations.
2. If `tsc` throws `never read` errors (e.g. unused index mappings for arrays), fix them immediately as Vite will block the artifact creation.
3. The build artifact is entirely static. Ensure you review Localhost performance natively using Lighthouse in Incognito mode.
