import { useState, useEffect, useRef, type FormEvent } from "react"
import { Link, useSearchParams } from "react-router-dom"
import site from "@/data/site.json"
import data from "@/data/contactPage.json"
import {
  Newsletter,
  PageHero,
  submitToNetlify,
  Honeypot,
  FormErrorNote,
} from "@/components/shared"

export default function ContactPage() {
  const [params] = useSearchParams()
  const s = data.section,
    c = site.contact
  const initialSubject = s.subjects.includes(params.get("subject") || "")
    ? params.get("subject")!
    : ""
  const location = params.get("location")
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: initialSubject,
    message: location
      ? "I would like to ask about the " + location + " chapter.\n\n"
      : "",
    agreed: false,
  })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  )
  const confirmation = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (status === "sent") confirmation.current?.focus()
  }, [status])
  function field(key: "name" | "email" | "phone" | "subject" | "message") {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => setForm((f) => ({ ...f, [key]: e.target.value }))
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === "sending" || !form.agreed) return
    const honeypot = String(
      new FormData(e.currentTarget).get("bot-field") || "",
    )
    setStatus("sending")
    try {
      await submitToNetlify("contact", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
        agreed: "yes",
        "bot-field": honeypot,
      })
      if (!honeypot)
        fetch("/.netlify/functions/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "contact",
            email: form.email,
            name: form.name,
          }),
        }).catch(() => {})
      setStatus("sent")
    } catch {
      setStatus("error")
    }
  }
  return (
    <>
      <PageHero
        image={data.hero.image}
        title={data.hero.title}
        breadcrumbHome={data.hero.breadcrumbHome}
        breadcrumbCurrent={data.hero.breadcrumbCurrent}
      />
      <section className="experience-section">
        <div className="experience-container experience-contact">
          <div>
            <span className="experience-eyebrow">Let’s talk</span>
            <h2 className="experience-heading">{s.heading}</h2>
            <p className="experience-copy">{s.paragraph}</p>
            <dl className="experience-contact-details">
              <div>
                <dt>Call us</dt>
                <dd>
                  <a
                    href={
                      "tel:+234" +
                      c.phone.replace(/\D/g, "").replace(/^2340?/, "")
                    }
                  >
                    {c.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Email us</dt>
                <dd>
                  <a href={"mailto:" + c.email}>{c.email}</a>
                </dd>
              </div>
              <div>
                <dt>Visit us</dt>
                <dd>{c.footerAddress}</dd>
              </div>
              <div>
                <dt>Working hours</dt>
                <dd>
                  {c.hoursWeekday}
                  <br />
                  {c.hoursSaturday}
                </dd>
              </div>
            </dl>
            <p className="experience-copy text-sm">
              For volunteering or membership, you can also use our{" "}
              <Link className="underline" to="/become-a-volunteer">
                volunteer application
              </Link>{" "}
              or{" "}
              <Link className="underline" to="/become-a-member">
                membership enquiry
              </Link>
              .
            </p>
          </div>
          <div className="experience-form-panel">
            <h2 className="text-2xl font-bold text-[var(--green-dark)] mb-3">
              {s.formHeading}
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Tell us what you need help with. Our team will review your message
              and reply using the contact details you provide.
            </p>
            {status === "sent" ? (
              <div
                className="experience-success"
                role="status"
                ref={confirmation}
                tabIndex={-1}
              >
                <h3>Thank you for reaching out.</h3>
                <p>
                  Your message has been received. Our team will review it and
                  follow up by email. You do not need to submit it again.
                </p>
                <button
                  className="experience-link"
                  type="button"
                  onClick={() => {
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      subject: "",
                      message: "",
                      agreed: false,
                    })
                    setStatus("idle")
                  }}
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="experience-form"
              >
                <input type="hidden" name="form-name" value="contact" />
                <Honeypot />
                <div className="experience-form-row">
                  <label htmlFor="contact-name">
                    Your name
                    <input
                      id="contact-name"
                      autoComplete="name"
                      name="name"
                      value={form.name}
                      onChange={field("name")}
                      required
                      disabled={status === "sending"}
                    />
                  </label>
                  <label htmlFor="contact-email">
                    Email address
                    <input
                      id="contact-email"
                      autoComplete="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={field("email")}
                      required
                      disabled={status === "sending"}
                    />
                  </label>
                </div>
                <div className="experience-form-row">
                  <label htmlFor="contact-phone">
                    Phone number <span>(optional)</span>
                    <input
                      id="contact-phone"
                      autoComplete="tel"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={field("phone")}
                      disabled={status === "sending"}
                    />
                  </label>
                  <label htmlFor="contact-subject">
                    What is your message about?
                    <select
                      id="contact-subject"
                      name="subject"
                      value={form.subject}
                      onChange={field("subject")}
                      required
                      disabled={status === "sending"}
                    >
                      <option value="">Choose a subject</option>
                      {s.subjects.map((subject) => (
                        <option key={subject}>{subject}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <label htmlFor="contact-message">
                  Your message
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={field("message")}
                    required
                    disabled={status === "sending"}
                  />
                </label>
                <div className="experience-consent">
                  <input
                    id="contact-agreed"
                    name="agreed"
                    type="checkbox"
                    checked={form.agreed}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, agreed: e.target.checked }))
                    }
                    required
                    disabled={status === "sending"}
                  />
                  <label htmlFor="contact-agreed">
                    I have read the{" "}
                    <Link to="/privacy-policy" className="underline">
                      privacy policy
                    </Link>{" "}
                    and agree to my details being used to respond to this
                    message.
                  </label>
                </div>
                <button
                  className="experience-button"
                  type="submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending…" : s.sendButtonText}
                </button>
                {status === "error" && <FormErrorNote email={c.email} />}
              </form>
            )}
          </div>
        </div>
      </section>
      <section className="experience-container pb-16">
        <h2 className="experience-heading">Find us in Jos</h2>
        <iframe
          title="Ochaworth location in Jos"
          src={data.map.embedUrl}
          loading="lazy"
          className="w-full h-80 rounded-2xl border border-gray-200"
        />
      </section>
      <Newsletter />
    </>
  )
}
