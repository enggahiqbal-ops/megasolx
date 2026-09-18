import Link from "next/link";

import type { SiteSettings } from "@/sanity/lib/types";

type Props = {
  ctaBanner: SiteSettings["ctaBanner"] | null | undefined;
  className?: string;
};

export default function CtaBanner({ ctaBanner, className = "section" }: Props) {
  const heading = ctaBanner?.heading ?? "Let's Turn Your Vision Into Cinematic Reality";
  const body =
    ctaBanner?.body ??
    "From concept development to post-production, we craft cinematic experiences that captivate and inspire. Let's create something extraordinary together.";
  const buttonLabel = ctaBanner?.buttonLabel ?? "Free Consultation";
  const buttonHref = ctaBanner?.buttonHref ?? "/contact";

  return (
    <section className={className}>
      <div className="hero-container">
        <div className="contact-cta-banner">
          <div className="contact-cta-title-container">
            <h2 className="contact-cta-title heading-fill">{heading}</h2>
            <h2 className="contact-cta-title heading-stroke">{heading}</h2>
          </div>
          <div className="contact-cta-text-container">
            <p>{body}</p>
            <div>
              <Link href={buttonHref} className="btn btn-accent-primary">
                {buttonLabel}
              </Link>
            </div>
          </div>
          <div className="contact-cta-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/montra/images/envato-labs-image-edit-1-e1752829112223.png"
              alt="Contact CTA"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
