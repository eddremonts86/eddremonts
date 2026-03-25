import { m } from 'framer-motion';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    filter: 'blur(4px)',
  }),
  center: { z: 0, x: 0, opacity: 1, filter: 'blur(0px)' },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    filter: 'blur(4px)',
  }),
};

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export const TestimonialSlide = ({
  testimonial,
  index,
  direction,
}: {
  testimonial: Testimonial;
  index: number;
  direction: number;
}) => (
  <m.div
    key={testimonial.author}
    custom={direction}
    variants={slideVariants}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
      filter: { duration: 0.4 },
    }}
    className="absolute w-full flex flex-col items-center px-4"
  >
    <blockquote className="text-xl md:text-3xl lg:text-4xl font-light text-foreground leading-[1.5] tracking-tight mb-10 italic font-serif">
      {testimonial?.quote}
    </blockquote>
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm font-medium text-foreground tracking-wide">{testimonial?.author}</p>
      <p className="text-xs font-mono uppercase tracking-widest text-foreground/50">{testimonial?.role}</p>
    </div>
  </m.div>
);
