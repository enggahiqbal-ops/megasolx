import Link from "next/link";

import type { Article } from "@/sanity/lib/types";

type Props = {
  articles: Article[];
};

export default function BlogGrid({ articles }: Props) {
  return (
    <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 grid-spacer-3">
      {articles.map((article) => (
        <div className="col" key={article.slug}>
          <div className="card card-blog">
            <div className="image-container blog-image">
              {article.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={article.image} alt="Blog Image" className="img-fluid" />
              )}
            </div>
            <div className="card-blog-content">
              <div className="d-flex flex-row align-items-center justify-content-between">
                <div className="d-flex flex-row gspace-1 align-items-center">
                  <i className="fa-solid fa-calendar accent-color" />
                  <span className="meta-data">{article.date}</span>
                </div>
                <div className="d-flex flex-row gspace-1 align-items-center">
                  <i className="fa-solid fa-folder accent-color" />
                  <span className="meta-data">{article.category?.[0]}</span>
                </div>
              </div>
              <Link href={`/blog/${article.slug}`} className="blog-title">
                {article.title}
              </Link>
              <p className="mb-0">{article.excerpt}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
