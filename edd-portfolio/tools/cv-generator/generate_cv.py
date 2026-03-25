#!/usr/bin/env python3
# Run with: tools/cv-generator/.venv/bin/python tools/cv-generator/generate_cv.py
"""
CV PDF Generator — WeasyPrint
Generates 6 PDF variants: 3 languages × 2 themes.
WeasyPrint implements CSS Paged Media spec properly, so @page backgrounds,
margins, and page-break-inside work as expected.

Output: edd-portfolio/public/cv/
"""

import base64
import os
from pathlib import Path
from weasyprint import HTML
from weasyprint.text.fonts import FontConfiguration

SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent.parent          # edd-portfolio/
ASSETS_DIR = PROJECT_ROOT / "public" / "edd"     # photos
OUT_DIR = PROJECT_ROOT / "public" / "cv"          # pdf output

# ── SVG Icons ────────────────────────────────────────────────────
icons = {
    "email": '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    "phone": '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    "mapPin": '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    "linkedin": '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>',
    "github": '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>',
    "globe": '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>',
    "link": '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
}

# ── Personal Info ────────────────────────────────────────────────
personal_info = {
    "name": "Eduardo Inerarte",
    "email": "eddremonts86@gmail.com",
    "phone": "(+45) 61436173",
    "location": "Copenhagen, Denmark",
    "linkedin": "eduardo-inerarte",
    "linkedin_url": "https://www.linkedin.com/in/eduardo-inerarte-643843bb",
    "github": "eddremonts86",
    "github_url": "https://github.com/eddremonts86",
    "web": "eddremonts.com",
    "web_url": "https://eddremonts.com",
}

# ── Experience ───────────────────────────────────────────────────
experiences = [
    {"id": 12, "period": "08/2024 - Present", "company": "Schilling Aps", "location": "Copenhagen", "url": "https://schilling.dk"},
    {"id": 11, "period": "08/2022 - 07/2024", "company": "Resights Aps", "location": "Copenhagen", "url": "https://resights.dk"},
    {"id": 10, "period": "08/2020 - 07/2022", "company": "Novo Nordisk", "location": "Copenhagen", "url": "https://www.novonordisk.com"},
    {"id": 9,  "period": "02/2020 - 09/2020", "company": "Wunderman Nordic", "location": "Copenhagen", "url": "https://www.vml.com"},
    {"id": 8,  "period": "12/2017 - 01/2020", "company": "GiG Media Copenhagen", "location": "Copenhagen", "url": "https://www.gig.com"},
    {"id": 7,  "period": "06/2017 - 12/2017", "company": "Rebel Penguins Aps", "location": "Copenhagen", "url": ""},
    {"id": 6,  "period": "11/2015 - 06/2017", "company": "Rebel Penguins Aps", "location": "Copenhagen", "url": ""},
    {"id": 5,  "period": "05/2015 - 10/2015", "company": "Plan Denmark", "location": "Copenhagen", "url": "https://planbornefonden.dk"},
    {"id": 4,  "period": "12/2014 - 05/2015", "company": "Viruta Studio Creativo", "location": "Pinar del Rio, Cuba", "url": ""},
    {"id": 3,  "period": "10/2012 - 06/2014", "company": "I & D Agency, GEOCUBA", "location": "Pinar del Rio, Cuba", "url": "https://www.geocuba.cu"},
    {"id": 2,  "period": "09/2010 - 10/2012", "company": "Provincial Office ONEI", "location": "Pinar del Rio, Cuba", "url": ""},
    {"id": 1,  "period": "02/2007 - 06/2010", "company": "UCI", "location": "Havana, Cuba", "url": "https://www.uci.cu"},
]

skills_list = [
    "React", "Vue.js", "Next.js", "Nuxt.js", "TypeScript", "JavaScript",
    "Tailwind CSS", "HTML5", "CSS3", "SCSS", "Node.js",
    "PHP", "Laravel", "MySQL", "PostgreSQL",
    "Git", "GitHub Actions", "Docker", "Linux",
    "Cypress", "Vitest", "Framer Motion",
]

# ── Translations ─────────────────────────────────────────────────
translations = {
    "en": {
        "title": "Senior Frontend Engineer with Full-Stack Roots",
        "aboutTitle": "About Me",
        "summary": "Frontend-first engineer with full-stack roots and nearly two decades of experience since 2007. I build scalable web products that turn complex business rules into fast, intuitive interfaces.",
        "intro": "I understand the full delivery chain, collaborate comfortably with product, design, and backend teams, and build interfaces that stay maintainable as products grow. I embrace architectural refactoring, keeping my tech stack, testing coverage, and CI/CD pipelines at the bleeding edge.",
        "experienceTitle": "Professional Experience",
        "skillsTitle": "Technical Skills",
        "present": "Present",
        "langLabel": "Languages",
        "langItems": [
            {"lang": "Spanish", "level": "Native"},
            {"lang": "English", "level": "Fluent"},
            {"lang": "Danish", "level": "B1"},
        ],
        "items": {
            12: {"role": "Senior Frontend Developer", "desc": "Leading frontend development for Schilling web applications and data products, working with React 18/19, TypeScript, Node.js, Tailwind, and Shadcn UI to scale complex real-estate workflows."},
            11: {"role": "Senior Frontend Developer", "desc": "Led frontend development for Resights web applications and data products, working with Vue 2/3, Nuxt 2/3, TypeScript, Pinia/Vuex, Node.js, and Vuetify to scale complex real-estate workflows."},
            10: {"role": "Senior Frontend Developer", "desc": "Built internal health and administration tools for Novo Nordisk with Vue, Vuetify, HTML, and CSS, focusing on reliable UI foundations for regulated medical teams."},
            9:  {"role": "Senior Frontend Developer", "desc": "Delivered accessible campaign and landing experiences for Wunderman Nordic using Vue, SCSS, Bootstrap, and C# integrations."},
            8:  {"role": "Lead Frontend Developer", "desc": "Led frontend development at GiG Media Copenhagen across affiliate and content platforms, modernizing legacy systems built on Laravel, Drupal, October CMS, MySQL, jQuery, Bootstrap, and PHP."},
            7:  {"role": "Frontend Developer", "desc": "Worked on high-conversion affiliate products at Rebel Penguins, shipping frontend improvements, experiments, and UI iterations."},
            6:  {"role": "Full-Stack Developer", "desc": "Developed internal dashboards and external client sites end-to-end at Rebel Penguins using PHP, MySQL, jQuery, Bootstrap, Drupal, October CMS, and Laravel."},
            5:  {"role": "Volunteer", "desc": "Supported Plan Denmark\u2019s sponsorship department by registering and validating documents."},
            4:  {"role": "Full-Stack Developer", "desc": "Founded Viruta Studio Creativo and built custom products for local organizations and media outlets using PHP, MySQL, PostgreSQL, Joomla, and Drupal."},
            3:  {"role": "Full-Stack Developer", "desc": "Built internal systems at GEOCUBA\u2019s R&D agency, combining PHP, MySQL, PostgreSQL, Ext JS, jQuery, Bootstrap, and geospatial tooling."},
            2:  {"role": "Full-Stack Developer", "desc": "Developed statistical and administrative solutions for the Provincial Office of ONEI using PHP, MySQL, HTML, CSS, and Ext JS."},
            1:  {"role": "Full-Stack Developer", "desc": "Started my professional career on the National Library project at UCI, building Drupal, PHP, and MySQL solutions while coordinating junior developers."},
        },
    },
    "es": {
        "title": "Ingeniero Frontend Senior con base Full Stack",
        "aboutTitle": "Sobre M\u00ed",
        "summary": "Ingeniero orientado a frontend, con ra\u00edces full stack y casi dos d\u00e9cadas de experiencia desde 2007. Construyo productos web escalables que convierten reglas de negocio complejas en interfaces r\u00e1pidas, claras e intuitivas.",
        "intro": "Entiendo toda la cadena de entrega, colaboro c\u00f3modamente con producto, dise\u00f1o y backend. Adopto la refactorizaci\u00f3n arquitect\u00f3nica, manteniendo mi stack t\u00e9cnico, cobertura de pruebas y pipelines CI/CD a la vanguardia.",
        "experienceTitle": "Experiencia Profesional",
        "skillsTitle": "Habilidades T\u00e9cnicas",
        "present": "Actual",
        "langLabel": "Idiomas",
        "langItems": [
            {"lang": "Espa\u00f1ol", "level": "Nativo"},
            {"lang": "Ingl\u00e9s", "level": "Fluido"},
            {"lang": "Dan\u00e9s", "level": "B1"},
        ],
        "items": {
            12: {"role": "Desarrollador Frontend S\u00e9nior", "desc": "Liderando el desarrollo frontend de las aplicaciones web y productos de datos de Schilling, trabajando con React 18/19, TypeScript, Node.js, Tailwind y Shadcn UI para escalar flujos de trabajo complejos en el sector inmobiliario."},
            11: {"role": "Desarrollador Frontend S\u00e9nior", "desc": "Lider\u00e9 el desarrollo frontend de las aplicaciones y productos de datos de Resights, trabajando con Vue 2/3, Nuxt 2/3, TypeScript, Pinia/Vuex, Node.js y Vuetify para escalar flujos de trabajo complejos."},
            10: {"role": "Desarrollador Frontend S\u00e9nior", "desc": "Constru\u00ed herramientas internas de salud y administraci\u00f3n para Novo Nordisk con Vue, Vuetify, HTML y CSS, enfoc\u00e1ndome en una base de interfaz fiable para equipos m\u00e9dicos."},
            9:  {"role": "Desarrollador Frontend S\u00e9nior", "desc": "Entregu\u00e9 campa\u00f1as y p\u00e1ginas de destino accesibles para Wunderman Nordic usando Vue, SCSS, Bootstrap e integraciones con C#."},
            8:  {"role": "L\u00edder de Desarrollo Frontend", "desc": "Lider\u00e9 el desarrollo frontend en GiG Media Copenhagen a trav\u00e9s de productos de afiliaci\u00f3n y contenido, modernizando plataformas legacy construidas con Laravel, Drupal y PHP."},
            7:  {"role": "Desarrollador Frontend", "desc": "Trabaj\u00e9 en productos de afiliaci\u00f3n de alta conversi\u00f3n en Rebel Penguins, entregando mejoras de frontend, experimentos e iteraciones de UI."},
            6:  {"role": "Desarrollador Full-Stack", "desc": "Desarroll\u00e9 de extremo a extremo dashboards internos y sitios externos en Rebel Penguins usando PHP, MySQL, jQuery, Bootstrap y Laravel."},
            5:  {"role": "Voluntario", "desc": "Apoy\u00e9 al departamento de patrocinio de Plan Denmark registrando y validando documentos."},
            4:  {"role": "Desarrollador Full-Stack", "desc": "Fund\u00e9 Viruta Studio Creativo y desarroll\u00e9 productos a medida para organizaciones locales y medios usando PHP, MySQL, PostgreSQL y Drupal."},
            3:  {"role": "Desarrollador Full-Stack", "desc": "Constru\u00ed sistemas internos en la agencia de I+D de GEOCUBA combinando PHP, MySQL, PostgreSQL, Ext JS, jQuery y Bootstrap."},
            2:  {"role": "Desarrollador Full-Stack", "desc": "Desarroll\u00e9 soluciones estad\u00edsticas y administrativas para la Oficina Provincial de la ONEI utilizando PHP, MySQL, HTML, CSS y Ext JS."},
            1:  {"role": "Desarrollador Full-Stack", "desc": "Inici\u00e9 mi carrera profesional en el proyecto Biblioteca Nacional de la UCI, desarrollando soluciones con Drupal, PHP y MySQL."},
        },
    },
    "dk": {
        "title": "Senior Frontend Engineer med Full-Stack baggrund",
        "aboutTitle": "Om Mig",
        "summary": "Frontend-fokuseret engineer med full-stack baggrund og n\u00e6sten to \u00e5rtiers erfaring siden 2007. Jeg bygger skalerbare webprodukter, der oms\u00e6tter kompleks forretningslogik til hurtige og intuitive interfaces.",
        "intro": "Jeg forst\u00e5r hele leverancek\u00e6den, samarbejder naturligt med produkt, design og backend, og bygger interfaces der forbliver vedligeholdelige. Jeg holder min teknologistak, testd\u00e6kning og CI/CD-pipelines p\u00e5 forkant.",
        "experienceTitle": "Professionel Erfaring",
        "skillsTitle": "Tekniske Kompetencer",
        "present": "Nu",
        "langLabel": "Sprog",
        "langItems": [
            {"lang": "Spansk", "level": "Modersm\u00e5l"},
            {"lang": "Engelsk", "level": "Flydende"},
            {"lang": "Dansk", "level": "B1"},
        ],
        "items": {
            12: {"role": "Senior Frontend-udvikler", "desc": "Leder frontend-udviklingen af Schillings webapplikationer og dataprodukter med fokus p\u00e5 React 18/19, TypeScript, Node.js, Tailwind og Shadcn UI til at skalere komplekse ejendomsworkflows."},
            11: {"role": "Senior Frontend-udvikler", "desc": "Ledte frontend-udviklingen af Resights webapplikationer og dataprodukter med Vue 2/3, Nuxt 2/3, TypeScript, Pinia/Vuex, Node.js og Vuetify."},
            10: {"role": "Senior Frontend-udvikler", "desc": "Byggede interne sundheds- og administrationsv\u00e6rkt\u00f8jer for Novo Nordisk med Vue, Vuetify, HTML og CSS med fokus p\u00e5 stabile UI-fundamenter."},
            9:  {"role": "Senior Frontend-udvikler", "desc": "Leverede tilg\u00e6ngelige kampagner og landing pages for Wunderman Nordic med Vue, SCSS, Bootstrap og C#-integrationer."},
            8:  {"role": "Lead Frontend-udvikler", "desc": "Ledte frontend-udviklingen hos GiG Media Copenhagen og moderniserede legacy-platforme bygget i Laravel, Drupal og PHP."},
            7:  {"role": "Frontend-udvikler", "desc": "Arbejdede p\u00e5 high-conversion affiliate-produkter hos Rebel Penguins og leverede frontend-forbedringer og UI-iterationer."},
            6:  {"role": "Full-stack-udvikler", "desc": "Udviklede interne dashboards og eksterne websites end-to-end hos Rebel Penguins med PHP, MySQL, jQuery og Laravel."},
            5:  {"role": "Frivillig", "desc": "St\u00f8ttede Plan Denmarks sponsorafdeling med registrering og validering af dokumenter."},
            4:  {"role": "Full-stack-udvikler", "desc": "Grundlagde Viruta Studio Creativo og byggede skr\u00e6ddersyede produkter for lokale organisationer med PHP, MySQL, PostgreSQL og Drupal."},
            3:  {"role": "Full-stack-udvikler", "desc": "Byggede interne systemer i GEOCUBAs forsknings- og udviklingsafdeling ved at kombinere PHP, MySQL, PostgreSQL og Ext JS."},
            2:  {"role": "Full-stack-udvikler", "desc": "Udviklede statistiske og administrative l\u00f8sninger for det provinsielle ONEI-kontor med PHP, MySQL, HTML, CSS og Ext JS."},
            1:  {"role": "Full-stack-udvikler", "desc": "Startede min professionelle karriere p\u00e5 National Library-projektet ved UCI, hvor jeg byggede l\u00f8sninger i Drupal, PHP og MySQL."},
        },
    },
}

# ── Theme palettes ───────────────────────────────────────────────
themes = {
    "light": {
        "bg": "#FBFAF9", "fg": "#101010", "primary": "#D13426", "muted": "#6B6B6B",
        "border": "#E5E2DF", "skillBg": "#F2F0EE", "skillText": "#2E3339", "linkBg": "#fef2f2",
    },
    "dark": {
        "bg": "#0A0A0A", "fg": "#EFEFEF", "primary": "#FF4A3A", "muted": "#999999",
        "border": "#1F1F1F", "skillBg": "#1A1A1A", "skillText": "#C8B6A1", "linkBg": "#2a1212",
    },
}


def get_photo_data_url(theme: str) -> str:
    filename = "edd_dark.jpg" if theme == "dark" else "edd_light.jpg"
    photo_path = ASSETS_DIR / filename
    with open(photo_path, "rb") as f:
        encoded = base64.b64encode(f.read()).decode("ascii")
    return f"data:image/jpeg;base64,{encoded}"


def build_html(lang: str, theme: str) -> str:
    t = translations[lang]
    c = themes[theme]
    photo_url = get_photo_data_url(theme)

    experience_html = ""
    for exp in experiences:
        item = t["items"][exp["id"]]
        period = exp["period"].replace("Present", t["present"])
        company_name = exp["company"]
        if exp.get("url"):
            company_name = f'<a href="{exp["url"]}" class="company-link">{exp["company"]}</a>'
        experience_html += f"""
      <div class="exp-entry">
        <div class="exp-left">
          <span class="exp-period">{period}</span>
        </div>
        <div class="exp-right">
          <h3 class="exp-role">{item['role']}</h3>
          <p class="exp-company">{company_name}<span class="exp-loc"> \u00b7 {exp['location']}</span></p>
          <p class="exp-desc">{item['desc']}</p>
        </div>
      </div>"""

    skills_html = "".join(f'<span class="skill-tag">{s}</span>' for s in skills_list)

    # Languages as individual lines
    lang_items_html = "".join(
        f'<p class="lang-item"><span class="lang-name">{li["lang"]}</span> \u2014 {li["level"]}</p>'
        for li in t["langItems"]
    )

    # Icon stroke color: use primary for dark so they're visible
    icon_color = c["primary"] if theme == "dark" else "currentColor"

    # Replace currentColor in SVG icons with the resolved color
    themed_icons = {k: v.replace("currentColor", icon_color) for k, v in icons.items()}

    p = personal_info
    return f"""<!DOCTYPE html>"
<html lang="{lang}">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Epilogue:wght@300;400;500;600;700;900&family=JetBrains+Mono:wght@400&display=swap');

    @page {{
      size: A4;
      margin: 15mm;
      background-color: {c['bg']};
    }}

    * {{ margin: 0; padding: 0; box-sizing: border-box; }}

    html, body {{
      background-color: {c['bg']};
      color: {c['fg']};
      font-family: 'Epilogue', 'Helvetica Neue', Arial, sans-serif;
      font-size: 8.5pt;
      line-height: 1.5;
    }}

    /* Links */
    a {{
      color: {c['primary']};
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      font-weight: 500;
      border-bottom: 1px solid transparent;
    }}
    .contact-block a {{
      background-color: {c['linkBg']};
      padding: 1px 4px;
      border-radius: 3px;
      margin-bottom: 2px;
    }}

    /* Header Layout */
    .header {{
      display: flex;
      gap: 15pt;
      margin-bottom: 15pt;
      padding-bottom: 15pt;
      border-bottom: 1pt solid {c['border']};
      break-inside: avoid;
      page-break-inside: avoid;
      align-items: flex-start;
    }}

    .avatar {{
      width: 80pt;
      height: 80pt;
      border-radius: 50%;
      object-fit: cover;
      object-position: center 15%;
      border: 2pt solid {c['border']};
      filter: grayscale(100%) contrast(125%);
      flex-shrink: 0;
    }}

    .header-content {{ flex: 1; min-width: 0; }}

    .name {{
      font-family: 'Cinzel', serif;
      font-size: 26pt;
      line-height: 1.1;
      font-weight: 700;
      margin-bottom: 4pt;
    }}
    .name-dot {{ color: {c['primary']}; }}
    .title-line {{
      font-size: 10pt;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: {c['primary']};
      margin-bottom: 12pt;
    }}

    /* Contact Grid */
    .contact-grid {{
      display: flex;
      flex-wrap: wrap;
      gap: 6pt;
      font-size: 8pt;
      color: {c['muted']};
    }}
    .contact-item {{
      display: inline-flex;
      align-items: center;
      gap: 6pt;
      width: 48%;
    }}
    .contact-item svg {{ color: {c['primary']}; }}

    /* Company links in experience */
    .company-link {{
      color: {c['primary']};
      text-decoration: none;
      font-weight: 600;
      display: inline;
    }}

    /* Sections */
    .section {{
      margin-bottom: 20pt;
      break-inside: avoid;
      page-break-inside: avoid;
    }}
    .section-title {{
      font-family: 'Cinzel', serif;
      font-size: 11pt;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: {c['fg']};
      margin-bottom: 8pt;
      display: flex;
      align-items: center;
      gap: 6pt;
      break-after: avoid;
      page-break-after: avoid;
    }}
    .section-title::before {{
      content: '';
      display: block;
      width: 12pt;
      height: 2pt;
      background: {c['primary']};
      border-radius: 1px;
    }}

    /* About me */
    .about-text {{
      color: {c['muted']};
      margin-bottom: 6pt;
      text-align: justify;
    }}

    /* Experience */
    .exp-section {{
      margin-bottom: 20pt;
    }}
    .exp-entry {{
      display: flex;
      gap: 12pt;
      margin-bottom: 12pt;
      break-inside: avoid;
      page-break-inside: avoid;
    }}
    .exp-left {{
      width: 85pt;
      flex-shrink: 0;
      padding-top: 2pt;
    }}
    .exp-period {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 7.5pt;
      color: {c['muted']};
      background: {c['skillBg']};
      padding: 2px 5px;
      border-radius: 3px;
    }}
    .exp-right {{ flex: 1; }}
    .exp-role {{ font-size: 9.5pt; font-weight: 700; margin-bottom: 2pt; }}
    .exp-company {{ font-size: 8.5pt; font-weight: 600; color: {c['primary']}; margin-bottom: 3pt; }}
    .exp-loc {{ font-weight: 400; color: {c['muted']}; }}
    .exp-desc {{ color: {c['muted']}; font-size: 8.5pt; text-align: justify; }}

    /* Languages */
    .lang-item {{
      color: {c['muted']};
      font-size: 8.5pt;
      margin-bottom: 3pt;
    }}
    .lang-name {{
      font-weight: 600;
      color: {c['fg']};
    }}

    /* Skills Grid */
    .skills-grid {{
      display: flex;
      flex-wrap: wrap;
      gap: 5pt;
      break-inside: avoid;
      page-break-inside: avoid;
    }}
    .skill-tag {{
      padding: 3pt 8pt;
      font-size: 7pt;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      background: {c['skillBg']};
      color: {c['skillText']};
      border-radius: 3pt;
    }}
  </style>
</head>
<body>
  <header class="header">
    <img class="avatar" src="{photo_url}" alt="Eduardo Inerarte" />
    <div class="header-content">
      <h1 class="name">{p['name']}<span class="name-dot">.</span></h1>
      <p class="title-line">{t['title']}</p>

      <div class="contact-grid">
        <div class="contact-item">
          {themed_icons['email']} <a href="mailto:{p['email']}">{p['email']} {themed_icons['link']}</a>
        </div>
        <div class="contact-item">
          {themed_icons['phone']} <span>{p['phone']}</span>
        </div>
        <div class="contact-item">
          {themed_icons['globe']} <a href="{p['web_url']}">{p['web']} {themed_icons['link']}</a>
        </div>
        <div class="contact-item">
          {themed_icons['mapPin']} <span>{p['location']}</span>
        </div>
        <div class="contact-item">
          {themed_icons['linkedin']} <a href="{p['linkedin_url']}">{p['linkedin']} {themed_icons['link']}</a>
        </div>
        <div class="contact-item">
          {themed_icons['github']} <a href="{p['github_url']}">{p['github']} {themed_icons['link']}</a>
        </div>
      </div>
    </div>
  </header>

  <div class="section">
    <h2 class="section-title">{t['aboutTitle']}</h2>
    <p class="about-text">{t['summary']}</p>
    <p class="about-text">{t['intro']}</p>
  </div>

  <div class="exp-section">
    <h2 class="section-title">{t['experienceTitle']}</h2>
    {experience_html}
  </div>

  <div class="section">
    <h2 class="section-title">{t['skillsTitle']}</h2>
    <div class="skills-grid">{skills_html}</div>
  </div>

  <div class="section">
    <h2 class="section-title">{t['langLabel']}</h2>
    {lang_items_html}
  </div>

</body>
</html>"""


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    font_config = FontConfiguration()

    langs = ["en", "es", "dk"]
    theme_keys = ["light", "dark"]

    for lang in langs:
        for theme in theme_keys:
            html_str = build_html(lang, theme)
            filename = f"Eduardo_Inerarte_CV_{lang}_{theme}.pdf"
            out_path = OUT_DIR / filename

            doc = HTML(string=html_str).write_pdf(
                str(out_path),
                font_config=font_config,
            )

            print(f"\u2713 Generated {filename}")

    print(f"\nAll PDFs saved to {OUT_DIR}")


if __name__ == "__main__":
    main()
