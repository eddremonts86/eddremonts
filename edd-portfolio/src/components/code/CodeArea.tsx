import { motion } from 'framer-motion';
import { colorMap, type Token } from './codeBlockTokens';

export const CodeArea = ({
  tokens,
  lineCount,
  tabKey,
  containerVariants,
  tokenVariants,
}: {
  tokens: Token[];
  lineCount: number;
  tabKey: number;
  containerVariants: import('framer-motion').Variants;
  tokenVariants: import('framer-motion').Variants;
}) => (
  <div className="flex">
    {/* Line numbers gutter */}
    <div
      className="select-none shrink-0 py-6 pl-4 pr-4 text-right font-mono text-[11px] tracking-widest leading-[1.7] text-white/20 border-r border-white/5"
      aria-hidden="true"
    >
      {Array.from({ length: lineCount }, (_, i) => (
        <div key={i}>{String(i + 1).padStart(2, '0')}</div>
      ))}
    </div>

    {/* Token stream */}
    <motion.pre
      className="flex-1 py-6 px-6 font-mono text-[13px] leading-[1.7] overflow-x-auto scrollbar-none"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <code>
        {tokens.map((token, i) => {
          if (token.type === 'break') return <br key={i} />;
          if (token.type === 'indent') return <span key={i}>{token.text}</span>;
          return (
            <motion.span
              key={`${tabKey}-${i}`}
              className={colorMap[token.type] || 'text-white/60'}
              variants={tokenVariants}
            >
              {token.text}
            </motion.span>
          );
        })}
        {/* Blinking cursor */}
        <motion.span
          className="inline-block w-[2px] h-[1.2em] bg-white opacity-50 align-text-bottom ml-1"
          animate={{ opacity: [0.7, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, repeatType: 'reverse', ease: 'anticipate' }}
          aria-hidden="true"
        />
      </code>
    </motion.pre>
  </div>
);
