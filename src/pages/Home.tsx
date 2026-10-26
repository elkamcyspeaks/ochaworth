import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import site from "@/data/site.json"
import experience from "@/data/homeExperience.json"
import { programs, programPath } from "@/lib/programs"
import { blogPosts, BlogCard } from "./BlogPage"
import blogPageData from "@/data/blogPage.json"
import {
  HeartIcon,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  SectionLabel,
  OutlineBtn,
  Newsletter,
} from "@/components/shared"

function Hero() {
  const heroSlides = site.hero.slides
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  useEffect(() => {
    const id = setInterval(() => slide(1), 5500)
    return () => clearInterval(id)
  }, [current])
  function slide(dir: number) {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent((c) => (c + dir + heroSlides.length) % heroSlides.length)
      setAnimating(false)
    }, 400)
  }
  const s = heroSlides[current]
  return (
    <section className="experience-hero relative min-h-[90vh] flex items-center overflow-hidden">
      {heroSlides.map((sl, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, zIndex: 0 }}
        >
          <img
            src={sl.image}
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="experience-hero-overlay absolute inset-0 bg-gradient-to-r from-[var(--green-dark)]/95 via-[var(--green-dark)]/75 to-transparent" />
        </div>
      ))}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none hidden lg:block z-10">
        <div className="absolute right-0 top-0 bottom-0 w-full bg-[var(--yellow)]/10 rounded-l-full" />
      </div>
      <div className="experience-hero-content relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
        <div
          className="max-w-2xl transition-all duration-500"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(16px)" : "translateY(0)",
          }}
        >
          <SectionLabel text={s.label} light />
          <h1
            className="experience-hero-title text-5xl lg:text-7xl font-black text-white leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {s.line1}
            <br />
            <span className="text-[var(--yellow)]">{s.highlight}</span>{" "}
            <span className="italic">{s.italic}</span>
            <br />
            {s.line3}
          </h1>
          <p className="experience-hero-copy text-white/80 text-lg leading-relaxed mb-8 max-w-lg">
            {s.sub}
          </p>
          <div className="experience-hero-actions flex flex-wrap gap-4">
            <a href={site.donation.paymentUrl}>
                <HeartIcon className="w-4 h-4" /> {site.hero.donateButtonText}
            </a>
            <Link to="/about">
                {site.hero.learnMoreButtonText}{" "}
                <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="experience-hero-stats flex flex-wrap gap-8 mt-14">
            {site.hero.stats.map((stat) => (
              <div key={stat.label} className="text-white">
                <div className="text-3xl font-black text-[var(--yellow)]">
                  {stat.value}
                </div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="experience-hero-controls absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          aria-label="Previous slide"
          onClick={() => slide(-1)}
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-[var(--yellow)] flex items-center justify-center text-white hover:text-[var(--green-dark)]"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              aria-label={"Show slide " + (i + 1)}
              aria-current={i === current ? "true" : undefined}
              onClick={() => {
                if (!animating) {
                  setAnimating(true)
                  setTimeout(() => {
                    setCurrent(i)
                    setAnimating(false)
                  }, 400)
                }
              }}
              className={
                "transition-all duration-300 rounded-full " +
                (i === current
                  ? "w-8 h-3 bg-[var(--yellow)]"
                  : "w-3 h-3 bg-white/40")
              }
            />
          ))}
        </div>
        <button
          aria-label="Next slide"
          onClick={() => slide(1)}
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-[var(--yellow)] flex items-center justify-center text-white hover:text-[var(--green-dark)]"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="experience-hero-counter absolute top-8 right-8 z-20 text-white/50 text-sm font-mono">
        {String(current + 1).padStart(2, "0")} /{" "}
        {String(heroSlides.length).padStart(2, "0")}
      </div>
    </section>
  )
}

function Mission() {
  return (
    <section className="experience-section">
      <div className="experience-container experience-split">
        <img
          className="experience-photo"
          src={experience.mission.image}
          alt="Participants at an Ochaworth community awareness activity"
          loading="lazy"
          width="1080"
          height="720"
        />
        <div>
          <SectionLabel text={experience.mission.label} />
          <h2 className="experience-heading">{experience.mission.title}</h2>
          <p className="experience-copy">{site.about.paragraph}</p>
          <Link className="experience-link" to="/about">
            Get to know Ochaworth <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}
function KeyPrograms() {
  const selected = [
    ...programs.filter((p) => p.status === "ongoing"),
    ...programs.filter((p) => p.status !== "ongoing"),
  ].slice(0, 3)
  return (
    <section className="experience-section experience-muted">
      <div className="experience-container">
        <div className="experience-section-top">
          <div>
            <SectionLabel text="Our programs" />
            <h2 className="experience-heading">Purpose, put into action.</h2>
          </div>
          <Link className="experience-link" to="/programs">
            Explore all programs <ArrowRight />
          </Link>
        </div>
        <div className="experience-card-grid">
          {selected.map((p) => (
            <article key={p.title} className="experience-card">
              <Link to={programPath(p)} tabIndex={-1} aria-hidden="true">
                <img
                  src={p.img}
                  alt=""
                  loading="lazy"
                  width="1080"
                  height="720"
                />
              </Link>
              <div className="experience-card-body">
                <span className="experience-eyebrow">
                  {p.status === "ongoing"
                    ? "Ongoing"
                    : p.status === "completed"
                      ? "Completed"
                      : "Upcoming"}{" "}
                  · {p.location}
                </span>
                <h3>
                  <Link to={programPath(p)}>{p.title}</Link>
                </h3>
                <p>{p.summary || p.description.split("\n")[0]}</p>
                <Link className="experience-link" to={programPath(p)}>
                  Explore program <ArrowRight />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
function Campaign() {
  const c = experience.campaign
  return (
    <section className="experience-section">
      <div className="experience-container">
        <div className="experience-campaign">
          <img
            src={c.image}
            alt={c.alt}
            loading="lazy"
            width="1080"
            height="568"
          />
          <div>
            <SectionLabel text={c.label} />
            <h2 className="experience-heading">{c.title}</h2>
            <p className="experience-copy">{c.text}</p>
            <div className="experience-actions">
              <Link
                className="experience-button"
                to={"/gallery?collection=" + encodeURIComponent(c.collection)}
              >
                See the campaign photos <ArrowRight />
              </Link>
              <Link
                className="experience-link"
                to={"/programs/" + c.programSlug}
              >
                About the campaign <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
function Chapters() {
  const c = experience.chapters
  return (
    <section className="experience-section experience-muted">
      <div className="experience-container">
        <SectionLabel text={c.label} />
        <h2 className="experience-heading">{c.title}</h2>
        <p className="experience-copy experience-intro">{c.text}</p>
        <div className="experience-chapters">
          {c.locations.map((location) => (
            <article key={location}>
              <span aria-hidden="true">↗</span>
              <h3>{location}</h3>
              <Link
                className="experience-link"
                to={
                  "/contact?subject=Partnership&location=" +
                  encodeURIComponent(location)
                }
              >
                Ask about this chapter <ArrowRight />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
function GetInvolved() {
  const options = [
    {
      title: "Volunteer",
      text: "Offer your time and skills. Tell us where you are based and how you would like to help.",
      to: "/become-a-volunteer",
      action: "Explore volunteering",
    },
    {
      title: "Membership",
      text: "Express your interest in joining the organisation. The team will explain the membership process.",
      to: "/become-a-member",
      action: "Enquire about membership",
    },
    {
      title: "Partner with us",
      text: "Start a conversation about working together on a program or community initiative.",
      to: "/contact?subject=Partnership",
      action: "Discuss a partnership",
    },
  ]
  return (
    <section className="experience-section">
      <div className="experience-container">
        <SectionLabel text="Get involved" />
        <h2 className="experience-heading">{experience.involvement.title}</h2>
        <p className="experience-copy experience-intro">
          {experience.involvement.text}
        </p>
        <div className="experience-card-grid">
          {options.map((o) => (
            <article
              key={o.title}
              className="experience-card experience-card-body"
            >
              <h3>{o.title}</h3>
              <p>{o.text}</p>
              <Link className="experience-link" to={o.to}>
                {o.action}
                <ArrowRight />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
function DonationForm() {
  const d = site.donation
  return (
    <section id="donate" className="py-20 bg-[#F7F7F3] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img
            src={d.bgImage}
            alt=""
            className="rounded-3xl w-full h-[500px] object-cover"
          />
          <div className="absolute -top-6 -right-6 bg-[var(--yellow)] rounded-2xl px-8 py-5 shadow-xl hidden lg:block">
            <div className="text-4xl font-black text-[var(--green-dark)]">
              {d.totalRaised}
            </div>
            <div className="text-sm font-semibold text-[var(--green-dark)]/70">
              {d.totalRaisedLabel}
            </div>
          </div>
          <div className="absolute -bottom-6 left-6 bg-[var(--green-mid)] rounded-2xl px-6 py-4 shadow-xl hidden lg:block">
            <div className="text-2xl font-black text-white">
              {d.donationsCount}
            </div>
            <div className="text-xs font-semibold text-white/60">
              {d.donationsLabel}
            </div>
          </div>
        </div>
        <div>
          <SectionLabel text={d.sectionLabel} />
          <h2
            className="text-4xl font-black text-[var(--green-dark)] mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {d.headingLine1}
            <br />
            {d.headingLine2Prefix}{" "}
            <span className="text-[var(--green-mid)] italic">
              {d.headingHighlight}
            </span>{" "}
            {d.headingSuffix}
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">{d.paragraph}</p>
          <p className="text-gray-600 mb-5 leading-relaxed">Choose your donation amount and enter your details securely on Paystack.</p>
          <a href={d.paymentUrl} className="inline-flex w-full items-center justify-center gap-2 min-h-12 bg-[var(--yellow)] text-[var(--green-dark)] font-bold px-6 py-4 rounded-full hover:bg-[var(--yellow-dark)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4">
            <HeartIcon className="w-5 h-5" /> Donate securely with Paystack <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-center text-xs text-gray-500 mt-3">You will continue to Paystack to complete your donation.</p>
        </div>
      </div>
    </section>
  )
}

function Blog() {
  const bs = site.blogSection
  // Show featured posts first, then fill up to 3 with the latest others — every
  // post lives under the new Blog Posts section on the dashboard now, so this
  // teaser (and the full /blog page) update automatically as posts are added.
  const featured = blogPosts.filter((p) => p.featured)
  const rest = blogPosts.filter((p) => !p.featured)
  const shown = [...featured, ...rest].slice(0, 3)

  if (shown.length === 0) return null

  return (
    <section className="py-20 bg-[#F7F7F3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-between items-end mb-12 gap-4">
          <div>
            <SectionLabel text={bs.sectionLabel} />
            <h2
              className="text-4xl font-black text-[var(--green-dark)]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {bs.headingPrefix}{" "}
              <span className="italic">{bs.headingItalic}</span>
            </h2>
          </div>
          <Link to="/blog">
            <OutlineBtn>{blogPageData.viewAllButtonText}</OutlineBtn>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {shown.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              readMoreText={bs.readMoreButtonText}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Mission />
      <KeyPrograms />
      <Campaign />
      <Chapters />
      <GetInvolved />
      <DonationForm />
      <Blog />
      <Newsletter />
    </>
  )
}
