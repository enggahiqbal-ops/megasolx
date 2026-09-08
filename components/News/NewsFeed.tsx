"use client";

import Link from "next/link";
import { articles } from "@/data/articles";
import Media from "@/components/Media/Media";
import Reveal from "@/components/Reveal/Reveal";

export default function NewsFeed() {
  return (
    <section className="container-wide my-16 overflow-hidden md:my-24">
      <Reveal>
        <h2 className="mb-8 text-[clamp(3.75rem,3.968vw,4.9875rem)] font-medium text-[var(--color-secondary)]">
          What&apos;s New
        </h2>
      </Reveal>

      <div className="flex gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {articles.map((article, index) => (
          <Reveal key={article.slug} delay={index * 0.05} className="shrink-0">
            <Link
              href={`/thinking/${article.slug}`}
              className="group block w-[clamp(18.75rem,19.84vw,24.9375rem)]"
            >
              <Media
                src={article.image}
                alt=""
                aspectRatio="4/3"
                className="mb-4 rounded-[var(--radius-sm)] transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="mb-2 flex flex-wrap gap-2 text-xs text-[var(--color-muted)]">
                {article.category.map((cat) => (
                  <span key={cat}>{cat}</span>
                ))}
                <span>{article.readTime}</span>
              </div>
              <h3 className="text-lg font-medium text-[var(--color-secondary)] group-hover:text-[var(--color-primary-text)]">
                {article.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-[var(--color-muted)]">
                {article.excerpt}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
