import { aboutMe, services } from '@/data/cvData';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { useTranslation } from 'react-i18next';

const IconComponent = ({ name, className }: { name: string, className?: string }) => {
  const IconMap: Record<string, any> = {
    'users': LucideIcons.Users,
    'rocket': LucideIcons.Rocket,
    'shield': LucideIcons.ShieldCheck,
    'layout': LucideIcons.Layout,
    'server': LucideIcons.Database,
  };

  const Icon = IconMap[name] || LucideIcons.Star;
  return <Icon className={className} />;
};

export const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-32 relative bg-surface">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-foreground tracking-tighter">
            {t('about.title')} <span className="text-gradient-anime">{t('about.titleAccent')}</span>
          </h2>
          <p className="text-xl text-foreground/80 font-body leading-relaxed">
            {t('about.intro')}
          </p>
        </motion.div>

        {/* Apple Style Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-32">
          {aboutMe.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-surface rounded-[2rem] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] border border-black/[0.03] transition-all duration-500 overflow-hidden relative cursor-default"
            >
              {/* Subtle Anime Color Reveal on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="w-16 h-16 rounded-[1.25rem] bg-surface shadow-sm border border-black/5 flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-300">
                <IconComponent name={feature.icon} className="w-7 h-7 text-foreground/80 group-hover:text-primary transition-colors" />
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-4 font-display tracking-tight">{t(`about.features.${index}.title`)}</h3>
              <p className="text-foreground/80 leading-relaxed font-body text-[15px]">
                {t(`about.features.${index}.description`)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Services - Apple Minimalist Presentation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-24 border-t border-black/[0.05]"
        >
          <div className="text-left mb-16 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter mb-4">
              {t('about.servicesTitle', 'What can I do for you?')}{' '}
              {/* Optional fallback, but translations will handle it */}
            </h2>
            <p className="text-xl text-foreground/70">{t('about.servicesSub', 'Delivering premium digital experiences.')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-6 p-8 rounded-[2rem] bg-surface border border-black/[0.03] shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(0,229,255,0.06)] transition-all duration-500 group"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-[1.25rem] bg-surface flex items-center justify-center border border-black/[0.04] text-foreground group-hover:text-secondary group-hover:rotate-6 transition-all duration-500">
                  <IconComponent name={service.icon} className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 font-display tracking-tight">{t(`services.${index}.title`)}</h3>
                  <p className="text-foreground/80 leading-relaxed text-[15px]">
                    {t(`services.${index}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
