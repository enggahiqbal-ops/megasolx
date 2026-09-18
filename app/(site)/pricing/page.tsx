import Link from "next/link";

import Accordion, { type AccordionItem } from "@/components/Accordion/Accordion";
import PricingCards from "@/components/Pricing/PricingCards";
import VideoBackground from "@/components/Video/VideoBackground";
import { sanityFetch } from "@/sanity/lib/live";
import { PRICING_PAGE_QUERY, PRICING_PLANS_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";

export const metadata = { title: "Pricing Plan" };

const defaultFaqs = [
  {
    question: "What's included in each pricing plan?",
    answer:
      "Each plan includes pre-production consultation, filming with professional equipment, editing, color grading, and final delivery. Higher-tier packages offer advanced features like drone footage, scriptwriting, and multiple shooting days.",
  },
  {
    question: "Can I customize a plan based on my project needs?",
    answer:
      "Absolutely! We understand that every story is unique. Reach out to us and we'll tailor a custom package that fits your creative goals and budget.",
  },
  {
    question: "Do you offer revisions after the final delivery?",
    answer: "Yes. All our plans include up to 2 rounds of revisions. Premium plans offer more flexibility for feedback and fine-tuning.",
  },
  {
    question: "How long does it take to complete a video project?",
    answer:
      "Project timelines vary based on complexity, but most videos are completed within 2-4 weeks. We'll give you a detailed schedule during onboarding.",
  },
  {
    question: "Are there any hidden fees?",
    answer:
      "No hidden charges. All costs are clearly outlined in your chosen package. If any additional services are required, we'll communicate them upfront.",
  },
  {
    question: "Do you provide voiceovers, music licensing, and subtitles?",
    answer:
      "Yes. Voiceovers, royalty-free music licensing, and subtitle options are available depending on your plan, or as add-ons.",
  },
];

export default async function PricingPage() {
  const [{ data: pricingPage }, { data: plans }, { data: settings }] = await Promise.all([
    sanityFetch({ query: PRICING_PAGE_QUERY, stega: false }),
    sanityFetch({ query: PRICING_PLANS_QUERY, stega: false }),
    sanityFetch({ query: SETTINGS_QUERY, stega: false }),
  ]);

  const faqs = pricingPage?.faqs?.length ? pricingPage.faqs : defaultFaqs;
  const highlight = settings?.highlightCta;

  const faqItems: AccordionItem[] = faqs.map((faq, i) => ({
    id: `faq-${i}`,
    headerClassName: "faq-accordion-header",
    buttonLabel: faq.question,
    children: <p>{faq.answer}</p>,
  }));

  return (
    <main>
      <section className="section banner-inner pricing-banner">
        <div className="banner-overlay" />
        <div className="hero-container">
          <div className="banner-inner-container">
            <h2>Pricing Plan</h2>
            <nav className="breadcrumb">
              <a href="/" className="breadcrumb-item">
                Home
              </a>
              <span className="separator">/</span>
              <span className="breadcrumb-item current">Packages</span>
            </nav>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="hero-container">
          <div className="pricing-content-container">
            <h2 className="pricing-content-title">{pricingPage?.heading ?? "Choose a Plan That Fits Your Vision"}</h2>
            <div className="heading-highlight-container">
              <span className="pricing-heading-highlight">Pricing Plants</span>
            </div>
            <PricingCards plans={plans ?? []} />
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

      <div className="section">
        <div className="hero-container">
          <div className="faq-content-wrapper">
            <div className="d-flex flex-column flex-md-row flex-lg-column gspace-2 align-items-center justify-content-between h-100">
              <h2>Frequently Asked question</h2>
              <div className="d-flex flex-column gspace-2">
                <p>
                  Got questions about our pricing? We&apos;ve got answers to help you choose the perfect plan for your
                  next film or video project.
                </p>
                <div>
                  <Link href="/contact" className="btn btn-accent">
                    Free Consultation
                  </Link>
                </div>
              </div>
            </div>
            <Accordion id="faqAccordion" items={faqItems} defaultOpenId="faq-0" />
          </div>
        </div>
      </div>
    </main>
  );
}
