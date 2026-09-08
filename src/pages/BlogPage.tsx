import { useState } from "react";
import { Link } from "react-router-dom";
import blogPageData from "@/data/blogPage.json";
import {
  SectionLabel, YellowBtn, Newsletter, PageHero,
  CalendarIcon, ArrowRight,
} from "@/components/shared";

// ── Blog post data ────────────────────────────────────────────────────────────
// Every file dropped into src/data/blog/ (by adding a "New Blog Post" entry on
// the dashboard) shows up here automatically — no fixed slot count, and no
// code change needed to add, edit, or remove a post.

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: string;
  date: string;
  featured: boolean;
  body: string;
}

const postModules = import.meta.glob<{ default: Omit<BlogPost, "slug"> }>("../data/blog/*.json", { eager: true });

function slugFromPath(path: string): string {
  const file = path.split("/").pop() ?? path;
  return file.replace(/\.json$/, "");
}

export const blogPosts: BlogPost[] = Object.entries(postModules)
  .map(([path, mod]) => ({ slug: slugFromPath(path), ...mod.default }))
  .sort((a, b) => (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0));

export function findPost(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}

// ── Post card ─────────────────────────────────────────────────────────────────

export function BlogCard({ post, readMoreText }: { post: BlogPost; readMoreText: string }) {
  return (
    <Link to={`/blog/${post.slug}`} className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group block border border-gray-100">
      <div className="overflow-hidden h-48 relative">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
        <div className="absolute top-4 left-4 bg-[var(--yellow)] text-[var(--green-dark)] text-xs font-bold px-3 py-1 rounded-full">{post.category}</div>
      </div>
      <div className="p-6">
        <div className="text-xs text-gray-400 mb-3 flex items-center gap-1"><CalendarIcon className="w-3 h-3"/> {post.date}</div>
        <h3 className="font-bold text-[var(--green-dark)] leading-snug mb-3 line-clamp-3">{post.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
        <span className="text-[var(--green-mid)] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
          {readMoreText} <ArrowRight className="w-4 h-4"/>
        </span>
      </div>
    </Link>
  );
}

// ── CTA band ──────────────────────────────────────────────────────────────────

function CTABand() {
  const cta = blogPageData.cta;
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img src={cta.backgroundImage} alt="" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-[var(--green-dark)]/85"/>
      </div>
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <SectionLabel text={cta.sectionLabel} light/>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          {cta.headingPrefix} <span className="text-[var(--yellow)] italic">{cta.headingItalic}</span>
        </h2>
        <p className="text-white/65 max-w-xl mx-auto mb-8 leading-relaxed">{cta.paragraph}</p>
        <Link to="/contact">
          <YellowBtn className="flex items-center gap-2 mx-auto">
            {cta.buttonText} <ArrowRight className="w-4 h-4"/>
          </YellowBtn>
        </Link>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const intro = blogPageData.intro;
  const categories = [blogPageData.allCategoryLabel, ...Array.from(new Set(blogPosts.map(p => p.category)))];
  const [activeCategory, setActiveCategory] = useState(blogPageData.allCategoryLabel);

  const filtered = activeCategory === blogPageData.allCategoryLabel
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  return (
    <>
      <PageHero
        image={blogPageData.hero.image}
        title={blogPageData.hero.title}
        breadcrumbHome={blogPageData.hero.breadcrumbHome}
        breadcrumbCurrent={blogPageData.hero.breadcrumbCurrent}
      />

      <section className="py-20 bg-[#F7F7F3]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-between items-end mb-10 gap-4">
            <div>
              <SectionLabel text={intro.sectionLabel}/>
              <h2 className="text-4xl font-black text-[var(--green-dark)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {intro.headingPrefix} <span className="italic">{intro.headingItalic}</span>
              </h2>
            </div>
          </div>
          <p className="text-gray-500 max-w-2xl mb-10 leading-relaxed">{intro.paragraph}</p>

          {categories.length > 2 && (
            <div className="flex flex-wrap gap-3 mb-12">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === cat ? "bg-[var(--green-mid)] text-white" : "border border-gray-200 text-gray-500 hover:border-[var(--green-mid)]"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-12">No posts in this category yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filtered.map(post => (
                <BlogCard key={post.slug} post={post} readMoreText={blogPageData.readMoreButtonText}/>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABand/>
      <Newsletter/>
    </>
  );
}
