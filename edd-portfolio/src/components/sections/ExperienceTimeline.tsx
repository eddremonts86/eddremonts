import { experiences, skills } from '@/data/cvData';
import { techIconMap } from '@/data/techIcons';
import { APPLE_EASE } from '@/lib/motion';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ExperienceTimeline = () => {
  const { t } = useTranslation();

  return (
    <section id="experience" className="py-32 bg-background relative border-b border-foreground/10">
      <div className="container mx-auto px-6 max-w-[1600px]">
        <div className="flex flex-col md:flex-row gap-16 justify-between mb-24">
          <h2 className="text-[14vw] md:text-8xl font-black uppercase tracking-tighter max-w-3xl leading-[0.8] break-words">
            {t('experience.titleAccent')}<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {t('experience.title')}
            </span>
          </h2>
          <div className="max-w-md md:text-right self-end">
            <p className="text-xl font-body text-foreground/60">
              {t('experience.subtitle')}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 flex flex-col">
            {/* Massive Table-like Timeline */}
            <div className="border-t border-foreground/10">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: APPLE_EASE }}
                  className="group relative flex flex-col md:flex-row justify-between p-8 md:p-12 border-b border-foreground/10 hover:bg-foreground hover:text-background transition-colors duration-500 cursor-default"
                >
                  <div className="flex flex-col justify-between mb-8 md:mb-0 w-full md:w-1/3 pr-8">
                    <span className="text-sm font-bold tracking-widest uppercase text-primary mb-4">
                      {exp.period.replace('Present', t('experience.present'))}
                    </span>
                    <h4 className="text-2xl font-black uppercase tracking-tight">{exp.company}</h4>
                    <div className="flex items-center opacity-60 text-sm mt-2 font-mono">
                      <MapPin className="w-4 h-4 mr-2" />
                      {exp.location}
                    </div>
                  </div>

                  <div className="w-full md:w-2/3 md:pl-8 md:border-l border-foreground/10 group-hover:border-background/20 transition-colors duration-500 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-none group-hover:text-primary transition-colors duration-300 break-words">
                        {t(`experience.items.${exp.id}.role`, exp.role)}
                      </h3>
                      <ArrowUpRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-primary hidden md:block" />
                    </div>
                    <p className="text-lg opacity-70 leading-relaxed font-body">
                      {t(`experience.items.${exp.id}.description`, exp.description)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32 p-8 md:p-12 bg-surface border border-foreground/10">
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 border-b border-foreground/10 pb-8">
                {t('experience.techArsenal')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.02, ease: APPLE_EASE }}
                    className="px-5 py-3 bg-background border border-foreground/10 text-sm font-bold tracking-wider uppercase text-foreground/80 hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 flex items-center gap-3"
                  >
                    {techIconMap[skill] && (
                      <img
                        src={techIconMap[skill]}
                        alt={skill}
                        loading="lazy"
                        className="w-5 h-5 grayscale group-hover:grayscale-0"
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
