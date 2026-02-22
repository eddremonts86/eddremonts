import { useTheme } from '@/contexts/ThemeContextBase';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full apple-glass text-foreground hover:text-primary transition-colors flex items-center justify-center group relative overflow-hidden"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 0 : 90,
          scale: theme === 'dark' ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute"
      >
        <Moon className="w-5 h-5" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'light' ? 0 : -90,
          scale: theme === 'light' ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute"
      >
        <Sun className="w-5 h-5" />
      </motion.div>
      <span className="w-5 h-5 invisible">Placeholder</span>
    </button>
  );
};
