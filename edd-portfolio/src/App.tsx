import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense, useState } from 'react';
import { Footer } from './components/Footer';
import { AboutSection } from './components/sections/AboutSection';
import { ExperienceTimeline } from './components/sections/ExperienceTimeline';
import { HeroSection } from './components/sections/HeroSection';
import { DotNavigation } from './components/ui/DotNavigation';
import { MouseFollower } from './components/ui/MouseFollower';
import { Preloader } from './components/ui/Preloader';
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
  const [loading, setLoading] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <Preloader key="preloader" onComplete={() => setLoading(false)} />
      ) : (
        <motion.div
          key="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-screen bg-background text-foreground"
        >
          <SEO />
          <a href="#about" className="skip-to-content">
            Skip to content
          </a>
          <MouseFollower />
          <StickyNav />
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
      )}
    </AnimatePresence>
  );
}

export default App;
