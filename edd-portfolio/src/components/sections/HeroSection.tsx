import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

export const HeroSection = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col justify-end pb-24 md:pb-32 overflow-hidden bg-background"
    >
      {/* Editorial Ambient Light */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-20 mix-blend-screen dark:mix-blend-lighten">
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[70vw] h-[70vw] rounded-full bg-primary/10 blur-[120px]"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-secondary/10 blur-[100px]"
        />
      </div>

      {/* Header Utilities */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute top-6 right-6 lg:top-10 lg:right-10 z-50 flex items-center gap-6"
      >
        <LanguageSelector />
        <ThemeToggle />
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="container mx-auto px-6 relative z-10 w-full"
      >
        <div className="w-full max-w-[1400px] mx-auto xl:pl-12">
          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-baseline sm:items-center gap-4 mb-4 md:mb-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] font-medium text-foreground/60 break-words">
                {t('hero.available', 'STATUS: ACCEPTING SELECT PROJECTS')}
              </span>
            </div>
          </motion.div>

          {/* Huge Typography - Very Editorial */}
          <div className="relative w-full z-10">
            <h1 className="flex flex-col text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7.5rem] leading-[0.9] font-light tracking-tight mb-8 md:mb-12 w-full text-foreground">
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="block font-serif text-primary"
              >
                {t('hero.greeting', "Hello, I'm")} Edd.
              </motion.span>

              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="block font-display font-medium tracking-tighter mix-blend-difference mt-2 md:mt-4"
              >
                Frontend
              </motion.span>
              
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                className="block font-serif italic opacity-70 ml-[10%] sm:ml-[15%] lg:ml-[20%]"
              >
                Craftsman.
              </motion.span>
            </h1>
          </div>

          {/* Description & CTAs */}
          <div className="grid md:grid-cols-12 gap-8 items-end mt-12 md:mt-24">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="md:col-span-8 lg:col-span-6 lg:col-start-3"
            >
              <p className="text-base md:text-xl font-body text-foreground/80 leading-relaxed font-light mb-8 md:mb-0 max-w-xl">
                {t('personalInfo.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="md:col-span-4 lg:col-span-3 lg:col-start-10 flex flex-col sm:flex-row md:justify-end gap-4 mt-6 md:mt-0"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center gap-4 px-6 md:px-8 py-4 bg-transparent text-foreground border border-foreground/20 rounded-full font-medium uppercase tracking-widest text-[11px] md:text-xs overflow-hidden transition-all hover:bg-foreground hover:text-background w-full sm:w-auto"
              >
                <span className="relative z-10">{t('hero.explore')}</span>
                <ArrowRight className="relative z-10 shrink-0 w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/cv/Edd_Remonts_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-4 px-6 md:px-8 py-4 border border-foreground/20 text-foreground rounded-full font-bold uppercase tracking-widest text-[11px] md:text-xs hover:bg-foreground hover:text-background transition-all duration-300 w-full sm:w-auto"
              >
                <span>{t('nav.resume')}</span>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-6 md:left-12 flex items-center gap-4 text-foreground/50"
      >
        <span className="text-xs uppercase tracking-widest font-bold rotate-180" style={{ writingMode: 'vertical-rl' }}>{t('hero.scroll', 'Scroll')}</span>
        <div className="w-[1px] h-16 bg-foreground/20 overflow-hidden">
          <motion.div
            className="w-full h-1/2 bg-foreground"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </section>
  );
};
