/**
 * The "— /02 — Chi siamo" style label with the red bar, used to head
 * most sections. On dark pages pass `light` so the text reads correctly.
 */
export function SectionLabel({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="section-label">
      <span className="bar" />
      <span style={light ? { color: "rgba(255,255,255,0.7)" } : undefined}>
        {children}
      </span>
    </div>
  );
}

/** The "/01 — Teramo" eyebrow with the numbered prefix. */
export function Eyebrow({
  num,
  children,
  light = false,
  style,
}: {
  num?: string;
  children: React.ReactNode;
  light?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="eyebrow"
      style={{ ...(light ? { color: "rgba(255,255,255,0.7)" } : {}), ...style }}
    >
      {num ? <span className="num">{num}</span> : null} {children}
    </div>
  );
}
