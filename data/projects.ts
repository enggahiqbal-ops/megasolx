export type ProjectLayout = "landscape" | "portrait";

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  layout: ProjectLayout;
  aspectRatio: string;
  image: string;
  video?: string;
  poster?: string;
  description: string;
  tags: string[];
  featured?: boolean;
  textColor?: "white" | "black";
};

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    category: "Digital Experience",
    year: "2026",
    layout: "landscape",
    aspectRatio: "1452/890",
    image: "/images/projects/project-one.svg",
    video: "/videos/projects/project-one.mp4",
    description: "A flagship digital experience built for scale and craft.",
    tags: ["Websites", "UX Design", "React.js"],
    featured: true,
    textColor: "white",
  },
  {
    slug: "project-two",
    title: "Project Two",
    category: "Manufacturing",
    year: "2025",
    layout: "portrait",
    aspectRatio: "710/890",
    image: "/images/projects/project-two.svg",
    description: "Immersive showroom experience with tactile interactions.",
    tags: ["Websites", "UI Design", "eCommerce"],
    featured: true,
    textColor: "white",
  },
  {
    slug: "project-three",
    title: "Project Three",
    category: "Technology",
    year: "2025",
    layout: "portrait",
    aspectRatio: "710/890",
    image: "/images/projects/project-three.svg",
    description: "Enterprise platform with human-centered workflows.",
    tags: ["Software", "Design Systems"],
    featured: true,
    textColor: "black",
  },
  {
    slug: "project-four",
    title: "Project Four",
    category: "Data Visualisation",
    year: "2025",
    layout: "landscape",
    aspectRatio: "1452/890",
    image: "/images/projects/project-four.svg",
    description: "Interactive data story revealing complex global connections.",
    tags: ["Data Visualisation", "Headless", "Payload CMS"],
    featured: true,
    textColor: "white",
  },
];

export const workCategories = [
  { label: "Featured", href: "/work", slug: "featured" },
  { label: "Commercial", href: "/work/category/commercial", slug: "commercial" },
  {
    label: "Community & Purpose",
    href: "/work/category/community-purpose",
    slug: "community-purpose",
  },
  { label: "Education", href: "/work/category/education", slug: "education" },
  { label: "Innovation", href: "/work/category/innovation", slug: "innovation" },
  {
    label: "Not for Profit",
    href: "/work/category/not-for-profit",
    slug: "not-for-profit",
  },
  { label: "UI & UX", href: "/work/category/ui-ux", slug: "ui-ux" },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}
