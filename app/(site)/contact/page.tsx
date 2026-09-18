import ContactForm from "@/components/Contact/ContactForm";
import Accordion, { type AccordionItem } from "@/components/Accordion/Accordion";
import { sanityFetch } from "@/sanity/lib/live";
import { CONTACT_PAGE_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";

export const metadata = { title: "Contact Us" };

const defaultFaqs = [
  {
    question: "How long does it take to get a response after I submit?",
    answer:
      "We typically respond within 24 hours on business days. If your request is urgent, feel free to call us directly for faster communication.",
  },
  {
    question: "Can I schedule a meeting before discussing project details?",
    answer:
      "Absolutely! We offer free initial consultations to better understand your goals and guide you through the creative process.",
  },
  {
    question: "What information should I include in my message?",
    answer:
      "Please provide as much detail as possible — including your project type, timeline, budget range, and any creative references.",
  },
  {
    question: "Where is your studio located and can I visit in person?",
    answer:
      "Our studio is based in Los Angeles, CA. In-person meetings are available by appointment only. We also offer virtual meetings for clients worldwide.",
  },
  {
    question: "Do you work with clients outside of the US?",
    answer:
      "Yes, we collaborate with brands, artists, and companies globally. Our team is fully equipped to manage international productions.",
  },
  {
    question: "How do I follow up if I haven't received a response?",
    answer:
      "If you haven't heard from us within 48 hours, please check your spam folder or reach out to us directly via email.",
  },
];

export default async function ContactPage() {
  const [{ data: contactPage }, { data: settings }] = await Promise.all([
    sanityFetch({ query: CONTACT_PAGE_QUERY, stega: false }),
    sanityFetch({ query: SETTINGS_QUERY, stega: false }),
  ]);

  const faqs = contactPage?.faqs?.length ? contactPage.faqs : defaultFaqs;
  const [faqColumn1, faqColumn2] = [faqs.slice(0, 3), faqs.slice(3, 6)];

  function toAccordionItems(items: typeof faqs, prefix: string): AccordionItem[] {
    return items.map((faq, i) => ({
      id: `${prefix}${i}`,
      headerClassName: "faq-accordion-header",
      buttonLabel: faq.question,
      children: <p>{faq.answer}</p>,
    }));
  }

  return (
    <main>
      <section className="section banner-inner contact-banner">
        <div className="banner-overlay" />
        <div className="hero-container">
          <div className="banner-inner-container">
            <h2>Contact Us</h2>
            <nav className="breadcrumb">
              <a href="/" className="breadcrumb-item">
                Home
              </a>
              <span className="separator">/</span>
              <span className="breadcrumb-item current">Contact Us</span>
            </nav>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="hero-container">
          <div className="contact-content-wrapper">
            <div className="row row-cols-md-2 row-cols-1 grid-spacer-2">
              <div className="col">
                <div className="heading-container">
                  <h2 className="contact-content-heading">{contactPage?.heading ?? "Let's Work Together"}</h2>
                </div>
              </div>
              <div className="col">
                <div className="contact-description-container">
                  <p>
                    {contactPage?.body ??
                      "Whether you're ready to start a project or just exploring your options, we're here to help. Reach out and let's make something amazing together."}
                  </p>
                </div>
              </div>
            </div>

            <div className="row row-cols-lg-2 row-cols-md-2 row-cols-1 grid-spacer-2">
              <div className="col col-lg-4 col-md-6">
                <div className="d-flex flex-column gspace-5">
                  <div className="d-flex flex-column gspace-2">
                    <span className="contact-info-heading">Phone Number</span>
                    <h4>{settings?.contact?.phone ?? "+1 (234) 567-8901"}</h4>
                  </div>
                  <div className="d-flex flex-column gspace-2">
                    <span className="contact-info-heading">Email Address</span>
                    <h4>{settings?.email ?? "hello@montrastudio.com"}</h4>
                  </div>
                  <div className="d-flex flex-column gspace-2">
                    <span className="contact-info-heading">Bussiness Hours</span>
                    <h4>{settings?.contact?.businessHours ?? "Mon - Fri: 9AM - 6PM"}</h4>
                  </div>
                  <div className="d-flex flex-column gspace-2">
                    <span className="contact-info-heading">Studio Location</span>
                    <h4>{settings?.contact?.address ?? "123 Montra Studio Bulevard., Los Angeles, CA 90210"}</h4>
                  </div>
                  <div className="d-flex flex-column gspace-2">
                    <span className="contact-info-heading">Social Media</span>
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
              <div className="col col-lg-8 col-md-6">
                <div className="d-flex flex-column gspace-2">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section p-0">
        <iframe
          loading="lazy"
          className="maps"
          src={
            settings?.contact?.mapEmbedUrl ??
            "https://maps.google.com/maps?q=Los%20Angeles%2C%20CA&t=m&z=12&output=embed&iwloc=near"
          }
          title="Studio location"
          aria-label="Studio location"
        />
      </section>

      <div className="section">
        <div className="hero-container">
          <div className="faq-contact-wrapper">
            <div className="faq-heading-container">
              <h2>Frequently Asked Question</h2>
            </div>
            <div className="row row-cols-lg-2 row-cols-1 grid-spacer-2">
              <div className="col">
                <Accordion id="faqAccordion1" items={toAccordionItems(faqColumn1, "faq1-")} defaultOpenId="faq1-0" />
              </div>
              <div className="col">
                <Accordion id="faqAccordion2" items={toAccordionItems(faqColumn2, "faq2-")} defaultOpenId="faq2-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
