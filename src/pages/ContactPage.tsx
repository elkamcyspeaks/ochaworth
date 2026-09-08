import { useState } from "react";
import site from "@/data/site.json";
import contactPageData from "@/data/contactPage.json";
import {
  CheckIcon, SendIcon, ClipboardIcon,
  Icon, Newsletter, PageHero,
  submitToNetlify, Honeypot, FormErrorNote,
} from "@/components/shared";

// ── Sections ──────────────────────────────────────────────────────────────────

function ContactSection() {
  const s = contactPageData.section;
  const c = site.contact;
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "", agreed: false });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitToNetlify("contact", {
        name: form.name, email: form.email, phone: form.phone,
        subject: form.subject, message: form.message,
      });
      // Fire-and-forget: send the visitor a confirmation email. This is
      // deliberately NOT awaited into the try/catch above — the Netlify
      // Forms submission (already logged) is what "sent" depends on, so a
      // Resend hiccup here should never show the visitor a false error.
      fetch("/.netlify/functions/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", email: form.email, name: form.name }),
      }).catch(err => console.error("Contact confirmation email failed:", err));
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", subject: "", message: "", agreed: false });
      setTimeout(() => setStatus("idle"), 3500);
    } catch {
      setStatus("error");
    }
  }

  // The first three cards mirror the real contact details already entered under
  // "Contact Info" in Homepage Content, so they only need updating in one place.
  const infoCards = [
    { icon: "phone", iconBg: "bg-[var(--green-mid)]", iconColor: "text-[var(--yellow)]", ...s.infoCards.callUs, value: c.phone },
    { icon: "location", iconBg: "bg-[var(--yellow)]", iconColor: "text-[var(--green-dark)]", ...s.infoCards.location, value: c.footerAddress },
    { icon: "mail", iconBg: "bg-[var(--yellow)]", iconColor: "text-[var(--green-dark)]", ...s.infoCards.email, value: c.email },
    { icon: "question", iconBg: "bg-[#e85d3a]", iconColor: "text-white", ...s.infoCards.haveQuestions },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-black text-[var(--green-dark)]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {s.heading}
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm leading-relaxed">
            {s.paragraph}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left: 2x2 info cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {infoCards.map(card => (
              <div key={card.title} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className={`w-14 h-14 ${card.iconBg} ${card.iconColor} rounded-full flex items-center justify-center mb-4`}>
                  <Icon name={card.icon} className="w-6 h-6"/>
                </div>
                <h4 className="font-bold text-[var(--green-dark)] text-base">{card.title}</h4>
                <p className="text-xs text-gray-400 mt-0.5 mb-2">{card.sub}</p>
                <p className="text-sm font-semibold text-[var(--green-mid)] leading-snug">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Right: Get In Touch form */}
          <div className="lg:col-span-3 bg-[#EEF4F0] rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-6 right-6 w-10 h-10 bg-[var(--green-mid)] rounded-full flex items-center justify-center">
              <ClipboardIcon className="w-5 h-5 text-[var(--yellow)]"/>
            </div>

            <h3 className="text-2xl font-black text-[var(--green-dark)] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              {s.formHeading}
            </h3>

            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input type="hidden" name="form-name" value="contact"/>
              <Honeypot/>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder={s.namePlaceholder}
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--green-mid)] placeholder-gray-400 disabled:opacity-60"
                  disabled={status === "sending"}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder={s.emailPlaceholder}
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--green-mid)] placeholder-gray-400 disabled:opacity-60"
                  disabled={status === "sending"}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder={s.phonePlaceholder}
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--green-mid)] placeholder-gray-400 disabled:opacity-60"
                  disabled={status === "sending"}
                />
                <select
                  name="subject"
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--green-mid)] text-gray-500 disabled:opacity-60"
                  disabled={status === "sending"}
                >
                  <option value="">{s.subjectDefaultOption}</option>
                  {s.subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                </select>
              </div>

              <textarea
                name="message"
                placeholder={s.messagePlaceholder}
                rows={4}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--green-mid)] placeholder-gray-400 resize-none disabled:opacity-60"
                disabled={status === "sending"}
                required
              />

              <label className="flex items-start gap-3 cursor-pointer group">
                <div
                  onClick={() => setForm(f => ({ ...f, agreed: !f.agreed }))}
                  className={`w-4 h-4 mt-0.5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${form.agreed ? "bg-[var(--green-mid)] border-[var(--green-mid)]" : "border-gray-400 bg-white"}`}
                >
                  {form.agreed && <CheckIcon className="w-2.5 h-2.5 text-white"/>}
                </div>
                <span className="text-sm text-gray-500">{s.agreementText}</span>
              </label>

              <button
                type="submit"
                disabled={status === "sending"}
                className="flex items-center gap-2 bg-[var(--green-mid)] text-white font-bold px-8 py-3 rounded-full hover:bg-[var(--green-dark)] transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sent" ? s.sentButtonText : status === "sending" ? "Sending…" : s.sendButtonText}
                {status === "idle" && <SendIcon className="w-4 h-4"/>}
                {status === "sent" && <CheckIcon className="w-3 h-3"/>}
              </button>
              {status === "error" && <FormErrorNote email={site.contact?.email}/>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  const m = contactPageData.map;
  return (
    <section className="relative h-80 lg:h-96 overflow-hidden">
      <iframe
        title="Ochaworth Location"
        src={m.embedUrl}
        className="w-full h-full border-0"
        loading="lazy"
      />
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white/30 to-transparent pointer-events-none"/>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      <PageHero
        image={contactPageData.hero.image}
        title={contactPageData.hero.title}
        breadcrumbHome={contactPageData.hero.breadcrumbHome}
        breadcrumbCurrent={contactPageData.hero.breadcrumbCurrent}
      />
      <ContactSection/>
      <MapSection/>
      <Newsletter/>
    </>
  );
}
