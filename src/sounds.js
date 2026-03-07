// Real sound files
import sfxBadEmoji from "./assets/sounds/sfx-bad-emoji.mp3";
import sfxBgCreate from "./assets/sounds/sfx-bg-create.mp3";
import sfxBgHome from "./assets/sounds/sfx-bg-home.mp3";
import sfxBgWin from "./assets/sounds/sfx-bg-win.mp3";
import sfxKindEmoji from "./assets/sounds/sfx-kind-emoji.mp3";
import sfxNeutralEmoji from "./assets/sounds/sfx-neutral-emoji.mp3";

// Background music
let currentBg = null;

export function playBgMusic(track) {
  stopBgMusic();
  const src = { home: sfxBgHome, create: sfxBgCreate, win: sfxBgWin }[track];
  if (!src) return;
  currentBg = new Audio(src);
  currentBg.loop = true;
  currentBg.volume = 0.3;
  currentBg.play().catch(() => {});
}

export function stopBgMusic() {
  if (currentBg) {
    currentBg.pause();
    currentBg.currentTime = 0;
    currentBg = null;
  }
}

// Sound effects (one-shot)
function playSfx(src, volume = 0.5) {
  const a = new Audio(src);
  a.volume = volume;
  a.play().catch(() => {});
}

// === Web Audio for remaining placeholder sounds ===
let audioCtx = null;

function getCtx() {
  if (!audioCtx)
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playTone(
  freq,
  duration,
  type = "sine",
  volume = 0.3,
  rampDown = true,
) {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    if (rampDown)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}

// === GAME SOUNDS ===

// Real sounds
export function playKind() {
  playSfx(sfxKindEmoji, 0.5);
}
export function playMean() {
  playSfx(sfxBadEmoji, 0.5);
}
export function playNeutral() {
  playSfx(sfxNeutralEmoji, 0.4);
}

// Placeholder sounds (Web Audio)
export function playTick() {
  playTone(1000, 0.05, "square", 0.1);
}

export function playTimeUp() {
  playTone(600, 0.15, "sine", 0.2);
  setTimeout(() => playTone(400, 0.15, "sine", 0.2), 100);
  setTimeout(() => playTone(250, 0.25, "sine", 0.2), 200);
}

export function playWin() {
  const notes = [523, 659, 784, 1047];
  notes.forEach((n, i) => {
    setTimeout(() => playTone(n, 0.2, "sine", 0.25), i * 120);
  });
}

export function playLose() {
  playTone(400, 0.2, "sine", 0.2);
  setTimeout(() => playTone(350, 0.2, "sine", 0.2), 150);
  setTimeout(() => playTone(280, 0.3, "sine", 0.2), 300);
}

export function playDraw() {
  playTone(440, 0.3, "sine", 0.2);
  playTone(554, 0.3, "sine", 0.15);
  playTone(659, 0.3, "sine", 0.15);
}

export function playClick() {
  playTone(660, 0.06, "sine", 0.15);
}

export function playSelect() {
  playTone(440, 0.1, "sine", 0.2);
  setTimeout(() => playTone(660, 0.15, "sine", 0.2), 80);
}

export function playGameStart() {
  const notes = [262, 330, 392, 523];
  notes.forEach((n, i) => {
    setTimeout(() => playTone(n, 0.15, "sine", 0.2), i * 100);
  });
}

export function playWhoosh() {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {}
}
