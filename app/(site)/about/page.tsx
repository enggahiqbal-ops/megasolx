import CtaBanner from "@/components/CtaBanner/CtaBanner";
import Counter from "@/components/Counter/Counter";
import PartnerLogos from "@/components/Partners/PartnerLogos";
import ServicesAccordion from "@/components/Services/ServicesAccordion";
import TeamGrid from "@/components/Team/TeamGrid";
import TrustSection from "@/components/TrustSection/TrustSection";
import { sanityFetch } from "@/sanity/lib/live";
import {
  ABOUT_PAGE_QUERY,
  CLIENTS_QUERY,
  SERVICES_QUERY,
  SETTINGS_QUERY,
  TEAM_QUERY,
} from "@/sanity/lib/queries";

export const metadata = { title: "About Us" };

export default async function AboutPage() {
  const [{ data: about }, { data: team }, { data: clients }, { data: services }, { data: settings }] =
    await Promise.all([
      sanityFetch({ query: ABOUT_PAGE_QUERY, stega: false }),
      sanityFetch({ query: TEAM_QUERY, stega: false }),
      sanityFetch({ query: CLIENTS_QUERY, stega: false }),
      sanityFetch({ query: SERVICES_QUERY, stega: false }),
      sanityFetch({ query: SETTINGS_QUERY, stega: false }),
    ]);

  const stats = about?.stats?.length
    ? about.stats
    : [
        { value: "120", label: "Project Delivered" },
        { value: "10", label: "Award Won" },
        { value: "25000000", label: "Video Views" },
        { value: "120", label: "Project Delivered" },
      ];

  return (
    <main>
      {/* Banner Inner Section */}
      <section className="section banner-inner about-banner">
        <div className="banner-overlay" />
        <div className="hero-container">
          <div className="banner-inner-container">
            <h2>About Us</h2>
            <nav className="breadcrumb">
              <a href="/" className="breadcrumb-item">
                Home
              </a>
              <span className="separator">/</span>
              <span className="breadcrumb-item current">About Us</span>
            </nav>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section">
        <div className="hero-container">
          <div className="row row-cols-md-2 row-cols-1 grid-spacer-3">
            <div className="col col-md-4">
              <div className="d-flex flex-row flex-md-column gspace-2 align-items-end align-items-md-start justify-content-between w-100 h-100">
                <span className="about-tagline">
                  {about?.tagline ?? "Bringing Stories to Life Through Film & Emotion"}
                </span>
                <div className="about-circle-logo-container">
                  <div className="about__circle-logo">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="aboutCircleLogoTitle">
                      <title id="aboutCircleLogoTitle">Montra Film Studio Logo</title>
                      <defs>
                        <path id="aboutTextcircle" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
                      </defs>
                      <circle cx="100" cy="100" r="95" />
                      <text dy="5">
                        <textPath xlinkHref="#aboutTextcircle" className="about__circle-logo-title" startOffset="0%">
                          • MONTRA FILM AND VIDEO PRODUCTION STUDIO • BRINGING IDEAS TO LIFE ON SCREEN
                        </textPath>
                      </text>
                      <g transform="translate(100 100)">
                        <image
                          href="/assets/montra/images/Gp-1.png"
                          className="about__circle-logo-image"
                          width="160"
                          height="160"
                          x="-80"
                          y="-80"
                          preserveAspectRatio="xMidYMid meet"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-md-8">
              <div className="d-flex flex-column gspace-2">
                <h3>{about?.heroStatement}</h3>
                {about?.secondaryStatement && <p>{about.secondaryStatement}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Section */}
      <section className="section pt-0">
        <div className="hero-container">
          <div className="achievement-container">
            {stats.map((stat, i) => (
              <div className="achievement-content" key={`${stat.label}-${i}`}>
                <div className="achievement-stat-container">
                  <Counter target={Number(stat.value.replace(/\D/g, "")) || 0} className="achievement-stat" />
                  <span className="achievement-suffix">+</span>
                </div>
                <h5>{stat.label}</h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustSection trustSection={settings?.trustSection} trustStat={settings?.trustStat} />

      <section className="section">
        <div className="hero-container overflow-visible">
          <TeamGrid members={(team ?? []).slice(0, 4)} />
        </div>
      </section>

      <section className="section p-0">
        <div className="hero-container overflow-hidden">
          <div className="partners-container">
            <h5 className="partnership-title-content">Trusted by Industry Leaders &amp; Creative Brands</h5>
            <PartnerLogos logos={clients ?? []} />
          </div>
        </div>
      </section>

      <section className="section service-content-banner">
        <div className="hero-container">
          <div className="d-flex flex-column gspace-5">
            <div className="service-title-wrapper">
              <div className="service-title-heading">
                <h2>What We Do Best</h2>
              </div>
              <div className="service-title-description">
                <p>From cinematic storytelling to post-production mastery, discover how we bring your vision to life.</p>
              </div>
              <div className="service-title-cta">
                <a href="/services" className="btn btn-accent">
                  Explore All Services
                </a>
              </div>
            </div>
            <ServicesAccordion services={services ?? []} />
          </div>
        </div>
      </section>

      <CtaBanner ctaBanner={settings?.ctaBanner} />
    </main>
  );
}
