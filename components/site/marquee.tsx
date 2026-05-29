import { Fragment } from "react";

/**
 * Infinite scrolling marquee strip. The track is duplicated so the
 * CSS `translateX(-50%)` loop is seamless.
 */
export function Marquee({ items }: { items: string[] }) {
  const run = (
    <span>
      {items.map((item, i) => (
        <Fragment key={i}>
          {item} <span className="dot" />{" "}
        </Fragment>
      ))}
    </span>
  );

  return (
    <div className="marquee">
      <div className="marquee-track">
        {run}
        {run}
      </div>
    </div>
  );
}
