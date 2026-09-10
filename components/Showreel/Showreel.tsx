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
              className="showreel-inner group relative overflow-hidden rounded-[var(--radius-xl)]"
              style={{
                left: "calc((1 - var(--progress, 0)) * var(--gutter-desktop) - var(--gutter-desktop))",
                right: "calc((1 - var(--progress, 0)) * var(--gutter-desktop) - var(--gutter-desktop))",
              }}
            >
              {videoSrc ? (
                <Video
                  src={videoSrc}
                  poster={posterSrc}
                  aspectRatio="1452/890"
                  className="w-full md:!aspect-auto md:h-screen"
                />
              ) : (
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
              )}

              {/* Play affordance */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/40 via-transparent to-black/10">
                <span className="flex items-center gap-3 rounded-full bg-white/15 px-5 py-3 text-white backdrop-blur-md transition-transform duration-500 group-hover:scale-105">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[var(--color-secondary)]">
                    <svg
                      width="14"
                      height="16"
                      viewBox="0 0 14 16"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M0 0.5v15l14-7.5z" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium">{buttonLabel}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
