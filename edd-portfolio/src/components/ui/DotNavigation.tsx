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
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[90] hidden lg:flex flex-col gap-4"
      aria-label="Section navigation"
    >
      {sections.map((id) => (
        <a
          key={id}
          href={id === 'hero' ? '#' : `#${id}`}
          aria-label={sectionLabels[id]}
          className="group relative flex items-center justify-end h-4"
        >
          {/* Label tooltip */}
          <span className="absolute right-6 px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-foreground/70 bg-surface border border-subtle rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            {sectionLabels[id]}
          </span>

          <motion.div
            className={`transition-all duration-500 rounded-full ${
              activeSection === id
                ? 'bg-primary w-1.5 h-6'
                : 'bg-foreground/20 w-1.5 h-1.5 hover:bg-foreground/50'
            }`}
          />
        </a>
      ))}
    </nav>
  );
};
