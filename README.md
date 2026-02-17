<<<<<<< HEAD

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

### 3. Deploy to GitHub Pages

First, create a repo called `kind-emojis-battle` on GitHub. Then:

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/kind-emojis-battle.git
git branch -M main
git push -u origin main
npm run deploy
```

Your game will be live at: `https://YOUR_USERNAME.github.io/kind-emojis-battle/`

> **Note:** If your repo has a different name, update the `base` value in `vite.config.js` to match (e.g. `base: '/my-repo-name/'`).

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
