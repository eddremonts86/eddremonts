import { chromium } from 'playwright';
import { mkdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, 'public', 'cv');

function getPhotoDataUrl(theme) {
  const filename = theme === 'dark' ? 'edd_dark.jpg' : 'edd_light.jpg';
  const photoPath = join(__dirname, 'public', 'edd', filename);
  const photoBase64 = readFileSync(photoPath).toString('base64');
  return `data:image/jpeg;base64,${photoBase64}`;
}

// ── SVG Icons ──────────────────────────────────────────────────
const icons = {
  email: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  mapPin: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
  github: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
  globe: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>`,
  link: `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`
};

// ── Data ─────────────────────────────────────────────────────────
const personalInfo = {
  name: 'Eduardo Inerarte',
  email: 'eddremonts86@gmail.com',
  phone: '(+45) 61436173',
  location: 'Copenhagen, Denmark',
  linkedin: 'linkedin.com/in/eduardo-inerarte-643843bb',
  linkedinUrl: 'https://www.linkedin.com/in/eduardo-inerarte-643843bb',
  github: 'github.com/eddremonts86',
  githubUrl: 'https://github.com/eddremonts86',
  web: 'eddremonts.com',
  webUrl: 'https://eddremonts.com',
};

const experiences = [
  { id: 12, period: '08/2024 - Present', company: 'Schilling Aps', location: 'Copenhagen' },
  { id: 11, period: '08/2022 - 07/2024', company: 'Resights Aps', location: 'Copenhagen' },
  { id: 10, period: '08/2020 - 07/2022', company: 'Novo Nordisk', location: 'Copenhagen' },
  { id: 9,  period: '02/2020 - 09/2020', company: 'Wunderman Nordic', location: 'Copenhagen' },
  { id: 8,  period: '12/2017 - 01/2020', company: 'GIG Media Copenhagen', location: 'Copenhagen' },
  { id: 7,  period: '06/2017 - 12/2017', company: 'Rebel Penguins Aps', location: 'Copenhagen' },
  { id: 6,  period: '11/2015 - 06/2017', company: 'Rebel Penguins Aps', location: 'Copenhagen' },
  { id: 5,  period: '05/2015 - 10/2015', company: 'Plan Denmark', location: 'Copenhagen' },
  { id: 4,  period: '12/2014 - 05/2015', company: 'Viruta Studio Creativo', location: 'Pinar del Rio, Cuba' },
  { id: 3,  period: '10/2012 - 06/2014', company: 'I & D Agency, GEOCUBA', location: 'Pinar del Rio, Cuba' },
  { id: 2,  period: '09/2010 - 10/2012', company: 'Provincial Office ONEI', location: 'Pinar del Rio, Cuba' },
  { id: 1,  period: '02/2007 - 06/2010', company: "Project 'National Library'. UCI", location: 'Havana, Cuba' },
];

const skills = [
  'React', 'Vue.js', 'Next.js', 'Nuxt.js', 'TypeScript', 'JavaScript',
  'Tailwind CSS', 'HTML5', 'CSS3', 'SCSS', 'Node.js',
  'PHP', 'Laravel', 'MySQL', 'PostgreSQL',
  'Git', 'GitHub Actions', 'Docker', 'Linux',
  'Cypress', 'Vitest', 'Framer Motion',
];

// ── Translations ─────────────────────────────────────────────────
const translations = {
  en: {
    title: 'Senior Frontend Engineer with Full-Stack Roots',
    aboutTitle: 'About Me',
    summary: 'Frontend-first engineer with full-stack roots and nearly two decades of experience since 2007. I build scalable web products that turn complex business rules into fast, intuitive interfaces.',
    intro: 'I understand the full delivery chain, collaborate comfortably with product, design, and backend teams, and build interfaces that stay maintainable as products grow. I embrace architectural refactoring, keeping my tech stack, testing coverage, and CI/CD pipelines at the bleeding edge.',
    experienceTitle: 'Professional Experience',
    skillsTitle: 'Technical Skills',
    present: 'Present',
    langLabel: 'Languages',
    langList: 'Spanish (native) · English (fluent) · Danish (B1)',
    items: {
      12: { role: 'Senior Frontend Developer', desc: 'Leading frontend development for Schilling web applications and data products, working with React 18/19, TypeScript, Node.js, Tailwind and Shadcn UI to scale complex real-estate workflows.' },
      11: { role: 'Senior Frontend Developer', desc: 'Leading frontend development for Resights web applications and data products, working with Vue 2/3, Nuxt 2/3, TypeScript, Pinia/Vuex, Node.js, and Vuetify to scale complex real-estate workflows.' },
      10: { role: 'Senior Frontend Developer', desc: 'Built internal health and administration tools for Novo Nordisk with Vue, Vuetify, HTML, and CSS, focusing on reliable UI foundations for regulated medical teams.' },
      9:  { role: 'Senior Frontend Developer', desc: 'Delivered accessible campaign and landing experiences for Wunderman Nordic using Vue, SCSS, Bootstrap, and C# integrations.' },
      8:  { role: 'Lead Frontend Developer', desc: 'Led frontend development at GiG Media Copenhagen across affiliate and content platforms, modernizing legacy estates built on Laravel, Drupal, October CMS, MySQL, jQuery, Bootstrap, and PHP.' },
      7:  { role: 'Frontend Developer', desc: 'Worked on high-conversion affiliate products at Rebel Penguins, shipping frontend improvements, experiments, and UI iterations.' },
      6:  { role: 'Full Stack Developer', desc: 'Developed internal dashboards and external client sites end to end at Rebel Penguins using PHP, MySQL, jQuery, Bootstrap, Drupal, October CMS, and Laravel.' },
      5:  { role: 'Volunteer', desc: 'Supported Plan Denmark\'s sponsorship department by registering and validating documents.' },
      4:  { role: 'Full Stack Developer', desc: 'Founded Viruta Studio Creativo and built custom products for local organizations and media outlets using PHP, MySQL, PostgreSQL, Joomla, Drupal.' },
      3:  { role: 'Full Stack Developer', desc: 'Built internal systems at GEOCUBA\'s R&D agency, combining PHP, MySQL, PostgreSQL, Ext JS, jQuery, Bootstrap, and geospatial tooling.' },
      2:  { role: 'Full Stack Developer', desc: 'Developed statistical and administrative solutions for the Provincial Office of ONEI using PHP, MySQL, HTML, CSS, Ext JS.' },
      1:  { role: 'Full Stack Developer', desc: 'Started my professional career on the National Library project at UCI, building Drupal, PHP, and MySQL solutions while coordinating junior developers.' },
    },
  },
  es: {
    title: 'Ingeniero Frontend Senior con base Full Stack',
    aboutTitle: 'Sobre Mí',
    summary: 'Ingeniero orientado a frontend, con raíces full stack y casi dos décadas de experiencia desde 2007. Construyo productos web escalables que convierten reglas de negocio complejas en interfaces rápidas, claras e intuitivas.',
    intro: 'Entiendo toda la cadena de entrega, colaboro cómodamente con producto, diseño y backend. Adopto la refactorización arquitectónica, manteniendo mi stack técnico, cobertura de pruebas y pipelines CI/CD a la vanguardia.',
    experienceTitle: 'Experiencia Profesional',
    skillsTitle: 'Habilidades Técnicas',
    present: 'Actual',
    langLabel: 'Idiomas',
    langList: 'Español (nativo) · Inglés (fluido) · Danés (B1)',
    items: {
      12: { role: 'Desarrollador Frontend Senior', desc: 'Liderando el desarrollo frontend de las aplicaciones web y productos de datos de Schilling, trabajando con React 18/19, TypeScript, Node.js, Tailwind y Shadcn UI para escalar flujos de trabajo complejos en el sector inmobiliario.' },
      11: { role: 'Desarrollador Frontend Senior', desc: 'Liderando el desarrollo frontend de las aplicaciones y productos de datos de Resights, trabajando con Vue 2/3, Nuxt 2/3, TypeScript, Pinia/Vuex, Node.js y Vuetify para escalar flujos.' },
      10: { role: 'Desarrollador Frontend Senior', desc: 'Construí herramientas internas de salud y administración para Novo Nordisk con Vue, Vuetify, HTML y CSS, enfocándome en una base de interfaz fiable para equipos médicos.' },
      9:  { role: 'Desarrollador Frontend Senior', desc: 'Entregué campañas y landings accesibles para Wunderman Nordic usando Vue, SCSS, Bootstrap e integraciones con C#.' },
      8:  { role: 'Lead Frontend Developer', desc: 'Lideré el desarrollo frontend en GiG Media Copenhagen a través de productos de afiliación y contenido, modernizando plataformas legacy construidas con Laravel, Drupal, PHP.' },
      7:  { role: 'Desarrollador Frontend', desc: 'Trabajé en productos de afiliación de alta conversión en Rebel Penguins, entregando mejoras de frontend, experimentos e iteraciones de UI.' },
      6:  { role: 'Desarrollador Full Stack', desc: 'Desarrollé de extremo a extremo dashboards internos y sitios externos en Rebel Penguins usando PHP, MySQL, jQuery, Bootstrap, Laravel.' },
      5:  { role: 'Voluntario', desc: 'Apoyé al departamento de patrocinio de Plan Denmark registrando y validando documentos.' },
      4:  { role: 'Desarrollador Full Stack', desc: 'Fundé Viruta Studio Creativo y desarrollé productos a medida para organizaciones locales y medios usando PHP, MySQL, PostgreSQL, Drupal.' },
      3:  { role: 'Desarrollador Full Stack', desc: 'Construí sistemas internos en la agencia de I+D de GEOCUBA combinando PHP, MySQL, PostgreSQL, Ext JS, jQuery, Bootstrap.' },
      2:  { role: 'Desarrollador Full Stack', desc: 'Desarrollé soluciones estadísticas y administrativas para la Oficina Provincial de la ONEI utilizando PHP, MySQL, HTML, CSS, Ext JS.' },
      1:  { role: 'Desarrollador Full Stack', desc: 'Inicié mi carrera profesional en el proyecto Biblioteca Nacional de la UCI, desarrollando soluciones con Drupal, PHP y MySQL.' },
    },
  },
  dk: {
    title: 'Senior Frontend Engineer med Full-Stack baggrund',
    aboutTitle: 'Om Mig',
    summary: 'Frontend-fokuseret engineer med full-stack baggrund og næsten to årtiers erfaring siden 2007. Jeg bygger skalerbare webprodukter, der omsætter kompleks forretningslogik til hurtige og intuitive interfaces.',
    intro: 'Jeg forstår hele leverancekæden, samarbejder naturligt med produkt, design og backend, og bygger interfaces der forbliver vedligeholdelige. Jeg holder min teknologistak, testdækning og CI/CD-pipelines på forkant.',
    experienceTitle: 'Professionel Erfaring',
    skillsTitle: 'Tekniske Kompetencer',
    present: 'Nu',
    langLabel: 'Sprog',
    langList: 'Spansk (modersmål) · Engelsk (flydende) · Dansk (B1)',
    items: {
      12: { role: 'Senior Frontend Udvikler', desc: 'Leder frontend-udviklingen af Schillings webapplikationer og dataprodukter, med fokus på React 18/19, TypeScript, Node.js, Tailwind og Shadcn UI til at skalere komplekse ejendomsworkflows.' },
      11: { role: 'Senior Frontend Developer', desc: 'Leder frontend-udviklingen af Resights webapplikationer og dataprodukter med Vue 2/3, Nuxt 2/3, TypeScript, Pinia/Vuex, Node.js og Vuetify.' },
      10: { role: 'Senior Frontend Developer', desc: 'Byggede interne sundheds- og administrationsværktøjer for Novo Nordisk med Vue, Vuetify, HTML og CSS med fokus på stabile UI-fundamenter.' },
      9:  { role: 'Senior Frontend Developer', desc: 'Leverede tilgængelige kampagner og landing pages for Wunderman Nordic med Vue, SCSS, Bootstrap og C#-integrationer.' },
      8:  { role: 'Lead Frontend Developer', desc: 'Ledte frontend-udviklingen hos GiG Media Copenhagen, moderniserede legacy-platforme bygget i Laravel, Drupal, PHP.' },
      7:  { role: 'Frontend Developer', desc: 'Arbejdede på high-conversion affiliate-produkter hos Rebel Penguins og leverede frontend-forbedringer, og UI-iterationer.' },
      6:  { role: 'Full Stack Developer', desc: 'Udviklede interne dashboards og eksterne websites end-to-end hos Rebel Penguins med PHP, MySQL, jQuery, Laravel.' },
      5:  { role: 'Volunteer', desc: 'Støttede Plan Denmarks sponsorafdeling med registrering og validering af dokumenter.' },
      4:  { role: 'Full Stack Developer', desc: 'Grundlagde Viruta Studio Creativo og byggede skræddersyede produkter for lokale organisationer med PHP, MySQL, PostgreSQL, Drupal.' },
      3:  { role: 'Full Stack Developer', desc: 'Byggede interne systemer i GEOCUBAs forsknings- og udviklingsafdeling ved at kombinere PHP, MySQL, PostgreSQL, Ext JS.' },
      2:  { role: 'Full Stack Developer', desc: 'Udviklede statistiske og administrative løsninger for den provinsielle ONEI-kontor med PHP, MySQL, HTML, CSS, Ext JS.' },
      1:  { role: 'Full Stack Developer', desc: 'Startede min professionelle karriere på National Library-projektet ved UCI, hvor jeg byggede løsninger i Drupal, PHP og MySQL.' },
    },
  },
};

// ── Theme palettes ───────────────────────────────────────────────
const themes = {
  light: {
    bg: '#FBFAF9', fg: '#101010', primary: '#D13426', muted: '#6B6B6B',
    border: '#E5E2DF', skillBg: '#F2F0EE', skillText: '#2E3339', linkBg: '#fef2f2'
  },
  dark: {
    bg: '#0A0A0A', fg: '#EFEFEF', primary: '#FF4A3A', muted: '#999999',
    border: '#1F1F1F', skillBg: '#1A1A1A', skillText: '#C8B6A1', linkBg: '#2a1212'
  },
};

function buildHTML(lang, theme) {
  const t = translations[lang];
  const c = themes[theme];
  const PHOTO_URL = getPhotoDataUrl(theme);

  const experienceHTML = experiences.map(exp => {
    const item = t.items[exp.id];
    return `
      <div class="exp-entry">
        <div class="exp-left">
          <span class="exp-period">${exp.period.replace('Present', t.present)}</span>
        </div>
        <div class="exp-right">
          <h3 class="exp-role">${item.role}</h3>
          <p class="exp-company">${exp.company}<span class="exp-loc"> · ${exp.location}</span></p>
          <p class="exp-desc">${item.desc}</p>
        </div>
      </div>`;
  }).join('');

  const skillsHTML = skills.map(s => `<span class="skill-tag">${s}</span>`).join('');

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <style>
    @page { size: A4; margin: 0; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    html, body {
      background-color: ${c.bg} !important;
      color: ${c.fg};
      font-family: 'Epilogue', sans-serif;
      font-size: 8.5pt; line-height: 1.5;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* Links distinction */
    a {
      color: ${c.primary};
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      font-weight: 500;
      border-bottom: 1px solid transparent;
    }
    .contact-block a {
      background-color: ${c.linkBg};
      padding: 1px 4px;
      border-radius: 3px;
      margin-bottom: 2px;
    }

    /* Header Layout */
    .header {
      display: flex;
      gap: 15pt;
      margin-bottom: 15pt;
      padding-bottom: 15pt;
      border-bottom: 1pt solid ${c.border};
      break-inside: avoid;
    }
    
    .avatar {
      width: 90pt;
      height: 90pt;
      border-radius: 50%;
      object-fit: cover;
      object-position: center 15%;
      border: 2pt solid ${c.border};
      filter: grayscale(100%) contrast(125%);
    }

    .header-content { flex: 1; }

    .name {
      font-family: 'Cinzel', serif;
      font-size: 26pt; line-height: 1.1; font-weight: 700;
      margin-bottom: 4pt;
    }
    .name-dot { color: ${c.primary}; }
    .title-line {
      font-size: 10pt; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.15em; color: ${c.primary}; margin-bottom: 12pt;
    }

    /* Contact Grid */
    .contact-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 6pt;
      font-size: 8pt; color: ${c.muted};
    }
    .contact-item {
      display: flex; align-items: center; gap: 6pt;
    }
    .contact-item svg { color: ${c.primary}; }

    /* Sections */
    .section { margin-bottom: 15pt; break-inside: avoid; }
    .exp-section { margin-bottom: 15pt; } /* Exp section allows breaks between items, not inside */
    .section-title {
      font-family: 'Cinzel', serif; font-size: 11pt; font-weight: 700;
      letter-spacing: 0.08em; text-transform: uppercase;
      color: ${c.fg}; margin-bottom: 8pt;
      display: flex; align-items: center; gap: 6pt;
      break-after: avoid;
    }
    .section-title::before {
      content: ''; display: block; width: 12pt; height: 2pt;
      background: ${c.primary}; border-radius: 1px;
    }

    /* About me */
    .about-text { color: ${c.muted}; margin-bottom: 6pt; text-align: justify; }

    /* Experience */
    .exp-entry {
      display: flex; gap: 12pt; margin-bottom: 12pt;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .exp-left { width: 85pt; flex-shrink: 0; padding-top: 2pt; }
    .exp-period {
      font-family: 'JetBrains Mono', monospace; font-size: 7.5pt;
      color: ${c.muted}; background: ${c.skillBg}; padding: 2px 5px; border-radius: 3px;
    }
    .exp-right { flex: 1; }
    .exp-role { font-size: 9.5pt; font-weight: 700; margin-bottom: 2pt; }
    .exp-company { font-size: 8.5pt; font-weight: 600; color: ${c.primary}; margin-bottom: 3pt; }
    .exp-loc { font-weight: 400; color: ${c.muted}; }
    .exp-desc { color: ${c.muted}; font-size: 8.5pt; text-align: justify; }

    /* Skills Grid */
    .skills-grid { display: flex; flex-wrap: wrap; gap: 5pt; break-inside: avoid; }
    .skill-tag {
      padding: 3pt 8pt; font-size: 7pt; font-weight: 600;
      letter-spacing: 0.05em; text-transform: uppercase;
      background: ${c.skillBg}; color: ${c.skillText}; border-radius: 3pt;
    }
  </style>
</head>
<body>
  <header class="header">
    <img class="avatar" src="${PHOTO_URL}" alt="Eduardo Inerarte" />
    <div class="header-content">
      <h1 class="name">${personalInfo.name}<span class="name-dot">.</span></h1>
      <p class="title-line">${t.title}</p>
      
      <div class="contact-grid">
        <div class="contact-item">
          ${icons.email} <a href="mailto:${personalInfo.email}">${personalInfo.email} ${icons.link}</a>
        </div>
        <div class="contact-item">
          ${icons.phone} <span>${personalInfo.phone}</span>
        </div>
        <div class="contact-item">
          ${icons.globe} <a href="${personalInfo.webUrl}">${personalInfo.web} ${icons.link}</a>
        </div>
        <div class="contact-item">
          ${icons.mapPin} <span>${personalInfo.location}</span>
        </div>
        <div class="contact-item">
          ${icons.linkedin} <a href="${personalInfo.linkedinUrl}">${personalInfo.linkedin} ${icons.link}</a>
        </div>
        <div class="contact-item">
          ${icons.github} <a href="${personalInfo.githubUrl}">${personalInfo.github} ${icons.link}</a>
        </div>
      </div>
    </div>
  </header>

  <div class="section">
    <h2 class="section-title">${t.aboutTitle}</h2>
    <p class="about-text"><strong>${t.summary}</strong></p>
    <p class="about-text">${t.intro}</p>
  </div>

  <div class="exp-section">
    <h2 class="section-title">${t.experienceTitle}</h2>
    ${experienceHTML}
  </div>

  <div class="section">
    <h2 class="section-title">${t.skillsTitle}</h2>
    <div class="skills-grid">${skillsHTML}</div>
  </div>

  <div class="section">
    <h2 class="section-title">${t.langLabel}</h2>
    <p class="about-text">${t.langList}</p>
  </div>

</body>
</html>`;
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const langs = ['en', 'es', 'dk'];
  const themeKeys = ['light', 'dark'];

  for (const lang of langs) {
    for (const theme of themeKeys) {
      const html = buildHTML(lang, theme);
      const filename = `Eduardo_Inerarte_CV_${lang}_${theme}.pdf`;
      const page = await browser.newPage();
      
      const contentHtml = `
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Epilogue:wght@300;400;500;600;700;900&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
        ${html}
      `;
      
      await page.setContent(contentHtml, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(500); // give fonts time to render

      await page.pdf({
        path: join(OUT_DIR, filename),
        format: 'A4',
        printBackground: true,
        margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' },
      });

      await page.close();
      console.log(`✓ Generated ${filename}`);
    }
  }

  await browser.close();
}

main().catch(console.error);