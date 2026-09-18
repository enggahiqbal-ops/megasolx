import PartnerLogos from "@/components/Partners/PartnerLogos";
import TeamGrid from "@/components/Team/TeamGrid";
import TrustSection from "@/components/TrustSection/TrustSection";
import { sanityFetch } from "@/sanity/lib/live";
import { CLIENTS_QUERY, SETTINGS_QUERY, TEAM_QUERY } from "@/sanity/lib/queries";

export const metadata = { title: "Our Crew" };

export default async function TeamPage() {
  const [{ data: team }, { data: clients }, { data: settings }] = await Promise.all([
    sanityFetch({ query: TEAM_QUERY, stega: false }),
    sanityFetch({ query: CLIENTS_QUERY, stega: false }),
    sanityFetch({ query: SETTINGS_QUERY, stega: false }),
  ]);

  return (
    <main>
      <section className="section banner-inner team-banner">
        <div className="banner-overlay" />
        <div className="hero-container">
          <div className="banner-inner-container">
            <h2>Our Crew</h2>
            <nav className="breadcrumb">
              <a href="/" className="breadcrumb-item">
                Home
              </a>
              <span className="separator">/</span>
              <span className="breadcrumb-item current">Our Team</span>
            </nav>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="hero-container overflow-visible">
          <TeamGrid members={team ?? []} />
        </div>
      </section>

      <section className="section pt-0">
        <div className="hero-container overflow-hidden">
          <div className="partners-container">
            <h5 className="partnership-title-content">Trusted by Industry Leaders &amp; Creative Brands</h5>
            <PartnerLogos logos={clients ?? []} />
          </div>
        </div>
      </section>

      <TrustSection trustSection={settings?.trustSection} trustStat={settings?.trustStat} />
    </main>
  );
}
