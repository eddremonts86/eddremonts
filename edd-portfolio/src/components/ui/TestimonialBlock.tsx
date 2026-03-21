import { APPLE_EASE } from '@/lib/motion';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const TestimonialBlock = () => {
  const { t } = useTranslation();

  return (
    <section className="py-32 bg-surface relative overflow-hidden border-y border-foreground/10">
      <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: APPLE_EASE }}
          className="flex flex-col md:flex-row gap-12 md:gap-24 items-start"
        >
          <div className="w-full md:w-1/3">
            <span className="text-[15rem] leading-none font-black text-primary opacity-20 block -mt-20 -ml-10 select-none">
              "
            </span>
            <div className="uppercase tracking-widest font-bold text-sm border-l-4 border-primary pl-4 -mt-16 relative z-10">
              <p className="text-foreground">
                {t('testimonial.author')}
              </p>
              <p className="text-foreground/50">
                {t('testimonial.role')}
              </p>
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <blockquote className="text-3xl md:text-5xl lg:text-7xl font-display font-black text-foreground uppercase tracking-tighter leading-[0.9]">
              {t('testimonial.quote')}
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
};