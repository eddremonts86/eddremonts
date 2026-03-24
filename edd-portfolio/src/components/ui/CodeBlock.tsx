import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { colorMap, tabs } from '@/data/codeBlockTokens';
import type { Token } from '@/data/codeBlockTokens';

/* ────────────────────────────────────────────────────────────────
   Component
   ──────────────────────────────────────────────────────────────── */
export const CodeBlock = () => {
  const [activeTab, setActiveTab] = useState(0);
  const reduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.018 },
    },
  };

  const tokenVariants = {
    hidden: { opacity: 0, y: 4 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.15 } },
  };

  /** Count visual lines for line numbers */
  const countLines = (tokens: Token[]) =>
    tokens.filter((t) => t.type === 'break').length + 1;

  const activeTokens = tabs[activeTab].tokens;
  const lineCount = countLines(activeTokens);

  return (
    <div className="relative max-w-3xl mx-auto group/block">
      {/* ── Window chrome ── */}
      <div className="bg-[#151515] rounded-t-xl px-4 py-3 flex items-center gap-3 border-b border-white/[0.05]">
        {/* Traffic lights */}
        <div className="flex gap-2 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>

        {/* File tabs */}
        <div className="flex gap-1 ml-4 overflow-x-auto scrollbar-none">
          {tabs.map((tab, idx) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 px-4 py-1.5 text-[11px] font-mono tracking-wide rounded-md transition-all duration-300 whitespace-nowrap ${
                idx === activeTab
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-white/40 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              <span className="text-[10px] opacity-70">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Minimap dots (decorative) */}
        <div className="ml-auto flex gap-1 items-center opacity-20" aria-hidden="true">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-1 h-3 rounded-sm bg-white/40" />
          ))}
        </div>
      </div>

      {/* ── Code area with line numbers ── */}
      <div className="bg-[#0A0A0A] rounded-b-xl overflow-hidden shadow-2xl border border-white/[0.02]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex"
          >
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
                {activeTokens.map((token, i) => {
                  if (token.type === 'break') return <br key={i} />;
                  if (token.type === 'indent')
                    return <span key={i}>{token.text}</span>;
                  return (
                    <motion.span
                      key={`${activeTab}-${i}`}
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
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'anticipate',
                  }}
                  aria-hidden="true"
                />
              </code>
            </motion.pre>
          </motion.div>
        </AnimatePresence>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-white/[0.05] text-[10px] font-mono tracking-widest text-white/30 uppercase bg-[#0F0F0F]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
              TypeScript
            </span>
            <span>UTF-8</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Ln {lineCount}, Col 1</span>
            <span>Spaces: 2</span>
          </div>
        </div>
      </div>
    </div>
  );
};
