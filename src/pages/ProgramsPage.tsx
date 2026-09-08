import { useState } from "react";
import { Link } from "react-router-dom";
import programsPageData from "@/data/programsPage.json";
import {
  LeafIcon, ArrowRight, ArrowUpRight,
  MapPinIcon, CalendarIcon, UsersIcon, ClockIcon, CheckCircle,
  SectionLabel, YellowBtn, OutlineBtn, Newsletter, PageHero,
} from "@/components/shared";

// ── Program data ──────────────────────────────────────────────────────────────

type Status = "ongoing" | "upcoming" | "completed";

interface Program {
  title: string;
  category: string;
  status: Status;
  location: string;
  date: string;
  beneficiaries: string;
  raised: number;
  goal: number;
  description: string;
  objectives: string[];
  impact: string;
  coordinator: string;
  partners: string[];
  img: string;
  images: string[];
}

const programs = programsPageData.programs as Program[];
const st = programsPageData.statusLabels;
const dt = programsPageData.detail;
const cd = programsPageData.card;

const statusDot: Record<Status, string> = {
  ongoing: "bg-[var(--green-dark)]",
  upcoming: "bg-[var(--yellow)]",
  completed: "bg-gray-400",
};
const statusBadge: Record<Status, string> = {
  ongoing: "bg-[var(--green-dark)]/10 text-[var(--green-dark)]",
  upcoming: "bg-[var(--yellow)]/20 text-[#8B6B00]",
  completed: "bg-gray-100 text-gray-500",
};

// Category badges are free text (added per-program in the CMS), so any
// category gets a sensible fallback color — only these few get a themed one.
const CATEGORY_COLORS: Record<string, string> = {
  food: "bg-orange-100 text-orange-700",
  education: "bg-blue-100 text-blue-700",
  medical: "bg-red-100 text-red-700",
  community: "bg-green-100 text-green-700",
};
function categoryColor(category: string) {
  return CATEGORY_COLORS[category.toLowerCase()] ?? "bg-gray-100 text-gray-600";
}

// ── Stats Bar ─────────────────────────────────────────────────────────────────

function StatsBar() {
  const s = programsPageData.stats;
  const ongoingCount = programs.filter(p => p.status === "ongoing").length;
  const upcomingCount = programs.filter(p => p.status === "upcoming").length;
  const stats = [
    { value: String(programs.length), label: s.totalLabel, icon: <LeafIcon className="w-6 h-6"/> },
    { value: String(ongoingCount), label: s.ongoingLabel, icon: <ClockIcon className="w-6 h-6"/> },
    { value: String(upcomingCount), label: s.upcomingLabel, icon: <CalendarIcon className="w-6 h-6"/> },
    { value: s.beneficiariesValue, label: s.beneficiariesLabel, icon: <UsersIcon className="w-6 h-6"/> },
  ];
  return (
    <section className="bg-[var(--green-dark)] py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--yellow)]/20 flex items-center justify-center text-[var(--yellow)] flex-shrink-0">
                {s.icon}
              </div>
              <div>
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-xs text-white/50 mt-0.5 leading-tight">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Spotlight ─────────────────────────────────────────────────────────────────

function Spotlight({ onOpen }: { onOpen: (p: Program) => void }) {
  const sp = programsPageData.spotlight;
  const p = programs.find(x => x.status === "ongoing") ?? programs[0];
  if (!p) return null;
  return (
    <section className="py-20 bg-[#F7F7F3]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel text={sp.sectionLabel}/>
        <h2 className="text-3xl md:text-4xl font-black text-[var(--green-dark)] mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>
          {sp.headingPrefix} <span className="italic text-[var(--green-mid)]">{sp.headingItalic}</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl">
          {/* Image */}
          <div className="relative h-72 lg:h-auto min-h-80">
            <img src={p.img} alt={p.title} className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--green-dark)]/70 to-transparent"/>
            <div className="absolute top-5 left-5 flex gap-2">
              <span className="flex items-center gap-1.5 bg-[var(--green-dark)] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                <span className={`w-1.5 h-1.5 rounded-full ${statusDot[p.status]} ${p.status === "ongoing" ? "animate-pulse" : ""}`}/>
                {st[p.status]}
              </span>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${categoryColor(p.category)}`}>{p.category}</span>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-black text-[var(--green-dark)] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{p.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{p.description}</p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { icon: <MapPinIcon className="w-3.5 h-3.5"/>, text: p.location },
                  { icon: <CalendarIcon className="w-3.5 h-3.5"/>, text: p.date },
                  { icon: <UsersIcon className="w-3.5 h-3.5"/>, text: p.beneficiaries },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="text-[var(--green-dark)]">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <a href="/#donate">
                <YellowBtn className="flex items-center gap-2 text-sm py-3">
                  {sp.donateButtonText} <ArrowUpRight className="w-4 h-4"/>
                </YellowBtn>
              </a>
              <OutlineBtn className="flex items-center gap-2 text-sm py-3" onClick={() => onOpen(p)}>
                {sp.learnMoreButtonText} <ArrowRight className="w-4 h-4"/>
              </OutlineBtn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Program Card ──────────────────────────────────────────────────────────────

function ProgramCard({ p, onOpen }: { p: Program; onOpen: () => void }) {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group border border-gray-100 flex flex-col cursor-pointer"
      onClick={onOpen}
    >
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"/>
        <div className={`absolute top-3 left-3 flex items-center gap-1.5 ${statusBadge[p.status]} text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusDot[p.status]} ${p.status === "ongoing" ? "animate-pulse" : ""}`}/>
          {st[p.status]}
        </div>
        <div className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full ${categoryColor(p.category)}`}>
          {p.category}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-[var(--green-dark)] text-base leading-snug mb-2">{p.title}</h3>
        <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2 flex-1">{p.description}</p>

        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <MapPinIcon className="w-3.5 h-3.5 text-[var(--green-dark)]"/> {p.location}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <CalendarIcon className="w-3.5 h-3.5 text-[var(--green-dark)]"/> {p.date}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <UsersIcon className="w-3.5 h-3.5 text-[var(--green-dark)]"/> {p.beneficiaries}
          </div>
        </div>

        <div className="flex gap-2 mt-auto" onClick={e => e.stopPropagation()}>
          {p.status !== "completed" && (
            <a href="/#donate" onClick={e => e.stopPropagation()} className="flex-1 bg-[var(--yellow)] text-[var(--green-dark)] text-xs font-bold py-2.5 rounded-full hover:bg-[var(--yellow-dark)] transition-colors text-center">
              {cd.donateButtonText}
            </a>
          )}
          <button
            onClick={onOpen}
            className={`${p.status === "completed" ? "flex-1" : ""} flex items-center justify-center gap-1 border-2 border-[var(--green-dark)] text-[var(--green-dark)] text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-[var(--green-dark)] hover:text-white transition-colors`}
          >
            {p.status === "completed" ? cd.viewImpactButtonText : cd.detailsButtonText} <ArrowRight className="w-3 h-3"/>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Program Detail View ───────────────────────────────────────────────────────

function ProgramDetail({ p, onBack }: { p: Program; onBack: () => void }) {
  const related = programs.filter(r => r.title !== p.title && (r.category === p.category || r.status === p.status)).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={p.img} alt={p.title} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-[var(--green-dark)]/75"/>
        <button
          onClick={onBack}
          className="absolute top-6 left-6 flex items-center gap-2 bg-white/15 hover:bg-[var(--yellow)] text-white hover:text-[var(--green-dark)] backdrop-blur-sm font-semibold text-sm px-4 py-2 rounded-full transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M15 18l-6-6 6-6"/></svg>
          {dt.backButtonText}
        </button>
        <div className="absolute bottom-8 left-0 right-0 max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`flex items-center gap-1.5 ${statusBadge[p.status]} text-xs font-bold px-3 py-1.5 rounded-full`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusDot[p.status]} ${p.status === "ongoing" ? "animate-pulse" : ""}`}/>
              {st[p.status]}
            </span>
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${categoryColor(p.category)}`}>{p.category}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            {p.title}
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <div className="flex items-center gap-2 text-[var(--green-dark)] mb-3">
                <LeafIcon className="w-4 h-4"/>
                <span className="text-xs font-semibold tracking-widest uppercase">{dt.overviewLabel}</span>
              </div>
              <p className="text-gray-600 leading-relaxed text-[15px]">{p.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-black text-[var(--green-dark)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{dt.objectivesHeading}</h3>
              <ul className="space-y-3">
                {p.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--yellow)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-[var(--green-dark)]"/>
                    </div>
                    <span className="text-gray-600 text-sm leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#F7F7F3] rounded-2xl p-6">
              <h3 className="text-xl font-black text-[var(--green-dark)] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                {p.status === "completed" ? dt.impactHeadingCompleted : dt.impactHeadingOngoing}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{p.impact}</p>
            </div>

            {p.images.length > 0 && (
              <div>
                <h3 className="text-xl font-black text-[var(--green-dark)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{dt.photosHeading}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {p.images.map((src, i) => (
                    <div key={i} className={`rounded-xl overflow-hidden ${i === 0 && p.images.length >= 3 ? "col-span-2 h-52" : "h-36"}`}>
                      <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {p.partners.length > 0 && (
              <div>
                <h3 className="text-xl font-black text-[var(--green-dark)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{dt.partnersHeading}</h3>
                <div className="flex flex-wrap gap-2">
                  {p.partners.map(partner => (
                    <span key={partner} className="border-2 border-gray-200 text-gray-500 text-xs font-semibold px-4 py-2 rounded-full hover:border-[var(--green-dark)] hover:text-[var(--green-dark)] transition-colors cursor-default">
                      {partner}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — info card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
              <h4 className="font-black text-[var(--green-dark)] text-sm tracking-widest uppercase">{dt.detailsHeading}</h4>
              <div className="space-y-3 text-sm">
                {[
                  { icon: <MapPinIcon className="w-4 h-4"/>, label: dt.locationLabel, val: p.location },
                  { icon: <CalendarIcon className="w-4 h-4"/>, label: dt.durationLabel, val: p.date },
                  { icon: <UsersIcon className="w-4 h-4"/>, label: dt.beneficiariesLabel, val: p.beneficiaries },
                  { icon: <CheckCircle className="w-4 h-4"/>, label: dt.statusLabel, val: st[p.status] },
                ].map(row => (
                  <div key={row.label} className="flex items-start gap-3">
                    <span className="text-[var(--green-dark)] mt-0.5 flex-shrink-0">{row.icon}</span>
                    <div>
                      <div className="text-xs text-gray-400 font-medium">{row.label}</div>
                      <div className="text-gray-700 font-semibold">{row.val}</div>
                    </div>
                  </div>
                ))}
                <div className="flex items-start gap-3">
                  <LeafIcon className="w-4 h-4 text-[var(--green-dark)] mt-0.5 flex-shrink-0"/>
                  <div>
                    <div className="text-xs text-gray-400 font-medium">{dt.coordinatorLabel}</div>
                    <div className="text-gray-700 font-semibold">{p.coordinator}</div>
                  </div>
                </div>
              </div>

              {p.status !== "completed" && (
                <a href="/#donate" className="w-full flex items-center justify-center gap-2 bg-[var(--yellow)] text-[var(--green-dark)] font-bold py-3 rounded-full hover:bg-[var(--yellow-dark)] transition-colors text-sm">
                  {dt.donateToProgramButtonText} <ArrowUpRight className="w-4 h-4"/>
                </a>
              )}
              <button
                onClick={onBack}
                className="w-full flex items-center justify-center gap-2 border-2 border-[var(--green-dark)] text-[var(--green-dark)] font-semibold py-2.5 rounded-full hover:bg-[var(--green-dark)] hover:text-white transition-colors text-sm"
              >
                ← {dt.allProgramsButtonText}
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-2 text-[var(--green-dark)] mb-2">
              <LeafIcon className="w-4 h-4"/>
              <span className="text-xs font-semibold tracking-widest uppercase">{dt.relatedLabel}</span>
            </div>
            <h3 className="text-2xl font-black text-[var(--green-dark)] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>{dt.relatedHeading}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(r => (
                <ProgramCard key={r.title} p={r} onOpen={() => { window.scrollTo(0, 0); }}/>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Programs Grid ─────────────────────────────────────────────────────────────

function ProgramsGrid({ onOpen }: { onOpen: (p: Program) => void }) {
  const g = programsPageData.grid;
  const [activeTab, setActiveTab] = useState<Status | "all">("all");

  const tabs: { label: string; value: Status | "all" }[] = [
    { label: g.allTabLabel, value: "all" },
    { label: st.ongoing, value: "ongoing" },
    { label: st.upcoming, value: "upcoming" },
    { label: st.completed, value: "completed" },
  ];

  const filtered = activeTab === "all" ? programs : programs.filter(p => p.status === activeTab);
  const ongoing = programs.filter(p => p.status === "ongoing");
  const upcoming = programs.filter(p => p.status === "upcoming");
  const completed = programs.filter(p => p.status === "completed");

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <SectionLabel text={g.sectionLabel}/>
            <h2 className="text-3xl md:text-4xl font-black text-[var(--green-dark)]" style={{ fontFamily: "'Playfair Display', serif" }}>
              {g.headingPrefix} <span className="italic text-[var(--green-mid)]">{g.headingItalic}</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {tabs.map(t => (
              <button
                key={t.value}
                onClick={() => setActiveTab(t.value)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === t.value
                    ? "bg-[var(--green-dark)] text-white shadow-md"
                    : "border-2 border-gray-200 text-gray-500 hover:border-[var(--green-dark)] hover:text-[var(--green-dark)]"
                }`}
              >
                {t.label}
                {t.value !== "all" && (
                  <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === t.value ? "bg-[var(--yellow)] text-[var(--green-dark)]" : "bg-gray-100"
                  }`}>
                    {t.value === "ongoing" ? ongoing.length : t.value === "upcoming" ? upcoming.length : completed.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {activeTab !== "all" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => <ProgramCard key={p.title} p={p} onOpen={() => onOpen(p)}/>)}
          </div>
        )}

        {activeTab === "all" && (
          <div className="space-y-14">
            {[
              { items: ongoing, label: st.ongoing, badge: statusBadge.ongoing, dot: statusDot.ongoing, pulse: true },
              { items: upcoming, label: st.upcoming, badge: statusBadge.upcoming, dot: statusDot.upcoming, pulse: false },
              { items: completed, label: st.completed, badge: statusBadge.completed, dot: statusDot.completed, pulse: false },
            ].filter(group => group.items.length > 0).map(group => (
              <div key={group.label}>
                <div className="flex items-center gap-3 mb-6">
                  <span className={`flex items-center gap-1.5 ${group.badge} text-xs font-bold px-3 py-1.5 rounded-full`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${group.dot} ${group.pulse ? "animate-pulse" : ""}`}/>
                    {group.label}
                  </span>
                  <div className="flex-1 h-px bg-gray-100"/>
                  <span className="text-xs text-gray-400">{group.items.length} {g.programsCountSuffix}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.items.map(p => <ProgramCard key={p.title} p={p} onOpen={() => onOpen(p)}/>)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ── CTA Band ──────────────────────────────────────────────────────────────────

function CTABand() {
  const cta = programsPageData.cta;
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={cta.backgroundImage}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--green-dark)]/85"/>
      </div>
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <SectionLabel text={cta.sectionLabel} light/>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          {cta.headingPrefix} <span className="text-[var(--yellow)] italic">{cta.headingItalic}</span>
        </h2>
        <p className="text-white/65 max-w-xl mx-auto mb-8 leading-relaxed">
          {cta.paragraph}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/#donate">
            <YellowBtn className="flex items-center gap-2">
              {cta.donateButtonText} <ArrowUpRight className="w-4 h-4"/>
            </YellowBtn>
          </a>
          <Link to="/become-a-volunteer">
            <OutlineBtn light className="flex items-center gap-2">
              {cta.volunteerButtonText} <ArrowRight className="w-4 h-4"/>
            </OutlineBtn>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ProgramsPage() {
  const [selected, setSelected] = useState<Program | null>(null);

  function open(p: Program) { setSelected(p); window.scrollTo({ top: 0, behavior: "smooth" }); }
  function back() { setSelected(null); window.scrollTo({ top: 0, behavior: "smooth" }); }

  if (selected) {
    return (
      <>
        <ProgramDetail p={selected} onBack={back}/>
        <Newsletter/>
      </>
    );
  }

  return (
    <>
      <PageHero
        image={programsPageData.hero.image}
        title={programsPageData.hero.title}
        breadcrumbHome={programsPageData.hero.breadcrumbHome}
        breadcrumbCurrent={programsPageData.hero.breadcrumbCurrent}
      />
      <StatsBar/>
      <Spotlight onOpen={open}/>
      <ProgramsGrid onOpen={open}/>
      <CTABand/>
      <Newsletter/>
    </>
  );
}
