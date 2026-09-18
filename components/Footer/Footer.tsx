import Link from "next/link";

import type { SiteSettings } from "@/sanity/lib/types";
import NewsletterForm from "@/components/Footer/NewsletterForm";

type Props = {
  settings: SiteSettings | null;
};

const defaultNav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/project" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Footer({ settings }: Props) {
  const nav = settings?.nav?.length ? settings.nav : defaultNav;
  const heading = settings?.footerHeading ?? "Montra - Film & Video Production";
  const address = settings?.contact?.address ?? "123 Montra Studio Bulevard., Los Angeles, CA 90210";
  const phone = settings?.contact?.phone ?? "+1 (800) 234-5678";
  const newsletterHeading =
    settings?.newsletter?.heading ?? "Subscribe to our newsletter for the latest updates";
  const social = settings?.social;
  const copyright = settings?.footerCopyright ?? "© 2025 Montra Studio. All rights reserved.";

  return (
    <footer>
      <div className="section-footer">
        <div className="hero-container">
          <div className="footer-container">
            <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 grid-spacer-3">
              <div className="col col-lg-3 col-md-6">
                <div className="d-flex flex-column gspace-2">
                  <h3>{heading}</h3>
                  <div className="d-flex flex-column gspace-1">
                    <h5>Our Office</h5>
                    <div className="footer-info-container">
                      <span className="footer-info">{address}</span>
                    </div>
                    <div className="footer-info-container">
                      <h5>Contact Us</h5>
                      <span className="footer-info">{phone}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col col-lg-3 col-md-6">
                <div className="d-flex flex-column gspace-3">
                  <h4>Navigation</h4>
                  <ul className="chevron-circle-list">
                    {nav.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col col-lg-6 col-md-12">
                <div className="footer-newsletter-container">
                  <h5 className="container-title">{newsletterHeading}</h5>
                  <NewsletterForm />
                  <div className="d-flex flex-row gspace-1 align-items-center w-100 justify-content-between flex-wrap">
                    <h5>Social Media</h5>
                    <div className="social-footer-container">
                      <a href={social?.instagram || "https://www.instagram.com/"} className="footer-icon">
                        <i className="fa-brands fa-instagram" />
                      </a>
                      <a href={social?.facebook || "https://www.facebook.com/"} className="footer-icon">
                        <i className="fa-brands fa-facebook" />
                      </a>
                      <a href={social?.x || "https://www.x.com/"} className="footer-icon">
                        <i className="fa-brands fa-x-twitter" />
                      </a>
                      <a href={social?.youtube || "https://www.youtube.com/"} className="footer-icon">
                        <i className="fa-brands fa-youtube" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-title-container">
              <span className="footer-title">{settings?.name ?? "Montra Studio"}</span>
            </div>
            <div className="footer-copyright-container">
              <Link href="/privacy-policy" className="legallink">
                Privacy Policy
              </Link>
              <span className="copyright">{copyright}</span>
              <a href="#" className="legallink">
                Terms &amp; Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
