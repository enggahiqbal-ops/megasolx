import type { Project } from "@/sanity/lib/types";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import Reveal from "@/components/Reveal/Reveal";

type ProjectGridProps = {
  projects: Project[];
  className?: string;
};

export default function ProjectGrid({ projects, className = "" }: ProjectGridProps) {
  const rows: Project[][] = [];
  let i = 0;

  while (i < projects.length) {
    const current = projects[i];
    if (current.layout === "landscape") {
      rows.push([current]);
      i += 1;
    } else {
      const pair = projects.slice(i, i + 2);
      rows.push(pair);
      i += pair.length;
    }
  }

  return (
    <div className={`space-y-8 md:space-y-10 ${className}`}>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`grid gap-8 md:gap-10 ${
            row.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {row.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.1}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      ))}
    </div>
  );
}
