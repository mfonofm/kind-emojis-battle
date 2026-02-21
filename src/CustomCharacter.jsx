// Universal character renderer

export const SKIN_TONES = [
  { id: "porcelain", hex: "#FDEBD3", name: "Porcelain" },
  { id: "ivory", hex: "#FFE0C2", name: "Ivory" },
  { id: "limestone", hex: "#F0D0B4", name: "Limestone" },
  { id: "sand", hex: "#DEB887", name: "Sand" },
  { id: "terracotta", hex: "#C67B5C", name: "Terra Cotta" },
  { id: "bronze", hex: "#8B6914", name: "Bronze" },
  { id: "darkbronze", hex: "#572000", name: "Dark Bronze" },
  { id: "espresso", hex: "#3B1E08", name: "Espresso" },
];

export const HAIR_COLORS = [
  { id: "black", hex: "#111111", name: "Black" },
  { id: "darkbrown", hex: "#3B2314", name: "Dark Brown" },
  { id: "brown", hex: "#6B3A2A", name: "Brown" },
  { id: "auburn", hex: "#8B3A1A", name: "Auburn" },
  { id: "ginger", hex: "#C44B1A", name: "Ginger" },
  { id: "blonde", hex: "#D4A845", name: "Blonde" },
  { id: "rainbow", hex: "rainbow", name: "Rainbow" },
  { id: "emerald", hex: "#2ECC71", name: "Emerald" },
  { id: "blue", hex: "#3498DB", name: "Blue" },
  { id: "pink", hex: "#FF69B4", name: "Pink" },
  { id: "purple", hex: "#8E44AD", name: "Purple" },
];

export const HAIR_STYLES = [
  { id: "puffs", name: "Puffs" },
  { id: "puffs_coils", name: "Puffs + Coils" },
  { id: "coils", name: "Coils" },
  { id: "locs", name: "Locs" },
  { id: "braids", name: "Braids" },
  { id: "wavy", name: "Wavy" },
  { id: "straight", name: "Straight" },
  { id: "afro", name: "Afro" },
  { id: "bun", name: "Bun" },
  { id: "buzz", name: "Buzz Cut" },
];

export const OUTFIT_STYLES = [
  { id: "dress", name: "Dress" },
  { id: "puffy_dress", name: "Puffy Dress" },
  { id: "ballgown", name: "Ball Gown" },
  { id: "tutu", name: "Tutu" },
  { id: "top_shorts", name: "Top & Shorts" },
  { id: "top_trousers", name: "Top & Trousers" },
  { id: "astronaut", name: "Astronaut" },
  { id: "superhero", name: "Superhero" },
  { id: "robot", name: "Robot" },
];

export const OUTFIT_COLORS = [
  { id: "white", hex: "#FFFFFF", name: "White" },
  { id: "pink", hex: "#FF69B4", name: "Pink" },
  { id: "red", hex: "#E74C3C", name: "Red" },
  { id: "yellow", hex: "#F4D03F", name: "Yellow" },
  { id: "blue", hex: "#2980B9", name: "Blue" },
  { id: "purple", hex: "#8E44AD", name: "Purple" },
  { id: "green", hex: "#27AE60", name: "Green" },
  { id: "black", hex: "#1a1a2e", name: "Black" },
  { id: "orange", hex: "#E67E22", name: "Orange" },
  { id: "teal", hex: "#1ABC9C", name: "Teal" },
];

export const ACCESSORIES = [
  { id: "none", name: "None" },
  { id: "glasses", name: "Glasses" },
  { id: "sunglasses", name: "Sunglasses" },
  { id: "bow", name: "Bow" },
  { id: "ribbon", name: "Ribbon" },
  { id: "hero_mask", name: "Hero Mask" },
  { id: "bunny_ears", name: "Bunny Ears" },
  { id: "crown", name: "Crown" },
];

const RAINBOW = ["#E74C3C", "#F1C40F", "#2ECC71", "#FF69B4", "#3498DB"];

export const DEFAULT_CONFIG = {
  skinTone: "#C67B5C",
  hairStyle: "puffs",
  hairColor: "#2C1810",
  outfitStyle: "dress",
  outfitColor: "#FFFFFF",
  accessory: "none",
  name: "Player",
};

function darken(hex, amt = 20) {
  if (!hex || hex === "rainbow") return "#1a1008";
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (n >> 16) - amt);
  const g = Math.max(0, ((n >> 8) & 0xff) - amt);
  const b = Math.max(0, (n & 0xff) - amt);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

export function lighten(hex, amt = 30) {
  if (!hex || hex === "rainbow") return "#ffffff";
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (n >> 16) + amt);
  const g = Math.min(255, ((n >> 8) & 0xff) + amt);
  const b = Math.min(255, (n & 0xff) + amt);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function hairColors(color, isRainbow) {
  if (isRainbow)
    return [RAINBOW[0], RAINBOW[1], RAINBOW[2], RAINBOW[3], RAINBOW[4]];
  return [
    color,
    lighten(color, 15),
    darken(color, 15),
    lighten(color, 25),
    darken(color, 25),
  ];
}

// ===================== HAIR STYLES =====================

function HairPuffs({ color, isRainbow }) {
  const [c1, c2, c3] = hairColors(color, isRainbow);
  return (
    <>
      <circle cx="44" cy="34" r="10" fill={c1} />
      <circle cx="42" cy="30" r="7" fill={c2} />
      <circle cx="48" cy="28" r="6" fill={c3} />
      <circle cx="76" cy="34" r="10" fill={c3} />
      <circle cx="78" cy="30" r="7" fill={c1} />
      <circle cx="72" cy="28" r="6" fill={c2} />
      <circle cx="54" cy="28" r="7" fill={c2} />
      <circle cx="60" cy="26" r="8" fill={c1} />
      <circle cx="66" cy="28" r="7" fill={c3} />
      <circle cx="50" cy="32" r="5" fill={c1} />
      <circle cx="70" cy="32" r="5" fill={c2} />
    </>
  );
}

function HairPuffsCoils({ color, isRainbow }) {
  const c = hairColors(color, isRainbow);
  return (
    <>
      <ellipse cx="38" cy="28" rx="16" ry="18" fill={c[0]} />
      <ellipse cx="35" cy="24" rx="10" ry="11" fill={c[1]} />
      <ellipse cx="42" cy="20" rx="8" ry="9" fill={c[2]} />
      <ellipse cx="33" cy="32" rx="7" ry="8" fill={c[3]} />
      <ellipse cx="40" cy="35" rx="6" ry="6" fill={c[4]} />
      <ellipse cx="82" cy="28" rx="16" ry="18" fill={c[4]} />
      <ellipse cx="85" cy="24" rx="10" ry="11" fill={c[3]} />
      <ellipse cx="78" cy="20" rx="8" ry="9" fill={c[0]} />
      <ellipse cx="87" cy="32" rx="7" ry="8" fill={c[1]} />
      <ellipse cx="80" cy="35" rx="6" ry="6" fill={c[2]} />
      <ellipse cx="60" cy="30" rx="22" ry="10" fill={darken(color, 20)} />
      <ellipse cx="60" cy="30" rx="20" ry="8" fill={darken(color, 10)} />
      <circle cx="48" cy="35" r="3.5" fill={c[0]} />
      <circle cx="47" cy="40.5" r="3" fill={c[1]} />
      <circle cx="48" cy="45.5" r="2.8" fill={c[2]} />
      <circle cx="47" cy="50" r="2.5" fill={c[3]} />
      <circle cx="72" cy="35" r="3.5" fill={c[4]} />
      <circle cx="73" cy="40.5" r="3" fill={c[0]} />
      <circle cx="72" cy="45.5" r="2.8" fill={c[1]} />
      <circle cx="73" cy="50" r="2.5" fill={c[2]} />
    </>
  );
}

function HairCoils({ color, isRainbow }) {
  const [c1, c2, c3] = hairColors(color, isRainbow);
  return (
    <>
      <ellipse cx="60" cy="28" rx="22" ry="12" fill={c1} />
      <circle cx="40" cy="32" r="4.5" fill={c1} />
      <circle cx="38" cy="38" r="4" fill={c2} />
      <circle cx="40" cy="44" r="3.5" fill={c3} />
      <circle cx="38" cy="50" r="3" fill={c1} />
      <circle cx="50" cy="30" r="4" fill={c2} />
      <circle cx="48" cy="36" r="3.5" fill={c3} />
      <circle cx="50" cy="42" r="3" fill={c1} />
      <circle cx="70" cy="30" r="4" fill={c3} />
      <circle cx="72" cy="36" r="3.5" fill={c1} />
      <circle cx="70" cy="42" r="3" fill={c2} />
      <circle cx="80" cy="32" r="4.5" fill={c2} />
      <circle cx="82" cy="38" r="4" fill={c3} />
      <circle cx="80" cy="44" r="3.5" fill={c1} />
      <circle cx="82" cy="50" r="3" fill={c2} />
    </>
  );
}

function HairLocs({ color, isRainbow }) {
  const [c1, c2, c3] = hairColors(color, isRainbow);
  return (
    <>
      <ellipse cx="60" cy="24" rx="20" ry="8" fill={c1} />
      <ellipse cx="60" cy="26" rx="18" ry="6" fill={c2} />
      <path
        d="M40 30 Q37 45 35 62 Q34 72 36 80"
        stroke={c1}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M43 28 Q41 44 40 60 Q39 72 40 82"
        stroke={c2}
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M46 27 Q44 42 43 56 Q42 68 43 78"
        stroke={c3}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M80 30 Q83 45 85 62 Q86 72 84 80"
        stroke={c1}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M77 28 Q79 44 80 60 Q81 72 80 82"
        stroke={c2}
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M74 27 Q76 42 77 56 Q78 68 77 78"
        stroke={c3}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M48 29 Q46 48 45 66 Q44 76 46 84"
        stroke={c2}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M72 29 Q74 48 75 66 Q76 76 74 84"
        stroke={c1}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </>
  );
}

function HairBraids({ color, isRainbow }) {
  const [c1, c2, c3] = hairColors(color, isRainbow);
  return (
    <>
      <path
        d="M40 42 Q38 26 48 18 Q54 12 60 16 Q66 12 72 18 Q82 26 80 42"
        fill={c1}
      />
      <path
        d="M42 42 Q38 48 42 54 Q46 60 42 66 Q38 72 42 78 Q46 84 42 90"
        stroke={c1}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M42 42 Q46 48 42 54 Q38 60 42 66 Q46 72 42 78 Q38 84 42 90"
        stroke={c2}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M78 42 Q82 48 78 54 Q74 60 78 66 Q82 72 78 78 Q74 84 78 90"
        stroke={c1}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M78 42 Q74 48 78 54 Q82 60 78 66 Q74 72 78 78 Q82 84 78 90"
        stroke={c3}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="42" cy="90" r="3" fill={c3} />
      <circle cx="78" cy="90" r="3" fill={c2} />
    </>
  );
}

function HairWavy({ color, isRainbow }) {
  const [c1, c2] = hairColors(color, isRainbow);
  return (
    <>
      {/* Hair cap - sits snug on head, not too tall */}
      <path
        d="M41 42 Q40 32 48 24 Q54 20 60 22 Q66 20 72 24 Q80 32 79 42"
        fill={c1}
      />
      {/* Left wavy strands */}
      <path
        d="M41 42 Q37 50 39 58 Q41 66 37 74 Q35 80 37 86"
        stroke={c1}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M43 42 Q39 51 41 60 Q43 68 39 76 Q37 82 39 88"
        stroke={c2}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Right wavy strands */}
      <path
        d="M79 42 Q83 50 81 58 Q79 66 83 74 Q85 80 83 86"
        stroke={c1}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M77 42 Q81 51 79 60 Q77 68 81 76 Q83 82 81 88"
        stroke={c2}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </>
  );
}

function HairStraight({ color, isRainbow }) {
  const [c1, c2] = hairColors(color, isRainbow);
  return (
    <>
      {/* Hair cap - snug on head */}
      <path
        d="M41 42 Q40 32 48 24 Q54 20 60 22 Q66 20 72 24 Q80 32 79 42"
        fill={c1}
      />
      {/* Left strands */}
      <path
        d="M40 42 L38 86"
        stroke={c1}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M43 42 L41 88"
        stroke={c2}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Right strands */}
      <path
        d="M80 42 L82 86"
        stroke={c1}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M77 42 L79 88"
        stroke={c2}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </>
  );
}

function HairBun({ color, isRainbow }) {
  const [c1, c2] = hairColors(color, isRainbow);
  return (
    <>
      <path
        d="M40 40 Q38 26 48 18 Q54 14 60 16 Q66 14 72 18 Q82 26 80 40"
        fill={c1}
      />
      <ellipse cx="60" cy="14" rx="12" ry="10" fill={c1} />
      <ellipse cx="60" cy="12" rx="8" ry="7" fill={c2} />
    </>
  );
}

function HairBuzz({ color, isRainbow }) {
  const [c1, c2] = hairColors(color, isRainbow);
  return (
    <>
      <path
        d="M41 42 Q40 30 48 22 Q54 18 60 20 Q66 18 72 22 Q80 30 79 42"
        fill={c1}
      />
      <path d="M46 28 Q52 24 58 28" stroke={c2} strokeWidth="1.5" fill="none" />
      <path d="M62 28 Q68 24 74 28" stroke={c2} strokeWidth="1.5" fill="none" />
    </>
  );
}

function HairAfroBack({ color, isRainbow }) {
  const [c1, , c3] = hairColors(color, isRainbow);
  return (
    <>
      <ellipse cx="60" cy="32" rx="32" ry="22" fill={c1} />
      <ellipse cx="34" cy="32" rx="8" ry="10" fill={c3} />
      <ellipse cx="86" cy="32" rx="8" ry="10" fill={c3} />
    </>
  );
}

function HairAfroTop({ color, isRainbow }) {
  const [c1, c2, c3] = hairColors(color, isRainbow);
  return (
    <>
      <ellipse cx="48" cy="22" rx="14" ry="12" fill={c2} />
      <ellipse cx="72" cy="22" rx="14" ry="12" fill={c3} />
      <ellipse cx="60" cy="18" rx="12" ry="12" fill={c1} />
      <ellipse cx="40" cy="30" rx="6" ry="8" fill={c3} />
      <ellipse cx="80" cy="30" rx="6" ry="8" fill={c2} />
    </>
  );
}

function renderHair(style, color) {
  const isRainbow = color === "rainbow";
  const c = isRainbow ? "#2C1810" : color;
  switch (style) {
    case "puffs":
      return <HairPuffs color={c} isRainbow={isRainbow} />;
    case "puffs_coils":
      return <HairPuffsCoils color={c} isRainbow={isRainbow} />;
    case "coils":
      return <HairCoils color={c} isRainbow={isRainbow} />;
    case "locs":
      return <HairLocs color={c} isRainbow={isRainbow} />;
    case "braids":
      return <HairBraids color={c} isRainbow={isRainbow} />;
    case "wavy":
      return <HairWavy color={c} isRainbow={isRainbow} />;
    case "straight":
      return <HairStraight color={c} isRainbow={isRainbow} />;
    case "afro":
      return null;
    case "bun":
      return <HairBun color={c} isRainbow={isRainbow} />;
    case "buzz":
      return <HairBuzz color={c} isRainbow={isRainbow} />;
    default:
      return <HairPuffs color={c} isRainbow={isRainbow} />;
  }
}

// ===================== ACCESSORIES =====================

function renderAccessory(accessory, headY, outfitColor) {
  if (!accessory || accessory === "none") return null;

  switch (accessory) {
    case "glasses":
      return (
        <>
          <circle
            cx="52"
            cy={headY}
            r="6"
            fill="none"
            stroke="#333"
            strokeWidth="1.5"
          />
          <circle
            cx="68"
            cy={headY}
            r="6"
            fill="none"
            stroke="#333"
            strokeWidth="1.5"
          />
          <line
            x1="58"
            y1={headY}
            x2="62"
            y2={headY}
            stroke="#333"
            strokeWidth="1.5"
          />
          <line
            x1="46"
            y1={headY}
            x2="42"
            y2={headY - 2}
            stroke="#333"
            strokeWidth="1.5"
          />
          <line
            x1="74"
            y1={headY}
            x2="78"
            y2={headY - 2}
            stroke="#333"
            strokeWidth="1.5"
          />
        </>
      );
    case "sunglasses":
      return (
        <>
          <rect
            x="46"
            y={headY - 4}
            width="12"
            height="8"
            rx="2"
            fill="#1a1a2e"
          />
          <rect
            x="62"
            y={headY - 4}
            width="12"
            height="8"
            rx="2"
            fill="#1a1a2e"
          />
          <line
            x1="58"
            y1={headY}
            x2="62"
            y2={headY}
            stroke="#333"
            strokeWidth="1.5"
          />
          <line
            x1="46"
            y1={headY - 1}
            x2="41"
            y2={headY - 3}
            stroke="#333"
            strokeWidth="1.5"
          />
          <line
            x1="74"
            y1={headY - 1}
            x2="79"
            y2={headY - 3}
            stroke="#333"
            strokeWidth="1.5"
          />
          <rect
            x="47"
            y={headY - 3}
            width="10"
            height="4"
            rx="1"
            fill="rgba(100,149,237,0.3)"
          />
          <rect
            x="63"
            y={headY - 3}
            width="10"
            height="4"
            rx="1"
            fill="rgba(100,149,237,0.3)"
          />
        </>
      );
    case "bow":
      return (
        <>
          <ellipse cx="52" cy="26" rx="8" ry="5" fill="#FF69B4" />
          <ellipse cx="68" cy="26" rx="8" ry="5" fill="#FF69B4" />
          <circle cx="60" cy="26" r="3" fill="#E74C3C" />
        </>
      );
    case "ribbon":
      return (
        <>
          <rect x="40" y="24" width="40" height="4" rx="2" fill="#FF69B4" />
          <path
            d="M40 26 Q34 32 30 42"
            stroke="#FF69B4"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M40 26 Q36 36 34 46"
            stroke="#E74C3C"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </>
      );
    case "hero_mask":
      return (
        <>
          <path
            d={`M42 ${headY - 4} Q50 ${headY - 7} 60 ${headY - 4} Q70 ${headY - 7} 78 ${headY - 4} L76 ${headY + 2} Q68 ${headY + 5} 60 ${headY + 2} Q52 ${headY + 5} 44 ${headY + 2} Z`}
            fill="#1a1a2e"
            opacity="0.85"
          />
          <ellipse
            cx="52"
            cy={headY - 1}
            rx="5"
            ry="4"
            fill="none"
            stroke="white"
            strokeWidth="0.8"
          />
          <ellipse
            cx="68"
            cy={headY - 1}
            rx="5"
            ry="4"
            fill="none"
            stroke="white"
            strokeWidth="0.8"
          />
        </>
      );
    case "bunny_ears":
      return (
        <>
          <ellipse
            cx="46"
            cy="12"
            rx="3.6"
            ry="9.72"
            fill="#f5e6d0"
            stroke="#ddd"
            strokeWidth="1"
          />
          <ellipse cx="46" cy="12" rx="1.58" ry="6.84" fill="#FFB6C1" />
          <ellipse
            cx="74"
            cy="12"
            rx="3.6"
            ry="9.72"
            fill="#f5e6d0"
            stroke="#ddd"
            strokeWidth="1"
          />
          <ellipse cx="74" cy="12" rx="1.58" ry="6.84" fill="#FFB6C1" />
        </>
      );
    case "crown":
      return (
        <>
          <polygon
            points="42,28 46,14 50,22 54,10 58,22 62,10 66,22 70,10 74,22 78,14 78,28"
            fill="#FFD700"
            stroke="#DAA520"
            strokeWidth="0.8"
          />
          <circle cx="54" cy="22" r="2" fill="#E74C3C" />
          <circle cx="62" cy="22" r="2" fill="#3498DB" />
          <circle cx="70" cy="22" r="2" fill="#2ECC71" />
        </>
      );
    default:
      return null;
  }
}

// ===================== OUTFITS =====================

function renderOutfit(style, color, celebrating, isToddler, skinTone) {
  const d = darken(color, 15);
  const topY = isToddler ? 82 : 72;
  const hemY = isToddler ? 148 : 142;

  if (style === "ballgown") {
    return (
      <>
        <path
          d="M60 70 Q54 72 50 80 L46 95 L38 115 L26 150 L94 150 L82 115 L74 95 L70 80 Q66 72 60 70Z"
          fill={color}
          stroke={d}
          strokeWidth="1"
        />
        <path
          d="M60 80 Q56 90 50 110 L44 135"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </>
    );
  }
  if (style === "puffy_dress") {
    return (
      <>
        {/* Little legs peeking out */}
        <line
          x1="52"
          y1="148"
          x2="50"
          y2="162"
          stroke={skinTone}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="68"
          y1="148"
          x2="70"
          y2="162"
          stroke={skinTone}
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Bodice */}
        <path
          d="M60 72 Q54 74 50 80 L48 92 L46 100 L74 100 L72 92 L70 80 Q66 74 60 72Z"
          fill={color}
          stroke={d}
          strokeWidth="0.5"
        />
        {/* Puffy skirt - big rounded shape */}
        <path
          d="M46 100 Q30 110 28 130 Q28 148 44 150 L76 150 Q92 148 92 130 Q90 110 74 100Z"
          fill={color}
          stroke={d}
          strokeWidth="1"
        />
        {/* Skirt details */}
        <path
          d="M36 120 Q48 118 60 122 Q72 118 84 120"
          fill="none"
          stroke={lighten(color, 20)}
          strokeWidth="1.5"
          opacity="0.5"
        />
        <path
          d="M32 135 Q46 132 60 136 Q74 132 88 135"
          fill="none"
          stroke={lighten(color, 20)}
          strokeWidth="1.5"
          opacity="0.4"
        />
      </>
    );
  }
  if (style === "top_shorts") {
    return (
      <>
        <path
          d="M60 108 Q50 110 46 118 L44 134 L56 134 L60 120 L64 134 L76 134 L74 118 Q70 110 60 108Z"
          fill="#1a1a1a"
          stroke="#111"
          strokeWidth="0.5"
        />
        <path
          d="M60 68 Q52 70 48 78 L46 92 L44 108 L76 108 L74 92 L72 78 Q68 70 60 68Z"
          fill={color}
          stroke={d}
          strokeWidth="0.5"
        />
      </>
    );
  }
  if (style === "top_trousers") {
    return (
      <>
        <path
          d="M60 108 Q50 110 46 116 L44 142 L56 142 L60 118 L64 142 L76 142 L74 116 Q70 110 60 108Z"
          fill="#1a1a1a"
          stroke="#111"
          strokeWidth="0.5"
        />
        <path
          d="M60 68 Q52 70 48 78 L46 92 L44 108 L76 108 L74 92 L72 78 Q68 70 60 68Z"
          fill={color}
          stroke={d}
          strokeWidth="0.5"
        />
      </>
    );
  }
  if (style === "astronaut") {
    return (
      <>
        {/* Suit body - one piece with integrated legs */}
        <path
          d="M60 68 Q50 70 46 80 L44 100 L42 118 L40 142 L52 142 L56 118 L60 110 L64 118 L68 142 L80 142 L78 118 L76 100 L74 80 Q70 70 60 68Z"
          fill="#e8e8e8"
          stroke="#ccc"
          strokeWidth="1"
        />
        {/* Boots */}
        <ellipse cx="46" cy="144" rx="7" ry="4" fill="#666" />
        <ellipse cx="74" cy="144" rx="7" ry="4" fill="#666" />
        {/* Backpack outline */}
        <rect
          x="50"
          y="78"
          width="20"
          height="24"
          rx="4"
          fill="#bbb"
          stroke="#999"
          strokeWidth="0.5"
        />
        {/* Chest panel */}
        <rect
          x="53"
          y="84"
          width="14"
          height="10"
          rx="2"
          fill={color}
          stroke={d}
          strokeWidth="0.5"
        />
        {/* Belt */}
        <rect x="42" y="106" width="36" height="3" rx="1.5" fill="#999" />
        {/* Helmet ring */}
        <ellipse
          cx="60"
          cy="62"
          rx="22"
          ry="3.5"
          fill="rgba(187,187,187,0.7)"
        />
      </>
    );
  }
  if (style === "superhero") {
    return (
      <>
        {/* Cape */}
        <path
          d={
            celebrating
              ? "M52 72 Q38 90 26 145 L94 145 Q82 90 68 72"
              : "M52 72 Q42 95 34 148 L86 148 Q78 95 68 72"
          }
          fill={color}
          stroke={d}
          strokeWidth="1"
        />
        {/* Legs in darker suit */}
        <line
          x1="54"
          y1="108"
          x2="52"
          y2="156"
          stroke={darken(color, 60)}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="66"
          y1="108"
          x2="68"
          y2="156"
          stroke={darken(color, 60)}
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Boots */}
        <ellipse cx="52" cy="158" rx="5" ry="3" fill={color} />
        <ellipse cx="68" cy="158" rx="5" ry="3" fill={color} />
        {/* Body suit - much darker than cape */}
        <path
          d="M60 68 Q52 70 48 78 L46 92 L44 108 L76 108 L74 92 L72 78 Q68 70 60 68Z"
          fill={darken(color, 60)}
          stroke={darken(color, 80)}
          strokeWidth="0.5"
        />
        {/* Belt */}
        <rect x="44" y="105" width="32" height="4" rx="2" fill="#FFD700" />
        {/* Emblem star */}
        <polygon
          points="60,80 62,86 69,86 64,90 66,96 60,92 54,96 56,90 51,86 58,86"
          fill="#FFD700"
        />
      </>
    );
  }
  if (style === "tutu") {
    return (
      <>
        {/* Legs under tutu */}
        <line
          x1="54"
          y1="120"
          x2="51"
          y2="160"
          stroke={skinTone}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="66"
          y1="120"
          x2="69"
          y2="160"
          stroke={skinTone}
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Leotard */}
        <path
          d="M60 72 Q54 74 50 80 L48 92 L46 108 L74 108 L72 92 L70 80 Q66 74 60 72Z"
          fill={color}
          stroke={d}
          strokeWidth="0.5"
        />
        {/* Tutu skirt layers */}
        <ellipse cx="60" cy="108" rx="26" ry="7" fill={color} opacity="0.8" />
        <ellipse
          cx="60"
          cy="112"
          rx="28"
          ry="7"
          fill={lighten(color, 15)}
          opacity="0.65"
        />
        <ellipse cx="60" cy="116" rx="30" ry="7" fill={color} opacity="0.5" />
        <ellipse
          cx="60"
          cy="120"
          rx="26"
          ry="5"
          fill={lighten(color, 25)}
          opacity="0.4"
        />
      </>
    );
  }
  if (style === "robot") {
    return (
      <>
        {/* Boxy robot body */}
        <rect
          x="44"
          y="68"
          width="32"
          height="40"
          rx="4"
          fill="#A0A0A0"
          stroke="#888"
          strokeWidth="1"
        />
        {/* Chest panel */}
        <rect x="50" y="74" width="20" height="14" rx="2" fill="#333" />
        {/* Lights on chest */}
        <circle cx="55" cy="79" r="2" fill={color} />
        <circle cx="60" cy="79" r="2" fill="#2ECC71" />
        <circle cx="65" cy="79" r="2" fill="#E74C3C" />
        {/* Belly button / dial */}
        <circle
          cx="60"
          cy="96"
          r="4"
          fill="#666"
          stroke="#555"
          strokeWidth="1"
        />
        <circle cx="60" cy="96" r="2" fill={color} />
        {/* Robot legs */}
        <rect
          x="48"
          y="108"
          width="8"
          height="34"
          rx="3"
          fill="#888"
          stroke="#777"
          strokeWidth="0.5"
        />
        <rect
          x="64"
          y="108"
          width="8"
          height="34"
          rx="3"
          fill="#888"
          stroke="#777"
          strokeWidth="0.5"
        />
        {/* Feet */}
        <ellipse cx="52" cy="144" rx="7" ry="3" fill="#666" />
        <ellipse cx="68" cy="144" rx="7" ry="3" fill="#666" />
        {/* Bolts */}
        <circle cx="46" cy="72" r="1.5" fill="#FFD700" />
        <circle cx="74" cy="72" r="1.5" fill="#FFD700" />
      </>
    );
  }
  // Default: dress
  return (
    <path
      d={`M60 ${topY} Q56 ${topY + 2} 54 ${topY + 8} L52 ${topY + 20} L46 ${topY + 40} L34 ${hemY} L86 ${hemY} L74 ${topY + 40} L68 ${topY + 20} L66 ${topY + 8} Q64 ${topY + 2} 60 ${topY}Z`}
      fill={color}
      stroke={d}
      strokeWidth="1"
    />
  );
}

// ===================== MAIN CHARACTER =====================

export default function CustomCharacter({
  config,
  size = 120,
  celebrating = false,
  crying = false,
  isToddler = false,
  isRobot = false,
}) {
  const {
    skinTone,
    hairStyle,
    hairColor,
    outfitStyle,
    outfitColor,
    accessory,
  } = config;
  const eyeColor =
    skinTone === "#3B1E08" || skinTone === "#572000" ? "#1a1008" : "#2C1810";
  const headY = isToddler ? 54 : 46;
  const headRx = isToddler ? 22 : 19;
  const headRy = isToddler ? 22 : 20;
  const neckY = isToddler ? 74 : 62;
  const neckH = isToddler ? 9 : 11;
  const armTopY = isToddler ? 90 : 80;
  const legTopY = isToddler ? 142 : 140;
  const isAfro = hairStyle === "afro";
  const isRainbow = hairColor === "rainbow";
  const hairC = isRainbow ? "#2C1810" : hairColor;

  // Outfits that handle their own legs
  const outfitHandlesLegs =
    outfitStyle === "ballgown" ||
    outfitStyle === "astronaut" ||
    outfitStyle === "superhero" ||
    outfitStyle === "puffy_dress" ||
    outfitStyle === "tutu" ||
    outfitStyle === "robot";
  const showGownLegs = outfitStyle === "ballgown" && !isToddler;
  const cheekColor = lighten(skinTone, 30) + "45";

  return (
    <div
      className={celebrating ? "dancing" : ""}
      style={{ width: size, height: size + 30 }}
    >
      <svg viewBox="0 0 120 170" width={size} height={size + 30}>
        {/* Legs - only for outfits that don't draw their own */}
        {showGownLegs && (
          <>
            <line
              x1="52"
              y1="148"
              x2="50"
              y2="162"
              stroke={skinTone}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="68"
              y1="148"
              x2="70"
              y2="162"
              stroke={skinTone}
              strokeWidth="4"
              strokeLinecap="round"
            />
          </>
        )}
        {!outfitHandlesLegs && (
          <>
            <line
              x1="54"
              y1={legTopY}
              x2="51"
              y2="164"
              stroke={skinTone}
              strokeWidth={isToddler ? "4.5" : "4"}
              strokeLinecap="round"
            />
            <line
              x1="66"
              y1={legTopY}
              x2="69"
              y2="164"
              stroke={skinTone}
              strokeWidth={isToddler ? "4.5" : "4"}
              strokeLinecap="round"
            />
          </>
        )}

        {/* Outfit */}
        {renderOutfit(
          outfitStyle,
          outfitColor,
          celebrating,
          isToddler,
          skinTone,
        )}

        {/* Arms */}
        <path
          d={
            celebrating
              ? `M50 ${armTopY} Q36 ${armTopY - 10} 28 ${armTopY - 20}`
              : `M50 ${armTopY} Q40 ${armTopY + 12} 35 ${armTopY + 24}`
          }
          fill="none"
          stroke={skinTone}
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d={
            celebrating
              ? `M70 ${armTopY} Q84 ${armTopY - 10} 92 ${armTopY - 20}`
              : `M70 ${armTopY} Q80 ${armTopY + 12} 85 ${armTopY + 24}`
          }
          fill="none"
          stroke={skinTone}
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        {/* Neck */}
        {isRobot ? (
          <rect x="56" y={neckY} width="8" height={neckH} rx="2" fill="#888" />
        ) : (
          <rect
            x="57"
            y={neckY}
            width="6"
            height={neckH}
            rx="3"
            fill={skinTone}
          />
        )}

        {/* Afro back */}
        {isAfro && !isRobot && (
          <HairAfroBack color={hairC} isRainbow={isRainbow} />
        )}

        {isRobot ? (
          <>
            {/* Robot head - boxy */}
            <rect
              x="40"
              y={headY - 18}
              width="40"
              height="36"
              rx="6"
              fill="#A0A0A0"
              stroke="#888"
              strokeWidth="1"
            />
            {/* Visor / screen */}
            <rect
              x="46"
              y={headY - 10}
              width="28"
              height="16"
              rx="3"
              fill="#1a2a3a"
            />
            {/* Robot eyes - glowing */}
            <circle
              cx="53"
              cy={headY - 2}
              r="3.5"
              fill={celebrating ? "#2ECC71" : "#3498DB"}
            />
            <circle
              cx="67"
              cy={headY - 2}
              r="3.5"
              fill={celebrating ? "#2ECC71" : "#3498DB"}
            />
            <circle cx="53" cy={headY - 2} r="1.5" fill="#fff" opacity="0.7" />
            <circle cx="67" cy={headY - 2} r="1.5" fill="#fff" opacity="0.7" />
            {/* Mouth - LED strip */}
            {crying ? (
              <path
                d={`M53 ${headY + 8} Q60 ${headY + 4} 67 ${headY + 8}`}
                fill="none"
                stroke="#E74C3C"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : celebrating ? (
              <path
                d={`M53 ${headY + 5} Q60 ${headY + 11} 67 ${headY + 5}`}
                fill="none"
                stroke="#2ECC71"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <line
                x1="53"
                y1={headY + 7}
                x2="67"
                y2={headY + 7}
                stroke="#3498DB"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
            {/* Antenna */}
            <line
              x1="60"
              y1={headY - 18}
              x2="60"
              y2={headY - 26}
              stroke="#888"
              strokeWidth="2"
            />
            <circle cx="60" cy={headY - 28} r="3" fill="#E74C3C" />
            {/* Ear bolts */}
            <circle cx="41" cy={headY} r="3" fill="#FFD700" />
            <circle cx="79" cy={headY} r="3" fill="#FFD700" />
          </>
        ) : (
          <>
            {/* Head */}
            {isToddler ? (
              <circle cx="60" cy={headY} r={headRx} fill={skinTone} />
            ) : (
              <ellipse
                cx="60"
                cy={headY}
                rx={headRx}
                ry={headRy}
                fill={skinTone}
              />
            )}

            {/* Hair */}
            {isAfro ? (
              <HairAfroTop color={hairC} isRainbow={isRainbow} />
            ) : (
              renderHair(hairStyle, hairColor)
            )}

            {/* Face */}
            {crying ? (
              <>
                <path
                  d={`M51 ${headY - 2} Q53 ${headY + 1} 55 ${headY - 2}`}
                  fill="none"
                  stroke={eyeColor}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d={`M65 ${headY - 2} Q67 ${headY + 1} 69 ${headY - 2}`}
                  fill="none"
                  stroke={eyeColor}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d={`M55 ${headY + 10} Q60 ${headY + 6} 65 ${headY + 10}`}
                  fill="none"
                  stroke={eyeColor}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <line
                  x1="52"
                  y1={headY + 3}
                  x2="50"
                  y2={headY + 10}
                  stroke="#5BC0EB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="68"
                  y1={headY + 3}
                  x2="70"
                  y2={headY + 10}
                  stroke="#5BC0EB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <>
                <circle cx="53" cy={headY} r="2.5" fill={eyeColor} />
                <circle cx="67" cy={headY} r="2.5" fill={eyeColor} />
                <path
                  d={
                    celebrating
                      ? `M53 ${headY + 9} Q60 ${headY + 18} 67 ${headY + 9}`
                      : `M55 ${headY + 10} Q60 ${headY + 16} 65 ${headY + 10}`
                  }
                  fill="none"
                  stroke={eyeColor}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </>
            )}

            {/* Cheeks */}
            <circle
              cx={isToddler ? 45 : 47}
              cy={headY + 6}
              r={isToddler ? 4 : 3.5}
              fill={cheekColor}
            />
            <circle
              cx={isToddler ? 75 : 73}
              cy={headY + 6}
              r={isToddler ? 4 : 3.5}
              fill={cheekColor}
            />

            {/* Accessory */}
            {renderAccessory(accessory, headY, outfitColor)}

            {/* Astronaut helmet visor */}
            {outfitStyle === "astronaut" && (
              <ellipse
                cx="60"
                cy={headY}
                rx={headRx + 4}
                ry={headRy + 4}
                fill="none"
                stroke="#bbb"
                strokeWidth="2.5"
              />
            )}
          </>
        )}
      </svg>
    </div>
  );
}
