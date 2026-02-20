// Placeholder sounds using Web Audio API
// Replace these with real audio files later by importing mp3s:
//   import popFile from './assets/sounds/pop.mp3'
//   and using: new Audio(popFile).play()

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
  } catch (e) {
    // Audio not available, fail silently
  }
}

// === GAME SOUNDS ===

// Tapping an emoji - short pop
export function playTap() {
  playTone(880, 0.08, "sine", 0.2);
}

// Picking a kind emoji - happy ascending chime
export function playKind() {
  playTone(523, 0.1, "sine", 0.25);
  setTimeout(() => playTone(659, 0.1, "sine", 0.25), 60);
  setTimeout(() => playTone(784, 0.15, "sine", 0.25), 120);
}

// Picking a mean emoji - low buzz
export function playMean() {
  playTone(150, 0.2, "sawtooth", 0.15);
}

// Picking a neutral emoji - soft blip
export function playNeutral() {
  playTone(440, 0.1, "triangle", 0.15);
}

// Timer warning (last 3 seconds) - tick
export function playTick() {
  playTone(1000, 0.05, "square", 0.1);
}

// Time's up - descending tone
export function playTimeUp() {
  playTone(600, 0.15, "sine", 0.2);
  setTimeout(() => playTone(400, 0.15, "sine", 0.2), 100);
  setTimeout(() => playTone(250, 0.25, "sine", 0.2), 200);
}

// Level win - fanfare
export function playWin() {
  const notes = [523, 659, 784, 1047];
  notes.forEach((n, i) => {
    setTimeout(() => playTone(n, 0.2, "sine", 0.25), i * 120);
  });
}

// Level lose - sad descending
export function playLose() {
  playTone(400, 0.2, "sine", 0.2);
  setTimeout(() => playTone(350, 0.2, "sine", 0.2), 150);
  setTimeout(() => playTone(280, 0.3, "sine", 0.2), 300);
}

// Draw - neutral chords
export function playDraw() {
  playTone(440, 0.3, "sine", 0.2);
  playTone(554, 0.3, "sine", 0.15);
  playTone(659, 0.3, "sine", 0.15);
}

// Button press - UI click
export function playClick() {
  playTone(660, 0.06, "sine", 0.15);
}

// Character select - confirmation
export function playSelect() {
  playTone(440, 0.1, "sine", 0.2);
  setTimeout(() => playTone(660, 0.15, "sine", 0.2), 80);
}

// Game start
export function playGameStart() {
  const notes = [262, 330, 392, 523];
  notes.forEach((n, i) => {
    setTimeout(() => playTone(n, 0.15, "sine", 0.2), i * 100);
  });
}

// Emoji flies over wall - whoosh
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
