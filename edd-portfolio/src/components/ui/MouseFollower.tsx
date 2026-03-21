import { useCallback, useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, AnimatePresence } from 'framer-motion';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select';

/** Spring config for a snappier, mechanical feel */
const springCfg = { damping: 20, stiffness: 300, mass: 0.2 };

export const MouseFollower = () => {
  const [isHovering, setIsHovering] = useState(false);
  const reduceMotion = useReducedMotion();

  // Raw position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smoothed springs
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

  // Brutalist crosshair sizes
  const size = isHovering ? 100 : 20;
  const offset = size / 2;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block mix-blend-difference"
      aria-hidden="true"
    >
      <motion.div
        className="absolute flex items-center justify-center bg-white rounded-full overflow-hidden"
        style={{
          x: springX,
          y: springY,
          width: size,
          height: size,
          translateX: -offset,
          translateY: -offset,
        }}
        animate={{
          width: size,
          height: size,
          scale: isHovering ? 1 : 1,
        }}
        transition={springCfg}
      >
        <AnimatePresence>
          {isHovering && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-black font-black text-xs tracking-widest uppercase"
            >
              EXPLORE
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};