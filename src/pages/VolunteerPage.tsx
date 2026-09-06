import { Link } from "react-router-dom";
import site from "@/data/site.json";
import volunteerPageData from "@/data/volunteerPage.json";
import {
  FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon,
  SectionLabel, YellowBtn, Newsletter, PageHero,
} from "@/components/shared";

// ── Starburst decoration ──────────────────────────────────────────────────────

function Starburst({ className = "" }: { className?: string }) {
  const spikes = 16;
  const cx = 50, cy = 50, outerR = 48, innerR = 28;
  const points: string[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const angle = (Math.PI / spikes) * i - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor">
      <polygon points={points.join(" ")}/>
    </svg>
  );
}

// ── Volunteer Card ────────────────────────────────────────────────────────────

// A rotating set of brand-tinted backdrops shown behind each photo while it
// loads — purely decorative, not tied to any real per-person data.
const CARD_BACKDROPS = ["var(--yellow)", "var(--green-mid)", "#C8B8D8", "#A8C8A0"];

type Volunteer = { name: string; role: string; img: string };

function VolunteerCard({ volunteer, backdrop, badgeText }: { volunteer: Volunteer; backdrop: string; badgeText: string }) {
  const socials = [FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon];
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="relative h-52 overflow-hidden" style={{ backgroundColor: backdrop }}>
        <img src={volunteer.img} alt={volunteer.name} className="w-full h-full object-cover object-top"/>
        <div className="absolute bottom-0 left-0 right-0 bg-[var(--green-dark)]/85 py-1.5 text-center">
          <span className="text-white text-xs font-black tracking-[0.2em] uppercase">{badgeText}</span>
        </div>
      </div>
      <div className="px-4 pt-3.5 pb-4 text-center">
        <h3 className="font-bold text-[var(--green-dark)] text-base leading-tight">{volunteer.name}</h3>
        <p className="text-[var(--green-mid)] text-xs mt-0.5 mb-3">{volunteer.role}</p>
        <div className="flex justify-center gap-2">
          {socials.map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[var(--green-dark)] hover:text-white hover:border-[var(--green-dark)] transition-colors"
            >
              <Icon/>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Volunteers Section ────────────────────────────────────────────────────────
// Uses the same volunteer photos/names/roles and "Meet Our Volunteers" heading
// already entered under Homepage Content — add more people there and this
// grid grows automatically, no fixed slot count.

function VolunteersSection() {
  const volunteers = site.volunteers as Volunteer[];
  const vs = site.volunteersSection;
  const tp = volunteerPageData.team;
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-start justify-center gap-6 mb-12">
          <Starburst className="w-14 h-14 text-[var(--yellow)] flex-shrink-0 mt-1"/>
          <div className="text-center">
            <SectionLabel text={tp.sectionLabel}/>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--green-dark)] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              {vs.headingPrefix} <span className="italic">{vs.headingItalic}</span>
            </h2>
            <Link to="/contact">
              <YellowBtn>{tp.buttonText}</YellowBtn>
            </Link>
          </div>
          <div className="w-14 flex-shrink-0"/>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12">
          {volunteers.map((v, i) => (
            <VolunteerCard key={v.name} volunteer={v} backdrop={CARD_BACKDROPS[i % CARD_BACKDROPS.length]} badgeText={vs.badgeText}/>
          ))}
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
      <VolunteersSection/>
      <Newsletter/>
    </>
  );
}
