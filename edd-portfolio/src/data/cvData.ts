import { Github, Linkedin, Mail, Facebook } from 'lucide-react';

export const personalInfo = {
  name: "Edd Remonts",
  title: "Senior Full-Stack/Frontend Engineer",
  description: "I Architect scalable web applications that bridge intricate business logic with immaculate user experiences. My focus relies on React 19, Node.js, and cloud ecosystems to deliver high-performance solutions engineered for massive scale.",
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
  intro: "Originally from Cuba, where I founded my first creative studio, I have built my career on a steadfast commitment to technological excellence and continuous growth. I specialize in transforming complex technical requirements into user-centric interfaces. By synergizing deep backend knowledge with frontend finesse, I engineer resilient platforms that accelerate business growth and ensure uncompromising performance.",
  features: [
    {
      title: "Strategic Collaborative Engineering",
      description: "I thrive in cross-functional environments, building upon the ideas of my colleagues while bridging the gap between product managers, UI/UX designers, and backend infrastructure engineers to ensure aligned delivery.",
      icon: "users"
    },
    {
      title: "Fast, Robust, & Scalable",
      description: "Speed means nothing without stability. Driven by the philosophy that a unique business requires a unique platform, I love tackling difficult problems from new angles, ensuring applications are both technically robust and exceptionally intuitive.",
      icon: "zap"
    },
    {
      title: "Continuous System Evolution",
      description: "The technological landscape is unforgiving. I embrace architectural refactoring, keeping my tech stack, testing coverage, and CI/CD pipelines at the bleeding edge.",
      icon: "rocket"
    }
  ]
};

export const experiences = [
  {
    id: 11,
    period: "01/08/2022 - Present day",
    role: "Senior Frontend Developer",
    company: "Resights Aps",
    location: "Copenhagen (Denmark)",
    description: "Architecting scaling strategies for high-volume enterprise real-estate data platforms. Spearheaded migration towards Vue 3 and Nuxt 3 composition APIs, optimizing global state throughput and reducing initial render times by over 40% using SSR hybrid techniques."
  },
  {
    id: 10,
    period: "01/08/2020 - 01/07/2022",
    role: "Senior Frontend Developer",
    company: "Novo Nordisk",
    location: "Copenhagen (Denmark)",
    description: "Led front-end implementation for critical health administration tools complying with strict medical guidelines. Delivered immaculate Vuetify-based component ecosystems that significantly improved the daily UX for internal medical researchers."
  },
  {
    id: 9,
    period: "01/02/2020 - 30/09/2020",
    role: "Senior Frontend Developer",
    company: "Wunderman Nordic",
    location: "Copenhagen (Denmark)",
    description: "Engineered ultra-responsive and highly accessible digital campaign interfaces for top-tier global clients. Integrated complex SCSS architectures and C# backend APIs ensuring zero downtime during peak marketing traffic."
  },
  {
    id: 8,
    period: "01/12/2017 - 30/01/2020",
    role: "Lead Frontend Developer",
    company: "GIG Media Copenhagen",
    location: "Copenhagen (Denmark)",
    description: "Served as technical lead orchestrating a team spanning multiple CMS platforms (Laravel, Drupal, October). Overhauled legacy monolithic systems into modular structures bridging high-performance MySQL databases with dynamic UI interactions."
  },
  {
    id: 7,
    period: "01/06/2017 - 01/12/2017",
    role: "Frontend Developer",
    company: "Rebel Penguins Aps",
    location: "Copenhagen (Denmark)",
    description: "Developed and refined high-conversion affiliate network portals. Implemented rigorous A/B testing interfaces accelerating customer acquisition velocity."
  },
  {
    id: 6,
    period: "01/11/2015 - 01/06/2017",
    role: "Full Stack Developer",
    company: "Rebel Penguins Aps",
    location: "Copenhagen (Denmark)",
    description: "End-to-end development of internal dashboard products and external sites utilizing a robust LAMP/LEMP stack alongside bespoke Drupal/October CMS solutions."
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
    image: "/projects/zunzun-cover.svg",
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
    image: "/projects/voirlematch-cover.svg",
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
    image: "/projects/livefodboldstreams-cover.svg",
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
    image: "/projects/watchonlinehorseracing-cover.svg",
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
    image: "/projects/windows-terminal-cover.png",
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
