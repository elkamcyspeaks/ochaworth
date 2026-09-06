import { useState } from "react";
import site from "@/data/site.json";
import volunteerPageData from "@/data/volunteerPage.json";
import {
  FacebookIcon, TwitterIcon, CheckIcon, SendIcon,
  SectionLabel, YellowBtn, Newsletter, PageHero,
} from "@/components/shared";

// ── Sections ──────────────────────────────────────────────────────────────────

// Reuses the same "Become a Volunteer" pitch, action photo, and impact stats
// already entered under Homepage Content → "Volunteer Cards Section" — so
// there's only one place to update this copy, not two.
function BecomeVolunteer() {
  const vc = site.volunteerCards;
  const vp = volunteerPageData.intro;
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-3xl overflow-hidden h-80 lg:h-96 group">
            <img src={vc.actionImage} alt="Volunteers in action" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--green-dark)]/80 to-transparent flex items-end p-6">
              <div>
                <div className="text-[var(--yellow)] text-xs font-bold tracking-widest uppercase mb-1">{vc.inActionLabel}</div>
                <p className="text-white font-semibold">{vc.actionCaption}</p>
              </div>
            </div>
          </div>
          <div>
            <SectionLabel text={vp.sectionLabel}/>
            <h2 className="text-4xl lg:text-5xl font-black text-[var(--green-dark)] leading-tight mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              {vc.card1.heading}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">{vc.card1.paragraph}</p>
            <a href="#apply">
              <YellowBtn>{vc.card1.buttonText}</YellowBtn>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-gray-100">
          {vc.stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-black text-[var(--green-mid)]">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Reuses the same team photos/names/roles and "Meet Our Volunteers" heading
// already entered under Homepage Content — only the small label above the
// heading is specific to this page.
function TeamGrid() {
  const vs = site.volunteersSection;
  const tp = volunteerPageData.team;
  return (
    <section className="py-20 bg-[#F7F7F3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel text={tp.sectionLabel}/>
          <h2 className="text-4xl font-black text-[var(--green-dark)]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {vs.headingPrefix} <span className="text-[var(--green-mid)] italic">{vs.headingItalic}</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {site.volunteers.map(v => (
            <div key={v.name} className="group text-center">
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <img src={v.img} alt={v.name} className="w-full h-72 object-cover object-top group-hover:scale-105 transition-transform duration-500"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--green-dark)]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="flex gap-2">
                    <a href="#" className="w-8 h-8 bg-[var(--yellow)] rounded-full flex items-center justify-center"><FacebookIcon className="w-3 h-3 text-[var(--green-dark)]"/></a>
                    <a href="#" className="w-8 h-8 bg-[var(--yellow)] rounded-full flex items-center justify-center"><TwitterIcon className="w-3 h-3 text-[var(--green-dark)]"/></a>
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-[var(--yellow)] text-[var(--green-dark)] text-xs font-bold px-2 py-1 rounded-full">{vs.badgeText}</div>
              </div>
              <h4 className="font-bold text-[var(--green-dark)]">{v.name}</h4>
              <p className="text-sm text-gray-400">{v.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Visual-only application form, same non-functional-backend pattern already
// agreed for the Contact page's form.
function ApplicationForm() {
  const f = volunteerPageData.form;
  const causes = site.footer.causes; // reuses the real "Our Causes" list instead of a separate made-up one
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "", availability: "", message: "", agreed: false });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  }

  return (
    <section id="apply" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-[#EEF4F0] rounded-3xl p-8 md:p-10">
          <h3 className="text-2xl md:text-3xl font-black text-[var(--green-dark)] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            {f.heading}
          </h3>
          <p className="text-gray-500 text-sm mb-6">{f.paragraph}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={f.namePlaceholder}
                value={form.name}
                onChange={e => setForm(s => ({ ...s, name: e.target.value }))}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--green-mid)] placeholder-gray-400"
                required
              />
              <input
                type="email"
                placeholder={f.emailPlaceholder}
                value={form.email}
                onChange={e => setForm(s => ({ ...s, email: e.target.value }))}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--green-mid)] placeholder-gray-400"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="tel"
                placeholder={f.phonePlaceholder}
                value={form.phone}
                onChange={e => setForm(s => ({ ...s, phone: e.target.value }))}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--green-mid)] placeholder-gray-400"
              />
              <select
                value={form.interest}
                onChange={e => setForm(s => ({ ...s, interest: e.target.value }))}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--green-mid)] text-gray-500"
              >
                <option value="">{f.interestDefaultOption}</option>
                {causes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <select
              value={form.availability}
              onChange={e => setForm(s => ({ ...s, availability: e.target.value }))}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--green-mid)] text-gray-500"
            >
              <option value="">{f.availabilityDefaultOption}</option>
              {f.availabilityOptions.map(a => <option key={a} value={a}>{a}</option>)}
            </select>

            <textarea
              placeholder={f.messagePlaceholder}
              rows={4}
              value={form.message}
              onChange={e => setForm(s => ({ ...s, message: e.target.value }))}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--green-mid)] placeholder-gray-400 resize-none"
            />

            <label className="flex items-start gap-3 cursor-pointer group">
              <div
                onClick={() => setForm(s => ({ ...s, agreed: !s.agreed }))}
                className={`w-4 h-4 mt-0.5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${form.agreed ? "bg-[var(--green-mid)] border-[var(--green-mid)]" : "border-gray-400 bg-white"}`}
              >
                {form.agreed && <CheckIcon className="w-2.5 h-2.5 text-white"/>}
              </div>
              <span className="text-sm text-gray-500">{f.agreementText}</span>
            </label>

            <button
              type="submit"
              className="flex items-center gap-2 bg-[var(--green-mid)] text-white font-bold px-8 py-3 rounded-full hover:bg-[var(--green-dark)] transition-colors text-sm"
            >
              {sent ? f.submittedButtonText : f.submitButtonText}
              {!sent && <SendIcon className="w-4 h-4"/>}
              {sent && <CheckIcon className="w-3 h-3"/>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        image={volunteerPageData.hero.image}
        title={volunteerPageData.hero.title}
        breadcrumbHome={volunteerPageData.hero.breadcrumbHome}
        breadcrumbCurrent={volunteerPageData.hero.breadcrumbCurrent}
      />
      <BecomeVolunteer/>
      <TeamGrid/>
      <ApplicationForm/>
      <Newsletter/>
    </>
  );
}
