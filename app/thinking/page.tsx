import Link from "next/link";
import { articles } from "@/data/articles";
import Media from "@/components/Media/Media";

export default function ThinkingPage() {
  return (
    <main className="container-wide py-16 md:py-24">
      <header className="mb-12 text-center md:mb-20">
        <h1 className="text-[clamp(2.5rem,15vw,8rem)] font-medium leading-none text-[var(--color-secondary)]">
          Thinking
        </h1>
        <p className="mt-4 text-lg text-[var(--color-muted)]">
          Musings on design, experience and technology.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {articles.map((article) => (
          <Link key={article.slug} href={`/thinking/${article.slug}`} className="group block">
            <Media src={article.image} alt="" aspectRatio="16/10" className="mb-4 rounded-[var(--radius-sm)]" />
            <p className="text-xs text-[var(--color-muted)]">{article.date} · {article.readTime}</p>
            <h2 className="mt-2 text-2xl font-medium text-[var(--color-secondary)] group-hover:text-[var(--color-primary-text)]">
              {article.title}
            </h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
