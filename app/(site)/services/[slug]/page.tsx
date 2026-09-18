import { notFound } from "next/navigation";
import Link from "next/link";

import CtaBanner from "@/components/CtaBanner/CtaBanner";
import PortableText from "@/components/PortableText/PortableText";
import VideoBackground from "@/components/Video/VideoBackground";
import { sanityFetch } from "@/sanity/lib/live";
import { SERVICE_QUERY, SERVICE_SLUGS_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { data } = await sanityFetch({ query: SERVICE_SLUGS_QUERY, perspective: "published", stega: false });
  return (data ?? []).filter((s): s is { slug: string } => Boolean(s.slug));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { data: service } = await sanityFetch({ query: SERVICE_QUERY, params: { slug }, stega: false });
  if (!service) return {};
  return { title: service.title, description: service.shortDescription };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const [{ data: service }, { data: settings }] = await Promise.all([
    sanityFetch({ query: SERVICE_QUERY, params: { slug }, stega: false }),
    sanityFetch({ query: SETTINGS_QUERY, stega: false }),
  ]);
  if (!service) notFound();

  return (
    <main>
      <section className="section banner-inner service-detail-banner">
        <div className="banner-overlay" />
        <div className="hero-container">
          <div className="banner-inner-container">
            <h2>{service.title}</h2>
            <nav className="breadcrumb">
              <a href="/" className="breadcrumb-item">
                Home
              </a>
              <span className="separator">/</span>
              <span className="breadcrumb-item current">Service Detail</span>
            </nav>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="hero-container">
          <div className="service-detail-content-container">
            <div className="service-detail-video-container">
              <VideoBackground className="service-video-bg" videoId={service.heroVideoId ?? "pVA0G01aDfk"} start={4} end={20} />
              <div className="service-detail-video-spacer" />
            </div>

            {service.intro && service.intro.length > 0 && (
              <div className="row row-cols-lg-2 row-cols-1 grid-spacer-2">
                <div className="col">
                  <div className="heading-container">
                    <h2>{service.shortDescription}</h2>
                  </div>
                </div>
                <div className="col">
                  <div className="d-flex flex-column gspace-2">
                    <PortableText value={service.intro} />
                  </div>
                </div>
              </div>
            )}

            {service.whatsIncluded && service.whatsIncluded.length > 0 && (
              <div className="d-flex flex-column gspace-3">
                <h3>What&apos;s Included in Our {service.title} Service:</h3>
                <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 grid-spacer-3">
                  {service.whatsIncluded.map((feature) => (
                    <div className="col" key={feature.title}>
                      <div className="card card-service-detail-include">
                        <div className="d-flex flex-row align-items-center gspace-1">
                          <i className="fa-solid fa-circle accent-color" />
                          <h5>{feature.title}</h5>
                        </div>
                        <p>{feature.description}</p>
                      </div>
                    </div>
                  ))}
                  <div className="col">
                    <div className="card card-service-detail-include cta-card">
                      <div className="service-detail-cta-container">
                        <h3>Ready to Get Started?</h3>
                        <Link href="/contact" className="btn btn-service-detail-cta">
                          <i className="fa-solid fa-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {service.whyChooseUs && (
              <div className="row row-cols-lg-2 row-cols-1 grid-spacer-3">
                <div className="col order-2 order-lg-1">
                  <div className="d-flex flex-column gspace-2">
                    <h3>Why Choose Us?</h3>
                    {service.whyChooseUs.body && <p>{service.whyChooseUs.body}</p>}
                    {service.whyChooseUs.bullets && service.whyChooseUs.bullets.length > 0 && (
                      <ul className="service-detail-list">
                        {service.whyChooseUs.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                {service.whyChooseUs.image && (
                  <div className="col order-1 order-lg-2">
                    <div className="image-container">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={service.whyChooseUs.image} alt="Service detail" className="img-fluid" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {service.idealFor && (
              <div className="row row-cols-lg-2 row-cols-md-2 row-cols-1 grid-spacer-3">
                {service.idealFor.image && (
                  <div className="col col-lg-8 col-md-6">
                    <div className="image-container service-detail-ideal-img">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={service.idealFor.image} alt="" className="img-fluid" />
                    </div>
                  </div>
                )}
                {service.idealFor.items && service.idealFor.items.length > 0 && (
                  <div className="col col-lg-4 col-md-6">
                    <div className="d-flex flex-column gspace-2">
                      <h3>Ideal For</h3>
                      <ul className="service-detail-list">
                        {service.idealFor.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <CtaBanner ctaBanner={settings?.ctaBanner} className="section pt-0" />
    </main>
  );
}
