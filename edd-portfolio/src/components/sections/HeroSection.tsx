import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      } as const,
    },
    hidden: {
      opacity: 0,
      y: 100,
      rotateX: -90,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      } as const,
    },
  };

  return (
    <motion.span
      className="inline-flex overflow-hidden"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index} className="inline-block" style={{ perspective: "1000px" }}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

export const HeroSection = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-background"
    >
      {/* Background Cyber-Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />

      {/* Dramatic Ambient Glows / Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
        <motion.div
          animate={{
            rotate: [0, 90, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-primary/20 blur-[120px] mix-blend-multiply dark:mix-blend-lighten"
        />
        <motion.div
          animate={{
            rotate: [0, -90, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-secondary/20 blur-[120px] mix-blend-multiply dark:mix-blend-lighten"
        />
        <motion.div
          animate={{
            y: [0, -100, 0],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-accent/20 blur-[100px] mix-blend-multiply dark:mix-blend-lighten"
        />
      </div>

      {/* Header Utilities */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute top-6 right-6 z-50 flex items-center gap-4"
      >
        <LanguageSelector />
        <ThemeToggle />
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ opacity, scale }}
        className="container mx-auto px-6 relative z-10 w-full flex flex-col items-start"
      >
        <div className="w-full max-w-[1400px] mx-auto">
          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="text-sm md:text-base font-body uppercase tracking-[0.2em] font-bold text-foreground/80">
              STATUS: ACCEPTING SELECT PROJECTS
            </span>
          </motion.div>

          {/* Huge Typography */}
          <div className="relative w-full z-10 mt-12 md:mt-24">
            <h1 className="relative z-10 flex flex-col text-[16vw] sm:text-[14vw] md:text-[11vw] lg:text-[9vw] leading-[0.85] font-black uppercase tracking-tighter mb-10 w-full overflow-visible mix-blend-difference text-foreground dark:text-white">
              <motion.span
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
                className="block"
              >
                CRAFTING
              </motion.span>

              <motion.span
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
                className="block md:ml-[15%] text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
              >
                DIGITAL
              </motion.span>

              <motion.span
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.8 }}
                className="block md:ml-[25%] mt-4 mb-2 font-serif italic lowercase tracking-normal text-[14vw] sm:text-[12vw] md:text-[9vw] lg:text-[7vw] leading-none text-foreground/50 dark:text-white/50 font-light"
              >
                masterpieces
              </motion.span>
            </h1>
          </div>

          {/* Description & CTAs */}
          <div className="grid md:grid-cols-2 gap-10 items-end mt-12 md:mt-24 md:ml-[5%]">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-lg md:text-xl font-body text-foreground/70 max-w-md leading-relaxed"
            >
              {t('personalInfo.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 md:justify-end"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center gap-4 px-8 py-5 bg-foreground text-background rounded-full font-bold uppercase tracking-widest text-sm overflow-hidden transition-transform hover:scale-105"
              >
                <span className="relative z-10">{t('hero.explore')}</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </a>

              <a
                href="/cv/Edd_Remonts_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-4 px-8 py-5 border border-foreground/20 text-foreground rounded-full font-bold uppercase tracking-widest text-sm hover:bg-foreground hover:text-background transition-all duration-300"
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
        <span className="text-xs uppercase tracking-widest font-bold rotate-180" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
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
