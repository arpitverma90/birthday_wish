import { content, themePresets } from '../content'

export function getTheme() {
  const preset = themePresets[content.theme?.preset] || themePresets.candy
  return { ...preset, ...(content.theme?.custom || {}) }
}

/** Writes the chosen colours onto the page as CSS variables. */
export function applyTheme() {
  const t = getTheme()
  const root = document.documentElement.style
  root.setProperty('--bg-1', t.bg1)
  root.setProperty('--bg-2', t.bg2)
  root.setProperty('--text', t.text)
  root.setProperty('--paper', t.paper)
  root.setProperty('--ink', t.ink)
  const colors = t.colors && t.colors.length ? t.colors : themePresets.candy.colors
  for (let i = 0; i < 6; i++) root.setProperty(`--c${i + 1}`, colors[i % colors.length])
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t.bg1)
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
