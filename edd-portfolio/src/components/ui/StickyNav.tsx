import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
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
    setVisible(latest > window.innerHeight * 0.85);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: APPLE_EASE }}
          className="fixed top-0 left-0 w-full z-[100] bg-background border-b-2 border-foreground"
          aria-label="Main navigation"
        >
          <div className="container mx-auto px-4 md:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            
            {/* Brand / Logo */}
            <a
              href="#"
              className="text-xl md:text-2xl font-black uppercase tracking-tighter text-foreground hover:text-primary transition-colors whitespace-nowrap leading-none"
            >
              EDD_R
            </a>

            {/* Nav Links - Scrollable on mobile, flex on desktop */}
            <div className="flex items-center gap-4 md:gap-8 overflow-x-auto hide-scrollbar w-full md:w-auto order-3 md:order-2 pb-2 md:pb-0">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs md:text-sm font-bold uppercase tracking-widest text-foreground/50 hover:text-foreground transition-colors whitespace-nowrap"
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