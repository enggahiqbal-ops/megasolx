"use client";

import { useEffect, useRef, useState } from "react";
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

function getInitialPosterMode() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
  const [usePoster, setUsePoster] = useState(getInitialPosterMode);

  useEffect(() => {
    if (usePoster) return;

    const isMobile = window.matchMedia("(max-width: 991px)").matches;
    const video = videoRef.current;
    if (!video) return;

    const source = isMobile && mobileSrc ? mobileSrc : src;
    video.src = source;
    if (autoplay) {
      video.play().catch(() => setUsePoster(true));
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
