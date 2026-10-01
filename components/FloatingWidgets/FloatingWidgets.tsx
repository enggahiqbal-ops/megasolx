import type { SiteSettings } from "@/sanity/lib/types";

export default function FloatingWidgets({
  settings,
}: {
  settings: SiteSettings | null;
}) {
  const widgets = settings?.floatingWidgets;
  const digits = widgets?.whatsappNumber?.replace(/\D/g, "");
  const message = widgets?.whatsappMessage?.trim();
  const whatsappHref = digits
    ? `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`
    : null;
  const fiverrHref = widgets?.fiverrUrl || null;

  if (!whatsappHref && !fiverrHref) return null;

  const base: React.CSSProperties = {
    width: 56,
    height: 56,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
    textDecoration: "none",
  };

  return (
    <div
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        zIndex: 1050,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {fiverrHref && (
        <a
          href={fiverrHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open our Fiverr profile"
          title="Fiverr"
          style={{ ...base, background: "#1dbf73" }}
        >
          <svg viewBox="6.5 5 11 13" width={26} fill="currentColor" aria-hidden="true">
            <path d="M11.793 5.784c-1.843 0-3.086 1.157-3.086 2.828v.644H7.25v2.142h1.457v5.744h2.528v-5.744h2.444v5.744h2.528V9.256h-4.972v-.472c0-.514.387-.857.944-.857h1.5V5.784z" />
          </svg>
        </a>
      )}
      {whatsappHref && (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          title="WhatsApp"
          style={{ ...base, background: "#25d366", fontSize: 30 }}
        >
          <i className="fa-brands fa-whatsapp" />
        </a>
      )}
    </div>
  );
}
