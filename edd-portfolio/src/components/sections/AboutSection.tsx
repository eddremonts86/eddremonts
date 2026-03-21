import { IconComponent } from '@/components/ui/IconComponent';
import { aboutMe, services } from '@/data/cvData';
import { APPLE_EASE } from '@/lib/motion';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const ScrollRevealText = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"],
  });

  const words = text.split(" ");

  return (
    <p ref={containerRef} className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[1.1] flex flex-wrap gap-x-3 gap-y-2 mb-16 max-w-5xl">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
        const y = useTransform(scrollYProgress, [start, end], [20, 0]);

        return (
          <motion.span key={i} style={{ opacity, y }} className="inline-block">
            {word}
          </motion.span>
        );
      })}
    </p>
  );
};

export const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-32 relative bg-surface border-t border-b border-subtle">
      <div className="container mx-auto px-6 max-w-[1600px]">

        {/* Massive Text Reveal */}
        <ScrollRevealText text={t('about.intro')} />

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 mt-24">

          {/* Left Column: Huge Title */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: APPLE_EASE }}
            >
              <h2 className="text-[14vw] md:text-[10vw] lg:text-[8rem] leading-[0.8] font-black uppercase tracking-tighter mb-8 break-words">
                {t('about.titleAccent')}
                <br />
                <span className="font-serif italic font-light text-primary lowercase tracking-normal">
                  {t('about.title')}
                </span>
              </h2>
            </motion.div>
          </div>

          {/* Right Column: Brutalist Features Grid */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {aboutMe.features.map((feature, index) => (
              <motion.div
                key={feature.icon}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: APPLE_EASE }}
                className="group relative p-8 md:p-10 border border-subtle bg-background hover:bg-foreground transition-colors duration-500 overflow-hidden flex flex-col justify-between min-h-[300px]"
              >
                {/* Huge Watermark Number */}
                <div className="absolute -right-4 -bottom-10 text-[12rem] font-black text-foreground/[0.03] group-hover:text-background/[0.05] transition-colors duration-500 pointer-events-none select-none leading-none">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="relative z-10 mb-12">
                  <div className="w-16 h-16 rounded-none bg-surface flex items-center justify-center border border-subtle text-primary group-hover:bg-background group-hover:text-background transition-all duration-500">
                    <IconComponent
                      name={feature.icon}
                      className="w-8 h-8 group-hover:text-primary"
                    />
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-foreground group-hover:text-background mb-4 uppercase tracking-tight transition-colors duration-500">
                    {t(`about.features.${index}.title`)}
                  </h3>
                  <p className="text-foreground/60 group-hover:text-background/80 leading-relaxed font-body transition-colors duration-500">
                    {t(`about.features.${index}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Services - Editorial Style */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 pt-24 border-t border-foreground/10"
        >
          <div className="flex flex-col md:flex-row gap-16 justify-between mb-16">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter max-w-2xl">
              {t('about.servicesTitle', 'Capabilities')}
            </h2>
            <p className="text-xl font-body text-foreground/60 max-w-md md:text-right self-end">
              {t('about.servicesSub', 'Delivering premium digital experiences.')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border-y border-r border-foreground/10">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: APPLE_EASE }}
                className="group p-8 border-l border-foreground/10 hover:bg-foreground hover:text-background transition-colors duration-300 min-h-[280px] flex flex-col justify-between"
              >
                <div className="text-primary mb-12 transform group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500 origin-left">
                  <IconComponent name={service.icon} className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">
                    {t(`services.${index}.title`)}
                  </h3>
                  <p className="opacity-60 text-sm leading-relaxed font-body">
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
