import type { Testimonial } from "@/sanity/lib/types";

type Props = {
  testimonials: Testimonial[];
};

export default function TestimonialGrid({ testimonials }: Props) {
  const columns = [
    testimonials.slice(0, 2),
    testimonials.slice(2, 4),
    testimonials.slice(4, 6),
  ];

  return (
    <div className="row row-cols-lg-3 row-cols-1 grid-spacer-3">
      {columns.map((column, i) => (
        <div className="col" key={i}>
          <div className="d-flex flex-column flex-md-row flex-lg-column gspace-3">
            {column.map((testimonial) => (
              <div className="card card-testimonial" key={testimonial.name}>
                <div className="d-flex flex-row align-items-center">
                  <i className="fa-solid fa-quote-right testimonial-icon" />
                  <span className="testimonial-heading">{testimonial.role}</span>
                </div>
                <p>&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="d-flex flex-row gspace-2 align-items-center">
                  <div className="testimonial-image">
                    {testimonial.avatar && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={testimonial.avatar} alt="Testimonial" className="img-fluid" />
                    )}
                  </div>
                  <div className="d-flex flex-column">
                    <h6>{testimonial.name}</h6>
                    <p className="testimonial-designation">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
