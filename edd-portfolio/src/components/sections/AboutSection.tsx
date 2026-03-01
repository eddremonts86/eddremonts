import { aboutMe, services } from '@/data/cvData';
import { IconComponent } from '@/components/ui/IconComponent';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const AboutSection = () => {
  const { t } = useTranslation();
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section id="about" className="py-32 relative bg-surface">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeader
          title={t('about.title')}
          titleAccent={t('about.titleAccent')}
          subtitle={t('about.intro')}
        />

        {/* Bento Grid: Numbered Feature Tabs + Detail */}
        <div className="grid md:grid-cols-5 gap-6 mb-32">
          {/* Left: Numbered tabs */}
          <div className="md:col-span-2 flex flex-col gap-3">
            {aboutMe.features.map((feature, index) => (
              <motion.button
                key={feature.icon}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveFeature(index)}
                className={`group flex items-start gap-5 p-6 rounded-[1.5rem] text-left transition-all duration-300 border ${
                  activeFeature === index
                    ? 'bg-surface border-primary/20 shadow-[0_8px_30px_rgba(0,229,255,0.08)]'
                    : 'bg-transparent border-subtle hover:bg-surface/60 hover:border-foreground/10'
                }`}
              >
                <span
                  className={`flex-shrink-0 text-3xl font-black font-display tabular-nums transition-colors duration-300 ${
                    activeFeature === index ? 'text-gradient-anime' : 'text-foreground/15'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-foreground tracking-tight font-display mb-1">
                    {t(`about.features.${index}.title`)}
                  </h3>
                  <p className="text-foreground/50 text-sm leading-relaxed line-clamp-2 md:line-clamp-none">
                    {t(`about.features.${index}.description`)}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right: Active detail card — large bento tile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-3 relative rounded-[2rem] bg-surface border border-subtle shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden min-h-[320px] flex items-center justify-center p-10"
          >
            {/* Gradient background accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 text-center max-w-md"
              >
                <div className="w-20 h-20 rounded-[1.5rem] bg-surface shadow-sm border border-subtle flex items-center justify-center mx-auto mb-8 group-hover:scale-105 transition-transform">
                  <IconComponent
                    name={aboutMe.features[activeFeature].icon}
                    className="w-9 h-9 text-primary"
                  />
                </div>
                <h3 className="text-3xl font-black text-foreground mb-4 font-display tracking-tight">
                  {t(`about.features.${activeFeature}.title`)}
                </h3>
                <p className="text-foreground/70 leading-relaxed text-base">
                  {t(`about.features.${activeFeature}.description`)}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Decorative large number watermark */}
            <span className="absolute bottom-4 right-6 text-[8rem] font-black text-foreground/[0.03] leading-none pointer-events-none select-none font-display">
              {String(activeFeature + 1).padStart(2, '0')}
            </span>
          </motion.div>
        </div>

        {/* Services - Apple Minimalist Presentation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-24 border-t border-default"
        >
          <div className="text-left mb-16 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter mb-4">
              {t('about.servicesTitle', 'What can I do for you?')}
            </h2>
            <p className="text-xl text-foreground/80">{t('about.servicesSub', 'Delivering premium digital experiences.')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col sm:flex-row gap-6 p-8 rounded-[2rem] bg-surface border border-subtle shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(0,229,255,0.06)] transition-all duration-500 overflow-hidden"
              >
                {/* Gradient border glow on hover */}
                <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none gradient-border-glow" />

                <div className="flex-shrink-0 w-16 h-16 rounded-[1.25rem] bg-surface flex items-center justify-center border border-subtle text-foreground group-hover:text-secondary group-hover:rotate-6 transition-all duration-500">
                  <IconComponent name={service.icon} className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 font-display tracking-tight">{t(`services.${index}.title`)}</h3>
                  <p className="text-foreground/80 leading-relaxed text-sm">
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
