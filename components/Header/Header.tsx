"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { SiteSettings } from "@/sanity/lib/types";

type Props = {
  settings: SiteSettings | null;
};

const pagesLinks = [
  { label: "Crew", href: "/team" },
  { label: "Testimonials", href: "/testimonial" },
  { label: "Blog", href: "/blog" },
];

const servicesLinks = [
  { label: "Service Overview", href: "/services" },
  { label: "Pricing", href: "/pricing" },
];

export default function Header({ settings }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"services" | "pages" | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logo = settings?.logo ?? "/assets/montra/images/Montra-Logo.png";
  const ctaLabel = settings?.ctaLabel ?? "Get a Quote";
  const ctaHref = settings?.ctaHref ?? "/contact";

  return (
    <header>
      <div className={`navbar-container ${scrolled ? "scrolled" : ""}`} ref={navRef}>
        <div className="hero-container">
          <nav className="navbar navbar-expand-lg">
            <div className="navbar-nav-container">
              <div className="logo-container">
                <Link className="navbar-brand fw-bold" href="/">
                  <img src={logo} alt="Logo" className="img-fluid" />
                </Link>
              </div>

              <div className="nav-link-container">
                <div className={`collapse navbar-collapse ${mobileOpen ? "show" : ""}`} id="navbarNav">
                  <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                      <Link className="nav-link" href="/">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="/about">
                        About Us
                      </Link>
                    </li>
                    <li className={`nav-item dropdown ${openDropdown === "services" ? "show" : ""}`}>
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        aria-expanded={openDropdown === "services"}
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenDropdown((prev) => (prev === "services" ? null : "services"));
                        }}
                      >
                        Services <i className="fa-solid fa-chevron-down" />
                      </a>
                      <ul className={`dropdown-menu ${openDropdown === "services" ? "show" : ""}`}>
                        {servicesLinks.map((link) => (
                          <li key={link.href}>
                            <Link className="dropdown-item" href={link.href} onClick={() => setOpenDropdown(null)}>
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="/project">
                        Portfolio
                      </Link>
                    </li>
                    <li className={`nav-item dropdown ${openDropdown === "pages" ? "show" : ""}`}>
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        aria-expanded={openDropdown === "pages"}
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenDropdown((prev) => (prev === "pages" ? null : "pages"));
                        }}
                      >
                        Pages <i className="fa-solid fa-chevron-down" />
                      </a>
                      <ul className={`dropdown-menu ${openDropdown === "pages" ? "show" : ""}`}>
                        {pagesLinks.map((link) => (
                          <li key={link.href}>
                            <Link className="dropdown-item" href={link.href} onClick={() => setOpenDropdown(null)}>
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="/contact">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <button
                className="nav-btn"
                type="button"
                aria-controls="navbarNav"
                aria-expanded={mobileOpen}
                aria-label="Toggle navigation"
                onClick={() => setMobileOpen((prev) => !prev)}
              >
                <i className="fa-solid fa-bars" />
              </button>

              <div className="navbar-cta-container">
                <div>
                  <Link href={ctaHref} className="btn btn-accent">
                    {ctaLabel}
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
