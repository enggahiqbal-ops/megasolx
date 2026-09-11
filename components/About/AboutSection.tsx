import Link from "next/link";
import Media from "@/components/Media/Media";
import Stats from "@/components/Stats/Stats";
import Reveal from "@/components/Reveal/Reveal";
import type { SiteSettings } from "@/sanity/lib/types";

export default function AboutSection({
  settings,
}: {
  settings: SiteSettings | null;
}) {
  const aboutCopy = settings?.aboutCopy ?? [];
  const aboutLink = {
    label: settings?.aboutLink?.label ?? "About us",
    href: settings?.aboutLink?.href ?? "/about",
  };
  const stats = settings?.stats ?? [];

  return (
    <section className="container-wide my-16 md:my-24">
      <div className="grid gap-8 md:grid-cols-[2fr_3fr] md:gap-x-12 md:gap-y-10">
        {/* Heading — full width */}
        <div className="md:col-span-2">
          <Reveal>
            <h2 className="max-w-[7.5em] text-[clamp(2.5rem,8vw,8.125rem)] font-medium leading-[0.75] text-[var(--color-secondary)]">
              {settings?.aboutHeading ?? "Great work for great people."}
            </h2>
          </Reveal>
        </div>

        {/* Left column — copy */}
        <Reveal className="space-y-6 md:col-start-1 md:row-start-2 md:self-start">
          {aboutCopy.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="text-[clamp(1rem,1.6vw,1.6625rem)] leading-relaxed text-[var(--color-secondary)]"
            >
              {paragraph}
            </p>
          ))}
          <Link
            href={aboutLink.href}
            className="inline-flex text-sm text-[var(--color-secondary)] underline-offset-4 hover:underline"
          >
            {aboutLink.label}
          </Link>
        </Reveal>

        {/* Right column — image spanning the copy + stats rows */}
        <Reveal className="md:col-start-2 md:row-start-2 md:row-span-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] md:aspect-auto md:h-full md:min-h-[28rem]">
            <Media
              src={settings?.aboutImage ?? "/images/about-teaser.svg"}
              alt="Team at work"
              fill
              objectFit="cover"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </div>
        </Reveal>

        {/* Left column — stats, directly under the copy */}
        <div className="md:col-start-1 md:row-start-3 md:self-start">
          <Stats items={stats} />
        </div>
      </div>
    </section>
  );
}
