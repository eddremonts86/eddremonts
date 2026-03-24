import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const TestimonialBlock = () => {
  const { t } = useTranslation();
  
  // Cast the translated array properly. Default to empty array if not ready.
  const rawTestimonials = t('testimonials', { returnObjects: true });
  const testimonials = Array.isArray(rawTestimonials) ? rawTestimonials : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      filter: 'blur(4px)'
    }),
    center: {
      z: 0,
      x: 0,
      opacity: 1,
      filter: 'blur(0px)'
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      filter: 'blur(4px)'
    })
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  }, [testimonials?.length]);

  useEffect(() => {
    if (isPaused || !testimonials || testimonials.length <= 1) return;
    
    const timer = setInterval(() => {
      paginate(1);
    }, 8000);
    return () => clearInterval(timer);
  }, [paginate, isPaused, testimonials]);

  // Fallback map just in case object translation isn't fully loaded yet
  if (testimonials.length === 0) {
    return (
      <div className="py-24 flex justify-center text-foreground/50 text-sm">
        Loading testimonials...
      </div>
    );
  }

  // Ensure index is within bounds before rendering
  const safeIndex = currentIndex >= 0 && currentIndex < testimonials.length ? currentIndex : 0;
  const currentTestimonial = testimonials[safeIndex];

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden border-y border-subtle">
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
              <motion.div
                key={safeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  filter: { duration: 0.4 }
                }}
                className="absolute w-full flex flex-col items-center px-4"
              >
                <blockquote className="text-xl md:text-3xl lg:text-4xl font-light text-foreground leading-[1.5] tracking-tight mb-10 italic font-serif">
                  {currentTestimonial?.quote}
                </blockquote>
                
                <div className="flex flex-col items-center gap-2">
                  <p className="text-sm font-medium text-foreground tracking-wide">
                    {currentTestimonial?.author}
                  </p>
                  <p className="text-xs font-mono uppercase tracking-widest text-foreground/50">
                    {currentTestimonial?.role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mt-12 md:mt-16"
          >
            <button 
              onClick={() => paginate(-1)}
              className="w-10 h-10 rounded-full border border-subtle flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-foreground/30 hover:bg-foreground/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4 ml-[-1px]" />
            </button>
            <div className="flex gap-3">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-500 focus:outline-none ${
                    idx === currentIndex 
                      ? 'bg-primary w-6' 
                      : 'bg-foreground/10 hover:bg-foreground/30 w-2'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={() => paginate(1)}
              className="w-10 h-10 rounded-full border border-subtle flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-foreground/30 hover:bg-foreground/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4 mr-[-1px]" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};