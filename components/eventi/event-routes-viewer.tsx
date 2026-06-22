"use client";

import { useEffect, useMemo, useState } from "react";
import type { EventRoute } from "@/constants/events";
import { cn } from "@/lib/utils";

type TrackPoint = {
  lat: number;
  lon: number;
};

type ViewerState =
  | { status: "idle"; points: TrackPoint[]; message: string }
  | { status: "ready"; routeId: string; points: TrackPoint[]; message: string }
  | { status: "error"; routeId: string; points: TrackPoint[]; message: string };

const VIEWBOX_WIDTH = 1000;
const VIEWBOX_HEIGHT = 560;
const VIEWBOX_PADDING = 60;

function parseGpx(xmlText: string): TrackPoint[] {
  const document = new DOMParser().parseFromString(xmlText, "application/xml");

  if (document.querySelector("parsererror")) {
    throw new Error("GPX non valido");
  }

  const trackNodes = Array.from(document.querySelectorAll("trkpt"));
  const routeNodes = Array.from(document.querySelectorAll("rtept"));
  const nodes = trackNodes.length > 0 ? trackNodes : routeNodes;

  return nodes.flatMap((node) => {
    const lat = Number(node.getAttribute("lat"));
    const lon = Number(node.getAttribute("lon"));

    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      return [];
    }

    return [{ lat, lon }];
  });
}

function projectPoints(points: readonly TrackPoint[]) {
  const lats = points.map((point) => point.lat);
  const lons = points.map((point) => point.lon);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);
  const latRange = Math.max(maxLat - minLat, 0.000001);
  const lonRange = Math.max(maxLon - minLon, 0.000001);
  const drawableWidth = VIEWBOX_WIDTH - VIEWBOX_PADDING * 2;
  const drawableHeight = VIEWBOX_HEIGHT - VIEWBOX_PADDING * 2;

  return points
    .map((point) => {
      const x = VIEWBOX_PADDING + ((point.lon - minLon) / lonRange) * drawableWidth;
      const y =
        VIEWBOX_HEIGHT -
        VIEWBOX_PADDING -
        ((point.lat - minLat) / latRange) * drawableHeight;

      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function initialState(): ViewerState {
  return {
    status: "idle",
    points: [],
    message: "",
  };
}

export function EventRoutesViewer({ routes }: { routes: readonly EventRoute[] }) {
  const [selectedRouteId, setSelectedRouteId] = useState(routes[0]?.id ?? "");
  const [viewer, setViewer] = useState<ViewerState>(initialState);

  const selectedRoute = useMemo(
    () => routes.find((route) => route.id === selectedRouteId) ?? routes[0],
    [routes, selectedRouteId],
  );

  useEffect(() => {
    if (!selectedRoute) {
      return;
    }

    const controller = new AbortController();

    fetch(selectedRoute.gpxUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("missing");
        }

        return response.text();
      })
      .then((xmlText) => {
        const points = parseGpx(xmlText);

        if (points.length < 2) {
          throw new Error("empty");
        }

        setViewer({
          status: "ready",
          routeId: selectedRoute.id,
          points,
          message: "Tracciato GPX caricato",
        });
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setViewer({
          status: "error",
          routeId: selectedRoute.id,
          points: [],
          message:
            "Tracciato GPX in aggiornamento. Il link e' pronto: appena il file viene pubblicato comparira qui.",
        });
      });

    return () => controller.abort();
  }, [selectedRoute]);

  if (!selectedRoute) {
    return null;
  }

  const activeViewer =
    viewer.status !== "idle" && viewer.routeId === selectedRoute.id
      ? viewer
      : {
          status: "loading" as const,
          points: [],
          message: "Caricamento tracciato GPX...",
        };
  const polyline =
    activeViewer.status === "ready" ? projectPoints(activeViewer.points) : "";

  return (
    <div className="overflow-hidden border border-white/10 bg-tbe-ink">
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 p-3">
        {routes.map((route) => {
          const isSelected = route.id === selectedRoute.id;

          return (
            <button
              key={route.id}
              type="button"
              className={cn(
                "cursor-pointer border border-white/15 px-4 py-2.5 font-display text-sm font-extrabold italic uppercase tracking-[0.1em] transition-colors",
                isSelected
                  ? "bg-accent text-white"
                  : "bg-white/5 text-white/75 hover:bg-white/10 hover:text-white",
              )}
              aria-pressed={isSelected}
              onClick={() => setSelectedRouteId(route.id)}
            >
              {route.name}
            </button>
          );
        })}

        <a
          className="ml-auto inline-flex items-center px-4 py-2.5 font-display text-sm font-extrabold italic uppercase tracking-[0.1em] text-tbe-red! transition hover:bg-tbe-paper"
          href={selectedRoute.gpxUrl}
          download
        >
          Scarica GPX
        </a>
      </div>

      <div className="grid min-[901px]:grid-cols-[minmax(0,1fr)_280px]">
        <div className="relative min-h-[360px] bg-[#0b0b0d] p-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px]" />
          {activeViewer.status === "ready" ? (
            <svg
              className="relative h-full min-h-[320px] w-full"
              role="img"
              aria-label={`Anteprima GPX: ${selectedRoute.name}`}
              viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
            >
              <polyline
                points={polyline}
                fill="none"
                stroke="rgba(255,255,255,0.18)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="34"
              />
              <polyline
                points={polyline}
                fill="none"
                stroke="#c8102e"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="18"
              />
              <circle cx={polyline.split(" ")[0]?.split(",")[0]} cy={polyline.split(" ")[0]?.split(",")[1]} r="20" fill="#ffffff" />
              <circle
                cx={polyline.split(" ").at(-1)?.split(",")[0]}
                cy={polyline.split(" ").at(-1)?.split(",")[1]}
                r="20"
                fill="#f2b705"
              />
            </svg>
          ) : (
            <div
              className="relative flex min-h-[320px] items-center justify-center px-6 text-center text-white/70"
              role="status"
            >
              <p className="max-w-[36ch] text-sm leading-relaxed">
                {activeViewer.message}
              </p>
            </div>
          )}
        </div>

        <aside className="border-t border-white/10 p-6 min-[901px]:border-l min-[901px]:border-t-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Tracciato
          </span>
          <h3 className="mt-3 font-display text-[clamp(28px,4vw,44px)] font-black italic uppercase leading-[0.9]">
            {selectedRoute.name}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            {selectedRoute.description}
          </p>
          <dl className="mt-6 grid gap-4 border-t border-white/10 pt-5">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                GPX
              </dt>
              <dd className="mt-1 break-all text-sm text-white/80">
                {selectedRoute.gpxUrl}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
