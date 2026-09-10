import Hero from "@/components/Hero/Hero";
import Showreel from "@/components/Showreel/Showreel";
import IntroStatement from "@/components/Hero/IntroStatement";
import HomepageLogos from "@/components/HomepageLogos/HomepageLogos";
import ProjectGrid from "@/components/ProjectGrid/ProjectGrid";
import AboutSection from "@/components/About/AboutSection";
import NewsFeed from "@/components/News/NewsFeed";
import { sanityFetch } from "@/sanity/lib/live";
import {
  ARTICLES_QUERY,
  CLIENTS_QUERY,
  FEATURED_PROJECTS_QUERY,
  SETTINGS_QUERY,
} from "@/sanity/lib/queries";

export default async function HomePage() {
  const [{ data: featured }, { data: clients }, { data: articles }, { data: settings }] =
    await Promise.all([
      sanityFetch({ query: FEATURED_PROJECTS_QUERY, stega: false }),
      sanityFetch({ query: CLIENTS_QUERY, stega: false }),
      sanityFetch({ query: ARTICLES_QUERY, stega: false }),
      sanityFetch({ query: SETTINGS_QUERY, stega: false }),
    ]);

  return (
    <main>
      <Hero tagline={settings?.tagline} />

      <div className="relative">
        <Showreel />
        <div className="relative z-10 -mt-[50vh] bg-[var(--color-purple-bg)]">
          <IntroStatement text={settings?.introStatement ?? ""} />
          <HomepageLogos clients={clients ?? []} />
        </div>
      </div>

      <section className="container-wide -mt-[20vh] pb-16 md:pb-24">
        <ProjectGrid projects={featured ?? []} />
      </section>

      <AboutSection settings={settings} />
      <NewsFeed articles={articles ?? []} />
    </main>
  );
}
