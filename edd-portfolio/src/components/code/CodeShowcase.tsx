import { CodeBlock } from './CodeBlock';
import { fadeInView } from '@/lib/motion';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const CodeShowcase = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 md:py-40 overflow-hidden bg-background border-b border-subtle">
      {/* Refined abstract background type */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden pointer-events-none opacity-[0.02]">
        <h2 className="text-[25vw] font-serif italic tracking-tight leading-none text-center whitespace-nowrap text-foreground">
          craft.
        </h2>
      </div>

      <div className="container relative z-10 px-6 mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left: Refined typography */}
          <m.div
            {...fadeInView({ distance: 30, axis: 'x' })}
            className="lg:col-span-5"
          >
            <div className="mb-10">
              <span className="text-[11px] font-mono tracking-widest uppercase text-primary mb-6 block">
                {t('codeShowcase.badge')}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight leading-[1.1] break-words">
                {t('codeShowcase.title')}
                <span className="block font-serif italic text-primary mt-2">
                  {t('codeShowcase.titleAccent')}
                </span>
              </h2>
            </div>
            <p className="text-sm md:text-base font-light text-foreground/70 leading-relaxed max-w-md">
              {t('codeShowcase.description')}
            </p>
          </m.div>

          {/* Right: The CodeBlock in an elegant frame */}
          <m.div
            {...fadeInView({ delay: 0.2, distance: 40 })}
            className="lg:col-span-7"
          >
            <div className="p-1 rounded-2xl bg-gradient-to-b from-subtle to-transparent shadow-2xl relative">
              <div className="bg-[#101010] rounded-xl overflow-hidden shadow-inner">
                <CodeBlock />
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
};
