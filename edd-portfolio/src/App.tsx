import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';
import { ExperienceTimeline } from './components/sections/ExperienceTimeline';
import { HeroSection } from './components/sections/HeroSection';
import { ProjectsGallery } from './components/sections/ProjectsGallery';
import { SEO } from './components/ui/SEO';

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Initial mount transition
    setMounted(true);
  }, []);

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-screen bg-background text-foreground selection:bg-primary/30"
        >
          <SEO />
          {/* Main Navigation (Optional minimalist nav if needed, skipping for full immersive scroll) */}
          <main>
            <HeroSection />
            <AboutSection />
            <ExperienceTimeline />
            <ProjectsGallery />
            <ContactSection />
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
