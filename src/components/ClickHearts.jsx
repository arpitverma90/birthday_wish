import { useEffect, useState } from 'react'
import './ClickHearts.css'

/* Tap anywhere on the page and a few hearts float up from the spot. */
export default function ClickHearts() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    let id = 0
    function burst(e) {
      const x = e.clientX, y = e.clientY
      const batch = Array.from({ length: 5 }, () => ({
        id: id++,
        x, y,
        dx: (Math.random() - 0.5) * 120,
        size: Math.random() * 14 + 12,
        hue: Math.floor(Math.random() * 6) + 1,
      }))
      setHearts((h) => [...h, ...batch])
      setTimeout(() => setHearts((h) => h.filter((k) => !batch.includes(k))), 1300)
    }
    window.addEventListener('pointerdown', burst)
    return () => window.removeEventListener('pointerdown', burst)
  }, [])

  return (
    <div className="click-hearts" aria-hidden="true">
      {hearts.map((h) => (
        <span key={h.id} className="click-heart" style={{ left: h.x, top: h.y, '--dx': `${h.dx}px`, fontSize: h.size, color: `var(--c${h.hue})` }}>
          ♥
        </span>
      ))}
    </div>
  )
}
