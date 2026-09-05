import { useState, useEffect } from "react";
import logoImg from "@/imports/logo-full-original.png";

// ── Icons (inline SVG helpers) ─────────────────────────────────────────────

const LeafIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-8 2s.06-.06 3 5z"/>
  </svg>
);

const HeartIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const HandIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 6h-2v2.5L8.5 6H7L5 8l2.5 2.5H5v2h2.5L5 15l2 2 2.5-2.5V17h2v-2.5L14 17l2-2-2.5-2.5H16v-2h-2.5L16 8l-2-2-2.5 2.5V6z"/>
  </svg>
);

const StarIcon = ({ filled = true, className = "w-4 h-4" }: { filled?: boolean; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? 0 : 1.5}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const ChevronRight = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M9 18l6-6-6-6"/>
  </svg>
);

const ChevronLeft = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M15 18l-6-6 6-6"/>
  </svg>
);

const GlobeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
);

const PhoneIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.77 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 013.68 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9a16 16 0 006.29 6.29l1.16-1.16a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

const MailIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);

const MapPinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const CalendarIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);

const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
);

const FoodIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="currentColor">
    <path d="M18 8v8a6 6 0 006 6h.5A6.5 6.5 0 0031 15.5V8M24 22v18M14 40h20M6 8c0 8 4 12 8 12M6 8v4c0 4 2 8 8 12"/>
  </svg>
);

const ChildIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <circle cx="24" cy="10" r="6"/><path d="M14 26c0-5.52 4.48-10 10-10s10 4.48 10 10v14H14V26z"/><path d="M18 40v4M30 40v4"/>
  </svg>
);

const MedicalIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <rect x="8" y="8" width="32" height="32" rx="4"/><line x1="24" y1="16" x2="24" y2="32"/><line x1="16" y1="24" x2="32" y2="24"/>
  </svg>
);

const HouseIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <path d="M6 20L24 6l18 14v22H30V30H18v12H6V20z"/>
  </svg>
);

const ArrowRight = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const QuoteIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="currentColor">
    <path d="M10 30c0-8 6-14 14-14v6c-4 0-8 4-8 8v2h8v8H10v-10zm20 0c0-8 6-14 14-14v6c-4 0-8 4-8 8v2h8v8H30v-10z"/>
  </svg>
);

const CheckIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

// ── Data ────────────────────────────────────────────────────────────────────

const services = [
  { icon: <FoodIcon className="w-10 h-10"/>, title: "Food Distribution", desc: "Providing nutritious meals to families and individuals facing food insecurity across communities.", color: "#F5C842" },
  { icon: <ChildIcon className="w-10 h-10"/>, title: "Child Education", desc: "Ensuring every child has access to quality education and learning opportunities for a brighter future.", color: "#F5C842" },
  { icon: <MedicalIcon className="w-10 h-10"/>, title: "Medical Support", desc: "Delivering essential healthcare services and medical supplies to underserved populations worldwide.", color: "#F5C842" },
  { icon: <HouseIcon className="w-10 h-10"/>, title: "Poverty Reduction", desc: "Empowering communities with sustainable programs that break the cycle of poverty for generations.", color: "#F5C842" },
];

const projects = [
  { title: "Youth & Medical Support", location: "Kenya, Africa", raised: 12500, goal: 20000, img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&h=400&fit=crop&auto=format" },
  { title: "Volunteer Summits", location: "Ethiopia", raised: 8200, goal: 15000, img: "https://images.unsplash.com/photo-1593113616828-6f22bca04804?w=600&h=400&fit=crop&auto=format" },
  { title: "Eco-Friendly Initiatives", location: "Bangladesh", raised: 5100, goal: 10000, img: "https://images.unsplash.com/photo-1459183885421-5cc683b8dbba?w=600&h=400&fit=crop&auto=format" },
];

const volunteers = [
  { name: "Sarah Johnson", role: "Community Lead", img: "https://images.unsplash.com/photo-1596422219551-adac8612092f?w=400&h=500&fit=crop&auto=format&face" },
  { name: "Michael Chen", role: "Medical Volunteer", img: "https://images.unsplash.com/photo-1547496613-4e19af6736dc?w=400&h=500&fit=crop&auto=format" },
  { name: "Amina Osei", role: "Education Coordinator", img: "https://images.unsplash.com/photo-1507427100689-2bf8574e32d4?w=400&h=500&fit=crop&auto=format" },
  { name: "David Reyes", role: "Field Operations", img: "https://images.unsplash.com/photo-1758599668209-783bd3691ec8?w=400&h=500&fit=crop&auto=format" },
];

const testimonials = [
  { name: "Alex James", role: "Donor", stars: 5, img: "https://images.unsplash.com/photo-1596422219551-adac8612092f?w=100&h=100&fit=crop&auto=format", text: "Deen has transformed my perspective on giving. The transparency and genuine impact they create in communities is unlike any other organization I have supported." },
  { name: "Priya Sharma", role: "Volunteer", stars: 5, img: "https://images.unsplash.com/photo-1758599668429-121d54188b9c?w=100&h=100&fit=crop&auto=format", text: "Volunteering with Deen was a life-changing experience. Every project is thoughtfully planned and the local impact is deeply meaningful and lasting." },
  { name: "Omar Hassan", role: "Community Partner", stars: 5, img: "https://images.unsplash.com/photo-1647538061429-0adc75ad664f?w=100&h=100&fit=crop&auto=format", text: "As a community partner, the support from Deen has been extraordinary. They listen, they adapt, and they deliver results that truly uplift our people." },
];

const events = [
  { month: "JAN", day: "18", title: "Live The Blessings Of Your Day With Celebration", location: "Dhaka, Bangladesh", time: "9:00 AM - 5:00 PM" },
  { month: "FEB", day: "19", title: "Join Us For A Day Of Community And Celebration Of Life", location: "Nairobi, Kenya", time: "10:00 AM - 4:00 PM" },
  { month: "MAR", day: "20", title: "Participate In Our Innovative Sessions For All Ages", location: "Karachi, Pakistan", time: "8:00 AM - 6:00 PM" },
];

const blogs = [
  { category: "Education", date: "Jan 15, 2026", title: "The Real Measure Of Your Wealth Is How Much You'd Be Worth If You Lost All Your Money", img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&h=400&fit=crop&auto=format" },
  { category: "Health", date: "Feb 02, 2026", title: "Thousands Of Candles Can Be Lit From A Single Candle And Life Will Never Become Shorter", img: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=600&h=400&fit=crop&auto=format" },
  { category: "Community", date: "Mar 10, 2026", title: "No Act Of Kindness No Matter How Small Is Ever Wasted In Our World", img: "https://images.unsplash.com/flagged/photo-1555251255-e9a095d6eb9d?w=600&h=400&fit=crop&auto=format" },
];

const mapPins = [
  { top: "35%", left: "22%", label: "USA" },
  { top: "28%", left: "48%", label: "Europe" },
  { top: "48%", left: "52%", label: "Africa" },
  { top: "38%", left: "68%", label: "South Asia" },
  { top: "55%", left: "75%", label: "SE Asia" },
  { top: "62%", left: "32%", label: "South America" },
];

// ── Reusable Components ─────────────────────────────────────────────────────

function SectionLabel({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div className={`flex items-center gap-2 mb-3 ${light ? "text-[#F5C842]" : "text-[#1B3A2B]"}`}>
      <LeafIcon className="w-4 h-4"/>
      <span className="text-sm font-semibold tracking-widest uppercase">{text}</span>
    </div>
  );
}

function YellowBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button className={`bg-[#F5C842] text-[#0D2B1D] font-bold px-6 py-3 rounded-full hover:bg-[#d4a820] transition-colors ${className}`}>
      {children}
    </button>
  );
}

function GreenBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button className={`bg-[#1B3A2B] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#0D2B1D] transition-colors ${className}`}>
      {children}
    </button>
  );
}

function OutlineBtn({ children, className = "", light = false }: { children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <button className={`border-2 font-semibold px-6 py-3 rounded-full transition-colors ${light ? "border-white text-white hover:bg-white hover:text-[#1B3A2B]" : "border-[#1B3A2B] text-[#1B3A2B] hover:bg-[#1B3A2B] hover:text-white"} ${className}`}>
      {children}
    </button>
  );
}

function ProgressBar({ raised, goal }: { raised: number; goal: number }) {
  const pct = Math.round((raised / goal) * 100);
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Raised: <strong className="text-[#1B3A2B]">₦{raised.toLocaleString()}</strong></span>
        <span>Goal: <strong>₦{goal.toLocaleString()}</strong></span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-[#F5C842] rounded-full" style={{ width: `${pct}%` }}/>
      </div>
      <div className="text-right text-xs text-[#1B3A2B] font-bold mt-1">{pct}%</div>
    </div>
  );
}

// ── Sections ────────────────────────────────────────────────────────────────

function TopBar() {
  return (
    <div className="bg-[#0D2B1D] text-white text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><MailIcon className="w-3 h-3 text-[#F5C842]"/> info@deen.org</span>
          <span className="flex items-center gap-1"><PhoneIcon className="w-3 h-3 text-[#F5C842]"/> +1 (800) 123-4567</span>
          <span className="flex items-center gap-1"><MapPinIcon className="w-3 h-3 text-[#F5C842]"/> 123 Charity Lane, Dhaka</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="hover:text-[#F5C842]"><FacebookIcon/></a>
          <a href="#" className="hover:text-[#F5C842]"><TwitterIcon/></a>
          <a href="#" className="hover:text-[#F5C842]"><InstagramIcon/></a>
          <a href="#" className="hover:text-[#F5C842]"><YoutubeIcon/></a>
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-[#1B3A2B] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logoImg} alt="Ochaworth Leadership and Community Development Initiative" className="h-12 w-auto object-contain"/>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8 text-sm text-white font-medium">
          {["Home", "About", "Services", "Projects", "Volunteer", "Blog"].map(n => (
            <a key={n} href="#" className="hover:text-[#F5C842] transition-colors">{n}</a>
          ))}
          <div className="relative group">
            <a href="#" className="flex items-center gap-1 hover:text-[#F5C842]">Pages <ChevronRight className="w-3 h-3 rotate-90"/></a>
          </div>
          <a href="#" className="hover:text-[#F5C842]">Contact</a>
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <YellowBtn className="text-sm py-2 px-5">Donate Now</YellowBtn>
        </div>

        {/* Mobile hamburger */}
        <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {menuOpen ? <path d="M6 18L18 6M6 6l12 12"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[#0D2B1D] px-4 pb-4 flex flex-col gap-3 text-white text-sm">
          {["Home", "About", "Services", "Projects", "Volunteer", "Blog", "Contact"].map(n => (
            <a key={n} href="#" className="py-1 hover:text-[#F5C842]">{n}</a>
          ))}
          <YellowBtn className="mt-2 self-start text-sm py-2 px-5">Donate Now</YellowBtn>
        </div>
      )}
    </nav>
  );
}

const heroSlides = [
  {
    img: "https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=1600&h=1000&fit=crop&auto=format",
    label: "We Are Here To Donate",
    heading: <>Donate Today,<br/><span className="text-[#F5C842]">Transform</span> <span className="italic">Lives</span><br/>Forever!</>,
    sub: "Join us in our mission to create lasting change. Every contribution, big or small, transforms lives and builds stronger communities around the world.",
  },
  {
    img: "https://images.unsplash.com/photo-1593113616828-6f22bca04804?w=1600&h=1000&fit=crop&auto=format",
    label: "Feed The Hungry",
    heading: <>Together We Can<br/><span className="text-[#F5C842]">End</span> <span className="italic">Hunger</span><br/>Worldwide!</>,
    sub: "Our food distribution programs reach thousands of families every week. Your generosity fills empty plates and restores hope in desperate times.",
  },
  {
    img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1600&h=1000&fit=crop&auto=format",
    label: "Educate A Child",
    heading: <>Empower A Child,<br/><span className="text-[#F5C842]">Change</span> <span className="italic">A</span><br/>Generation!</>,
    sub: "Education is the most powerful tool to break the cycle of poverty. Help us send every child to school and build a brighter tomorrow.",
  },
];

function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const id = setInterval(() => slide(1), 5500);
    return () => clearInterval(id);
  }, [current]);

  function slide(dir: number) {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(c => (c + dir + heroSlides.length) % heroSlides.length);
      setAnimating(false);
    }, 400);
  }

  const s = heroSlides[current];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background slides */}
      {heroSlides.map((sl, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, zIndex: 0 }}
        >
          <img src={sl.img} alt="" className="w-full h-full object-cover object-center"/>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D2B1D]/95 via-[#0D2B1D]/75 to-transparent"/>
        </div>
      ))}

      {/* Decorative arc */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none hidden lg:block z-10">
        <div className="absolute right-0 top-0 bottom-0 w-full bg-[#F5C842]/10 rounded-l-full"/>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
        <div
          className="max-w-2xl transition-all duration-500"
          style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(16px)" : "translateY(0)" }}
        >
          <SectionLabel text={s.label} light/>
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            {s.heading}
          </h1>
          <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg">{s.sub}</p>
          <div className="flex flex-wrap gap-4">
            <YellowBtn className="flex items-center gap-2">
              <HeartIcon className="w-4 h-4"/> Donate Now
            </YellowBtn>
            <OutlineBtn light className="flex items-center gap-2">
              Learn More <ArrowRight className="w-4 h-4"/>
            </OutlineBtn>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-14">
            {[
              { value: "3k+", label: "Community Members" },
              { value: "100%", label: "Customer Satisfaction" },
              { value: "10+", label: "Year Organization" },
            ].map(stat => (
              <div key={stat.label} className="text-white">
                <div className="text-3xl font-black text-[#F5C842]">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button onClick={() => slide(-1)} className="w-10 h-10 rounded-full bg-white/20 hover:bg-[#F5C842] transition-colors flex items-center justify-center text-white hover:text-[#0D2B1D]">
          <ChevronLeft className="w-5 h-5"/>
        </button>
        <div className="flex gap-2">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => { if (!animating) { setAnimating(true); setTimeout(() => { setCurrent(i); setAnimating(false); }, 400); } }} className={`transition-all duration-300 rounded-full ${i === current ? "w-8 h-3 bg-[#F5C842]" : "w-3 h-3 bg-white/40 hover:bg-white/70"}`}/>
          ))}
        </div>
        <button onClick={() => slide(1)} className="w-10 h-10 rounded-full bg-white/20 hover:bg-[#F5C842] transition-colors flex items-center justify-center text-white hover:text-[#0D2B1D]">
          <ChevronRight className="w-5 h-5"/>
        </button>
      </div>

      {/* Slide counter */}
      <div className="absolute top-8 right-8 z-20 text-white/50 text-sm font-mono">
        {String(current + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
      </div>
    </section>
  );
}

function VolunteerCards() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#1B3A2B] rounded-2xl p-8 flex flex-col items-start gap-4 text-white hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-[#F5C842] rounded-full flex items-center justify-center">
              <HandIcon className="w-7 h-7 text-[#0D2B1D]"/>
            </div>
            <h3 className="text-xl font-bold">Become a Volunteer</h3>
            <p className="text-white/70 text-sm leading-relaxed">Join our growing network of compassionate volunteers making a real difference every day.</p>
            <button className="text-[#F5C842] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              Join Us <ArrowRight className="w-4 h-4"/>
            </button>
          </div>

          {/* Card 2 – Yellow */}
          <div className="bg-[#F5C842] rounded-2xl p-8 flex flex-col items-start gap-4 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-[#1B3A2B] rounded-full flex items-center justify-center">
              <GlobeIcon className="w-7 h-7 text-[#F5C842]"/>
            </div>
            <h3 className="text-xl font-bold text-[#0D2B1D]">Ready To Change The World?</h3>
            <p className="text-[#0D2B1D]/70 text-sm leading-relaxed">Your support fuels projects that feed, educate, and heal communities across the globe.</p>
            <button className="text-[#1B3A2B] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              Get Started <ArrowRight className="w-4 h-4"/>
            </button>
          </div>

          {/* Card 3 – Image */}
          <div className="rounded-2xl overflow-hidden relative min-h-[280px] group">
            <img
              src="https://images.unsplash.com/photo-1593113616828-6f22bca04804?w=600&h=400&fit=crop&auto=format"
              alt="Volunteers packing food"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B1D]/80 to-transparent flex items-end p-6">
              <div>
                <div className="text-[#F5C842] text-xs font-bold tracking-widest uppercase mb-1">In Action</div>
                <p className="text-white font-semibold">Together We Feed Thousands</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 border-t border-gray-100 pt-10">
          {[
            { value: "3,800+", label: "Donations Made" },
            { value: "120+", label: "Active Volunteers" },
            { value: "40+", label: "Countries Reached" },
            { value: "₦2B+", label: "Funds Raised" },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-black text-[#1B3A2B]">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="py-20 bg-[#F7F7F3]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Images collage */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=500&h=600&fit=crop&auto=format" alt="Community" className="rounded-2xl w-full h-72 object-cover"/>
            <div className="flex flex-col gap-4">
              <img src="https://images.unsplash.com/photo-1521493959102-bdd6677fdd81?w=400&h=280&fit=crop&auto=format" alt="Children" className="rounded-2xl w-full h-32 object-cover"/>
              <img src="https://images.unsplash.com/flagged/photo-1555251255-e9a095d6eb9d?w=400&h=280&fit=crop&auto=format" alt="Volunteers" className="rounded-2xl w-full h-32 object-cover"/>
            </div>
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-6 left-6 bg-[#F5C842] rounded-2xl px-6 py-4 shadow-lg">
            <div className="text-3xl font-black text-[#0D2B1D]">10+</div>
            <div className="text-xs font-semibold text-[#0D2B1D]/70">Years Of Impact</div>
          </div>
        </div>

        {/* Content */}
        <div>
          <SectionLabel text="About Our Organization"/>
          <h2 className="text-4xl lg:text-5xl font-black text-[#0D2B1D] leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            A Trusted Non-Profit <span className="text-[#1B3A2B]">Charity</span> Organization
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            For over a decade, Deen has been at the forefront of humanitarian work—building bridges between generous donors and communities in need. Our commitment to transparency, efficiency, and compassionate service drives everything we do.
          </p>

          <div className="space-y-4">
            {[
              { icon: <HeartIcon className="w-5 h-5"/>, title: "Genuine Helping", desc: "We ensure every donation reaches those who need it most with full transparency." },
              { icon: <GlobeIcon className="w-5 h-5"/>, title: "Community Building", desc: "Fostering self-reliant communities through skill development and empowerment." },
              { icon: <HandIcon className="w-5 h-5"/>, title: "Support Worldwide", desc: "Our reach spans 40+ countries, creating impact where it matters most." },
            ].map(f => (
              <div key={f.title} className="flex gap-4 items-start">
                <div className="w-11 h-11 bg-[#1B3A2B] text-[#F5C842] rounded-xl flex items-center justify-center flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h4 className="font-bold text-[#0D2B1D]">{f.title}</h4>
                  <p className="text-sm text-gray-500 mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-8">
            <YellowBtn>Learn More</YellowBtn>
            <GreenBtn>Our Impact</GreenBtn>
          </div>
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel text="What We Offer"/>
          <h2 className="text-4xl font-black text-[#0D2B1D] mt-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Our Journey Of <span className="text-[#1B3A2B] italic">Compassion</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div key={s.title} className="group border border-gray-100 rounded-2xl p-7 hover:bg-[#1B3A2B] hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-5 transition-colors ${i % 2 === 0 ? "bg-[#F5C842]/20 text-[#1B3A2B] group-hover:bg-[#F5C842] group-hover:text-[#0D2B1D]" : "bg-[#1B3A2B]/10 text-[#1B3A2B] group-hover:bg-[#F5C842] group-hover:text-[#0D2B1D]"}`}>
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-[#0D2B1D] mb-3 group-hover:text-white">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed group-hover:text-white/70">{s.desc}</p>
              <button className="mt-4 text-[#1B3A2B] group-hover:text-[#F5C842] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Read More <ArrowRight className="w-4 h-4"/>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const items = ["Education", "Health", "Donation", "Volunteer", "Community", "Medical Aid", "Child Care", "Food Relief"];
  const repeated = [...items, ...items];
  return (
    <div className="py-5 border-y border-[#1B3A2B]/10 bg-white overflow-hidden marquee-pause">
      <div className="ticker-wrap">
        <div className="ticker-content">
          {repeated.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 mx-4">
              <span className="text-[#1B3A2B] font-bold text-lg">{item}</span>
              <span className="text-[#F5C842] text-2xl">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeaturedProjects() {
  return (
    <section className="py-20 bg-[#F7F7F3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-between items-end mb-12 gap-4">
          <div>
            <SectionLabel text="Our Projects"/>
            <h2 className="text-4xl font-black text-[#0D2B1D]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Featured Projects & <span className="italic">Causes</span>
            </h2>
          </div>
          <OutlineBtn>View All Projects</OutlineBtn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map(p => (
            <div key={p.title} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
              <div className="overflow-hidden h-52 relative">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                <div className="absolute top-4 left-4 bg-[#F5C842] text-[#0D2B1D] text-xs font-bold px-3 py-1 rounded-full">Active</div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1 text-gray-400 text-xs mb-2">
                  <MapPinIcon className="w-3 h-3"/> {p.location}
                </div>
                <h3 className="font-bold text-[#0D2B1D] text-lg mb-4">{p.title}</h3>
                <ProgressBar raised={p.raised} goal={p.goal}/>
                <div className="flex gap-3 mt-5">
                  <YellowBtn className="flex-1 py-2 text-sm text-center">Donate</YellowBtn>
                  <OutlineBtn className="flex-1 py-2 text-sm text-center">Learn More</OutlineBtn>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">We Are Pursuing 80+ Additional Goals In Support Of Transparency</p>
      </div>
    </section>
  );
}

function Community() {
  const partners = ["UNICEF", "WHO", "UNHCR", "WFP", "Save The Children", "OXFAM"];
  return (
    <section className="bg-[#1B3A2B] py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div>
            <SectionLabel text="Join Our Network" light/>
            <h2 className="text-4xl lg:text-5xl font-black text-white mt-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Join Our <span className="text-[#F5C842]">Community</span>
            </h2>
            <p className="text-white/70 mt-4 max-w-md leading-relaxed">
              Become part of a global movement. Whether you donate, volunteer, or spread the word — every action counts toward a better world.
            </p>
            <div className="flex gap-4 mt-6">
              <YellowBtn>Get Involved</YellowBtn>
              <OutlineBtn light>Learn More</OutlineBtn>
            </div>
          </div>

          <div className="text-center">
            <div className="text-8xl font-black text-[#F5C842]">15k+</div>
            <div className="text-white text-lg font-semibold mt-2">Happy Donors</div>
          </div>
        </div>

        {/* Partner logos */}
        <div className="mt-16 pt-10 border-t border-white/10">
          <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-8">Trusted Partners</p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {partners.map(p => (
              <div key={p} className="text-white/40 font-bold text-sm tracking-widest hover:text-[#F5C842] transition-colors cursor-pointer">{p}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Volunteers() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel text="Our Team"/>
          <h2 className="text-4xl font-black text-[#0D2B1D]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Meet Our <span className="text-[#1B3A2B] italic">Volunteers</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {volunteers.map(v => (
            <div key={v.name} className="group text-center">
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <img src={v.img} alt={v.name} className="w-full h-72 object-cover object-top group-hover:scale-105 transition-transform duration-500"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B1D]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="flex gap-2">
                    <a href="#" className="w-8 h-8 bg-[#F5C842] rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <FacebookIcon className="w-3 h-3 text-[#0D2B1D]"/>
                    </a>
                    <a href="#" className="w-8 h-8 bg-[#F5C842] rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <TwitterIcon className="w-3 h-3 text-[#0D2B1D]"/>
                    </a>
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-[#F5C842] text-[#0D2B1D] text-xs font-bold px-2 py-1 rounded-full">VOLUNTEER</div>
              </div>
              <h4 className="font-bold text-[#0D2B1D]">{v.name}</h4>
              <p className="text-sm text-gray-400">{v.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TouchingLives() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=1600&h=700&fit=crop&auto=format"
          alt="Volunteers at work"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0D2B1D]/85"/>
      </div>
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel text="Our Mission" light/>
            <h2 className="text-4xl lg:text-5xl font-black text-white mt-2 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Touching Lives,<br/>Building A <span className="text-[#F5C842]">Better</span><br/>Tomorrow
            </h2>
            <p className="text-white/70 mt-5 leading-relaxed max-w-md">
              Every project we undertake is a testament to the power of collective compassion. We believe in sustainable change that endures long after we leave.
            </p>
            <div className="flex gap-4 mt-8">
              <YellowBtn>Our Work</YellowBtn>
              <OutlineBtn light>Watch Story</OutlineBtn>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: <HeartIcon className="w-7 h-7"/>, title: "Giving Love & Joy", desc: "Spreading compassion through every act of giving." },
              { icon: <HandIcon className="w-7 h-7"/>, title: "Secure Volunteering", desc: "Safe, structured opportunities to make a real difference." },
              { icon: <GlobeIcon className="w-7 h-7"/>, title: "Donate Online", desc: "Secure, instant donations that reach those in need fast." },
            ].map(c => (
              <div key={c.title} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5 hover:bg-[#F5C842]/20 transition-colors group">
                <div className="text-[#F5C842] mb-3">{c.icon}</div>
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
  const [amount, setAmount] = useState("50");
  const [custom, setCustom] = useState("");
  return (
    <section className="py-20 bg-[#F7F7F3]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left image */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1593113630400-ea4288922497?w=700&h=800&fit=crop&auto=format"
            alt="Volunteer with donation box"
            className="rounded-3xl w-full h-[500px] object-cover"
          />
          <div className="absolute -top-6 -right-6 bg-[#F5C842] rounded-2xl px-8 py-5 shadow-xl hidden lg:block">
            <div className="text-4xl font-black text-[#0D2B1D]">₦2B+</div>
            <div className="text-sm font-semibold text-[#0D2B1D]/70">Total Funds Raised</div>
          </div>
          <div className="absolute -bottom-6 left-6 bg-[#1B3A2B] rounded-2xl px-6 py-4 shadow-xl hidden lg:block">
            <div className="text-2xl font-black text-white">3.8k+</div>
            <div className="text-xs font-semibold text-white/60">Donations</div>
          </div>
        </div>

        {/* Form */}
        <div>
          <SectionLabel text="Make A Donation"/>
          <h2 className="text-4xl font-black text-[#0D2B1D] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Making A Difference,<br/>One <span className="text-[#1B3A2B] italic">Donation</span> At A Time.
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">Your generosity directly funds education, healthcare, and food relief for families in need across the globe.</p>

          {/* Amount selection */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-[#0D2B1D] mb-2">Donation Amount</label>
            <div className="flex flex-wrap gap-3 mb-3">
              {["10", "25", "50", "100", "250"].map(a => (
                <button
                  key={a}
                  onClick={() => { setAmount(a); setCustom(""); }}
                  className={`px-5 py-2 rounded-full border-2 font-bold text-sm transition-colors ${amount === a && !custom ? "bg-[#1B3A2B] text-white border-[#1B3A2B]" : "border-gray-300 text-gray-600 hover:border-[#1B3A2B]"}`}
                >
                  ₦{a}
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Custom amount"
              value={custom}
              onChange={e => { setCustom(e.target.value); setAmount(""); }}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B3A2B]"
            />
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input placeholder="First Name" className="border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B3A2B]"/>
            <input placeholder="Last Name" className="border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B3A2B]"/>
          </div>
          <input placeholder="Email Address" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B3A2B] mb-4"/>

          {/* Cause selector */}
          <select className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B3A2B] text-gray-600 mb-6">
            <option>Select a cause</option>
            <option>Food Distribution</option>
            <option>Child Education</option>
            <option>Medical Support</option>
            <option>Poverty Reduction</option>
          </select>

          <YellowBtn className="w-full flex items-center justify-center gap-2 py-4 text-base">
            <HeartIcon className="w-5 h-5"/> Donate ₦{custom || amount} Now
          </YellowBtn>
          <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
            <CheckIcon className="w-3 h-3"/> Secure & encrypted donation
          </p>
        </div>
      </div>
    </section>
  );
}

function TestimonialBanner() {
  return (
    <section className="relative py-24 overflow-hidden bg-[#0D2B1D]">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F5C842] rounded-full blur-3xl"/>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F5C842] rounded-full blur-3xl"/>
      </div>
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3 text-[#F5C842]">
          <LeafIcon className="w-4 h-4"/>
          <span className="text-sm font-semibold tracking-widest uppercase">Our Philosophy</span>
        </div>
        <blockquote className="text-4xl lg:text-6xl font-black text-white leading-tight mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          "Generosity Is The<br/>
          <span className="text-[#F5C842] italic">Cornerstone</span><br/>
          Of Prosperity."
        </blockquote>
        <p className="text-white/50 mt-8 text-lg">— Deen Foundation Mission Statement</p>
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel text="Testimonials"/>
          <h2 className="text-4xl font-black text-[#0D2B1D]" style={{ fontFamily: "'Playfair Display', serif" }}>
            What Our <span className="italic text-[#1B3A2B]">Community</span> Is Saying!
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className={`rounded-2xl p-7 border-2 transition-all ${i === active ? "border-[#F5C842] shadow-lg" : "border-gray-100"}`}>
              <div className="flex items-center gap-1 text-[#F5C842] mb-4">
                {[...Array(t.stars)].map((_, j) => <StarIcon key={j} className="w-4 h-4"/>)}
              </div>
              <QuoteIcon className="w-8 h-8 text-[#F5C842]/30 mb-3"/>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover"/>
                <div>
                  <div className="font-bold text-[#0D2B1D] text-sm">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-8">
          <button onClick={() => setActive(a => Math.max(0, a - 1))} className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#1B3A2B] transition-colors">
            <ChevronLeft/>
          </button>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className={`w-3 h-3 rounded-full transition-colors ${i === active ? "bg-[#F5C842]" : "bg-gray-200"}`}/>
          ))}
          <button onClick={() => setActive(a => Math.min(testimonials.length - 1, a + 1))} className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#1B3A2B] transition-colors">
            <ChevronRight/>
          </button>
        </div>
      </div>
    </section>
  );
}

function Events() {
  return (
    <section className="py-20 bg-[#F7F7F3]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <SectionLabel text="Upcoming Events"/>
          <h2 className="text-4xl font-black text-[#0D2B1D] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Join Our Latest<br/><span className="italic text-[#1B3A2B]">Upcoming Events</span>
          </h2>

          <div className="space-y-4">
            {events.map(ev => (
              <div key={ev.day} className="bg-white rounded-2xl p-5 flex gap-5 items-start hover:shadow-md transition-shadow group cursor-pointer">
                <div className="bg-[#1B3A2B] text-white rounded-xl w-16 h-16 flex flex-col items-center justify-center flex-shrink-0 group-hover:bg-[#F5C842] group-hover:text-[#0D2B1D] transition-colors">
                  <div className="text-xs font-semibold">{ev.month}</div>
                  <div className="text-2xl font-black leading-none">{ev.day}</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#0D2B1D] text-sm leading-snug mb-2">{ev.title}</h4>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><MapPinIcon className="w-3 h-3"/> {ev.location}</span>
                    <span className="flex items-center gap-1"><CalendarIcon className="w-3 h-3"/> {ev.time}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#F5C842] transition-colors flex-shrink-0 mt-1"/>
              </div>
            ))}
          </div>

          <YellowBtn className="mt-6">View All Events</YellowBtn>
        </div>

        {/* Event image */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1710093072228-8c3129f27357?w=700&h=600&fit=crop&auto=format"
            alt="Community event"
            className="rounded-3xl w-full h-[480px] object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur rounded-2xl p-5">
            <div className="text-[#1B3A2B] font-bold mb-1">Next Fundraiser Gala</div>
            <div className="text-sm text-gray-500">Join us for an evening of inspiration, music, and impact. All proceeds go directly to our field programs.</div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs text-gray-400 flex items-center gap-1"><CalendarIcon className="w-3 h-3"/> April 25, 2026</span>
              <button className="text-[#1B3A2B] font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                Register <ArrowRight className="w-4 h-4"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorldMap() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel text="Global Reach"/>
          <h2 className="text-4xl font-black text-[#0D2B1D]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Global Project <span className="italic text-[#1B3A2B]">Locations</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">Our projects span 6 continents, touching lives in 40+ countries across the developing world.</p>
        </div>

        {/* Tab filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {["All Regions", "Africa", "Asia", "Americas", "Europe", "Oceania"].map(r => (
            <button key={r} className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${r === "All Regions" ? "bg-[#1B3A2B] text-white" : "border border-gray-200 text-gray-500 hover:border-[#1B3A2B] hover:text-[#1B3A2B]"}`}>{r}</button>
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
          <div className="absolute inset-0 bg-[#1B3A2B]/5"/>

          {/* Pin markers */}
          {mapPins.map(pin => (
            <div
              key={pin.label}
              className="absolute group cursor-pointer"
              style={{ top: pin.top, left: pin.left, transform: "translate(-50%, -100%)" }}
            >
              <div className="relative">
                <MapPinIcon className="w-7 h-7 text-[#F5C842] drop-shadow-lg"/>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0D2B1D] text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {pin.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { v: "40+", l: "Countries" },
            { v: "200+", l: "Active Projects" },
            { v: "500k+", l: "Lives Impacted" },
            { v: "6", l: "Continents" },
          ].map(s => (
            <div key={s.l} className="bg-[#1B3A2B] text-white rounded-2xl p-5 text-center">
              <div className="text-3xl font-black text-[#F5C842]">{s.v}</div>
              <div className="text-sm text-white/70 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section className="py-20 bg-[#F7F7F3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-between items-end mb-12 gap-4">
          <div>
            <SectionLabel text="News & Blog"/>
            <h2 className="text-4xl font-black text-[#0D2B1D]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Latest News <span className="italic">&amp; Blogs</span>
            </h2>
          </div>
          <div className="flex gap-3">
            {["Latest", "Popular", "Featured"].map(t => (
              <button key={t} className={`px-4 py-2 rounded-full text-sm font-semibold ${t === "Latest" ? "bg-[#1B3A2B] text-white" : "border border-gray-200 text-gray-500 hover:border-[#1B3A2B]"}`}>{t}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map(b => (
            <div key={b.title} className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="overflow-hidden h-48 relative">
                <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                <div className="absolute top-4 left-4 bg-[#F5C842] text-[#0D2B1D] text-xs font-bold px-3 py-1 rounded-full">{b.category}</div>
              </div>
              <div className="p-6">
                <div className="text-xs text-gray-400 mb-3 flex items-center gap-1"><CalendarIcon className="w-3 h-3"/> {b.date}</div>
                <h3 className="font-bold text-[#0D2B1D] leading-snug mb-4 line-clamp-3">{b.title}</h3>
                <button className="text-[#1B3A2B] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-4 h-4"/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="bg-[#1B3A2B] py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <LeafIcon className="w-8 h-8 text-[#F5C842] mx-auto mb-4"/>
        <h2 className="text-3xl font-black text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          Subscribe To Our <span className="text-[#F5C842]">Newsletter</span>
        </h2>
        <p className="text-white/60 mb-8">Stay updated with our latest projects, events, and impact stories from around the world.</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-5 py-3 rounded-full text-sm focus:outline-none text-gray-800 bg-white placeholder-gray-400 border-0"
          />
          <YellowBtn className="whitespace-nowrap">Subscribe Now</YellowBtn>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0D2B1D] text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img src={logoImg} alt="Ochaworth Leadership and Community Development Initiative" className="h-12 w-auto object-contain"/>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              A global humanitarian organization committed to building a more just and compassionate world for all people.
            </p>
            <div className="flex gap-3">
              {[FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#F5C842] hover:text-[#0D2B1D] transition-colors">
                  <Icon className="w-4 h-4"/>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-[#F5C842] mb-4 text-sm tracking-widest uppercase">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/60">
              {["Home", "About Us", "Our Services", "Projects", "Volunteer", "Donate"].map(l => (
                <li key={l}><a href="#" className="hover:text-[#F5C842] flex items-center gap-1"><ChevronRight className="w-3 h-3"/> {l}</a></li>
              ))}
            </ul>
          </div>

          {/* Our Causes */}
          <div>
            <h4 className="font-bold text-[#F5C842] mb-4 text-sm tracking-widest uppercase">Our Causes</h4>
            <ul className="space-y-2 text-sm text-white/60">
              {["Food Distribution", "Child Education", "Medical Support", "Poverty Reduction", "Clean Water", "Emergency Relief"].map(l => (
                <li key={l}><a href="#" className="hover:text-[#F5C842] flex items-center gap-1"><ChevronRight className="w-3 h-3"/> {l}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-[#F5C842] mb-4 text-sm tracking-widest uppercase">Contact Us</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex gap-2"><MapPinIcon className="w-4 h-4 text-[#F5C842] flex-shrink-0 mt-0.5"/> 123 Charity Lane, Dhaka, Bangladesh</li>
              <li className="flex gap-2"><PhoneIcon className="w-4 h-4 text-[#F5C842] flex-shrink-0"/> +1 (800) 123-4567</li>
              <li className="flex gap-2"><MailIcon className="w-4 h-4 text-[#F5C842] flex-shrink-0"/> info@deen.org</li>
            </ul>

            <div className="mt-5">
              <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Working Hours</div>
              <div className="text-sm text-white/60">Mon – Fri: 9:00AM – 6:00PM</div>
              <div className="text-sm text-white/60">Sat: 10:00AM – 4:00PM</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/30">
          <p>© 2026 Deen Foundation. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-[#F5C842]">Privacy Policy</a>
            <a href="#" className="hover:text-[#F5C842]">Terms of Service</a>
            <a href="#" className="hover:text-[#F5C842]">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <TopBar/>
      <Navbar/>
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
      <Footer/>
    </div>
  );
}
