import Link from "next/link";

import BlogGrid from "@/components/Blog/BlogGrid";
import TestimonialGrid from "@/components/Testimonials/TestimonialGrid";
import VideoBackground from "@/components/Video/VideoBackground";
import { sanityFetch } from "@/sanity/lib/live";
import { ARTICLES_QUERY, SETTINGS_QUERY, TESTIMONIALS_QUERY } from "@/sanity/lib/queries";

export const metadata = { title: "Testimonial" };

export default async function TestimonialPage() {
  const [{ data: testimonials }, { data: settings }, { data: articles }] = await Promise.all([
    sanityFetch({ query: TESTIMONIALS_QUERY, stega: false }),
    sanityFetch({ query: SETTINGS_QUERY, stega: false }),
    sanityFetch({ query: ARTICLES_QUERY, stega: false }),
  ]);

  const highlight = settings?.highlightCta;

  return (
    <main>
      <section className="section banner-inner testimonial-banner">
        <div className="banner-overlay" />
        <div className="hero-container">
          <div className="banner-inner-container">
            <h2>What Client Says</h2>
            <nav className="breadcrumb">
              <a href="/" className="breadcrumb-item">
                Home
              </a>
              <span className="separator">/</span>
              <span className="breadcrumb-item current">Testimonial</span>
            </nav>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="testimonial-card-container p-0">
          <div className="hero-container">
            <TestimonialGrid testimonials={testimonials ?? []} />
          </div>
        </div>
      </section>

      <section className="section cta-highlight-banner">
        <VideoBackground className="cta-highlight-video" videoId={highlight?.videoId ?? "fOTgmsqMnQA"} />
        <div className="hero-container">
          <div className="cta-highlight-content">
            <h2 className="cta-highlight-title">{highlight?.heading ?? "Ready to Bring Your Story to Life?"}</h2>
            <p className="cta-highlight-text">
              From commercials to cinematic narratives, our team is here to turn your vision into visual magic.
              Choose a plan and let&apos;s start crafting something unforgettable.
            </p>
            <div>
              <Link href={highlight?.buttonHref ?? "/contact"} className="btn btn-accent">
                {highlight?.buttonLabel ?? "Get Started Today"}
              </Link>
            </div>
          </div>
        </div>
      </section>

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
