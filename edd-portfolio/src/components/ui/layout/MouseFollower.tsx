import { useMousePosition } from '@/hooks/useMousePosition';
import { useEffect, useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select';

export const MouseFollower = () => {
  const [isHovering, setIsHovering] = useState(false);
  const reduceMotion = useReducedMotion();
  const { springX, springY } = useMousePosition();

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

    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseout', handleOut, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  // Elegant sizing
  const size = isHovering ? 60 : 12;
  const offset = size / 2;

  return (
    <m.div
      className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block"
      aria-hidden="true"
    >
      <m.div
        className="absolute flex items-center justify-center rounded-full border border-primary/50 bg-primary/10 backdrop-blur-[2px]"
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
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
      </m.div>
    </m.div>
  );
};
