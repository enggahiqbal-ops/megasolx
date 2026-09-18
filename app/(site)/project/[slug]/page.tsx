import { notFound } from "next/navigation";

import CtaBanner from "@/components/CtaBanner/CtaBanner";
import PortableText from "@/components/PortableText/PortableText";
import VideoBackground from "@/components/Video/VideoBackground";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { data } = await sanityFetch({ query: PROJECT_SLUGS_QUERY, perspective: "published", stega: false });
  return (data ?? []).filter((p): p is { slug: string } => Boolean(p.slug));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { data: project } = await sanityFetch({ query: PROJECT_QUERY, params: { slug }, stega: false });
  if (!project) return {};
  return { title: project.title, description: project.workBlurb };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const [{ data: project }, { data: settings }] = await Promise.all([
    sanityFetch({ query: PROJECT_QUERY, params: { slug }, stega: false }),
    sanityFetch({ query: SETTINGS_QUERY, stega: false }),
  ]);
  if (!project) notFound();

  return (
    <main>
      <section className="section banner-inner project-detail-banner">
        <div className="banner-overlay" />
        <div className="hero-container">
          <div className="banner-inner-container">
            <h2>{project.title}</h2>
            <nav className="breadcrumb">
              <a href="/" className="breadcrumb-item">
                Home
              </a>
              <span className="separator">/</span>
              <span className="breadcrumb-item current">Project Details</span>
            </nav>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="hero-container">
          <div className="project-detail-content-container">
            <div className="project-detail-video-container">
              <VideoBackground className="project-video-bg" videoId={project.heroVideoId ?? "Go8gUX_HZAY"} />
              <div className="project-detail-video-spacer" />
            </div>

            {project.about && project.about.length > 0 && (
              <div className="row row-cols-lg-2 row-cols-1 grid-spacer-80">
                <div className="col col-lg-5">
                  <div className="heading-container">
                    <h2>{project.workBlurb}</h2>
                  </div>
                </div>
                <div className="col col-lg-7">
                  <div className="d-flex flex-column gspace-2 justify-content-end h-100">
                    <h3>About the Project</h3>
                    <PortableText value={project.about} />
                  </div>
                </div>
              </div>
            )}

            <div className="row row-cols-lg-2 row-cols-1 grid-spacer-80">
              <div className="col col-lg-4">
                <div className="card card-project-detail">
                  {project.client && <h5>Client: {project.client}</h5>}
                  <h5>Project Title: {project.title}</h5>
                  {project.category && <h5>Category: {project.category}</h5>}
                  {project.location && <h5>Location: {project.location}</h5>}
                  {project.duration && <h5>Duration: {project.duration}</h5>}
                  {project.deliveryFormat && <h5>Delivery Format: {project.deliveryFormat}</h5>}
                </div>
              </div>
              {project.roleItems && project.roleItems.length > 0 && (
                <div className="col col-lg-8">
                  <div className="d-flex flex-column gspace-2">
                    <h3>Our Role</h3>
                    <div className="row row-cols-lg-3 row-cols-1 grid-spacer-2">
                      {project.roleItems.map((role) => (
                        <div className="col" key={role}>
                          <div className="card card-project-detail">
                            <h5>{role}</h5>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {project.behindTheScenes && project.behindTheScenes.length > 0 && (
              <div className="row row-cols-lg-2 row-cols-1 grid-spacer-80">
                <div className="col col-lg-4">
                  <div className="heading-container">
                    <h2>Behind the Scenes</h2>
                  </div>
                </div>
                <div className="col col-lg-8">
                  <PortableText value={project.behindTheScenes} />
                </div>
              </div>
            )}

            {project.creativeDirection && project.creativeDirection.length > 0 && (
              <div className="row row-cols-lg-2 row-cols-1 grid-spacer-80">
                <div className="col col-lg-4">
                  <div className="heading-container">
                    <h2>Creative Direction</h2>
                  </div>
                </div>
                <div className="col col-lg-8">
                  <PortableText value={project.creativeDirection} />
                </div>
              </div>
            )}

            {project.results && project.results.length > 0 && (
              <div className="row row-cols-lg-2 row-cols-1 grid-spacer-80">
                <div className="col col-lg-4">
                  <div className="heading-container">
                    <h2>Results &amp; Reach</h2>
                  </div>
                </div>
                <div className="col col-lg-8">
                  <div className="row row-cols-md-2 row-cols-1 grid-spacer-2">
                    {project.results.map((result) => (
                      <div className="col" key={result.label}>
                        <div className="card card-project-detail">
                          <p className="project-result">
                            <span className="result-link">{result.value}</span> {result.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {project.gallery && project.gallery.length > 0 && (
              <div className="row row-cols-lg-2 row-cols-1 grid-spacer-80">
                <div className="col col-lg-4">
                  <div className="heading-container">
                    <h2>Gallery</h2>
                  </div>
                </div>
                <div className="col col-lg-8">
                  <div className="row row-cols-md-2 row-cols-1 grid-spacer-2">
                    {project.gallery.map((image, i) => (
                      <div className="col" key={image.url ?? i}>
                        <div className="image-container">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={image.url ?? undefined} alt={image.alt ?? "Project Detail"} className="img-fluid" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <CtaBanner ctaBanner={settings?.ctaBanner} className="section pt-0" />
    </main>
  );
}
