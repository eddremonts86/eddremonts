# Agent Skills & Generative Integration

This document outlines how autonomous agents (`.agents` configuration) are embedded into the workflow to generate dynamic assets and scale content iteratively.

## 1. Image Generation Pipelines
The portfolio currently utilizes abstract placeholders and some external imagery. When moving to full generative assets:
1. **Trigger Condition:** The agent detects a missing asset in `cvData.ts` (e.g. an empty `image` key on a new project).
2. **Prompt Template:** The agent synthesizes the project's `description` + `category` passing it to the Image Generation tool:
   - *Example Prompt Strategy:* `Minimalist vector art representing [Category], using neon cyan (#00E5FF) and sakura pink (#FF2A85) gradients over an off-white background (#FBFBFD). UI/UX technology themed, sharp vector style reminiscent of anime sci-fi aesthetics. No text.`
3. **Execution:** The image is written to `@/assets/images/generated/`, compressed, and linked inside `cvData.ts`.

## 2. Copy Structuring
The `aboutMe`, `personalInfo`, and `experiences` are parsed periodically.
- If new experiences are added by the user as raw notes, the Agent (via `frontend-design` or `landing-page-copywriter` skills) will rewrite them injecting high-value metrics (e.g. % performance increase, SLA delivery) ensuring it matches the "Senior Full Stack Engineeer & Tech Lead" tone.

## 3. Review Implementation
Agents are required to use `task.md` checklists and `notify_user` asking for a qualitative review when replacing core visual assets, citing Lighthouse Performance drops if an asset exceeds 200kb.
