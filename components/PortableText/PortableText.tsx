import Image from "next/image";
import {
  PortableText as PortableTextPrimitive,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";

import type { SanityImageSource } from "@sanity/image-url";

import { urlForImage } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed last:mb-0">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 font-display-condensed text-2xl uppercase text-white">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 font-display-condensed text-xl uppercase text-white">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-white/30 pl-6 italic text-white/80">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="underline underline-offset-4 hover:text-white"
        {...(value?.href?.startsWith("http")
          ? { target: "_blank", rel: "noreferrer" }
          : {})}
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-10">
          <Image
            src={urlForImage(value as SanityImageSource)
              .width(1600)
              .url()}
            alt={value.alt ?? ""}
            width={1600}
            height={900}
            className="h-auto w-full"
          />
          {value.alt ? (
            <figcaption className="mt-2 text-sm text-white/50">

              {value.alt}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

export default function PortableText({ value }: { value?: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return (
    <PortableTextPrimitive
      value={value as PortableTextBlock[]}
      components={components}
    />
  );
}
