"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
  const spinnerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmall = window.matchMedia("(max-width: 991px)").matches;

    if (prefersReducedMotion || isTouch || isSmall) return;

    const spinner = spinnerRef.current;
    if (!spinner) return;

    setVisible(true);

    const onMove = (e: MouseEvent) => {
      gsap.to(spinner, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={spinnerRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1000] -translate-x-1/2 -translate-y-1/2 mix-blend-color-dodge"
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" className="text-[var(--color-primary)]" />
        <circle cx="14" cy="14" r="2" fill="currentColor" className="text-[var(--color-secondary)]" />
      </svg>
    </div>
  );
}
