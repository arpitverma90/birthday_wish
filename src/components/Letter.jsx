import { useEffect, useState } from 'react'
import { content } from '../content'
import { prefersReducedMotion } from '../lib/theme'
import { useReveal } from '../lib/useReveal'
import SectionTitle from './SectionTitle'
import './Letter.css'

export default function Letter() {
  const { title, paragraphs = [], signoff } = content.letter || {}
  const [ref, visible] = useReveal(0.3)
  const total = paragraphs.reduce((sum, p) => sum + p.length + 1, 0)
  const [count, setCount] = useState(0)
  const done = count >= total

  useEffect(() => {
    if (!visible) return
    if (prefersReducedMotion()) { setCount(total); return }
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= total) { clearInterval(id); return c }
        return c + 1
      })
    }, 26)
    return () => clearInterval(id)
  }, [visible, total])

  if (paragraphs.length === 0) return null

  // hand out `count` characters across the paragraphs in order
  let budget = count
  const shown = paragraphs.map((p) => {
    const text = p.slice(0, Math.max(0, budget))
    const typing = budget > 0 && budget < p.length
    budget -= p.length + 1
    return { text, typing }
  })
  const cursorAt = done ? -1 : Math.max(0, shown.findIndex((s) => s.typing || s.text.length === 0))

  return (
    <section className="section letter" ref={ref}>
      <SectionTitle color="var(--c3)">{title}</SectionTitle>

      <div className={`paper ${visible ? 'is-visible' : ''}`} onClick={() => !done && setCount(total)} title={done ? '' : 'Tap to read it all at once'}>
        <span className="paper__pin" aria-hidden="true" />
        <p className="paper__to">Dear {content.her.nickname || content.her.name},</p>

        {shown.map((s, i) => (
          <p className="paper__line" key={i}>
            {s.text}
            {i === cursorAt && <span className="paper__cursor" aria-hidden="true" />}
          </p>
        ))}

        <div className={`paper__sign ${done ? 'paper__sign--show' : ''}`}>
          {signoff && <p>{signoff}</p>}
          <p className="paper__name">{content.you.name}</p>
        </div>
      </div>
    </section>
  )
}
