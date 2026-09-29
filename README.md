# 🎂 Birthday Wish Website

A colourful, animated birthday website built with React. Everything on it — her name, the date,
the photos, videos, song, messages and colours — comes from **one file**: `src/content.js`.

What she'll see, top to bottom:

1. **A gift box** she taps to open → confetti bursts and the song starts
2. **Her name** in big bouncing letters, her new age, and a live countdown to the day
3. **Polaroid photo wall** — tap any photo to view it full-screen
4. **Our story** — a timeline of memories with photos
5. **Videos** (only shows if you add some)
6. **Reasons I love you** — tap-to-flip cards
7. **A cake** — tap the candles to blow them out, then make a wish
8. **A letter** that types itself out
9. Balloons floating the whole time, and hearts wherever she taps

---

## 1. Run it on your computer (first time)

You need **Node.js** (free): https://nodejs.org — download the "LTS" version and install it.

Then open a terminal / command prompt inside this folder and run:

```bash
npm install
npm run dev
```

Open the link it prints (usually http://localhost:5173). The page reloads by itself every time you save a file.

---

## 2. Add your pictures, videos and song

Copy your files into these folders:

| What | Folder | Formats |
|---|---|---|
| Photos | `src/media/photos/` | .jpg .jpeg .png .gif .webp |
| Videos | `src/media/videos/` | .mp4 .webm .mov |
| Song | `src/media/music/` | .mp3 .m4a .ogg .wav |

Then open **`src/content.js`** and write the file names exactly as they are saved:

```js
music: { file: "our-song.mp3", title: "Perfect", artist: "Ed Sheeran" },

gallery: {
  photos: [
    { file: "beach.jpg",  caption: "Goa, March 2024" },
    { file: "dinner.jpg", caption: "Your favourite pasta place" },
  ],
},

videos: {
  items: [
    { file: "trip.mp4", title: "Our road trip", poster: "beach.jpg" },
  ],
},
```

* Capital letters matter: `Beach.JPG` and `beach.jpg` are different files.
* Delete the placeholder `photo-1.jpg … photo-6.jpg` once you have real photos.
* Leave `photos: []` empty and every photo in the folder loads automatically (sorted by file name — name them `01-…`, `02-…` to control the order).
* If a file name is misspelled, the browser console (F12) tells you which one.

## 3. Change the words, date and colours

All in `src/content.js`:

* `her.name`, `her.nickname`, `you.name`
* `birthday.date` (`YYYY-MM-DD`) and `birthday.turning` (her new age)
* `theme.preset`: `"candy"`, `"sunset"`, `"ocean"` or `"galaxy"` — or write your own colours at the bottom of the file
* Every message: intro lines, subtitle, memories, reasons, cake wish, the letter
* Anything you set to `""` or `[]` disappears from the site

## 4. Put it online and send her the link

Build the finished site:

```bash
npm run build
```

This creates a `dist/` folder. Upload that folder to any free host:

* **Netlify Drop** — https://app.netlify.com/drop → drag the `dist` folder in → you get a link in seconds
* **Vercel** — https://vercel.com → New Project → import this folder (it detects Vite automatically)
* **GitHub Pages** — push the repo, then publish the `dist` folder

Tip: the song only starts after she taps "Open your gift" — phones block music that starts by itself, so this is on purpose.

To check the built site locally before uploading: `npm run preview`.

---

## Folder map

```
birthday-wish-site/
├── src/
│   ├── content.js          ← THE file you edit
│   ├── media/
│   │   ├── photos/         ← drop photos here
│   │   ├── videos/         ← drop videos here
│   │   └── music/          ← drop the song here
│   ├── components/         ← one file per section (Hero, Gallery, Cake, Letter …)
│   ├── lib/                ← confetti, media loader, theme helpers
│   └── styles/global.css   ← colours, fonts, buttons
├── index.html
├── package.json
└── vite.config.js
```

Want to change how a section looks? Each section is `src/components/<Name>.jsx` with its styles in `<Name>.css`.
Want to remove a section? Delete its line in `src/App.jsx`.
