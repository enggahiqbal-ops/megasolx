"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Video from "@/components/Media/Video";

gsap.registerPlugin(ScrollTrigger);

export default function Showreel() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isDesktop = window.matchMedia("(min-width: 992px)").matches;

    if (prefersReducedMotion || !isDesktop) return;

    const ctx = gsap.context(() => {
      gsap.to(inner, {
        "--progress": 1,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <section id="showreel" className="relative bg-[var(--color-purple-bg)]">
      <div
        ref={wrapperRef}
        className="relative md:h-[200vh]"
        style={
          {
            "--progress": 0,
          } as React.CSSProperties
        }
      >
        <div className="md:sticky md:top-0 md:h-screen">
          <div className="container-wide py-8 md:py-0">
            <div
              ref={innerRef}
              className="showreel-inner relative overflow-hidden rounded-[var(--radius-xl)]"
              style={{
                left: "calc((1 - var(--progress, 0)) * var(--gutter-desktop) - var(--gutter-desktop))",
                right: "calc((1 - var(--progress, 0)) * var(--gutter-desktop) - var(--gutter-desktop))",
              }}
            >
              <Video
                src="/videos/showreel.mp4"
                mobileSrc="/videos/showreel-mobile.mp4"
                poster="/images/showreel-poster.svg"
                aspectRatio="1452/890"
                className="w-full md:!aspect-auto md:h-screen"
              />
              <button
                type="button"
                className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 rounded-full bg-white/50 px-4 py-2 text-sm backdrop-blur-md md:block"
              >
                See Showreel
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
