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

## Design Patterns — patterns.dev Reference

> Source: [patterns.dev](https://www.patterns.dev) — Curated by Addy Osmani & Lydia Hallie.
> Only patterns **applicable to this project** (React 19 SPA on Vite, no SSR/Next.js) are listed.

---

### 1. Hooks Pattern

| Field | Detail |
|---|---|
| **Category** | React Pattern |
| **Description** | Replace class-based lifecycle/state with `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`, and custom hooks. Encapsulate reusable stateful logic in `use*` functions. |
| **Justification** | This project is 100% functional components (React 19). Hooks are the primary mechanism for state, side effects, context access, and animation (Framer Motion hooks). |
| **Project Example** | `useTheme()` custom hook in `ThemeContextBase.ts`, `useTranslation()` from react-i18next, `useScroll()`/`useSpring()` from Framer Motion. **Needed:** Extract shared hooks like `useClickOutside`, `useScrollThrottle`, `useIntersectionObserver`. |
| **Checklist** | ☐ All stateful logic uses hooks, never class components ☐ Custom hooks prefixed with `use` ☐ Dependencies arrays are correct (no stale closures) ☐ Cleanup functions in `useEffect` for subscriptions/timers ☐ `useCallback`/`useMemo` for expensive computations and stable references passed to children |

---

### 2. Module Pattern (ES Modules)

| Field | Detail |
|---|---|
| **Category** | JavaScript Pattern |
| **Description** | Split code into separate ES modules with explicit `import`/`export`. Module-scoped variables remain private. Use named exports for discoverability, default export only for the primary entity. |
| **Justification** | Every component, data file, and utility is an ES module. Vite relies on ES module boundaries for tree-shaking and HMR. Proper module structure prevents global scope pollution and enables dead-code elimination. |
| **Project Example** | `cvData.ts` exports data arrays, `ThemeContextBase.ts` exports types + context + hook. **Needed:** Extract shared constants to `src/lib/motion.ts`, deduplicate `techIconMap` into `src/data/techIcons.ts`, move CodeBlock token data to `src/data/codeBlockTokens.ts`. |
| **Checklist** | ☐ One component per file ☐ Named exports (not default) for components ☐ Shared constants in dedicated modules (`src/lib/`) ☐ No duplicated exports across files ☐ Data modules do not import React components (decouple) |

---

### 3. Container / Presentational Pattern (via Hooks)

| Field | Detail |
|---|---|
| **Category** | React Pattern |
| **Description** | Separate data-fetching/business logic from rendering. In modern React, the "container" is replaced by custom hooks that provide data, and components focus on rendering JSX. |
| **Justification** | Several components mix data processing with rendering (e.g., `AboutSection` handles tab state + services + rendering). Extracting data logic into hooks improves testability and reusability. |
| **Project Example** | `ProjectsGallery.tsx` has `TiltCard` (presentational) but filtering logic lives inline. **Needed:** `useTiltCard()` custom hook, `useProjectFilter()` hook. `StatsCounter` data should derive from `cvData.ts` instead of hardcoding. |
| **Checklist** | ☐ Components receive data via props or hooks — no inline fetching in JSX ☐ Presentational components are pure (same props → same output) ☐ Business logic extracted to custom hooks or data modules ☐ Components under `ui/` are purely presentational ☐ Components under `sections/` orchestrate layout + hooks |

---

### 4. Compound Pattern

| Field | Detail |
|---|---|
| **Category** | React Pattern |
| **Description** | Multiple components share implicit state via React Context, forming a single logical unit. Parent provides state, children consume without prop drilling. |
| **Justification** | `AboutSection` has feature tabs + detail panels that share `activeFeature` state — a natural compound component. `LanguageSelector` dropdown + menu items could also benefit. |
| **Project Example** | **Needed:** `<FeatureTabs>` compound component with `<FeatureTabs.Tab>` and `<FeatureTabs.Panel>` sharing active tab state via context. |
| **Checklist** | ☐ Parent manages shared state via context ☐ Children use `useContext` to access parent state ☐ API is composable: `<Parent><Child /><Child /></Parent>` ☐ No excessive prop drilling between siblings ☐ Each child handles only its own rendering concern |

---

### 5. Observer Pattern

| Field | Detail |
|---|---|
| **Category** | JavaScript Pattern |
| **Description** | Objects (observers) subscribe to another object (observable) and get notified when events occur. Enforces separation of concerns and the single-responsibility principle. |
| **Justification** | The project already uses this pattern implicitly: `IntersectionObserver` for lazy loading (`OptimizedImage`, `DotNavigation`), `useScroll` for scroll-linked animations, `MutationObserver` in `MouseFollower`. Browser APIs and Framer Motion internals implement the observer pattern. |
| **Project Example** | `OptimizedImage.tsx` uses `IntersectionObserver` to trigger lazy image loading. `ExperienceTimeline.tsx` uses `useScroll` (observes scroll position). **Needed:** Centralize intersection observer logic into a `useIntersectionObserver` hook. |
| **Checklist** | ☐ Observers clean up subscriptions on unmount ☐ IntersectionObserver instances are disconnected in effect cleanup ☐ Event listeners removed in cleanup functions ☐ MutationObservers used sparingly (prefer event delegation) ☐ Framer Motion scroll observers use `useScroll` instead of manual listeners |

---

### 6. Dynamic Import / Code Splitting

| Field | Detail |
|---|---|
| **Category** | Performance Pattern |
| **Description** | Use `React.lazy()` + `<Suspense>` to split the bundle into smaller chunks loaded on demand. Components not visible on initial render are lazily imported, reducing the initial bundle size and improving LCP. |
| **Justification** | **Currently NOT implemented.** All 9 sections + footer are eagerly imported in `App.tsx`. Below-fold sections (`ProjectsGallery`, `CodeShowcase`, `ContactSection`, `Footer`) are never visible on initial page load and are strong candidates for lazy loading. |
| **Project Example** | **Needed in `App.tsx`:** `const ProjectsGallery = lazy(() => import('./components/sections/ProjectsGallery'))` wrapped in `<Suspense fallback={<SectionSkeleton />}>`. |
| **Checklist** | ☐ Below-fold sections use `React.lazy()` ☐ Each lazy component wrapped in `<Suspense>` with meaningful fallback ☐ Vite produces separate chunks (verify with `vite build --report`) ☐ Critical above-fold sections remain eagerly imported ☐ No layout shift when lazy sections load |

---

### 7. Import On Visibility

| Field | Detail |
|---|---|
| **Category** | Performance Pattern |
| **Description** | Defer importing a component/module until it enters the viewport, using `IntersectionObserver` to trigger the import. |
| **Justification** | `OptimizedImage` already implements this for images. The same principle should apply to heavy section components that are far below the fold. |
| **Project Example** | `OptimizedImage.tsx` uses `IntersectionObserver` for lazy image loading with blur-up. **Needed:** Combine with `React.lazy` for section-level import-on-visibility. |
| **Checklist** | ☐ Heavy below-fold components import only when near viewport ☐ `IntersectionObserver` with `rootMargin` for pre-loading (e.g., `200px`) ☐ Fallback skeleton shown during load ☐ Observer disconnected after first intersection |

---

### 8. Tree Shaking

| Field | Detail |
|---|---|
| **Category** | Performance Pattern |
| **Description** | Bundler eliminates unused code (dead code) from the final bundle. Requires ES module syntax (`import`/`export`), no side effects in modules, and named imports. |
| **Justification** | Vite (Rollup) performs tree-shaking automatically, but it can be broken by: wildcard imports (`import * as`), side-effectful modules, and barrel re-exports. `IconComponent.tsx` uses `import * as LucideIcons` which defeats tree-shaking for the entire Lucide library. |
| **Project Example** | **Violation:** `IconComponent.tsx` — `import * as LucideIcons from 'lucide-react'` imports the entire icon library. **Fix:** Use a curated map with individual imports. |
| **Checklist** | ☐ No `import *` from large libraries ☐ No barrel re-exports (`index.ts`) that import unused modules ☐ `sideEffects: false` in `package.json` (if publishing) ☐ Named imports only: `import { specific } from 'lib'` ☐ Verify bundle size with `npx vite-bundle-visualizer` |

---

### 9. Singleton Pattern (via Context)

| Field | Detail |
|---|---|
| **Category** | JavaScript Pattern |
| **Description** | A single shared instance accessible globally. In React, this is implemented via Context + Provider rather than module-level singletons, providing a read-only global state. |
| **Justification** | `ThemeContext` is the project's singleton — one theme state shared across all components. The i18n instance is also a module-level singleton. Using context ensures proper React re-rendering on state changes. |
| **Project Example** | `ThemeContext.tsx` provides `{ theme, setTheme }` via `ThemeProvider`. `i18n.ts` exports a configured singleton instance. |
| **Checklist** | ☐ Global state uses React Context (not module-level mutable state) ☐ Context providers wrap the app at the root level ☐ Context values are memoized to prevent unnecessary re-renders ☐ No module-level mutable state except for imperative libraries (i18n) |

---

### Patterns NOT Applicable to This Project

| Pattern | Reason |
|---|---|
| Server-Side Rendering (SSR) | Static SPA deployed to Vercel, no server runtime |
| Static Rendering / ISG | No build-time data fetching; all content is client-side |
| Progressive Hydration | No SSR, so no hydration phase |
| Streaming SSR | No server runtime |
| React Server Components | Requires a server framework (Next.js, Remix) |
| Proxy Pattern | No ORM or deep object interception needed |
| Flyweight Pattern | No large-scale shared object instances |
| Mediator/Middleware | No complex inter-component communication layer |
| Factory Pattern | No dynamic object creation at runtime |

---

### Pattern Validation Checklist (Global)

- [ ] Every component uses Hooks — no class components anywhere
- [ ] Custom hooks extracted for shared logic (`useClickOutside`, `useIntersectionObserver`, etc.)
- [ ] One component per file, named export, PascalCase
- [ ] Shared constants in `src/lib/` (motion easing, animation presets)
- [ ] Duplicated code extracted to shared modules
- [ ] Data files (`src/data/`) are pure TypeScript — no React imports
- [ ] Below-fold sections use `React.lazy()` + `<Suspense>`
- [ ] No `import *` from large libraries
- [ ] IntersectionObserver / event listeners always cleaned up
- [ ] Context values memoized with `useMemo`
- [ ] Performance-sensitive handlers use `useCallback`
- [ ] `filteredProjects` and similar computed data use `useMemo`
- [ ] `MouseFollower` uses `useMotionValue` instead of `useState` for position
- [ ] All sections respect `useReducedMotion()`
- [ ] Error boundaries at section level for graceful degradation

---

## Implementation Plan

> Step-by-step plan to apply all patterns and achieve clean code across the codebase.

### Phase 1 — Shared Infrastructure (`src/lib/`)

1. **Create `src/lib/motion.ts`** — Export `APPLE_EASE`, `SPRING_CONFIG`, `ENTRY_ANIMATION`, and shared animation presets. Remove duplicated `[0.16, 1, 0.3, 1]` from every component.
2. **Create `src/data/techIcons.ts`** — Deduplicate `techIconMap` from `ExperienceTimeline.tsx` and `SkillsMarquee.tsx`.
3. **Create `src/data/codeBlockTokens.ts`** — Extract ~400 lines of token data from `CodeBlock.tsx`.
4. **Create `src/hooks/useClickOutside.ts`** — Shared hook for `LanguageSelector` and future dropdowns.

### Phase 2 — Code Splitting & Performance

5. **Add `React.lazy()` to `App.tsx`** — Lazy-load `ProjectsGallery`, `CodeShowcase`, `ContactSection`, `Footer`.
6. **Fix `MouseFollower.tsx`** — Replace `useState` with `useMotionValue` for cursor position; replace `MutationObserver` with event delegation.
7. **Add `useMemo` to `ProjectsGallery.tsx`** — Memoize `filteredProjects`.
8. **Add `useCallback` to `TiltCard`** — Memoize `handleMouseMove` and `handleMouseLeave`.
9. **Fix `IconComponent.tsx`** — Replace `import *` with curated individual imports.
10. **Add `useReducedMotion` to `SkillsMarquee.tsx`** — Pause marquee animation when reduced motion is preferred.

### Phase 3 — Clean Code & Type Safety

11. **Create `src/types/data.ts`** — Explicit interfaces for `Project`, `Experience`, `PersonalInfo`, `Skill`, `Service`.
12. **Decouple `cvData.ts` from React** — Replace Lucide component imports with string icon names; resolve via `IconComponent` at render time.
13. **Fix `ThemeContextBase.ts`** — Use `null` default for context to make the guard actually work.
14. **Fix `ThemeToggle.tsx`** — Support 3-state theme cycle: `light → dark → system → light`.
15. **Remove unused `children` prop from `SectionHeader.tsx`**.

### Phase 4 — Validation & Verification

16. **Run `tsc --noEmit`** — Ensure zero TypeScript errors.
17. **Run `pnpm build`** — Verify Vite build succeeds with code splitting producing separate chunks.
18. **Run `pnpm lint`** — Ensure zero ESLint errors.

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
