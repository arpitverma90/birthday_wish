/* A small, dependency-free confetti cannon drawn on a full-screen canvas. */
import { prefersReducedMotion } from './theme'

let canvas = null
let ctx = null
let particles = []
let raf = null

function ensureCanvas() {
  if (canvas) return
  canvas = document.createElement('canvas')
  canvas.setAttribute('aria-hidden', 'true')
  Object.assign(canvas.style, {
    position: 'fixed', inset: '0', width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: '9999',
  })
  document.body.appendChild(canvas)
  ctx = canvas.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
}

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

const rand = (min, max) => Math.random() * (max - min) + min
const SHAPES = ['square', 'circle', 'strip']

/**
 * fireConfetti({ count, origin: {x, y} (0–1), angle (deg, 90 = up), spread (deg), velocity, colors })
 */
export function fireConfetti(opts = {}) {
  ensureCanvas()
  const {
    count = 150,
    origin = { x: 0.5, y: 0.4 },
    angle = 90,
    spread = 360,
    velocity = 16,
    colors = ['#FF4FA3', '#FF8A3D', '#FFD93D', '#3DF2B1', '#4FC3FF', '#C084FC'],
    gravity = 0.32,
    drag = 0.985,
  } = opts

  const total = prefersReducedMotion() ? Math.round(count / 4) : count
  const w = window.innerWidth
  const h = window.innerHeight

  for (let i = 0; i < total; i++) {
    const a = ((angle + rand(-spread / 2, spread / 2)) * Math.PI) / 180
    const v = velocity * rand(0.5, 1.15)
    particles.push({
      x: origin.x * w, y: origin.y * h,
      vx: Math.cos(a) * v, vy: -Math.sin(a) * v,
      w: rand(6, 12), h: rand(6, 16),
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      rot: rand(0, Math.PI * 2), spin: rand(-0.2, 0.2),
      wobble: rand(0, Math.PI * 2), wobbleSpeed: rand(0.05, 0.12),
      life: 0, ttl: rand(150, 240), gravity, drag,
    })
  }
  if (!raf) loop()
}

function loop() {
  raf = requestAnimationFrame(loop)
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  particles = particles.filter((p) => p.life < p.ttl && p.y < window.innerHeight + 40)

  for (const p of particles) {
    p.life++
    p.vx *= p.drag
    p.vy = p.vy * p.drag + p.gravity
    p.wobble += p.wobbleSpeed
    p.x += p.vx + Math.sin(p.wobble) * 0.8
    p.y += p.vy
    p.rot += p.spin
    const alpha = p.life > p.ttl - 40 ? (p.ttl - p.life) / 40 : 1

    ctx.save()
    ctx.globalAlpha = Math.max(0, alpha)
    ctx.translate(p.x, p.y)
    ctx.rotate(p.rot)
    ctx.fillStyle = p.color
    // fake 3D flip by squashing width with the wobble
    const flip = Math.cos(p.wobble * 1.5)
    if (p.shape === 'circle') {
      ctx.beginPath(); ctx.ellipse(0, 0, (p.w / 2) * Math.abs(flip) + 1, p.w / 2, 0, 0, Math.PI * 2); ctx.fill()
    } else if (p.shape === 'strip') {
      ctx.fillRect(-p.w / 4, -p.h, (p.w / 2) * Math.abs(flip) + 1, p.h * 1.6)
    } else {
      ctx.fillRect((-p.w / 2) * flip, -p.h / 2, p.w * flip, p.h)
    }
    ctx.restore()
  }

  if (particles.length === 0) {
    cancelAnimationFrame(raf)
    raf = null
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  }
}

/** A quick celebration: one big burst plus two side cannons. */
export function celebrate(colors) {
  fireConfetti({ count: 220, colors, origin: { x: 0.5, y: 0.35 }, spread: 360, velocity: 15 })
  setTimeout(() => fireConfetti({ count: 120, colors, origin: { x: 0.05, y: 0.9 }, angle: 60, spread: 55, velocity: 22 }), 250)
  setTimeout(() => fireConfetti({ count: 120, colors, origin: { x: 0.95, y: 0.9 }, angle: 120, spread: 55, velocity: 22 }), 450)
}
