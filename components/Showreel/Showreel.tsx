"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Video from "@/components/Media/Video";
import Media from "@/components/Media/Media";

gsap.registerPlugin(ScrollTrigger);

type ShowreelProps = {
  poster?: string | null;
  videoSrc?: string | null;
  label?: string | null;
};

const FALLBACK_POSTER = "/images/showreel-poster.svg";

function PlayGlyph() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[var(--color-secondary)]">
      <svg width="13" height="15" viewBox="0 0 13 15" fill="currentColor" aria-hidden>
        <path d="M0 0.5v14l13-7z" />
      </svg>
    </span>
  );
}

export default function Showreel({ poster, videoSrc, label }: ShowreelProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const posterSrc = poster || FALLBACK_POSTER;
  const buttonLabel = label || "Watch showreel";

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
        style={{ "--progress": 0 } as React.CSSProperties}
      >
        <div className="md:sticky md:top-0 md:h-screen">
          <div className="container-wide py-8 md:py-0">
            <div
              ref={innerRef}
              className="showreel-inner group relative overflow-hidden rounded-[var(--radius-xl)]"
              style={{
                left: "calc((1 - var(--progress, 0)) * var(--gutter-desktop) - var(--gutter-desktop))",
                right: "calc((1 - var(--progress, 0)) * var(--gutter-desktop) - var(--gutter-desktop))",
              }}
            >
              {videoSrc ? (
                <>
                  <Video
                    src={videoSrc}
                    poster={posterSrc}
                    aspectRatio="1452/890"
                    className="w-full md:!aspect-auto md:h-screen"
                  />
                  {/* Small badge over the playing reel */}
                  <span className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2.5 rounded-full bg-black/35 py-2 pl-2 pr-4 text-white backdrop-blur-md md:bottom-6 md:left-6">
                    <PlayGlyph />
                    <span className="text-sm font-medium">{buttonLabel}</span>
                  </span>
                </>
              ) : (
                <>
                  <div className="relative aspect-[1452/890] w-full overflow-hidden md:aspect-auto md:h-screen">
                    <Media
                      src={posterSrc}
                      alt="Showreel"
                      fill
                      objectFit="cover"
                      priority
                      sizes="100vw"
                    />
                  </div>
                  {/* Full play affordance over the still poster */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/45 via-transparent to-black/10">
                    <span className="flex items-center gap-3 rounded-full bg-white/15 py-3 pl-3 pr-5 text-white backdrop-blur-md transition-transform duration-500 group-hover:scale-105">
                      <PlayGlyph />
                      <span className="text-sm font-medium">{buttonLabel}</span>
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
