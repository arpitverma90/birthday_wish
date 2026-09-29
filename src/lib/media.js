/* Finds the files you dropped into src/media/… and turns file names from
   content.js into real URLs. You should not need to edit this file. */

const IMG = /\.(jpe?g|png|gif|webp|avif|svg)$/i
const VID = /\.(mp4|webm|mov|m4v|ogv)$/i
const AUD = /\.(mp3|m4a|ogg|wav|aac|flac)$/i

// Vite picks up every file in these folders at build time.
const photoFiles = import.meta.glob('../media/photos/*', { eager: true, query: '?url', import: 'default' })
const videoFiles = import.meta.glob('../media/videos/*', { eager: true, query: '?url', import: 'default' })
const musicFiles = import.meta.glob('../media/music/*',  { eager: true, query: '?url', import: 'default' })

const nameOf = (path) => path.split('/').pop()

function toList(map, test) {
  return Object.entries(map)
    .filter(([path]) => test.test(path))
    .map(([path, url]) => ({ file: nameOf(path), url }))
    .sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }))
}

const photoList = toList(photoFiles, IMG)
const videoList = toList(videoFiles, VID)
const musicList = toList(musicFiles, AUD)

function find(list, file, folder) {
  if (!file) return null
  const hit = list.find((i) => i.file === file)
  if (!hit) console.warn(`[birthday-site] File not found: src/media/${folder}/${file}  (check the spelling in src/content.js)`)
  return hit ? hit.url : null
}

export const photoUrl = (file) => find(photoList, file, 'photos')
export const videoUrl = (file) => find(videoList, file, 'videos')
export const musicUrl = (file) => find(musicList, file, 'music')

/** Photos listed in content.js, or every photo in the folder when the list is empty. */
export function resolvePhotos(listed) {
  if (!listed || listed.length === 0) return photoList.map((p) => ({ ...p, caption: '' }))
  return listed
    .map((item) => {
      const url = photoUrl(item.file)
      return url ? { ...item, url } : null
    })
    .filter(Boolean)
}

export function resolveVideos(listed) {
  if (!listed || listed.length === 0) return []
  return listed
    .map((item) => {
      const url = videoUrl(item.file)
      if (!url) return null
      const posterUrl = item.poster ? photoUrl(item.poster) : null
      return { ...item, url, posterUrl }
    })
    .filter(Boolean)
}

export function resolveMusic(music) {
  if (!music || !music.file) return null
  const url = musicUrl(music.file)
  return url ? { ...music, url } : null
}
