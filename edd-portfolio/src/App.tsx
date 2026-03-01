import { AnimatePresence, motion } from 'framer-motion';
import { Footer } from './components/Footer';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';
import { ExperienceTimeline } from './components/sections/ExperienceTimeline';
import { HeroSection } from './components/sections/HeroSection';
import { ProjectsGallery } from './components/sections/ProjectsGallery';
import { SEO } from './components/ui/SEO';

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
    </AnimatePresence>
  );
}

export default App;
