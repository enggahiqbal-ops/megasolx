import Link from "next/link";
import ProjectGrid from "@/components/ProjectGrid/ProjectGrid";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";

export const metadata = { title: "Work" };

export default async function WorkPage() {
  const [{ data: projects }, { data: settings }] = await Promise.all([
    sanityFetch({ query: PROJECTS_QUERY, stega: false }),
    sanityFetch({ query: SETTINGS_QUERY, stega: false }),
  ]);

  const categories = settings?.workCategories ?? [];

  return (
    <main className="container-wide py-16 md:py-24">
      <h1 className="mb-8 text-[clamp(2.5rem,8vw,6.25rem)] font-medium leading-none text-[var(--color-secondary)]">
        World-class digital products, idea to execution.
      </h1>

      {categories.length > 0 && (
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="rounded-full bg-white px-4 py-2.5 text-sm text-[var(--color-secondary)] transition hover:scale-105 hover:bg-[var(--color-primary)]"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      )}

      <ProjectGrid projects={projects ?? []} />
    </main>
  );
}
