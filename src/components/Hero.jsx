import { content } from '../content'
import Countdown from './Countdown'
import './Hero.css'

export default function Hero() {
  const { name } = content.her
  const { greeting, subtitle, scrollHint } = content.hero
  const { turning } = content.birthday

  return (
    <section className="hero">
      <p className="hero__greeting">{greeting}</p>

      <h1 className="hero__name" aria-label={name}>
        {name.split('').map((ch, i) => (
          <span key={i} className="hero__letter" style={{ '--i': i, '--tint': `var(--c${(i % 6) + 1})` }} aria-hidden="true">
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))}
      </h1>

      {turning ? (
        <p className="hero__age">
          <span className="hero__age-badge">{turning}</span> looks good on you
        </p>
      ) : null}

      {subtitle && <p className="hero__subtitle">{subtitle}</p>}

      <Countdown />

      {scrollHint && (
        <a className="hero__scroll" href="#gallery">
          {scrollHint}
          <span className="hero__chevron" aria-hidden="true" />
        </a>
      )}
    </section>
  )
}
