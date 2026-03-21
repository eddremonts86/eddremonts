import { APPLE_EASE } from '@/lib/motion';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface StatItem {
  value: number;
  suffix: string;
  labelKey: string;
}

const stats: StatItem[] = [
  { value: 8, suffix: '+', labelKey: 'stats.yearsExperience' },
  { value: 6, suffix: '+', labelKey: 'stats.companies' },
  { value: 22, suffix: '+', labelKey: 'stats.technologies' },
  { value: 90, suffix: '+', labelKey: 'stats.lighthouse' },
];

const AnimatedNumber = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 60, damping: 20 });
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.floor(latest)}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

export const StatsCounter = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-foreground text-background relative overflow-hidden py-10 md:py-0">
      <div className="container mx-auto px-0 max-w-full relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: APPLE_EASE }}
          className="flex flex-col md:flex-row md:divide-x divide-background/20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: APPLE_EASE }}
              className="flex-1 text-center group py-16 px-8 hover:bg-background hover:text-foreground transition-colors duration-500 flex flex-col justify-center items-center cursor-default"
            >
              <div className="text-[15vw] md:text-[8vw] lg:text-[6vw] font-black tracking-tighter leading-none mb-6">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm md:text-base font-body font-bold tracking-[0.3em] uppercase opacity-60 group-hover:text-primary transition-colors duration-500">
                {t(stat.labelKey)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};