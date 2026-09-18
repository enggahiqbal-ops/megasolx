import Link from "next/link";

import type { PricingPlan } from "@/sanity/lib/types";

type Props = {
  plans: PricingPlan[];
  withJustifyBetween?: boolean;
};

export default function PricingCards({ plans, withJustifyBetween = false }: Props) {
  return (
    <div className="row row-cols-lg-3 row-cols-1 grid-spacer-3">
      {plans.map((plan) => (
        <div className="col" key={plan.name}>
          <div className="card card-pricing">
            <div
              className={`d-flex flex-row gspace-2 align-items-center ${
                withJustifyBetween ? "justify-content-between" : ""
              }`}
            >
              <div className="d-flex flex-column gspace-1">
                <h4>{plan.name}</h4>
                <p className="pricing-description">{plan.description}</p>
              </div>
              <span className="price">{plan.price}</span>
            </div>
            <div className="pricing-divider" />
            <Link href="/contact" className="btn btn-accent btn-pricing">
              {plan.ctaLabel}
            </Link>
            <ul className="pricing-detail-list">
              {(plan.features ?? []).map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
