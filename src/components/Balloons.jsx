import { useMemo } from 'react'
import './Balloons.css'

const rand = (a, b) => Math.random() * (b - a) + a

export default function Balloons({ colors, count = 14 }) {
  const balloons = useMemo(
    () => Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rand(-2, 98),
      delay: rand(0, 24),
      dur: rand(20, 34),
      size: rand(46, 84),
      sway: rand(2.4, 4.2),
      color: colors[i % colors.length],
    })),
    [colors, count],
  )

  return (
    <div className="balloons" aria-hidden="true">
      {balloons.map((b) => (
        <span
          key={b.id}
          className="balloon"
          style={{ left: `${b.left}%`, '--delay': `${b.delay}s`, '--dur': `${b.dur}s`, '--size': `${b.size}px`, '--sway': `${b.sway}s`, '--color': b.color }}
        >
          <span className="balloon__body" />
        </span>
      ))}
    </div>
  )
}
