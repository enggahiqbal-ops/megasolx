"use client";

import Link from "next/link";
import type { Project } from "@/sanity/lib/types";
import Media from "@/components/Media/Media";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const innerWidth =
    project.layout === "landscape" ? "69.4215%" : "38.0282%";

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block overflow-hidden rounded-[var(--radius-sm)] md:rounded-[var(--radius-lg)]"
      style={{ aspectRatio: project.aspectRatio.replace("/", " / ") }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[inherit] bg-black/5">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] transition-transform duration-500 group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
          style={{ width: innerWidth }}
        >
          <Media
            src={project.image ?? ""}
            alt={project.title}
            aspectRatio={project.aspectRatio}
            className="rounded-[20px] border border-transparent"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div
          className={`absolute inset-x-0 bottom-0 p-4 md:p-6 ${
            project.textColor === "white" ? "text-white" : "text-black"
          }`}
        >
          <h3 className="text-[clamp(1rem,2vw,1.6625rem)] font-medium leading-tight">
            {project.title}
          </h3>
          <p className="mt-1 text-sm opacity-80">{project.category}</p>
        </div>
      </div>
    </Link>
  );
}
