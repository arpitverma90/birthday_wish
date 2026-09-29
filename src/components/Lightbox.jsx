import { useEffect } from 'react'
import './Lightbox.css'

export default function Lightbox({ photos, index, onClose, onIndex }) {
  const photo = photos[index]
  const prev = () => onIndex((index - 1 + photos.length) % photos.length)
  const next = () => onIndex((index + 1) % photos.length)

  useEffect(() => {
    function key(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', key)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', key)
      document.body.style.overflow = ''
    }
  })

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={onClose}>
      <button className="lightbox__close" onClick={onClose} aria-label="Close">×</button>
      {photos.length > 1 && (
        <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Previous photo">‹</button>
      )}
      <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
        <img key={photo.url} src={photo.url} alt={photo.caption || `Photo ${index + 1}`} />
        {photo.caption && <figcaption>{photo.caption}</figcaption>}
        <span className="lightbox__count">{index + 1} / {photos.length}</span>
      </figure>
      {photos.length > 1 && (
        <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); next() }} aria-label="Next photo">›</button>
      )}
    </div>
  )
}
