import { NAV_SECTIONS } from '@/data/navigation';
import { m } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const DotNavigation = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Show/hide based on scroll
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Observe sections
    NAV_SECTIONS.forEach(({ id }) => {
      const el = id === 'hero' ? document.querySelector('section') : document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.3 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  if (!isVisible) return null;

  return (
    <nav
      className="fixed right-6 top-1/2 z-[90] hidden -translate-y-1/2 flex-col gap-4 lg:flex"
      aria-label="Section navigation"
    >
      {NAV_SECTIONS.map(({ id, labelKey }) => (
        <a
          key={id}
          href={id === 'hero' ? '#' : `#${id}`}
          aria-label={t(labelKey)}
          className="group relative flex h-4 items-center justify-end"
        >
          {/* Label tooltip */}
          <span className="text-foreground/70 pointer-events-none absolute right-6 whitespace-nowrap rounded border border-subtle bg-surface px-2 py-1 font-mono text-[10px] uppercase tracking-widest opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {t(labelKey)}
          </span>

          <m.div
            className={`rounded-full transition-all duration-500 ${
              activeSection === id
                ? 'h-6 w-1.5 bg-primary'
                : 'bg-foreground/20 hover:bg-foreground/50 h-1.5 w-1.5'
            }`}
          />
        </a>
      ))}
    </nav>
  );
};
