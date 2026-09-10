"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import TextReveal from "@/components/Reveal/TextReveal";

export default function Hero({
  tagline = "Extraordinary Digital Experiences",
}: {
  tagline?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const cta = el.querySelector("[data-hero-cta]");
    if (!cta) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      cta,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.9, ease: "power2.out" },
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="container flex min-h-[30vh] items-center md:min-h-[80vh] xl:-mt-[var(--header-height)]"
    >
      <div>
        <TextReveal
          text={tagline}
          ariaLabel={tagline}
          className="max-w-[29.925rem] pb-[0.12em] text-[clamp(3.125rem,6.51vw,4.156rem)] font-medium leading-[1.0] text-[var(--color-secondary)] md:max-w-[91.4375rem] md:pb-4 md:pt-8 md:text-[clamp(8.125rem,8.598vw,10.8063rem)] md:leading-[0.95]"
        />
        <a
          href="#showreel"
          data-hero-cta
          className="group mt-6 inline-flex items-center gap-3 rounded-full border border-[var(--color-secondary)]/30 py-2 pl-2 pr-5 text-sm text-[var(--color-secondary)] transition-colors hover:border-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-white md:mt-8"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)] text-[var(--color-secondary)] transition-transform duration-300 group-hover:scale-105">
            <svg width="11" height="13" viewBox="0 0 11 13" fill="currentColor" aria-hidden>
              <path d="M0 0.5v12l11-6z" />
            </svg>
          </span>
          <span className="font-medium">See Showreel</span>
        </a>
      </div>
    </section>
  );
}
