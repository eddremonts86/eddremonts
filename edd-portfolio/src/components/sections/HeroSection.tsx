import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const HeroSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Dynamic classes for perfect contrast against the photo
  const textColor = isHovered ? "text-white" : "text-foreground";
  const mutedTextColor = isHovered ? "text-white/80" : "text-foreground/80";
  const sublineTextColor = isHovered ? "text-white/60" : "text-foreground/60";
  const borderColor = isHovered ? "border-white/20" : "border-foreground/20";
  const buttonHover = isHovered ? "hover:bg-white hover:text-black" : "hover:bg-foreground hover:text-background";

  return (
    <section
      ref={containerRef}
      className={`relative min-h-[100svh] flex flex-col justify-end pb-24 md:pb-32 overflow-hidden transition-colors duration-1000 ${isHovered ? "bg-black" : "bg-background"}`}
    >
      {/* Background Image Reveal */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            {/* Dark gradient overlays ensure text legibility */}
            <div className="absolute inset-0 z-10 transition-opacity duration-1000 bg-black/20" />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-black/60 mix-blend-multiply" />
            
            <img
              src="/edd/hero-portrait.jpg" 
              alt="Edd Portrait Background"
              className="w-full h-full object-cover object-[center_15%] grayscale contrast-125"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editorial Ambient Light */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen dark:mix-blend-lighten transition-opacity duration-1000 ${isHovered ? 'opacity-0' : 'opacity-40 dark:opacity-20'}`}>
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
        className={`absolute top-6 right-6 lg:top-10 lg:right-10 z-50 flex items-center gap-6 transition-colors duration-700 ${textColor}`}
      >
        <LanguageSelector />
        <ThemeToggle />
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="container relative z-10 w-full px-6 mx-auto"
      >
        <div className="w-full max-w-[1400px] mx-auto xl:pl-12">
          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-baseline gap-4 mb-4 sm:flex-row sm:items-center md:mb-8"
          >
            <div className="flex items-center gap-3">
              <span className="relative flex w-2 h-2 shrink-0">
                <span className="absolute inline-flex w-full h-full rounded-full animate-ping bg-primary opacity-60"></span>
                <span className="relative inline-flex w-2 h-2 rounded-full bg-primary"></span>
              </span>
              <span className={`text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] font-medium break-words transition-colors duration-700 ${sublineTextColor}`}>
                {t('hero.available', 'STATUS: ACCEPTING SELECT PROJECTS')}
              </span>
            </div>
          </motion.div>

          {/* Huge Typography - Very Editorial */}
          <div className="relative z-10 w-full">
            <h1 className={`flex flex-col text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7.5rem] leading-[0.9] font-light tracking-tight mb-8 md:mb-12 w-full transition-colors duration-700 ${textColor}`}>
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className={`relative w-fit font-serif transition-colors duration-700 cursor-crosshair group ${isHovered ? "text-white" : "text-primary"}`}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10 transition-colors duration-500">
                  {t('hero.greeting', "Hello, I'm")} Edd.
                </span>
                {/* Subtle underline hint */}
                <span className="absolute left-0 right-0 -bottom-2 md:-bottom-4 h-[2px] md:h-[4px] bg-primary/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
              </motion.span>

              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="block mt-2 font-medium tracking-tighter font-display mix-blend-difference md:mt-4"
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
          <div className="flex flex-col gap-8 mt-12 md:flex-row md:items-end md:mt-24">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="flex-1"
            >
              <p className={`text-base md:text-xl font-body leading-relaxed font-light max-w-xl transition-colors duration-700 ${mutedTextColor}`}>
                {t('personalInfo.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="flex flex-col items-start gap-3 shrink-0"
            >
              <a
                href="#projects"
                className={`group inline-flex items-center justify-center gap-4 px-6 py-3 bg-transparent border rounded-full font-medium uppercase tracking-widest text-[11px] md:text-xs transition-all duration-700 whitespace-nowrap ${textColor} ${borderColor} ${buttonHover}`}
              >
                <span>{t('hero.explore')}</span>
                <ArrowRight className="w-3 h-3 transition-transform shrink-0 group-hover:translate-x-1" />
              </a>
              <a
                href="/cv/Edd_Remonts_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-4 px-6 py-3 border rounded-full font-bold uppercase tracking-widest text-[11px] md:text-xs transition-all duration-700 whitespace-nowrap ${textColor} ${borderColor} ${buttonHover}`}
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
        className={`absolute bottom-8 left-6 md:left-12 flex items-center gap-4 transition-colors duration-700 ${sublineTextColor}`}
      >
        <span className="text-xs font-bold tracking-widest uppercase rotate-180" style={{ writingMode: 'vertical-rl' }}>{t('hero.scroll', 'Scroll')}</span>
        <div className={`w-[1px] h-16 overflow-hidden transition-colors duration-700 ${isHovered ? 'bg-white/20' : 'bg-foreground/20'}`}>
          <motion.div
            className={`w-full h-1/2 transition-colors duration-700 ${isHovered ? 'bg-white' : 'bg-foreground'}`}
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </section>
  );
};
