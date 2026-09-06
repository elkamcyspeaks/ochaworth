import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import site from "@/data/site.json";
import {
  LeafIcon, HeartIcon, HandIcon, StarIcon, ChevronRight, ChevronLeft, GlobeIcon,
  PhoneIcon, MailIcon, MapPinIcon, CalendarIcon, FacebookIcon, TwitterIcon,
  InstagramIcon, YoutubeIcon, ArrowRight, QuoteIcon, CheckIcon,
  Icon, SectionLabel, YellowBtn, GreenBtn, OutlineBtn, ProgressBar, Newsletter,
} from "@/components/shared";

function Hero() {
  const heroSlides = site.hero.slides;
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  useEffect(() => { const id = setInterval(() => slide(1), 5500); return () => clearInterval(id); }, [current]);
  function slide(dir: number) {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(c => (c + dir + heroSlides.length) % heroSlides.length); setAnimating(false); }, 400);
  }
  const s = heroSlides[current];
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {heroSlides.map((sl, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i === current ? 1 : 0, zIndex: 0 }}>
          <img src={sl.image} alt="" className="w-full h-full object-cover object-center"/>
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--green-dark)]/95 via-[var(--green-dark)]/75 to-transparent"/>
        </div>
      ))}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none hidden lg:block z-10">
        <div className="absolute right-0 top-0 bottom-0 w-full bg-[var(--yellow)]/10 rounded-l-full"/>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="max-w-2xl transition-all duration-500" style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(16px)" : "translateY(0)" }}>
          <SectionLabel text={s.label} light/>
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            {s.line1}<br/><span className="text-[var(--yellow)]">{s.highlight}</span> <span className="italic">{s.italic}</span><br/>{s.line3}
          </h1>
          <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg">{s.sub}</p>
          <div className="flex flex-wrap gap-4">
            <YellowBtn className="flex items-center gap-2"><HeartIcon className="w-4 h-4"/> {site.hero.donateButtonText}</YellowBtn>
            <OutlineBtn light className="flex items-center gap-2">{site.hero.learnMoreButtonText} <ArrowRight className="w-4 h-4"/></OutlineBtn>
          </div>
          <div className="flex flex-wrap gap-8 mt-14">
            {site.hero.stats.map(stat => (
              <div key={stat.label} className="text-white">
                <div className="text-3xl font-black text-[var(--yellow)]">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button onClick={() => slide(-1)} className="w-10 h-10 rounded-full bg-white/20 hover:bg-[var(--yellow)] flex items-center justify-center text-white hover:text-[var(--green-dark)]"><ChevronLeft className="w-5 h-5"/></button>
        <div className="flex gap-2">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => { if (!animating) { setAnimating(true); setTimeout(() => { setCurrent(i); setAnimating(false); }, 400); }}} className={"transition-all duration-300 rounded-full " + (i === current ? "w-8 h-3 bg-[var(--yellow)]" : "w-3 h-3 bg-white/40")}/>
          ))}
        </div>
        <button onClick={() => slide(1)} className="w-10 h-10 rounded-full bg-white/20 hover:bg-[var(--yellow)] flex items-center justify-center text-white hover:text-[var(--green-dark)]"><ChevronRight className="w-5 h-5"/></button>
      </div>
      <div className="absolute top-8 right-8 z-20 text-white/50 text-sm font-mono">{String(current+1).padStart(2,"0")} / {String(heroSlides.length).padStart(2,"0")}</div>
    </section>
  );
}

function VolunteerCards() {
  const vc = site.volunteerCards;
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[var(--green-mid)] rounded-2xl p-8 flex flex-col items-start gap-4 text-white hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-[var(--yellow)] rounded-full flex items-center justify-center"><HandIcon className="w-7 h-7 text-[var(--green-dark)]"/></div>
            <h3 className="text-xl font-bold">{vc.card1.heading}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{vc.card1.paragraph}</p>
            <button className="text-[var(--yellow)] font-semibold text-sm flex items-center gap-1">{vc.card1.buttonText} <ArrowRight className="w-4 h-4"/></button>
          </div>
          <div className="bg-[var(--yellow)] rounded-2xl p-8 flex flex-col items-start gap-4 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-[var(--green-mid)] rounded-full flex items-center justify-center"><GlobeIcon className="w-7 h-7 text-[var(--yellow)]"/></div>
            <h3 className="text-xl font-bold text-[var(--green-dark)]">{vc.card2.heading}</h3>
            <p className="text-[var(--green-dark)]/70 text-sm leading-relaxed">{vc.card2.paragraph}</p>
            <button className="text-[var(--green-mid)] font-semibold text-sm flex items-center gap-1">{vc.card2.buttonText} <ArrowRight className="w-4 h-4"/></button>
          </div>
          <div className="rounded-2xl overflow-hidden relative min-h-[280px] group">
            <img src={vc.actionImage} alt="Volunteers" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--green-dark)]/80 to-transparent flex items-end p-6">
              <div><div className="text-[var(--yellow)] text-xs font-bold tracking-widest uppercase mb-1">{vc.inActionLabel}</div><p className="text-white font-semibold">{vc.actionCaption}</p></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 border-t border-gray-100 pt-10">
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

function About() {
  const a = site.about;
  return (
    <section className="py-20 bg-[#F7F7F3]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <img src={a.images.main} alt="Community" className="rounded-2xl w-full h-72 object-cover"/>
            <div className="flex flex-col gap-4">
              <img src={a.images.top} alt="Children" className="rounded-2xl w-full h-32 object-cover"/>
              <img src={a.images.bottom} alt="Volunteers" className="rounded-2xl w-full h-32 object-cover"/>
            </div>
          </div>
          <div className="absolute -bottom-6 left-6 bg-[var(--yellow)] rounded-2xl px-6 py-4 shadow-lg">
            <div className="text-3xl font-black text-[var(--green-dark)]">{a.badgeNumber}</div>
            <div className="text-xs font-semibold text-[var(--green-dark)]/70">{a.badgeLabel}</div>
          </div>
        </div>
        <div>
          <SectionLabel text={a.sectionLabel}/>
          <h2 className="text-4xl lg:text-5xl font-black text-[var(--green-dark)] leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            {a.headingPrefix} <span className="text-[var(--green-mid)]">{a.headingHighlight}</span> {a.headingSuffix}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">{a.paragraph}</p>
          <div className="space-y-4">
            {a.features.map(f => (
              <div key={f.title} className="flex gap-4 items-start">
                <div className="w-11 h-11 bg-[var(--green-mid)] text-[var(--yellow)] rounded-xl flex items-center justify-center flex-shrink-0"><Icon name={f.icon} className="w-5 h-5"/></div>
                <div><h4 className="font-bold text-[var(--green-dark)]">{f.title}</h4><p className="text-sm text-gray-500 mt-0.5">{f.desc}</p></div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-8"><YellowBtn>{a.learnMoreButtonText}</YellowBtn><GreenBtn>{a.ourImpactButtonText}</GreenBtn></div>
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const j = site.journey;
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel text={j.sectionLabel}/>
          <h2 className="text-4xl font-black text-[var(--green-dark)] mt-2" style={{ fontFamily: "'Playfair Display', serif" }}>{j.headingPrefix} <span className="text-[var(--green-mid)] italic">{j.headingItalic}</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {site.services.map((s, i) => (
            <div key={s.title} className="group border border-gray-100 rounded-2xl p-7 hover:bg-[var(--green-mid)] hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className={"w-16 h-16 rounded-xl flex items-center justify-center mb-5 transition-colors " + (i % 2 === 0 ? "bg-[var(--yellow)]/20 text-[var(--green-mid)] group-hover:bg-[var(--yellow)] group-hover:text-[var(--green-dark)]" : "bg-[var(--green-mid)]/10 text-[var(--green-mid)] group-hover:bg-[var(--yellow)] group-hover:text-[var(--green-dark)]")}><Icon name={s.icon} className="w-10 h-10"/></div>
              <h3 className="text-lg font-bold text-[var(--green-dark)] mb-3 group-hover:text-white">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed group-hover:text-white/70">{s.desc}</p>
              <button className="mt-4 text-[var(--green-mid)] group-hover:text-[var(--yellow)] text-sm font-semibold flex items-center gap-1">{j.readMoreButtonText} <ArrowRight className="w-4 h-4"/></button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const items = site.ticker;
  const repeated = [...items, ...items];
  return (
    <div className="py-5 border-y border-[var(--green-mid)]/10 bg-white overflow-hidden marquee-pause">
      <div className="ticker-wrap">
        <div className="ticker-content">
          {repeated.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 mx-4">
              <span className="text-[var(--green-mid)] font-bold text-lg">{item}</span>
              <span className="text-[var(--yellow)] text-2xl">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeaturedProjects() {
  const fp = site.featuredProjects;
  return (
    <section className="py-20 bg-[#F7F7F3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-between items-end mb-12 gap-4">
          <div><SectionLabel text={fp.sectionLabel}/><h2 className="text-4xl font-black text-[var(--green-dark)]" style={{ fontFamily: "'Playfair Display', serif" }}>{fp.headingPrefix} <span className="italic">{fp.headingItalic}</span></h2></div>
          <Link to="/programs"><OutlineBtn>{fp.viewAllButtonText}</OutlineBtn></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {site.projects.map(p => (
            <div key={p.title} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
              <div className="overflow-hidden h-52 relative">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                <div className="absolute top-4 left-4 bg-[var(--yellow)] text-[var(--green-dark)] text-xs font-bold px-3 py-1 rounded-full">{fp.activeBadgeText}</div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1 text-gray-400 text-xs mb-2"><MapPinIcon className="w-3 h-3"/> {p.location}</div>
                <h3 className="font-bold text-[var(--green-dark)] text-lg mb-4">{p.title}</h3>
                <ProgressBar raised={p.raised} goal={p.goal}/>
                <div className="flex gap-3 mt-5"><YellowBtn className="flex-1 py-2 text-sm text-center">{fp.donateButtonText}</YellowBtn><OutlineBtn className="flex-1 py-2 text-sm text-center">{fp.learnMoreButtonText}</OutlineBtn></div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 text-sm mt-8">{fp.bottomParagraph}</p>
      </div>
    </section>
  );
}

function Community() {
  const c = site.community;
  return (
    <section className="bg-[var(--green-mid)] py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div>
            <SectionLabel text={c.sectionLabel} light/>
            <h2 className="text-4xl lg:text-5xl font-black text-white mt-2" style={{ fontFamily: "'Playfair Display', serif" }}>{c.headingPrefix} <span className="text-[var(--yellow)]">{c.headingHighlight}</span></h2>
            <p className="text-white/70 mt-4 max-w-md leading-relaxed">{c.paragraph}</p>
            <div className="flex gap-4 mt-6"><YellowBtn>{c.getInvolvedButtonText}</YellowBtn><OutlineBtn light>{c.learnMoreButtonText}</OutlineBtn></div>
          </div>
          <div className="text-center"><div className="text-8xl font-black text-[var(--yellow)]">{c.donorsCount}</div><div className="text-white text-lg font-semibold mt-2">{c.donorsLabel}</div></div>
        </div>
        <div className="mt-16 pt-10 border-t border-white/10">
          <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-8">{c.trustedPartnersLabel}</p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {c.partners.map(p => <div key={p} className="text-white/40 font-bold text-sm tracking-widest hover:text-[var(--yellow)] transition-colors cursor-pointer">{p}</div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Volunteers() {
  const vs = site.volunteersSection;
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12"><SectionLabel text={vs.homeSectionLabel}/><h2 className="text-4xl font-black text-[var(--green-dark)]" style={{ fontFamily: "'Playfair Display', serif" }}>{vs.headingPrefix} <span className="text-[var(--green-mid)] italic">{vs.headingItalic}</span></h2></div>
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

function TouchingLives() {
  const t = site.touchingLives;
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src={t.bgImage} alt="" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-[var(--green-dark)]/85"/>
      </div>
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel text={t.sectionLabel} light/>
            <h2 className="text-4xl lg:text-5xl font-black text-white mt-2 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t.headingLine1}<br/>{t.headingLine2Prefix} <span className="text-[var(--yellow)]">{t.headingHighlight}</span><br/>{t.headingLine3}
            </h2>
            <p className="text-white/70 mt-5 leading-relaxed max-w-md">{t.paragraph}</p>
            <div className="flex gap-4 mt-8"><YellowBtn>{t.ourWorkButtonText}</YellowBtn><OutlineBtn light>{t.watchStoryButtonText}</OutlineBtn></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {t.cards.map(c => (
              <div key={c.title} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5 hover:bg-[var(--yellow)]/20 transition-colors">
                <div className="text-[var(--yellow)] mb-3"><Icon name={c.icon} className="w-7 h-7"/></div>
                <h4 className="font-bold text-white text-sm mb-2">{c.title}</h4>
                <p className="text-white/60 text-xs leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DonationForm() {
  const d = site.donation;
  const [amount, setAmount] = useState(d.presetAmounts[2] ?? "50");
  const [custom, setCustom] = useState("");
  return (
    <section className="py-20 bg-[#F7F7F3]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img src={d.bgImage} alt="" className="rounded-3xl w-full h-[500px] object-cover"/>
          <div className="absolute -top-6 -right-6 bg-[var(--yellow)] rounded-2xl px-8 py-5 shadow-xl hidden lg:block">
            <div className="text-4xl font-black text-[var(--green-dark)]">{d.totalRaised}</div>
            <div className="text-sm font-semibold text-[var(--green-dark)]/70">{d.totalRaisedLabel}</div>
          </div>
          <div className="absolute -bottom-6 left-6 bg-[var(--green-mid)] rounded-2xl px-6 py-4 shadow-xl hidden lg:block">
            <div className="text-2xl font-black text-white">{d.donationsCount}</div>
            <div className="text-xs font-semibold text-white/60">{d.donationsLabel}</div>
          </div>
        </div>
        <div>
          <SectionLabel text={d.sectionLabel}/>
          <h2 className="text-4xl font-black text-[var(--green-dark)] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{d.headingLine1}<br/>{d.headingLine2Prefix} <span className="text-[var(--green-mid)] italic">{d.headingHighlight}</span> {d.headingSuffix}</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">{d.paragraph}</p>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-[var(--green-dark)] mb-2">{d.amountLabel}</label>
            <div className="flex flex-wrap gap-3 mb-3">
              {d.presetAmounts.map(a => (
                <button key={a} onClick={() => { setAmount(a); setCustom(""); }} className={"px-5 py-2 rounded-full border-2 font-bold text-sm transition-colors " + (amount === a && !custom ? "bg-[var(--green-mid)] text-white border-[var(--green-mid)]" : "border-gray-300 text-gray-600 hover:border-[var(--green-mid)]")}>₦{a}</button>
              ))}
            </div>
            <input type="number" placeholder={d.customAmountPlaceholder} value={custom} onChange={e => { setCustom(e.target.value); setAmount(""); }} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--green-mid)]"/>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input placeholder={d.firstNamePlaceholder} className="border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--green-mid)]"/>
            <input placeholder={d.lastNamePlaceholder} className="border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--green-mid)]"/>
          </div>
          <input placeholder={d.emailPlaceholder} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--green-mid)] mb-4"/>
          <select className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--green-mid)] text-gray-600 mb-6">
            <option>{d.selectCauseDefault}</option>
            {d.causes.map(c => <option key={c}>{c}</option>)}
          </select>
          <YellowBtn className="w-full flex items-center justify-center gap-2 py-4 text-base">
            <HeartIcon className="w-5 h-5"/> {d.donateButtonPrefix} ₦{custom || amount} {d.donateButtonSuffix}
          </YellowBtn>
          <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1"><CheckIcon className="w-3 h-3"/> {d.secureCaption}</p>
        </div>
      </div>
    </section>
  );
}

function TestimonialBanner() {
  const o = site.org;
  return (
    <section className="relative py-24 overflow-hidden bg-[var(--green-dark)]">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--yellow)] rounded-full blur-3xl"/>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--yellow)] rounded-full blur-3xl"/>
      </div>
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3 text-[var(--yellow)]">
          <LeafIcon className="w-4 h-4"/>
          <span className="text-sm font-semibold tracking-widest uppercase">{o.philosophyLabel}</span>
        </div>
        <blockquote className="text-4xl lg:text-6xl font-black text-white leading-tight mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          "{o.missionLine1}<br/>
          <span className="text-[var(--yellow)] italic">{o.missionHighlight}</span><br/>
          {o.missionLine3}"
        </blockquote>
        <p className="text-white/50 mt-8 text-lg">{o.missionAttribution}</p>
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const testimonials = site.testimonials;
  const ts = site.testimonialsSection;
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel text={ts.sectionLabel}/>
          <h2 className="text-4xl font-black text-[var(--green-dark)]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {ts.headingPrefix} <span className="italic text-[var(--green-mid)]">{ts.headingItalic}</span> {ts.headingSuffix}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className={`rounded-2xl p-7 border-2 transition-all ${i === active ? "border-[var(--yellow)] shadow-lg" : "border-gray-100"}`}>
              <div className="flex items-center gap-1 text-[var(--yellow)] mb-4">
                {[...Array(t.stars)].map((_, j) => <StarIcon key={j} className="w-4 h-4"/>)}
              </div>
              <QuoteIcon className="w-8 h-8 text-[var(--yellow)]/30 mb-3"/>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover"/>
                <div>
                  <div className="font-bold text-[var(--green-dark)] text-sm">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-8">
          <button onClick={() => setActive(a => Math.max(0, a - 1))} className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[var(--green-mid)] transition-colors">
            <ChevronLeft/>
          </button>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className={`w-3 h-3 rounded-full transition-colors ${i === active ? "bg-[var(--yellow)]" : "bg-gray-200"}`}/>
          ))}
          <button onClick={() => setActive(a => Math.min(testimonials.length - 1, a + 1))} className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[var(--green-mid)] transition-colors">
            <ChevronRight/>
          </button>
        </div>
      </div>
    </section>
  );
}

function Events() {
  const p = site.eventsPanel;
  return (
    <section className="py-20 bg-[#F7F7F3]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <SectionLabel text={p.sectionLabel}/>
          <h2 className="text-4xl font-black text-[var(--green-dark)] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            {p.headingLine1}<br/><span className="italic text-[var(--green-mid)]">{p.headingItalic}</span>
          </h2>

          <div className="space-y-4">
            {site.events.map(ev => (
              <div key={ev.day} className="bg-white rounded-2xl p-5 flex gap-5 items-start hover:shadow-md transition-shadow group cursor-pointer">
                <div className="bg-[var(--green-mid)] text-white rounded-xl w-16 h-16 flex flex-col items-center justify-center flex-shrink-0 group-hover:bg-[var(--yellow)] group-hover:text-[var(--green-dark)] transition-colors">
                  <div className="text-xs font-semibold">{ev.month}</div>
                  <div className="text-2xl font-black leading-none">{ev.day}</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[var(--green-dark)] text-sm leading-snug mb-2">{ev.title}</h4>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><MapPinIcon className="w-3 h-3"/> {ev.location}</span>
                    <span className="flex items-center gap-1"><CalendarIcon className="w-3 h-3"/> {ev.time}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[var(--yellow)] transition-colors flex-shrink-0 mt-1"/>
              </div>
            ))}
          </div>

          <YellowBtn className="mt-6">{p.viewAllButtonText}</YellowBtn>
        </div>

        {/* Event image */}
        <div className="relative">
          <img
            src={p.image}
            alt="Community event"
            className="rounded-3xl w-full h-[480px] object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur rounded-2xl p-5">
            <div className="text-[var(--green-mid)] font-bold mb-1">{p.title}</div>
            <div className="text-sm text-gray-500">{p.desc}</div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs text-gray-400 flex items-center gap-1"><CalendarIcon className="w-3 h-3"/> {p.date}</span>
              <button className="text-[var(--green-mid)] font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                {p.registerButtonText} <ArrowRight className="w-4 h-4"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorldMap() {
  const wm = site.worldMap;
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel text={wm.sectionLabel}/>
          <h2 className="text-4xl font-black text-[var(--green-dark)]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {wm.headingPrefix} <span className="italic text-[var(--green-mid)]">{wm.headingItalic}</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">{wm.intro}</p>
        </div>

        {/* Tab filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {wm.regionTabs.map((r, i) => (
            <button key={r} className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${i === 0 ? "bg-[var(--green-mid)] text-white" : "border border-gray-200 text-gray-500 hover:border-[var(--green-mid)] hover:text-[var(--green-mid)]"}`}>{r}</button>
          ))}
        </div>

        {/* Map */}
        <div className="relative bg-[#F7F7F3] rounded-3xl overflow-hidden h-80 lg:h-96">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/2560px-World_map_-_low_resolution.svg.png"
            alt="World map"
            className="w-full h-full object-contain opacity-30"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-[var(--green-mid)]/5"/>

          {/* Pin markers */}
          {wm.pins.map(pin => (
            <div
              key={pin.label}
              className="absolute group cursor-pointer"
              style={{ top: pin.top, left: pin.left, transform: "translate(-50%, -100%)" }}
            >
              <div className="relative">
                <MapPinIcon className="w-7 h-7 text-[var(--yellow)] drop-shadow-lg"/>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[var(--green-dark)] text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {pin.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {wm.stats.map(s => (
            <div key={s.l} className="bg-[var(--green-mid)] text-white rounded-2xl p-5 text-center">
              <div className="text-3xl font-black text-[var(--yellow)]">{s.v}</div>
              <div className="text-sm text-white/70 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blog() {
  const bs = site.blogSection;
  return (
    <section className="py-20 bg-[#F7F7F3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-between items-end mb-12 gap-4">
          <div>
            <SectionLabel text={bs.sectionLabel}/>
            <h2 className="text-4xl font-black text-[var(--green-dark)]" style={{ fontFamily: "'Playfair Display', serif" }}>
              {bs.headingPrefix} <span className="italic">{bs.headingItalic}</span>
            </h2>
          </div>
          <div className="flex gap-3">
            {bs.filterTabs.map((t, i) => (
              <button key={t} className={`px-4 py-2 rounded-full text-sm font-semibold ${i === 0 ? "bg-[var(--green-mid)] text-white" : "border border-gray-200 text-gray-500 hover:border-[var(--green-mid)]"}`}>{t}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {site.blog.map(b => (
            <div key={b.title} className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="overflow-hidden h-48 relative">
                <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                <div className="absolute top-4 left-4 bg-[var(--yellow)] text-[var(--green-dark)] text-xs font-bold px-3 py-1 rounded-full">{b.category}</div>
              </div>
              <div className="p-6">
                <div className="text-xs text-gray-400 mb-3 flex items-center gap-1"><CalendarIcon className="w-3 h-3"/> {b.date}</div>
                <h3 className="font-bold text-[var(--green-dark)] leading-snug mb-4 line-clamp-3">{b.title}</h3>
                <button className="text-[var(--green-mid)] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  {bs.readMoreButtonText} <ArrowRight className="w-4 h-4"/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Hero/>
      <VolunteerCards/>
      <About/>
      <Journey/>
      <Ticker/>
      <FeaturedProjects/>
      <Community/>
      <Volunteers/>
      <TouchingLives/>
      <DonationForm/>
      <TestimonialBanner/>
      <Testimonials/>
      <Events/>
      <WorldMap/>
      <Blog/>
      <Newsletter/>
    </>
  );
}
