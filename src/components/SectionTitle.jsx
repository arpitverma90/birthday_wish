/* Shared heading with a hand-drawn underline. */
export default function SectionTitle({ children, color = 'var(--c3)' }) {
  return (
    <h2 className="section__title">
      <span>{children}</span>
      <svg className="section__underline" viewBox="0 0 220 14" preserveAspectRatio="none" aria-hidden="true">
        <path d="M3 9 C 40 2, 70 12, 110 6 S 180 2, 217 8" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
      </svg>
    </h2>
  )
}
