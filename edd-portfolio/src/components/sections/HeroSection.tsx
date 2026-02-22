import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { personalInfo } from '@/data/cvData';
import { motion } from 'framer-motion';
import { ChevronDown, FileDown, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const particleConfigs = Array.from({ length: 15 }, () => ({
  width: `${Math.random() * 6 + 2}px`,
  height: `${Math.random() * 6 + 2}px`,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  animationDuration: `${Math.random() * 5 + 5}s`,
  animationDelay: `${Math.random() * 5}s`,
  offsetX: Math.random() * 20 - 10,
  transitionDuration: Math.random() * 4 + 4,
}));

const ParticleLayer = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particleConfigs.map((config, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${i % 2 === 0 ? 'bg-secondary' : 'bg-primary'} blur-[1px] opacity-40`}
          style={{
            width: config.width,
            height: config.height,
            left: config.left,
            top: config.top,
            animationDuration: config.animationDuration,
            animationDelay: config.animationDelay,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, config.offsetX, 0],
            opacity: [0.2, 0.7, 0.2]
          }}
          transition={{
            duration: config.transitionDuration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Very soft glowing Apple-like huge blobs but with Anime colors */}
      <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-[100px] animate-blob" />
      <div className="absolute top-[30%] -right-[15%] w-[50%] h-[50%] bg-gradient-to-bl from-secondary/10 to-accent/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
    </div>
  );
};

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <ParticleLayer />

      <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
        <LanguageSelector />
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center">

        {/* Apple style badge with subtle neon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} /* Apple custom ease */
          className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full apple-glass text-sm font-medium tracking-wide text-foreground shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-primary animate-sparkle" />
          <span>{t('hero.available')}</span>
        </motion.div>

        {/* Huge bold typography combining Apple's layout clarity with Anime colors */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-[10rem] font-black mb-6 tracking-tighter leading-[0.9] text-foreground"
        >
          {t('hero.greeting')} <br/>
          <span className="text-gradient-anime drop-shadow-sm pb-4 block">{personalInfo.name}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-3xl font-display font-medium text-foreground/70 max-w-3xl mb-8 tracking-tight"
        >
          {t('personalInfo.title')}
        </motion.p>

        <motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.4 }}
           className="text-base md:text-lg text-foreground/70 max-w-2xl mb-12 font-body font-light leading-relaxed"
        >
          {t('personalInfo.description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-5 items-center"
        >
          {/* Neon Anime Button matching Apple's rounded shape */}
          <a
            href="#projects"
            className="group relative px-8 py-4 bg-foreground text-background rounded-2xl font-semibold tracking-wide overflow-hidden transition-all hover:scale-[1.02] shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,229,255,0.3)]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {t('hero.explore')}
            </span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>

          {/* Apple Glass Button */}
          <a
            href="https://eddremonts.dk/storage/app/media/Eduardo%20Valdes%20Inearte%20-%20Frontend%20Developer.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-4 apple-glass text-foreground rounded-2xl font-semibold tracking-wide transition-all hover:scale-[1.02] hover:bg-white/90"
          >
            <span>{t('nav.resume')}</span>
            <FileDown className="w-5 h-5 text-foreground/70" />
          </a>
        </motion.div>
      </div>

      <motion.div
        inherit={false}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <a href="#about" aria-label="Scroll down" className="flex flex-col items-center gap-2 text-foreground/70 hover:text-primary transition-colors cursor-pointer group">
          <span className="text-xs uppercase tracking-widest font-semibold group-hover:text-primary transition-colors">{t('nav.discover')}</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};
