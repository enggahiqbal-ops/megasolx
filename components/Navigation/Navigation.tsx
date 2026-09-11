"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/sanity/lib/types";

type NavigationProps = {
  nav: NavLink[];
  expertiseMenu: { heading: string; links: NavLink[] | null }[];
};

export default function Navigation({ nav, expertiseMenu }: NavigationProps) {
  const pathname = usePathname();
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const closeSubmenu = () => setSubmenuOpen(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSubmenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const itemClass = (active: boolean) =>
    `relative z-10 block rounded-full px-3 py-2 text-sm transition-colors duration-200 max-[379px]:px-2 max-[379px]:text-xs sm:px-4 ${
      active
        ? "bg-[var(--color-primary)]/25 font-medium text-[var(--color-secondary)]"
        : "text-[var(--color-secondary)] hover:text-[var(--color-primary-text)]"
    }`;

  const before = nav.slice(0, 3);
  const after = nav.slice(3);
  const expertiseActive = pathname.startsWith("/expertise");

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[100]">
      <a
        href="#page-content"
        className="pointer-events-auto sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
      >
        Skip Navigation
      </a>

      <div className="container pointer-events-none grid grid-cols-[auto_1fr_auto] items-center gap-6 py-0 pt-0 max-lg:hidden">
        <Link
          href="/"
          aria-label="Home"
          className="pointer-events-auto text-[var(--color-secondary)] transition-colors duration-300 hover:text-[var(--color-primary-text)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.svg" alt="" width={125} height={16} className="h-4 w-auto" />
        </Link>

        <div className="justify-self-center" />

        <div className="pointer-events-auto h-10 w-10 rounded-full bg-[var(--color-primary)]/20" aria-hidden />
      </div>

      <nav
        ref={navRef}
        aria-label="Primary"
        data-submenu-open={submenuOpen}
        className="pointer-events-auto fixed bottom-6 left-1/2 z-[101] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 rounded-full bg-white/70 shadow-[0_4px_16px_rgba(0,0,0,0.06)] backdrop-blur-md md:bottom-auto md:top-5 md:w-auto"
      >
        <ul className="relative flex items-center justify-center gap-0 rounded-full px-1 py-1">
          {before.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={closeSubmenu}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={itemClass(isActive(link.href))}
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li className="relative">
            <button
              type="button"
              aria-expanded={submenuOpen}
              aria-haspopup="true"
              onClick={() => setSubmenuOpen((v) => !v)}
              className={`relative z-10 rounded-full px-3 py-2 text-sm transition-colors sm:px-4 ${
                expertiseActive || submenuOpen
                  ? "bg-[var(--color-primary)]/25 font-medium text-[var(--color-secondary)]"
                  : "text-[var(--color-secondary)] hover:text-[var(--color-primary-text)]"
              }`}
            >
              Expertise
            </button>

            {submenuOpen && (
              <div className="absolute bottom-full left-1/2 mb-3 w-[min(90vw,56rem)] -translate-x-1/2 rounded-[1.375rem] bg-white p-6 shadow-xl md:bottom-auto md:top-full md:mb-0 md:mt-3">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {expertiseMenu.map((group) => (
                    <div key={group.heading}>
                      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-[var(--color-muted)]">
                        {group.heading}
                      </p>
                      <ul className="space-y-2">
                        {(group.links ?? []).map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={closeSubmenu}
                              aria-current={
                                isActive(link.href) ? "page" : undefined
                              }
                              className={`text-sm transition ${
                                isActive(link.href)
                                  ? "font-medium text-[var(--color-primary-text)]"
                                  : "text-[var(--color-secondary)] hover:text-[var(--color-primary-text)]"
                              }`}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>

          {after.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={closeSubmenu}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={itemClass(isActive(link.href))}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
