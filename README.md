# Kind Emojis Battle! 🎮

A two-player emoji battle game for kids. Pick kind emojis and throw them over the wall!

## Quick Start (2 minutes)

### 1. Install dependencies

```bash
cd kind-emojis-battle
npm install
```

### 2. Run locally

```bash
npm run dev
```

This opens a local server (usually http://localhost:5173). Open it on your phone or browser to play!

## Adding Sound Effects Later

Drop audio files into `src/assets/sounds/` and import them:

```jsx
import popSound from "./assets/sounds/pop.mp3";

const audio = new Audio(popSound);
audio.play();
```

Vite will handle bundling the audio files automatically.

## Commands

| Command           | What it does                           |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Start local dev server with hot reload |
| `npm run build`   | Build for production into `dist/`      |
| `npm run preview` | Preview the production build locally   |
| `npm run deploy`  | Build + deploy to GitHub Pages         |
