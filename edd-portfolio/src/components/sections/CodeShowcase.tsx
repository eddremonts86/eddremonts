import { CodeBlock } from '@/components/ui/CodeBlock';
import { APPLE_EASE } from '@/lib/motion';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const CodeShowcase = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-40 overflow-hidden bg-background border-b border-foreground/10">
      {/* Massive abstract background type */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden pointer-events-none opacity-[0.02]">
        <h2 className="text-[30vw] font-black uppercase tracking-tighter leading-none text-center whitespace-nowrap">
          {`<CODE />`}
        </h2>
      </div>

      <div className="container relative z-10 px-6 mx-auto max-w-[1600px]">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left: Huge typography */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: APPLE_EASE }}
            className="lg:col-span-5"
          >
            <div className="mb-8">
              <span className="text-sm font-bold tracking-widest uppercase text-primary border-l-4 border-primary pl-4 mb-8 block">
                {t('codeShowcase.badge')}
              </span>
              <h2 className="text-[14vw] md:text-8xl font-black uppercase tracking-tighter leading-[0.85] break-words">
                {t('codeShowcase.title')}<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  {t('codeShowcase.titleAccent')}
                </span>
              </h2>
            </div>
            <p className="text-xl font-body opacity-70 leading-relaxed border-l border-foreground/20 pl-6">
              {t('codeShowcase.description')}
            </p>
          </motion.div>

          {/* Right: The CodeBlock wrapped in a brutalist frame */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: APPLE_EASE }}
            className="lg:col-span-7"
          >
            <div className="bg-foreground p-2 md:p-4 shadow-2xl relative group">
              {/* Decorative corner accents */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-primary" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-secondary" />
              
              <CodeBlock />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};