import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const MouseFollower = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleInteractiveEnter = () => setIsHovering(true);
    const handleInteractiveLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Detect hovering over interactive elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select').forEach((el) => {
        el.addEventListener('mouseenter', handleInteractiveEnter);
        el.addEventListener('mouseleave', handleInteractiveLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial binding
    document.querySelectorAll('a, button, [role="button"], input, textarea, select').forEach((el) => {
      el.addEventListener('mouseenter', handleInteractiveEnter);
      el.addEventListener('mouseleave', handleInteractiveLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block"
      aria-hidden="true"
    >
      <motion.div
        className="absolute rounded-full"
        animate={{
          x: position.x - (isHovering ? 24 : 160),
          y: position.y - (isHovering ? 24 : 160),
          width: isHovering ? 48 : 320,
          height: isHovering ? 48 : 320,
          opacity: isHovering ? 0.2 : 0.07,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 200,
          mass: 0.5,
        }}
        style={{
          background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  );
};
