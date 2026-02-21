import { useState, useEffect, useCallback, useRef } from "react";
import CustomCharacter, {
  DEFAULT_CONFIG,
  SKIN_TONES,
  HAIR_COLORS,
  HAIR_STYLES,
  OUTFIT_STYLES,
  OUTFIT_COLORS,
  ACCESSORIES,
} from "./CustomCharacter.jsx";
import {
  playKind,
  playMean,
  playNeutral,
  playTick,
  playTimeUp,
  playWin,
  playDraw,
  playClick,
  playSelect,
  playGameStart,
  playWhoosh,
} from "./sounds.js";

const SPEED_MULTIPLIERS = [0.25, 0.4, 0.6, 0.8, 1.0];
const LEVELS = [
  {
    name: "Disco Party",
    emoji: "🪩",
    bg: "linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #4a1a7a 100%)",
    wallColor: "#c084fc",
    wallPattern:
      "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.1) 8px, rgba(255,255,255,0.1) 16px)",
    particles: ["✨", "🪩"],
  },
  {
    name: "The Park",
    emoji: "🌳",
    bg: "linear-gradient(180deg, #87CEEB 0%, #a8d8a8 50%, #5a9e5a 100%)",
    wallColor: "#8B7355",
    wallPattern:
      "repeating-linear-gradient(0deg, transparent, transparent 12px, rgba(0,0,0,0.08) 12px, rgba(0,0,0,0.08) 14px)",
    particles: ["🌸", "🍃"],
  },
  {
    name: "The Beach",
    emoji: "🏖️",
    bg: "linear-gradient(180deg, #87CEEB 0%, #b0d4f1 40%, #f5deb3 70%, #d2b48c 100%)",
    wallColor: "#DEB887",
    wallPattern:
      "repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(210,180,140,0.3) 6px, rgba(210,180,140,0.3) 8px)",
    particles: ["🐚", "🌊"],
  },
  {
    name: "Playground",
    emoji: "🎠",
    bg: "linear-gradient(180deg, #87CEEB 0%, #b3d9f7 40%, #f5e6d0 70%, #e8d5b7 100%)",
    wallColor: "#FF7043",
    wallPattern:
      "repeating-linear-gradient(45deg, #FF7043, #FF7043 10px, #FF8A65 10px, #FF8A65 20px)",
    particles: ["🎈", "🎠"],
  },
  {
    name: "Space Station",
    emoji: "🚀",
    bg: "linear-gradient(180deg, #0a0a2e 0%, #1a1a4e 40%, #2d1b69 70%, #0a0a2e 100%)",
    wallColor: "#4a90d9",
    wallPattern:
      "repeating-linear-gradient(0deg, transparent, transparent 6px, rgba(74,144,217,0.2) 6px, rgba(74,144,217,0.2) 8px)",
    particles: ["⭐", "🚀"],
  },
];
const KIND_EMOJIS = [
  "❤️",
  "🌟",
  "🤗",
  "💖",
  "😊",
  "🥰",
  "💕",
  "✨",
  "🌈",
  "💝",
  "😇",
  "🫶",
];
const MEAN_EMOJIS = ["😡", "👎", "💢", "😤", "🙄", "😒", "💔", "👊"];
const NEUTRAL_EMOJIS = ["😐", "🔵", "🟡", "⚪", "🫥", "😶", "🤷", "💭"];
const TURN_TIME = 10;
const WIN_SCORE = 10;

function generateEmojis(levelIndex) {
  const speed = SPEED_MULTIPLIERS[levelIndex] || 0.25;
  const emojis = [];
  const kindCount = 3,
    meanCount = Math.floor(Math.random() * 3) + 2,
    neutralCount = 10 - kindCount - meanCount;
  const make = (i, emoji, type, base) => {
    const a = Math.random() * Math.PI * 2;
    return {
      id: i,
      emoji,
      type,
      x: Math.random() * 65 + 12,
      y: Math.random() * 50 + 22,
      dx: Math.cos(a) * base * speed,
      dy: Math.sin(a) * base * speed,
      size: Math.random() * 10 + 30,
      rotation: 0,
      rotSpeed: (Math.random() - 0.5) * 1.5 * speed,
    };
  };
  let idx = 0;
  for (let i = 0; i < kindCount; i++)
    emojis.push(
      make(
        idx++,
        KIND_EMOJIS[Math.floor(Math.random() * KIND_EMOJIS.length)],
        "kind",
        1.2,
      ),
    );
  for (let i = 0; i < meanCount; i++)
    emojis.push(
      make(
        idx++,
        MEAN_EMOJIS[Math.floor(Math.random() * MEAN_EMOJIS.length)],
        "mean",
        1.5,
      ),
    );
  for (let i = 0; i < neutralCount; i++)
    emojis.push(
      make(
        idx++,
        NEUTRAL_EMOJIS[Math.floor(Math.random() * NEUTRAL_EMOJIS.length)],
        "neutral",
        1.0,
      ),
    );
  return emojis.sort(() => Math.random() - 0.5);
}

function FloatingParticle({ emoji, delayVal, leftVal, topVal }) {
  return (
    <div
      style={{
        position: "absolute",
        fontSize: "18px",
        opacity: 0.25,
        animation: `floatParticle 10s ease-in-out ${delayVal}s infinite`,
        left: `${leftVal}%`,
        top: `${topVal}%`,
        pointerEvents: "none",
      }}
    >
      {emoji}
    </div>
  );
}
function EmojiSprite({ emoji, onClick, disabled }) {
  return (
    <div
      onClick={() => !disabled && onClick(emoji.id)}
      style={{
        position: "absolute",
        left: `${emoji.x}%`,
        top: `${emoji.y}%`,
        fontSize: `${emoji.size}px`,
        transform: `rotate(${emoji.rotation}deg)`,
        cursor: disabled ? "default" : "pointer",
        userSelect: "none",
        filter: disabled ? "grayscale(0.5) opacity(0.5)" : "none",
        zIndex: 10,
      }}
    >
      <span
        style={{
          display: "inline-block",
          animation: `wobble 3s ease-in-out infinite ${emoji.id * 0.3}s`,
        }}
      >
        {emoji.emoji}
      </span>
    </div>
  );
}
function FlyingEmoji({ emoji, fromSide }) {
  return (
    <div
      style={{
        position: "fixed",
        left: fromSide === "left" ? "20%" : "80%",
        top: "40%",
        fontSize: "48px",
        zIndex: 1000,
        pointerEvents: "none",
        animation: `flyOver${fromSide === "left" ? "Right" : "Left"} 1s ease-out forwards`,
      }}
    >
      {emoji}
    </div>
  );
}
function ScoreBar({ score, maxScore, color, name }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13,
          fontWeight: 700,
          color: "#fff",
          marginBottom: 3,
          textShadow: "0 1px 3px rgba(0,0,0,0.5)",
        }}
      >
        <span>{name}</span>
        <span>
          {score}/{maxScore}
        </span>
      </div>
      <div
        style={{
          height: 14,
          background: "rgba(255,255,255,0.2)",
          borderRadius: 7,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.max(0, Math.min(100, (score / maxScore) * 100))}%`,
            background: color,
            borderRadius: 7,
            transition: "width 0.5s ease",
            boxShadow: `0 0 10px ${color}80`,
          }}
        />
      </div>
    </div>
  );
}
function TimerBar({ timeLeft, maxTime }) {
  const pct = (timeLeft / maxTime) * 100;
  const color =
    timeLeft <= 3 ? "#f44336" : timeLeft <= 5 ? "#FF9800" : "#4CAF50";
  return (
    <div style={{ width: "100%", maxWidth: 200, margin: "4px auto 0" }}>
      <div
        style={{
          height: 8,
          background: "rgba(255,255,255,0.15)",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: color,
            borderRadius: 4,
            transition: "width 1s linear, background 0.3s",
            boxShadow: timeLeft <= 3 ? `0 0 12px ${color}` : "none",
          }}
        />
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: 13,
          fontWeight: 700,
          marginTop: 2,
          color: timeLeft <= 3 ? "#f44336" : "#fff",
          fontFamily: "'Fredoka', sans-serif",
          animation: timeLeft <= 3 ? "pulse 0.5s ease-in-out infinite" : "none",
        }}
      >
        ⏱ {timeLeft}s
      </div>
    </div>
  );
}

const PARTICLE_POS = [
  { left: 20, top: 25, delay: 0 },
  { left: 55, top: 60, delay: 3 },
];
const GLOBAL_STYLES = `
  @keyframes floatParticle { 0%, 100% { transform: translateY(0); opacity: 0.25; } 50% { transform: translateY(-20px); opacity: 0.35; } }
  @keyframes wobble { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
  @keyframes flyOverRight { 0% { transform: translateX(0) translateY(0) scale(1); opacity: 1; } 100% { transform: translateX(250px) translateY(-150px) scale(0.3); opacity: 0; } }
  @keyframes flyOverLeft { 0% { transform: translateX(0) translateY(0) scale(1); opacity: 1; } 100% { transform: translateX(-250px) translateY(-150px) scale(0.3); opacity: 0; } }
  @keyframes dancing { 0% { transform: translateY(0) rotate(0deg); } 15% { transform: translateY(-12px) rotate(-8deg); } 30% { transform: translateY(0) rotate(0deg); } 45% { transform: translateY(-12px) rotate(8deg); } 60% { transform: translateY(0) rotate(0deg); } 75% { transform: translateY(-8px) rotate(-5deg); } 100% { transform: translateY(0) rotate(0deg); } }
  .dancing { animation: dancing 0.8s ease-in-out infinite; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }
  @keyframes titlePulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
  @keyframes confetti { 0% { transform: translateY(-10px) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
`;
const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap";

// ========== Character Creator ==========
function CharacterCreator({ onDone, onBack }) {
  const [config, setConfig] = useState({ ...DEFAULT_CONFIG });
  const [step, setStep] = useState(0);
  const [nameInput, setNameInput] = useState("");
  const steps = [
    {
      label: "Skin Tone",
      key: "skinTone",
      options: SKIN_TONES,
      type: "skin_color",
    },
    {
      label: "Hair Style",
      key: "hairStyle",
      options: HAIR_STYLES,
      type: "text",
    },
    {
      label: "Hair Colour",
      key: "hairColor",
      options: HAIR_COLORS,
      type: "color",
    },
    {
      label: "Outfit",
      key: "outfitStyle",
      options: OUTFIT_STYLES,
      type: "text",
    },
    {
      label: "Outfit Colour",
      key: "outfitColor",
      options: OUTFIT_COLORS,
      type: "color",
    },
    {
      label: "Accessory",
      key: "accessory",
      options: ACCESSORIES,
      type: "text",
    },
    { label: "Name", key: "name", type: "name" },
  ];
  const cur = steps[step];
  const pick = (key, val) => {
    playClick();
    setConfig((c) => ({ ...c, [key]: val }));
  };
  const next = () => {
    playClick();
    if (step < steps.length - 1) setStep(step + 1);
    else onDone({ ...config, name: nameInput.trim() || "Player" });
  };
  const prev = () => {
    playClick();
    if (step > 0) setStep(step - 1);
    else onBack();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #2d1b69 0%, #5b6abf 50%, #c77dba 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Fredoka', 'Nunito', sans-serif",
        overflow: "auto",
        padding: "20px 16px",
      }}
    >
      <link href={FONT_LINK} rel="stylesheet" />
      <style>{GLOBAL_STYLES}</style>
      <div
        style={{
          fontSize: 13,
          color: "rgba(255,255,255,0.5)",
          marginBottom: 4,
        }}
      >
        Step {step + 1} of {steps.length}
      </div>
      <div
        style={{
          fontSize: "clamp(20px, 4vw, 28px)",
          fontWeight: 700,
          color: "#fff",
          marginBottom: 12,
          fontFamily: "'Fredoka', sans-serif",
        }}
      >
        {cur.label}
      </div>
      <div
        style={{
          background: "rgba(0,0,0,0.25)",
          borderRadius: 20,
          padding: "12px 20px",
          marginBottom: 16,
        }}
      >
        <CustomCharacter config={config} size={100} />
      </div>
      {cur.type === "skin_color" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 54px)",
            gap: 10,
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          {cur.options.map((opt) => {
            const val = opt.hex;
            const isSel = config[cur.key] === val;
            return (
              <div
                key={opt.id}
                onClick={() => pick(cur.key, val)}
                style={{ cursor: "pointer", textAlign: "center" }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: val,
                    border: isSel
                      ? "3px solid #FFD700"
                      : "3px solid rgba(255,255,255,0.2)",
                    boxShadow: isSel ? "0 0 12px #FFD700" : "none",
                    margin: "0 auto",
                  }}
                />
                <div
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.7)",
                    marginTop: 3,
                  }}
                >
                  {opt.name}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {cur.type === "color" && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 10,
            maxWidth: 360,
            marginBottom: 16,
          }}
        >
          {cur.options.map((opt) => {
            const val = opt.hex || opt.id;
            const isSel = config[cur.key] === val;
            const isR = val === "rainbow";
            return (
              <div
                key={opt.id}
                onClick={() => pick(cur.key, val)}
                style={{ cursor: "pointer", textAlign: "center" }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: isR
                      ? "conic-gradient(#E74C3C, #F1C40F, #2ECC71, #3498DB, #FF69B4, #E74C3C)"
                      : val,
                    border: isSel
                      ? "3px solid #FFD700"
                      : "3px solid rgba(255,255,255,0.2)",
                    boxShadow: isSel ? "0 0 12px #FFD700" : "none",
                    margin: "0 auto",
                  }}
                />
                <div
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.7)",
                    marginTop: 3,
                  }}
                >
                  {opt.name}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {cur.type === "text" && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 8,
            maxWidth: 360,
            marginBottom: 16,
          }}
        >
          {cur.options.map((opt) => {
            const isSel = config[cur.key] === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => pick(cur.key, opt.id)}
                style={{
                  padding: "10px 18px",
                  borderRadius: 16,
                  cursor: "pointer",
                  background: isSel
                    ? "rgba(255,215,0,0.25)"
                    : "rgba(255,255,255,0.1)",
                  border: isSel
                    ? "2px solid #FFD700"
                    : "2px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "'Fredoka', sans-serif",
                }}
              >
                {opt.name}
              </div>
            );
          })}
        </div>
      )}
      {cur.type === "name" && (
        <div style={{ marginBottom: 16 }}>
          <input
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value.slice(0, 12))}
            placeholder="Enter name..."
            style={{
              padding: "12px 20px",
              fontSize: 18,
              borderRadius: 16,
              border: "2px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              fontFamily: "'Fredoka', sans-serif",
              textAlign: "center",
              outline: "none",
              width: 200,
            }}
          />
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.5)",
              marginTop: 4,
              textAlign: "center",
            }}
          >
            Max 12 characters
          </div>
        </div>
      )}
      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={prev}
          style={{
            padding: "10px 28px",
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "'Fredoka', sans-serif",
            background: "rgba(255,255,255,0.15)",
            color: "#fff",
            border: "2px solid rgba(255,255,255,0.3)",
            borderRadius: 50,
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
        <button
          onClick={next}
          style={{
            padding: "10px 28px",
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "'Fredoka', sans-serif",
            background: "linear-gradient(135deg, #FF69B4, #9B59B6)",
            color: "#fff",
            border: "2px solid rgba(255,255,255,0.3)",
            borderRadius: 50,
            cursor: "pointer",
          }}
        >
          {step === steps.length - 1 ? "Done ✓" : "Next →"}
        </button>
      </div>
    </div>
  );
}

function CharSelectScreen({ playerNum, takenConfig, onSelect, onBack }) {
  const [mode, setMode] = useState("choose");
  const [customChars, setCustomChars] = useState([]);

  const allChars = [...customChars];

  // Auto-enter create mode when no characters exist
  const effectiveMode = allChars.length === 0 ? "create" : mode;

  if (effectiveMode === "create")
    return (
      <CharacterCreator
        onDone={(cfg) => {
          const newChar = {
            id: "custom_" + Date.now(),
            name: cfg.name,
            config: cfg,
            color: cfg.outfitColor === "#FFFFFF" ? "#FF69B4" : cfg.outfitColor,
            isToddler: false,
          };
          setCustomChars((prev) => [...prev, newChar]);
          setMode("choose");
        }}
        onBack={() => {
          if (allChars.length > 0) setMode("choose");
          else onBack();
        }}
      />
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #5b6abf 0%, #6b4f9e 50%, #c77dba 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Fredoka', 'Nunito', sans-serif",
        overflow: "auto",
        padding: "20px 16px",
      }}
    >
      <link href={FONT_LINK} rel="stylesheet" />
      <style>{GLOBAL_STYLES}</style>
      <div
        style={{
          fontSize: "clamp(20px, 4.5vw, 32px)",
          fontWeight: 700,
          color: "#fff",
          marginBottom: 6,
          fontFamily: "'Fredoka', sans-serif",
        }}
      >
        Player {playerNum}
      </div>
      <div
        style={{
          fontSize: 14,
          color: "rgba(255,255,255,0.7)",
          marginBottom: 20,
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        {allChars.length > 0
          ? "Choose a character or create a new one"
          : "Create your character!"}
      </div>
      {allChars.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: 460,
            marginBottom: 16,
          }}
        >
          {allChars.map((p) => {
            const taken = takenConfig && takenConfig.name === p.name;
            return (
              <div
                key={p.id}
                onClick={() => {
                  if (!taken) {
                    playSelect();
                    onSelect({
                      config: p.config,
                      color: p.color,
                      isToddler: p.isToddler,
                    });
                  }
                }}
                style={{
                  textAlign: "center",
                  padding: "12px 10px",
                  borderRadius: 20,
                  background: taken
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(255,255,255,0.12)",
                  border: taken
                    ? "2px solid rgba(255,255,255,0.1)"
                    : `2px solid ${p.color}60`,
                  cursor: taken ? "not-allowed" : "pointer",
                  opacity: taken ? 0.35 : 1,
                  minWidth: 85,
                }}
              >
                <CustomCharacter
                  config={p.config}
                  size={68}
                  isToddler={p.isToddler}
                />
                <div
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 13,
                    marginTop: 2,
                    fontFamily: "'Fredoka', sans-serif",
                  }}
                >
                  {p.name}
                </div>
                {taken && (
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10 }}>
                    Taken
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      <button
        onClick={() => {
          playClick();
          setMode("create");
        }}
        style={{
          padding: "12px 32px",
          fontSize: 16,
          fontWeight: 700,
          fontFamily: "'Fredoka', sans-serif",
          background: "linear-gradient(135deg, #FF69B4, #9B59B6)",
          color: "#fff",
          border: "2px solid rgba(255,255,255,0.3)",
          borderRadius: 50,
          cursor: "pointer",
          marginBottom: 12,
        }}
      >
        {"\u2728"} Create Character {"\u2728"}
      </button>
      <button
        onClick={() => {
          playClick();
          onBack();
        }}
        style={{
          padding: "8px 24px",
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "'Fredoka', sans-serif",
          background: "rgba(255,255,255,0.15)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: 30,
          cursor: "pointer",
        }}
      >
        {"\u2190"} Back
      </button>
    </div>
  );
}

// ========== MAIN GAME ==========
export default function KindEmojisBattle() {
  const [gameState, setGameState] = useState("title");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
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
  const [p1Info, setP1Info] = useState(null);
  const [p2Info, setP2Info] = useState(null);
  const [selectingPlayer, setSelectingPlayer] = useState(1);
  const [levelWinner, setLevelWinner] = useState(null);
  const [prevTimeLeft, setPrevTimeLeft] = useState(TURN_TIME);
  const [vsComputer, setVsComputer] = useState(false);

  const animFrameRef = useRef(null);
  const emojisRef = useRef([]);
  const timerRef = useRef(null);
  const selectedRef = useRef([]);
  const turnEndedRef = useRef(false);

  const level = LEVELS[currentLevel];
  const p1Name = p1Info?.config?.name || "P1";
  const p2Name = p2Info?.config?.name || "P2";
  const currentInfo = currentPlayer === 1 ? p1Info : p2Info;
  const playerName = currentInfo?.config?.name || "Player";
  const playerColor = currentInfo?.color || "#FF69B4";

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);
  useEffect(() => {
    turnEndedRef.current = turnEnded;
  }, [turnEnded]);
  useEffect(() => {
    if (
      gameState === "playing" &&
      timeLeft <= 3 &&
      timeLeft > 0 &&
      timeLeft !== prevTimeLeft
    )
      playTick();
    if (gameState === "playing" && timeLeft === 0 && prevTimeLeft > 0)
      playTimeUp();
    setPrevTimeLeft(timeLeft);
  }, [timeLeft, gameState, prevTimeLeft]);

  const calcScore = (selIds) => {
    let s = 0;
    selIds.forEach((sid) => {
      const e = emojisRef.current.find((em) => em.id === sid);
      if (e) {
        if (e.type === "kind") s += 1;
        else if (e.type === "mean") s -= 1;
      }
    });
    return s;
  };

  const endTurn = useCallback(
    (finalSelected) => {
      if (turnEndedRef.current) return;
      setTurnEnded(true);
      turnEndedRef.current = true;
      if (timerRef.current) clearInterval(timerRef.current);
      const ts = calcScore(finalSelected);
      finalSelected.forEach((sid) => {
        const se = emojisRef.current.find((e) => e.id === sid);
        if (se && se.type === "kind") {
          playWhoosh();
          setFlyingEmojis((prev) => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              emoji: se.emoji,
              fromSide: currentPlayer === 1 ? "left" : "right",
            },
          ]);
        }
      });
      setTimeout(() => setFlyingEmojis([]), 1200);
      setTimeout(() => {
        setTurnScore(ts);
        if (currentPlayer === 1) setP1Scores((prev) => Math.max(0, prev + ts));
        else setP2Scores((prev) => Math.max(0, prev + ts));
        setGameState("turnResult");
      }, 400);
    },
    [currentPlayer],
  );

  const initTurn = (lvl) => {
    setSelected([]);
    selectedRef.current = [];
    setTurnScore(null);
    setTimeLeft(TURN_TIME);
    setPrevTimeLeft(TURN_TIME);
    setTurnEnded(false);
    turnEndedRef.current = false;
    const ne = generateEmojis(lvl);
    setEmojis(ne);
    emojisRef.current = ne;
    setGameState("playing");
  };

  // AI auto-play when it's the computer's turn
  useEffect(() => {
    if (
      !vsComputer ||
      currentPlayer !== 2 ||
      gameState !== "playing" ||
      turnEndedRef.current
    )
      return;
    // AI picks 3 emojis with slight delay for drama
    const aiPick = () => {
      const available = emojisRef.current;
      if (!available.length) return;
      // AI strategy: 70% chance to pick kind, avoids mean
      const kindOnes = available.filter((e) => e.type === "kind");
      const neutralOnes = available.filter((e) => e.type === "neutral");
      const meanOnes = available.filter((e) => e.type === "mean");
      const picks = [];
      for (let i = 0; i < 3; i++) {
        const roll = Math.random();
        let pool;
        if (roll < 0.7 && kindOnes.length > 0) pool = kindOnes;
        else if (roll < 0.9 && neutralOnes.length > 0) pool = neutralOnes;
        else pool = [...kindOnes, ...neutralOnes, ...meanOnes];
        if (pool.length === 0) pool = available;
        const pick = pool[Math.floor(Math.random() * pool.length)];
        if (pick && !picks.includes(pick.id)) picks.push(pick.id);
      }
      // Simulate clicking with delays
      let delay = 600;
      picks.forEach((pid, i) => {
        setTimeout(
          () => {
            if (turnEndedRef.current) return;
            const newSel = [...selectedRef.current, pid];
            setSelected(newSel);
            selectedRef.current = newSel;
            const e = emojisRef.current.find((em) => em.id === pid);
            if (e) {
              if (e.type === "kind") playKind();
              else if (e.type === "mean") playMean();
              else playNeutral();
            }
            if (newSel.length >= 3) {
              endTurn(newSel);
            }
          },
          delay * (i + 1),
        );
      });
    };
    const t = setTimeout(aiPick, 800);
    return () => clearTimeout(t);
  }, [vsComputer, currentPlayer, gameState, endTurn]);
  const startGame = (computer = false) => {
    playClick();
    setVsComputer(computer);
    setSelectingPlayer(1);
    setP1Info(null);
    setP2Info(null);
    setGameState("charSelect");
  };
  const handleCharSelect = (info) => {
    if (selectingPlayer === 1) {
      setP1Info(info);
      if (vsComputer) {
        // Auto-create robot opponent
        const robotConfig = {
          skinTone: "#A0A0A0",
          hairStyle: "buzz",
          hairColor: "#3498DB",
          outfitStyle: "robot",
          outfitColor: "#3498DB",
          accessory: "sunglasses",
          name: "Robo",
        };
        setP2Info({
          config: robotConfig,
          color: "#3498DB",
          isToddler: false,
          isRobot: true,
        });
        setCurrentLevel(0);
        setCurrentPlayer(1);
        setP1Scores(0);
        setP2Scores(0);
        setP1LevelsWon(0);
        setP2LevelsWon(0);
        setLevelWinner(null);
        setPaused(false);
        playGameStart();
        setTimeout(() => initTurn(0), 50);
      } else {
        setSelectingPlayer(2);
      }
    } else {
      setP2Info(info);
      setCurrentLevel(0);
      setCurrentPlayer(1);
      setP1Scores(0);
      setP2Scores(0);
      setP1LevelsWon(0);
      setP2LevelsWon(0);
      setLevelWinner(null);
      setPaused(false);
      playGameStart();
      setTimeout(() => initTurn(0), 50);
    }
  };
  const endGame = () => {
    playClick();
    setPaused(false);
    setGameState("title");
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
  };
  const togglePause = () => {
    playClick();
    setPaused((p) => !p);
  };

  // Timer
  useEffect(() => {
    if (gameState !== "playing" || paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, paused]);
  useEffect(() => {
    if (timeLeft === 0 && gameState === "playing" && !turnEndedRef.current)
      endTurn([...selectedRef.current]);
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
        let nx = e.x + e.dx * dt,
          ny = e.y + e.dy * dt,
          ndx = e.dx,
          ndy = e.dy;
        if (nx < 2 || nx > 88) ndx = -ndx;
        if (ny < 5 || ny > 75) ndy = -ndy;
        return {
          ...e,
          x: Math.max(2, Math.min(88, nx)),
          y: Math.max(5, Math.min(75, ny)),
          dx: ndx,
          dy: ndy,
          rotation: e.rotation + e.rotSpeed * dt,
        };
      });
      setEmojis([...emojisRef.current]);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameState, paused]);

  const handleEmojiClick = useCallback(
    (id) => {
      if (turnEndedRef.current || paused) return;
      if (vsComputer && currentPlayer === 2) return;
      if (selectedRef.current.length >= 3 || selectedRef.current.includes(id))
        return;
      const emoji = emojisRef.current.find((e) => e.id === id);
      if (!emoji) return;
      if (emoji.type === "kind") playKind();
      else if (emoji.type === "mean") playMean();
      else playNeutral();
      const newSelected = [...selectedRef.current, id];
      setSelected(newSelected);
      selectedRef.current = newSelected;
      if (emoji.type === "kind") {
        setFlyingEmojis((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            emoji: emoji.emoji,
            fromSide: currentPlayer === 1 ? "left" : "right",
          },
        ]);
        setTimeout(() => setFlyingEmojis((prev) => prev.slice(1)), 1200);
      }
      const runningScore = calcScore(newSelected);
      const currentTotal = currentPlayer === 1 ? p1Scores : p2Scores;
      if (Math.max(0, currentTotal + runningScore) >= WIN_SCORE) {
        endTurn(newSelected);
        return;
      }
      if (newSelected.length === 3) endTurn(newSelected);
    },
    [currentPlayer, paused, endTurn, p1Scores, p2Scores],
  );

  const nextTurn = () => {
    playClick();
    if (currentPlayer === 1) {
      setCurrentPlayer(2);
      initTurn(currentLevel);
    } else {
      const p1Hit = p1Scores >= WIN_SCORE,
        p2Hit = p2Scores >= WIN_SCORE;
      if (p1Hit && p2Hit) {
        setLevelWinner("draw");
        playDraw();
      } else if (p1Hit) {
        setLevelWinner(1);
        setP1LevelsWon((p) => p + 1);
        playWin();
      } else if (p2Hit) {
        setLevelWinner(2);
        setP2LevelsWon((p) => p + 1);
        playWin();
      } else {
        setCurrentPlayer(1);
        initTurn(currentLevel);
        return;
      }
      setGameState(currentLevel < LEVELS.length - 1 ? "levelWin" : "gameWin");
    }
  };
  const nextLevel = () => {
    playClick();
    const nl = currentLevel + 1;
    setCurrentLevel(nl);
    setP1Scores(0);
    setP2Scores(0);
    setCurrentPlayer(1);
    setLevelWinner(null);
    initTurn(nl);
  };
  // Auto-advance turn result when it's about to be computer's turn
  useEffect(() => {
    if (!vsComputer || gameState !== "turnResult") return;
    // If P1 just played, next is computer - auto advance
    if (currentPlayer === 1) {
      const t = setTimeout(() => nextTurn(), 1500);
      return () => clearTimeout(t);
    }
    // If computer just played, let the human read and tap next
  }, [vsComputer, gameState, currentPlayer]);

  const renderChar = (info, size, cel, cry) => {
    if (!info) return null;
    return (
      <CustomCharacter
        config={info.config}
        size={size}
        celebrating={cel}
        crying={cry}
        isToddler={info.isToddler}
        isRobot={info.isRobot}
      />
    );
  };

  // ===== CHAR SELECT =====
  if (gameState === "charSelect") {
    return (
      <CharSelectScreen
        playerNum={selectingPlayer}
        takenConfig={selectingPlayer === 2 ? p1Info?.config : null}
        onSelect={handleCharSelect}
        onBack={() => {
          playClick();
          if (selectingPlayer === 2) setSelectingPlayer(1);
          else setGameState("title");
        }}
      />
    );
  }

  // ===== TITLE =====
  if (gameState === "title") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #5b6abf 0%, #6b4f9e 50%, #c77dba 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Fredoka', 'Nunito', sans-serif",
          overflow: "hidden",
        }}
      >
        <link href={FONT_LINK} rel="stylesheet" />
        <style>{GLOBAL_STYLES}</style>
        <div
          style={{
            animation: "titlePulse 3s ease-in-out infinite",
            textAlign: "center",
            zIndex: 2,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: "clamp(36px, 7vw, 64px)",
              fontWeight: 800,
              color: "#fff",
              textShadow: "0 4px 20px rgba(0,0,0,0.3)",
              lineHeight: 1.1,
              marginBottom: 8,
              fontFamily: "'Fredoka', sans-serif",
            }}
          >
            Kind Emojis
          </div>
          <div
            style={{
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 700,
              color: "#FFD700",
              fontFamily: "'Fredoka', sans-serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <span
              style={{
                position: "relative",
                display: "inline-block",
                width: "1.4em",
                height: "1.2em",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "0.84em",
                  opacity: 0.7,
                }}
              >
                ⚔️
              </span>
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "0.7em",
                }}
              >
                😍
              </span>
            </span>
            Battle!
            <span
              style={{
                position: "relative",
                display: "inline-block",
                width: "1.4em",
                height: "1.2em",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "0.84em",
                  opacity: 0.7,
                }}
              >
                ⚔️
              </span>
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "0.7em",
                }}
              >
                😍
              </span>
            </span>
          </div>
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: 14,
            textAlign: "center",
            maxWidth: 340,
            marginBottom: 24,
            lineHeight: 1.5,
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          Throw kind emojis over the wall! Pick 3 emojis each turn. Kind ones
          earn points, mean ones lose points. First to 10 wins!
        </div>
        <button
          onClick={() => startGame(false)}
          style={{
            padding: "14px 40px",
            fontSize: 20,
            fontWeight: 700,
            fontFamily: "'Fredoka', sans-serif",
            background: "linear-gradient(135deg, #FF69B4, #FF1493)",
            color: "#fff",
            border: "3px solid rgba(255,255,255,0.4)",
            borderRadius: 50,
            cursor: "pointer",
            boxShadow: "0 8px 30px rgba(255,105,180,0.5)",
            zIndex: 2,
            marginBottom: 12,
          }}
        >
          2 Players 🎮
        </button>
        <button
          onClick={() => startGame(true)}
          style={{
            padding: "12px 36px",
            fontSize: 18,
            fontWeight: 700,
            fontFamily: "'Fredoka', sans-serif",
            background: "linear-gradient(135deg, #3498DB, #2980B9)",
            color: "#fff",
            border: "3px solid rgba(255,255,255,0.4)",
            borderRadius: 50,
            cursor: "pointer",
            boxShadow: "0 8px 30px rgba(52,152,219,0.4)",
            zIndex: 2,
          }}
        >
          vs Computer 🤖
        </button>
      </div>
    );
  }

  // ===== GAME WIN =====
  if (gameState === "gameWin") {
    const w = levelWinner;
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #e8c547 0%, #c77dba 50%, #5b6abf 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Fredoka', 'Nunito', sans-serif",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <link href={FONT_LINK} rel="stylesheet" />
        <style>{GLOBAL_STYLES}</style>
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: "-5%",
              fontSize: "22px",
              animation: `confetti ${3 + Math.random() * 3}s linear ${Math.random() * 2}s infinite`,
              pointerEvents: "none",
            }}
          >
            {["🎉", "🎊", "⭐", "💖", "✨"][i % 5]}
          </div>
        ))}
        <div
          style={{
            fontSize: "clamp(28px, 6vw, 52px)",
            fontWeight: 800,
            color: "#fff",
            textShadow: "0 4px 20px rgba(0,0,0,0.3)",
            marginBottom: 8,
            fontFamily: "'Fredoka', sans-serif",
            zIndex: 2,
          }}
        >
          🏆 Game Complete! 🏆
        </div>
        <div style={{ display: "flex", gap: 30, margin: "20px 0", zIndex: 2 }}>
          <div style={{ textAlign: "center" }}>
            {renderChar(p1Info, 90, w === 1 || w === "draw", w === 2)}
            <div
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
                fontFamily: "'Fredoka', sans-serif",
              }}
            >
              {p1Name}
            </div>
            <div style={{ color: "#FFD700", fontWeight: 700, fontSize: 20 }}>
              {p1LevelsWon + (w === 1 ? 1 : 0)} 🌟
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            {renderChar(p2Info, 90, w === 2 || w === "draw", w === 1)}
            <div
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
                fontFamily: "'Fredoka', sans-serif",
              }}
            >
              {p2Name}
            </div>
            <div style={{ color: "#FFD700", fontWeight: 700, fontSize: 20 }}>
              {p2LevelsWon + (w === 2 ? 1 : 0)} 🌟
            </div>
          </div>
        </div>
        <div
          style={{
            color: "#fff",
            fontSize: 18,
            textAlign: "center",
            margin: "12px 0 24px",
            fontFamily: "'Nunito', sans-serif",
            zIndex: 2,
            maxWidth: 320,
          }}
        >
          {w === "draw"
            ? "It's a draw! Both players are amazing! 🤝"
            : "Both players spread kindness! 💕"}
        </div>
        <button
          onClick={() => {
            playClick();
            setGameState("title");
          }}
          style={{
            padding: "14px 40px",
            fontSize: 20,
            fontWeight: 700,
            fontFamily: "'Fredoka', sans-serif",
            background: "linear-gradient(135deg, #FF69B4, #9B59B6)",
            color: "#fff",
            border: "3px solid rgba(255,255,255,0.4)",
            borderRadius: 50,
            cursor: "pointer",
            zIndex: 2,
          }}
        >
          Play Again! 🎮
        </button>
      </div>
    );
  }

  // ===== LEVEL WIN =====
  if (gameState === "levelWin") {
    const w = levelWinner;
    const winName = w === 1 ? p1Name : w === 2 ? p2Name : null;
    return (
      <div
        style={{
          minHeight: "100vh",
          background: level.bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Fredoka', 'Nunito', sans-serif",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <link href={FONT_LINK} rel="stylesheet" />
        <style>{GLOBAL_STYLES}</style>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: "-5%",
              fontSize: "22px",
              animation: `confetti ${3 + Math.random() * 3}s linear ${Math.random() * 2}s infinite`,
              pointerEvents: "none",
            }}
          >
            {["🎉", "🎊", "⭐", "💖", "✨"][i % 5]}
          </div>
        ))}
        <div
          style={{
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(12px)",
            borderRadius: 24,
            padding: "28px 36px",
            textAlign: "center",
            zIndex: 2,
            border: "2px solid rgba(255,255,255,0.2)",
            maxWidth: 370,
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 8 }}>
            {w === "draw" ? "🤝" : "🎉"}
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "#FFD700",
              fontFamily: "'Fredoka', sans-serif",
            }}
          >
            {w === "draw" ? "It's a Draw!" : `${winName} wins!`}
          </div>
          <div
            style={{
              fontSize: 16,
              color: "#fff",
              margin: "8px 0 4px",
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            {level.emoji} {level.name} Complete!
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 24,
              margin: "16px 0",
            }}
          >
            <div style={{ textAlign: "center" }}>
              {renderChar(p1Info, 75, w === 1 || w === "draw", w === 2)}
              <div
                style={{
                  color: "#fff",
                  fontSize: 13,
                  fontFamily: "'Fredoka', sans-serif",
                }}
              >
                {p1Name}: {p1Scores}
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              {renderChar(p2Info, 75, w === 2 || w === "draw", w === 1)}
              <div
                style={{
                  color: "#fff",
                  fontSize: 13,
                  fontFamily: "'Fredoka', sans-serif",
                }}
              >
                {p2Name}: {p2Scores}
              </div>
            </div>
          </div>
          {currentLevel < LEVELS.length - 1 && (
            <>
              <div
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 14,
                  marginBottom: 8,
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                Next up: {LEVELS[currentLevel + 1]?.emoji}{" "}
                {LEVELS[currentLevel + 1]?.name}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 12,
                  marginBottom: 16,
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                ⚡ Emojis will move faster!
              </div>
            </>
          )}
          <button
            onClick={nextLevel}
            style={{
              padding: "12px 36px",
              fontSize: 18,
              fontWeight: 700,
              fontFamily: "'Fredoka', sans-serif",
              background: "linear-gradient(135deg, #FF69B4, #9B59B6)",
              color: "#fff",
              border: "3px solid rgba(255,255,255,0.3)",
              borderRadius: 50,
              cursor: "pointer",
            }}
          >
            Next Level! →
          </button>
        </div>
      </div>
    );
  }

  // ===== MAIN GAME =====
  return (
    <div
      style={{
        minHeight: "100vh",
        background: level.bg,
        fontFamily: "'Fredoka', 'Nunito', sans-serif",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <link href={FONT_LINK} rel="stylesheet" />
      <style>{GLOBAL_STYLES}</style>
      {level.particles.map((p, i) =>
        PARTICLE_POS.map((pos, j) => (
          <FloatingParticle
            key={`${i}-${j}`}
            emoji={p}
            delayVal={pos.delay + i * 3}
            leftVal={pos.left + i * 10}
            topVal={pos.top + j * 15}
          />
        )),
      )}
      {flyingEmojis.map((fe) => (
        <FlyingEmoji key={fe.id} emoji={fe.emoji} fromSide={fe.fromSide} />
      ))}

      {paused && gameState === "playing" && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>⏸️</div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#fff",
              fontFamily: "'Fredoka', sans-serif",
              marginBottom: 24,
            }}
          >
            Paused
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <button
              onClick={togglePause}
              style={{
                padding: "12px 32px",
                fontSize: 18,
                fontWeight: 700,
                fontFamily: "'Fredoka', sans-serif",
                background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
                color: "#fff",
                border: "2px solid rgba(255,255,255,0.3)",
                borderRadius: 50,
                cursor: "pointer",
              }}
            >
              Resume ▶
            </button>
            <button
              onClick={endGame}
              style={{
                padding: "12px 32px",
                fontSize: 18,
                fontWeight: 700,
                fontFamily: "'Fredoka', sans-serif",
                background: "linear-gradient(135deg, #f44336, #C62828)",
                color: "#fff",
                border: "2px solid rgba(255,255,255,0.3)",
                borderRadius: 50,
                cursor: "pointer",
              }}
            >
              End Game ✕
            </button>
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 12px",
          background: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(10px)",
          zIndex: 20,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ flex: 1, maxWidth: 150 }}>
          <ScoreBar
            score={p1Scores}
            maxScore={WIN_SCORE}
            color={p1Info?.color || "#FF69B4"}
            name={p1Name}
          />
        </div>
        <div style={{ textAlign: "center", padding: "0 8px", flex: 1 }}>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.6)",
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            {level.emoji} {level.name} • Level {currentLevel + 1}/
            {LEVELS.length}
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: playerColor,
              fontFamily: "'Fredoka', sans-serif",
              textShadow: `0 0 15px ${playerColor}60`,
            }}
          >
            {vsComputer && currentPlayer === 2
              ? "Robo is thinking..."
              : `${playerName}'s Turn`}
          </div>
          {gameState === "playing" && (
            <TimerBar timeLeft={timeLeft} maxTime={TURN_TIME} />
          )}
        </div>
        <div style={{ flex: 1, maxWidth: 150 }}>
          <ScoreBar
            score={p2Scores}
            maxScore={WIN_SCORE}
            color={p2Info?.color || "#9B59B6"}
            name={p2Name}
          />
        </div>
      </div>

      {gameState === "playing" && (
        <div style={{ position: "absolute", top: 8, right: 8, zIndex: 30 }}>
          <button
            onClick={togglePause}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(0,0,0,0.35)",
              color: "#fff",
              fontSize: 16,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ⏸
          </button>
        </div>
      )}

      <div style={{ flex: 1, display: "flex", position: "relative" }}>
        <div
          style={{
            flex: 1,
            position: "relative",
            opacity: currentPlayer === 1 ? 1 : 0.35,
            transition: "opacity 0.4s",
          }}
        >
          <div
            style={{ position: "absolute", bottom: 16, left: 16, zIndex: 5 }}
          >
            {renderChar(p1Info, 70, false, false)}
          </div>
        </div>
        <div
          style={{
            width: 28,
            background: level.wallColor,
            backgroundImage: level.wallPattern,
            boxShadow: "0 0 20px rgba(0,0,0,0.3)",
            zIndex: 15,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: -6,
              right: -6,
              height: 12,
              background: level.wallColor,
              borderRadius: "4px 4px 0 0",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            position: "relative",
            opacity: currentPlayer === 2 ? 1 : 0.35,
            transition: "opacity 0.4s",
          }}
        >
          <div
            style={{ position: "absolute", bottom: 16, right: 16, zIndex: 5 }}
          >
            {renderChar(p2Info, 70, false, false)}
          </div>
        </div>

        {gameState === "playing" && (
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: currentPlayer === 1 ? 0 : "50%",
              width: "50%",
              zIndex: 10,
            }}
          >
            {emojis
              .filter((e) => !selected.includes(e.id))
              .map((emoji) => (
                <EmojiSprite
                  key={emoji.id}
                  emoji={emoji}
                  onClick={handleEmojiClick}
                  disabled={paused || turnEnded}
                />
              ))}
          </div>
        )}

        {gameState === "turnResult" && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(6px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50,
            }}
          >
            <div
              style={{
                background: "rgba(20,20,40,0.9)",
                borderRadius: 24,
                padding: "28px 36px",
                textAlign: "center",
                border: "2px solid rgba(255,255,255,0.2)",
                animation: "slideUp 0.4s ease-out",
                maxWidth: 340,
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  color: playerColor,
                  fontWeight: 700,
                  fontFamily: "'Fredoka', sans-serif",
                  marginBottom: 12,
                }}
              >
                {playerName}'s picks{selected.length < 3 ? " ⏱" : ""}:
              </div>
              {selected.length === 0 ? (
                <div
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 14,
                    marginBottom: 16,
                    fontFamily: "'Nunito', sans-serif",
                  }}
                >
                  No emojis selected!
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 12,
                    marginBottom: 16,
                    flexWrap: "wrap",
                  }}
                >
                  {selected.map((sid) => {
                    const se = emojisRef.current.find((e) => e.id === sid);
                    if (!se) return null;
                    return (
                      <div
                        key={sid}
                        style={{
                          fontSize: 36,
                          padding: "8px 12px",
                          borderRadius: 16,
                          background:
                            se.type === "kind"
                              ? "rgba(76,175,80,0.25)"
                              : se.type === "mean"
                                ? "rgba(244,67,54,0.25)"
                                : "rgba(158,158,158,0.2)",
                          border: `2px solid ${se.type === "kind" ? "#4CAF50" : se.type === "mean" ? "#f44336" : "#9e9e9e"}`,
                        }}
                      >
                        {se.emoji}
                        <div
                          style={{
                            fontSize: 10,
                            color:
                              se.type === "kind"
                                ? "#81C784"
                                : se.type === "mean"
                                  ? "#EF5350"
                                  : "#BDBDBD",
                            fontWeight: 700,
                          }}
                        >
                          {se.type === "kind"
                            ? "+1"
                            : se.type === "mean"
                              ? "-1"
                              : "+0"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  fontFamily: "'Fredoka', sans-serif",
                  color:
                    turnScore > 0
                      ? "#4CAF50"
                      : turnScore < 0
                        ? "#f44336"
                        : "#FFD700",
                  marginBottom: 16,
                  animation: turnScore < 0 ? "shake 0.5s ease-in-out" : "none",
                }}
              >
                {turnScore > 0
                  ? `+${turnScore} Points! 🎉`
                  : turnScore < 0
                    ? `${turnScore} Points 😔`
                    : "0 Points 🤷"}
              </div>
              {turnScore > 0 && (
                <div
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 13,
                    marginBottom: 12,
                    fontFamily: "'Nunito', sans-serif",
                  }}
                >
                  Kind emojis fly over the wall! 💕
                </div>
              )}
              <button
                onClick={nextTurn}
                style={{
                  padding: "10px 32px",
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "'Fredoka', sans-serif",
                  background: `linear-gradient(135deg, ${playerColor}, ${playerColor}cc)`,
                  color: "#fff",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderRadius: 50,
                  cursor: "pointer",
                }}
              >
                {currentPlayer === 1 ? `${p2Name}'s Turn →` : "End Round →"}
              </button>
            </div>
          </div>
        )}
      </div>

      {gameState === "playing" && (
        <div
          style={{
            padding: "10px 16px",
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(10px)",
            textAlign: "center",
            zIndex: 20,
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            style={{
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            Tap 3 emojis! Pick the kind ones 💖 — {3 - selected.length} left
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              marginTop: 6,
              fontSize: 11,
              color: "rgba(255,255,255,0.6)",
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            <span>❤️ Kind = +1</span>
            <span>😐 Neutral = 0</span>
            <span>😡 Mean = -1</span>
          </div>
        </div>
      )}
    </div>
  );
}
