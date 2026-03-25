import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CarouselControls } from './CarouselControls';
import { TestimonialSlide } from './TestimonialSlide';

export const TestimonialBlock = () => {
  const { t } = useTranslation();
  
  const rawTestimonials = t('testimonials', { returnObjects: true });
  const testimonials = useMemo(
    () => (Array.isArray(rawTestimonials) ? rawTestimonials : []),
    [rawTestimonials],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  }, [testimonials.length]);

  const handleGoto = useCallback((idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  }, [currentIndex]);

  useEffect(() => {
    if (isPaused || !testimonials || testimonials.length <= 1) return;
    
    const timer = setInterval(() => {
      paginate(1);
    }, 8000);
    return () => clearInterval(timer);
  }, [paginate, isPaused, testimonials]);

  if (testimonials.length === 0) {
    return (
      <div className="flex justify-center py-24 text-sm text-foreground/50">
        Loading testimonials...
      </div>
    );
  }

  const safeIndex = currentIndex >= 0 && currentIndex < testimonials.length ? currentIndex : 0;
  const currentTestimonial = testimonials[safeIndex];

  return (
    <section className="relative py-24 overflow-hidden md:py-32 bg-background border-y border-subtle">
      <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
        <div 
          className="flex flex-col items-center text-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-8xl font-serif text-primary opacity-20 block mb-8 leading-[0]"
          >
            "
          </motion.span>
          
          <div className="relative w-full max-w-4xl mx-auto min-h-[350px] md:min-h-[220px] flex items-center justify-center overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <TestimonialSlide
                testimonial={currentTestimonial}
                index={safeIndex}
                direction={direction}
              />
            </AnimatePresence>
          </div>

          <CarouselControls
            total={testimonials.length}
            current={currentIndex}
            onPrev={() => paginate(-1)}
            onNext={() => paginate(1)}
            onGoto={handleGoto}
          />
        </div>
      </div>
    </section>
  );
};
