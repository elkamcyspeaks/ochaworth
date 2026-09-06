import { useState } from "react";
import { Link } from "react-router-dom";
import site from "@/data/site.json";
import contactPageData from "@/data/contactPage.json";
import {
  ChevronRight, CheckIcon, SendIcon, ClipboardIcon,
  Icon, Newsletter,
} from "@/components/shared";

// ── Sections ──────────────────────────────────────────────────────────────────

function PageHero() {
  const h = contactPageData.hero;
  return (
    <section className="relative h-64 md:h-80 flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={h.image}
          alt="Contact Us hero"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[var(--green-dark)]/75"/>
      </div>

      {/* Yellow paint splatter accent — left side */}
      <div className="absolute left-0 top-0 bottom-0 w-48 pointer-events-none z-10 overflow-hidden">
        <svg viewBox="0 0 200 400" className="absolute left-0 top-0 h-full w-auto opacity-90" preserveAspectRatio="xMinYMid slice">
          <ellipse cx="30" cy="200" rx="80" ry="180" fill="var(--yellow)" opacity="0.85"/>
          <circle cx="90" cy="80" r="30" fill="var(--yellow)" opacity="0.7"/>
          <circle cx="110" cy="320" r="20" fill="var(--yellow)" opacity="0.6"/>
          <circle cx="60" cy="150" r="12" fill="var(--yellow)" opacity="0.5"/>
          <circle cx="130" cy="220" r="8" fill="var(--yellow)" opacity="0.4"/>
          <circle cx="80" cy="350" r="14" fill="var(--yellow)" opacity="0.5"/>
          <circle cx="140" cy="130" r="10" fill="var(--yellow)" opacity="0.35"/>
          <circle cx="50" cy="60" r="18" fill="var(--yellow)" opacity="0.55"/>
        </svg>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 w-full pl-16 md:pl-24">
        <h1 className="text-5xl md:text-6xl font-black text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          {h.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-white/60">
          <Link to="/" className="hover:text-[var(--yellow)] transition-colors">{h.breadcrumbHome}</Link>
          <ChevronRight className="w-3 h-3"/>
          <span className="text-[var(--yellow)]">{h.breadcrumbCurrent}</span>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const s = contactPageData.section;
  const c = site.contact;
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "", agreed: false });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={s.namePlaceholder}
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--green-mid)] placeholder-gray-400"
                  required
                />
                <input
                  type="email"
                  placeholder={s.emailPlaceholder}
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--green-mid)] placeholder-gray-400"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder={s.phonePlaceholder}
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--green-mid)] placeholder-gray-400"
                />
                <select
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--green-mid)] text-gray-500"
                >
                  <option value="">{s.subjectDefaultOption}</option>
                  {s.subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                </select>
              </div>

              <textarea
                placeholder={s.messagePlaceholder}
                rows={4}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--green-mid)] placeholder-gray-400 resize-none"
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
                className="flex items-center gap-2 bg-[var(--green-mid)] text-white font-bold px-8 py-3 rounded-full hover:bg-[var(--green-dark)] transition-colors text-sm"
              >
                {sent ? s.sentButtonText : s.sendButtonText}
                {!sent && <SendIcon className="w-4 h-4"/>}
                {sent && <CheckIcon className="w-3 h-3"/>}
              </button>
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
      <PageHero/>
      <ContactSection/>
      <MapSection/>
      <Newsletter/>
    </>
  );
}
