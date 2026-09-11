"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type TextRevealProps = {
  text: string;
  className?: string;
  ariaLabel?: string;
};

export default function TextReveal({
  text,
  className = "",
  ariaLabel,
}: TextRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const words = el.querySelectorAll("[data-word]");
    if (prefersReducedMotion) {
      gsap.set(words, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      words,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.07,
        ease: "power3.out",
        delay: 0.15,
      },
    );
  }, [text]);

  const words = text.split(" ");

  return (
    <h1 ref={ref} className={className} aria-label={ariaLabel ?? text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          data-word
          className="mr-[0.25em] inline-block last:mr-0"
        >
          {word}
        </span>
      ))}
    </h1>
  );
}
