import { useState, type CSSProperties } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import logoImg from "@/imports/logo-full-original.png";
import site from "@/data/site.json";
import {
  MailIcon, PhoneIcon, MapPinIcon, FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon,
  ChevronRight, YellowBtn,
} from "./shared";

// ── Top utility bar ──────────────────────────────────────────────────────────

function TopBar() {
  return (
    <div className="bg-[var(--green-dark)] text-white text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><MailIcon className="w-3 h-3 text-[var(--yellow)]"/> {site.contact.email}</span>
          <span className="flex items-center gap-1"><PhoneIcon className="w-3 h-3 text-[var(--yellow)]"/> {site.contact.phone}</span>
          <span className="flex items-center gap-1"><MapPinIcon className="w-3 h-3 text-[var(--yellow)]"/> {site.contact.topBarAddress}</span>
        </div>
        <div className="flex items-center gap-3">
          <a href={site.contact.facebook} className="hover:text-[var(--yellow)]"><FacebookIcon/></a>
          <a href={site.contact.twitter} className="hover:text-[var(--yellow)]"><TwitterIcon/></a>
          <a href={site.contact.instagram} className="hover:text-[var(--yellow)]"><InstagramIcon/></a>
          <a href={site.contact.youtube} className="hover:text-[var(--yellow)]"><YoutubeIcon/></a>
        </div>
      </div>
    </div>
  );
}

// ── Main navigation ───────────────────────────────────────────────────────────

// Pages that exist so far link for real; "Programs" is a placeholder until built.
const NAV_LINKS: { label: string; to?: string }[] = [
  { label: site.nav.homeLabel, to: "/" },
  { label: site.nav.aboutLabel, to: "/about" },
  { label: site.nav.servicesLabel },
  { label: site.nav.galleryLabel, to: "/gallery" },
];

function NavItem({ label, to, onClick }: { label: string; to?: string; onClick?: () => void }) {
  if (!to) {
    return <a href="#" onClick={onClick} className="hover:text-[var(--yellow)] transition-colors">{label}</a>;
  }
  return (
    <NavLink
      to={to}
      end={to === "/"}
      onClick={onClick}
      className={({ isActive }) => "transition-colors " + (isActive ? "text-[var(--yellow)]" : "hover:text-[var(--yellow)]")}
    >
      {label}
    </NavLink>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-[var(--green-mid)] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logoImg} alt="Ochaworth" className="h-12 w-auto object-contain"/>
        </Link>
        <div className="hidden lg:flex items-center gap-8 text-sm text-white font-medium">
          {NAV_LINKS.map(n => <NavItem key={n.label} {...n}/>)}
          <NavLink to="/contact" className={({ isActive }) => "transition-colors " + (isActive ? "text-[var(--yellow)]" : "hover:text-[var(--yellow)]")}>{site.nav.contactLabel}</NavLink>
        </div>
        <div className="hidden lg:flex"><YellowBtn className="text-sm py-2 px-5">{site.nav.donateButtonText}</YellowBtn></div>
        <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {menuOpen ? <path d="M6 18L18 6M6 6l12 12"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="lg:hidden bg-[var(--green-dark)] px-4 pb-4 flex flex-col gap-3 text-white text-sm">
          {NAV_LINKS.map(n => <NavItem key={n.label} {...n} onClick={() => setMenuOpen(false)}/>)}
          <NavLink to="/contact" onClick={() => setMenuOpen(false)} className="py-1 hover:text-[var(--yellow)]">{site.nav.contactLabel}</NavLink>
          <YellowBtn className="mt-2 self-start text-sm py-2 px-5">{site.nav.donateButtonText}</YellowBtn>
        </div>
      )}
    </nav>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

const FOOTER_QUICK_LINKS: { label: string; to?: string }[] = [
  { label: site.footer.quickLinks.homeLabel, to: "/" },
  { label: site.footer.quickLinks.aboutLabel, to: "/about" },
  { label: site.footer.quickLinks.servicesLabel },
  { label: site.footer.quickLinks.projectsLabel },
  { label: site.footer.quickLinks.volunteerLabel },
  { label: site.footer.quickLinks.donateLabel },
];

function FooterLink({ label, to }: { label: string; to?: string }) {
  const content = <><ChevronRight className="w-3 h-3"/> {label}</>;
  if (!to) {
    return <a href="#" className="hover:text-[var(--yellow)] flex items-center gap-1">{content}</a>;
  }
  return <Link to={to} className="hover:text-[var(--yellow)] flex items-center gap-1">{content}</Link>;
}

function Footer() {
  const c = site.contact;
  const o = site.org;
  return (
    <footer className="bg-[var(--green-dark)] text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img src={logoImg} alt={o.name} className="h-12 w-auto object-contain"/>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              {o.footerBlurb}
            </p>
            <div className="flex gap-3">
              {[
                { Icon: FacebookIcon, href: c.facebook },
                { Icon: TwitterIcon, href: c.twitter },
                { Icon: InstagramIcon, href: c.instagram },
                { Icon: YoutubeIcon, href: c.youtube },
              ].map(({ Icon: SocialIcon, href }, i) => (
                <a key={i} href={href} className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--yellow)] hover:text-[var(--green-dark)] transition-colors">
                  <SocialIcon className="w-4 h-4"/>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-[var(--yellow)] mb-4 text-sm tracking-widest uppercase">{site.footer.quickLinksHeading}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              {FOOTER_QUICK_LINKS.map(l => <li key={l.label}><FooterLink {...l}/></li>)}
            </ul>
          </div>

          {/* Our Causes */}
          <div>
            <h4 className="font-bold text-[var(--yellow)] mb-4 text-sm tracking-widest uppercase">{site.footer.causesHeading}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              {site.footer.causes.map(l => (
                <li key={l}><a href="#" className="hover:text-[var(--yellow)] flex items-center gap-1"><ChevronRight className="w-3 h-3"/> {l}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-[var(--yellow)] mb-4 text-sm tracking-widest uppercase">{site.footer.contactHeading}</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex gap-2"><MapPinIcon className="w-4 h-4 text-[var(--yellow)] flex-shrink-0 mt-0.5"/> {c.footerAddress}</li>
              <li className="flex gap-2"><PhoneIcon className="w-4 h-4 text-[var(--yellow)] flex-shrink-0"/> {c.phone}</li>
              <li className="flex gap-2"><MailIcon className="w-4 h-4 text-[var(--yellow)] flex-shrink-0"/> {c.email}</li>
            </ul>

            <div className="mt-5">
              <div className="text-xs text-white/40 uppercase tracking-widest mb-2">{site.footer.workingHoursLabel}</div>
              <div className="text-sm text-white/60">{c.hoursWeekday}</div>
              <div className="text-sm text-white/60">{c.hoursSaturday}</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/30">
          <p>{o.copyright}</p>
          <div className="flex gap-5">
            {site.footer.policyLinks.map(l => <a key={l} href="#" className="hover:text-[var(--yellow)]">{l}</a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Layout ────────────────────────────────────────────────────────────────────
// Wraps every page with the theme colors, top bar, nav, footer, and an <Outlet/>
// for the routed page content (Home, About Us, and future pages).

export default function Layout() {
  const theme = site.theme;
  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "'Poppins', sans-serif",
        "--green-dark": theme.primaryDark,
        "--green-mid": theme.primaryMid,
        "--yellow": theme.accent,
        "--yellow-dark": theme.accentDark,
      } as CSSProperties}
    >
      <TopBar/>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  );
}
