import { Fragment } from "react";

export function Marquee({ items }: { items: string[] }) {
  const run = (
    <span className="inline-flex items-center gap-14">
      {items.map((item, i) => (
        <Fragment key={i}>
          {item}
          <span className="inline-block size-2.5 rounded-full bg-accent" />{" "}
        </Fragment>
      ))}
    </span>
  );

  return (
    <div className="overflow-hidden border-y border-white/10 bg-tbe-black py-[18px] text-tbe-paper">
      <div className="flex gap-14 whitespace-nowrap font-display text-[22px] font-extrabold italic uppercase tracking-[0.06em] [animation:marquee_40s_linear_infinite] motion-reduce:animate-none">
        {run}
        {run}
      </div>
    </div>
  );
}
