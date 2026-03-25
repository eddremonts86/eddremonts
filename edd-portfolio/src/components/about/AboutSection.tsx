import { aboutMe } from '@/data/cvData';
import { fadeInView } from '@/lib/motion';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FeatureCard } from './FeatureCard';
import { ScrollRevealText } from './ScrollRevealText';

export const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 md:py-40 relative bg-surface border-t border-subtle">
      <div className="container mx-auto px-6 max-w-[1400px]">

        <ScrollRevealText text={t('about.intro')} />

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 mt-24">

          {/* Left Column */}
          <div className="lg:col-span-4 flex flex-col">
            <motion.div
              {...fadeInView()}
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

          {/* Right Column */}
          <div className="lg:col-span-8 flex flex-col gap-12 md:gap-16">
            {aboutMe.features.map((feature, index) => (
              <FeatureCard key={feature.icon} icon={feature.icon} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
