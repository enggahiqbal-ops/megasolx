import Link from "next/link";
import { notFound } from "next/navigation";

import Media from "@/components/Media/Media";
import PortableText from "@/components/PortableText/PortableText";
import { sanityFetch } from "@/sanity/lib/live";
import { ARTICLE_QUERY, ARTICLE_SLUGS_QUERY } from "@/sanity/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: ARTICLE_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });
  return (data ?? []).filter((p): p is { slug: string } => Boolean(p.slug));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { data: article } = await sanityFetch({
    query: ARTICLE_QUERY,
    params: { slug },
    stega: false,
  });
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const { data: article } = await sanityFetch({
    query: ARTICLE_QUERY,
    params: { slug },
    stega: false,
  });
  if (!article) notFound();

  return (
    <main className="container-wide py-16 md:py-24">
      <article className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm text-[var(--color-muted)]">
          {(article.category ?? []).join(" · ")}
          {article.category?.length ? " · " : ""}
          {article.date}
          {article.readTime ? ` · ${article.readTime}` : ""}
        </p>
        <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-tight text-[var(--color-secondary)]">
          {article.title}
        </h1>
        {article.author?.name ? (
          <p className="mt-4 text-[var(--color-muted)]">By {article.author.name}</p>
        ) : null}

        <Media
          src={article.image ?? ""}
          alt=""
          aspectRatio="16/9"
          className="my-10 rounded-[var(--radius-sm)]"
        />

        <p className="mb-8 text-xl leading-relaxed text-[var(--color-secondary)]">
          {article.excerpt}
        </p>
        <PortableText value={article.body} />

        <Link href="/thinking" className="mt-12 inline-block text-sm underline">
          ← Back to Thinking
        </Link>
      </article>
    </main>
  );
}
