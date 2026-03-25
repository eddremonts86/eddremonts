import { LanguageSelector } from '@/components/ui/navigation/LanguageSelector';
import { ThemeToggle } from '@/components/ui/navigation/ThemeToggle';
import { NAV_SECTIONS } from '@/data/navigation';
import { APPLE_EASE } from '@/lib/motion';
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const StickyNav = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > window.innerHeight * 0.85);
  });

  // Close mobile menu when nav becomes hidden
  useEffect(() => {
    if (!visible) setMobileOpen(false);
  }, [visible]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const navLinks = NAV_SECTIONS.filter(s => s.id !== 'hero');

  return (
    <AnimatePresence>
      {visible && (
        <m.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: APPLE_EASE }}
          className="fixed top-0 left-0 w-full z-[100] bg-background/80 backdrop-blur-xl border-b border-subtle pt-[env(safe-area-inset-top)]"
          aria-label="Main navigation"
        >
          <div className="container mx-auto px-4 py-3 md:py-4 md:px-6 flex items-center justify-between gap-3 md:gap-4">
            
            {/* Brand / Logo */}
            <a
              href="#hero"
              className="text-lg md:text-xl font-serif italic text-foreground hover:text-primary transition-colors whitespace-nowrap leading-none shrink-0"
            >
              Edd~R
            </a>

            {/* Nav Links — hidden on mobile, visible on md+ */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8 overflow-x-auto hide-scrollbar">
              {navLinks.map(({ id, labelKey }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="text-[11px] font-mono uppercase tracking-widest text-foreground/50 hover:text-foreground transition-all whitespace-nowrap"
                >
                  {t(labelKey)}
                </a>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <LanguageSelector />
              <ThemeToggle />

              {/* Hamburger — visible only on mobile */}
              <button
                onClick={() => setMobileOpen(prev => !prev)}
                className="md:hidden w-10 h-10 flex items-center justify-center border border-subtle bg-surface text-foreground/70 hover:text-foreground transition-colors duration-300 rounded-full"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <m.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-4 h-4" />
                    </m.span>
                  ) : (
                    <m.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-4 h-4" />
                    </m.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Mobile dropdown menu */}
          <AnimatePresence>
            {mobileOpen && (
              <m.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: APPLE_EASE }}
                className="md:hidden overflow-hidden border-t border-subtle"
              >
                <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
                  {navLinks.map(({ id, labelKey }, i) => (
                    <m.a
                      key={id}
                      href={`#${id}`}
                      onClick={closeMobile}
                      initial={{ x: -16, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.3, ease: APPLE_EASE }}
                      className="text-xs font-mono uppercase tracking-widest text-foreground/60 hover:text-foreground py-2 transition-colors"
                    >
                      {t(labelKey)}
                    </m.a>
                  ))}
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </m.nav>
      )}
    </AnimatePresence>
  );
};
