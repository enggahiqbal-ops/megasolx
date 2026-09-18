"use client";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import type { ClientLogo } from "@/sanity/lib/types";

type Props = {
  logos: ClientLogo[];
};

const fallbackLogos = [
  "/assets/montra/images/Client-6.png",
  "/assets/montra/images/Client-7.png",
  "/assets/montra/images/Client-5.png",
  "/assets/montra/images/Client-1.png",
  "/assets/montra/images/Client-2.png",
];

export default function PartnerLogos({ logos }: Props) {
  const slides = logos.length
    ? logos.map((logo) => ({ key: logo.id, src: logo.logo, name: logo.name }))
    : fallbackLogos.map((src, i) => ({ key: String(i), src, name: "Partner" }));

  return (
    <Swiper
      className="swiper swiperpartner"
      modules={[Autoplay]}
      loop
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      slidesPerView={2}
      spaceBetween={24}
      breakpoints={{
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 6 },
      }}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.key}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slide.src ?? undefined} alt={slide.name ?? "Partner"} className="partner-image" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
