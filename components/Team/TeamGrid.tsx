import Link from "next/link";

import type { TeamMember } from "@/sanity/lib/types";

type Props = {
  members: TeamMember[];
  heading?: string;
  intro?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const socialIcons: { key: keyof NonNullable<TeamMember["socials"]>; icon: string }[] = [
  { key: "instagram", icon: "fa-brands fa-instagram" },
  { key: "x", icon: "fa-brands fa-x-twitter" },
  { key: "linkedin", icon: "fa-brands fa-linkedin" },
  { key: "dribbble", icon: "fa-brands fa-dribbble" },
];

export default function TeamGrid({
  members,
  heading = "Meet the Creative Minds Behind the Lens",
  intro = "Our team is a collective of visionary directors, cinematographers, editors, and storytellers who turn concepts into cinematic experiences.",
  ctaLabel = "View All Team",
  ctaHref = "/team",
}: Props) {
  return (
    <div className="row row-cols-lg-2 row-cols-1 grid-spacer-y-5 grid-spacer-x-3">
      <div className="col col-lg-4">
        <div className="team-title-container">
          <h2>{heading}</h2>
          <p>{intro}</p>
          <div>
            <Link href={ctaHref} className="btn btn-accent">
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
      <div className="col col-lg-8">
        <div className="row row-cols-md-2 row-cols-1 grid-spacer-3">
          {members.map((member) => (
            <div className="col" key={member.name}>
              <div className="team-container">
                <div className="image-container team-image">
                  {member.photo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={member.photo} alt="Team" className="img-fluid" />
                  )}
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between gspace-2">
                  <div className="d-flex flex-column">
                    <h4>{member.name}</h4>
                    <p className="team-designation">{member.role}</p>
                  </div>
                  <div className="d-flex flex-row align-items-center gspace-1">
                    {socialIcons
                      .filter(({ key }) => member.socials?.[key])
                      .map(({ key, icon }) => (
                        <a key={key} href={member.socials![key]!} className="social-icon">
                          <i className={icon} />
                        </a>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
