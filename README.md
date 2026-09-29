# birthday_wish

## Richa's NCC Birthday Wish Website

A personalized React birthday site with an Indian Air Force-inspired blue theme, an NCC showcase, photos, music, a cake interaction, and a friendship letter.

## Run locally

Requires Node.js. From this folder run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually http://localhost:5173. Source edits reload automatically.

## Personalize content

Edit `src/content.js` to update names, birthday date, messages, memories, buddy reasons, theme colors, and media filenames.

Place media in these folders and refer to filenames exactly as saved:

| Media | Folder | Supported formats |
|---|---|---|
| Photos | `src/media/photos/` | `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp` |
| Videos | `src/media/videos/` | `.mp4`, `.webm`, `.mov`, `.m4v`, `.ogv` |
| Music | `src/media/music/` | `.mp3`, `.m4a`, `.ogg`, `.wav` |

The current music file is `src/media/music/our-song.mp3.mp3`. The video section stays visible and displays an upload prompt until video entries are configured in `src/content.js`.

## Build

```bash
npm run build
npm run preview
```

Vite writes production output to `dist/`; dependencies and build output are excluded from Git.
