import { useState } from 'react'
import { content } from '../content'
import { useReveal } from '../lib/useReveal'
import SectionTitle from './SectionTitle'
import './Reasons.css'

export default function Reasons() {
  const items = content.reasons?.items || []
  const [flipped, setFlipped] = useState(() => new Set())
  const [ref, visible] = useReveal(0.1)
  if (items.length === 0) return null

  const toggle = (i) =>
    setFlipped((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })

  const allOpen = flipped.size === items.length

  return (
    <section className="section reasons" ref={ref}>
      <SectionTitle color="var(--c2)">{content.reasons.title}</SectionTitle>
      {content.reasons.hint && <p className="section__hint">{content.reasons.hint}</p>}

      <div className={`reasons__grid ${visible ? 'is-visible' : ''}`}>
        {items.map((text, i) => {
          const open = flipped.has(i)
          return (
            <button
              key={i}
              className={`reason ${open ? 'reason--open' : ''}`}
              style={{ '--i': i, '--tint': `var(--c${(i % 6) + 1})` }}
              onClick={() => toggle(i)}
              aria-pressed={open}
              aria-label={open ? `Reason ${i + 1}: ${text}` : `Reveal reason ${i + 1}`}
            >
              <span className="reason__inner">
                <span className="reason__front" aria-hidden="true">
                  <span className="reason__heart">♥</span>
                  <span className="reason__num">{i + 1}</span>
                </span>
                <span className="reason__back">
                  <span className="reason__text">{text}</span>
                </span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="reasons__actions">
        <button className="btn btn--ghost" onClick={() => setFlipped(allOpen ? new Set() : new Set(items.map((_, i) => i)))}>
          {allOpen ? 'Hide them again' : 'Reveal all'}
        </button>
      </div>
    </section>
  )
}
