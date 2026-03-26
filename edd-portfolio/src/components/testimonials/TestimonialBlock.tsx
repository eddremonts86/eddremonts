import { AnimatePresence, m } from 'framer-motion';
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

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrentIndex((prevIndex) => {
        let nextIndex = prevIndex + newDirection;
        if (nextIndex < 0) nextIndex = testimonials.length - 1;
        if (nextIndex >= testimonials.length) nextIndex = 0;
        return nextIndex;
      });
    },
    [testimonials.length],
  );

  const handleGoto = useCallback(
    (idx: number) => {
      setDirection(idx > currentIndex ? 1 : -1);
      setCurrentIndex(idx);
    },
    [currentIndex],
  );

  useEffect(() => {
    if (isPaused || !testimonials || testimonials.length <= 1) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 8000);
    return () => clearInterval(timer);
  }, [paginate, isPaused, testimonials]);

  if (testimonials.length === 0) {
    return (
      <div className="text-foreground/50 flex justify-center py-24 text-sm">
        {t('testimonials_loading')}
      </div>
    );
  }

  const safeIndex = currentIndex >= 0 && currentIndex < testimonials.length ? currentIndex : 0;
  const currentTestimonial = testimonials[safeIndex];

  return (
    <section className="relative overflow-hidden border-y border-subtle bg-background py-24 md:py-32">
      <div className="container relative z-10 mx-auto max-w-[1200px] px-6">
        <div
          className="flex flex-col items-center text-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <m.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 block font-serif text-8xl leading-[0] text-primary opacity-20"
          >
            "
          </m.span>

          <div className="relative mx-auto flex min-h-[350px] w-full max-w-4xl items-center justify-center overflow-hidden md:min-h-[220px]">
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
