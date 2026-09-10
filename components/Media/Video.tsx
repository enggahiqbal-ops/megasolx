"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Media from "@/components/Media/Media";

type VideoProps = {
  src: string;
  poster?: string;
  className?: string;
  aspectRatio?: string;
  autoplay?: boolean;
  loop?: boolean;
  controls?: boolean;
};

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(REDUCED_MOTION);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

export default function Video({
  src,
  poster = "/images/showreel-poster.svg",
  className = "",
  aspectRatio = "1452/890",
  autoplay = true,
  loop = true,
  controls = false,
}: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // React can be flaky about the muted *property* (needed for autoplay).
    video.muted = true;
    if (autoplay) {
      void video.play().catch(() => {
        /* onError handles genuine load failures; autoplay rejection is fine */
      });
    }
  }, [src, autoplay]);

  if (prefersReducedMotion || failed) {
    return (
      <Media
        src={poster}
        alt="Showreel"
        aspectRatio={aspectRatio}
        className={className}
        priority
      />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio }}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay={autoplay}
        loop={loop}
        muted
        playsInline
        controls={controls}
        preload="auto"
        onError={() => setFailed(true)}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
