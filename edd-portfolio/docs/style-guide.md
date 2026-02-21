# Style Guide: Apple x Anime Minimalist

This project executes a hybrid visual language bridging Apple's stark minimalism with the kinetic energy of Japanese Anime.

## 1. Typography Hierarchy
The design relies on extreme contrast between negative space and typography size.
- **Base/Body (`font-body`)**: San Francisco (`-apple-system`, `BlinkMacSystemFont`, etc). Used for utilitarian read text.
- **Display/Headings (`font-display`)**: M PLUS 1 Variable (`@fontsource-variable/m-plus-1`). Modern Japanese-flavored typeface for impactful headlines.

## 2. Color System
The colors eschew typical dark modes for an "Ultra Light" environment with vibrant neon accents:
- `background`: `#FBFBFD` (Apple White/Gray)
- `foreground`: `#1D1D1F` (Apple Pure Dark)
- `primary`: `#00E5FF` (Electric Cyan)
- `secondary`: `#FF2A85` (Sakura Pink)
- `accent`: `#8A2BE2` (Deep Purple)

## 3. Motion & Animation Principles
Animations utilize physics-based springs (via Framer Motion) mimicking natural momentum, alongside CSS keyframes for organic backgrounds.

### Core Easings
- `Apple Default`: `ease: [0.16, 1, 0.3, 1]` (Used for 90% of UI mounts: Modals, lists, cards entering the viewport).

### Interactive Layers (Glassmorphism + Neon)
- Cards utilize `.apple-glass` (`bg-white/70`, `backdrop-blur-xl`, with ultra-soft `#000/[0.04]` shadows).
- On hover/interaction, these cards reveal Anime color splashes (e.g. `bg-gradient-to-r from-primary to-accent opacity-100`) and emit `.neon-glow-*` shadows behind the card.

### Parallax Engine
Elements in `ProjectsGallery` and `ExperienceTimeline` are linked to the global `scrollYProgress` using `useScroll`. Backgrounds move at variables of `-0.1` to `-0.5` against standard scroll, yielding deep immersion without overwhelming the content structure.
