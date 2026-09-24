"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = (event.currentTarget.elements.namedItem("newsletter") as HTMLInputElement)?.value.trim();
    setStatus(email ? "success" : "error");
  }

  return (
    <>
      {status === "success" && (
        <div id="newsletter-success" className="alert success">
          <span className="check-icon">
            <i className="fa-solid fa-2xl fa-check" />
          </span>
          <p className="text-center">Thank you! Form submitted successfully.</p>
        </div>
      )}
      {status === "error" && (
        <div id="newsletter-error" className="alert error">
          <span className="cross-icon">
            <i className="fa-solid fa-2xl fa-xmark" />
          </span>
          <p className="text-center">Oops! Please enter a valid email address.</p>
        </div>
      )}
      <form id="newsletter-form" className="form" onSubmit={handleSubmit}>
        <input type="email" id="newsletter" name="newsletter" placeholder="Hello@megasolx.com" />
        <button type="submit" className="btn btn-accent-primary">
          Subscribe Now
        </button>
      </form>
    </>
  );
}
