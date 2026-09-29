import { useMemo } from 'react'
import { content } from '../content'
import { photoUrl } from '../lib/media'
import { useReveal } from '../lib/useReveal'
import SectionTitle from './SectionTitle'
import './Memories.css'

export default function Memories() {
  const items = useMemo(
    () => (content.memories?.items || []).map((m) => ({ ...m, url: m.photo ? photoUrl(m.photo) : null })),
    [],
  )
  const [ref, visible] = useReveal(0.1)
  if (items.length === 0) return null

  return (
    <section className="section memories" ref={ref}>
      <SectionTitle color="var(--c5)">{content.memories.title}</SectionTitle>

      <ol className={`timeline ${visible ? 'is-visible' : ''}`}>
        {items.map((m, i) => (
          <li className="timeline__item" key={i} style={{ '--i': i, '--tint': `var(--c${(i % 6) + 1})` }}>
            <span className="timeline__dot" aria-hidden="true" />
            <article className="memory">
              {m.url && (
                <div className="memory__photo">
                  <img src={m.url} alt={m.title} loading="lazy" />
                </div>
              )}
              <div className="memory__body">
                <time className="memory__date">{m.date}</time>
                <h3 className="memory__title">{m.title}</h3>
                <p className="memory__text">{m.text}</p>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
