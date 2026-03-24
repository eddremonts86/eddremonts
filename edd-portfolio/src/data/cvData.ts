import { Github, Linkedin, Mail, Facebook } from 'lucide-react';

export const personalInfo = {
  name: "Eduardo Inerarte",
  title: "Senior Frontend Engineer with Full-Stack Roots",
  description: "Frontend-first engineer with full-stack roots and nearly two decades of experience since 2007. I build scalable web products that turn complex business rules into fast, intuitive interfaces using React, Vue, Node.js, and cloud platforms.",
  email: "eddremonts86@gmail.com",
  phone: "(+45) 61436173",
  location: "Copenhagen, Denmark",
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/eduardo-inerarte-643843bb", icon: Linkedin },
    { name: "GitHub", url: "https://github.com/eddremonts86", icon: Github },
    { name: "Facebook", url: "https://www.facebook.com/edd.remonts", icon: Facebook },
    { name: "Email", url: "mailto:eddremonts86@gmail.com", icon: Mail }
  ]
};

export const aboutMe = {
  intro: "I started my career in Cuba in 2007, working across institutional platforms, media products, and custom business software before moving to Denmark and specializing further in frontend engineering. That end-to-end background still shapes how I work today: I understand the full delivery chain, collaborate comfortably with product, design, and backend teams, and build interfaces that stay maintainable as products grow.",
  features: [
    {
      title: "Strategic Collaborative Engineering",
      description: "I thrive in cross-functional environments, building upon the ideas of my colleagues while bridging the gap between product managers, UI/UX designers, and backend infrastructure engineers to ensure aligned delivery.",
      icon: "users"
    },
    {
      title: "Continuous System Evolution",
      description: "The technological landscape is unforgiving. I embrace architectural refactoring, keeping my tech stack, testing coverage, and CI/CD pipelines at the bleeding edge.",
      icon: "rocket"
    },
    {
      title: "Fast, Robust, & Scalable",
      description: "Speed means nothing without stability. Driven by the philosophy that a unique business requires a unique platform, I love tackling difficult problems from new angles, ensuring applications are both technically robust and exceptionally intuitive.",
      icon: "zap"
    }
  ]
};

export const experiences = [
  {
    id: 12,
    period: "01/08/2024 - Present day",
    role: "Senior Frontend Developer",
    company: "Schilling Aps",
    location: "Copenhagen (Denmark)",
    description: "Leading frontend development for Schilling web applications and data products, working with React 18/19, TypeScript, Node.js, Tailwind and Shadcn UI to scale complex real-estate workflows."
  },
  {
    id: 11,
    period: "01/08/2022 - 30/07/2024",
    role: "Senior Frontend Developer",
    company: "Resights Aps",
    location: "Copenhagen (Denmark)",
    description: "Leading frontend development for Resights web applications and data products, working with Vue 2/3, Nuxt 2/3, TypeScript, Pinia/Vuex, Node.js, and Vuetify to scale complex real-estate workflows."
  },
  {
    id: 10,
    period: "01/08/2020 - 01/07/2022",
    role: "Senior Frontend Developer",
    company: "Novo Nordisk",
    location: "Copenhagen (Denmark)",
    description: "Built internal health and administration tools for Novo Nordisk with Vue, Vuetify, HTML, and CSS, focusing on reliable UI foundations for regulated medical teams."
  },
  {
    id: 9,
    period: "01/02/2020 - 30/09/2020",
    role: "Senior Frontend Developer",
    company: "Wunderman Nordic",
    location: "Copenhagen (Denmark)",
    description: "Delivered accessible campaign and landing experiences for Wunderman Nordic using Vue, SCSS, Bootstrap, and C# integrations, supporting high-traffic launches with stable frontend architecture."
  },
  {
    id: 8,
    period: "01/12/2017 - 30/01/2020",
    role: "Lead Frontend Developer",
    company: "GIG Media Copenhagen",
    location: "Copenhagen (Denmark)",
    description: "Led frontend development at GiG Media Copenhagen across affiliate and content platforms, modernizing legacy estates built on Laravel, Drupal, October CMS, MySQL, jQuery, Bootstrap, and PHP while coordinating outsourced maintenance work."
  },
  {
    id: 7,
    period: "01/06/2017 - 01/12/2017",
    role: "Frontend Developer",
    company: "Rebel Penguins Aps",
    location: "Copenhagen (Denmark)",
    description: "Worked on high-conversion affiliate products at Rebel Penguins, shipping frontend improvements, experiments, and UI iterations across Drupal, Laravel, October CMS, Bootstrap, and MySQL-backed platforms."
  },
  {
    id: 6,
    period: "01/11/2015 - 01/06/2017",
    role: "Full Stack Developer",
    company: "Rebel Penguins Aps",
    location: "Copenhagen (Denmark)",
    description: "Developed internal dashboards and external client sites end to end at Rebel Penguins using PHP, MySQL, jQuery, Bootstrap, Drupal, October CMS, and Laravel."
  },
  {
    id: 5,
    period: "01/05/2015 - 31/10/2015",
    role: "Volunteer",
    company: "Plan Denmark",
    location: "Copenhagen (Denmark)",
    description: "Supported Plan Denmark's sponsorship department by registering and validating documents, helping keep administrative workflows clean, structured, and reliable."
  },
  {
    id: 4,
    period: "01/12/2014 - 01/05/2015",
    role: "Full Stack Developer",
    company: "Viruta Studio Creativo",
    location: "Pinar del Rio (Cuba)",
    description: "Founded Viruta Studio Creativo and built custom products for local organizations and media outlets, including sites such as Radio Guama, using PHP, MySQL, PostgreSQL, Joomla, Drupal, Bootstrap, and Ext JS."
  },
  {
    id: 3,
    period: "01/10/2012 - 01/06/2014",
    role: "Full Stack Developer",
    company: "I & D Agency, GEOCUBA",
    location: "Pinar del Rio (Cuba)",
    description: "Built internal systems at GEOCUBA's R&D agency, combining PHP, MySQL, PostgreSQL, Ext JS, jQuery, Bootstrap, and geospatial tooling for operational and information-management needs."
  },
  {
    id: 2,
    period: "01/09/2010 - 01/10/2012",
    role: "Full Stack Developer",
    company: "Provincial Office ONEI",
    location: "Pinar del Rio (Cuba)",
    description: "Developed statistical and administrative solutions for the Provincial Office of ONEI using PHP, MySQL, HTML, CSS, Ext JS, Drupal, and Joomla."
  },
  {
    id: 1,
    period: "01/02/2007 - 01/06/2010",
    role: "Full Stack Developer - Junior Developers Manager",
    company: "Project 'National Library'. UCI",
    location: "Havana (Cuba)",
    description: "Started my professional career on the National Library project at UCI, building Drupal, PHP, and MySQL solutions while coordinating junior developers as the team matured."
  }
];

export const skills = [
  "React", "Vue.js", "Next.js", "Nuxt.js", "TypeScript", "JavaScript",
  "Tailwind CSS", "HTML5", "CSS3", "SCSS", "SASS", "Node.js",
  "PHP", "Laravel", "Symfony", "MySQL", "PostgreSQL", "Nginx", "Apache",
  "Git", "GitHub Actions", "Docker", "Linux", "bash", "macOS",
  "Cypress", "Vitest", "Jira", "Confluence", "Framer Motion", "Drupal", "WordPress"
];

export const projects = [
  {
    id: "zunzun",
    title: "Zunzun.io",
    image: "/projects/zunzun-cover.png",
    link: "https://www.zunzun.io/",
    category: "Full Stack"
  },
  {
    id: "hbo-notify",
    title: "HBO - Be Notified",
    image: "/projects/hbo-notify-cover.png",
    link: "https://demo-hbo-landing.netlify.app/versions/v1/getnotified/",
    category: "Frontend"
  },
  {
    id: "voirlematch",
    title: "Voirlematch.fr",
    image: "/projects/voirlematch-cover.png",
    link: "https://www.voirlematch.fr/",
    category: "Frontend"
  },
  {
    id: "hbo-signup",
    title: "HBO - Sign up",
    image: "/projects/hbo-signup-cover.png",
    link: "https://demo-hbo-landing.netlify.app/versions/v1/voucher/",
    category: "Frontend"
  },
  {
    id: "sportal",
    title: "Sportal.se",
    image: "/projects/sportal-cover.png",
    link: "https://www.sportal.se/",
    category: "Full Stack"
  },
  {
    id: "live-fodbold",
    title: "Live-fodbold.dk",
    image: "/projects/live-fodbold-cover.png",
    link: "https://www.live-fodbold.dk/",
    category: "Full Stack"
  },
  {
    id: "radio-guama",
    title: "Radio Guama",
    image: "/projects/radio-guama-cover.png",
    link: "http://www.rguama.icrt.cu/",
    category: "Frontend"
  },
  {
    id: "livefodboldstreams",
    title: "Livefodboldstreams.dk",
    image: "/projects/livefodboldstreams-cover.png",
    link: "https://www.livefodboldstreams.dk/",
    category: "Frontend"
  },
  {
    id: "counties",
    title: "Counties App",
    image: "/projects/counties-cover.png",
    link: "https://monosolutiosapps.netlify.app/",
    category: "Frontend"
  },
  {
    id: "watchonlinehorseracing",
    title: "Watch Online Horse Racing",
    image: "/projects/watchonlinehorseracing-cover.png",
    link: "https://www.watchonlinehorseracing.co.uk/",
    category: "Full Stack"
  },
  {
    id: "sefodbold",
    title: "Sefodbold.dk",
    image: "/projects/sefodbold-cover.png",
    link: "https://www.sefodbold.dk/",
    category: "Frontend"
  },
  {
    id: "windows-terminal",
    title: "Windows Terminal Config Generator",
    image: "/projects/windows-terminal-cover.jpg",
    link: "https://windowsterminalsetting.netlify.app/",
    category: "Full Stack"
  },
  {
    id: "sesport",
    title: "Sesport",
    image: "/projects/sesport-cover.png",
    link: "https://www.sesport.dk/fodbold",
    category: "Frontend"
  }
];

export const services = [
  {
    id: "design-frontend",
    title: "Vanguard Frontend Architecture",
    description: "I don't just build websites; I engineer interactive digital ecosystems. Utilizing React, Next.js, and Framer Motion, I deliver sub-second loading applications defined by 60fps animations and uncompromising UX precision.",
    icon: "layout"
  },
  {
    id: "backend-devops",
    title: "Cloud & Backend Resiliency",
    description: "An exceptional frontend requires an ironclad backend. I design robust serverless API layers, optimize relational/NoSQL database queries, and establish automated deployment pipelines ensuring 99.9% uptime scalability.",
    icon: "server"
  }
];
