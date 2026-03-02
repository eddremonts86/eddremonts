import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { Footer } from './components/Footer';
import { AboutSection } from './components/sections/AboutSection';
import { ExperienceTimeline } from './components/sections/ExperienceTimeline';
import { HeroSection } from './components/sections/HeroSection';
import { DotNavigation } from './components/ui/DotNavigation';
import { MouseFollower } from './components/ui/MouseFollower';
import { SEO } from './components/ui/SEO';
import { SkillsMarquee } from './components/ui/SkillsMarquee';
import { StatsCounter } from './components/ui/StatsCounter';
import { StickyNav } from './components/ui/StickyNav';
import { TestimonialBlock } from './components/ui/TestimonialBlock';

/* ── Below-fold sections — code-split for faster initial load ── */
const ProjectsGallery = lazy(() =>
  import('./components/sections/ProjectsGallery').then((m) => ({ default: m.ProjectsGallery })),
);
const CodeShowcase = lazy(() =>
  import('./components/sections/CodeShowcase').then((m) => ({ default: m.CodeShowcase })),
);
const ContactSection = lazy(() =>
  import('./components/sections/ContactSection').then((m) => ({ default: m.ContactSection })),
);

function App() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen bg-background text-foreground"
      >
        <SEO />
        {/* Skip to content for keyboard a11y */}
        <a href="#about" className="skip-to-content">
          Skip to content
        </a>
        {/* Ambient mouse follower (desktop only) */}
        <MouseFollower />
        {/* Sticky glassmorphism nav (shows after hero) */}
        <StickyNav />
        {/* Dot section indicator (desktop only) */}
        <DotNavigation />

        <main>
          <HeroSection />
          <StatsCounter />
          <AboutSection />
          <SkillsMarquee />
          <ExperienceTimeline />
          <TestimonialBlock />
          <Suspense fallback={null}>
            <ProjectsGallery />
            <CodeShowcase />
            <ContactSection />
          </Suspense>
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
