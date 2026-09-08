import { useState } from "react";
import site from "@/data/site.json";
import becomeVolunteerPageData from "@/data/becomeVolunteerPage.json";
import {
  ArrowUpRight, CheckIcon,
  SectionLabel, Newsletter, PageHero,
  submitToNetlify, Honeypot, FormErrorNote,
} from "@/components/shared";

// ── Decorative volunteer illustration ─────────────────────────────────────────

function VolunteerIllustration() {
  return (
    <svg viewBox="0 0 320 340" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <circle cx="160" cy="150" r="110" fill="#F9B8A0" opacity="0.5"/>
      <circle cx="160" cy="150" r="80" fill="#F9B8A0" opacity="0.4"/>

      <ellipse cx="55" cy="210" rx="22" ry="38" fill="#4CAF50" opacity="0.7" transform="rotate(-30 55 210)"/>
      <ellipse cx="42" cy="225" rx="16" ry="28" fill="#2E7D32" opacity="0.6" transform="rotate(-50 42 225)"/>
      <line x1="55" y1="255" x2="55" y2="290" stroke="#2E7D32" strokeWidth="3"/>

      {[0,30,60,90,120,150].map(a => (
        <ellipse key={a} cx="265" cy="270" rx="10" ry="38" fill="#E91E8C" opacity="0.25" transform={`rotate(${a} 265 270)`}/>
      ))}

      <text x="82" y="82" fontSize="14" fill="#E91E8C" opacity="0.6">♥</text>
      <text x="222" y="68" fontSize="10" fill="#E91E8C" opacity="0.5">♥</text>
      <text x="248" y="110" fontSize="8"  fill="#E91E8C" opacity="0.4">♥</text>

      <rect x="118" y="195" width="84" height="90" rx="16" fill="#1565C0"/>
      <rect x="145" y="195" width="30" height="12" rx="4" fill="#1976D2"/>
      <rect x="138" y="188" width="44" height="18" rx="8" fill="#FF7043"/>

      <rect x="90" y="200" width="30" height="22" rx="10" fill="#FF7043"/>
      <rect x="200" y="195" width="30" height="28" rx="10" fill="#FF7043"/>

      <rect x="196" y="218" width="48" height="36" rx="6" fill="#FFA726"/>
      <rect x="196" y="218" width="48" height="10" rx="3" fill="#FB8C00"/>
      <line x1="220" y1="218" x2="220" y2="254" stroke="#FB8C00" strokeWidth="2"/>

      <rect x="148" y="168" width="24" height="26" rx="8" fill="#FFCCBC"/>
      <ellipse cx="160" cy="148" rx="38" ry="40" fill="#FFCCBC"/>

      <ellipse cx="160" cy="118" rx="38" ry="22" fill="#1A1A1A"/>
      <ellipse cx="128" cy="138" rx="10" ry="18" fill="#1A1A1A"/>
      <ellipse cx="192" cy="138" rx="10" ry="18" fill="#1A1A1A"/>

      <ellipse cx="148" cy="148" rx="6" ry="7" fill="white"/>
      <ellipse cx="172" cy="148" rx="6" ry="7" fill="white"/>
      <circle cx="150" cy="150" r="3.5" fill="#1A1A1A"/>
      <circle cx="174" cy="150" r="3.5" fill="#1A1A1A"/>
      <circle cx="151" cy="148" r="1.2" fill="white"/>
      <circle cx="175" cy="148" r="1.2" fill="white"/>

      <path d="M148 164 Q160 174 172 164" fill="none" stroke="#E65100" strokeWidth="2.5" strokeLinecap="round"/>

      <ellipse cx="136" cy="160" rx="8" ry="5" fill="#FF8A65" opacity="0.4"/>
      <ellipse cx="184" cy="160" rx="8" ry="5" fill="#FF8A65" opacity="0.4"/>

      <rect x="140" y="210" width="40" height="14" rx="3" fill="white" opacity="0.9"/>
      <text x="160" y="220" fontSize="6" fill="#1565C0" fontWeight="bold" textAnchor="middle">VOLUNTEER</text>

      <rect x="126" y="278" width="24" height="38" rx="10" fill="#1565C0"/>
      <rect x="170" y="278" width="24" height="38" rx="10" fill="#1565C0"/>
      <ellipse cx="138" cy="316" rx="16" ry="9" fill="#1A1A1A"/>
      <ellipse cx="182" cy="316" rx="16" ry="9" fill="#1A1A1A"/>
    </svg>
  );
}

// ── Form Section ──────────────────────────────────────────────────────────────
// Submits via Netlify Forms — see submitToNetlify in shared.tsx and the
// matching hidden static form ("become-a-volunteer") in index.html.

const inputCls = "w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[var(--green-dark)] transition-colors disabled:opacity-60";
const labelCls = "block text-sm font-semibold text-[var(--green-dark)] mb-1.5";

function FormSection() {
  const f = becomeVolunteerPageData.form;
  const o = site.org;
  const [form, setForm] = useState({
    name: "", email: "", phone: "", dob: "",
    occupation: "", address: "", country: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function set(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(s => ({ ...s, [k]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitToNetlify("become-a-volunteer", form);
      // Fire-and-forget: send the applicant a confirmation email. Not
      // awaited into the try/catch above — the Netlify Forms submission
      // (already logged) is what "sent" depends on, so a Resend hiccup here
      // should never show the applicant a false error.
      fetch("/.netlify/functions/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "become-a-volunteer", email: form.email, name: form.name }),
      }).catch(err => console.error("Become A Volunteer confirmation email failed:", err));
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", dob: "", occupation: "", address: "", country: "", message: "" });
      setTimeout(() => setStatus("idle"), 3500);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <SectionLabel text={f.sectionLabel}/>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--green-dark)] leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            {f.headingLine1}<br/>{f.headingLine2}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-lg border border-gray-100">
          <form
            name="become-a-volunteer"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="flex-1 bg-[#F5F0E8] p-8 lg:p-10"
          >
            <input type="hidden" name="form-name" value="become-a-volunteer"/>
            <Honeypot/>
            <div className="mb-5">
              <label className={labelCls}>{f.nameLabel}</label>
              <input type="text" name="name" placeholder={f.namePlaceholder} value={form.name} onChange={set("name")} className={inputCls} disabled={status === "sending"} required/>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className={labelCls}>{f.emailLabel}</label>
                <input type="email" name="email" placeholder={f.emailPlaceholder} value={form.email} onChange={set("email")} className={inputCls} disabled={status === "sending"} required/>
              </div>
              <div>
                <label className={labelCls}>{f.phoneLabel}</label>
                <input type="tel" name="phone" placeholder={f.phonePlaceholder} value={form.phone} onChange={set("phone")} className={inputCls} disabled={status === "sending"}/>
              </div>
            </div>

            <div className="mb-5">
              <label className={labelCls}>{f.dobLabel}</label>
              <input type="text" name="dob" placeholder={f.dobPlaceholder} value={form.dob} onChange={set("dob")} className={inputCls} disabled={status === "sending"}/>
            </div>

            <div className="mb-5">
              <label className={labelCls}>{f.occupationLabel}</label>
              <input type="text" name="occupation" placeholder={f.occupationPlaceholder} value={form.occupation} onChange={set("occupation")} className={inputCls} disabled={status === "sending"}/>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className={labelCls}>{f.addressLabel}</label>
                <input type="text" name="address" placeholder={f.addressPlaceholder} value={form.address} onChange={set("address")} className={inputCls} disabled={status === "sending"}/>
              </div>
              <div>
                <label className={labelCls}>{f.countryLabel}</label>
                <input type="text" name="country" placeholder={f.countryPlaceholder} value={form.country} onChange={set("country")} className={inputCls} disabled={status === "sending"}/>
              </div>
            </div>

            <div className="mb-7">
              <label className={labelCls}>{f.messageLabel}</label>
              <textarea name="message" placeholder={f.messagePlaceholder} value={form.message} onChange={set("message")} rows={4} className={inputCls + " resize-none"} disabled={status === "sending"}/>
            </div>

            <button type="submit" disabled={status === "sending"} className="flex items-center gap-2 bg-[var(--green-dark)] text-white font-bold px-7 py-3 rounded-full hover:bg-[var(--green-mid)] transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed">
              {status === "sent" ? f.submittedButtonText : status === "sending" ? "Sending…" : f.submitButtonText}
              {status === "idle" && <ArrowUpRight className="w-4 h-4"/>}
              {status === "sent" && <CheckIcon className="w-3 h-3"/>}
            </button>
            {status === "error" && <FormErrorNote email={site.contact?.email}/>}
          </form>

          {/* Right — illustration panel, captioned with Ochaworth's own mission line rather than a generic stock caption */}
          <div className="w-full lg:w-80 bg-[#F9C4A8] flex flex-col items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-32 bg-[#F5B49A] rounded-b-full opacity-40"/>
            <div className="relative z-10 flex-1 flex items-center justify-center px-6 pt-8 pb-4 w-full">
              <VolunteerIllustration/>
            </div>
            <div className="relative z-10 w-full bg-[#F9C4A8] px-6 py-6 text-center">
              <p className="text-3xl font-black leading-tight" style={{ color: "#E8521A", fontFamily: "'Playfair Display', serif" }}>
                {o.missionLine1}<br/>{o.missionHighlight} {o.missionLine3}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BecomeVolunteerPage() {
  return (
    <>
      <PageHero
        image={becomeVolunteerPageData.hero.image}
        title={becomeVolunteerPageData.hero.title}
        breadcrumbHome={becomeVolunteerPageData.hero.breadcrumbHome}
        breadcrumbCurrent={becomeVolunteerPageData.hero.breadcrumbCurrent}
      />
      <FormSection/>
      <Newsletter/>
    </>
  );
}
