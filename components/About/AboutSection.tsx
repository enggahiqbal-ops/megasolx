import Link from "next/link";
import { siteConfig } from "@/data/site";
import Media from "@/components/Media/Media";
import Stats from "@/components/Stats/Stats";
import Reveal from "@/components/Reveal/Reveal";

export default function AboutSection() {
  return (
    <section className="container-wide my-16 md:my-24">
      <div className="grid gap-8 md:grid-cols-[2fr_3fr] md:gap-12">
        <div className="md:col-span-2">
          <Reveal>
            <h2 className="max-w-[7.5em] text-[clamp(2.5rem,8vw,8.125rem)] font-medium leading-[0.75] text-[var(--color-secondary)]">
              {siteConfig.aboutHeading}
            </h2>
          </Reveal>
        </div>

        <Reveal className="space-y-6">
          {siteConfig.aboutCopy.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="text-[clamp(1rem,1.6vw,1.6625rem)] leading-relaxed text-[var(--color-secondary)]"
            >
              {paragraph}
            </p>
          ))}
          <Link
            href={siteConfig.aboutLink.href}
            className="inline-flex text-sm text-[var(--color-secondary)] underline-offset-4 hover:underline"
          >
            {siteConfig.aboutLink.label}
          </Link>
        </Reveal>

        <Reveal>
          <Media
            src="/images/about-teaser.svg"
            alt="Team at work"
            aspectRatio="4/5"
            className="rounded-[var(--radius-xl)] md:row-span-2"
          />
        </Reveal>

        <div className="md:col-start-1">
          <Stats items={siteConfig.stats} />
        </div>
      </div>
    </section>
  );
}
