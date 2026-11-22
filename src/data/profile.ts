// Single source of truth for all portfolio content.
// Edit this file to update the site — components only render what's here.
// See docs/RULES.md before changing anything.

export const profile = {
  name: "Abhishek Saxena",
  initials: "AS",
  role: "Software Engineer",
  // Profile photo — the LinkedIn headshot, cropped square (480px).
  // Replace the file to update it. Set to null to show initials instead.
  photo: "/people/abhishek.jpg" as string | null,
  focus: "Flutter · Mobile · Spring Boot",
  location: "Uttar Pradesh, India",
  email: "abhisheksaxenaswe@gmail.com",
  // International format, digits only — used for the WhatsApp button.
  whatsapp: "918528284249",
  links: {
    github: "https://github.com/abhisheksaxena85",
    linkedin: "https://www.linkedin.com/in/abhisheksaxena85",
  },
  summary:
    "Software engineer with 3 years of experience and 20+ projects delivered, working across mobile and backend: Flutter for cross-platform apps, native Android, and Spring Boot on the server. I've taken enterprise products from first commit to production, working alongside a team of ex-Microsoft engineers.",
} as const;

// Search-engine and link-preview copy (title, meta description, keywords).
// Keep `description` under ~160 characters so Google doesn't truncate it.
// The absolute site URL is resolved in src/lib/site.ts (set NEXT_PUBLIC_SITE_URL).
export const seo = {
  title: "Abhishek Saxena — Software Engineer | Flutter, Android & Spring Boot",
  description:
    "Software engineer with 3 years of experience building Flutter, native Android and Spring Boot apps. 20+ projects delivered, 15+ live in production.",
  // Short line rendered on the social preview image.
  tagline: "Mobile & backend: Flutter, native Android and Spring Boot",
  keywords: [
    "Abhishek Saxena",
    "Software Engineer",
    "Flutter Developer",
    "Mobile App Developer",
    "Android Developer",
    "Spring Boot Developer",
    "Dart",
    "Backend Developer",
    "ElNovaLabs",
    "Twizzr",
    "Softboard Lite",
    "Portfolio",
    "India",
  ],
  locale: "en_US",
} as const;

// Pre-filled messages for the floating contact buttons.
export const contactPrompts = {
  emailSubject: "Just visited your portfolio — let's connect",
  emailBody:
    "Hi Abhishek,\n\nI just came across your portfolio and would love to connect.\n\n",
  whatsappText: "Hi Abhishek, I just visited your portfolio and would like to connect.",
} as const;

export const stats = [
  { value: "3 years", label: "Professional experience" },
  { value: "20+", label: "Projects delivered" },
  { value: "15+", label: "Projects live on Play Store & in production" },
  { value: "Ex-Microsoft", label: "Engineers I build alongside" },
] as const;

export type Person = {
  name: string;
  role: string;
  linkedin: string;
  // Path under /public. null → initials avatar.
  photo: string | null;
};

export type Role = {
  company: string;
  title: string;
  period: string;
  type: string;
  featured?: boolean;
  badge?: string;
  logo?: { src: string; width: number; height: number };
  points: string[];
  tags?: string[];
  founders?: Person[];
};

export const experience: Role[] = [
  {
    company: "ElNovaLabs",
    title: "Software Engineer I",
    period: "Jul 2024 — Present",
    type: "Full-time",
    featured: true,
    badge: "Team of ex-Microsoft engineers",
    logo: { src: "/logos/elnovalabs.png", width: 1096, height: 193 },
    points: [
      "Lead cross-platform Flutter development for two enterprise apps: Twizzr, a hyperlocal marketplace, and Softboard Lite, an ERP for coaching institutes.",
      "Built real-time interfaces for live inventory and order workflows, plus multi-student academic tracking, exams, homework and fee management.",
      "Worked on the backend for Twizzr and Softboard Lite with Spring Boot and MySQL, alongside the mobile apps.",
      "Reduced API latency and redundant widget rebuilds through GetX / BLoC state management and data caching.",
      "Owned delivery end-to-end: development and testing through release on the App Store and Google Play.",
    ],
    tags: ["Flutter", "Dart", "Spring Boot", "MySQL", "Clean Architecture", "MVVM", "GetX", "BLoC"],
    founders: [
      {
        name: "Sachin Srivastava",
        role: "Founder",
        linkedin: "https://www.linkedin.com/in/sachinsrivastava24/",
        photo: "/people/sachin-srivastava.jpg",
      },
      {
        name: "Ashutosh Singh",
        role: "Co-founder",
        linkedin: "https://www.linkedin.com/in/ashutosh-singh-b5b771189/",
        photo: "/people/ashutosh-singh.jpg",
      },
    ],
  },
  {
    company: "Altakart",
    title: "Flutter Developer",
    period: "Jan 2024 — Jun 2024",
    type: "Full-time",
    points: [
      "Implemented app UI, navigation and core user flows with a consistent, responsive experience.",
      "Organised the codebase into reusable widgets and modular components for maintainability.",
      "Debugged and refined existing features to improve stability and user experience.",
    ],
    tags: ["Flutter", "GetX", "BLoC", "Firebase", "REST APIs"],
  },
  {
    company: "Freelance & Personal Projects",
    title: "Independent",
    period: "Ongoing",
    type: "Alongside full-time work",
    points: [
      "Beyond my full-time roles, I've also delivered freelance projects for clients and keep building personal projects — a steady way to explore new tools, architectures and full-stack ideas.",
    ],
  },
];

export type StoreLinks = {
  appStore?: string;
  playStore?: string;
  website?: string;
};

export type Project = {
  name: string;
  kind: string;
  description: string;
  highlights?: string[];
  tags: string[];
  status?: string;
  href?: string;
  icon?: string;
  screenshots?: string[];
  links?: StoreLinks;
  credit?: string;
};

// Shipped, production work — rendered large with icon, screenshots and store links.
// Copy, icons and screenshots: elnovalabs.com, twizzr.in and the App Store listings.
export const featuredProjects: Project[] = [
  {
    name: "Twizzr",
    kind: "Hyperlocal marketplace · iOS & Android",
    description:
      "A digital marketplace for trusted neighbourhood shops. Customers order products or book services from every nearby store in one app, and merchants run their store from their phone.",
    highlights: [
      "Real-time order tracking over WebSockets",
      "REST integration with Dio, state with GetX",
      "Push & local notifications for order updates",
    ],
    tags: ["Flutter", "GetX", "WebSockets", "Dio"],
    status: "Live on App Store & Google Play",
    icon: "/projects/twizzr/icon.jpg",
    screenshots: [
      "/projects/twizzr/screen-1.webp",
      "/projects/twizzr/screen-2.webp",
      "/projects/twizzr/screen-3.webp",
    ],
    links: {
      website: "https://twizzr.in",
      appStore: "https://apps.apple.com/in/app/twizzr/id6751235109",
      playStore: "https://play.google.com/store/apps/details?id=com.enl.twizzr",
    },
    credit: "A product by EL Nova Labs",
  },
  {
    name: "Softboard Lite",
    kind: "Education ERP · Members app",
    description:
      "An all-in-one ERP for coaching institutes covering attendance, schedules, tests, fees, homework and a digital notice board. The mobile app keeps students and parents connected on the go.",
    highlights: [
      "MVVM architecture with GetX",
      "SQLite for local persistence",
      "Push notifications for notices and homework",
    ],
    tags: ["Flutter", "MVVM", "SQLite", "Firebase"],
    status: "Live on App Store & Google Play",
    icon: "/projects/softboard-lite/icon.jpg",
    screenshots: [
      "/projects/softboard-lite/screen-1.webp",
      "/projects/softboard-lite/screen-2.webp",
      "/projects/softboard-lite/screen-3.webp",
    ],
    links: {
      website: "https://elnovalabs.com/products/softboard-lite",
      appStore: "https://apps.apple.com/in/app/members-lite/id6689505235",
      playStore: "https://play.google.com/store/apps/details?id=com.enl.members_lite",
    },
    credit: "A product by EL Nova Labs",
  },
];

// Personal / open-source work — rendered as a compact grid.
export const otherProjects: Project[] = [
  {
    name: "Notes App",
    kind: "Full stack",
    description:
      "Flutter client and Spring Boot API with authentication, create / edit / delete and pinned notes.",
    tags: ["Flutter", "Riverpod", "Spring Boot", "MySQL"],
    href: "https://github.com/abhisheksaxena85/notes_app",
  },
  {
    name: "Doc Scanner",
    kind: "On-device ML",
    description:
      "Scans images into documents, extracts text and entities, and reads barcodes and QR codes with Google ML Kit.",
    tags: ["Flutter", "ML Kit", "OCR"],
    href: "https://github.com/abhisheksaxena85/docscanner",
  },
  {
    name: "File Recovery",
    kind: "Android",
    description: "A file recovery app for Android devices.",
    tags: ["Dart", "Android"],
    href: "https://github.com/abhisheksaxena85/file_recovery",
  },
  {
    name: "NewsRound",
    kind: "Experiment",
    description:
      "News reader built to practise BLoC, MVVM and Provider against the NewsAPI REST service.",
    tags: ["Flutter", "BLoC", "Provider"],
    href: "https://github.com/abhisheksaxena85/NewsRound-Flutter",
  },
];

// NOTE: Pending replacement with the skills list from LinkedIn (see docs/CHANGELOG.md).
export const stack = [
  {
    group: "Mobile",
    core: ["Flutter", "Dart"],
    items: [
      "Native Android",
      "GetX",
      "BLoC",
      "Provider",
      "Riverpod",
      "GetIt",
      "MVVM",
      "Clean Architecture",
      "SQLite",
      "Firebase",
      "Unit & Widget Tests",
    ],
  },
  {
    group: "Backend",
    core: ["Spring Boot"],
    items: [
      "Spring Security",
      "REST APIs",
      "GraphQL",
      "MySQL",
      "MongoDB",
      "AWS",
      "System Design",
    ],
  },
  {
    group: "Workflow",
    core: ["Git"],
    items: [
      "GitHub",
      "Bitbucket",
      "Firebase Crashlytics",
      "Figma",
      "CI/CD",
      "Agile",
      "DSA",
    ],
  },
] as const;
