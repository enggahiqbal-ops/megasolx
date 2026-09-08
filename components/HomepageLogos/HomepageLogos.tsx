"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clients } from "@/data/clients";

gsap.registerPlugin(ScrollTrigger);

export default function HomepageLogos() {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const items = list.querySelectorAll("[data-logo]");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: "100%" },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: list,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, list);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="container-wide pb-16 pt-4 md:pb-24 md:pt-8"
      aria-label="Selected clients"
    >
      <ul
        ref={listRef}
        className="flex flex-wrap items-center justify-center gap-x-10 gap-y-10 md:gap-x-14 lg:gap-x-20"
      >
        {clients.map((client) => (
          <li key={client.id} data-logo className="opacity-0">
            <Image
              src={client.logo}
              alt={client.name}
              width={client.width}
              height={client.height}
              className="h-[22px] w-auto brightness-0 invert opacity-70 transition-opacity duration-300 hover:opacity-100 md:h-[44px]"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
