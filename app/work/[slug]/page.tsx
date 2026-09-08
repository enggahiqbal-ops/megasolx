import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import Media from "@/components/Media/Media";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main className="container-wide grid gap-12 py-16 md:grid-cols-[1fr_2fr] md:py-24">
      <aside className="md:sticky md:top-24 md:self-start">
        <h1 className="text-4xl font-medium text-[var(--color-secondary)]">{project.title}</h1>
        <p className="mt-2 text-[var(--color-muted)]">{project.category} · {project.year}</p>
        <ul className="mt-6 space-y-2">
          {project.tags.map((tag) => (
            <li key={tag} className="text-sm text-[var(--color-secondary)]">{tag}</li>
          ))}
        </ul>
      </aside>
      <div>
        <Media src={project.image} alt={project.title} aspectRatio={project.aspectRatio} className="mb-8 rounded-[var(--radius-xl)]" />
        <p className="text-lg leading-relaxed text-[var(--color-secondary)]">{project.description}</p>
        <Link href="/work" className="mt-8 inline-block text-sm underline">← Back to work</Link>
      </div>
    </main>
  );
}
