import { notFound } from "next/navigation";
import { expertiseList, getExpertiseBySlug } from "@/data/expertise";
import Media from "@/components/Media/Media";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return expertiseList.map((e) => ({ slug: e.slug }));
}

export default async function ExpertisePage({ params }: Props) {
  const { slug } = await params;
  const item = getExpertiseBySlug(slug);
  if (!item) notFound();

  return (
    <main className="container-wide py-16 md:py-24">
      <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-medium text-[var(--color-secondary)]">{item.title}</h1>
      <p className="mt-4 max-w-2xl text-xl text-[var(--color-muted)]">{item.subtitle}</p>
      <Media src={item.image} alt="" aspectRatio="16/10" className="my-12 rounded-[var(--radius-xl)]" />
      <p className="max-w-3xl text-lg leading-relaxed text-[var(--color-secondary)]">{item.description}</p>
      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {item.features.map((f) => (
          <div key={f.title} className="rounded-[var(--radius-xl)] bg-white p-8">
            <h2 className="text-xl font-medium text-[var(--color-secondary)]">{f.title}</h2>
            <p className="mt-3 text-[var(--color-muted)]">{f.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
