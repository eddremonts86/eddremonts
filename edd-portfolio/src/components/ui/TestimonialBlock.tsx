import { APPLE_EASE } from '@/lib/motion';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const TestimonialBlock = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 left-1/4 w-[40%] h-[60%] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[30%] h-[50%] bg-secondary/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: APPLE_EASE }}
          className="text-center"
        >
          <Quote className="w-12 h-12 text-primary/30 mx-auto mb-8 rotate-180" aria-hidden="true" />

          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground tracking-tight leading-tight mb-8">
            &ldquo;{t('testimonial.quote')}&rdquo;
          </blockquote>

          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
              {t('testimonial.initials')}
            </div>
            <div className="text-left">
              <p className="text-foreground font-semibold text-sm">
                {t('testimonial.author')}
              </p>
              <p className="text-foreground/60 text-sm">
                {t('testimonial.role')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
