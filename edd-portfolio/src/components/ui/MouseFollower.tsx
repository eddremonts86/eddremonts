import { useCallback, useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select';

/** Spring config matching the original, but driven by MotionValues to skip React re-renders */
const springCfg = { damping: 25, stiffness: 200, mass: 0.5 };

export const MouseFollower = () => {
  const [isHovering, setIsHovering] = useState(false);
  const reduceMotion = useReducedMotion();

  // Raw position — updated 60 fps without React rerenders
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smoothed springs for the rendered circle
  const springX = useSpring(cursorX, springCfg);
  const springY = useSpring(cursorY, springCfg);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY],
  );

  useEffect(() => {
    if (reduceMotion) return;

    // Event delegation — one listener on document instead of binding every element
    const handleOver = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.(INTERACTIVE_SELECTOR)) {
        setIsHovering(true);
      }
    };
    const handleOut = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.(INTERACTIVE_SELECTOR)) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseout', handleOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, [reduceMotion, handleMouseMove]);

  if (reduceMotion) return null;

  const size = isHovering ? 48 : 320;
  const offset = size / 2;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block"
      aria-hidden="true"
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          x: springX,
          y: springY,
          width: size,
          height: size,
          translateX: -offset,
          translateY: -offset,
          opacity: isHovering ? 0.2 : 0.07,
          background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
        }}
        animate={{
          width: size,
          height: size,
          opacity: isHovering ? 0.2 : 0.07,
        }}
        transition={springCfg}
      />
    </motion.div>
  );
};
