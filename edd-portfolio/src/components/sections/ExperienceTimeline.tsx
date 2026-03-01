import { experiences, skills } from '@/data/cvData';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const techIconMap: Record<string, string> = {
  React: '/tech-icons/react.svg',
  Vuejs: '/tech-icons/vuedotjs.svg',
  NextJs: '/tech-icons/nextdotjs.svg',
  NuxtJs: '/tech-icons/nuxtjs.svg',
  TypeScript: '/tech-icons/typescript.svg',
  JavaScript: '/tech-icons/javascript.svg',
  'Tailwind CSS': '/tech-icons/tailwindcss.svg',
  HTML5: '/tech-icons/html5.svg',
  CSS3: '/tech-icons/css3.svg',
  SCSS: '/tech-icons/sass.svg',
  SASS: '/tech-icons/sass.svg',
  'Node js': '/tech-icons/nodedotjs.svg',
  PHP: '/tech-icons/php.svg',
  Laravel: '/tech-icons/laravel.svg',
  Symfony: '/tech-icons/symfony.svg',
  MySql: '/tech-icons/mysql.svg',
  PostgreSql: '/tech-icons/postgresql.svg',
  Git: '/tech-icons/git.svg',
  Docker: '/tech-icons/docker.svg',
  Linux: '/tech-icons/linux.svg',
  MacOS: '/tech-icons/apple.svg',
  'Framer Motion': '/tech-icons/framer.svg',
};

export const ExperienceTimeline = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Timeline line draws down smoothly
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-32 bg-surface relative" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeader
          title={t('experience.title')}
          titleAccent={t('experience.titleAccent')}
          subtitle={t('experience.subtitle')}
          align="left"
          className="mb-24"
        />

        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-2/3 relative">
            {/* Timeline Line (Apple subtle gray base, Anime vibrant fill) */}
            <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-foreground/[0.04] hidden md:block rounded-full">
              <motion.div
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-secondary to-accent rounded-full"
                style={{ height: lineHeight }}
              />
            </div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative md:pl-28"
                >
                  {/* Timeline Dot with Anime Neon Ring */}
                  <div className="absolute left-8 -translate-x-1/2 top-8 w-5 h-5 rounded-full bg-surface border-[4px] border-primary z-10 hidden md:block shadow-[0_0_15px_rgba(0,229,255,0.4)]" />

                  {/* Apple Style Floating Card */}
                  <div className="bg-surface rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-subtle transition-all duration-500 group relative overflow-hidden">
                    {/* Subtle Anime accent in the corner */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-accent/5 to-transparent rounded-bl-full transition-transform duration-700 group-hover:scale-125 pointer-events-none" />

                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-foreground font-display tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-300 relative z-10">
                        {t(`experience.items.${exp.id}.role`, exp.role)}
                      </h3>
                      <span className="text-secondary font-mono text-sm tracking-wider uppercase mt-2 md:mt-0 opacity-80">{exp.period.replace('Present', t('experience.present'))}</span>
                    </div>

                    <h4 className="text-lg text-foreground/80 font-medium mb-4 relative z-10">{exp.company}</h4>

                    <div className="flex items-center text-foreground/60 text-sm mb-6 font-medium relative z-10">
                      <MapPin className="w-4 h-4 mr-1.5" />
                      {exp.location}
                    </div>

                    <p className="text-foreground/80 leading-relaxed font-body relative z-10">
                      {t(`experience.items.${exp.id}.description`, exp.description)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="apple-glass rounded-[2rem] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.03)]"
              >
                <h3 className="text-2xl font-black text-foreground mb-8 tracking-tighter">
                  {t('experience.techArsenal')}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
                      className="px-4 py-2 bg-surface border border-subtle rounded-full text-[13px] font-medium text-foreground/80 hover:text-primary hover:border-primary/30 hover:shadow-[0_0_12px_rgba(0,229,255,0.2)] hover:bg-surface transition-all duration-300 cursor-default flex items-center gap-2"
                    >
                      {techIconMap[skill] && (
                        <img
                          src={techIconMap[skill]}
                          alt={skill}
                          loading="lazy"
                          className="w-4 h-4 rounded-md"
                        />
                      )}
                      <span>{skill}</span>
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
