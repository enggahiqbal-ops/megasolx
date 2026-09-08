import { siteConfig } from "@/data/site";
import Reveal from "@/components/Reveal/Reveal";

export default function IntroStatement() {
  return (
    <section className="container-wide py-24 text-center md:py-40">
      <Reveal>
        <p className="mx-auto max-w-[104.738rem] text-[clamp(2.1875rem,4.56vw,8.3125rem)] font-medium leading-none text-white">
          {siteConfig.introStatement}
        </p>
      </Reveal>
    </section>
  );
}
