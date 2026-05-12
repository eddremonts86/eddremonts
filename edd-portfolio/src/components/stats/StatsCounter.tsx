import { experiences, skills } from '@/data/cvData';
import { APPLE_EASE, fadeInView } from '@/lib/motion';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

interface StatItem {
  value: number;
  suffix: string;
  labelKey: string;
}

const extractYears = (period: string) => {
  const matches = period.match(/\b\d{4}\b/g);
  return matches ? matches.map(Number) : [];
};

const getYearsExperience = () => {
  const years = experiences.flatMap((experience) => extractYears(experience.period));
  const firstYear = Math.min(...years);
  return Number.isFinite(firstYear) ? new Date().getFullYear() - firstYear : 0;
};

const getCompaniesCount = () => new Set(experiences.map((experience) => experience.company)).size;

const LIGHTHOUSE_SCORE = 90;

const stats: StatItem[] = [
  { value: getYearsExperience(), suffix: '+', labelKey: 'stats.yearsExperience' },
  { value: getCompaniesCount(), suffix: '+', labelKey: 'stats.companies' },
  { value: skills.length, suffix: '+', labelKey: 'stats.technologies' },
  { value: LIGHTHOUSE_SCORE, suffix: '+', labelKey: 'stats.lighthouse' },
];

const AnimatedNumber = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useAnimatedCounter(value, suffix);
  return <span ref={ref}>0{suffix}</span>;
};

export const StatsCounter = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden border-y border-subtle bg-background py-10 md:py-0">
      <div className="container relative z-10 mx-auto max-w-full px-0">
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: APPLE_EASE }}
          className="flex flex-col divide-subtle md:flex-row md:divide-x"
        >
          {stats.map((stat, index) => (
            <m.div
              key={stat.labelKey}
              {...fadeInView({ delay: index * 0.1 })}
              className="group flex flex-1 cursor-default flex-col items-center justify-center bg-background px-8 py-16 text-center transition-colors duration-500 hover:bg-surface"
            >
              <div className="mb-4 font-serif text-6xl leading-none tracking-tight text-foreground transition-colors duration-500 group-hover:text-primary md:text-7xl lg:text-8xl">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-foreground/50 font-mono text-[11px] uppercase tracking-widest">
                {t(stat.labelKey)}
              </p>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
};
