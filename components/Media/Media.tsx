"use client";

import Image from "next/image";
import { useState } from "react";

type MediaProps = {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
  priority?: boolean;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  fill?: boolean;
  sizes?: string;
};

const FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'%3E%3Crect fill='%23e8e8dc' width='800' height='500'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%230f1d07' opacity='0.3' font-family='system-ui' font-size='24'%3EMedia%3C/text%3E%3C/svg%3E";

export default function Media({
  src,
  alt,
  aspectRatio = "16/10",
  className = "",
  priority = false,
  objectFit = "cover",
  objectPosition = "center",
  fill = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: MediaProps) {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK);

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={className}
        style={{ objectFit, objectPosition }}
        onError={() => setImgSrc(FALLBACK)}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio }}>
      <Image
        src={imgSrc}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="h-full w-full"
        style={{ objectFit, objectPosition }}
        onError={() => setImgSrc(FALLBACK)}
      />
    </div>
  );
}
