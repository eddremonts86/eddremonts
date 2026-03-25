import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CarouselControls = ({
  total,
  current,
  onPrev,
  onNext,
  onGoto,
}: {
  total: number;
  current: number;
  onPrev: () => void;
  onNext: () => void;
  onGoto: (idx: number) => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="flex items-center gap-6 mt-12 md:mt-16"
  >
    <button
      onClick={onPrev}
      className="w-10 h-10 rounded-full border border-subtle flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-foreground/30 hover:bg-foreground/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
      aria-label="Previous testimonial"
    >
      <ChevronLeft className="w-4 h-4 ml-[-1px]" />
    </button>
    <div className="flex gap-3">
      {Array.from({ length: total }, (_, idx) => (
        <button
          key={idx}
          onClick={() => onGoto(idx)}
          className={`h-2 rounded-full transition-all duration-500 focus:outline-none ${
            idx === current
              ? 'bg-primary w-6'
              : 'bg-foreground/10 hover:bg-foreground/30 w-2'
          }`}
          aria-label={`Go to testimonial ${idx + 1}`}
        />
      ))}
    </div>
    <button
      onClick={onNext}
      className="w-10 h-10 rounded-full border border-subtle flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-foreground/30 hover:bg-foreground/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
      aria-label="Next testimonial"
    >
      <ChevronRight className="w-4 h-4 mr-[-1px]" />
    </button>
  </motion.div>
);
