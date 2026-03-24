import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
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
    setVisible(latest > window.innerHeight * 0.85);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 w-full z-[100] bg-background/80 backdrop-blur-xl border-b border-subtle"
          aria-label="Main navigation"
        >
          <div className="container mx-auto px-4 md:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            
            {/* Brand / Logo */}
            <a
              href="#"
              className="text-lg md:text-xl font-serif italic text-foreground hover:text-primary transition-colors whitespace-nowrap leading-none"
            >
              Edd~R
            </a>

            {/* Nav Links - Scrollable on mobile, flex on desktop */}
            <div className="flex items-center gap-6 md:gap-8 overflow-x-auto hide-scrollbar w-full md:w-auto order-3 md:order-2 pb-2 md:pb-0">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[11px] font-mono uppercase tracking-widest text-foreground/50 hover:text-foreground hover:opacity-100 transition-all whitespace-nowrap"
                >
                  {t(link.key)}
                </a>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 order-2 md:order-3">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};