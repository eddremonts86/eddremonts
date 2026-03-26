#!/usr/bin/env python3
# Run with: tools/cv-generator/.venv/bin/python tools/cv-generator/generate_cv.py
"""
CV PDF Generator — WeasyPrint
Generates 6 PDF variants: 3 languages × 2 themes.
WeasyPrint implements CSS Paged Media spec properly, so @page backgrounds,
margins, and page-break-inside work as expected.

All content is read from the project's single sources of truth:
  - src/data/cv-source.json          → personal info, experience structure, skills
  - src/locales/{lang}/translation.json → translated text (roles, descriptions, CV section titles)

Output: edd-portfolio/public/cv/
"""

import base64
import json
from pathlib import Path
from weasyprint import HTML
from weasyprint.text.fonts import FontConfiguration

SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent.parent          # edd-portfolio/
ASSETS_DIR = PROJECT_ROOT / "public" / "edd"     # photos
OUT_DIR = PROJECT_ROOT / "public" / "cv"          # pdf output

# ── Load project data ────────────────────────────────────────────
def load_json(path: Path) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

cv_source = load_json(PROJECT_ROOT / "src" / "data" / "cv-source.json")
personal_info = cv_source["personalInfo"]
experiences_raw = cv_source["experiences"]
skills_list = cv_source["skills"]

locales: dict[str, dict] = {}
for lang_code in ("en", "es", "dk"):
    locales[lang_code] = load_json(
        PROJECT_ROOT / "src" / "locales" / lang_code / "translation.json"
    )


def get_translations(lang: str) -> dict:
    """Build the translations dict expected by build_html from locale files."""
    locale = locales[lang]
    cv = locale["cv"]
    exp_items = locale["experience"]["items"]

    return {
        "title": locale["personalInfo"]["title"],
        "aboutTitle": cv["aboutTitle"],
        "summary": cv["summary"],
        "intro": cv["intro"],
        "experienceTitle": cv["experienceTitle"],
        "skillsTitle": cv["skillsTitle"],
        "present": locale["experience"]["present"],
        "langLabel": cv["langLabel"],
        "langItems": cv["langItems"],
        "items": {
            int(k): {"role": v["role"], "desc": v["description"]}
            for k, v in exp_items.items()
        },
    }

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
    t = get_translations(lang)
    c = themes[theme]
    photo_url = get_photo_data_url(theme)

    experience_html = ""
    for exp in experiences_raw:
        item = t["items"][exp["id"]]
        period = exp["period"].replace("Present day", t["present"]).replace("Present", t["present"])
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
          {themed_icons['globe']} <a href="{p['webUrl']}">{p['web']} {themed_icons['link']}</a>
        </div>
        <div class="contact-item">
          {themed_icons['mapPin']} <span>{p['location']}</span>
        </div>
        <div class="contact-item">
          {themed_icons['linkedin']} <a href="{p['linkedinUrl']}">{p['linkedin']} {themed_icons['link']}</a>
        </div>
        <div class="contact-item">
          {themed_icons['github']} <a href="{p['githubUrl']}">{p['github']} {themed_icons['link']}</a>
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
