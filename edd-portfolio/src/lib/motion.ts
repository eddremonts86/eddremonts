/**
 * Shared animation constants and presets.
 * Import from '@/lib/motion' instead of duplicating values.
 *
 * @module motion
 */

/** Apple-standard cubic-bezier easing — used in 90% of UI transitions */
export const APPLE_EASE = [0.16, 1, 0.3, 1] as const;

/** Default spring config for physics-based interactions (e.g., tilt cards) */
export const SPRING_CONFIG = { stiffness: 150, damping: 20 } as const;

/** Standard entry animation for elements appearing from below */
export const ENTRY_INITIAL = { opacity: 0, y: 20 } as const;
export const ENTRY_ANIMATE = { opacity: 1, y: 0 } as const;

/** Standard section entry animation (larger movement) */
export const SECTION_ENTRY_INITIAL = { opacity: 0, y: 30 } as const;
export const SECTION_ENTRY_ANIMATE = { opacity: 1, y: 0 } as const;

/** Default transition using Apple ease */
export const APPLE_TRANSITION = {
  duration: 0.8,
  ease: APPLE_EASE,
} as const;

/** Staggered children transition */
export const staggerChildren = (stagger = 0.1) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger },
  },
});

/** Viewport config for whileInView animations */
export const VIEWPORT_ONCE = { once: true, margin: '-100px' as const };
