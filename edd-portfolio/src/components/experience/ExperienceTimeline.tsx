import { experiences } from '@/data/cvData';
import { useTranslation } from 'react-i18next';
import { ExperienceCard } from './ExperienceCard';
import { TechArsenal } from './TechArsenal';

export const ExperienceTimeline = () => {
  const { t } = useTranslation();

  return (
    <section id="experience" className="py-24 md:py-40 bg-background relative border-t border-subtle">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="flex flex-col md:flex-row gap-12 justify-between mb-24 md:mb-32">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight">
            {t('experience.titleAccent')}
            <span className="block font-serif italic text-primary mt-2">
              {t('experience.title')}
            </span>
          </h2>
          <div className="max-w-md md:text-right md:self-end">
            <p className="text-sm md:text-base text-foreground/50 font-mono tracking-wide uppercase">
              {t('experience.subtitle')}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-8 flex flex-col">
            <div className="border-t border-subtle">
              {experiences.map((exp, index) => (
                <ExperienceCard key={exp.id} exp={exp} index={index} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <TechArsenal />
          </div>
        </div>
      </div>
    </section>
  );
};
