import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export const personalInfo = {
  name: "Edd Remonts",
  title: "Senior Full Stack Engineeer & Tech Lead",
  description: "I Architect scalable web applications that bridge intricate business logic with immaculate user experiences. My focus relies on React 19, Node.js, and cloud ecosystems to deliver high-performance solutions engineered for massive scale.",
  email: "eddremonts@example.com", // Add real email if available
  phone: "(+45) 61436173",
  location: "Copenhagen, Denmark",
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/eddremonts", icon: Linkedin },
    { name: "GitHub", url: "https://github.com/eddremonts", icon: Github },
    { name: "Twitter", url: "https://twitter.com/eddremonts", icon: Twitter },
    { name: "Email", url: "mailto:contact@eddremonts.dk", icon: Mail }
  ]
};

export const aboutMe = {
  intro: "I specialize in transforming complex technical requirements into streamlined, user-centric interfaces. By synergizing deep backend knowledge with frontend finesse, I engineer resilient platforms that accelerate business growth and ensure uncompromising performance scoring 90+ on Lighthouse.",
  features: [
    {
      title: "Strategic Collaborative Engineering",
      description: "I thrive in cross-functional environments, bridging the gap between product managers, UI/UX designers, and backend infrastructure engineers to ensure aligned delivery.",
      icon: "users"
    },
    {
      title: "Continuous System Evolution",
      description: "The technological landscape is unforgiving. I embrace architectural refactoring, keeping my tech stack, testing coverage, and CI/CD pipelines at the bleeding edge.",
      icon: "rocket"
    },
    {
      title: "Resilient Scalability",
      description: "Speed means nothing without stability. I build robust microservices leveraging modern Next.js/React meta-frameworks prioritizing zero-downtime overhauls.",
      icon: "shield"
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
  "React", "Vuejs", "NextJs", "NuxtJs", "TypeScript", "JavaScript",
  "Tailwind CSS", "HTML5", "CSS3", "SCSS", "SASS", "Node js",
  "PHP", "Laravel", "Symfony", "MySql", "PostgreSql",
  "Git", "Docker", "Linux", "MacOS", "Framer Motion"
];

export const projects = [
  {
    id: "zunzun",
    title: "Zunzun.io",
    image: "https://eddremonts.dk/themes/thebakerdev-zenii/assets/dist/images/zunzun2.io.png",
    link: "https://www.zunzun.io/",
    category: "Full Stack"
  },
  {
    id: "hbo-notify",
    title: "HBO - Be Notified",
    image: "https://eddremonts.dk/themes/thebakerdev-zenii/assets/dist/images/hbo.png",
    link: "https://demo-hbo-landing.netlify.app/versions/v1/getnotified/",
    category: "Frontend"
  },
  {
    id: "voirlematch",
    title: "Voirlematch.fr",
    image: "https://eddremonts.dk/themes/thebakerdev-zenii/assets/dist/images/VMhead.png",
    link: "https://www.voirlematch.fr/",
    category: "Frontend"
  },
  {
    id: "hbo-signup",
    title: "HBO - Sign up",
    image: "https://eddremonts.dk/themes/thebakerdev-zenii/assets/dist/images/hbo2.png",
    link: "https://demo-hbo-landing.netlify.app/versions/v1/voucher/",
    category: "Frontend"
  },
  {
    id: "sportal",
    title: "Sportal.se",
    image: "https://eddremonts.dk/themes/thebakerdev-zenii/assets/dist/images/06.png",
    link: "https://www.sportal.se/",
    category: "Full Stack"
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
