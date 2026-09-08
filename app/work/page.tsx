import Link from "next/link";
import ProjectGrid from "@/components/ProjectGrid/ProjectGrid";
import { projects, workCategories } from "@/data/projects";

export default function WorkPage() {
  return (
    <main className="container-wide py-16 md:py-24">
      <h1 className="mb-8 text-[clamp(2.5rem,8vw,6.25rem)] font-medium leading-none text-[var(--color-secondary)]">
        World-class digital products, idea to execution.
      </h1>

      <div className="mb-12 flex flex-wrap gap-3">
        {workCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={cat.href}
            className="rounded-full bg-white px-4 py-2.5 text-sm text-[var(--color-secondary)] transition hover:scale-105 hover:bg-[var(--color-primary)]"
          >
            {cat.label}
          </Link>
        ))}
      </div>

      <ProjectGrid projects={projects} />
    </main>
  );
}
