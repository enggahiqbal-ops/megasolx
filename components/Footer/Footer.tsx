"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import type { SiteSettings } from "@/sanity/lib/types";

const FALLBACK_WORDS = ["epic", "innovative", "extraordinary", "world-class"];

function GlobeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden
    >
      <circle cx="8" cy="8" r="6.4" />
      <path d="M1.6 8h12.8M8 1.6c1.8 1.7 2.8 4 2.8 6.4S9.8 12.7 8 14.4C6.2 12.7 5.2 10.4 5.2 8S6.2 3.3 8 1.6Z" />
    </svg>
  );
}

export default function Footer({ settings }: { settings: SiteSettings | null }) {
  const [wordIndex, setWordIndex] = useState(0);

  const words =
    settings?.footer?.tickerWords && settings.footer.tickerWords.length > 0
      ? settings.footer.tickerWords
      : FALLBACK_WORDS;
  const name = settings?.name ?? "MEGASOLX";
  const email = settings?.email ?? "hello@example.com";
  const locations = settings?.locations ?? [];
  const ctaLine1 = settings?.footer?.ctaLine1 ?? "Let's make";
  const ctaLine2 = settings?.footer?.ctaLine2 ?? "something";
  const copyright =
    settings?.footer?.copyright ?? `© ${new Date().getFullYear()}`;

  const social = settings?.social;
  const socialLinks = [
    social?.x && { label: "Twitter X", href: social.x },
    social?.instagram && { label: "Instagram", href: social.instagram },
    social?.linkedin && { label: "LinkedIn", href: social.linkedin },
  ].filter((s): s is { label: string; href: string } => Boolean(s));

  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % words.length),
      2200,
    );
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <footer className="relative overflow-hidden bg-white text-[var(--color-secondary)]">
      {/* decorative brand shapes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-[-6rem] hidden h-[26rem] w-[26rem] opacity-70 md:block"
      >
        <span className="absolute inset-0 rounded-full border-[3rem] border-[var(--color-primary)]/25" />
        <span className="absolute inset-10 rounded-full border-[3rem] border-[#7360e4]/20" />
        <span className="absolute inset-24 rounded-full border-[2.5rem] border-[#59c3f0]/20" />
      </div>

      <div className="container-wide relative py-16 md:py-20 lg:py-24">
        {/* CTA */}
        <div className="text-[clamp(2.25rem,8vw,4.375rem)] font-medium leading-[1.04] md:text-[clamp(3.5rem,4.63vw,5.819rem)]">
          <span className="flex items-center gap-3 whitespace-nowrap md:gap-5">
            {ctaLine1}
            <span className="text-[var(--color-primary)]">→</span>
          </span>
          <span className="mt-1 block">
            {ctaLine2}{" "}
            <span className="inline-block min-w-[6ch] text-[var(--color-primary)] transition-all duration-300">
              {words[wordIndex]}
            </span>
          </span>
        </div>

        {/* Contact + locations */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2 md:mt-20 md:grid-cols-4 lg:gap-14">
          <div>
            <p className="flex items-center gap-2 font-medium">
              <GlobeIcon />
              We work globally
            </p>
            <Link
              href="/contact"
              className="group mt-4 inline-flex items-center gap-1.5 text-sm transition-colors hover:text-[var(--color-primary-text)]"
            >
              Submit a brief
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <a
              href={`mailto:${email}`}
              className="mt-2 block text-sm transition-colors hover:text-[var(--color-primary-text)]"
            >
              {email}
            </a>
          </div>

          {locations.map((loc) => (
            <div key={`${loc.country}-${loc.city}`}>
              <p className="font-medium">{loc.country}</p>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{loc.city}</p>
              {loc.email ? (
                <a
                  href={`mailto:${loc.email}`}
                  className="mt-1 block text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary-text)]"
                >
                  {loc.email}
                </a>
              ) : null}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-black/10 pt-6 text-sm md:mt-20 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[var(--color-muted)]">
            <span className="font-medium tracking-wide text-[var(--color-secondary)]">
              {name}
            </span>
            <span>{copyright}</span>
            <Link
              href="/privacy"
              className="transition-colors hover:text-[var(--color-primary-text)]"
            >
              Privacy
            </Link>
          </div>

          {socialLinks.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 text-[var(--color-muted)]">
              {socialLinks.map((s, i) => (
                <Fragment key={s.label}>
                  {i > 0 && (
                    <span className="text-[var(--color-primary)]" aria-hidden>
                      ✳
                    </span>
                  )}
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-[var(--color-secondary)]"
                  >
                    {s.label}
                  </a>
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
