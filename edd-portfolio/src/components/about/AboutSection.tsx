import { aboutMe } from '@/data/cvData';
import { fadeInView } from '@/lib/motion';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FeatureCard } from './FeatureCard';
import { ScrollRevealText } from './ScrollRevealText';

export const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="relative border-t border-subtle bg-surface py-24 md:py-40">
      <div className="container mx-auto max-w-[1400px] px-6">
        <ScrollRevealText text={t('about.intro')} />

        <div className="mt-24 grid gap-16 lg:grid-cols-12 lg:gap-24">
          {/* Left Column */}
          <div className="flex flex-col lg:col-span-4">
            <m.div {...fadeInView()} className="sticky top-32">
              <h2 className="mb-6 text-4xl font-light tracking-tight md:text-5xl lg:text-7xl">
                {t('about.titleAccent')}
                <br />
                <span className="font-serif italic text-primary">{t('about.title')}</span>
              </h2>
              <p className="text-foreground/40 font-mono text-sm uppercase tracking-widest">
                {t('about.servicesSub', 'Refined & Scalable')}
              </p>
            </m.div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-12 md:gap-16 lg:col-span-8">
            {aboutMe.features.map((feature, index) => (
              <FeatureCard key={feature.icon} icon={feature.icon} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
