import Link from "next/link";
import { notFound } from "next/navigation";

import Media from "@/components/Media/Media";
import PortableText from "@/components/PortableText/PortableText";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: PROJECT_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });
  return (data ?? []).filter((p): p is { slug: string } => Boolean(p.slug));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { data: project } = await sanityFetch({
    query: PROJECT_QUERY,
    params: { slug },
    stega: false,
  });
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const { data: project } = await sanityFetch({
    query: PROJECT_QUERY,
    params: { slug },
    stega: false,
  });
  if (!project) notFound();

  return (
    <main className="container-wide grid gap-12 py-16 md:grid-cols-[1fr_2fr] md:py-24">
      <aside className="md:sticky md:top-24 md:self-start">
        <h1 className="text-4xl font-medium text-[var(--color-secondary)]">
          {project.title}
        </h1>
        <p className="mt-2 text-[var(--color-muted)]">
          {project.category} · {project.year}
        </p>
        <ul className="mt-6 space-y-2">
          {(project.tags ?? []).map((tag: string) => (
            <li key={tag} className="text-sm text-[var(--color-secondary)]">
              {tag}
            </li>
          ))}
        </ul>
      </aside>
      <div>
        <Media
          src={project.image ?? ""}
          alt={project.title}
          aspectRatio={project.aspectRatio}
          className="mb-8 rounded-[var(--radius-xl)]"
        />
        <p className="text-lg leading-relaxed text-[var(--color-secondary)]">
          {project.description}
        </p>
        <div className="mt-8">
          <PortableText value={project.body} />
        </div>
        <Link href="/work" className="mt-8 inline-block text-sm underline">
          ← Back to work
        </Link>
      </div>
    </main>
  );
}
