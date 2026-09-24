import Link from "next/link";

import Counter from "@/components/Counter/Counter";
import type { SiteSettings } from "@/sanity/lib/types";

type Props = {
  trustSection: SiteSettings["trustSection"] | null | undefined;
  trustStat: SiteSettings["trustStat"] | null | undefined;
};

const icons = [
  "/assets/montra/images/Icon-5-1.png",
  "/assets/montra/images/Icon-6-1.png",
  "/assets/montra/images/Icon-7-1.png",
  "/assets/montra/images/Icon-8.png",
];

const fallbackPoints = [
  {
    number: "01",
    title: "Cinematic Excellence",
    description: "High-end production with film-grade visuals and compelling storytelling.",
  },
  {
    number: "02",
    title: "Creative Teamwork",
    description: "A passionate team of directors, editors & cinematographers.",
  },
  {
    number: "03",
    title: "End to End Services",
    description: "From scripting to post production all in one place.",
  },
  {
    number: "04",
    title: "Client Focused Approach",
    description: "We listen, adapt, and deliver results that exceed expectations.",
  },
];

export default function TrustSection({ trustSection, trustStat }: Props) {
  const points = trustSection?.points?.length ? trustSection.points : fallbackPoints;
  const heading = trustSection?.heading ?? "Why Brands Trust Megasolx";
  const statValue = trustStat?.value ?? "150";
  const statLabel = trustStat?.label ?? "Projects Completed";

  function Card({ index }: { index: number }) {
    const point = points[index];
    if (!point) return null;
    return (
      <div className="col">
        <div className="card card-trust-us">
          <div className="card-number-wrapper">
            <div className="card-number">{point.number}</div>
          </div>
          <div className="trust-us-icon">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icons[index]} alt="Trust Us Icon" className="img-fluid" />
          </div>
          <div className="d-flex flex-column gspace-2">
            <h4>{point.title}</h4>
            <p>{point.description}</p>
            <div className="trust-us-cta">
              <Link href="/about">Learn More</Link>
              <i className="fa-solid fa-chevron-circle-right" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="section bg-accent-color-5">
      <div className="hero-container">
        <div className="d-flex flex-column gspace-3">
          <div className="row row-cols-lg-2 row-cols-1 grid-spacer-3">
            <div className="col col-lg-8 order-2 order-lg-1">
              <div className="row row-cols-md-2 row-cols-1 grid-spacer-3">
                <Card index={0} />
                <Card index={1} />
              </div>
            </div>
            <div className="col col-lg-4 order-1 order-lg-2">
              <div className="d-flex flex-column gspace-2 text-start text-lg-center align-items-start align-items-lg-center">
                <h2>{heading}</h2>
                <p className="mb-0">
                  From concept to screen, we craft powerful visual experiences. Let your story shine with
                  industry-grade film production.
                </p>
                <div>
                  <Link href="/contact" className="btn btn-accent">
                    Let&apos;s Create Together
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row row-cols-lg-2 row-cols-1 grid-spacer-3">
            <div className="col col-lg-4 order-2 order-lg-1">
              <div className="d-flex flex-column gspace-2 justify-content-end overflow-hidden h-100">
                <span className="trust-us-stat-container">
                  <Counter target={Number(statValue.replace(/\D/g, "")) || 150} className="trust-us-stat" />
                  <span className="trust-us-suffix">+</span>
                </span>
                <h3>{statLabel}</h3>
                <p>Across film, ads, and branded content.</p>
                <div className="trustus-avatar-container">
                  <div className="d-flex flex-row align-items-center">
                    {["Photo-13.jpg", "Photo-6.jpg", "Photo-1.jpg", "Gp-1.png"].map((file) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={file}
                        src={`/assets/montra/images/${file}`}
                        alt="Banner Avatar"
                        className="banner-avatar"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-lg-8 order-1 order-lg-2">
              <div className="row row-cols-md-2 row-cols-1 grid-spacer-3">
                <Card index={2} />
                <Card index={3} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
