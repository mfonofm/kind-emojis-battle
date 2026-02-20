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
  { id: "ballgown", name: "Ball Gown" },
  { id: "top_shorts", name: "Top & Shorts" },
  { id: "top_trousers", name: "Top & Trousers" },
  { id: "astronaut", name: "Astronaut" },
  { id: "superhero", name: "Superhero Cape" },
  { id: "tutu", name: "Tutu" },
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

const RAINBOW = ["#E74C3C", "#F1C40F", "#2ECC71", "#FF69B4", "#3498DB"];

export const DEFAULT_CONFIG = {
  skinTone: "#C67B5C",
  hairStyle: "puffs",
  hairColor: "#2C1810",
  outfitStyle: "dress",
  outfitColor: "#FFFFFF",
  name: "Player",
};

export const PRESETS = [
  {
    id: "gabrielle",
    name: "Gabrielle",
    config: {
      skinTone: "#C67B5C",
      hairStyle: "puffs_coils",
      hairColor: "rainbow",
      outfitStyle: "dress",
      outfitColor: "#FFFFFF",
      name: "Gabrielle",
    },
    color: "#FF69B4",
  },
  {
    id: "marcie",
    name: "Marcie",
    config: {
      skinTone: "#C67B5C",
      hairStyle: "puffs",
      hairColor: "#1a1008",
      outfitStyle: "dress",
      outfitColor: "#F4D03F",
      name: "Marcie",
    },
    color: "#F4D03F",
    isToddler: true,
  },
  {
    id: "dada",
    name: "Dada",
    config: {
      skinTone: "#572000",
      hairStyle: "locs",
      hairColor: "#111111",
      outfitStyle: "top_shorts",
      outfitColor: "#2980B9",
      name: "Dada",
    },
    color: "#2980B9",
  },
  {
    id: "mama",
    name: "Mama",
    config: {
      skinTone: "#F0D0B4",
      hairStyle: "wavy",
      hairColor: "#3B2314",
      outfitStyle: "ballgown",
      outfitColor: "#8E44AD",
      name: "Mama",
    },
    color: "#8E44AD",
  },
];

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

// Rainbow-aware color helpers: returns [c1, c2, c3] for any style
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
      {/* Hair cap */}
      <path
        d="M40 42 Q38 26 48 16 Q54 10 60 14 Q66 10 72 16 Q82 26 80 42"
        fill={c1}
      />
      {/* Left braid - zigzag pattern */}
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
      {/* Right braid */}
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
      {/* Braid ties */}
      <circle cx="42" cy="90" r="3" fill={c3} />
      <circle cx="78" cy="90" r="3" fill={c2} />
    </>
  );
}

function HairWavy({ color, isRainbow }) {
  const [c1, c2] = hairColors(color, isRainbow);
  return (
    <>
      {/* Hair cap on top of head */}
      <path
        d="M40 44 Q38 28 48 18 Q54 12 60 16 Q66 12 72 18 Q82 28 80 44"
        fill={c1}
      />
      {/* Left wavy strands - flowing curves */}
      <path
        d="M40 44 Q36 52 38 60 Q40 68 36 76 Q34 82 36 88"
        stroke={c1}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M42 44 Q38 53 40 62 Q42 70 38 78 Q36 84 38 90"
        stroke={c2}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Right wavy strands */}
      <path
        d="M80 44 Q84 52 82 60 Q80 68 84 76 Q86 82 84 88"
        stroke={c1}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M78 44 Q82 53 80 62 Q78 70 82 78 Q84 84 82 90"
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
      {/* Hair cap */}
      <path
        d="M40 44 Q38 28 48 18 Q54 12 60 16 Q66 12 72 18 Q82 28 80 44"
        fill={c1}
      />
      {/* Left straight strands */}
      <path
        d="M39 44 L37 88"
        stroke={c1}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M42 44 L40 90"
        stroke={c2}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Right straight strands */}
      <path
        d="M81 44 L83 88"
        stroke={c1}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M78 44 L80 90"
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
        d="M40 42 Q38 28 48 20 Q54 16 60 18 Q66 16 72 20 Q82 28 80 42"
        fill={c1}
      />
      {/* Subtle texture */}
      <path d="M46 28 Q52 22 58 26" stroke={c2} strokeWidth="1.5" fill="none" />
      <path d="M62 26 Q68 22 74 28" stroke={c2} strokeWidth="1.5" fill="none" />
    </>
  );
}

// Afro: split into back (behind head) and top (above head)
function HairAfroBack({ color, isRainbow }) {
  const [c1, , c3] = hairColors(color, isRainbow);
  return (
    <>
      {/* Main volume behind head - kept above neck line */}
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
      return null; // handled separately
    case "bun":
      return <HairBun color={c} isRainbow={isRainbow} />;
    case "buzz":
      return <HairBuzz color={c} isRainbow={isRainbow} />;
    default:
      return <HairPuffs color={c} isRainbow={isRainbow} />;
  }
}

// ===================== OUTFITS =====================

function renderOutfit(style, color, celebrating, isToddler) {
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
        {/* Legs in white suit */}
        <line
          x1="54"
          y1="132"
          x2="52"
          y2="158"
          stroke="#ddd"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="66"
          y1="132"
          x2="68"
          y2="158"
          stroke="#ddd"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Boots */}
        <ellipse cx="52" cy="160" rx="5" ry="3" fill="#666" />
        <ellipse cx="68" cy="160" rx="5" ry="3" fill="#666" />
        {/* Suit body */}
        <path
          d="M60 68 Q50 70 46 80 L44 100 L42 132 L78 132 L76 100 L74 80 Q70 70 60 68Z"
          fill="#e8e8e8"
          stroke="#ccc"
          strokeWidth="1"
        />
        {/* Suit details */}
        <rect
          x="52"
          y="82"
          width="16"
          height="12"
          rx="3"
          fill={color}
          stroke={d}
          strokeWidth="0.5"
        />
        {/* Backpack */}
        <rect
          x="48"
          y="75"
          width="24"
          height="30"
          rx="4"
          fill="#bbb"
          stroke="#999"
          strokeWidth="0.5"
        />
        <rect
          x="52"
          y="82"
          width="16"
          height="12"
          rx="3"
          fill={color}
          stroke={d}
          strokeWidth="0.5"
        />
        {/* Helmet ring */}
        <ellipse cx="60" cy="60" rx="22" ry="4" fill="#bbb" />
      </>
    );
  }
  if (style === "superhero") {
    return (
      <>
        {/* Cape - flows behind */}
        <path
          d={
            celebrating
              ? "M52 72 Q40 85 28 140 L92 140 Q80 85 68 72"
              : "M52 72 Q44 90 36 145 L84 145 Q76 90 68 72"
          }
          fill={color}
          stroke={d}
          strokeWidth="1"
          opacity="0.9"
        />
        {/* Body suit */}
        <path
          d="M60 68 Q52 70 48 78 L46 92 L44 108 L76 108 L74 92 L72 78 Q68 70 60 68Z"
          fill={darken(color, 40)}
          stroke={darken(color, 60)}
          strokeWidth="0.5"
        />
        {/* Trunks */}
        <path
          d="M60 108 Q50 110 46 118 L44 132 L56 132 L60 118 L64 132 L76 132 L74 118 Q70 110 60 108Z"
          fill={color}
          stroke={d}
          strokeWidth="0.5"
        />
        {/* Belt */}
        <rect x="44" y="106" width="32" height="4" rx="2" fill="#FFD700" />
        {/* Emblem */}
        <polygon
          points="60,78 63,86 71,86 65,91 67,99 60,95 53,99 55,91 49,86 57,86"
          fill="#FFD700"
        />
      </>
    );
  }
  if (style === "tutu") {
    return (
      <>
        {/* Leotard top */}
        <path
          d="M60 72 Q54 74 50 80 L48 92 L46 100 L74 100 L72 92 L70 80 Q66 74 60 72Z"
          fill={color}
          stroke={d}
          strokeWidth="0.5"
        />
        {/* Tutu skirt - ruffled layers */}
        <ellipse cx="60" cy="102" rx="28" ry="8" fill={color} opacity="0.7" />
        <ellipse
          cx="60"
          cy="106"
          rx="30"
          ry="8"
          fill={lighten(color, 20)}
          opacity="0.6"
        />
        <ellipse cx="60" cy="110" rx="32" ry="8" fill={color} opacity="0.5" />
        <ellipse
          cx="60"
          cy="114"
          rx="28"
          ry="6"
          fill={lighten(color, 30)}
          opacity="0.4"
        />
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
}) {
  const { skinTone, hairStyle, hairColor, outfitStyle, outfitColor } = config;
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

  // Outfit-specific leg visibility
  const hideLegs =
    outfitStyle === "ballgown" ||
    outfitStyle === "astronaut" ||
    outfitStyle === "superhero";
  const showGownLegs = outfitStyle === "ballgown" && !isToddler;

  // Cheek color based on skin tone
  const cheekColor = lighten(skinTone, 30) + "45";

  return (
    <div
      className={celebrating ? "dancing" : ""}
      style={{ width: size, height: size + 30 }}
    >
      <svg viewBox="0 0 120 170" width={size} height={size + 30}>
        {/* Legs */}
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
        {!hideLegs && (
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
        {renderOutfit(outfitStyle, outfitColor, celebrating, isToddler)}

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
        <rect
          x="57"
          y={neckY}
          width="6"
          height={neckH}
          rx="3"
          fill={skinTone}
        />

        {/* Afro back - BEFORE head so it sits behind */}
        {isAfro && <HairAfroBack color={hairC} isRainbow={isRainbow} />}

        {/* Head */}
        {isToddler ? (
          <circle cx="60" cy={headY} r={headRx} fill={skinTone} />
        ) : (
          <ellipse cx="60" cy={headY} rx={headRx} ry={headRy} fill={skinTone} />
        )}

        {/* Hair - afro top AFTER head, others also after head */}
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

        {/* Astronaut helmet visor (drawn last, over face) */}
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
      </svg>
    </div>
  );
}
