import Link from "next/link";

import VideoBackground from "@/components/Video/VideoBackground";
import VideoPlayButton from "@/components/Video/VideoPlayButton";
import type { Project } from "@/sanity/lib/types";

type Props = {
  projects: Project[];
};

const fallbackVideoIds = ["Go8gUX_HZAY", "LqTk5IbBxgs", "Np4EN8ZPMFU", "DOeuljcKkTI", "BCKMzk2rRKo"];
const spanClasses = ["", "", "col-12 w-100", "", ""];
const tallVariants = new Set([0, 4]);
const wideVariants = new Set([2]);

export default function ProjectGrid({ projects }: Props) {
  return (
    <div className="project-content-container">
      <div className="row row-cols-lg-2 row-cols-1 grid-spacer-x-5 grid-spacer-y-120">
        {projects.map((project, index) => {
          const spot = index % 5;
          const containerClass = tallVariants.has(spot)
            ? "project-video-container project-video-container--tall"
            : wideVariants.has(spot)
              ? "project-video-container project-video-container--wide"
              : "project-video-container";
          const videoId = project.heroVideoId ?? fallbackVideoIds[spot];

          return (
            <div className={`col ${spanClasses[spot]}`} key={project.slug}>
              <div className="d-flex flex-column gspace-2 justify-content-center align-items-center h-100">
                <div className={containerClass}>
                  <VideoBackground className="project-video-bg" videoId={videoId} />
                  <div>
                    <VideoPlayButton videoId={videoId} />
                  </div>
                </div>
                <div className="d-flex flex-row gspace-2 justify-content-between align-items-center flex-wrap w-100">
                  <h3 className="project-title">
                    <Link href={`/project/${project.slug}`}>{project.title}</Link>
                  </h3>
                  <div className="d-flex flex-row gspace-1 align-items-center">
                    <i className="fa-solid fa-circle-dot accent-color" />
                    <span className="project-category">{project.tags?.[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
