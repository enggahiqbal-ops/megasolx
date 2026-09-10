"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { SiteSettings } from "@/sanity/lib/types";

const FALLBACK_WORDS = ["epic", "innovative", "extraordinary", "world-class"];

export default function Footer({ settings }: { settings: SiteSettings | null }) {
  const [wordIndex, setWordIndex] = useState(0);
  const words =
    settings?.footer?.tickerWords && settings.footer.tickerWords.length > 0
      ? settings.footer.tickerWords
      : FALLBACK_WORDS;
  const email = settings?.email ?? "hello@example.com";
  const locations = settings?.locations ?? [];
  const nav = settings?.nav ?? [];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <footer className="relative bg-white text-[var(--color-secondary)]">
      <div className="container-wide grid gap-12 py-16 md:grid-areas-[heading_face,columns_face,bottom_bottom] md:grid-cols-[1fr_auto] md:gap-0 md:py-20 lg:py-24">
        <div className="md:mb-16">
          <button
            type="button"
            className="group cursor-pointer border-none bg-transparent p-0 text-left"
          >
            <span className="block text-[clamp(2.5rem,8vw,4.375rem)] font-medium leading-none transition-colors group-hover:text-[var(--color-primary)] md:text-[clamp(4.375rem,4.63vw,5.819rem)]">
              {settings?.footer?.ctaLine1 ?? "Let's make"}
            </span>
            <span className="mt-1 block text-[clamp(2.5rem,8vw,4.375rem)] font-medium leading-none md:text-[clamp(4.375rem,4.63vw,5.819rem)]">
              {settings?.footer?.ctaLine2 ?? "something"}{" "}
              <span className="inline-block min-w-[6ch] text-[var(--color-primary)] transition-all duration-300">
                {words[wordIndex]}
              </span>
            </span>
          </button>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mb-4 text-sm text-[var(--color-muted)]">Contact</p>
            <a
              href={`mailto:${email}`}
              className="group inline-flex items-center gap-2 text-lg text-[var(--color-secondary)] transition hover:text-[var(--color-primary-text)]"
            >
              {email}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>

          {locations.map((loc) => (
            <div key={loc.city}>
              <p className="mb-1 font-medium">{loc.city}</p>
              <p className="text-sm text-[var(--color-muted)]">{loc.country}</p>
              <a
                href={`mailto:${loc.email}`}
                className="mt-2 block text-sm transition hover:text-[var(--color-primary-text)]"
              >
                {loc.email}
              </a>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-6 border-t border-black/10 pt-8 md:col-span-2">
          {nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm transition hover:text-[var(--color-primary-text)]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <p className="text-sm text-[var(--color-muted)] md:col-span-2">
          {settings?.footer?.copyright ??
            `© ${new Date().getFullYear()} Megasolx. All rights reserved.`}
        </p>
      </div>
    </footer>
  );
}
