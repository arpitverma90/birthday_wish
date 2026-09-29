import { content } from '../content'
import { useReveal } from '../lib/useReveal'
import SectionTitle from './SectionTitle'
import './DefenseShowcase.css'

function Motif({ type }) {
  if (type === 'fighter') return <svg viewBox="0 0 240 120" aria-hidden="true"><path d="M18 62 94 51l35-31 13 3-12 30 80 7 12 9-12 9-80 7 12 30-13 3-35-31-76-11Z" /><path d="m104 52 16 10-16 10M155 57l-10 20" /></svg>
  if (type === 'tank') return <svg viewBox="0 0 240 120" aria-hidden="true"><path d="M42 72h145l18 15H31Z" /><path d="M64 68V48h73l25 20M135 48l57-20h25v10l-61 18" /><path d="M49 92h24m18 0h24m18 0h24m18 0h24" /></svg>
  if (type === 'radar') return <svg viewBox="0 0 240 120" aria-hidden="true"><path d="M72 91a49 49 0 0 1 98 0M88 91a33 33 0 0 1 66 0M104 91a17 17 0 0 1 34 0M121 91V21m0 0 65 42" /><circle cx="121" cy="21" r="5" /></svg>
  if (type === 'submarine') return <svg viewBox="0 0 240 120" aria-hidden="true"><path d="M28 72c19-27 53-31 88-31h48c22 0 38 13 48 31-10 18-26 27-48 27H86c-35 0-69-4-58-27Z" /><path d="M112 41V25h35v16m-18-16V16m-28 57h22m17 0h22" /></svg>
  if (type === 'carrier') return <svg viewBox="0 0 240 120" aria-hidden="true"><path d="m23 68 197-10-19 30H44Z" /><path d="m35 58 171-9 18 9M61 47l18-25h35l15 25M93 22V13h25v9" /><path d="m69 75 19-16m34 15 20-16" /></svg>
  return <svg viewBox="0 0 240 120" aria-hidden="true"><path d="m35 74 132-35 58 12-4 9-57-2L42 91Z" /><path d="m145 50 17-22 10 3-8 25M57 69l-15-18 7-4 20 15" /><path d="M29 95h180" /></svg>
}

export default function DefenseShowcase() {
  const [ref, visible] = useReveal()
  const items = content.showcase.items

  return (
    <section className="section defense" ref={ref}>
      <SectionTitle color="var(--c4)">{content.showcase.title}</SectionTitle>
      <p className="defense__intro">A little salute to the courage, discipline, and spirit behind our NCC star.</p>
      <div className={`defense__grid ${visible ? 'is-visible' : ''}`}>
        {items.map((item, index) => (
          <article className={`defense-card defense-card--${item.type}`} key={item.label} style={{ '--i': index, '--tint': `var(--c${(index % 6) + 1})` }}>
            <div className="defense-card__badge">{String(index + 1).padStart(2, '0')}</div>
            <div className="defense-card__art"><Motif type={item.type} /></div>
            <h3>{item.label}</h3>
            <p>{item.caption}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
