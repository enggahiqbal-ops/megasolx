"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  target: number;
  className?: string;
};

/** Counts up from 0 to `target` once it scrolls into view. Replaces the jQuery `.counter` logic. */
export default function Counter({ target, className }: Props) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const startTime = performance.now();

          function tick(now: number) {
            const progress = Math.min((now - startTime) / duration, 1);
            setValue(Math.round(progress * target));
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString()}
    </span>
  );
}
