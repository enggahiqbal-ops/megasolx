import Link from "next/link";

import BlogGrid from "@/components/Blog/BlogGrid";
import CtaBanner from "@/components/CtaBanner/CtaBanner";
import PartnerLogos from "@/components/Partners/PartnerLogos";
import ServicesAccordion from "@/components/Services/ServicesAccordion";
import ProjectGrid from "@/components/Project/ProjectGrid";
import TeamGrid from "@/components/Team/TeamGrid";
import TestimonialGrid from "@/components/Testimonials/TestimonialGrid";
import TrustSection from "@/components/TrustSection/TrustSection";
import VideoBackground from "@/components/Video/VideoBackground";
import { sanityFetch } from "@/sanity/lib/live";
import {
  ARTICLES_QUERY,
  CLIENTS_QUERY,
  FEATURED_PROJECTS_QUERY,
  HOME_PAGE_QUERY,
  SERVICES_QUERY,
  SETTINGS_QUERY,
  TEAM_QUERY,
  TESTIMONIALS_QUERY,
} from "@/sanity/lib/queries";

export default async function HomePage() {
  const [
    { data: home },
    { data: settings },
    { data: projects },
    { data: services },
    { data: team },
    { data: clients },
    { data: testimonials },
    { data: articles },
  ] = await Promise.all([
    sanityFetch({ query: HOME_PAGE_QUERY, stega: false }),
    sanityFetch({ query: SETTINGS_QUERY, stega: false }),
    sanityFetch({ query: FEATURED_PROJECTS_QUERY, stega: false }),
    sanityFetch({ query: SERVICES_QUERY, stega: false }),
    sanityFetch({ query: TEAM_QUERY, stega: false }),
    sanityFetch({ query: CLIENTS_QUERY, stega: false }),
    sanityFetch({ query: TESTIMONIALS_QUERY, stega: false }),
    sanityFetch({ query: ARTICLES_QUERY, stega: false }),
  ]);

  const hero = home?.hero;
  const coreServices = home?.coreServices;
  const coreItems = coreServices?.items?.length
    ? coreServices.items
    : [
        { title: "Creative Film Direction", description: "", highlighted: false },
        { title: "Cinematic Visual Style", description: "", highlighted: false },
        { title: "Expert Post Production", description: "", highlighted: true },
        { title: "Global Project Reach", description: "", highlighted: false },
      ];
  const coreIcons = ["Icon-7.png", "Icon-2-1.png", "Icon-3-1.png", "Icon-4-1.png"];

  return (
    <main>
      {/* Banner Home Section */}
      <div className="section-banner-home">
        <VideoBackground id="banner-video-background" videoId={hero?.showreelVideoId ?? "pVA0G01aDfk"} />
        <div className="banner-home-video">
          <div className="hero-container position-relative z-2">
            <div className="banner-home-content">
              <div className="d-flex flex-column gspace-2 align-items-center">
                <div className="d-flex flex-column flex-md-row gspace-2 justify-content-center justify-content-md-between align-items-center">
                  <div className="home-title-container">
                    <div className="d-flex flex-row gspace-y-0 gspace-x-1 align-items-center">
                      <h1>{hero?.headingWordPart1 ?? "Str"}</h1>
                      <div className="home-spacer">
                        <div className="spacer-inner" />
                      </div>
                      <h1>{hero?.headingWordPart2 ?? "ong"}</h1>
                    </div>
                    <h1>{hero?.headingLine2 ?? "Crafting Visuals"}</h1>
                  </div>

                  <div className="home-avatar-container">
                    <div className="d-flex flex-row align-items-center">
                      {["Photo-12.jpg", "Photo-5.jpg", "composite-collage-of-people-expressing-positive-em-JJYFLK3.jpg", "Gp-1.png"].map(
                        (file) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={file}
                            src={`/assets/montra/images/${file}`}
                            alt="Banner Avatar"
                            className="banner-avatar"
                          />
                        ),
                      )}
                    </div>
                    <p>
                      {hero?.intro ??
                        "Montra is a full-service film production studio delivering bold visuals and powerful narratives. From commercials to creative films we bring your vision to life."}
                    </p>
                  </div>
                </div>
                <div className="home-divider" />
                <div className="d-flex flex-column flex-md-row gspace-2 w-100 align-items-center justify-content-center justify-content-md-between">
                  <div>
                    <a
                      href={`https://www.youtube.com/watch?v=${hero?.showreelVideoId ?? "VhBl3dHT5SY"}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-accent"
                    >
                      Watch Our Showreel
                      <i className="fa-solid fa-film" />
                    </a>
                  </div>
                  <div className="d-flex flex-row gspace-2 align-items-center">
                    <a href={settings?.social?.instagram || "https://www.instagram.com/"} className="social-icon">
                      <i className="fa-brands fa-instagram" />
                    </a>
                    <a href={settings?.social?.facebook || "https://www.facebook.com/"} className="social-icon">
                      <i className="fa-brands fa-facebook" />
                    </a>
                    <a href={settings?.social?.x || "https://www.x.com/"} className="social-icon">
                      <i className="fa-brands fa-x-twitter" />
                    </a>
                    <a href={settings?.social?.youtube || "https://www.youtube.com/"} className="social-icon">
                      <i className="fa-brands fa-youtube" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Service Section */}
      <section className="section-core-service">
        <div className="hero-container overflow-visible">
          <div className="d-flex flex-column gspace-5 position-relative">
            <div className="core-service-heading-container">
              <div className="core-heading-container">
                <h2 className="core-service-heading heading-fill">
                  {coreServices?.heading ?? "Crafting Stories Through Cinematic Frames"}
                </h2>
                <h2 className="core-service-heading heading-stroke">
                  {coreServices?.heading ?? "Crafting Stories Through Cinematic Frames"}
                </h2>
              </div>

              <div className="core-service-logo-container">
                <div className="core-service__circle-logo">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="circleLogoTitle">
                    <title id="circleLogoTitle">Montra Film Studio Logo</title>
                    <defs>
                      <path id="textcircle" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
                    </defs>
                    <circle cx="100" cy="100" r="95" />
                    <text dy="5">
                      <textPath xlinkHref="#textcircle" className="core-service__circle-logo-title" startOffset="0%">
                        • MONTRA FILM AND VIDEO PRODUCTION STUDIO • BRINGING IDEAS TO LIFE ON SCREEN
                      </textPath>
                    </text>
                    <g transform="translate(100 100)">
                      <image
                        href="/assets/montra/images/Gp-1.png"
                        className="core-service__circle-logo-image"
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

            <div className="d-flex flex-column gspace-5">
              <div className="core-service-description">
                <p>
                  Montra is a creative film and video production studio based on the belief that every story
                  deserves to be told with power, passion, and precision. Whether it&apos;s a commercial,
                  documentary, or branded content — we craft visuals that resonate.
                </p>
              </div>

              <div className="core-service-card-container">
                {coreItems.map((item, i) => (
                  <div className={`card card-core-service ${item.highlighted ? "highlight-core" : ""}`} key={item.title}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/assets/montra/images/${coreIcons[i]}`} alt={`${item.title} Icon`} className="core-service-icon" />
                    <div className="d-flex flex-column gspace-2">
                      <h4>{item.title}</h4>
                      {item.description && <p className="text-center text-md-start">{item.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="core-service-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/montra/images/young-guy-enjoying-taking-photos-3UJ8HB8.png"
              alt="Photographer working with camera"
              className="img-fluid"
            />
          </div>
        </div>
      </section>

      {/* Project Section */}
      <section className="section section-project bg-accent-color-5">
        <div className="hero-container overflow-visible">
          <div className="project-heading-container">
            <h2 className="project-section-heading">Featured Project</h2>
          </div>
          <ProjectGrid projects={projects ?? []} />
        </div>
      </section>

      {/* Service Section */}
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
                <Link href="/services" className="btn btn-accent">
                  Explore All Services
                </Link>
              </div>
            </div>
            <ServicesAccordion services={services ?? []} />
          </div>
        </div>
      </section>

      <TrustSection trustSection={settings?.trustSection} trustStat={settings?.trustStat} />

      {/* Testimonial Section */}
      <section className="section p-0">
        <div className="testimonial-banner-container">
          <VideoBackground id="testimonial-video-background" videoId="6J1XlyCxtPw" />
          <div className="hero-container">
            <div className="testimonial-banner-content">
              <h2>Trusted by creative agencies, brands &amp; storytellers.</h2>
            </div>
          </div>
        </div>
        <div className="testimonial-card-container">
          <div className="hero-container">
            <TestimonialGrid testimonials={testimonials ?? []} />
          </div>
        </div>
      </section>

      <CtaBanner ctaBanner={settings?.ctaBanner} className="section-cta-contact" />

      {/* Team Section */}
      <section className="section">
        <div className="hero-container overflow-visible">
          <TeamGrid members={(team ?? []).slice(0, 4)} />
        </div>
      </section>

      {/* Partner Section */}
      <section className="section-small">
        <div className="hero-container overflow-hidden">
          <div className="partners-container">
            <h5 className="partnership-title-content">Trusted by Industry Leaders &amp; Creative Brands</h5>
            <PartnerLogos logos={clients ?? []} />
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section">
        <div className="hero-container">
          <div className="blog-content-container">
            <h2 className="section-title">Latest Insights in Film, Video &amp; Creativity</h2>
            <BlogGrid articles={(articles ?? []).slice(0, 3)} />
          </div>
        </div>
      </section>
    </main>
  );
}
