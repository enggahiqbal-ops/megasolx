import Link from "next/link";
import { notFound } from "next/navigation";

import BlogGrid from "@/components/Blog/BlogGrid";
import CtaBanner from "@/components/CtaBanner/CtaBanner";
import PortableText from "@/components/PortableText/PortableText";
import { sanityFetch } from "@/sanity/lib/live";
import { ARTICLES_QUERY, ARTICLE_QUERY, ARTICLE_SLUGS_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { data } = await sanityFetch({ query: ARTICLE_SLUGS_QUERY, perspective: "published", stega: false });
  return (data ?? []).filter((a): a is { slug: string } => Boolean(a.slug));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { data: article } = await sanityFetch({ query: ARTICLE_QUERY, params: { slug }, stega: false });
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function SinglePostPage({ params }: Props) {
  const { slug } = await params;
  const [{ data: article }, { data: articles }, { data: settings }] = await Promise.all([
    sanityFetch({ query: ARTICLE_QUERY, params: { slug }, stega: false }),
    sanityFetch({ query: ARTICLES_QUERY, stega: false }),
    sanityFetch({ query: SETTINGS_QUERY, stega: false }),
  ]);
  if (!article) notFound();

  const otherArticles = (articles ?? []).filter((a) => a.slug !== slug);
  const recent = otherArticles.slice(0, 5);
  const categories = Array.from(new Set((articles ?? []).flatMap((a) => a.category ?? [])));

  return (
    <main>
      <section className="section banner-inner single-post-banner">
        <div className="banner-overlay" />
        <div className="hero-container">
          <div className="banner-inner-container">
            <h2>{article.title}</h2>
            <nav className="breadcrumb">
              <a href="/" className="breadcrumb-item">
                Home
              </a>
              <span className="separator">/</span>
              <span className="breadcrumb-item current">Single Post</span>
            </nav>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="hero-container">
          <div className="row row-cols-lg-2 row-cols-1 grid-spacer-lg-5 grid-spacer-x-3 grid-spacer-y-5">
            <div className="col col-lg-4 order-2 order-lg-1">
              <div className="d-flex flex-column gspace-5">
                {recent.length > 0 && (
                  <div className="card card-blog-post">
                    <h4>Recent Blog</h4>
                    <div className="recent-blog-list">
                      {recent.map((post) => (
                        <Link href={`/blog/${post.slug}`} className="recent-blog-item" key={post.slug}>
                          {post.image && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={post.image} alt="Blog Image" />
                          )}
                          <div className="recent-blog-content">
                            <span className="recent-blog-date">{post.date}</span>
                            <h5 className="recent-blog-heading">{post.title}</h5>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {categories.length > 0 && (
                  <div className="card card-blog-post">
                    <h4>Blog Categories</h4>
                    <ul className="dot-list">
                      {categories.map((category) => (
                        <li key={category}>
                          <p>{category}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {article.tags && article.tags.length > 0 && (
                  <div className="card card-blog-post">
                    <h4>Tags</h4>
                    <div className="d-flex flex-row flex-wrap gspace-1">
                      {article.tags.map((tag) => (
                        <span className="post-tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col col-lg-8 order-1 order-lg-2">
              <div className="d-flex flex-column gspace-2">
                {article.image && (
                  <div className="image-container post-image">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={article.image} alt="Single Post" className="img-fluid" />
                  </div>
                )}
                {article.body && <PortableText value={article.body} />}

                {article.tags && article.tags.length > 0 && (
                  <>
                    <div className="blog-post-divider" />
                    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-start justify-content-md-between gspace-2">
                      <div className="d-flex flex-row align-items-center gspace-1">
                        <h5>Tags:</h5>
                        <div className="post-tag-container">
                          {article.tags.map((tag) => (
                            <span className="post-tag" key={tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center gspace-1">
                        <h5>Share:</h5>
                        <div className="social-icon-container">
                          <a href="#" className="social-icon-post">
                            <i className="fa-brands fa-instagram" />
                          </a>
                          <a href="#" className="social-icon-post">
                            <i className="fa-brands fa-facebook" />
                          </a>
                          <a href="#" className="social-icon-post">
                            <i className="fa-brands fa-x-twitter" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="blog-post-divider" />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner ctaBanner={settings?.ctaBanner} className="section pt-0" />

      {otherArticles.length > 0 && (
        <section className="section">
          <div className="hero-container">
            <div className="blog-content-container">
              <h2 className="section-title">Latest Insights in Film, Video &amp; Creativity</h2>
              <BlogGrid articles={otherArticles.slice(0, 3)} />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
