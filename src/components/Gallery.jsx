import { useMemo, useState } from 'react'
import { content } from '../content'
import { resolvePhotos } from '../lib/media'
import { useReveal } from '../lib/useReveal'
import SectionTitle from './SectionTitle'
import Lightbox from './Lightbox'
import './Gallery.css'

// deterministic "random" tilt so the wall looks the same on every visit
const tilt = (i) => ((i * 137) % 11) - 5

export default function Gallery() {
  const photos = useMemo(() => resolvePhotos(content.gallery.photos), [])
  const [active, setActive] = useState(null)
  const [ref, visible] = useReveal(0.1)

  if (photos.length === 0) return null

  return (
    <section id="gallery" className="section gallery" ref={ref}>
      <SectionTitle color="var(--c1)">{content.gallery.title}</SectionTitle>

      <div className={`polaroids ${visible ? 'is-visible' : ''}`}>
        {photos.map((p, i) => (
          <button
            key={p.url}
            className="polaroid"
            style={{ '--rot': `${tilt(i)}deg`, '--i': i, '--tape': `var(--c${(i % 6) + 1})` }}
            onClick={() => setActive(i)}
            aria-label={p.caption ? `Open photo: ${p.caption}` : `Open photo ${i + 1}`}
          >
            <span className="polaroid__tape" aria-hidden="true" />
            <span className="polaroid__frame">
              <img src={p.url} alt="" loading="lazy" />
            </span>
            <span className="polaroid__caption">{p.caption || '\u00A0'}</span>
          </button>
        ))}
      </div>

      {active !== null && (
        <Lightbox photos={photos} index={active} onClose={() => setActive(null)} onIndex={setActive} />
      )}
    </section>
  )
}
