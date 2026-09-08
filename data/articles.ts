export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string[];
  date: string;
  readTime: string;
  author: { name: string; avatar: string };
  image: string;
};

export const articles: Article[] = [
  {
    slug: "craft-in-a-post-ai-world",
    title: "Craft in a post-AI world",
    excerpt:
      "AI can generate output for someone, but craft requires intention, thought and care that only humans bring.",
    category: ["Opinion", "Design"],
    date: "12 Dec 2025",
    readTime: "6 min read",
    author: { name: "Alex Morgan", avatar: "/images/authors/author-01.jpg" },
    image: "/images/articles/article-01.svg",
  },
  {
    slug: "what-does-a-good-website-cost",
    title: "What does a good website cost?",
    excerpt:
      "Cost alone is a poor marker for success. Quality reduces technical debt and maintenance over time.",
    category: ["Opinion"],
    date: "2 Oct 2025",
    readTime: "7 min read",
    author: { name: "Alex Morgan", avatar: "/images/authors/author-01.jpg" },
    image: "/images/articles/article-02.svg",
  },
  {
    slug: "understanding-wcag-22",
    title: "Understanding WCAG 2.2",
    excerpt:
      "New accessibility criteria target cognitive barriers with clearer plans for inclusive experiences.",
    category: ["Accessibility", "Development"],
    date: "18 Sep 2025",
    readTime: "8 min read",
    author: { name: "Sam Lee", avatar: "/images/authors/author-02.jpg" },
    image: "/images/articles/article-03.svg",
  },
  {
    slug: "turning-insight-into-impact",
    title: "Turning insight into impact",
    excerpt:
      "Empathetic design respects the human experience and promotes stronger engagement.",
    category: ["Design", "User Experience"],
    date: "15 Aug 2025",
    readTime: "5 min read",
    author: { name: "Alex Morgan", avatar: "/images/authors/author-01.jpg" },
    image: "/images/articles/article-04.svg",
  },
];
