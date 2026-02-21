import type { HTMLMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

interface OptimizedImageProps extends HTMLMotionProps<"img"> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  blurDataURL?: string; // Very low res base64 placeholder for true blur-up
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc,
  blurDataURL,
  className = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer to detect when the image enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading slightly before it enters the viewport
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  const currentSrc = hasError && fallbackSrc ? fallbackSrc : src;

  return (
    <div
      className={`relative overflow-hidden bg-black/5 ${className}`}
      ref={imgRef}
    >
      {/*
        Blur placeholder:
        If a tiny base64 blurDataURL is provided, we show it stretched and blurred.
        Otherwise, we show an aesthetic Apple-like skeleton loader.
      */}
      {!isLoaded && (
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          {blurDataURL ? (
             <img src={blurDataURL} alt="" aria-hidden="true" className="w-full h-full object-cover blur-2xl scale-110" />
          ) : (
             <motion.div
               animate={{ opacity: [0.3, 0.7, 0.3] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               className="w-full h-full bg-surface"
             />
          )}
        </div>
      )}

      {isInView && (
        <motion.img
          src={currentSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0, filter: 'blur(20px)' }}
          animate={{
            opacity: isLoaded ? 1 : 0,
            filter: isLoaded ? 'blur(0px)' : 'blur(20px)'
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`relative z-10 w-full h-full object-cover will-change-[opacity,filter] ${className}`}
          {...props}
        />
      )}
    </div>
  );
};
