import BlogGrid from "@/components/Blog/BlogGrid";
import { sanityFetch } from "@/sanity/lib/live";
import { ARTICLES_QUERY } from "@/sanity/lib/queries";

export const metadata = { title: "Blog" };

export default async function BlogPage() {
  const { data: articles } = await sanityFetch({ query: ARTICLES_QUERY, stega: false });

  return (
    <main>
      <section className="section banner-inner blog-banner">
        <div className="banner-overlay" />
        <div className="hero-container">
          <div className="banner-inner-container">
            <h2>Blog</h2>
            <nav className="breadcrumb">
              <a href="/" className="breadcrumb-item">
                Home
              </a>
              <span className="separator">/</span>
              <span className="breadcrumb-item current">Our Blog</span>
            </nav>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="hero-container">
          <div className="blog-content-container">
            <BlogGrid articles={articles ?? []} />
          </div>
        </div>
      </section>
    </main>
  );
}
