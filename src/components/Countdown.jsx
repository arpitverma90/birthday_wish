import { useEffect, useState } from 'react'
import { content } from '../content'
import './Countdown.css'

function nextBirthday(dateStr) {
  const [, m, d] = dateStr.split('-').map(Number)
  const now = new Date()
  const isToday = now.getMonth() === m - 1 && now.getDate() === d
  let target = new Date(now.getFullYear(), m - 1, d, 0, 0, 0)
  if (!isToday && target < now) target = new Date(now.getFullYear() + 1, m - 1, d, 0, 0, 0)
  return { target, isToday }
}

function split(ms) {
  const s = Math.max(0, Math.floor(ms / 1000))
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  }
}

export default function Countdown() {
  const { date, showCountdown } = content.birthday
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!showCountdown || !date) return
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [showCountdown, date])

  if (!showCountdown || !date) return null
  const { target, isToday } = nextBirthday(date)

  if (isToday) {
    return (
      <div className="countdown countdown--today">
        <span>🎉</span> It's your day, {content.her.nickname || content.her.name}! <span>🎉</span>
      </div>
    )
  }

  const t = split(target - now)
  const cells = [
    [t.days, 'days'], [t.hours, 'hours'], [t.mins, 'minutes'], [t.secs, 'seconds'],
  ]

  return (
    <div className="countdown" aria-live="off">
      <p className="countdown__label">Counting down to the big day</p>
      <div className="countdown__row">
        {cells.map(([n, label], i) => (
          <div className="countdown__cell" key={label} style={{ '--tint': `var(--c${i + 1})` }}>
            <span className="countdown__num">{String(n).padStart(2, '0')}</span>
            <span className="countdown__unit">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
