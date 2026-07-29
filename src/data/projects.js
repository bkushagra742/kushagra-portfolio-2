// `slug` maps each project to its media folder at:
//   src/assets/projects/<slug>/{video,bts,code}/
// Drop files into those folders (any filename) and they'll auto-appear on the
// site via useProjectMedia — no imports or renaming required. See README.md.
export const projects = [
  {
    slug: "kushagra-website-v2",
    name: "Kushagra Website V2",
    subtitle: "Flagship Portfolio",
    description:
      "A premium multi-page developer portfolio inspired by modern Apple-style design, featuring elegant typography, smooth animations, responsive layouts, an AI assistant, command palette, and premium UI/UX.",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "JavaScript"],
    category: "Web Development",
    status: "In Progress",
    github: "https://github.com/bkushagra742/Kushagra-Website-V2",
    demo: "https://bkushagra742.qzz.io",
  },
  {
    slug: "reconx-kushagra",
    name: "ReconX Kushagra",
    subtitle: "Android Application",
    description:
      "A modern Android application built with Kotlin and Jetpack Compose, focusing on clean architecture, responsive UI, performance, and scalable development practices.",
    tech: ["Kotlin", "Jetpack Compose", "Android Studio", "Material Design"],
    category: "Mobile Apps",
    status: "Completed",
    github: "https://github.com/bkushagra742/ReconX_kushagra",
    demo: null,
  },
  {
    slug: "art-of-coffee",
    name: "Art Of Coffee",
    subtitle: "Café Landing Page",
    description:
      "A premium café landing page designed for a local business with elegant typography, responsive layouts, smooth animations, and a modern user experience.",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    category: "Web Development",
    status: "Completed",
    github: "https://github.com/bkushagra742/Art-Of-Coffee",
    demo: "https://artofcoffee.qzz.io",
  },
  {
    slug: "portfolio-website",
    name: "Portfolio Website",
    subtitle: "Earlier Portfolio",
    description:
      "An earlier version of my personal portfolio used to explore responsive layouts, UI design, animations, and frontend development concepts.",
    tech: ["HTML", "CSS", "JavaScript", "React"],
    category: "Web Development",
    status: "Completed",
    github: "https://github.com/bkushagra742/Portfolio-website",
    demo: null,
  },
  {
    slug: "python-toolkit",
    name: "Python ToolKit",
    subtitle: "Utility Scripts",
    description:
      "A collection of Python utilities, automation scripts, productivity tools, and development helpers created for learning and everyday programming.",
    tech: ["Python"],
    category: "Open Source",
    status: "Active",
    github: "https://github.com/bkushagra742/Python_ToolKit",
    demo: null,
  },
  {
    slug: "developer-handbook",
    name: "Developer HandBook",
    subtitle: "Notes & Resources",
    description:
      "A curated repository of programming notes, development resources, coding best practices, roadmaps, and software engineering references.",
    tech: ["Markdown", "GitHub"],
    category: "Open Source",
    status: "Active",
    github: "https://github.com/bkushagra742/Developer_HandBook",
    demo: null,
  },
  {
    slug: "github-profile",
    name: "GitHub Profile Repository",
    subtitle: "Profile README",
    description:
      "Repository used to maintain and customize my GitHub profile README, showcasing my skills, projects, and developer journey.",
    tech: ["Markdown", "GitHub"],
    category: "Open Source",
    status: "Active",
    github: "https://github.com/bkushagra742/bkushagra742",
    demo: null,
  },
];

export const projectCategories = [
  "All",
  "Web Development",
  "Mobile Apps",
  "Open Source",
];
