import { useScroll } from 'framer-motion';
import { useRef } from 'react';
import { RevealWord } from './RevealWord';

export const ScrollRevealText = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 60%'],
  });

  const words = text.split(' ');

  return (
    <p
      ref={containerRef}
      className="mb-20 flex max-w-5xl flex-wrap gap-x-2 gap-y-1 text-2xl font-medium leading-[1.3] tracking-tight md:mb-32 md:gap-x-3 md:text-4xl lg:text-[2.75rem]"
    >
      {words.map((word, i) => (
        <RevealWord
          key={`${i}-${word}`}
          word={word}
          index={i}
          total={words.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </p>
  );
};
