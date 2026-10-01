/* ==========================================================================
   🎂  EDIT THIS FILE — everything on the website comes from here
   ==========================================================================

   HOW TO ADD PICTURES, VIDEOS AND A SONG
   --------------------------------------
   1. Copy your files into these folders:
        src/media/photos/   →  .jpg  .jpeg  .png  .gif  .webp
        src/media/videos/   →  .mp4  .webm  .mov
        src/media/music/    →  .mp3  .m4a   .ogg  .wav

   2. Write the file names below EXACTLY as they are saved (capital letters matter).
        e.g.  { file: "beach-day.jpg", caption: "Goa, March 2024" }

   3. Save this file. The website updates itself.

   Anything you leave empty ( ""  or  [] ) is simply hidden on the site.
   ========================================================================== */

export const content = {

  /* ---------- People ---------- */
  her: {
    name: "Richa (Colonel Saab)", // her full name — shown big on the first page
    nickname: "Colonel Saab",     // what you call her — used in small messages
  },
  you: {
    name: "Arpit",          // your name — used in the letter sign-off and footer
  },

  /* ---------- Birthday ---------- */
  birthday: {
    date: "2026-10-02",     // YYYY-MM-DD  (only the month and day are used, the year can be anything)
    birthDate: "1999-10-02",
    turning: 27,             // her new age — or  null  to hide it
    showCountdown: true,    // shows a live countdown until the day, and a celebration on the day
  },

  /* ---------- Colours ---------- */
  theme: {
    preset: "ncc",          // "candy" | "sunset" | "ocean" | "galaxy" | "ncc"   (see the bottom of this file)
    custom: {},             // optional overrides, e.g.  { bg1: "#000000", colors: ["#ff0000", ...] }
  },

  /* ---------- Music ---------- */
  music: {
    file: "our-song.mp3.mp3", // file inside src/media/music/   — leave "" for no music
    title: "Perfect",
    artist: "Ed Sheeran",
    autoPlay: true,         // starts the moment she taps "Open your gift"
  },

  /* ---------- First screen (the gift) ---------- */
  intro: {
    line1: "A special salute",
    line2: "for our NCC star",
    button: "Open your gift 🎁",
  },

  /* ---------- Big greeting ---------- */
  hero: {
    greeting: "Happy Birthday",
    subtitle: "To Richa, our brave NCC star, who makes every ordinary day feel extraordinary.\nHappy birthday! Stay bossy, humble, calm, enthusiastic, and always our favourite buddy.",
    scrollHint: "keep scrolling, there's more",
  },

  /* ---------- NCC / armed-forces salute ---------- */
  showcase: {
    title: "NCC spirit in formation",
    items: [
      { type: "fighter", label: "Fighter jet", caption: "Fearless focus and a sky full of dreams." },
      { type: "tank", label: "Armoured strength", caption: "Steady, strong, and ready for every challenge." },
      { type: "radar", label: "Radar watch", caption: "Sharp eyes, calm mind, always looking ahead." },
      { type: "submarine", label: "Submarine patrol", caption: "Quiet confidence beneath every surface." },
      { type: "carrier", label: "Aircraft carrier", caption: "Big ambitions with room for every adventure." },
      { type: "rifle", label: "Ceremonial rifle", caption: "A salute to NCC discipline, pride, and service." },
    ],
  },

  /* ---------- Photo wall ---------- */
  gallery: {
    title: "Our favourite moments",
    // Captions are optional. To auto-load EVERY photo in the folder instead, use:   photos: []
    photos: [
      { file: "photo-1.jpg", caption: "The day it all started" },
      { file: "photo-2.jpg", caption: "You, laughing at my terrible joke" },
      { file: "photo-3.jpg", caption: "Our first trip together" },
      { file: "photo-4.jpg", caption: "Sunday morning chai" },
      { file: "photo-5.jpg", caption: "That sunset we never wanted to end" },
      { file: "photo-6.jpg", caption: "Just us" },
    ],
  },

  /* ---------- Our story (timeline) ---------- */
  memories: {
    title: "Our story so far",
    items: [
      {
        date: "March 2019",
        title: "First hello",
        text: "You said hi first. I pretended to be calm. I was not calm.",
        photo: "photo-1.jpg",           // optional — a file from src/media/photos/
      },
      {
        date: "July 2026",
        title: "The Balloon's Day",
        text: "Colorful balloons filled the day with joy, laughter, and unforgettable memories.",
        photo: "photo-2.jpg",
      },
      {
        date: "July 2026",
        title: "Our first trip",
        text: "Three days, a hundred photos, and one very sunburnt nose (mine).",
        photo: "photo-3.jpg",
      },
      {
        date: "Today",
        title: "Your birthday",
        text: "And I get to celebrate you. Best day of the year.",
        photo: "",
      },
    ],
  },

  /* ---------- Videos ---------- */
  videos: {
    title: "Press play",
    items: [
       { file: "our-trip.mp4", title: "Goa, the best three days", poster: "photo-3.jpg" },
        { file: "birthday-message.mp4", title: "A message from your buddy" },
    ],
  },

  /* ---------- Reasons you're an amazing friend (tap-to-reveal cards) ---------- */
  reasons: {
    title: "Reasons you're a great buddy",
    hint: "tap a card",
    items: [
      "You make every ordinary day more fun.",
      "You always remember the little things.",
      "You turn every trip into a great story.",
      "You are there whenever a friend needs you.",
      "You give the best honest advice.",
      "You make everyone laugh, even on difficult days.",
      "You bring courage, kindness, and NCC spirit everywhere.",
      "Because having you as a friend is a real gift.",
    ],
  },

  /* ---------- Cake ---------- */
  cake: {
    title: "Time for cake",
    candles: 5,                                   // number of candles on top (1–12)
    hint: "Tap the candles to blow them out",
    wish: "Make a wish, Colonel Saab ✨",
  },

  /* ---------- Letter (types itself out) ---------- */
  letter: {
    title: "A letter for you",
    paragraphs: [
      "Happy birthday, Richa, my amazing buddy.",
      "You are bossy with me, humble at heart, enthusiastic about everything, and already excited for the party.",
      "I love how you can be calm and confident, enjoy your own company, and celebrate yourself like the star you are.",
      "And of course, muh chalana is your permanent hobby. Never change, Colonel Saab. Life is more fun with you around.",
    ],
    signoff: "Your buddy, always,",
  },

  /* ---------- Footer ---------- */
  footer: {
    text: "Made with friendship and birthday cheer, for {her}",     // {her} and {you} get replaced with the names above
  },
};

/* ==========================================================================
   COLOUR PRESETS — pick one in  theme.preset  above, or add your own here
   bg1 / bg2  = page background gradient
   colors     = the six party colours used for balloons, confetti, cards, text
   paper/ink  = the letter & polaroid paper colour and its text colour
   ========================================================================== */
export const themePresets = {
  candy: {
    bg1: "#2B0A3D", bg2: "#4A1259",
    colors: ["#FF4FA3", "#FF8A3D", "#FFD93D", "#3DF2B1", "#4FC3FF", "#C084FC"],
    text: "#FFF8FC", paper: "#FFFDF7", ink: "#3B2A4A",
  },
  sunset: {
    bg1: "#3A0D24", bg2: "#8A2A44",
    colors: ["#FF6B6B", "#FFA94D", "#FFD166", "#FF8FAB", "#FFE8D6", "#F77F00"],
    text: "#FFF6F0", paper: "#FFF9F2", ink: "#4A1F2E",
  },
  ocean: {
    bg1: "#06213A", bg2: "#0E4A6E",
    colors: ["#4CC9F0", "#4895EF", "#80FFDB", "#F9F871", "#FF6392", "#B8F2E6"],
    text: "#F2FBFF", paper: "#F7FCFF", ink: "#12324A",
  },
  galaxy: {
    bg1: "#0B0620", bg2: "#2A1B5C",
    colors: ["#F72585", "#B5179E", "#7209B7", "#4CC9F0", "#FFD166", "#80FFDB"],
    text: "#F6F0FF", paper: "#FBF8FF", ink: "#2A1B4A",
  },
  ncc: {
    bg1: "#081D35", bg2: "#2F6F9F",
    colors: ["#83C5E8", "#C2B280", "#153B63", "#D4A017", "#F4F1DE", "#8F3B32"],
    text: "#F4F8FC", paper: "#F8F5E9", ink: "#19324A",
  },
};
