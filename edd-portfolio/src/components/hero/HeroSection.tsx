import { LanguageSelector } from '@/components/ui/navigation/LanguageSelector';
import { StatusBadge } from '@/components/ui/badges/StatusBadge';
import { ThemeToggle } from '@/components/ui/navigation/ThemeToggle';
import { useResolvedTheme } from '@/hooks/useResolvedTheme';
import { APPLE_EASE } from '@/lib/motion';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AmbientLight } from './AmbientLight';
import { BackgroundReveal } from './BackgroundReveal';
import { ScrollIndicator } from './ScrollIndicator';

export const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const resolvedTheme = useResolvedTheme();
  const containerRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const cvUrl = useMemo(() => {
    const lang = (['en', 'es', 'dk'].includes(i18n.language) ? i18n.language : 'en');
    return `/cv/Eduardo_Inerarte_CV_${lang}_${resolvedTheme}.pdf`;
  }, [i18n.language, resolvedTheme]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const dynamicBG = resolvedTheme === 'dark' ? '/edd/edd_dark.jpg' : '/edd/edd_light.jpg';

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

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
      <AnimatePresence>
        {isHovered && <BackgroundReveal src={dynamicBG} />}
      </AnimatePresence>

      <AmbientLight hidden={isHovered} />

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
            transition={{ delay: 0.2, duration: 1, ease: APPLE_EASE }}
            className="flex flex-col items-baseline gap-4 mb-4 sm:flex-row sm:items-center md:mb-8"
          >
            <StatusBadge
              label={t('hero.available', 'STATUS: ACCEPTING SELECT PROJECTS')}
              className={`transition-colors duration-700 ${sublineTextColor}`}
            />
          </motion.div>

          {/* Huge Typography */}
          <div className="relative z-10 w-full">
            <h1 className={`flex flex-col text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7.5rem] leading-[0.9] font-light tracking-tight mb-8 md:mb-12 w-full transition-colors duration-700 ${textColor}`}>
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: APPLE_EASE, delay: 0.3 }}
                className={`relative w-fit font-serif transition-colors duration-700 cursor-crosshair group ${isHovered ? "text-white" : "text-primary"}`}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10 transition-colors duration-500">
                  {t('hero.greeting', "Hello, I'm")} Edd.
                </span>
                <span className="absolute left-0 right-0 -bottom-2 md:-bottom-4 h-[2px] md:h-[4px] bg-primary/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
              </motion.span>

              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: APPLE_EASE, delay: 0.4 }}
                className="block mt-2 font-medium tracking-tighter font-display mix-blend-difference md:mt-4"
              >
                Frontend
              </motion.span>
              
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: APPLE_EASE, delay: 0.5 }}
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
                href={cvUrl}
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

      <ScrollIndicator label={t('hero.scroll', 'Scroll')} isHovered={isHovered} />
    </section>
  );
};
