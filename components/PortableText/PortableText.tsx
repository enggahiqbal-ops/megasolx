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
      <p className="mb-6 text-lg leading-relaxed text-[var(--color-secondary)]">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-12 text-3xl font-medium text-[var(--color-secondary)]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 text-xl font-medium text-[var(--color-secondary)]">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-[var(--color-primary)] pl-6 text-xl text-[var(--color-muted)]">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="underline underline-offset-4 hover:text-[var(--color-primary-text)]"
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
            className="h-auto w-full rounded-[var(--radius-sm)]"
          />
          {value.alt ? (
            <figcaption className="mt-2 text-sm text-[var(--color-muted)]">
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
