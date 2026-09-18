import CtaBanner from "@/components/CtaBanner/CtaBanner";
import ProjectGrid from "@/components/Project/ProjectGrid";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";

export const metadata = { title: "Portfolio" };

export default async function ProjectPage() {
  const [{ data: projects }, { data: settings }] = await Promise.all([
    sanityFetch({ query: PROJECTS_QUERY, stega: false }),
    sanityFetch({ query: SETTINGS_QUERY, stega: false }),
  ]);

  return (
    <main>
      <section className="section banner-inner project-banner">
        <div className="banner-overlay" />
        <div className="hero-container">
          <div className="banner-inner-container">
            <h2>Portfolio</h2>
            <nav className="breadcrumb">
              <a href="/" className="breadcrumb-item">
                Home
              </a>
              <span className="separator">/</span>
              <span className="breadcrumb-item current">Portfolio</span>
            </nav>
          </div>
        </div>
      </section>

      <section className="section section-project bg-accent-color-5">
        <div className="hero-container overflow-visible">
          <div className="project-heading-container">
            <h2 className="project-section-heading">Featured Project</h2>
          </div>
          <ProjectGrid projects={projects ?? []} />
        </div>
      </section>

      <CtaBanner ctaBanner={settings?.ctaBanner} />
    </main>
  );
}
