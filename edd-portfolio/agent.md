# Agent Instructions — Edd Portfolio

> Apple x Anime Minimalist Portfolio — React 19 + TypeScript + Tailwind CSS + Framer Motion + Vite

---

## Project Identity

This is a **personal portfolio website** for **Edd Remonts**, a Senior Full-Stack/Frontend Engineer based in Copenhagen, Denmark. The design philosophy fuses **Apple's stark minimalism** with **Japanese Anime kinetic energy** — ultra-clean layouts with neon accent bursts, glassmorphism cards, and physics-based spring animations.

**Live site:** https://eddremonts.dk  
**Deployment:** Static site on Vercel  
**Languages:** English (default), Spanish, Danish  

---

## Tech Stack

| Layer            | Technology                                                              |
| ---------------- | ----------------------------------------------------------------------- |
| Framework        | React 19 with Vite 7                                                    |
| Language         | TypeScript 5.9 (strict)                                                 |
| Styling          | Tailwind CSS 3.4 + CSS custom properties (light/dark via `.dark` class) |
| Animations       | Framer Motion 12 (physics-based springs, scroll-linked parallax)        |
| i18n             | react-i18next + i18next (EN / ES / DK)                                 |
| SEO              | react-helmet-async + vite-plugin-sitemap + JSON-LD structured data      |
| Icons            | lucide-react                                                            |
| Typography       | M PLUS 1 Variable (display), System UI / San Francisco (body)           |
| Testing          | Vitest 4 + @testing-library/react + jsdom                              |
| Linting          | ESLint 9 flat config + typescript-eslint + react-hooks + react-refresh  |
| Package Manager  | pnpm                                                                    |

---

## Architecture Overview

```
src/
├── App.tsx                    # Root layout: AnimatePresence wrapper, all sections
├── main.tsx                   # React 19 createRoot, HelmetProvider, ThemeProvider
├── i18n.ts                    # i18next init with EN/ES/DK resource bundles
├── index.css                  # Tailwind layers, CSS custom properties, .apple-glass, .neon-glow-*
├── components/
│   ├── Footer.tsx
│   ├── sections/              # Page sections (full-page scroll blocks)
│   │   ├── HeroSection.tsx    # Hero with particles, ScrambleHover name, CTA buttons
│   │   ├── AboutSection.tsx   # Bio + feature cards
│   │   ├── ExperienceTimeline.tsx  # Neon timeline with scroll-linked animations
│   │   ├── ProjectsGallery.tsx     # 3D tilt cards with category filters
│   │   └── ContactSection.tsx      # Contact form / info
│   └── ui/                    # Reusable UI primitives
│       ├── IconComponent.tsx
│       ├── LanguageSelector.tsx
│       ├── OptimizedImage.tsx # Lazy-loaded images with IntersectionObserver + blur placeholder
│       ├── ScrambleHover.tsx  # Text scramble effect on hover
│       ├── SectionHeader.tsx
│       ├── SEO.tsx            # <Helmet> for OpenGraph, Twitter, JSON-LD
│       └── ThemeToggle.tsx    # Light/dark/system toggle
├── contexts/
│   ├── ThemeContext.tsx        # Theme provider with localStorage persistence
│   └── ThemeContextBase.ts    # Theme type definitions and context creation
├── data/
│   ├── cvData.ts              # ALL content data: personalInfo, experiences, projects, skills, services
│   └── projectImageConfig.ts  # Image paths and responsive srcSet configurations
└── locales/
    ├── en/translation.json
    ├── es/translation.json
    └── dk/translation.json
```

---

## Critical Rules

### 1. Data-Driven Content — NEVER Hardcode
**ALL** portfolio content lives in `src/data/cvData.ts`. To add a new experience, project, skill, or service — modify the data file, **not** the React components. Components auto-generate UI from these arrays.

### 2. Design System Variables
Colors are **CSS custom properties** defined in `src/index.css` `:root` and `.dark` blocks. Tailwind maps them in `tailwind.config.js`. Never use raw hex colors in components — always use semantic tokens: `bg-background`, `text-foreground`, `text-primary`, `bg-surface`, etc.

| Token        | Light                    | Dark                     |
| ------------ | ------------------------ | ------------------------ |
| background   | `#F4F4F5` (zinc-100)     | `#09090B` (zinc-950)     |
| foreground   | `#1D1D1F`               | `#F5F5F7`               |
| primary      | `#0097A7` (Teal Cyan)    | `#00E5FF` (Electric Cyan)|
| secondary    | `#FF2A85` (Sakura Pink)  | `#FF2A85`               |
| accent       | `#8A2BE2` (Deep Purple)  | `#B066FF`               |

### 3. Animation Standards
- **Easing:** Apple custom `[0.16, 1, 0.3, 1]` for 90% of UI transitions
- **Springs:** Use `useSpring` with `stiffness: 150, damping: 20` for physics-based interactions
- **Reduced Motion:** Always check `useReducedMotion()` and provide static fallbacks
- **Entry Animations:** `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`
- **Layout Animations:** Use `<AnimatePresence>` + `layout` prop for list filtering

### 4. Typography
- **Headings:** `font-display` (M PLUS 1 Variable) — bold, tight tracking
- **Body text:** `font-body` (System UI / San Francisco stack)
- **Hero size scale:** `text-6xl md:text-8xl lg:text-[10rem]`

### 5. Glassmorphism (`apple-glass`)
Use the `.apple-glass` utility class for card surfaces. It provides:
- `backdrop-blur-xl` with `saturate(180%)`
- Semi-transparent background adapting to light/dark
- Ultra-soft shadow `rgba(0,0,0,0.04)`

### 6. i18n — Translation Keys
- All user-visible text MUST use `t('section.key')` from `useTranslation()`
- Translation files: `src/locales/{en,es,dk}/translation.json`
- When adding new text, update ALL THREE locale files
- Language persistence: `localStorage('edd-portfolio-lang')`
- Fallback: English (`en`)

### 7. Image Optimization
- Use `<OptimizedImage>` component (lazy loading via IntersectionObserver)
- Provide responsive `srcSet` with `-thumb.webp`, `-md.webp`, `-lg.webp`, `-full.webp` variants
- All project images go in `public/projects/`
- Personal images in `public/edd/`
- Tech icons in `public/tech-icons/`
- Compress to WebP. If an asset exceeds 200KB, optimize before committing.

### 8. Accessibility (a11y)
- Skip-to-content link exists on `App.tsx`
- All interactive elements have `focus-visible:ring-2 focus-visible:ring-primary`
- Images require meaningful `alt` text (e.g., `${project.title} project preview (${project.category})`)
- Color contrast: Primary is WCAG AA compliant on both themes
- Animate with `useReducedMotion()` awareness

### 9. SEO
- `<SEO>` component manages `<Helmet>` with OpenGraph, Twitter Card, and JSON-LD Person schema
- The `html lang` attribute updates dynamically with the active language via react-helmet-async
- Sitemap generated by `vite-plugin-sitemap` targeting `https://eddremonts.dk`

---

## Commands

| Action         | Command                  | Notes                                    |
| -------------- | ------------------------ | ---------------------------------------- |
| Dev server     | `pnpm dev`               | Starts Vite dev server with HMR          |
| Build          | `pnpm build`             | `tsc -b && vite build` — strict TS check |
| Preview        | `pnpm preview`           | Preview production build locally         |
| Lint           | `pnpm lint`              | ESLint flat config with TS + React rules |
| Test           | `pnpm vitest`            | Vitest with jsdom + Testing Library      |
| Test (watch)   | `pnpm vitest --watch`    | Watch mode for TDD                       |

---

## File Conventions

- **Components:** PascalCase, `.tsx` extension, named exports
- **Data files:** camelCase, `.ts` extension
- **Translations:** `src/locales/{lang}/translation.json`
- **Path alias:** `@/` maps to `src/` (configured in Vite + tsconfig)
- **Barrel exports:** Not used — import directly from the file

---

## When Modifying This Project

### Adding a New Section
1. Create `src/components/sections/NewSection.tsx`
2. Use `<SectionHeader>` for consistent heading styles
3. Wrap with `<motion.section>` using standard entry animation
4. Add translation keys to all 3 locale files
5. Import and add to `App.tsx` `<main>` block

### Adding a New Project
1. Add entry to `projects` array in `src/data/cvData.ts`
2. Place images at `public/projects/{id}-{size}.webp` (thumb, md, lg, full)
3. The ProjectsGallery auto-renders new entries and categories

### Adding a New Experience
1. Add entry at the **top** of `experiences` array in `src/data/cvData.ts` (reverse-chronological)
2. The ExperienceTimeline auto-generates timeline dots

### Adding a New Language
1. Create `src/locales/{code}/translation.json` copying from `en`
2. Register resources in `src/i18n.ts`
3. Update the `<LanguageSelector>` component with the new option

### Changing Theme Colors
1. Edit CSS custom properties in `src/index.css` (`:root` and `.dark`)
2. The entire UI re-skins dynamically via Tailwind's semantic tokens

---

## Quality Checklist (Pre-Push)

- [ ] `pnpm build` passes (TypeScript + Vite)
- [ ] `pnpm lint` shows zero errors
- [ ] All 3 locale files have matching keys
- [ ] New images are WebP, < 200KB, with responsive srcSet
- [ ] Animations respect `useReducedMotion()`
- [ ] Color contrast passes WCAG AA
- [ ] Lighthouse Performance score remains 90+
- [ ] Test in both light and dark modes

---

## Installed Agent Skills

The following skills are installed globally (`~/.agents/skills/`) to assist AI agents working on this project:

| Skill                          | Source                                             | Purpose                                      |
| ------------------------------ | -------------------------------------------------- | -------------------------------------------- |
| `find-skills`                  | vercel-labs/skills                                 | Discover and install new agent skills         |
| `vercel-react-best-practices`  | vercel-labs/agent-skills                           | React 19 patterns, performance, architecture  |
| `web-design-guidelines`        | vercel-labs/agent-skills                           | UI/UX design principles and layout patterns   |
| `frontend-design`              | anthropics/skills                                  | Frontend design systems and component craft   |
| `framer-motion-animator`       | patricio0312rev/skills                             | Framer Motion animation patterns and physics  |
| `tailwind-css-patterns`        | giuseppe-trisciuoglio/developer-kit                | Tailwind CSS utilities, responsive patterns   |
| `vitest`                       | bobmatnyc/claude-mpm-skills                        | Vitest testing strategies and patterns        |
| `i18n-localization`            | davila7/claude-code-templates                      | Internationalization with react-i18next       |
| `accessibility-engineer`       | mae616/design-skills                               | WCAG compliance, a11y auditing, aria patterns |
| `roier-seo`                    | davila7/claude-code-templates                      | SEO optimization, structured data, meta tags  |

### Installing / Updating Skills
```bash
# Search for skills
npx skills find "query"

# Install a skill globally
npx skills add <owner/repo@skill> -g -y

# Update all installed skills
npx skills update

# Check for updates
npx skills check
```
