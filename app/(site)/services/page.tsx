import CtaBanner from "@/components/CtaBanner/CtaBanner";
import PricingCards from "@/components/Pricing/PricingCards";
import ServicesAccordion from "@/components/Services/ServicesAccordion";
import { sanityFetch } from "@/sanity/lib/live";
import { PRICING_PLANS_QUERY, SERVICES_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";

export const metadata = { title: "Our Services" };

export default async function ServicesPage() {
  const [{ data: services }, { data: settings }, { data: plans }] = await Promise.all([
    sanityFetch({ query: SERVICES_QUERY, stega: false }),
    sanityFetch({ query: SETTINGS_QUERY, stega: false }),
    sanityFetch({ query: PRICING_PLANS_QUERY, stega: false }),
  ]);

  return (
    <main>
      <section className="section banner-inner service-banner">
        <div className="banner-overlay" />
        <div className="hero-container">
          <div className="banner-inner-container">
            <h2>Our Services</h2>
            <nav className="breadcrumb">
              <a href="/" className="breadcrumb-item">
                Home
              </a>
              <span className="separator">/</span>
              <span className="breadcrumb-item current">Services</span>
            </nav>
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
            </div>
            <ServicesAccordion services={services ?? []} />
          </div>
        </div>
      </section>

      <CtaBanner ctaBanner={settings?.ctaBanner} className="section-cta-contact" />

      <section className="section">
        <div className="hero-container">
          <div className="pricing-content-container">
            <h2 className="pricing-content-title">Choose a Plan That Fits Your Vision</h2>
            <div className="heading-highlight-container">
              <span className="pricing-heading-highlight">Pricing Plants</span>
            </div>
            <PricingCards plans={plans ?? []} withJustifyBetween />
          </div>
        </div>
      </section>
    </main>
  );
}
