import { ButtonArrow } from "@/components/site/buttons";
import type { EventLocationMap, EventMapPoint } from "@/constants/events";

function buildGoogleMapsEmbedUrl(map: EventLocationMap) {
  if (map.embedUrl) {
    return map.embedUrl;
  }

  const primaryPoint = map.points[0];
  const center = map.center ?? primaryPoint?.coordinates;

  if (!center) {
    return undefined;
  }

  const query = primaryPoint
    ? `${primaryPoint.coordinates.lat},${primaryPoint.coordinates.lng}`
    : `${center.lat},${center.lng}`;
  const params = new URLSearchParams({
    q: query,
    z: String(map.zoom ?? 15),
    output: "embed",
  });

  return `https://www.google.com/maps?${params.toString()}`;
}

function EventMapPointItem({ point }: { point: EventMapPoint }) {
  return (
    <li className="border-t border-white/10 pt-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
        {point.label}
      </span>
      <h4 className="mt-2 font-display text-[clamp(24px,3vw,36px)] font-black italic uppercase leading-[0.92] text-white">
        {point.title}
      </h4>
      {point.detail ? (
        <p className="mt-3 text-sm leading-relaxed text-white/68">
          {point.detail}
        </p>
      ) : null}
      <a
        className="group mt-5 inline-flex items-center gap-2.5 border-b-2 border-accent pb-2 font-display text-sm font-extrabold italic uppercase tracking-[0.1em] text-white transition-colors hover:text-accent"
        href={point.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Apri su Google Maps
        <ButtonArrow />
      </a>
    </li>
  );
}

export function EventLocationMaps({
  maps,
}: {
  maps: readonly EventLocationMap[];
}) {
  if (maps.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-6">
      {maps.map((map) => {
        const embedUrl = buildGoogleMapsEmbedUrl(map);
        const primaryPoint = map.points[0];
        const hasSinglePoint = map.points.length === 1 && primaryPoint;

        return (
          <article
            className="overflow-hidden border border-white/10 bg-tbe-ink"
            key={map.id}
          >
            {embedUrl ? (
              <div className="relative h-[min(58vh,520px)] min-h-[320px] bg-[#101012]">
                <iframe
                  className="absolute inset-0 h-full w-full border-0 grayscale-[18%] contrast-[1.04] saturate-[0.9]"
                  src={embedUrl}
                  title={`Mappa ${map.label}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <div className="pointer-events-none absolute inset-0 border border-white/5" />
              </div>
            ) : null}

            <div className="grid gap-7 border-t border-white/10 p-6 min-[861px]:grid-cols-[minmax(0,1fr)_minmax(280px,0.72fr)]">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  {map.label}
                </span>
                <h3 className="mt-3 font-display text-[clamp(30px,4vw,52px)] font-black italic uppercase leading-[0.9] text-white">
                  {map.title}
                </h3>
                {map.intro ? (
                  <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-white/70">
                    {map.intro}
                  </p>
                ) : null}
              </div>

              {hasSinglePoint ? (
                <div className="border-t border-white/10 pt-4">
                  <a
                    className="group inline-flex items-center gap-2.5 border-b-2 border-accent pb-2 font-display text-sm font-extrabold italic uppercase tracking-[0.1em] text-white transition-colors hover:text-accent"
                    href={primaryPoint.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apri su Google Maps
                    <ButtonArrow />
                  </a>
                </div>
              ) : (
                <ol className="m-0 grid list-none gap-4 p-0">
                  {map.points.map((point) => (
                    <EventMapPointItem key={point.id} point={point} />
                  ))}
                </ol>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
