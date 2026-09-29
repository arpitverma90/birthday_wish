import { useEffect, useMemo, useRef, useState } from 'react'
import { content } from './content'
import { applyTheme, getTheme } from './lib/theme'
import { resolveMusic } from './lib/media'
import { celebrate } from './lib/confetti'

import GiftIntro from './components/GiftIntro'
import Balloons from './components/Balloons'
import ClickHearts from './components/ClickHearts'
import MusicPlayer from './components/MusicPlayer'
import Hero from './components/Hero'
import DefenseShowcase from './components/DefenseShowcase'
import Gallery from './components/Gallery'
import Memories from './components/Memories'
import Videos from './components/Videos'
import Reasons from './components/Reasons'
import Cake from './components/Cake'
import Letter from './components/Letter'
import Footer from './components/Footer'

export default function App() {
  const [opened, setOpened] = useState(false)
  const [showLetter, setShowLetter] = useState(false)
  const audioRef = useRef(null)
  const music = useMemo(() => resolveMusic(content.music), [])
  const theme = useMemo(() => getTheme(), [])

  useEffect(() => {
    applyTheme()
    document.title = `Happy Birthday ${content.her.name} 🎂`
  }, [])

  function handleOpen() {
    setOpened(true)
    celebrate(theme.colors)
    window.scrollTo({ top: 0 })
  }

  function handleMusicStart() {
    if (music && content.music.autoPlay) audioRef.current?.play().catch(() => {})
  }

  return (
    <>
      {music && <audio ref={audioRef} src={music.url} loop preload="auto" />}

      {!opened ? (
        <GiftIntro onOpen={handleOpen} onMusicStart={handleMusicStart} />
      ) : (
        <main className="site">
          <Balloons colors={theme.colors} />
          <ClickHearts />
          {music && <MusicPlayer audioRef={audioRef} music={music} />}
          <Hero />
          <DefenseShowcase />
          <Gallery />
          <Memories />
          <Videos />
          <Reasons />
          <Cake colors={theme.colors} onRevealLetter={() => setShowLetter(true)} />
          {showLetter && <Letter />}
          <Footer />
        </main>
      )}
    </>
  )
}
