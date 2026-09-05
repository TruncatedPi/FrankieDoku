# 🐱 Meowdoku! — Ad-Free Cozy Logic Puzzle

A portable, cross-platform, ad-free recreation of the beloved **Meowdoku** (Star Battle / Queens logic puzzle game). Designed for personal play on **Windows**, **iPhone / iPad (iOS)**, and **Android**.

---

## ✨ Key Features

- **🚫 100% Ad-Free & Offline**: Zero interruptions, no tracking, pure focused puzzle satisfaction.
- **🗺️ 50 Handcrafted Campaign Levels**: Progress through 4 tiers:
  - **Tier 1: Kitten Steps** (Levels 1–10, sizes 4x4 & 5x5)
  - **Tier 2: Playful Paws** (Levels 11–25, sizes 6x6 & 7x7)
  - **Tier 3: Clever Whiskers** (Levels 26–40, sizes 8x8 & 9x9)
  - **Tier 4: Grandmaster Feline** (Levels 41–50, size 10x10)
- **📅 Daily Challenges**: Unique daily puzzle generated for each calendar date with streak tracking and past-date replay.
- **♾️ Infinite Free Play**: Procedural generator capable of creating unique, verified Star Battle puzzles at any grid size (4x4 to 10x10) on demand in milliseconds!
- **👥 Cozy Two-Player / Co-Op**: Play together turn-by-turn with custom player names and favorite cat breeds.
- **❤️ Classic (3 Hearts) & 🐾 Zen Modes**: Choose between high-stakes deduction or relaxed, stress-free solving.
- **💡 Smart Assists & Hints**:
  - Auto-Cross on cat placement (automatically marks 'X' in row, column, region, and 8 surrounding neighbours).
  - Conflict Highlighting (real-time visual warnings & alarmed cat expressions).
  - Tiered logical deductions (explains the reasoning before filling).
- **🎨 6 Cat Breeds & 5 Pastel Color Palettes**:
  - Breeds: *Ginger Tabby*, *Sweet Calico*, *Tuxedo*, *Siamese*, *Midnight Void*, *Russian Gray*.
  - Palettes: *Cozy Warm*, *Sweet Pastel*, *Matcha Tea*, *Lavender Dream*, *Twilight Night*.
- **🎵 Procedural Audio & Haptics**: Delightful kitten meows, gentle pops, wood taps, and victory fanfares synthesized via Web Audio API (zero audio file downloads needed).

---

## 📖 The Rules of Meowdoku

1. **Exclusive Territory**: The board is partitioned into colored sections. You must place **exactly one cat in each colored section**.
2. **Grid Constraints**: **Exactly one cat in each row and each column**.
3. **The Aloof Rule**: Cats need their personal space! **No two cats may touch each other horizontally, vertically, or diagonally**.

---

## 🎮 Controls & Interactions

- **Single Click / Tap**: Toggles 'X' mark (in Mark mode) or Cat (in Cat mode).
- **Double Click / Double Tap**: Instantly toggles a Cat 🐱.
- **Right Click**: Secondary action on desktop.
- **Drag to Mark**: Click/touch and drag across empty squares to eliminate cells rapidly.
- **Mode Switcher**: Large bottom toggle between `[❌ Mark]` and `[🐱 Cat]` for effortless one-handed mobile play.

---

## 🚀 Running on Windows

### Quick Start (Dev Server)
```bash
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

### Production Build & Preview
```bash
npm run build
npm run preview
```
Open `http://localhost:4173`.

### Desktop Window App (Windows)
Open `http://localhost:4173` (or the deployed URL) in Microsoft Edge or Google Chrome, and click the **Install Meowdoku** icon on the right side of the address bar. It will install as a standalone Windows desktop app with its own desktop shortcut and window frame!

---

## 📱 Installing on iPhone & iPad (iOS)

You do **not** need an Apple Developer account, TestFlight, or sideloading!

1. Open the game in **Apple Safari** on your iPhone or iPad.
2. Tap the **Share** button (the square with an arrow pointing up at the bottom on iPhone, or top-right on iPad).
3. Scroll down and tap **"Add to Home Screen"**.
4. Tap **Add**.

> [!TIP]
> The app will launch in standalone full-screen mode, with a custom cat app icon, zero Safari browser bars, and full offline caching via Service Worker.

---

## 🤖 Installing on Android

1. Open the game in **Google Chrome** on your Android device.
2. Chrome will display an **"Add Meowdoku to Home screen"** prompt at the bottom (or tap the 3 vertical dots in the top right $\rightarrow$ tap **"Install App"**).
3. Tap **Install**.

The app is added to your home screen and app drawer with full offline access and vibration haptics.

---

## 🛠️ Native Mobile Packages (Capacitor)

If you'd like to build native `.apk` or `.ipa` files via Android Studio / Xcode:
```bash
# Add native platforms
npx cap add android
npx cap add ios

# Sync web build to native folders
npm run build
npx cap sync

# Open in Android Studio or Xcode
npx cap open android
npx cap open ios
```
