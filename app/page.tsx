import Hero from "@/components/Hero/Hero";
import Showreel from "@/components/Showreel/Showreel";
import IntroStatement from "@/components/Hero/IntroStatement";
import HomepageLogos from "@/components/HomepageLogos/HomepageLogos";
import ProjectGrid from "@/components/ProjectGrid/ProjectGrid";
import AboutSection from "@/components/About/AboutSection";
import NewsFeed from "@/components/News/NewsFeed";
import { getFeaturedProjects } from "@/data/projects";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <main>
      <Hero />

      <div className="relative">
        <Showreel />
        <div className="relative z-10 -mt-[50vh] bg-[var(--color-purple-bg)]">
          <IntroStatement />
          <HomepageLogos />
        </div>
      </div>

      <section className="container-wide -mt-[20vh] pb-16 md:pb-24">
        <ProjectGrid projects={featured} />
      </section>

      <AboutSection />
      <NewsFeed />
    </main>
  );
}
