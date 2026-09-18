"use client";

import { useState } from "react";

import ProjectTypeSelect from "@/components/Contact/ProjectTypeSelect";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    setStatus(name && email ? "success" : "error");
  }

  return (
    <>
      {status === "success" && (
        <div id="success-message" className="alert success">
          <span className="check-icon">
            <i className="fa-solid fa-2xl fa-check" />
          </span>
          <p>Thank you! Form submitted successfully.</p>
        </div>
      )}
      {status === "error" && (
        <div id="error-message" className="alert error">
          <span className="cross-icon">
            <i className="fa-solid fa-2xl fa-xmark" />
          </span>
          <p>Oops! Please fill in your name and email.</p>
        </div>
      )}
      <div className="card card-contact-form">
        <h3>Send us a Messae</h3>
        <form id="contact-form" className="form" onSubmit={handleSubmit}>
          <div className="row row-cols-lg-2 row-cols-1 grid-spacer-2">
            <div className="col">
              <input type="text" name="name" id="name" placeholder="Full Name" />
            </div>
            <div className="col">
              <input type="email" name="email" id="email" placeholder="Email Address" />
            </div>
            <div className="col">
              <input type="tel" name="phone" id="phone" placeholder="Phone Number" />
            </div>
            <div className="col">
              <input type="text" name="subject" id="subject" placeholder="Subject" />
            </div>
            <div className="col col-lg-12">
              <ProjectTypeSelect />
            </div>
            <div className="col col-lg-12">
              <textarea name="message" rows={6} id="Message" placeholder="Message" />
            </div>
          </div>
          <div>
            <button type="submit" className="btn btn-accent">
              <span>Send Message</span>
              <i className="fa-solid fa-chevron-circle-right" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
