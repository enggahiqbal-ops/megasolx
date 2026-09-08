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

    const measure = () => {
      setFooterHeight(footerEl.offsetHeight);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(footerEl);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="footer-reveal-root">
      <div
        id="page-content"
        className="page-wrap"
        style={
          footerHeight
            ? { marginBottom: `${footerHeight}px` }
            : undefined
        }
      >
        {children}
      </div>
      <div ref={footerRef} className="footer-reveal-slot">
        {footer}
      </div>
    </div>
  );
}
