import { CodeBlock } from '@/components/ui/CodeBlock';
import { APPLE_EASE } from '@/lib/motion';
import { motion } from 'framer-motion';
import {
  Braces,
  GitBranch,
  Layers,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

/* ─────────────────────────────────────────────────────────
 * Data — separated from view (Container/Presentational)
 * ───────────────────────────────────────────────────────── */
const principles = [
  { icon: Layers, key: 'codeShowcase.principles.architecture' },
  { icon: Zap, key: 'codeShowcase.principles.performance' },
  { icon: GitBranch, key: 'codeShowcase.principles.patterns' },
  { icon: Terminal, key: 'codeShowcase.principles.dx' },
] as const;



/* ─────────────────────────────────────────────────────────
 * Presentational sub-components (Compound-like composition)
 * ───────────────────────────────────────────────────────── */

/** Bold blue atmosphere — breaks the neutral scheme completely */
const BackgroundAtmosphere = () => (
  <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
    {/* ── Base: deep blue mesh gradient ── */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_20%_0%,#1e3a5f_0%,transparent_50%),radial-gradient(ellipse_100%_60%_at_80%_100%,#0c2d4a_0%,transparent_50%)]" />

    {/* ── Oversized cyan aurora — top-right, bleeds off edge ── */}
    <div className="absolute -top-[15%] -right-[10%] w-[900px] h-[600px] rounded-full bg-[#00b4d8]/[0.15] blur-[150px] rotate-[-20deg]" />

    {/* ── Deep violet counterweight — bottom-left ── */}
    <div className="absolute -bottom-[10%] -left-[5%] w-[600px] h-[500px] rounded-full bg-[#6a0dad]/[0.12] blur-[140px]" />

    {/* ── Pink accent splash — mid-right ── */}
    <div className="absolute top-[45%] -right-[3%] w-[300px] h-[400px] rounded-full bg-secondary/[0.08] blur-[120px]" />

    {/* ── Noise/grain texture — CSS-only film grain ── */}
    <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.85%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url%28%23noise%29%22%2F%3E%3C%2Fsvg%3E')] bg-repeat bg-[length:128px_128px]" />

    {/* ── Diagonal kinetic lines — anime energy ── */}
    <div className="absolute top-0 right-[18%] w-px h-[130%] origin-top rotate-[15deg] bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />
    <div className="absolute bottom-0 left-[12%] w-px h-[90%] origin-bottom -rotate-[10deg] bg-gradient-to-t from-transparent via-[#00b4d8]/[0.08] to-transparent" />
    <div className="absolute top-[20%] right-[45%] w-px h-[60%] rotate-[25deg] bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />

    {/* ── Subtle dot grid — technical feel ── */}
    <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(circle,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:32px_32px]" />

    {/* ── Scattered light particles ── */}
    <div className="absolute top-[8%] left-[6%] w-1.5 h-1.5 rounded-full bg-[#00e5ff]/30 animate-pulse" />
    <div className="absolute top-[25%] right-[10%] w-1 h-1 rounded-full bg-white/20" />
    <div className="absolute bottom-[18%] left-[22%] w-2 h-2 rounded-full bg-[#00b4d8]/20" />
    <div className="absolute top-[60%] right-[28%] w-1 h-1 rounded-full bg-white/15 animate-pulse" />
    <div className="absolute bottom-[35%] right-[5%] w-1.5 h-1.5 rounded-full bg-[#b066ff]/20" />
    <div className="absolute top-[75%] left-[55%] w-1 h-1 rounded-full bg-[#00e5ff]/25" />
  </div>
);

export const CodeShowcase = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-40 overflow-hidden md:py-48 bg-[#0a1628]">
      {/* ── Transition: gradient fade from previous section into blue ── */}
      <div
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-[#0a1628]"
        aria-hidden="true"
      />

      <BackgroundAtmosphere />

      <div className="container relative z-10 px-6 mx-auto max-w-7xl">
        {/* ══════════════════════════════════════════════════
         *  HEADER — Centered, heroic, with generous breathing room
         *  Follows: visual hierarchy (badge → title → desc)
         * ══════════════════════════════════════════════════ */}
        <div className="max-w-3xl mx-auto mb-20 text-center lg:mb-28">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: APPLE_EASE }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.08] border border-white/[0.1] backdrop-blur-sm text-xs font-semibold tracking-widest uppercase text-[#00e5ff] mb-10"
          >
            <Braces className="w-3.5 h-3.5" />
            {t('codeShowcase.badge')}
          </motion.div>

          {/* Title — scale jump for impact */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: APPLE_EASE }}
            className="mb-8 text-5xl font-black tracking-tighter text-white md:text-6xl lg:text-7xl"
          >
            {t('codeShowcase.title')}{' '}
            <span className="bg-gradient-to-r from-[#00e5ff] via-[#b066ff] to-[#ff2a85] bg-clip-text text-transparent">
              {t('codeShowcase.titleAccent')}
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: APPLE_EASE }}
            className="max-w-2xl mx-auto text-lg leading-relaxed md:text-xl text-white/55 font-body"
          >
            {t('codeShowcase.description')}
          </motion.p>
        </div>

        {/* ══════════════════════════════════════════════════
         *  CONTENT — Asymmetric 12-col grid (4 + 8)
         *  Principles sidebar + Code block as the hero element
         * ══════════════════════════════════════════════════ */}
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          {/* ── Left: Principles sidebar (4 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: APPLE_EASE }}
            className="lg:col-span-4 lg:sticky lg:top-32"
          >
            {/* Vertical list — more breathing room than 2×2 grid */}
            <div className="space-y-3">
              {principles.map((p, i) => (
                <motion.div
                  key={p.key}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.08,
                    ease: APPLE_EASE,
                  }}
                  className="group flex items-center gap-4 p-5 rounded-2xl hover:bg-white/[0.05] transition-all duration-300"
                >
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-[#00e5ff]/[0.1] flex items-center justify-center group-hover:bg-[#00e5ff]/[0.2] transition-colors duration-300">
                    <p.icon className="w-[18px] h-[18px] text-[#00e5ff]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-snug tracking-tight text-white/90">
                      {t(`${p.key}.title`)}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-white/40">
                      {t(`${p.key}.sub`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sparkle hint — separated with generous margin */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-2.5 mt-10 pl-5 text-sm text-white/30"
            >
              <Sparkles className="w-4 h-4 text-[#00e5ff]/50 shrink-0" />
              <span className="font-medium">{t('codeShowcase.hint')}</span>
            </motion.div>
          </motion.div>

          {/* ── Right: Code Block hero (8 cols) ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: 0.25, ease: APPLE_EASE }}
            className="lg:col-span-8"
          >
            <CodeBlock />
          </motion.div>
        </div>
      </div>

      {/* ── Transition: gradient fade from blue into next section ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface to-[#0a1628]"
        aria-hidden="true"
      />
    </section>
  );
};
