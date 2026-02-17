import { useState, useEffect, useCallback, useRef } from "react";

const SPEED_MULTIPLIERS = [0.25, 0.45, 0.7, 1.0];

const LEVELS = [
  { name: "Disco Party", emoji: "🪩", bg: "linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #4a1a7a 100%)", wallColor: "#c084fc", wallPattern: "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.1) 8px, rgba(255,255,255,0.1) 16px)", particles: ["✨", "🪩"] },
  { name: "The Park", emoji: "🌳", bg: "linear-gradient(180deg, #87CEEB 0%, #a8d8a8 50%, #5a9e5a 100%)", wallColor: "#8B7355", wallPattern: "repeating-linear-gradient(0deg, transparent, transparent 12px, rgba(0,0,0,0.08) 12px, rgba(0,0,0,0.08) 14px)", particles: ["🌸", "🍃"] },
  { name: "The Beach", emoji: "🏖️", bg: "linear-gradient(180deg, #87CEEB 0%, #b0d4f1 40%, #f5deb3 70%, #d2b48c 100%)", wallColor: "#DEB887", wallPattern: "repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(210,180,140,0.3) 6px, rgba(210,180,140,0.3) 8px)", particles: ["🐚", "🌊"] },
  { name: "Playground", emoji: "🎠", bg: "linear-gradient(180deg, #87CEEB 0%, #b3d9f7 40%, #f5e6d0 70%, #e8d5b7 100%)", wallColor: "#FF7043", wallPattern: "repeating-linear-gradient(45deg, #FF7043, #FF7043 10px, #FF8A65 10px, #FF8A65 20px)", particles: ["🎈", "🎠"] },
];

const KIND_EMOJIS = ["❤️", "🌟", "🤗", "💖", "😊", "🥰", "💕", "✨", "🌈", "💝", "😇", "🫶"];
const MEAN_EMOJIS = ["😡", "👎", "💢", "😤", "🙄", "😒", "💔", "👊"];
const NEUTRAL_EMOJIS = ["😐", "🔵", "🟡", "⚪", "🫥", "😶", "🤷", "💭"];
const TURN_TIME = 10;
const WIN_SCORE = 10;

function generateEmojis(levelIndex) {
  const speed = SPEED_MULTIPLIERS[levelIndex] || 0.25;
  const emojis = [];
  const kindCount = 3;
  const meanCount = Math.floor(Math.random() * 3) + 2;
  const neutralCount = 10 - kindCount - meanCount;
  const make = (i, emoji, type, base) => {
    const a = Math.random() * Math.PI * 2;
    return { id: i, emoji, type, x: Math.random() * 65 + 12, y: Math.random() * 50 + 22, dx: Math.cos(a) * base * speed, dy: Math.sin(a) * base * speed, size: Math.random() * 10 + 30, rotation: 0, rotSpeed: (Math.random() - 0.5) * 1.5 * speed };
  };
  let idx = 0;
  for (let i = 0; i < kindCount; i++) emojis.push(make(idx++, KIND_EMOJIS[Math.floor(Math.random() * KIND_EMOJIS.length)], "kind", 1.2));
  for (let i = 0; i < meanCount; i++) emojis.push(make(idx++, MEAN_EMOJIS[Math.floor(Math.random() * MEAN_EMOJIS.length)], "mean", 1.5));
  for (let i = 0; i < neutralCount; i++) emojis.push(make(idx++, NEUTRAL_EMOJIS[Math.floor(Math.random() * NEUTRAL_EMOJIS.length)], "neutral", 1.0));
  return emojis.sort(() => Math.random() - 0.5);
}

// ========== CHARACTERS ==========

function Gabrielle({ size = 120, celebrating = false, crying = false }) {
  return (
    <div className={celebrating ? "dancing" : ""} style={{ width: size, height: size + 30 }}>
      <svg viewBox="0 0 120 170" width={size} height={size + 30}>
        <line x1="54" y1="140" x2="51" y2="164" stroke="#C67B5C" strokeWidth="4" strokeLinecap="round" />
        <line x1="66" y1="140" x2="69" y2="164" stroke="#C67B5C" strokeWidth="4" strokeLinecap="round" />
        <path d="M60 72 Q56 74 54 80 L52 92 L46 112 L34 142 L86 142 L74 112 L68 92 L66 80 Q64 74 60 72Z" fill="white" stroke="#e8e8e8" strokeWidth="1" />
        <path d={celebrating ? "M50 80 Q36 70 28 60" : "M50 80 Q40 94 35 112"} fill="none" stroke="#C67B5C" strokeWidth="4.5" strokeLinecap="round" />
        <path d={celebrating ? "M70 80 Q84 70 92 60" : "M70 80 Q80 94 85 112"} fill="none" stroke="#C67B5C" strokeWidth="4.5" strokeLinecap="round" />
        <rect x="57" y="62" width="6" height="11" rx="3" fill="#C67B5C" />
        <ellipse cx="60" cy="46" rx="19" ry="20" fill="#C67B5C" />
        <ellipse cx="38" cy="28" rx="16" ry="18" fill="#E74C3C" />
        <ellipse cx="35" cy="24" rx="10" ry="11" fill="#F1C40F" />
        <ellipse cx="42" cy="20" rx="8" ry="9" fill="#2ECC71" />
        <ellipse cx="33" cy="32" rx="7" ry="8" fill="#FF69B4" />
        <ellipse cx="40" cy="35" rx="6" ry="6" fill="#3498DB" />
        <ellipse cx="82" cy="28" rx="16" ry="18" fill="#3498DB" />
        <ellipse cx="85" cy="24" rx="10" ry="11" fill="#FF69B4" />
        <ellipse cx="78" cy="20" rx="8" ry="9" fill="#E74C3C" />
        <ellipse cx="87" cy="32" rx="7" ry="8" fill="#F1C40F" />
        <ellipse cx="80" cy="35" rx="6" ry="6" fill="#2ECC71" />
        <ellipse cx="60" cy="30" rx="22" ry="10" fill="#2C1810" />
        <ellipse cx="60" cy="30" rx="20" ry="8" fill="#3a2218" />
        <circle cx="48" cy="35" r="3.5" fill="#E74C3C" />
        <circle cx="47" cy="40.5" r="3" fill="#F1C40F" />
        <circle cx="48" cy="45.5" r="2.8" fill="#2ECC71" />
        <circle cx="47" cy="50" r="2.5" fill="#FF69B4" />
        <circle cx="72" cy="35" r="3.5" fill="#3498DB" />
        <circle cx="73" cy="40.5" r="3" fill="#E74C3C" />
        <circle cx="72" cy="45.5" r="2.8" fill="#F1C40F" />
        <circle cx="73" cy="50" r="2.5" fill="#2ECC71" />
        {crying ? (
          <>
            <path d="M50 44 Q53 47 56 44" fill="none" stroke="#2C1810" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M64 44 Q67 47 70 44" fill="none" stroke="#2C1810" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M55 58 Q60 54 65 58" fill="none" stroke="#2C1810" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="52" y1="49" x2="50" y2="56" stroke="#5BC0EB" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="68" y1="49" x2="70" y2="56" stroke="#5BC0EB" strokeWidth="1.5" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="53" cy="46" r="2.5" fill="#2C1810" />
            <circle cx="67" cy="46" r="2.5" fill="#2C1810" />
            <path d={celebrating ? "M53 55 Q60 64 67 55" : "M55 56 Q60 62 65 56"} fill="none" stroke="#2C1810" strokeWidth="1.8" strokeLinecap="round" />
          </>
        )}
        <circle cx="47" cy="52" r="3.5" fill="rgba(255,150,150,0.4)" />
        <circle cx="73" cy="52" r="3.5" fill="rgba(255,150,150,0.4)" />
      </svg>
    </div>
  );
}

function Marcie({ size = 120, celebrating = false, crying = false }) {
  return (
    <div className={celebrating ? "dancing" : ""} style={{ width: size, height: size + 30 }}>
      <svg viewBox="0 0 120 170" width={size} height={size + 30}>
        <line x1="54" y1="142" x2="52" y2="162" stroke="#C67B5C" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="66" y1="142" x2="68" y2="162" stroke="#C67B5C" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M60 82 Q55 84 53 90 L50 102 L45 118 L36 148 L84 148 L75 118 L70 102 L67 90 Q65 84 60 82Z" fill="#F4D03F" stroke="#e6c235" strokeWidth="1" />
        <path d={celebrating ? "M50 90 Q38 80 30 70" : "M50 90 Q41 102 37 114"} fill="none" stroke="#C67B5C" strokeWidth="4.5" strokeLinecap="round" />
        <path d={celebrating ? "M70 90 Q82 80 90 70" : "M70 90 Q79 102 83 114"} fill="none" stroke="#C67B5C" strokeWidth="4.5" strokeLinecap="round" />
        <rect x="57" y="74" width="6" height="9" rx="3" fill="#C67B5C" />
        <circle cx="60" cy="54" r="22" fill="#C67B5C" />
        <circle cx="44" cy="36" r="9" fill="#1a1008" />
        <circle cx="42" cy="32" r="6.5" fill="#2C1810" />
        <circle cx="48" cy="30" r="5.5" fill="#1a1008" />
        <circle cx="76" cy="36" r="9" fill="#1a1008" />
        <circle cx="78" cy="32" r="6.5" fill="#2C1810" />
        <circle cx="72" cy="30" r="5.5" fill="#1a1008" />
        <circle cx="54" cy="30" r="6.5" fill="#2C1810" />
        <circle cx="60" cy="28" r="7.5" fill="#1a1008" />
        <circle cx="66" cy="30" r="6.5" fill="#2C1810" />
        <circle cx="50" cy="34" r="4.5" fill="#1a1008" />
        <circle cx="70" cy="34" r="4.5" fill="#1a1008" />
        {crying ? (
          <>
            <path d="M50 50 Q53 53 56 50" fill="none" stroke="#2C1810" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M64 50 Q67 53 70 50" fill="none" stroke="#2C1810" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M54 62 Q60 58 66 62" fill="none" stroke="#2C1810" strokeWidth="2" strokeLinecap="round" />
            <line x1="52" y1="55" x2="50" y2="62" stroke="#5BC0EB" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="68" y1="55" x2="70" y2="62" stroke="#5BC0EB" strokeWidth="1.5" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="52" cy="52" r="2.8" fill="#2C1810" />
            <circle cx="68" cy="52" r="2.8" fill="#2C1810" />
            <path d={celebrating ? "M54 62 Q60 70 66 62" : "M54 62 Q60 68 66 62"} fill="none" stroke="#2C1810" strokeWidth="2" strokeLinecap="round" />
          </>
        )}
        <circle cx="45" cy="58" r="4" fill="rgba(255,150,150,0.4)" />
        <circle cx="75" cy="58" r="4" fill="rgba(255,150,150,0.4)" />
      </svg>
    </div>
  );
}

function Dada({ size = 120, celebrating = false, crying = false }) {
  const skin = "#572000";
  return (
    <div className={celebrating ? "dancing" : ""} style={{ width: size, height: size + 30 }}>
      <svg viewBox="0 0 120 170" width={size} height={size + 30}>
        <line x1="53" y1="132" x2="50" y2="162" stroke={skin} strokeWidth="5" strokeLinecap="round" />
        <line x1="67" y1="132" x2="70" y2="162" stroke={skin} strokeWidth="5" strokeLinecap="round" />
        <path d="M60 108 Q50 110 46 118 L44 134 L56 134 L60 120 L64 134 L76 134 L74 118 Q70 110 60 108Z" fill="#1a1a1a" stroke="#111" strokeWidth="0.5" />
        <path d="M60 68 Q52 70 48 78 L46 92 L44 108 L76 108 L74 92 L72 78 Q68 70 60 68Z" fill="#2980B9" stroke="#2471a3" strokeWidth="0.5" />
        <path d={celebrating ? "M48 76 Q34 66 26 56" : "M48 76 Q38 90 34 108"} fill="none" stroke={skin} strokeWidth="5" strokeLinecap="round" />
        <path d={celebrating ? "M72 76 Q86 66 94 56" : "M72 76 Q82 90 86 108"} fill="none" stroke={skin} strokeWidth="5" strokeLinecap="round" />
        <rect x="56" y="60" width="8" height="10" rx="3" fill={skin} />
        <ellipse cx="60" cy="42" rx="20" ry="22" fill={skin} />
        <ellipse cx="60" cy="24" rx="20" ry="8" fill="#111" />
        <ellipse cx="60" cy="26" rx="18" ry="6" fill="#1a1a1a" />
        <path d="M40 30 Q37 45 35 62 Q34 72 36 80" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M43 28 Q41 44 40 60 Q39 72 40 82" stroke="#1a1a1a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M46 27 Q44 42 43 56 Q42 68 43 78" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M80 30 Q83 45 85 62 Q86 72 84 80" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M77 28 Q79 44 80 60 Q81 72 80 82" stroke="#1a1a1a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M74 27 Q76 42 77 56 Q78 68 77 78" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M48 29 Q46 48 45 66 Q44 76 46 84" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M72 29 Q74 48 75 66 Q76 76 74 84" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
        {crying ? (
          <>
            <path d="M49 40 Q52 43 55 40" fill="none" stroke="#1a1008" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M65 40 Q68 43 71 40" fill="none" stroke="#1a1008" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M54 52 Q60 48 66 52" fill="none" stroke="#1a1008" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="52" y1="45" x2="50" y2="52" stroke="#5BC0EB" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="68" y1="45" x2="70" y2="52" stroke="#5BC0EB" strokeWidth="1.5" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="52" cy="42" r="2.5" fill="#1a1008" />
            <circle cx="68" cy="42" r="2.5" fill="#1a1008" />
            <path d={celebrating ? "M54 52 Q60 59 66 52" : "M54 52 Q60 57 66 52"} fill="none" stroke="#1a1008" strokeWidth="1.8" strokeLinecap="round" />
          </>
        )}
      </svg>
    </div>
  );
}

function Mama({ size = 120, celebrating = false, crying = false }) {
  const skin = "#F0D0B4";
  return (
    <div className={celebrating ? "dancing" : ""} style={{ width: size, height: size + 30 }}>
      <svg viewBox="0 0 120 170" width={size} height={size + 30}>
        {/* Legs peeking out under gown */}
        <line x1="52" y1="148" x2="50" y2="162" stroke={skin} strokeWidth="4" strokeLinecap="round" />
        <line x1="68" y1="148" x2="70" y2="162" stroke={skin} strokeWidth="4" strokeLinecap="round" />
        <path d="M60 70 Q54 72 50 80 L46 95 L38 115 L26 150 L94 150 L82 115 L74 95 L70 80 Q66 72 60 70Z" fill="#8E44AD" stroke="#7D3C98" strokeWidth="1" />
        <path d="M60 80 Q56 90 50 110 L44 135" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="6" strokeLinecap="round" />
        <path d={celebrating ? "M48 78 Q34 68 26 58" : "M48 78 Q38 92 34 110"} fill="none" stroke={skin} strokeWidth="4.5" strokeLinecap="round" />
        <path d={celebrating ? "M72 78 Q86 68 94 58" : "M72 78 Q82 92 86 110"} fill="none" stroke={skin} strokeWidth="4.5" strokeLinecap="round" />
        <rect x="57" y="62" width="6" height="10" rx="3" fill={skin} />
        <ellipse cx="60" cy="44" rx="19" ry="21" fill={skin} />
        {/* Hair - shoulder length, 1c-2a wavy dark brown, flatter top */}
        <path d="M39 42 Q38 26 47 18 Q54 13 60 16 Q66 13 73 18 Q82 26 81 42" fill="#3B2314" />
        {/* Shoulder-length strands left */}
        <path d="M38 42 Q35 54 34 66 Q33 74 34 80" stroke="#3B2314" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M40 42 Q38 55 37 68 Q36 76 37 82" stroke="#4a2e1a" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* Shoulder-length strands right */}
        <path d="M82 42 Q85 54 86 66 Q87 74 86 80" stroke="#3B2314" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M80 42 Q82 55 83 68 Q84 76 83 82" stroke="#4a2e1a" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M45 12 Q52 6 58 10" fill="none" stroke="#5a3d24" strokeWidth="2" />
        <path d="M62 10 Q68 6 75 12" fill="none" stroke="#5a3d24" strokeWidth="2" />
        {crying ? (
          <>
            <path d="M49 45 Q52 48 55 45" fill="none" stroke="#3B2314" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M65 45 Q68 48 71 45" fill="none" stroke="#3B2314" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M54 57 Q60 53 66 57" fill="none" stroke="#3B2314" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="52" y1="50" x2="50" y2="57" stroke="#5BC0EB" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="68" y1="50" x2="70" y2="57" stroke="#5BC0EB" strokeWidth="1.5" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="52" cy="47" r="2.5" fill="#3B2314" />
            <circle cx="68" cy="47" r="2.5" fill="#3B2314" />
            <path d={celebrating ? "M54 57 Q60 65 66 57" : "M54 57 Q60 63 66 57"} fill="none" stroke="#3B2314" strokeWidth="1.8" strokeLinecap="round" />
          </>
        )}
        <circle cx="45" cy="53" r="3.5" fill="rgba(210,150,150,0.3)" />
        <circle cx="75" cy="53" r="3.5" fill="rgba(210,150,150,0.3)" />
      </svg>
    </div>
  );
}

const CHARACTERS = [
  { id: "gabrielle", name: "Gabrielle", Component: Gabrielle, color: "#FF69B4" },
  { id: "marcie", name: "Marcie", Component: Marcie, color: "#F4D03F" },
  { id: "dada", name: "Dada", Component: Dada, color: "#2980B9" },
  { id: "mama", name: "Mama", Component: Mama, color: "#8E44AD" },
];

// ========== UI ==========

function FloatingParticle({ emoji, delayVal, leftVal, topVal }) {
  return <div style={{ position: "absolute", fontSize: "18px", opacity: 0.25, animation: `floatParticle 10s ease-in-out ${delayVal}s infinite`, left: `${leftVal}%`, top: `${topVal}%`, pointerEvents: "none" }}>{emoji}</div>;
}
function EmojiSprite({ emoji, onClick, disabled }) {
  return (
    <div onClick={() => !disabled && onClick(emoji.id)} style={{ position: "absolute", left: `${emoji.x}%`, top: `${emoji.y}%`, fontSize: `${emoji.size}px`, transform: `rotate(${emoji.rotation}deg)`, cursor: disabled ? "default" : "pointer", userSelect: "none", filter: disabled ? "grayscale(0.5) opacity(0.5)" : "none", zIndex: 10 }}>
      <span style={{ display: "inline-block", animation: `wobble 3s ease-in-out infinite ${emoji.id * 0.3}s` }}>{emoji.emoji}</span>
    </div>
  );
}
function FlyingEmoji({ emoji, fromSide }) {
  return <div style={{ position: "fixed", left: fromSide === "left" ? "20%" : "80%", top: "40%", fontSize: "48px", zIndex: 1000, pointerEvents: "none", animation: `flyOver${fromSide === "left" ? "Right" : "Left"} 1s ease-out forwards` }}>{emoji}</div>;
}
function ScoreBar({ score, maxScore, color, name }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 3, textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}><span>{name}</span><span>{score}/{maxScore}</span></div>
      <div style={{ height: 14, background: "rgba(255,255,255,0.2)", borderRadius: 7, overflow: "hidden", border: "1px solid rgba(255,255,255,0.3)" }}>
        <div style={{ height: "100%", width: `${Math.max(0, Math.min(100, (score / maxScore) * 100))}%`, background: color, borderRadius: 7, transition: "width 0.5s ease", boxShadow: `0 0 10px ${color}80` }} />
      </div>
    </div>
  );
}
function TimerBar({ timeLeft, maxTime }) {
  const pct = (timeLeft / maxTime) * 100;
  const color = timeLeft <= 3 ? "#f44336" : timeLeft <= 5 ? "#FF9800" : "#4CAF50";
  return (
    <div style={{ width: "100%", maxWidth: 200, margin: "4px auto 0" }}>
      <div style={{ height: 8, background: "rgba(255,255,255,0.15)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4, transition: "width 1s linear, background 0.3s", boxShadow: timeLeft <= 3 ? `0 0 12px ${color}` : "none" }} />
      </div>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 700, marginTop: 2, color: timeLeft <= 3 ? "#f44336" : "#fff", fontFamily: "'Fredoka', sans-serif", animation: timeLeft <= 3 ? "pulse 0.5s ease-in-out infinite" : "none" }}>⏱ {timeLeft}s</div>
    </div>
  );
}

const PARTICLE_POS = [{ left: 20, top: 25, delay: 0 }, { left: 55, top: 60, delay: 3 }, { left: 80, top: 30, delay: 6 }];

const GLOBAL_STYLES = `
  @keyframes floatParticle { 0%, 100% { transform: translateY(0); opacity: 0.25; } 50% { transform: translateY(-20px); opacity: 0.35; } }
  @keyframes wobble { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
  @keyframes flyOverRight { 0% { transform: translateX(0) translateY(0) scale(1); opacity: 1; } 100% { transform: translateX(250px) translateY(-150px) scale(0.3); opacity: 0; } }
  @keyframes flyOverLeft { 0% { transform: translateX(0) translateY(0) scale(1); opacity: 1; } 100% { transform: translateX(-250px) translateY(-150px) scale(0.3); opacity: 0; } }
  @keyframes dancing {
    0% { transform: translateY(0) rotate(0deg); }
    15% { transform: translateY(-12px) rotate(-8deg); }
    30% { transform: translateY(0) rotate(0deg); }
    45% { transform: translateY(-12px) rotate(8deg); }
    60% { transform: translateY(0) rotate(0deg); }
    75% { transform: translateY(-8px) rotate(-5deg); }
    100% { transform: translateY(0) rotate(0deg); }
  }
  .dancing { animation: dancing 0.8s ease-in-out infinite; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }
  @keyframes titlePulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
  @keyframes confetti { 0% { transform: translateY(-10px) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  @keyframes tearDrop { 0% { opacity: 0; transform: translateY(0); } 50% { opacity: 1; } 100% { opacity: 0; transform: translateY(8px); } }
`;

const FONT_LINK = "https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap";

export default function KindEmojisBattle() {
  const [gameState, setGameState] = useState("title");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  // Round tracking: each round = P1 turn + P2 turn. P1 always goes first in a round.
  const [roundP1Done, setRoundP1Done] = useState(false);
  const [roundP1Score, setRoundP1Score] = useState(0); // P1's turn score this round
  const [p1Scores, setP1Scores] = useState(0);
  const [p2Scores, setP2Scores] = useState(0);
  const [emojis, setEmojis] = useState([]);
  const [selected, setSelected] = useState([]);
  const [turnScore, setTurnScore] = useState(null);
  const [flyingEmojis, setFlyingEmojis] = useState([]);
  const [p1LevelsWon, setP1LevelsWon] = useState(0);
  const [p2LevelsWon, setP2LevelsWon] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TURN_TIME);
  const [paused, setPaused] = useState(false);
  const [turnEnded, setTurnEnded] = useState(false);
  const [p1Char, setP1Char] = useState(null);
  const [p2Char, setP2Char] = useState(null);
  const [selectingPlayer, setSelectingPlayer] = useState(1);
  const [levelWinner, setLevelWinner] = useState(null); // 1, 2, or "draw"

  const animFrameRef = useRef(null);
  const emojisRef = useRef([]);
  const timerRef = useRef(null);
  const selectedRef = useRef([]);
  const turnEndedRef = useRef(false);

  const p1Data = CHARACTERS.find((c) => c.id === p1Char);
  const p2Data = CHARACTERS.find((c) => c.id === p2Char);
  const level = LEVELS[currentLevel];
  const currentCharData = currentPlayer === 1 ? p1Data : p2Data;
  const playerName = currentCharData?.name || "Player";
  const playerColor = currentCharData?.color || "#FF69B4";

  useEffect(() => { selectedRef.current = selected; }, [selected]);
  useEffect(() => { turnEndedRef.current = turnEnded; }, [turnEnded]);

  const calcScore = (selIds) => {
    let s = 0;
    selIds.forEach((sid) => {
      const e = emojisRef.current.find((em) => em.id === sid);
      if (e) { if (e.type === "kind") s += 1; else if (e.type === "mean") s -= 1; }
    });
    return s;
  };

  const endTurn = useCallback((finalSelected) => {
    if (turnEndedRef.current) return;
    setTurnEnded(true);
    turnEndedRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);

    const ts = calcScore(finalSelected);
    finalSelected.forEach((sid) => {
      const se = emojisRef.current.find((e) => e.id === sid);
      if (se && se.type === "kind") {
        setFlyingEmojis((prev) => [...prev, { id: Date.now() + Math.random(), emoji: se.emoji, fromSide: currentPlayer === 1 ? "left" : "right" }]);
      }
    });
    setTimeout(() => setFlyingEmojis([]), 1200);

    setTimeout(() => {
      setTurnScore(ts);
      if (currentPlayer === 1) {
        setP1Scores((prev) => Math.max(0, prev + ts));
      } else {
        setP2Scores((prev) => Math.max(0, prev + ts));
      }
      setGameState("turnResult");
    }, 400);
  }, [currentPlayer]);

  const initTurn = (lvl) => {
    setSelected([]);
    selectedRef.current = [];
    setTurnScore(null);
    setTimeLeft(TURN_TIME);
    setTurnEnded(false);
    turnEndedRef.current = false;
    const ne = generateEmojis(lvl);
    setEmojis(ne);
    emojisRef.current = ne;
    setGameState("playing");
  };

  const startGame = () => {
    setSelectingPlayer(1);
    setP1Char(null);
    setP2Char(null);
    setGameState("charSelect");
  };

  const selectCharacter = (charId) => {
    if (selectingPlayer === 1) {
      setP1Char(charId);
      setSelectingPlayer(2);
    } else {
      setP2Char(charId);
      setCurrentLevel(0);
      setCurrentPlayer(1);
      setP1Scores(0);
      setP2Scores(0);
      setP1LevelsWon(0);
      setP2LevelsWon(0);
      setRoundP1Done(false);
      setRoundP1Score(0);
      setLevelWinner(null);
      setPaused(false);
      setTimeout(() => initTurn(0), 50);
    }
  };

  const endGame = () => {
    setPaused(false);
    setGameState("title");
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const togglePause = () => setPaused((p) => !p);

  // Timer
  useEffect(() => {
    if (gameState !== "playing" || paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => { if (t <= 1) { clearInterval(timerRef.current); return 0; } return t - 1; });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameState, paused]);

  // Time up
  useEffect(() => {
    if (timeLeft === 0 && gameState === "playing" && !turnEndedRef.current) {
      endTurn([...selectedRef.current]);
    }
  }, [timeLeft, gameState, endTurn]);

  // Animate
  useEffect(() => {
    if (gameState !== "playing" || paused) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }
    let lastTime = performance.now();
    const animate = (time) => {
      const dt = Math.min((time - lastTime) / 16, 3);
      lastTime = time;
      emojisRef.current = emojisRef.current.map((e) => {
        let nx = e.x + e.dx * dt, ny = e.y + e.dy * dt, ndx = e.dx, ndy = e.dy;
        if (nx < 2 || nx > 88) ndx = -ndx;
        if (ny < 5 || ny > 75) ndy = -ndy;
        return { ...e, x: Math.max(2, Math.min(88, nx)), y: Math.max(5, Math.min(75, ny)), dx: ndx, dy: ndy, rotation: e.rotation + e.rotSpeed * dt };
      });
      setEmojis([...emojisRef.current]);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [gameState, paused]);

  const handleEmojiClick = useCallback((id) => {
    if (turnEndedRef.current || paused) return;
    if (selectedRef.current.length >= 3) return;
    if (selectedRef.current.includes(id)) return;
    const emoji = emojisRef.current.find((e) => e.id === id);
    if (!emoji) return;
    const newSelected = [...selectedRef.current, id];
    setSelected(newSelected);
    selectedRef.current = newSelected;
    if (emoji.type === "kind") {
      setFlyingEmojis((prev) => [...prev, { id: Date.now() + Math.random(), emoji: emoji.emoji, fromSide: currentPlayer === 1 ? "left" : "right" }]);
      setTimeout(() => setFlyingEmojis((prev) => prev.slice(1)), 1200);
    }
    // Check if player just hit WIN_SCORE with this pick - end turn early
    const runningScore = calcScore(newSelected);
    const currentTotal = currentPlayer === 1 ? p1Scores : p2Scores;
    if (Math.max(0, currentTotal + runningScore) >= WIN_SCORE) {
      endTurn(newSelected);
      return;
    }
    if (newSelected.length === 3) endTurn(newSelected);
  }, [currentPlayer, paused, endTurn, p1Scores, p2Scores]);

  // ROUND LOGIC: P1 goes first, then P2. After both go, check for level win.
  const nextTurn = () => {
    // Read the already-updated scores from state
    // We need to compute what scores will be after this render
    const ts = turnScore || 0;

    if (currentPlayer === 1) {
      // P1 just finished their turn. P2 still needs to go.
      setRoundP1Done(true);
      setRoundP1Score(ts);
      setCurrentPlayer(2);
      initTurn(currentLevel);
    } else {
      // P2 just finished. Round is complete. Now check scores.
      // p1Scores and p2Scores are already updated in state
      const finalP1 = p1Scores; // already includes this round's P1 score
      const finalP2 = p2Scores; // already includes this round's P2 score

      // Check: has anyone reached WIN_SCORE?
      const p1Hit = finalP1 >= WIN_SCORE;
      const p2Hit = finalP2 >= WIN_SCORE;

      if (p1Hit && p2Hit) {
        // Draw!
        setLevelWinner("draw");
        setGameState(currentLevel < LEVELS.length - 1 ? "levelWin" : "gameWin");
      } else if (p1Hit) {
        setLevelWinner(1);
        setP1LevelsWon((p) => p + 1);
        setGameState(currentLevel < LEVELS.length - 1 ? "levelWin" : "gameWin");
      } else if (p2Hit) {
        setLevelWinner(2);
        setP2LevelsWon((p) => p + 1);
        setGameState(currentLevel < LEVELS.length - 1 ? "levelWin" : "gameWin");
      } else {
        // Nobody won yet. New round, P1 goes first.
        setRoundP1Done(false);
        setRoundP1Score(0);
        setCurrentPlayer(1);
        initTurn(currentLevel);
      }
    }
  };

  const nextLevel = () => {
    const nl = currentLevel + 1;
    setCurrentLevel(nl);
    setP1Scores(0);
    setP2Scores(0);
    setCurrentPlayer(1);
    setRoundP1Done(false);
    setRoundP1Score(0);
    setLevelWinner(null);
    initTurn(nl);
  };

  const renderChar = (charData, size, cel, cry) => {
    if (!charData) return null;
    const C = charData.Component;
    return <C size={size} celebrating={cel} crying={cry} />;
  };

  // ===== CHARACTER SELECT =====
  if (gameState === "charSelect") {
    const takenChar = selectingPlayer === 2 ? p1Char : null;
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #5b6abf 0%, #6b4f9e 50%, #c77dba 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Fredoka', 'Nunito', sans-serif", overflow: "hidden" }}>
        <link href={FONT_LINK} rel="stylesheet" /><style>{GLOBAL_STYLES}</style>
        <div style={{ fontSize: "clamp(22px, 5vw, 36px)", fontWeight: 700, color: "#fff", textShadow: "0 3px 15px rgba(0,0,0,0.3)", marginBottom: 8, fontFamily: "'Fredoka', sans-serif" }}>Player {selectingPlayer}, choose your character!</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: 24, fontFamily: "'Nunito', sans-serif" }}>{selectingPlayer === 2 && p1Data ? `${p1Data.name} is taken by Player 1` : "Tap to select"}</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", maxWidth: 460, padding: "0 16px" }}>
          {CHARACTERS.map((ch) => {
            const taken = ch.id === takenChar;
            const C = ch.Component;
            return (
              <div key={ch.id} onClick={() => !taken && selectCharacter(ch.id)} style={{ textAlign: "center", padding: "14px 10px", borderRadius: 20, background: taken ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.12)", border: taken ? "2px solid rgba(255,255,255,0.1)" : `2px solid ${ch.color}60`, cursor: taken ? "not-allowed" : "pointer", opacity: taken ? 0.35 : 1, transition: "all 0.2s", minWidth: 90, flex: "0 0 auto" }}>
                <C size={72} /><div style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginTop: 4, fontFamily: "'Fredoka', sans-serif" }}>{ch.name}</div>
                {taken && <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>Taken</div>}
              </div>
            );
          })}
        </div>
        <button onClick={() => setGameState("title")} style={{ marginTop: 30, padding: "8px 24px", fontSize: 14, fontWeight: 600, fontFamily: "'Fredoka', sans-serif", background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 30, cursor: "pointer" }}>← Back</button>
      </div>
    );
  }

  // ===== TITLE =====
  if (gameState === "title") {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #5b6abf 0%, #6b4f9e 50%, #c77dba 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Fredoka', 'Nunito', sans-serif", overflow: "hidden" }}>
        <link href={FONT_LINK} rel="stylesheet" /><style>{GLOBAL_STYLES}</style>
        <div style={{ animation: "titlePulse 3s ease-in-out infinite", textAlign: "center", zIndex: 2 }}>
          <div style={{ fontSize: "clamp(36px, 7vw, 64px)", fontWeight: 800, color: "#fff", textShadow: "0 4px 20px rgba(0,0,0,0.3)", lineHeight: 1.1, marginBottom: 8, fontFamily: "'Fredoka', sans-serif" }}>Kind Emojis</div>
          <div style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, color: "#FFD700", fontFamily: "'Fredoka', sans-serif" }}>⚔️ Battle! ⚔️</div>
        </div>
        <div style={{ display: "flex", gap: 12, margin: "24px 0", zIndex: 2 }}>{CHARACTERS.map((ch) => { const C = ch.Component; return <div key={ch.id}><C size={55} /></div>; })}</div>
        <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, textAlign: "center", maxWidth: 340, marginBottom: 24, lineHeight: 1.5, fontFamily: "'Nunito', sans-serif" }}>Throw kind emojis over the wall! Pick 3 emojis each turn — kind ones earn points, mean ones lose points. First to 10 wins! ⏱ 10 seconds per turn!</div>
        <button onClick={startGame} style={{ padding: "14px 40px", fontSize: 20, fontWeight: 700, fontFamily: "'Fredoka', sans-serif", background: "linear-gradient(135deg, #FF69B4, #FF1493)", color: "#fff", border: "3px solid rgba(255,255,255,0.4)", borderRadius: 50, cursor: "pointer", boxShadow: "0 8px 30px rgba(255,105,180,0.5)", zIndex: 2 }}
          onMouseOver={(e) => e.target.style.transform = "scale(1.08)"} onMouseOut={(e) => e.target.style.transform = "scale(1)"}>Play! 🎮</button>
      </div>
    );
  }

  // ===== GAME WIN =====
  if (gameState === "gameWin") {
    const w = levelWinner;
    const winnerData = w === 1 ? p1Data : w === 2 ? p2Data : null;
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #e8c547 0%, #c77dba 50%, #5b6abf 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Fredoka', 'Nunito', sans-serif", overflow: "hidden", position: "relative" }}>
        <link href={FONT_LINK} rel="stylesheet" /><style>{GLOBAL_STYLES}</style>
        {[...Array(10)].map((_, i) => <div key={i} style={{ position: "absolute", left: `${Math.random() * 100}%`, top: "-5%", fontSize: "22px", animation: `confetti ${3 + Math.random() * 3}s linear ${Math.random() * 2}s infinite`, pointerEvents: "none" }}>{["🎉", "🎊", "⭐", "💖", "✨"][i % 5]}</div>)}
        <div style={{ fontSize: "clamp(28px, 6vw, 52px)", fontWeight: 800, color: "#fff", textShadow: "0 4px 20px rgba(0,0,0,0.3)", marginBottom: 8, fontFamily: "'Fredoka', sans-serif", zIndex: 2 }}>🏆 Game Complete! 🏆</div>
        <div style={{ display: "flex", gap: 30, margin: "20px 0", zIndex: 2 }}>
          <div style={{ textAlign: "center" }}>{renderChar(p1Data, 90, w === 1 || w === "draw", w === 2)}<div style={{ color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>{p1Data?.name}</div><div style={{ color: "#FFD700", fontWeight: 700, fontSize: 20, fontFamily: "'Fredoka', sans-serif" }}>{p1LevelsWon + (w === 1 ? 1 : 0)} 🌟</div></div>
          <div style={{ textAlign: "center" }}>{renderChar(p2Data, 90, w === 2 || w === "draw", w === 1)}<div style={{ color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>{p2Data?.name}</div><div style={{ color: "#FFD700", fontWeight: 700, fontSize: 20, fontFamily: "'Fredoka', sans-serif" }}>{p2LevelsWon + (w === 2 ? 1 : 0)} 🌟</div></div>
        </div>
        <div style={{ color: "#fff", fontSize: 18, textAlign: "center", margin: "12px 0 24px", fontFamily: "'Nunito', sans-serif", zIndex: 2, maxWidth: 320 }}>
          {w === "draw" ? "It's a draw! Both players are amazing! 🤝" : `${winnerData?.name} takes the final level! Both players spread kindness! 💕`}
        </div>
        <button onClick={() => setGameState("title")} style={{ padding: "14px 40px", fontSize: 20, fontWeight: 700, fontFamily: "'Fredoka', sans-serif", background: "linear-gradient(135deg, #FF69B4, #9B59B6)", color: "#fff", border: "3px solid rgba(255,255,255,0.4)", borderRadius: 50, cursor: "pointer", zIndex: 2 }}>Play Again! 🎮</button>
      </div>
    );
  }

  // ===== LEVEL WIN =====
  if (gameState === "levelWin") {
    const w = levelWinner;
    const winnerData = w === 1 ? p1Data : w === 2 ? p2Data : null;
    return (
      <div style={{ minHeight: "100vh", background: level.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Fredoka', 'Nunito', sans-serif", overflow: "hidden", position: "relative" }}>
        <link href={FONT_LINK} rel="stylesheet" /><style>{GLOBAL_STYLES}</style>
        {[...Array(8)].map((_, i) => <div key={i} style={{ position: "absolute", left: `${Math.random() * 100}%`, top: "-5%", fontSize: "22px", animation: `confetti ${3 + Math.random() * 3}s linear ${Math.random() * 2}s infinite`, pointerEvents: "none" }}>{["🎉", "🎊", "⭐", "💖", "✨"][i % 5]}</div>)}
        <div style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(12px)", borderRadius: 24, padding: "28px 36px", textAlign: "center", zIndex: 2, border: "2px solid rgba(255,255,255,0.2)", maxWidth: 370 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{w === "draw" ? "🤝" : "🎉"}</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#FFD700", fontFamily: "'Fredoka', sans-serif" }}>
            {w === "draw" ? "It's a Draw!" : `${winnerData?.name} wins!`}
          </div>
          <div style={{ fontSize: 16, color: "#fff", margin: "8px 0 4px", fontFamily: "'Nunito', sans-serif" }}>{level.emoji} {level.name} Complete!</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, margin: "16px 0" }}>
            <div style={{ textAlign: "center" }}>
              {renderChar(p1Data, 75, w === 1 || w === "draw", w === 2)}
              <div style={{ color: "#fff", fontSize: 13, fontFamily: "'Fredoka', sans-serif" }}>{p1Data?.name}: {p1Scores}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              {renderChar(p2Data, 75, w === 2 || w === "draw", w === 1)}
              <div style={{ color: "#fff", fontSize: 13, fontFamily: "'Fredoka', sans-serif" }}>{p2Data?.name}: {p2Scores}</div>
            </div>
          </div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, marginBottom: 8, fontFamily: "'Nunito', sans-serif" }}>Next up: {LEVELS[currentLevel + 1]?.emoji} {LEVELS[currentLevel + 1]?.name}</div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginBottom: 16, fontFamily: "'Nunito', sans-serif" }}>⚡ Emojis will move faster!</div>
          <button onClick={nextLevel} style={{ padding: "12px 36px", fontSize: 18, fontWeight: 700, fontFamily: "'Fredoka', sans-serif", background: "linear-gradient(135deg, #FF69B4, #9B59B6)", color: "#fff", border: "3px solid rgba(255,255,255,0.3)", borderRadius: 50, cursor: "pointer" }}
            onMouseOver={(e) => e.target.style.transform = "scale(1.08)"} onMouseOut={(e) => e.target.style.transform = "scale(1)"}>Next Level! →</button>
        </div>
      </div>
    );
  }

  // ===== MAIN GAME =====
  return (
    <div style={{ minHeight: "100vh", background: level.bg, fontFamily: "'Fredoka', 'Nunito', sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <link href={FONT_LINK} rel="stylesheet" /><style>{GLOBAL_STYLES}</style>
      {level.particles.map((p, i) => PARTICLE_POS.slice(0, 2).map((pos, j) => <FloatingParticle key={`${i}-${j}`} emoji={p} delayVal={pos.delay + i * 3} leftVal={pos.left + i * 10} topVal={pos.top + j * 15} />))}
      {flyingEmojis.map((fe) => <FlyingEmoji key={fe.id} emoji={fe.emoji} fromSide={fe.fromSide} />)}

      {paused && gameState === "playing" && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⏸️</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#fff", fontFamily: "'Fredoka', sans-serif", marginBottom: 24 }}>Paused</div>
          <div style={{ display: "flex", gap: 16 }}>
            <button onClick={togglePause} style={{ padding: "12px 32px", fontSize: 18, fontWeight: 700, fontFamily: "'Fredoka', sans-serif", background: "linear-gradient(135deg, #4CAF50, #2E7D32)", color: "#fff", border: "2px solid rgba(255,255,255,0.3)", borderRadius: 50, cursor: "pointer" }}>Resume ▶</button>
            <button onClick={endGame} style={{ padding: "12px 32px", fontSize: 18, fontWeight: 700, fontFamily: "'Fredoka', sans-serif", background: "linear-gradient(135deg, #f44336, #C62828)", color: "#fff", border: "2px solid rgba(255,255,255,0.3)", borderRadius: 50, cursor: "pointer" }}>End Game ✕</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(10px)", zIndex: 20, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ flex: 1, maxWidth: 150 }}><ScoreBar score={p1Scores} maxScore={WIN_SCORE} color={p1Data?.color || "#FF69B4"} name={p1Data?.name || "P1"} /></div>
        <div style={{ textAlign: "center", padding: "0 8px", flex: 1 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "'Nunito', sans-serif" }}>{level.emoji} {level.name} • Level {currentLevel + 1}/{LEVELS.length}</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: playerColor, fontFamily: "'Fredoka', sans-serif", textShadow: `0 0 15px ${playerColor}60` }}>{playerName}'s Turn</div>
          {gameState === "playing" && <TimerBar timeLeft={timeLeft} maxTime={TURN_TIME} />}
        </div>
        <div style={{ flex: 1, maxWidth: 150 }}><ScoreBar score={p2Scores} maxScore={WIN_SCORE} color={p2Data?.color || "#9B59B6"} name={p2Data?.name || "P2"} /></div>
      </div>

      {gameState === "playing" && (
        <div style={{ position: "absolute", top: 8, right: 8, zIndex: 30 }}>
          <button onClick={togglePause} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)", background: "rgba(0,0,0,0.35)", color: "#fff", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>⏸</button>
        </div>
      )}

      <div style={{ flex: 1, display: "flex", position: "relative" }}>
        <div style={{ flex: 1, position: "relative", opacity: currentPlayer === 1 ? 1 : 0.35, transition: "opacity 0.4s" }}>
          <div style={{ position: "absolute", bottom: 16, left: 16, zIndex: 5 }}>{renderChar(p1Data, 70, false, false)}</div>
        </div>
        <div style={{ width: 28, background: level.wallColor, backgroundImage: level.wallPattern, boxShadow: "0 0 20px rgba(0,0,0,0.3)", zIndex: 15, position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: -6, right: -6, height: 12, background: level.wallColor, borderRadius: "4px 4px 0 0", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }} />
        </div>
        <div style={{ flex: 1, position: "relative", opacity: currentPlayer === 2 ? 1 : 0.35, transition: "opacity 0.4s" }}>
          <div style={{ position: "absolute", bottom: 16, right: 16, zIndex: 5 }}>{renderChar(p2Data, 70, false, false)}</div>
        </div>

        {gameState === "playing" && (
          <div style={{ position: "absolute", top: 0, bottom: 0, left: currentPlayer === 1 ? 0 : "50%", width: "50%", zIndex: 10 }}>
            {emojis.filter((e) => !selected.includes(e.id)).map((emoji) => (
              <EmojiSprite key={emoji.id} emoji={emoji} onClick={handleEmojiClick} disabled={paused || turnEnded} />
            ))}
          </div>
        )}

        {gameState === "turnResult" && (
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
            <div style={{ background: "rgba(20,20,40,0.9)", borderRadius: 24, padding: "28px 36px", textAlign: "center", border: "2px solid rgba(255,255,255,0.2)", animation: "slideUp 0.4s ease-out", maxWidth: 340 }}>
              <div style={{ fontSize: 16, color: playerColor, fontWeight: 700, fontFamily: "'Fredoka', sans-serif", marginBottom: 12 }}>{playerName}'s picks{selected.length < 3 ? " ⏱ (time's up!)" : ""}:</div>
              {selected.length === 0 ? (
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 16, fontFamily: "'Nunito', sans-serif" }}>No emojis selected!</div>
              ) : (
                <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                  {selected.map((sid) => {
                    const se = emojisRef.current.find((e) => e.id === sid);
                    if (!se) return null;
                    return (
                      <div key={sid} style={{ fontSize: 36, padding: "8px 12px", borderRadius: 16, background: se.type === "kind" ? "rgba(76,175,80,0.25)" : se.type === "mean" ? "rgba(244,67,54,0.25)" : "rgba(158,158,158,0.2)", border: `2px solid ${se.type === "kind" ? "#4CAF50" : se.type === "mean" ? "#f44336" : "#9e9e9e"}` }}>
                        {se.emoji}<div style={{ fontSize: 10, color: se.type === "kind" ? "#81C784" : se.type === "mean" ? "#EF5350" : "#BDBDBD", fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>{se.type === "kind" ? "+1" : se.type === "mean" ? "-1" : "+0"}</div>
                      </div>
                    );
                  })}
                </div>
              )}
              <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "'Fredoka', sans-serif", color: turnScore > 0 ? "#4CAF50" : turnScore < 0 ? "#f44336" : "#FFD700", marginBottom: 16, animation: turnScore < 0 ? "shake 0.5s ease-in-out" : "none" }}>
                {turnScore > 0 ? `+${turnScore} Points! 🎉` : turnScore < 0 ? `${turnScore} Points 😔` : "0 Points 🤷"}
              </div>
              {turnScore > 0 && <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginBottom: 12, fontFamily: "'Nunito', sans-serif" }}>Kind emojis fly over the wall! 💕</div>}
              <button onClick={nextTurn} style={{ padding: "10px 32px", fontSize: 16, fontWeight: 700, fontFamily: "'Fredoka', sans-serif", background: `linear-gradient(135deg, ${playerColor}, ${playerColor}cc)`, color: "#fff", border: "2px solid rgba(255,255,255,0.3)", borderRadius: 50, cursor: "pointer" }}
                onMouseOver={(e) => e.target.style.transform = "scale(1.08)"} onMouseOut={(e) => e.target.style.transform = "scale(1)"}>
                {currentPlayer === 1 ? `${p2Data?.name}'s Turn →` : "End Round →"}
              </button>
            </div>
          </div>
        )}
      </div>

      {gameState === "playing" && (
        <div style={{ padding: "10px 16px", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(10px)", textAlign: "center", zIndex: 20, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>Tap 3 emojis! Pick the kind ones 💖 — {3 - selected.length} left</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 6, fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "'Nunito', sans-serif" }}><span>❤️ Kind = +1</span><span>😐 Neutral = 0</span><span>😡 Mean = -1</span></div>
        </div>
      )}
    </div>
  );
}
