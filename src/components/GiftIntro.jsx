import { useMemo, useState } from 'react'
import { content } from '../content'
import './GiftIntro.css'

export default function GiftIntro({ onOpen, onMusicStart }) {
  const [opening, setOpening] = useState(false)

  const stars = useMemo(
    () => Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
    })),
    [],
  )

  function open() {
    if (opening) return
    setOpening(true)
    onMusicStart?.()
    setTimeout(onOpen, 950)
  }

  return (
    <section className={`intro ${opening ? 'intro--opening' : ''}`}>
      <div className="intro__stars" aria-hidden="true">
        {stars.map((s) => (
          <span key={s.id} style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }} />
        ))}
      </div>

      <button className="gift" onClick={open} aria-label={content.intro.button}>
        <span className="gift__lid">
          <span className="gift__bow" />
        </span>
        <span className="gift__box">
          <span className="gift__ribbon" />
        </span>
        <span className="gift__glow" />
      </button>

      <p className="intro__line">
        {content.intro.line1}
        <br />
        <strong>{content.intro.line2}</strong>
      </p>

      <button className="btn btn--big" onClick={open}>
        {content.intro.button}
      </button>
    </section>
  )
}
