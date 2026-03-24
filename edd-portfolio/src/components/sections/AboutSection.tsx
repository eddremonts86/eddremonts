import { IconComponent } from '@/components/ui/IconComponent';
import { aboutMe, services } from '@/data/cvData';
import type { MotionValue } from 'framer-motion';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const RevealWord = ({
  word,
  index,
  total,
  scrollYProgress,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
  const y = useTransform(scrollYProgress, [start, end], [10, 0]);

  return (
    <motion.span style={{ opacity, y }} className="inline-block relative">
      {word}
    </motion.span>
  );
};

const ScrollRevealText = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 60%"],
  });

  const words = text.split(" ");

  return (
    <p ref={containerRef} className="text-2xl md:text-4xl lg:text-[2.75rem] font-medium tracking-tight leading-[1.3] flex flex-wrap gap-x-2 md:gap-x-3 gap-y-1 mb-20 md:mb-32 max-w-5xl">
      {words.map((word, i) => (
        <RevealWord
          key={`${i}-${word}`}
          word={word}
          index={i}
          total={words.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </p>
  );
};

export const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 md:py-40 relative bg-surface border-t border-subtle">
      <div className="container mx-auto px-6 max-w-[1400px]">

        {/* Elegant Text Reveal */}
        <ScrollRevealText text={t('about.intro')} />

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 mt-24">

          {/* Left Column: Refined Title */}
          <div className="lg:col-span-4 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="sticky top-32"
            >
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight mb-6">
                {t('about.titleAccent')}
                <br />
                <span className="font-serif italic text-primary">
                  {t('about.title')}
                </span>
              </h2>
              <p className="text-sm uppercase tracking-widest text-foreground/40 font-mono">
                {t('about.servicesSub', 'Refined & Scalable')}
              </p>
            </motion.div>
          </div>

          {/* Right Column: Editorial Features List */}
          <div className="lg:col-span-8 flex flex-col gap-12 md:gap-16">
            {aboutMe.features.map((feature, index) => (
              <motion.div
                key={feature.icon}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col sm:flex-row gap-6 md:gap-12 items-start"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-foreground/50 group-hover:text-primary group-hover:bg-primary/5 transition-all duration-700">
                    <IconComponent
                      name={feature.icon}
                      className="w-5 h-5 transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>

                <div className="relative z-10 flex-1 border-b border-subtle pb-12 md:pb-16 group-hover:border-foreground/20 transition-colors duration-700">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-xs font-mono text-foreground/30 group-hover:text-primary transition-colors duration-700">
                      0{index + 1}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-medium text-foreground tracking-tight">
                      {t(`about.features.${index}.title`)}
                    </h3>
                  </div>
                  <p className="text-base md:text-lg text-foreground/70 leading-relaxed font-light max-w-2xl">
                    {t(`about.features.${index}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
