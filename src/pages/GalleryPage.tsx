import { useState } from "react";
import galleryData from "@/data/gallery.json";
import {
  ChevronRight, ChevronLeft, XIcon, ArrowUpRight,
  Newsletter, PageHero,
} from "@/components/shared";

// ── Sections ──────────────────────────────────────────────────────────────────

type Photo = { image: string; caption: string; category: string };

function Lightbox({ photos, index, onClose, onPrev, onNext }: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const photo = photos[index];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm" onClick={onClose}>
      <button onClick={onClose} className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-[var(--yellow)] rounded-full flex items-center justify-center text-white hover:text-[var(--green-dark)] transition-colors z-50">
        <XIcon className="w-5 h-5"/>
      </button>
      {photos.length > 1 && (
        <button onClick={e => { e.stopPropagation(); onPrev(); }} className="absolute left-4 w-11 h-11 bg-white/10 hover:bg-[var(--yellow)] rounded-full flex items-center justify-center text-white hover:text-[var(--green-dark)] transition-colors z-50">
          <ChevronLeft className="w-5 h-5"/>
        </button>
      )}
      <div className="relative max-w-4xl max-h-[85vh] mx-16" onClick={e => e.stopPropagation()}>
        <img src={photo.image} alt={photo.caption} className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"/>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent rounded-b-2xl px-6 py-4">
          <p className="text-white font-bold">{photo.caption}</p>
          <span className="text-[var(--yellow)] text-xs font-semibold tracking-widest uppercase">{photo.category}</span>
        </div>
        <div className="absolute top-3 right-3 bg-black/50 text-white text-xs font-bold px-3 py-1 rounded-full">{index + 1} / {photos.length}</div>
      </div>
      {photos.length > 1 && (
        <button onClick={e => { e.stopPropagation(); onNext(); }} className="absolute right-4 w-11 h-11 bg-white/10 hover:bg-[var(--yellow)] rounded-full flex items-center justify-center text-white hover:text-[var(--green-dark)] transition-colors z-50">
          <ChevronRight className="w-5 h-5"/>
        </button>
      )}
    </div>
  );
}

function GalleryCell({ photo, onClick }: { photo: Photo; onClick: () => void }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer group h-64 bg-gray-100"
      onClick={onClick}
    >
      <img
        src={photo.image}
        alt={photo.caption}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--green-dark)]/70 via-[var(--green-dark)]/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"/>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-10 h-10 rounded-full bg-[var(--yellow)] flex items-center justify-center shadow-lg">
          <ArrowUpRight className="w-5 h-5 text-[var(--green-dark)]"/>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-white text-sm font-bold leading-snug">{photo.caption}</p>
        <span className="text-[var(--yellow)] text-xs font-semibold tracking-widest uppercase">{photo.category}</span>
      </div>
    </div>
  );
}

function GalleryGrid() {
  const photos = galleryData.photos as Photo[];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  function close() { setLightboxIndex(null); }
  function prev() { setLightboxIndex(i => i !== null ? (i - 1 + photos.length) % photos.length : 0); }
  function next() { setLightboxIndex(i => i !== null ? (i + 1) % photos.length : 0); }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {photos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, i) => (
              <GalleryCell key={photo.image + i} photo={photo} onClick={() => setLightboxIndex(i)}/>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">More photos coming soon.</p>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox photos={photos} index={lightboxIndex} onClose={close} onPrev={prev} onNext={next}/>
      )}
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  return (
    <>
      <PageHero
        image={galleryData.hero.image}
        title={galleryData.hero.title}
        breadcrumbHome={galleryData.hero.breadcrumbHome}
        breadcrumbCurrent={galleryData.hero.breadcrumbCurrent}
      />
      <GalleryGrid/>
      <Newsletter/>
    </>
  );
}
