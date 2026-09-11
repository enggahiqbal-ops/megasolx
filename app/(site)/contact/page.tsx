import { sanityFetch } from "@/sanity/lib/live";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";

export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
    stega: false,
  });
  const email = settings?.email ?? "hello@example.com";

  return (
    <main className="relative grid min-h-screen grid-rows-[1fr_auto]">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#7360e4] to-[#90f188] opacity-30" />
      <section className="container flex flex-col justify-center py-24">
        <h1 className="max-w-3xl text-[clamp(2.5rem,8vw,5rem)] font-medium leading-tight text-[var(--color-secondary)]">
          We&apos;ve got a great feeling about this
        </h1>
        <a
          href={`mailto:${email}`}
          className="mt-8 inline-flex w-fit rounded-full bg-[var(--color-secondary)] px-6 py-3 text-white transition hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)]"
        >
          Submit a brief
        </a>
      </section>
    </main>
  );
}
