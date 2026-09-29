import { useEffect, useMemo, useRef, useState } from 'react'
import { content } from '../content'
import { celebrate } from '../lib/confetti'
import { useReveal } from '../lib/useReveal'
import SectionTitle from './SectionTitle'
import './Cake.css'

const clamp = (n, a, b) => Math.min(b, Math.max(a, n))

export default function Cake({ colors, onRevealLetter }) {
  const n = clamp(Number(content.cake?.candles) || 5, 1, 12)
  const [lit, setLit] = useState(() => Array(n).fill(true))
  const [wished, setWished] = useState(false)
  const [ref, visible] = useReveal(0.2)
  const timers = useRef([])

  const spacing = Math.min(36, 170 / Math.max(n - 1, 1))
  const candles = useMemo(
    () => Array.from({ length: n }, (_, i) => ({ x: 210 + (i - (n - 1) / 2) * spacing, tint: (i % 6) + 1 })),
    [n, spacing],
  )

  // deterministic sprinkles so they don't jump on every render
  const sprinkles = useMemo(
    () => Array.from({ length: 34 }, (_, i) => {
      const onTop = i % 2 === 0
      const s = (i * 7919) % 1000 / 1000
      const t = (i * 104729) % 1000 / 1000
      return {
        x: onTop ? 125 + s * 170 : 82 + s * 256,
        y: onTop ? 150 + t * 50 : 232 + t * 52,
        rot: (i * 37) % 180,
        tint: (i % 6) + 1,
      }
    }),
    [],
  )

  const allOut = lit.every((l) => !l)

  useEffect(() => {
    if (allOut && !wished) {
      const t = setTimeout(() => {
        setWished(true)
        celebrate(colors)
        onRevealLetter?.()
      }, 600)
      return () => clearTimeout(t)
    }
  }, [allOut, wished, colors, onRevealLetter])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const blow = (i) => setLit((prev) => prev.map((l, k) => (k === i ? false : l)))

  function blowAll() {
    lit.forEach((isLit, i) => {
      if (!isLit) return
      timers.current.push(setTimeout(() => blow(i), i * 140))
    })
  }

  function relight() {
    setLit(Array(n).fill(true))
    setWished(false)
  }

  return (
    <section className="section cake" ref={ref}>
      <SectionTitle color="var(--c6)">{content.cake.title}</SectionTitle>
      {content.cake.hint && !allOut && <p className="section__hint">{content.cake.hint}</p>}

      <div className={`cake__stage ${visible ? 'is-visible' : ''}`}>
        <svg className="cake__svg" viewBox="0 0 420 340" role="img" aria-label={`Birthday cake with ${n} candles`}>
          {/* plate */}
          <ellipse cx="210" cy="302" rx="178" ry="24" fill="rgba(255,255,255,.18)" />
          <ellipse cx="210" cy="298" rx="165" ry="18" fill="rgba(255,255,255,.35)" />

          {/* bottom tier */}
          <rect x="70" y="205" width="280" height="92" rx="16" className="tier tier--bottom" />
          <rect x="70" y="252" width="280" height="14" fill="rgba(255,255,255,.16)" />
          <rect x="70" y="198" width="280" height="22" rx="11" className="frosting" />
          {[96, 136, 181, 229, 276, 322].map((x, i) => (
            <rect key={x} x={x - 6} y="208" width="12" height={20 + (i % 3) * 7} rx="6" className="frosting" />
          ))}

          {/* top tier */}
          <rect x="115" y="125" width="190" height="86" rx="16" className="tier tier--top" />
          <rect x="115" y="168" width="190" height="12" fill="rgba(255,255,255,.16)" />
          <rect x="115" y="118" width="190" height="22" rx="11" className="frosting" />
          {[140, 176, 214, 252, 286].map((x, i) => (
            <rect key={x} x={x - 6} y="128" width="12" height={18 + (i % 3) * 6} rx="6" className="frosting" />
          ))}

          {/* sprinkles */}
          {sprinkles.map((s, i) => (
            <rect key={i} x={s.x} y={s.y} width="9" height="3.5" rx="1.75" transform={`rotate(${s.rot} ${s.x} ${s.y})`} style={{ fill: `var(--c${s.tint})` }} opacity=".9" />
          ))}

          {/* candles */}
          {candles.map((c, i) => {
            const isLit = lit[i]
            return (
              <g
                key={i}
                className={`candle ${isLit ? 'candle--lit' : 'candle--out'}`}
                transform={`translate(${c.x} 0)`}
                onClick={() => isLit && blow(i)}
                onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && isLit) { e.preventDefault(); blow(i) } }}
                tabIndex={isLit ? 0 : -1}
                role="button"
                aria-label={isLit ? `Blow out candle ${i + 1}` : `Candle ${i + 1} is out`}
              >
                <rect x="-5" y="80" width="10" height="46" rx="3" style={{ fill: `var(--c${c.tint})` }} />
                <rect x="-5" y="92" width="10" height="6" fill="rgba(255,255,255,.7)" />
                <rect x="-5" y="108" width="10" height="6" fill="rgba(255,255,255,.7)" />
                <line x1="0" y1="80" x2="0" y2="72" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
                {/* wrapper carries the position; the inner group carries the CSS animation */}
                <g transform="translate(0 72)">
                  <g className="flame">
                    <circle cx="0" cy="-12" r="16" className="flame__glow" />
                    <path d="M0 0 C -7 -8 -7 -20 0 -29 C 7 -20 7 -8 0 0 Z" className="flame__outer" />
                    <path d="M0 -3 C -3.5 -8 -3.5 -15 0 -20 C 3.5 -15 3.5 -8 0 -3 Z" className="flame__inner" />
                  </g>
                </g>
                <g className="smoke" transform="translate(0 70)">
                  <circle cx="0" cy="0" r="3" />
                  <circle cx="4" cy="-8" r="4" />
                  <circle cx="-3" cy="-16" r="5" />
                </g>
              </g>
            )
          })}
        </svg>

        <div className={`cake__wish ${wished ? 'cake__wish--show' : ''}`} aria-live="polite">
          {wished && <p>{content.cake.wish}</p>}
        </div>
      </div>

      <div className="cake__actions">
        {!allOut ? (
          <button className="btn" onClick={blowAll}>Blow them all out 💨</button>
        ) : (
          <button className="btn btn--ghost" onClick={relight}>Light them again 🕯️</button>
        )}
      </div>
    </section>
  )
}
