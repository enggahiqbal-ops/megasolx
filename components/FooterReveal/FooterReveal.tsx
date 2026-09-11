"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type FooterRevealProps = {
  children: ReactNode;
  footer: ReactNode;
};

export default function FooterReveal({ children, footer }: FooterRevealProps) {
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const footerEl = footerRef.current;
    if (!footerEl) return;

    const measure = () => setFooterHeight(footerEl.offsetHeight);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(footerEl);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div
      className="footer-reveal-root"
      // Space below the page content in normal flow (padding, not margin, so it
      // doesn't collapse) — this is what the fixed footer is revealed through.
      style={footerHeight ? { paddingBottom: `${footerHeight}px` } : undefined}
    >
      <div id="page-content" className="page-wrap">
        {children}
      </div>
      <div ref={footerRef} className="footer-reveal-slot">
        {footer}
      </div>
    </div>
  );
}
