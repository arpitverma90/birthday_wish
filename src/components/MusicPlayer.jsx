import { useEffect, useState } from 'react'
import './MusicPlayer.css'

export default function MusicPlayer({ audioRef, music }) {
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const on = () => setPlaying(true)
    const off = () => setPlaying(false)
    const pauseForVideo = () => audio.pause()
    audio.addEventListener('play', on)
    audio.addEventListener('pause', off)
    window.addEventListener('bday:pause-music', pauseForVideo)
    setPlaying(!audio.paused)
    return () => {
      audio.removeEventListener('play', on)
      audio.removeEventListener('pause', off)
      window.removeEventListener('bday:pause-music', pauseForVideo)
    }
  }, [audioRef])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) audio.play().catch(() => {})
    else audio.pause()
  }

  return (
    <button className={`music ${playing ? 'music--on' : ''}`} onClick={toggle} aria-pressed={playing} aria-label={playing ? 'Pause music' : 'Play music'}>
      <span className="music__bars" aria-hidden="true">
        <i /><i /><i /><i />
      </span>
      <span className="music__text">
        <span className="music__title">{music.title || 'Our song'}</span>
        {music.artist && <span className="music__artist">{music.artist}</span>}
      </span>
      <span className="music__icon" aria-hidden="true">{playing ? '❚❚' : '▶'}</span>
    </button>
  )
}
