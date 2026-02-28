import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const CHARS = "-_~abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()+=[]{}|;:,.<>?";

interface ScrambleHoverProps {
  text: string;
  hoverText: string;
  className?: string;
  scrambleSpeed?: number;
}

export const ScrambleHover = ({
  text,
  hoverText,
  className = "",
  scrambleSpeed = 30,
}: ScrambleHoverProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const targetText = isHovered ? hoverText : text;
    
    let iteration = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return targetText
          .split("")
          .map((_char, index) => {
            if (index < iteration) {
              return targetText[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
      });

      if (iteration >= targetText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(targetText);
      }

      iteration += 1 / 3;
    }, scrambleSpeed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, hoverText, text, scrambleSpeed]);

  return (
    <motion.span
      className={`inline-block whitespace-nowrap cursor-pointer relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <span className="sr-only">{isHovered ? hoverText : text}</span>
      <span aria-hidden="true">
        {displayText}
      </span>
    </motion.span>
  );
};
