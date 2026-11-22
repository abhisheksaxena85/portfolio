// Single source of truth for all portfolio content.
// Edit this file to update the site — components only render what's here.

export const profile = {
  name: "Abhishek Saxena",
  initials: "AS",
  role: "Software Engineer",
  focus: "Flutter · Mobile · Spring Boot",
  location: "Uttar Pradesh, India",
  email: "abhisheksaxenaswe@gmail.com",
  links: {
    github: "https://github.com/abhisheksaxena85",
    linkedin: "https://www.linkedin.com/in/abhisheksaxena85",
  },
  summary:
    "Software engineer with 2.5+ years of experience shipping cross-platform mobile apps with Flutter. I've taken enterprise products from first commit to the App Store and Google Play, working alongside a team of ex-Microsoft engineers.",
} as const;

export const stats = [
  { value: "2.5+", label: "Years shipping software" },
  { value: "2", label: "Enterprise apps in production" },
  { value: "iOS + Android", label: "Released on both stores" },
  { value: "Ex-Microsoft", label: "Engineers I build alongside" },
] as const;

export type Role = {
  company: string;
  title: string;
  period: string;
  type: string;
  featured?: boolean;
  badge?: string;
  points: string[];
  tags: string[];
};

export const experience: Role[] = [
  {
    company: "ElNovaLabs",
    title: "Software Engineer I",
    period: "Jul 2024 — Present",
    type: "Full-time",
    featured: true,
    badge: "Team of ex-Microsoft engineers",
    points: [
      "Lead cross-platform Flutter development for two enterprise apps: Twizzr, a quick-commerce merchant platform, and Softboard Lite, a school ERP for parents.",
      "Built real-time interfaces for live inventory and order workflows, plus multi-student academic tracking, exams, homework and fee management.",
      "Reduced API latency and redundant widget rebuilds through GetX / BLoC state management and data caching.",
      "Owned delivery end-to-end: development and testing through release on the App Store and Google Play.",
    ],
    tags: ["Flutter", "Dart", "Clean Architecture", "MVVM", "GetX", "BLoC"],
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
];

export type Project = {
  name: string;
  kind: string;
  description: string;
  highlights?: string[];
  tags: string[];
  status?: string;
  href?: string;
};

// Shipped, production work — rendered large.
export const featuredProjects: Project[] = [
  {
    name: "Twizzr",
    kind: "Merchant app · Hyperlocal quick-commerce",
    description:
      "The merchant side of a hyperlocal commerce platform connecting neighbourhood shops with nearby customers — built to run a store's day from a phone.",
    highlights: [
      "Real-time order tracking over WebSockets",
      "REST integration with Dio",
      "Push & local notifications for order updates",
    ],
    tags: ["Flutter", "GetX", "WebSockets", "Dio"],
    status: "Shipped · iOS & Android",
  },
  {
    name: "Softboard Lite",
    kind: "Education ERP · Parent app",
    description:
      "A parent-centric school companion: attendance, digital notices, homework, exams and fees for multiple students in one place.",
    highlights: [
      "MVVM architecture with GetX",
      "SQLite for local persistence",
      "Push notifications for notices and homework",
    ],
    tags: ["Flutter", "MVVM", "SQLite", "Firebase"],
    status: "Shipped · iOS & Android",
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

export const journey = [
  {
    when: "2022",
    title: "Started a BCA at MJPR University",
    note: "Bachelor of Computer Applications, 2022 — 2025.",
  },
  {
    when: "Jan 2024",
    title: "First full-time role — Flutter Developer at Altakart",
    note: "Learned to ship production UI and keep a codebase clean as it grows.",
  },
  {
    when: "Jul 2024",
    title: "Joined ElNovaLabs as Software Engineer I",
    note: "Building with ex-Microsoft engineers and leading two enterprise Flutter apps.",
    highlight: true,
  },
  {
    when: "2025",
    title: "Graduated BCA — while working full-time",
    note: "Completed the degree alongside a full-time engineering role.",
  },
  {
    when: "Now",
    title: "Going full stack",
    note: "Pairing Flutter with Spring Boot to own features from API to UI.",
  },
] as const;
