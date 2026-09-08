import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import blogPageData from "@/data/blogPage.json";
import { blogPosts, findPost, BlogCard } from "./BlogPage";
import {
  Newsletter,
  CalendarIcon, ChevronRight, FacebookIcon, TwitterIcon, ClipboardIcon, CheckIcon,
} from "@/components/shared";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? findPost(slug) : undefined;
  const [copied, setCopied] = useState(false);

  if (!post) return <Navigate to="/blog" replace/>;

  const dt = blogPageData.detail;
  const paragraphs = post.body.split(/\n\s*\n/).filter(Boolean);
  const related = blogPosts.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const recent = blogPosts.filter(p => p.slug !== post.slug).slice(0, 4);

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareLinks = [
    { Icon: FacebookIcon, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}` },
    { Icon: TwitterIcon, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(post.title)}` },
  ];

  function copyLink() {
    navigator.clipboard?.writeText(pageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-[var(--green-dark)]/75"/>
        <Link
          to="/blog"
          className="absolute top-6 left-6 flex items-center gap-2 bg-white/15 hover:bg-[var(--yellow)] text-white hover:text-[var(--green-dark)] backdrop-blur-sm font-semibold text-sm px-4 py-2 rounded-full transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M15 18l-6-6 6-6"/></svg>
          {dt.backButtonText}
        </Link>
        <div className="absolute bottom-8 left-0 right-0 max-w-5xl mx-auto px-6">
          <span className="inline-block bg-[var(--yellow)] text-[var(--green-dark)] text-xs font-bold px-3 py-1.5 rounded-full mb-3">{post.category}</span>
          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            {post.title}
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 pb-6 border-b border-gray-100">
              <span className="flex items-center gap-1.5"><CalendarIcon className="w-4 h-4 text-[var(--green-dark)]"/> {post.date}</span>
              <span>{dt.authorLabel}: <strong className="text-gray-600">{post.author}</strong></span>
            </div>

            {paragraphs.map((para, i) => (
              <p key={i} className="text-gray-600 leading-relaxed text-[15px]">{para}</p>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#F7F7F3] rounded-2xl p-6">
                <h4 className="font-black text-[var(--green-dark)] text-sm tracking-widest uppercase mb-4">{dt.shareLabel}</h4>
                <div className="flex gap-3">
                  {shareLinks.map(({ Icon, href }, i) => (
                    <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center text-[var(--green-dark)] hover:bg-[var(--yellow)] hover:border-[var(--yellow)] transition-colors">
                      <Icon className="w-4 h-4"/>
                    </a>
                  ))}
                  <button onClick={copyLink} className="w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center text-[var(--green-dark)] hover:bg-[var(--yellow)] hover:border-[var(--yellow)] transition-colors" title="Copy link">
                    {copied ? <CheckIcon className="w-4 h-4"/> : <ClipboardIcon className="w-4 h-4"/>}
                  </button>
                </div>
                {copied && <p className="text-xs text-[var(--green-mid)] font-semibold mt-2">Link copied!</p>}
              </div>

              {recent.length > 0 && (
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
                  <h4 className="font-black text-[var(--green-dark)] text-sm tracking-widest uppercase mb-4">{dt.recentPostsHeading}</h4>
                  <div className="space-y-4">
                    {recent.map(p => (
                      <Link key={p.slug} to={`/blog/${p.slug}`} className="flex gap-3 items-start group">
                        <img src={p.coverImage} alt={p.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0"/>
                        <div>
                          <div className="text-sm font-semibold text-[var(--green-dark)] leading-snug line-clamp-2 group-hover:text-[var(--green-mid)]">{p.title}</div>
                          <div className="text-xs text-gray-400 mt-1">{p.date}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-2 text-[var(--green-dark)] mb-2">
              <ChevronRight className="w-4 h-4"/>
              <span className="text-xs font-semibold tracking-widest uppercase">{dt.categoryLabel}</span>
            </div>
            <h3 className="text-2xl font-black text-[var(--green-dark)] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              More In {post.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map(p => (
                <BlogCard key={p.slug} post={p} readMoreText={blogPageData.readMoreButtonText}/>
              ))}
            </div>
          </div>
        )}
      </div>

      <Newsletter/>
    </div>
  );
}
