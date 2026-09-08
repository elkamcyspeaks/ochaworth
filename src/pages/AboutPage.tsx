import { useState } from "react";
import { Link } from "react-router-dom";
import site from "@/data/site.json";
import aboutPageData from "@/data/aboutPage.json";
import {
  ChevronRight, ChevronDown, ArrowRight, PlayIcon, StarIcon, QuoteIcon,
  TargetIcon, EyeIcon, ShieldIcon, CheckCircle,
  FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon,
  Icon, SectionLabel, YellowBtn, Newsletter, PageHero,
} from "@/components/shared";

// ── Sections ──────────────────────────────────────────────────────────────────

function AboutIntro() {
  const a = site.about;
  const intro = aboutPageData.intro;
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image collage */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <img
              src={a.images.main}
              alt="Ochaworth community"
              className="rounded-3xl w-full h-80 object-cover"
            />
            <div className="flex flex-col gap-4 pt-8">
              <img
                src={a.images.top}
                alt="Ochaworth programme"
                className="rounded-2xl w-full h-36 object-cover"
              />
              <img
                src={a.images.bottom}
                alt="Ochaworth volunteers"
                className="rounded-2xl w-full h-36 object-cover"
              />
            </div>
          </div>
          {/* Circular stat badge */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-8 lg:bottom-8 w-28 h-28 bg-[var(--yellow)] rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-white">
            <div className="text-2xl font-black text-[var(--green-dark)] leading-none">{intro.statBadgeValue}</div>
            <div className="text-[10px] font-bold text-[var(--green-dark)]/70 text-center leading-tight mt-0.5">{intro.statBadgeLabel}</div>
          </div>
        </div>

        {/* Content */}
        <div>
          <SectionLabel text={intro.sectionLabel}/>
          <h2 className="text-4xl lg:text-5xl font-black text-[var(--green-dark)] leading-tight mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
            {a.headingPrefix}<br/><span className="text-[var(--green-mid)]">{a.headingHighlight}</span> {a.headingSuffix}
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            {a.paragraph}
          </p>

          <div className="space-y-5 mb-8">
            {intro.features.map(f => (
              <div key={f.title} className="flex gap-4 items-start">
                <div className="w-11 h-11 bg-[var(--yellow)]/20 text-[var(--green-mid)] rounded-xl flex items-center justify-center flex-shrink-0 border border-[var(--yellow)]/40">
                  <Icon name={f.icon} className="w-5 h-5"/>
                </div>
                <div>
                  <h4 className="font-bold text-[var(--green-dark)] text-sm">{f.title}</h4>
                  <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Link to="/programs">
            <YellowBtn className="flex items-center gap-2">
              {intro.buttonText} <ArrowRight className="w-4 h-4"/>
            </YellowBtn>
          </Link>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = aboutPageData.stats;
  return (
    <section className="bg-[var(--green-dark)] py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((s, i) => (
            <div key={s.label} className={`text-center py-2 ${i < stats.length - 1 ? "border-r border-white/10 pr-4 last:border-0" : ""}`}>
              <div className="text-3xl font-black text-[var(--yellow)]">{s.value}</div>
              <div className="text-xs text-white/50 mt-1 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionVisionValues() {
  const mvv = aboutPageData.missionVisionValues;
  const cards = [
    {
      icon: <TargetIcon className="w-8 h-8"/>,
      color: "bg-[var(--green-mid)]",
      accent: "text-[var(--yellow)]",
      textColor: "text-white",
      subColor: "text-white/70",
      border: false,
      ...mvv.mission,
    },
    {
      icon: <EyeIcon className="w-8 h-8"/>,
      color: "bg-[var(--yellow)]",
      accent: "text-[var(--green-mid)]",
      textColor: "text-[var(--green-dark)]",
      subColor: "text-[var(--green-dark)]/70",
      border: false,
      ...mvv.vision,
    },
    {
      icon: <ShieldIcon className="w-8 h-8"/>,
      color: "bg-white",
      accent: "text-[var(--green-mid)]",
      textColor: "text-[var(--green-dark)]",
      subColor: "text-gray-500",
      border: true,
      ...mvv.values,
    },
  ];

  return (
    <section className="py-20 bg-[#F7F7F3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <SectionLabel text={mvv.sectionLabel}/>
          <h2 className="text-4xl lg:text-5xl font-black text-[var(--green-dark)] mt-2 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            {mvv.headingLine1}<br/>& <span className="text-[var(--green-mid)] italic">{mvv.headingItalic}</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            {mvv.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div key={c.title} className={`${c.color} ${c.border ? "border-2 border-gray-100" : ""} rounded-3xl p-8 flex flex-col gap-5 hover:shadow-xl transition-shadow duration-300`}>
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${c.color === "bg-[var(--yellow)]" ? "bg-[var(--green-dark)]/10" : c.color === "bg-[var(--green-mid)]" ? "bg-[var(--yellow)]/20" : "bg-[var(--green-mid)]/10"} ${c.accent}`}>
                {c.icon}
              </div>

              {/* Tag */}
              <div>
                <span className={`text-xs font-bold tracking-widest uppercase ${c.accent} opacity-70`}>{c.tag}</span>
                <h3 className={`text-3xl font-black mt-1 ${c.textColor}`} style={{ fontFamily: "'Playfair Display', serif" }}>{c.title}</h3>
              </div>

              {/* Divider */}
              <div className={`h-px w-12 ${c.color === "bg-[var(--yellow)]" ? "bg-[var(--green-dark)]/30" : "bg-white/20"}`}/>

              {/* Description */}
              <p className={`text-sm leading-relaxed ${c.subColor}`}>{c.desc}</p>

              {/* Bullet points */}
              <ul className="space-y-2 mt-auto">
                {c.points.map(pt => (
                  <li key={pt} className={`flex items-center gap-2 text-sm font-medium ${c.textColor}`}>
                    <CheckCircle className={`w-4 h-4 flex-shrink-0 ${c.accent}`}/>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TouchingLives() {
  const tl = site.touchingLives;
  const extra = aboutPageData.touchingLives;
  const hasVideo = Boolean(extra.videoUrl);
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-10">
          {/* Left */}
          <div>
            <SectionLabel text={extra.sectionLabel}/>
            <h2 className="text-4xl font-black text-[var(--green-dark)] leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {tl.headingLine1}<br/>{tl.headingLine2Prefix} <span className="text-[var(--green-mid)] italic">{tl.headingHighlight}</span><br/>{tl.headingLine3}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 text-sm">
              {tl.paragraph}
            </p>

            {/* Progress bars */}
            <div className="space-y-5">
              {extra.progressBars.map(b => (
                <div key={b.label}>
                  <div className="flex justify-between text-sm font-semibold text-[var(--green-dark)] mb-2">
                    <span>{b.label}</span>
                    <span className="text-[var(--yellow)]">{b.pct}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--green-mid)] to-[var(--yellow)] rounded-full transition-all duration-1000"
                      style={{ width: `${b.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Link to="/blog" className="mt-8 text-[var(--green-mid)] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
              {extra.successStoryButtonText} <ArrowRight className="w-4 h-4"/>
            </Link>
          </div>

          {/* Right — a real, playable embedded video (if one has been added); otherwise a plain photo */}
          <div className="relative rounded-3xl overflow-hidden h-80 lg:h-96 group bg-black">
            {hasVideo ? (
              <iframe
                src={extra.videoUrl}
                title="Ochaworth story video"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0">
                <img
                  src={tl.bgImage}
                  alt="Our work in the field"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[var(--green-dark)]/50"/>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--yellow)] flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                    <PlayIcon className="w-7 h-7 text-[var(--green-dark)] ml-1"/>
                  </div>
                </div>
                {/* Circular badge */}
                <div className="absolute bottom-5 left-5 bg-[var(--green-mid)] border-2 border-[var(--yellow)] rounded-full w-20 h-20 flex flex-col items-center justify-center">
                  <div className="text-[var(--yellow)] font-black text-lg leading-none">{extra.yearsBadgeNumber}</div>
                  <div className="text-white text-[9px] font-semibold text-center leading-tight">{extra.yearsBadgeLabelLine1}<br/>{extra.yearsBadgeLabelLine2}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6">
          {tl.cards.map((c, i) => (
            <div key={c.title} className={`${i % 2 === 0 ? "bg-[var(--green-mid)]" : "bg-[var(--yellow)]"} rounded-2xl p-6`}>
              <div className={`mb-3 ${i % 2 === 0 ? "text-[var(--yellow)]" : "text-[var(--green-dark)]"}`}><Icon name={c.icon} className="w-7 h-7"/></div>
              <h4 className={`font-bold text-base mb-2 ${i % 2 === 0 ? "text-white" : "text-[var(--green-dark)]"}`}>{c.title}</h4>
              <p className={`text-xs leading-relaxed ${i % 2 === 0 ? "text-white/60" : "text-[var(--green-dark)]/70"}`}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BoardMembers() {
  const board = aboutPageData.board;
  return (
    <section className="py-20 bg-[#F7F7F3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-between items-end mb-12 gap-4">
          <div>
            <SectionLabel text={board.sectionLabel}/>
            <h2 className="text-4xl font-black text-[var(--green-dark)]" style={{ fontFamily: "'Playfair Display', serif" }}>
              {board.headingPrefix} <span className="text-[var(--green-mid)] italic">{board.headingItalic}</span>
            </h2>
          </div>
          <Link to="/become-a-member">
            <YellowBtn className="flex items-center gap-2">
              {board.ctaButtonText} <ArrowRight className="w-4 h-4"/>
            </YellowBtn>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {board.members.map(v => (
            <div key={v.name} className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative overflow-hidden h-64">
                <img src={v.img} alt={v.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"/>
                <div className="absolute top-3 right-3 bg-[var(--yellow)] text-[var(--green-dark)] text-xs font-bold px-3 py-1 rounded-full">{board.badgeText}</div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-[var(--green-dark)] text-base">{v.name}</h4>
                <p className="text-sm text-gray-400 mb-4">{v.role}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {[
                      { Icon: FacebookIcon, href: v.facebook },
                      { Icon: TwitterIcon, href: v.twitter },
                      { Icon: InstagramIcon, href: v.instagram },
                      { Icon: YoutubeIcon, href: v.youtube },
                    ].filter(s => s.href).map(({ Icon: SocialIcon, href }, i) => (
                      <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[var(--yellow)] transition-colors">
                        <SocialIcon className="w-3 h-3 text-[var(--green-mid)]"/>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StateCoordinators() {
  const sc = aboutPageData.stateCoordinators;
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <SectionLabel text={sc.sectionLabel}/>
          <h2 className="text-4xl font-black text-[var(--green-dark)]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {sc.headingPrefix} <span className="text-[var(--green-mid)] italic">{sc.headingItalic}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {sc.members.map(v => (
            <div key={v.name} className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative overflow-hidden h-64">
                <img src={v.img} alt={v.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"/>
                <div className="absolute top-3 right-3 bg-[var(--yellow)] text-[var(--green-dark)] text-xs font-bold px-3 py-1 rounded-full">{sc.badgeText}</div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-[var(--green-dark)] text-base">{v.name}</h4>
                <p className="text-sm text-gray-400 mb-4">{v.role}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {[
                      { Icon: FacebookIcon, href: v.facebook },
                      { Icon: TwitterIcon, href: v.twitter },
                      { Icon: InstagramIcon, href: v.instagram },
                      { Icon: YoutubeIcon, href: v.youtube },
                    ].filter(s => s.href).map(({ Icon: SocialIcon, href }, i) => (
                      <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[var(--yellow)] transition-colors">
                        <SocialIcon className="w-3 h-3 text-[var(--green-mid)]"/>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const items = site.testimonials;
  const t = aboutPageData.testimonials;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Featured testimonial */}
          <div className="lg:col-span-2">
            <SectionLabel text={t.sectionLabel}/>
            <h2 className="text-4xl font-black text-[var(--green-dark)] mb-8 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t.headingPrefix} <span className="text-[var(--green-mid)] italic">{t.headingItalic}</span><br/>{t.headingSuffix}
            </h2>

            <div className="bg-[#F7F7F3] rounded-3xl p-7">
              <QuoteIcon className="w-10 h-10 text-[var(--yellow)] mb-4"/>
              <p className="text-gray-600 text-sm leading-relaxed italic mb-6">"{items[active].text}"</p>
              <div className="flex items-center gap-3">
                <img src={items[active].img} alt={items[active].name} className="w-12 h-12 rounded-full object-cover"/>
                <div>
                  <div className="font-bold text-[var(--green-dark)] text-sm">{items[active].name}</div>
                  <div className="text-xs text-gray-400">{items[active].role}</div>
                  <div className="flex gap-0.5 mt-1 text-[var(--yellow)]">
                    {[...Array(items[active].stars)].map((_, i) => <StarIcon key={i} className="w-3 h-3"/>)}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-5">
              {items.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} className={`transition-all rounded-full ${i === active ? "w-8 h-3 bg-[var(--yellow)]" : "w-3 h-3 bg-gray-200 hover:bg-gray-300"}`}/>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-3 grid grid-cols-1 gap-4">
            {items.map((t, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${i === active ? "bg-[var(--green-mid)] shadow-lg" : "bg-[#F7F7F3] hover:bg-gray-100"}`}
              >
                <img src={t.img} alt={t.name} className="w-14 h-14 rounded-2xl object-cover flex-shrink-0"/>
                <div className="flex-1 min-w-0">
                  <div className={`font-bold text-sm ${i === active ? "text-white" : "text-[var(--green-dark)]"}`}>{t.name}</div>
                  <div className={`text-xs mb-1 ${i === active ? "text-white/60" : "text-gray-400"}`}>{t.role}</div>
                  <p className={`text-xs leading-relaxed line-clamp-2 ${i === active ? "text-white/70" : "text-gray-500"}`}>"{t.text}"</p>
                </div>
                <div className={`flex gap-0.5 flex-shrink-0 ${i === active ? "text-[var(--yellow)]" : "text-gray-300"}`}>
                  {[...Array(5)].map((_, j) => <StarIcon key={j} className="w-3 h-3"/>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const faq = aboutPageData.faq;

  return (
    <section className="py-20 bg-[#F7F7F3]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
        {/* Left image */}
        <div className="relative rounded-3xl overflow-hidden h-[460px]">
          <img
            src={faq.image}
            alt="Community learning"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--green-dark)]/60 to-transparent flex items-end p-7">
            <div>
              <div className="text-[var(--yellow)] text-xs font-bold tracking-widest uppercase mb-2">{faq.imageLabelText}</div>
              <p className="text-white font-bold text-lg leading-snug max-w-xs">{faq.imageCaption}</p>
            </div>
          </div>
        </div>

        {/* Right accordion */}
        <div>
          <SectionLabel text={faq.sectionLabel}/>
          <h2 className="text-4xl font-black text-[var(--green-dark)] mb-8 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            {faq.headingLine1}<br/>{faq.headingLine2Prefix} <span className="text-[var(--green-mid)] italic">{faq.headingItalic}</span><br/>{faq.headingLine3}
          </h2>

          <div className="space-y-3">
            {faq.items.map((item, i) => (
              <div
                key={i}
                className={`rounded-2xl border-2 overflow-hidden transition-all ${open === i ? "border-[var(--yellow)]" : "border-gray-100 bg-white"}`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-3 p-5 text-left"
                >
                  <span className={`font-semibold text-sm leading-snug ${open === i ? "text-[var(--green-dark)]" : "text-gray-600"}`}>
                    {item.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${open === i ? "bg-[var(--yellow)]" : "bg-gray-100"}`}>
                    <ChevronDown className={`w-4 h-4 transition-transform ${open === i ? "rotate-180 text-[var(--green-dark)]" : "text-gray-500"}`}/>
                  </div>
                </button>
                {open === i && (
                  <div className="px-5 pb-5">
                    <div className="h-px bg-[var(--yellow)]/30 mb-4"/>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <PageHero
        image={aboutPageData.hero.image}
        title={aboutPageData.hero.title}
        breadcrumbHome={aboutPageData.hero.breadcrumbHome}
        breadcrumbCurrent={aboutPageData.hero.breadcrumbCurrent}
      />
      <AboutIntro/>
      <StatsBar/>
      <MissionVisionValues/>
      <TouchingLives/>
      <BoardMembers/>
      <StateCoordinators/>
      <Testimonials/>
      <FAQ/>
      <Newsletter/>
    </>
  );
}
