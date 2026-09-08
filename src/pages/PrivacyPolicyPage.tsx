import legalPages from "@/data/legalPages.json";
import { PageHero } from "@/components/shared";

export default function PrivacyPolicyPage() {
  const p = legalPages.privacyPolicy;
  const paragraphs = p.body.split(/\n\s*\n/).filter(Boolean);
  return (
    <>
      <PageHero image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&h=600&fit=crop&auto=format" title={p.title} breadcrumbHome="Home" breadcrumbCurrent={p.title}/>
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-sm text-gray-400 mb-8">Last updated: {p.lastUpdated}</p>
          <div className="space-y-5">
            {paragraphs.map((para, i) => <p key={i} className="text-gray-600 leading-relaxed">{para}</p>)}
          </div>
        </div>
      </section>
    </>
  );
}
