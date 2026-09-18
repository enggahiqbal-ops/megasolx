import Link from "next/link";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <main>
      <section className="section banner-inner banner-notfound notfound-banner">
        <div className="banner-overlay" />
        <div className="hero-container">
          <div className="banner-notfound-container">
            <span className="notfound-heading">404</span>
            <h2>Ooops! Page Not Found</h2>
            <p className="notfound-description">
              We&apos;re sorry, but the page you&apos;re looking for doesn&apos;t exist or has been moved. Let us
              help you get back on track with the right business solutions.
            </p>
            <Link href="/" className="btn btn-accent">
              Click Here
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
