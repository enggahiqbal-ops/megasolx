import Link from "next/link";

import Accordion, { type AccordionItem } from "@/components/Accordion/Accordion";
import VideoBackground from "@/components/Video/VideoBackground";
import type { Service } from "@/sanity/lib/types";

type Props = {
  services: Service[];
};

const fallbackVideoId = "pVA0G01aDfk";

export default function ServicesAccordion({ services }: Props) {
  const items: AccordionItem[] = services.map((service, index) => ({
    id: service.slug ?? String(index),
    itemClassName: `service-acc-${index + 1}`,
    headerClassName: "service-accordion-header",
    buttonLabel: service.title,
    children: (
      <div className="service-content-container">
        <VideoBackground
          className="service-video-bg"
          videoId={service.heroVideoId ?? fallbackVideoId}
          start={index * 20 + 4}
          end={index * 20 + 20}
        />
        <div className="service-video-content">
          <div className="row row-cols-md-2 row-cols-1 grid-spacer-2">
            <div className="col col-md-9">
              <div className="d-flex flex-column-reverse flex-lg-row gspace-2 justify-content-between w-100">
                <div className="service-description-content">
                  <p className="mb-0">{service.shortDescription}</p>
                </div>
                <div className="service-tag-container">
                  {(service.tags ?? []).map((tag) => (
                    <span key={tag} className="service-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="col col-md-3">
              <div className="d-flex flex-column align-items-start align-items-md-end justify-content-center h-100">
                <Link href={`/services/${service.slug}`} className="btn btn-accent">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  }));

  return <Accordion id="serviceAccordion" items={items} />;
}
