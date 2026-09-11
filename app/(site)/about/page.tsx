import { sanityFetch } from "@/sanity/lib/live";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";

export const metadata = { title: "About" };

export default async function AboutPage() {
  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
    stega: false,
  });

  return (
    <main className="container-wide py-24">
      <h1 className="text-[clamp(2.5rem,8vw,6.25rem)] font-medium text-[var(--color-secondary)]">
        {settings?.aboutHeading ?? "About"}
      </h1>
      <div className="mt-6 max-w-2xl space-y-4 text-lg text-[var(--color-muted)]">
        {(settings?.aboutCopy ?? []).map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
    </main>
  );
}
