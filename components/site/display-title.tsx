import { Fragment } from "react";

/** A single run of heading text with an optional treatment. */
export interface TitleSegment {
  text: string;
  /** Red accent color. */
  accent?: boolean;
  /** Outlined (stroked) text — used over dark / red backgrounds. */
  outline?: boolean;
  /** Plain <em> emphasis (still italic via the display face). */
  em?: boolean;
}

export type TitleLine = TitleSegment[];

const OUTLINE_STYLE: React.CSSProperties = {
  WebkitTextStroke: "2px var(--tbe-paper)",
  color: "transparent",
};

function Segment({ seg }: { seg: TitleSegment }) {
  if (seg.outline) return <span style={OUTLINE_STYLE}>{seg.text}</span>;
  if (seg.accent)
    return <span style={{ color: "var(--accent)" }}>{seg.text}</span>;
  if (seg.em) return <em>{seg.text}</em>;
  return <>{seg.text}</>;
}

/**
 * Renders the design's multi-line display headings from constants data.
 * Each entry in `lines` becomes one visual line (separated by <br/>),
 * and each segment carries its own accent/outline/em treatment.
 */
export function DisplayTitle({
  lines,
  className = "display display-l",
  as: Tag = "h2",
  style,
}: {
  lines: TitleLine[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  style?: React.CSSProperties;
}) {
  return (
    <Tag className={className} style={style}>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line.map((seg, j) => (
            <Segment key={j} seg={seg} />
          ))}
        </Fragment>
      ))}
    </Tag>
  );
}
