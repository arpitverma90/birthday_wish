import { useMemo } from 'react'
import { content } from '../content'
import { resolveVideos } from '../lib/media'
import SectionTitle from './SectionTitle'
import './Videos.css'

export default function Videos() {
  const videos = useMemo(() => resolveVideos(content.videos?.items), [])

  // pause the background song when a video starts
  const pauseMusic = () => window.dispatchEvent(new CustomEvent('bday:pause-music'))

  return (
    <section className="section videos">
      <SectionTitle color="var(--c4)">{content.videos.title}</SectionTitle>
      {videos.length > 0 ? (
        <div className={`videos__grid ${videos.length === 1 ? 'videos__grid--single' : ''}`}>
          {videos.map((v, i) => (
            <figure className="video" key={v.url} style={{ '--tint': `var(--c${(i % 6) + 1})` }}>
              <div className="video__frame">
                <video src={v.url} poster={v.posterUrl || undefined} controls playsInline preload="metadata" onPlay={pauseMusic} />
              </div>
              {v.title && <figcaption className="video__title">{v.title}</figcaption>}
            </figure>
          ))}
        </div>
      ) : (
        <div className="videos__placeholder">
          <strong>Your special videos will appear here</strong>
          <span>Add 1 or 2 videos to <code>src/media/videos/</code>, then list their filenames in <code>src/content.js</code>.</span>
        </div>
      )}
    </section>
  )
}
