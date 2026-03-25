import { useTheme } from '@/contexts/ThemeContextBase';
import type { Theme } from '@/contexts/ThemeContextBase';
import { APPLE_EASE } from '@/lib/motion';
import { m } from 'framer-motion';
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
      className="w-10 h-10 flex items-center justify-center border border-subtle bg-surface text-foreground/70 hover:text-foreground transition-colors duration-500 rounded-full min-w-[40px] min-h-[40px] group relative overflow-hidden shadow-sm"
      aria-label={`Theme: ${theme}. Click to switch.`}
    >
      <m.div
        initial={false}
        animate={{
          rotate: isActive('dark') ? 0 : 90,
          scale: isActive('dark') ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: APPLE_EASE }}
        className="absolute"
      >
        <Moon className="w-4 h-4 text-foreground/70 group-hover:text-foreground transition-colors" />
      </m.div>
      <m.div
        initial={false}
        animate={{
          rotate: isActive('light') ? 0 : -90,
          scale: isActive('light') ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: APPLE_EASE }}
        className="absolute"
      >
        <Sun className="w-4 h-4 text-foreground/70 group-hover:text-foreground transition-colors" />
      </m.div>
      <m.div
        initial={false}
        animate={{
          rotate: isActive('system') ? 0 : -90,
          scale: isActive('system') ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: APPLE_EASE }}
        className="absolute"
      >
        <Monitor className="w-4 h-4 text-foreground/70 group-hover:text-foreground transition-colors" />
      </m.div>
      <span className="w-4 h-4 invisible" aria-hidden="true" />
    </button>
  );
};
