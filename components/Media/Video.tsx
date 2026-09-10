"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Media from "@/components/Media/Media";

type VideoProps = {
  src: string;
  mobileSrc?: string;
  poster?: string;
  className?: string;
  aspectRatio?: string;
  autoplay?: boolean;
  muted?: boolean;
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
  mobileSrc,
  poster = "/images/showreel-poster.svg",
  className = "",
  aspectRatio = "1452/890",
  autoplay = true,
  muted = true,
  loop = true,
  controls = false,
}: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [playbackFailed, setPlaybackFailed] = useState(false);
  const usePoster = prefersReducedMotion || playbackFailed;

  useEffect(() => {
    if (usePoster) return;
    const video = videoRef.current;
    if (!video) return;

    const isMobile = window.matchMedia("(max-width: 991px)").matches;
    video.src = isMobile && mobileSrc ? mobileSrc : src;
    if (autoplay) {
      video.play().catch(() => setPlaybackFailed(true));
    }
  }, [autoplay, mobileSrc, src, usePoster]);

  if (usePoster) {
    return (
      <Media
        src={poster}
        alt="Video poster"
        aspectRatio={aspectRatio}
        className={className}
        priority
      />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio }}>
      <video
        ref={videoRef}
        poster={poster}
        muted={muted}
        loop={loop}
        playsInline
        controls={controls}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
