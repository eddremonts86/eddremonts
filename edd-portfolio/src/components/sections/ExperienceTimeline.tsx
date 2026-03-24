import { experiences, skills } from '@/data/cvData';
import { techIconMap } from '@/data/techIcons';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative flex flex-col md:flex-row justify-between py-10 border-b border-subtle hover:bg-surface transition-colors duration-500 cursor-default px-4 -mx-4 rounded-xl"
                >
                  <div className="flex flex-col mb-4 md:mb-0 w-full md:w-1/3 md:pr-8">
                    <span className="text-[11px] font-mono tracking-widest text-primary mb-2">
                      {exp.period.replace('Present', t('experience.present') || 'Present')}
                    </span>
                    <h4 className="text-lg md:text-xl font-medium tracking-tight mb-1">{exp.company}</h4>
                    <span className="text-xs text-foreground/40 font-mono uppercase tracking-wider">
                      {exp.location}
                    </span>
                  </div>

                  <div className="w-full md:w-2/3 flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-3 gap-4">
                        <h3 className="text-xl md:text-2xl font-serif text-foreground group-hover:text-primary transition-colors duration-500 break-words">
                          {t(`experience.items.${exp.id}.role`, exp.role)}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 group-hover:-translate-y-1 transition-all duration-500 text-primary hidden md:block shrink-0" />
                    </div>
                    <p className="text-sm md:text-base text-foreground/70 leading-relaxed font-light">
                      {t(`experience.items.${exp.id}.description`, exp.description)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <h3 className="text-sm font-mono tracking-widest uppercase text-foreground/50 mb-8 border-b border-subtle pb-4">
                {t('experience.techArsenal')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="px-4 py-2 bg-surface text-xs font-mono rounded-full border border-subtle text-foreground/70 hover:text-foreground hover:border-foreground/30 transition-all duration-300 flex items-center gap-2"
                  >
                    {techIconMap[skill] && (
                      <img
                        src={techIconMap[skill]}
                        alt={skill}
                        loading="lazy"
                        className="w-3.5 h-3.5 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                      />
                    )}
                    <span>{skill}</span>
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
