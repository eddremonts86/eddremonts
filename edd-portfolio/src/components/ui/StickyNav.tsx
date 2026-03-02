import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { personalInfo } from '@/data/cvData';
import { APPLE_EASE } from '@/lib/motion';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const navLinks = [
  { href: '#about', key: 'nav.about' },
  { href: '#experience', key: 'nav.experience' },
  { href: '#projects', key: 'nav.projects' },
  { href: '#contact', key: 'nav.contact' },
];

export const StickyNav = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    // Show after scrolling past the hero (~90vh)
    setVisible(latest > window.innerHeight * 0.85);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.4, ease: APPLE_EASE }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-4xl"
          aria-label="Main navigation"
        >
          <div className="apple-glass rounded-2xl px-6 py-3 flex items-center justify-between gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
            {/* Brand */}
            <a
              href="#"
              className="text-sm font-black tracking-tighter text-foreground font-display hover:text-primary transition-colors whitespace-nowrap"
            >
              {personalInfo.name}
            </a>

            {/* Nav Links */}
            <div className="hidden sm:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 text-[13px] font-medium text-foreground/70 hover:text-foreground rounded-lg hover:bg-foreground/[0.04] transition-all"
                >
                  {t(link.key)}
                </a>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
