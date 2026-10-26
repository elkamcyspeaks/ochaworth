import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import galleryData from "@/data/gallery.json"
import {
  ChevronRight,
  ChevronLeft,
  XIcon,
  ArrowUpRight,
  Newsletter,
  PageHero,
} from "@/components/shared"
import "./gallery.css"

export type Photo = {
  image: string
  thumbnail?: string
  caption: string
  alt?: string
  category: string
  album?: string
  width?: number
  height?: number
}
export const PAGE_SIZE = 18
export const albumOf = (photo: Photo) =>
  photo.album?.trim() || "Earlier activities"
export function filterPhotos(photos: Photo[], album: string, category: string) {
  return photos.filter(
    (p) =>
      (album === "All photos" || albumOf(p) === album) &&
      (!category || p.category === category),
  )
}

function Lightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  photos: Photo[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null),
    photo = photos[index]
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null,
      overflow = document.body.style.overflow,
      node = dialog.current
    node?.showModal()
    document.body.style.overflow = "hidden"
    return () => {
      node?.close()
      document.body.style.overflow = overflow
      previous?.focus()
    }
  }, [])
  return (
    <dialog
      ref={dialog}
      className="gallery-lightbox"
      aria-label="Gallery photo viewer"
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault()
          onPrev()
        }
        if (e.key === "ArrowRight") {
          e.preventDefault()
          onNext()
        }
      }}
    >
      <header className="gallery-viewer-header">
        <div>
          <span>{albumOf(photo)}</span>
          <p aria-live="polite">
            Photo {index + 1} of {photos.length}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photo viewer"
        >
          <XIcon />
          <span>Close</span>
        </button>
      </header>
      <div className="gallery-viewer-stage">
        <button
          className="gallery-viewer-arrow"
          type="button"
          onClick={onPrev}
          disabled={photos.length < 2}
          aria-label="Previous photo"
        >
          <ChevronLeft />
        </button>
        <figure>
          <img
            key={photo.image}
            src={photo.image}
            alt={photo.alt || photo.caption}
            decoding="async"
          />
          <figcaption aria-live="polite">{photo.caption}</figcaption>
        </figure>
        <button
          className="gallery-viewer-arrow"
          type="button"
          onClick={onNext}
          disabled={photos.length < 2}
          aria-label="Next photo"
        >
          <ChevronRight />
        </button>
      </div>
    </dialog>
  )
}

export function GalleryGrid({
  photos = galleryData.photos as Photo[],
  featuredAlbum = (galleryData as { featuredAlbum?: string }).featuredAlbum,
}: {
  photos?: Photo[]
  featuredAlbum?: string
}) {
  const albums = useMemo(
    () => Array.from(new Set(photos.map(albumOf))),
    [photos],
  )
  const [album, setAlbum] = useState(
    featuredAlbum && albums.includes(featuredAlbum)
      ? featuredAlbum
      : "All photos",
  )
  const [category, setCategory] = useState(""),
    [visible, setVisible] = useState(PAGE_SIZE),
    [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const filtered = useMemo(
    () => filterPhotos(photos, album, category),
    [photos, album, category],
  )
  const categories = Array.from(
    new Set(
      photos
        .filter((p) => album === "All photos" || albumOf(p) === album)
        .map((p) => p.category),
    ),
  ).filter(Boolean)
  const close = useCallback(() => setLightboxIndex(null), [])
  const prev = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + filtered.length) % filtered.length,
    )
  const next = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length))
  function chooseAlbum(value: string) {
    setAlbum(value)
    setCategory("")
    setVisible(PAGE_SIZE)
    setLightboxIndex(null)
  }
  return (
    <section className="gallery-section" aria-labelledby="gallery-heading">
      <div className="gallery-wrap">
        <div className="gallery-intro">
          <div>
            <p className="gallery-eyebrow">OUR COMMUNITY IN PICTURES</p>
            <h2 id="gallery-heading">Moments that move us forward.</h2>
            <p>
              Explore our latest campaign and revisit the activities that
              brought our community together.
            </p>
          </div>
          <span className="gallery-total">
            {photos.length}
            <small>photos to explore</small>
          </span>
        </div>
        <div className="gallery-controls">
          <div
            className="gallery-albums"
            role="group"
            aria-label="Choose a photo collection"
          >
            {["All photos", ...albums].map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={album === value}
                onClick={() => chooseAlbum(value)}
              >
                {value}
                <span>
                  {value === "All photos"
                    ? photos.length
                    : photos.filter((p) => albumOf(p) === value).length}
                </span>
              </button>
            ))}
          </div>
          {categories.length > 1 && (
            <label className="gallery-category">
              Topic
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                  setVisible(PAGE_SIZE)
                  setLightboxIndex(null)
                }}
              >
                <option value="">All topics</option>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          )}
        </div>
        <div className="gallery-results">
          <h3>{album === "All photos" ? "All moments" : album}</h3>
          <p role="status">
            Showing {Math.min(visible, filtered.length)} of {filtered.length}{" "}
            photos{category ? " · " + category : ""}
          </p>
        </div>
        {filtered.length ? (
          <div className="gallery-masonry">
            {filtered.slice(0, visible).map((photo, i) => (
              <button
                type="button"
                className="gallery-photo"
                key={photo.image}
                onClick={() => setLightboxIndex(i)}
                aria-label={"Open photo " + (i + 1) + ": " + photo.caption}
                aria-haspopup="dialog"
              >
                <span className="gallery-photo-image">
                  <img
                    src={photo.thumbnail || photo.image}
                    width={photo.width}
                    height={photo.height}
                    alt={photo.alt || photo.caption}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="gallery-photo-open" aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </span>
                <span className="gallery-photo-caption">
                  <span>{photo.caption}</span>
                  <small>{photo.category}</small>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <p className="gallery-empty">{galleryData.emptyStateText}</p>
        )}
        {visible < filtered.length && (
          <div className="gallery-more">
            <button
              type="button"
              onClick={() => setVisible((n) => n + PAGE_SIZE)}
            >
              Show more photos <span aria-hidden="true">↓</span>
            </button>
            <p>{filtered.length - visible} more in this collection</p>
          </div>
        )}
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <Lightbox
            photos={filtered}
            index={lightboxIndex}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </div>
    </section>
  )
}
export default function GalleryPage() {
  return (
    <>
      <PageHero
        image={galleryData.hero.image}
        title={galleryData.hero.title}
        breadcrumbHome={galleryData.hero.breadcrumbHome}
        breadcrumbCurrent={galleryData.hero.breadcrumbCurrent}
      />
      <GalleryGrid />
      <Newsletter />
    </>
  )
}
