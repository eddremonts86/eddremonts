import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

/* ────────────────────────────────────────────────────────────────
   Token types & color palette  (Catppuccin Mocha–inspired)
   ──────────────────────────────────────────────────────────────── */
type TokenType =
  | 'keyword'
  | 'type'
  | 'variable'
  | 'function'
  | 'operator'
  | 'brace'
  | 'property'
  | 'string'
  | 'number'
  | 'comment'
  | 'decorator'
  | 'template'
  | 'generic'
  | 'indent'
  | 'break';

interface Token {
  type: TokenType;
  text: string;
}

const colorMap: Record<TokenType, string> = {
  keyword: 'text-purple-400',
  type: 'text-sky-300',
  variable: 'text-sky-300',
  function: 'text-blue-400',
  operator: 'text-white/40',
  brace: 'text-yellow-300',
  property: 'text-emerald-400',
  string: 'text-amber-300',
  number: 'text-orange-400',
  comment: 'text-white/20 italic',
  decorator: 'text-pink-400',
  template: 'text-amber-300/80',
  generic: 'text-teal-300',
  indent: '',
  break: '',
};

/* ────────────────────────────────────────────────────────────────
   File tabs — each holds its own token stream
   ──────────────────────────────────────────────────────────────── */
interface FileTab {
  name: string;
  icon: string;
  tokens: Token[];
}

const B: Token = { type: 'break', text: '' };
const I1: Token = { type: 'indent', text: '  ' };
const I2: Token = { type: 'indent', text: '    ' };
const I3: Token = { type: 'indent', text: '      ' };
const COMMA: Token = { type: 'operator', text: ',' };

const tabs: FileTab[] = [
  /* ─── Tab 1 : edd.config.ts ─── */
  {
    name: 'edd.config.ts',
    icon: '⚙',
    tokens: [
      { type: 'comment', text: '// @ts-check — Edd Remonts developer manifest' },
      B,
      B,
      { type: 'keyword', text: 'interface ' },
      { type: 'type', text: 'Stack' },
      { type: 'generic', text: '<T extends string>' },
      { type: 'operator', text: ' ' },
      { type: 'brace', text: '{' },
      B,
      I1,
      { type: 'property', text: 'core' },
      { type: 'operator', text: ': ' },
      { type: 'type', text: 'T[]' },
      { type: 'operator', text: ';' },
      B,
      I1,
      { type: 'property', text: 'tools' },
      { type: 'operator', text: ': ' },
      { type: 'type', text: 'T[]' },
      { type: 'operator', text: ';' },
      B,
      I1,
      { type: 'property', text: 'cloud' },
      { type: 'operator', text: ': ' },
      { type: 'type', text: 'T[]' },
      { type: 'operator', text: ';' },
      B,
      { type: 'brace', text: '}' },
      B,
      B,
      { type: 'keyword', text: 'interface ' },
      { type: 'type', text: 'Developer' },
      { type: 'operator', text: ' ' },
      { type: 'brace', text: '{' },
      B,
      I1,
      { type: 'keyword', text: 'readonly ' },
      { type: 'property', text: 'name' },
      { type: 'operator', text: ': ' },
      { type: 'type', text: 'string' },
      { type: 'operator', text: ';' },
      B,
      I1,
      { type: 'property', text: 'role' },
      { type: 'operator', text: ': ' },
      { type: 'type', text: 'string' },
      { type: 'operator', text: ';' },
      B,
      I1,
      { type: 'property', text: 'location' },
      { type: 'operator', text: ': ' },
      { type: 'type', text: 'string' },
      { type: 'operator', text: ';' },
      B,
      I1,
      { type: 'property', text: 'stack' },
      { type: 'operator', text: ': ' },
      { type: 'type', text: 'Stack' },
      { type: 'generic', text: '<string>' },
      { type: 'operator', text: ';' },
      B,
      I1,
      { type: 'property', text: 'experience' },
      { type: 'operator', text: ': ' },
      { type: 'brace', text: '{ ' },
      { type: 'property', text: 'years' },
      { type: 'operator', text: ': ' },
      { type: 'type', text: 'number' },
      { type: 'operator', text: '; ' },
      { type: 'property', text: 'companies' },
      { type: 'operator', text: ': ' },
      { type: 'type', text: 'number' },
      { type: 'operator', text: ' ' },
      { type: 'brace', text: '}' },
      { type: 'operator', text: ';' },
      B,
      I1,
      { type: 'property', text: 'passion' },
      { type: 'operator', text: ': ' },
      { type: 'brace', text: '() => ' },
      { type: 'type', text: 'string' },
      { type: 'operator', text: ';' },
      B,
      { type: 'brace', text: '}' },
      B,
      B,
      { type: 'keyword', text: 'export const ' },
      { type: 'variable', text: 'edd' },
      { type: 'operator', text: ': ' },
      { type: 'type', text: 'Developer' },
      { type: 'operator', text: ' = ' },
      { type: 'brace', text: '{' },
      B,
      I1,
      { type: 'property', text: 'name' },
      { type: 'operator', text: ':    ' },
      { type: 'string', text: "'Edd Remonts'" },
      COMMA,
      B,
      I1,
      { type: 'property', text: 'role' },
      { type: 'operator', text: ':    ' },
      { type: 'string', text: "'Senior Frontend Engineer'" },
      COMMA,
      B,
      I1,
      { type: 'property', text: 'location' },
      { type: 'operator', text: ': ' },
      { type: 'string', text: "'Copenhagen, Denmark'" },
      COMMA,
      B,
      I1,
      { type: 'property', text: 'stack' },
      { type: 'operator', text: ': ' },
      { type: 'brace', text: '{' },
      B,
      I2,
      { type: 'property', text: 'core' },
      { type: 'operator', text: ':  ' },
      { type: 'brace', text: '[' },
      { type: 'string', text: "'React'" },
      { type: 'operator', text: ', ' },
      { type: 'string', text: "'Vue'" },
      { type: 'operator', text: ', ' },
      { type: 'string', text: "'Next.js'" },
      { type: 'operator', text: ', ' },
      { type: 'string', text: "'TypeScript'" },
      { type: 'brace', text: ']' },
      COMMA,
      B,
      I2,
      { type: 'property', text: 'tools' },
      { type: 'operator', text: ': ' },
      { type: 'brace', text: '[' },
      { type: 'string', text: "'Docker'" },
      { type: 'operator', text: ', ' },
      { type: 'string', text: "'Git'" },
      { type: 'operator', text: ', ' },
      { type: 'string', text: "'Tailwind'" },
      { type: 'operator', text: ', ' },
      { type: 'string', text: "'Framer Motion'" },
      { type: 'brace', text: ']' },
      COMMA,
      B,
      I2,
      { type: 'property', text: 'cloud' },
      { type: 'operator', text: ': ' },
      { type: 'brace', text: '[' },
      { type: 'string', text: "'Vercel'" },
      { type: 'operator', text: ', ' },
      { type: 'string', text: "'AWS'" },
      { type: 'operator', text: ', ' },
      { type: 'string', text: "'Cloudflare'" },
      { type: 'brace', text: ']' },
      COMMA,
      B,
      I1,
      { type: 'brace', text: '}' },
      COMMA,
      B,
      I1,
      { type: 'property', text: 'experience' },
      { type: 'operator', text: ': ' },
      { type: 'brace', text: '{ ' },
      { type: 'property', text: 'years' },
      { type: 'operator', text: ': ' },
      { type: 'number', text: '8' },
      { type: 'operator', text: ', ' },
      { type: 'property', text: 'companies' },
      { type: 'operator', text: ': ' },
      { type: 'number', text: '6' },
      { type: 'operator', text: ' ' },
      { type: 'brace', text: '}' },
      COMMA,
      B,
      I1,
      { type: 'property', text: 'passion' },
      { type: 'operator', text: ': ' },
      { type: 'brace', text: '() => ' },
      { type: 'string', text: "'Building beautiful interfaces'" },
      COMMA,
      B,
      { type: 'brace', text: '};' },
    ],
  },

  /* ─── Tab 2 : init.ts ─── */
  {
    name: 'init.ts',
    icon: '▶',
    tokens: [
      { type: 'keyword', text: 'import ' },
      { type: 'brace', text: '{ ' },
      { type: 'variable', text: 'edd' },
      { type: 'brace', text: ' } ' },
      { type: 'keyword', text: 'from ' },
      { type: 'string', text: "'./edd.config'" },
      { type: 'operator', text: ';' },
      B,
      { type: 'keyword', text: 'import ' },
      { type: 'brace', text: '{ ' },
      { type: 'variable', text: 'render' },
      { type: 'brace', text: ' } ' },
      { type: 'keyword', text: 'from ' },
      { type: 'string', text: "'react-dom/client'" },
      { type: 'operator', text: ';' },
      B,
      B,
      { type: 'comment', text: '// Bootstrap the portfolio engine' },
      B,
      { type: 'keyword', text: 'async function ' },
      { type: 'function', text: 'bootstrap' },
      { type: 'brace', text: '() ' },
      { type: 'brace', text: '{' },
      B,
      I1,
      { type: 'keyword', text: 'const ' },
      { type: 'variable', text: 'config' },
      { type: 'operator', text: ' = ' },
      { type: 'keyword', text: 'await ' },
      { type: 'function', text: 'loadTheme' },
      { type: 'brace', text: '(' },
      { type: 'string', text: "'apple-x-anime'" },
      { type: 'brace', text: ')' },
      { type: 'operator', text: ';' },
      B,
      B,
      I1,
      { type: 'keyword', text: 'const ' },
      { type: 'variable', text: 'app' },
      { type: 'operator', text: ' = ' },
      { type: 'function', text: 'createPortfolio' },
      { type: 'brace', text: '(' },
      { type: 'brace', text: '{' },
      B,
      I2,
      { type: 'property', text: 'developer' },
      { type: 'operator', text: ': ' },
      { type: 'variable', text: 'edd' },
      COMMA,
      B,
      I2,
      { type: 'property', text: 'theme' },
      { type: 'operator', text: ':    ' },
      { type: 'variable', text: 'config' },
      COMMA,
      B,
      I2,
      { type: 'property', text: 'motion' },
      { type: 'operator', text: ':   ' },
      { type: 'brace', text: '{' },
      B,
      I3,
      { type: 'property', text: 'spring' },
      { type: 'operator', text: ':  ' },
      { type: 'brace', text: '{ ' },
      { type: 'property', text: 'stiffness' },
      { type: 'operator', text: ': ' },
      { type: 'number', text: '200' },
      { type: 'operator', text: ', ' },
      { type: 'property', text: 'damping' },
      { type: 'operator', text: ': ' },
      { type: 'number', text: '25' },
      { type: 'operator', text: ' ' },
      { type: 'brace', text: '}' },
      COMMA,
      B,
      I3,
      { type: 'property', text: 'easing' },
      { type: 'operator', text: ': ' },
      { type: 'brace', text: '[' },
      { type: 'number', text: '0.16' },
      { type: 'operator', text: ', ' },
      { type: 'number', text: '1' },
      { type: 'operator', text: ', ' },
      { type: 'number', text: '0.3' },
      { type: 'operator', text: ', ' },
      { type: 'number', text: '1' },
      { type: 'brace', text: ']' },
      COMMA,
      B,
      I2,
      { type: 'brace', text: '}' },
      COMMA,
      B,
      I2,
      { type: 'property', text: 'i18n' },
      { type: 'operator', text: ':     ' },
      { type: 'brace', text: '[' },
      { type: 'string', text: "'en'" },
      { type: 'operator', text: ', ' },
      { type: 'string', text: "'es'" },
      { type: 'operator', text: ', ' },
      { type: 'string', text: "'dk'" },
      { type: 'brace', text: ']' },
      COMMA,
      B,
      I1,
      { type: 'brace', text: '})' },
      { type: 'operator', text: ';' },
      B,
      B,
      I1,
      { type: 'keyword', text: 'await ' },
      { type: 'variable', text: 'app' },
      { type: 'operator', text: '.' },
      { type: 'function', text: 'prefetch' },
      { type: 'brace', text: '(' },
      { type: 'brace', text: ')' },
      { type: 'operator', text: ';' },
      B,
      I1,
      { type: 'function', text: 'render' },
      { type: 'brace', text: '(' },
      { type: 'variable', text: 'app' },
      { type: 'operator', text: '.' },
      { type: 'property', text: 'root' },
      { type: 'brace', text: ')' },
      { type: 'operator', text: ';' },
      B,
      B,
      I1,
      { type: 'variable', text: 'console' },
      { type: 'operator', text: '.' },
      { type: 'function', text: 'log' },
      { type: 'brace', text: '(' },
      { type: 'template', text: '`🚀 ${' },
      { type: 'variable', text: 'edd' },
      { type: 'operator', text: '.' },
      { type: 'property', text: 'name' },
      { type: 'template', text: '} ' },
      { type: 'template', text: 'is ready to build.`' },
      { type: 'brace', text: ')' },
      { type: 'operator', text: ';' },
      B,
      { type: 'brace', text: '}' },
      B,
      B,
      { type: 'function', text: 'bootstrap' },
      { type: 'brace', text: '()' },
      { type: 'operator', text: ';' },
    ],
  },
];

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
