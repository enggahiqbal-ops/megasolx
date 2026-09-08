"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { siteConfig } from "@/data/site";
import TextReveal from "@/components/Reveal/TextReveal";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelector("[data-hero-cta]"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 1, ease: "power2.out" },
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="container flex min-h-[30vh] items-center md:min-h-[80vh] xl:-mt-[var(--header-height)]"
    >
      <div>
        <TextReveal
          text={siteConfig.tagline}
          ariaLabel={siteConfig.tagline}
          className="max-w-[29.925rem] text-[clamp(3.125rem,6.51vw,4.156rem)] font-medium leading-[0.92] text-[var(--color-secondary)] md:max-w-[91.4375rem] md:pb-8 md:pt-8 md:text-[clamp(8.125rem,8.598vw,10.8063rem)]"
        />
        <a
          href="#showreel"
          data-hero-cta
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-secondary)] px-5 py-3 text-sm text-white opacity-0 transition hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)]"
        >
          See Showreel
        </a>
      </div>
    </section>
  );
}
