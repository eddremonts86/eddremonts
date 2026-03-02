import { useTheme } from '@/contexts/ThemeContextBase';
import type { Theme } from '@/contexts/ThemeContextBase';
import { APPLE_EASE } from '@/lib/motion';
import { motion } from 'framer-motion';
import { Monitor, Moon, Sun } from 'lucide-react';

const CYCLE: Theme[] = ['light', 'dark', 'system'];

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const next = () => {
    const idx = CYCLE.indexOf(theme);
    setTheme(CYCLE[(idx + 1) % CYCLE.length]);
  };

  const isActive = (t: Theme) => theme === t;

  return (
    <button
      onClick={next}
      className="p-2 rounded-full apple-glass text-foreground hover:text-primary transition-colors flex items-center justify-center group relative overflow-hidden"
      aria-label={`Theme: ${theme}. Click to switch.`}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isActive('dark') ? 0 : 90,
          scale: isActive('dark') ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: APPLE_EASE }}
        className="absolute"
      >
        <Moon className="w-5 h-5" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          rotate: isActive('light') ? 0 : -90,
          scale: isActive('light') ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: APPLE_EASE }}
        className="absolute"
      >
        <Sun className="w-5 h-5" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          rotate: isActive('system') ? 0 : -90,
          scale: isActive('system') ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: APPLE_EASE }}
        className="absolute"
      >
        <Monitor className="w-5 h-5" />
      </motion.div>
      <span className="w-5 h-5 invisible" aria-hidden="true" />
    </button>
  );
};
