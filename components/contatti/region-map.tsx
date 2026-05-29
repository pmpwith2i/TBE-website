/** Stylized SVG map of the Teramo region (Gran Sasso ↔ Adriatic). Static. */
export function RegionMap() {
  return (
    <div
      style={{
        background: "var(--tbe-black)",
        aspectRatio: "16 / 10",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <svg
        viewBox="0 0 800 500"
        style={{ width: "100%", height: "100%", display: "block" }}
        role="img"
        aria-label="Mappa stilizzata della sede TBE a Teramo"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="800" height="500" fill="url(#grid)" />

        {/* Roads */}
        <path
          d="M 0,400 Q 200,380 400,360 T 800,300"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="2"
        />
        <path
          d="M 0,250 Q 250,260 500,240 T 800,200"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1.5"
        />
        <path
          d="M 100,500 L 380,260 L 600,180 L 800,120"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
        />
        <path
          d="M 200,500 L 420,280 L 540,200"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1.5"
        />

        {/* Contour lines (mountains) */}
        <g stroke="rgba(200,16,46,0.25)" strokeWidth="1" fill="none">
          <ellipse cx="600" cy="180" rx="150" ry="60" />
          <ellipse cx="600" cy="180" rx="100" ry="40" />
          <ellipse cx="600" cy="180" rx="60" ry="22" />
        </g>
        <text
          x="640"
          y="160"
          fontFamily="var(--font-mono)"
          fontSize="10"
          fill="rgba(255,255,255,0.5)"
          letterSpacing="0.15em"
        >
          GRAN SASSO
        </text>
        <text
          x="660"
          y="175"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fill="rgba(200,16,46,0.7)"
        >
          2912 m
        </text>

        {/* Coastline hint */}
        <path
          d="M 0,100 Q 50,140 80,180 Q 120,240 100,320 Q 80,420 130,500"
          fill="none"
          stroke="rgba(243,156,18,0.4)"
          strokeWidth="1.5"
          strokeDasharray="3 4"
        />
        <text
          x="20"
          y="80"
          fontFamily="var(--font-mono)"
          fontSize="10"
          fill="rgba(243,156,18,0.7)"
          letterSpacing="0.15em"
        >
          MARE ADRIATICO
        </text>

        {/* Marker — Teramo */}
        <g transform="translate(420, 280)">
          <circle r="22" fill="rgba(200,16,46,0.2)" />
          <circle r="14" fill="rgba(200,16,46,0.4)" />
          <circle r="7" fill="#C8102E" />
          <line x1="0" y1="-25" x2="0" y2="-50" stroke="white" strokeWidth="1" />
          <text
            x="14"
            y="-30"
            fontFamily="var(--font-display)"
            fontStyle="italic"
            fontWeight="900"
            fontSize="22"
            fill="white"
          >
            TBE · SEDE
          </text>
          <text
            x="14"
            y="-14"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fill="rgba(255,255,255,0.6)"
            letterSpacing="0.15em"
          >
            42°39&apos;N 13°42&apos;E
          </text>
        </g>

        {/* Compass */}
        <g transform="translate(740, 60)">
          <text
            x="0"
            y="0"
            fontFamily="var(--font-display)"
            fontStyle="italic"
            fontWeight="900"
            fontSize="18"
            fill="white"
          >
            N
          </text>
          <line x1="6" y1="-12" x2="6" y2="6" stroke="rgba(200,16,46,1)" strokeWidth="1.5" />
          <polygon points="6,-14 3,-8 9,-8" fill="#C8102E" />
        </g>
      </svg>
    </div>
  );
}
