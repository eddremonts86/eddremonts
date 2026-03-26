import { Logo } from '@/components/ui/media/Logo';
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

  const navLinks = NAV_SECTIONS.filter((s) => s.id !== 'hero');

  return (
    <AnimatePresence>
      {visible && (
        <m.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: APPLE_EASE }}
          className="bg-background/80 fixed left-0 top-0 z-[100] w-full border-b border-subtle pt-[env(safe-area-inset-top)] backdrop-blur-xl"
          aria-label={t('a11y.mainNav')}
        >
          <div className="container flex items-center justify-between gap-3 px-4 py-3 mx-auto md:gap-4 md:px-6 md:py-4">
            {/* Brand / Logo */}
            <a href="#hero" className="transition-opacity shrink-0 text-foreground hover:opacity-80">
              <Logo className="w-auto h-10 md:h-12" />
            </a>

            {/* Nav Links — hidden on mobile, visible on md+ */}
            <div className="items-center hidden gap-6 overflow-x-auto hide-scrollbar md:flex lg:gap-8">
              {navLinks.map(({ id, labelKey }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="text-primary whitespace-nowrap font-mono text-[11px] uppercase tracking-widest transition-all hover:text-foreground"
                >
                  {t(labelKey)}
                </a>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 shrink-0 sm:gap-4">
              <LanguageSelector />
              <ThemeToggle />

              {/* Hamburger — visible only on mobile */}
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="flex items-center justify-center w-10 h-10 transition-colors duration-300 border rounded-full text-foreground/70 border-subtle bg-surface hover:text-foreground md:hidden"
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
                className="overflow-hidden border-t border-subtle md:hidden"
              >
                <div className="container flex flex-col gap-3 px-4 py-4 mx-auto">
                  {navLinks.map(({ id, labelKey }, i) => (
                    <m.a
                      key={id}
                      href={`#${id}`}
                      onClick={closeMobile}
                      initial={{ x: -16, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.3, ease: APPLE_EASE }}
                      className="py-2 font-mono text-xs tracking-widest uppercase transition-colors text-primary hover:text-foreground"
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
