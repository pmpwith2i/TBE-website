import { CRONOSCALATA } from "@/constants/events";

const P = CRONOSCALATA.route.profile;

/** Static altimetry profile SVG, labels driven by constants. */
export function Altimetry() {
  return (
    <svg
      viewBox="0 0 1200 280"
      style={{ width: "100%", height: "auto", display: "block" }}
      preserveAspectRatio="none"
      role="img"
      aria-label="Profilo altimetrico della cronoscalata"
    >
      <defs>
        <linearGradient id="climb2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#C8102E" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#7A0A1C" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <g stroke="rgba(255,255,255,0.08)" strokeWidth="1">
        <line x1="0" y1="240" x2="1200" y2="240" />
        <line x1="0" y1="180" x2="1200" y2="180" />
        <line x1="0" y1="120" x2="1200" y2="120" />
        <line x1="0" y1="60" x2="1200" y2="60" />
      </g>
      <path
        d="M 20,240 C 100,235 180,220 280,200 C 380,180 460,150 560,130 C 660,110 720,95 820,70 C 920,55 1000,45 1100,40 L 1180,38 L 1180,260 L 20,260 Z"
        fill="url(#climb2)"
        stroke="#C8102E"
        strokeWidth="2"
      />
      <g
        fontFamily="var(--font-mono)"
        fontSize="11"
        fill="rgba(255,255,255,0.6)"
        letterSpacing="0.1em"
      >
        {P.gradients.map((g) => (
          <text key={g.label} x={g.x} y={g.y}>
            {g.label}
          </text>
        ))}
      </g>
      <g
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill="rgba(255,255,255,0.4)"
        letterSpacing="0.1em"
      >
        {P.kmMarks.map((m) => (
          <text key={m.label} x={m.x} y="275">
            {m.label}
          </text>
        ))}
      </g>
      <circle cx="20" cy="240" r="5" fill="#C8102E" />
      <circle cx="1180" cy="38" r="5" fill="#F39C12" />
      <text
        x="36"
        y="245"
        fontFamily="var(--font-display)"
        fontStyle="italic"
        fontWeight="800"
        fontSize="14"
        fill="white"
      >
        {P.start}
      </text>
      <text
        x="1180"
        y="28"
        fontFamily="var(--font-display)"
        fontStyle="italic"
        fontWeight="800"
        fontSize="14"
        fill="white"
        textAnchor="end"
      >
        {P.end}
      </text>
    </svg>
  );
}
