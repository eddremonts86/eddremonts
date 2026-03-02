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
    <div className="relative max-w-2xl mx-auto group/block">
      {/* ── Window chrome ── */}
      <div className="bg-[#181825] rounded-t-2xl px-4 py-3 flex items-center gap-3 border-b border-white/[0.04]">
        {/* Traffic lights */}
        <div className="flex gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.4)]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.3)]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.3)]" />
        </div>

        {/* File tabs */}
        <div className="flex gap-0.5 ml-3 overflow-x-auto scrollbar-none">
          {tabs.map((tab, idx) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] font-mono rounded-lg transition-all duration-200 whitespace-nowrap ${
                idx === activeTab
                  ? 'bg-[#1e1e2e] text-white/80 shadow-sm'
                  : 'text-white/25 hover:text-white/50 hover:bg-white/[0.03]'
              }`}
            >
              <span className="text-[10px]">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Minimap dots (decorative) */}
        <div className="ml-auto flex gap-[3px] items-center opacity-20" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-[3px] h-3 rounded-full bg-white/40" />
          ))}
        </div>
      </div>

      {/* ── Code area with line numbers ── */}
      <div className="bg-[#1e1e2e] rounded-b-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex"
          >
            {/* Line numbers gutter */}
            <div
              className="select-none shrink-0 py-5 pl-4 pr-3 text-right font-mono text-[11px] leading-relaxed text-white/[0.12] border-r border-white/[0.04]"
              aria-hidden="true"
            >
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Token stream */}
            <motion.pre
              className="flex-1 py-5 px-4 font-mono text-[13px] leading-relaxed overflow-x-auto scrollbar-none"
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
                      className={colorMap[token.type] || 'text-white/50'}
                      variants={tokenVariants}
                    >
                      {token.text}
                    </motion.span>
                  );
                })}
                {/* Blinking cursor */}
                <motion.span
                  className="inline-block w-[2px] h-[1.1em] bg-primary align-text-bottom ml-0.5"
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  }}
                  aria-hidden="true"
                />
              </code>
            </motion.pre>
          </motion.div>
        </AnimatePresence>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-1.5 border-t border-white/[0.04] text-[10px] font-mono text-white/20">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.6)]" />
              TypeScript
            </span>
            <span>UTF-8</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Ln {lineCount}, Col 1</span>
            <span>Spaces: 2</span>
          </div>
        </div>
      </div>

      {/* ── Neon glow underneath ── */}
      <div
        className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover/block:opacity-30 blur-3xl transition-opacity duration-700 bg-gradient-to-br from-primary via-accent to-secondary"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 rounded-2xl opacity-20 blur-2xl bg-gradient-to-br from-primary to-accent"
        aria-hidden="true"
      />
    </div>
  );
};
