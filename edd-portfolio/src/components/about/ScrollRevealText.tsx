import { useScroll } from 'framer-motion';
import { useRef } from 'react';
import { RevealWord } from './RevealWord';

export const ScrollRevealText = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 60%"],
  });

  const words = text.split(" ");

  return (
    <p ref={containerRef} className="text-2xl md:text-4xl lg:text-[2.75rem] font-medium tracking-tight leading-[1.3] flex flex-wrap gap-x-2 md:gap-x-3 gap-y-1 mb-20 md:mb-32 max-w-5xl">
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
