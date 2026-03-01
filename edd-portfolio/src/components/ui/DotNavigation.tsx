import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const sections = ['hero', 'about', 'experience', 'projects', 'contact'];

const sectionLabels: Record<string, string> = {
  hero: 'Home',
  about: 'About',
  experience: 'Experience',
  projects: 'Projects',
  contact: 'Contact',
};

export const DotNavigation = () => {
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
    sections.forEach((id) => {
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
        { threshold: 0.3 }
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
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[90] hidden lg:flex flex-col gap-3"
      aria-label="Section navigation"
    >
      {sections.map((id) => (
        <a
          key={id}
          href={id === 'hero' ? '#' : `#${id}`}
          aria-label={sectionLabels[id]}
          className="group relative flex items-center justify-end"
        >
          {/* Label tooltip */}
          <span className="absolute right-7 px-2 py-1 text-[11px] font-medium text-foreground bg-surface apple-glass rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-sm">
            {sectionLabels[id]}
          </span>

          <motion.div
            className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${
              activeSection === id
                ? 'bg-primary border-primary shadow-[0_0_8px_rgba(0,229,255,0.5)] scale-125'
                : 'bg-transparent border-foreground/20 hover:border-foreground/50'
            }`}
            animate={activeSection === id ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.5 }}
          />
        </a>
      ))}
    </nav>
  );
};
