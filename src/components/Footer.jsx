import { content } from '../content'
import './Footer.css'

export default function Footer() {
  const text = (content.footer?.text || 'Made with love')
    .replace('{her}', content.her.name)
    .replace('{you}', content.you.name)
  return (
    <footer className="footer">
      <p>{text}</p>
      <p className="footer__small">— {content.you.name}</p>
    </footer>
  )
}
