import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import site from "@/data/site.json";

// ── Icons (inline SVG helpers) — shared across all pages ────────────────────

export const LeafIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-8 2s.06-.06 3 5z"/>
  </svg>
);

export const HeartIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

export const HandIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 6h-2v2.5L8.5 6H7L5 8l2.5 2.5H5v2h2.5L5 15l2 2 2.5-2.5V17h2v-2.5L14 17l2-2-2.5-2.5H16v-2h-2.5L16 8l-2-2-2.5 2.5V6z"/>
  </svg>
);

export const StarIcon = ({ filled = true, className = "w-4 h-4" }: { filled?: boolean; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? 0 : 1.5}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

export const ChevronRight = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
);
export const ChevronLeft = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M15 18l-6-6 6-6"/></svg>
);
export const ChevronDown = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M6 9l6 6 6-6"/>
  </svg>
);
export const GlobeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
);
export const PhoneIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.77 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 013.68 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9a16 16 0 006.29 6.29l1.16-1.16a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
export const MailIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
export const MapPinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);
export const CalendarIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
export const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
);
export const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
  </svg>
);
export const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
export const YoutubeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
);
export const FoodIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="currentColor">
    <path d="M18 8v8a6 6 0 006 6h.5A6.5 6.5 0 0031 15.5V8M24 22v18M14 40h20M6 8c0 8 4 12 8 12M6 8v4c0 4 2 8 8 12"/>
  </svg>
);
export const ChildIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <circle cx="24" cy="10" r="6"/><path d="M14 26c0-5.52 4.48-10 10-10s10 4.48 10 10v14H14V26z"/><path d="M18 40v4M30 40v4"/>
  </svg>
);
export const MedicalIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <rect x="8" y="8" width="32" height="32" rx="4"/><line x1="24" y1="16" x2="24" y2="32"/><line x1="16" y1="24" x2="32" y2="24"/>
  </svg>
);
export const HouseIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <path d="M6 20L24 6l18 14v22H30V30H18v12H6V20z"/>
  </svg>
);
export const ArrowRight = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
export const QuoteIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="currentColor">
    <path d="M10 30c0-8 6-14 14-14v6c-4 0-8 4-8 8v2h8v8H10v-10zm20 0c0-8 6-14 14-14v6c-4 0-8 4-8 8v2h8v8H30v-10z"/>
  </svg>
);
export const CheckIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><polyline points="20 6 9 17 4 12"/></svg>
);
export const PlayIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
);
export const TargetIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
export const EyeIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
export const ShieldIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
export const CheckCircle = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
export const FundraisingIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
  </svg>
);
export const DonationIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);
export const QuestionIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
export const SendIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
  </svg>
);
export const ClipboardIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>
  </svg>
);
export const XIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
export const ArrowUpRight = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
  </svg>
);

// ── Icon lookup (used by CMS-editable "icon" keys) ──────────────────────────

export const ICONS: Record<string, (props: { className?: string }) => ReactNode> = {
  food: FoodIcon,
  child: ChildIcon,
  medical: MedicalIcon,
  house: HouseIcon,
  heart: HeartIcon,
  globe: GlobeIcon,
  hand: HandIcon,
  fundraising: FundraisingIcon,
  donation: DonationIcon,
  phone: PhoneIcon,
  location: MapPinIcon,
  mail: MailIcon,
  question: QuestionIcon,
};
export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = ICONS[name] ?? HeartIcon;
  return <Cmp className={className} />;
}

// ── Shared UI ────────────────────────────────────────────────────────────────

// Used at the top of every inner page (About, Contact, Gallery, and any future
// page) so the banner style — photo, dark overlay, yellow paint-splatter accent,
// title, and breadcrumb — stays identical everywhere instead of drifting per page.
export function PageHero({
  image, title, breadcrumbHome, breadcrumbCurrent,
}: {
  image: string;
  title: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
}) {
  return (
    <section className="relative h-64 md:h-80 flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={image} alt={`${title} hero`} className="w-full h-full object-cover object-center"/>
        <div className="absolute inset-0 bg-[var(--green-dark)]/80"/>
      </div>

      {/* Yellow paint splatter accent — left side */}
      <div className="absolute left-0 top-0 bottom-0 w-44 pointer-events-none z-10 overflow-hidden">
        <svg viewBox="0 0 175 320" className="absolute left-0 top-0 w-full h-full" preserveAspectRatio="xMinYMid slice">
          <path d="M-10,80 C10,40 60,20 90,50 C120,80 130,120 110,160 C95,195 115,235 95,270 C75,305 30,310 10,285 C-10,260 -5,220 5,190 C15,160 -30,120 -10,80Z" fill="var(--yellow)" opacity="0.95"/>
          <circle cx="105" cy="55"  r="28" fill="var(--yellow)" opacity="0.80"/>
          <circle cx="130" cy="110" r="18" fill="var(--yellow)" opacity="0.65"/>
          <circle cx="115" cy="185" r="14" fill="var(--yellow)" opacity="0.55"/>
          <circle cx="95"  cy="295" r="20" fill="var(--yellow)" opacity="0.60"/>
          <circle cx="140" cy="155" r="9"  fill="var(--yellow)" opacity="0.42"/>
          <circle cx="148" cy="230" r="7"  fill="var(--yellow)" opacity="0.35"/>
          <circle cx="60"  cy="20"  r="12" fill="var(--yellow)" opacity="0.50"/>
          <ellipse cx="30" cy="315" rx="18" ry="10" fill="var(--yellow)" opacity="0.70"/>
          <ellipse cx="65" cy="318" rx="10" ry="6"  fill="var(--yellow)" opacity="0.55"/>
        </svg>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 w-full pl-36 md:pl-48">
        <h1 className="text-5xl md:text-6xl font-black text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          {title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-white/60">
          <Link to="/" className="hover:text-[var(--yellow)] transition-colors">{breadcrumbHome}</Link>
          <ChevronRight className="w-3 h-3"/>
          <span className="text-[var(--yellow)]">{breadcrumbCurrent}</span>
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div className={"flex items-center gap-2 mb-3 " + (light ? "text-[var(--yellow)]" : "text-[var(--green-mid)]")}>
      <LeafIcon className="w-4 h-4"/>
      <span className="text-sm font-semibold tracking-widest uppercase">{text}</span>
    </div>
  );
}
export function YellowBtn({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <button className={"bg-[var(--yellow)] text-[var(--green-dark)] font-bold px-6 py-3 rounded-full hover:bg-[var(--yellow-dark)] transition-colors " + className}>{children}</button>;
}
export function GreenBtn({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <button className={"bg-[var(--green-mid)] text-white font-semibold px-6 py-3 rounded-full hover:bg-[var(--green-dark)] transition-colors " + className}>{children}</button>;
}
export function OutlineBtn({ children, className = "", light = false }: { children: ReactNode; className?: string; light?: boolean }) {
  return <button className={"border-2 font-semibold px-6 py-3 rounded-full transition-colors " + (light ? "border-white text-white hover:bg-white hover:text-[var(--green-mid)]" : "border-[var(--green-mid)] text-[var(--green-mid)] hover:bg-[var(--green-mid)] hover:text-white") + " " + className}>{children}</button>;
}
export function Newsletter() {
  const n = site.newsletter;
  return (
    <section className="bg-[var(--green-mid)] py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <LeafIcon className="w-8 h-8 text-[var(--yellow)] mx-auto mb-4"/>
        <h2 className="text-3xl font-black text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          {n.headingPrefix} <span className="text-[var(--yellow)]">{n.headingHighlight}</span>
        </h2>
        <p className="text-white/60 mb-8">{n.paragraph}</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            type="email"
            placeholder={n.placeholder}
            className="flex-1 px-5 py-3 rounded-full text-sm focus:outline-none text-gray-800 bg-white placeholder-gray-400 border-0"
          />
          <YellowBtn className="whitespace-nowrap">{n.buttonText}</YellowBtn>
        </div>
      </div>
    </section>
  );
}
export function ProgressBar({ raised, goal }: { raised: number; goal: number }) {
  const pct = Math.round((raised / goal) * 100);
  const fp = site.featuredProjects;
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>{fp.raisedLabel} <strong className="text-[var(--green-mid)]">₦{raised.toLocaleString()}</strong></span>
        <span>{fp.goalLabel} <strong>₦{goal.toLocaleString()}</strong></span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-[var(--yellow)] rounded-full" style={{ width: pct + "%" }}/>
      </div>
      <div className="text-right text-xs text-[var(--green-mid)] font-bold mt-1">{pct}%</div>
    </div>
  );
}
