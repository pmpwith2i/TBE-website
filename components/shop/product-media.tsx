import Image from "next/image";
import type { ProductMedia, ColorToken, ArtLine } from "@/constants/shop";

const COLOR: Record<ColorToken, string> = {
  black: "var(--tbe-black)",
  white: "white",
  accent: "var(--accent)",
  smoke: "var(--tbe-smoke)",
  amber: "var(--tbe-amber)",
};

function lineStyle(line: ArtLine): React.CSSProperties {
  if (line.strokeColor) {
    return {
      fontSize: line.size,
      WebkitTextStroke: `1.5px ${line.strokeColor}`,
      color: "transparent",
    };
  }
  return { fontSize: line.size, color: COLOR[line.color] };
}

/** Renders a product's media: either a real photo or a typographic art tile. */
export function ProductMedia({ media, name }: { media: ProductMedia; name: string }) {
  if (media.kind === "image") {
    const contain = media.contain;
    return (
      <div
        className="product-media"
        style={{
          background: media.bg,
          padding: media.padding,
          ...(contain
            ? { display: "flex", alignItems: "center", justifyContent: "center" }
            : {}),
        }}
      >
        {contain ? (
          <Image
            src={media.src}
            alt={media.alt || name}
            width={600}
            height={600}
            sizes="(max-width: 900px) 50vw, 33vw"
            style={{
              maxWidth: "80%",
              maxHeight: "80%",
              width: "auto",
              height: "auto",
              objectFit: "contain",
            }}
          />
        ) : (
          <Image
            src={media.src}
            alt={media.alt || name}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        )}
      </div>
    );
  }

  // Art tile
  const frame = media.frame;
  return (
    <div
      className="product-media"
      style={{ background: media.background, padding: media.padding }}
    >
      <div className="product-art" style={{ padding: media.padding }}>
        {frame ? (
          <div
            style={{
              width: "60%",
              aspectRatio: "1",
              background: frame === "circle-dark" ? "var(--tbe-black)" : "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: frame === "circle-dark" ? "absolute" : undefined,
              inset: frame === "circle-dark" ? "20%" : undefined,
            }}
          >
            <div>
              {media.lines.map((line, i) => (
                <div key={i} style={lineStyle(line)}>
                  {line.text}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {media.lines.map((line, i) => (
              <div key={i} style={lineStyle(line)}>
                {line.text}
              </div>
            ))}
            {media.bar ? (
              <div
                style={{
                  height: 4,
                  background: "var(--accent)",
                  width: "60%",
                  margin: "4px auto",
                }}
              />
            ) : null}
            {media.caption ? (
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  marginTop: 12,
                  color: "var(--tbe-smoke)",
                  fontStyle: "normal",
                  fontWeight: 400,
                }}
              >
                {media.caption}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
