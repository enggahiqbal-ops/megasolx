"use client";

import Link from "next/link";
import type { Project } from "@/sanity/lib/types";
import Media from "@/components/Media/Media";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block overflow-hidden rounded-[var(--radius-sm)] md:rounded-[var(--radius-lg)]"
      style={{ aspectRatio: project.aspectRatio.replace("/", " / ") }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[inherit] bg-black/5">
        <Media
          src={project.image ?? ""}
          alt={project.title}
          fill
          objectFit="cover"
          sizes={
            project.layout === "landscape"
              ? "(max-width: 768px) 100vw, 90vw"
              : "(max-width: 768px) 100vw, 45vw"
          }
          className="transition-transform duration-700 ease-[var(--ease-smooth)] group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
          priority={project.featured ?? false}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-4 text-white md:p-6">
          <h3 className="text-[clamp(1rem,2vw,1.6625rem)] font-medium leading-tight">
            {project.title}
          </h3>
          <p className="mt-1 text-sm opacity-80">{project.category}</p>
        </div>
      </div>
    </Link>
  );
}
