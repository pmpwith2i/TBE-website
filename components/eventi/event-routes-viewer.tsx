"use client";

import type {
  CircleMarker,
  FeatureGroup,
  Layer,
  LatLngExpression,
  Map as LeafletMap,
} from "leaflet";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { EventRoute } from "@/constants/events";
import { cn } from "@/lib/utils";

type LeafletModule = typeof import("leaflet");

type TrackPoint = {
  lat: number;
  lon: number;
  ele?: number;
  time?: number;
};

type ProfilePoint = {
  pointIndex: number;
  distanceMeters: number;
  elevationMeters: number;
};

type RouteMetrics = {
  distanceMeters: number;
  elevationGainMeters: number;
  elevationLossMeters: number;
  elevationMinMeters?: number;
  elevationMaxMeters?: number;
  pointCount: number;
  profile: ProfilePoint[];
};

type RouteData =
  | { status: "idle" }
  | { status: "ready"; routeId: string; points: TrackPoint[]; metrics: RouteMetrics }
  | { status: "error"; routeId: string; message: string };

type ActiveRouteData =
  | { status: "loading"; message: string }
  | Extract<RouteData, { status: "ready" | "error" }>;

const ELEVATION_NOISE_THRESHOLD_METERS = 3;
const CHART_WIDTH = 1000;
const CHART_HEIGHT = 260;
const CHART_PADDING = {
  top: 20,
  right: 28,
  bottom: 36,
  left: 58,
};

const numberFormatter = new Intl.NumberFormat("it-IT", {
  maximumFractionDigits: 1,
});

const integerFormatter = new Intl.NumberFormat("it-IT", {
  maximumFractionDigits: 0,
});

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function formatDistance(meters: number) {
  if (meters >= 1000) {
    return `${numberFormatter.format(meters / 1000)} km`;
  }

  return `${integerFormatter.format(meters)} m`;
}

function formatMeters(meters?: number) {
  if (!Number.isFinite(meters)) {
    return "-";
  }

  return `${integerFormatter.format(Math.round(meters ?? 0))} m`;
}

function getChildText(element: Element, localName: string) {
  return Array.from(element.children).find((child) => child.localName === localName)
    ?.textContent;
}

function parseGpx(xmlText: string): TrackPoint[] {
  const document = new DOMParser().parseFromString(xmlText, "application/xml");

  if (document.querySelector("parsererror")) {
    throw new Error("GPX non valido");
  }

  const trackNodes = Array.from(document.getElementsByTagNameNS("*", "trkpt"));
  const routeNodes = Array.from(document.getElementsByTagNameNS("*", "rtept"));
  const nodes = trackNodes.length > 0 ? trackNodes : routeNodes;

  return nodes.flatMap((node) => {
    const lat = Number(node.getAttribute("lat"));
    const lon = Number(node.getAttribute("lon"));
    const eleText = getChildText(node, "ele");
    const timeText = getChildText(node, "time");
    const ele = eleText ? Number(eleText) : undefined;
    const time = timeText ? Date.parse(timeText) : undefined;

    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      return [];
    }

    return [
      {
        lat,
        lon,
        ele: Number.isFinite(ele) ? ele : undefined,
        time: Number.isFinite(time) ? time : undefined,
      },
    ];
  });
}

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

function distanceBetweenMeters(a: TrackPoint, b: TrackPoint) {
  const earthRadiusMeters = 6371000;
  const deltaLat = toRadians(b.lat - a.lat);
  const deltaLon = toRadians(b.lon - a.lon);
  const latA = toRadians(a.lat);
  const latB = toRadians(b.lat);
  const haversine =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(latA) * Math.cos(latB) * Math.sin(deltaLon / 2) ** 2;

  return (
    2 *
    earthRadiusMeters *
    Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
  );
}

function computeMetrics(points: readonly TrackPoint[]): RouteMetrics {
  let distanceMeters = 0;
  let elevationGainMeters = 0;
  let elevationLossMeters = 0;
  let elevationMinMeters = Number.POSITIVE_INFINITY;
  let elevationMaxMeters = Number.NEGATIVE_INFINITY;
  const profile: ProfilePoint[] = [];

  points.forEach((point, index) => {
    if (index > 0) {
      distanceMeters += distanceBetweenMeters(points[index - 1], point);
    }

    if (Number.isFinite(point.ele)) {
      const elevationMeters = point.ele ?? 0;
      elevationMinMeters = Math.min(elevationMinMeters, elevationMeters);
      elevationMaxMeters = Math.max(elevationMaxMeters, elevationMeters);
      profile.push({
        pointIndex: index,
        distanceMeters,
        elevationMeters,
      });

      const previousElevation = points[index - 1]?.ele;
      if (index > 0 && Number.isFinite(previousElevation)) {
        const delta = elevationMeters - (previousElevation ?? elevationMeters);

        if (Math.abs(delta) >= ELEVATION_NOISE_THRESHOLD_METERS) {
          if (delta > 0) {
            elevationGainMeters += delta;
          } else {
            elevationLossMeters += Math.abs(delta);
          }
        }
      }
    }
  });

  return {
    distanceMeters,
    elevationGainMeters,
    elevationLossMeters,
    elevationMinMeters: Number.isFinite(elevationMinMeters)
      ? elevationMinMeters
      : undefined,
    elevationMaxMeters: Number.isFinite(elevationMaxMeters)
      ? elevationMaxMeters
      : undefined,
    pointCount: points.length,
    profile,
  };
}

function findNearestProfilePoint(
  profile: readonly ProfilePoint[],
  distanceMeters: number,
) {
  if (profile.length === 0) {
    return undefined;
  }

  let low = 0;
  let high = profile.length - 1;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (profile[mid].distanceMeters < distanceMeters) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  const before = profile[Math.max(0, low - 1)];
  const after = profile[low];

  if (!before) {
    return after;
  }

  if (!after) {
    return before;
  }

  return Math.abs(before.distanceMeters - distanceMeters) <
    Math.abs(after.distanceMeters - distanceMeters)
    ? before
    : after;
}

function buildMarkerHtml(label: string, color: string) {
  return `<span style="display:grid;place-items:center;width:34px;height:34px;border-radius:999px;background:${color};border:3px solid white;box-shadow:0 12px 26px rgba(0,0,0,.38);color:white;font:800 11px/1 system-ui,sans-serif;">${label}</span>`;
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-white/10 pt-4">
      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
        {label}
      </dt>
      <dd className="mt-1 font-display text-[clamp(24px,3vw,34px)] font-extrabold italic uppercase leading-none text-white">
        {value}
      </dd>
    </div>
  );
}

function ElevationChart({
  metrics,
  hoverIndex,
  onHoverIndexChange,
}: {
  metrics: RouteMetrics;
  hoverIndex: number | null;
  onHoverIndexChange: (index: number | null) => void;
}) {
  const chart = useMemo(() => {
    const profile = metrics.profile;
    const drawableWidth = CHART_WIDTH - CHART_PADDING.left - CHART_PADDING.right;
    const drawableHeight = CHART_HEIGHT - CHART_PADDING.top - CHART_PADDING.bottom;
    const minElevation = metrics.elevationMinMeters ?? 0;
    const maxElevation = metrics.elevationMaxMeters ?? minElevation + 1;
    const elevationRange = Math.max(maxElevation - minElevation, 1);
    const distanceRange = Math.max(metrics.distanceMeters, 1);

    const xForDistance = (distanceMeters: number) =>
      CHART_PADDING.left + (distanceMeters / distanceRange) * drawableWidth;
    const yForElevation = (elevationMeters: number) =>
      CHART_PADDING.top +
      drawableHeight -
      ((elevationMeters - minElevation) / elevationRange) * drawableHeight;
    const linePath = profile
      .map((point, index) => {
        const command = index === 0 ? "M" : "L";

        return `${command}${xForDistance(point.distanceMeters).toFixed(1)} ${yForElevation(point.elevationMeters).toFixed(1)}`;
      })
      .join(" ");
    const areaPath =
      profile.length > 0
        ? `${linePath} L${xForDistance(profile.at(-1)?.distanceMeters ?? 0).toFixed(1)} ${CHART_HEIGHT - CHART_PADDING.bottom} L${CHART_PADDING.left} ${CHART_HEIGHT - CHART_PADDING.bottom} Z`
        : "";

    return {
      profile,
      drawableWidth,
      linePath,
      areaPath,
      xForDistance,
      yForElevation,
    };
  }, [metrics]);

  const hoverProfilePoint =
    hoverIndex === null
      ? undefined
      : chart.profile.find((point) => point.pointIndex === hoverIndex);

  function updateHoverFromClientX(clientX: number, element: SVGSVGElement) {
    const bounds = element.getBoundingClientRect();
    const x = ((clientX - bounds.left) / bounds.width) * CHART_WIDTH;
    const relativeX = clamp(
      x - CHART_PADDING.left,
      0,
      chart.drawableWidth,
    );
    const distanceMeters =
      (relativeX / chart.drawableWidth) * metrics.distanceMeters;
    const nearest = findNearestProfilePoint(chart.profile, distanceMeters);

    onHoverIndexChange(nearest?.pointIndex ?? null);
  }

  function handleMove(event: ReactMouseEvent<SVGSVGElement>) {
    updateHoverFromClientX(event.clientX, event.currentTarget);
  }

  if (chart.profile.length < 2) {
    return (
      <div className="border-t border-white/10 p-6 text-sm text-white/65">
        Profilo altimetrico non disponibile nel file GPX.
      </div>
    );
  }

  return (
    <div className="border-t border-white/10 bg-[#101012] p-5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            Profilo altimetrico
          </span>
          <h4 className="mt-1 font-display text-2xl font-black italic uppercase leading-none">
            Dislivello e quota
          </h4>
        </div>
        {hoverProfilePoint ? (
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
            {formatDistance(hoverProfilePoint.distanceMeters)} ·{" "}
            {formatMeters(hoverProfilePoint.elevationMeters)}
          </div>
        ) : null}
      </div>

      <svg
        className="h-[230px] w-full touch-none overflow-visible"
        role="img"
        aria-label="Profilo altimetrico del tracciato GPX"
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        onMouseMove={handleMove}
        onMouseLeave={() => onHoverIndexChange(null)}
        onTouchMove={(event) => {
          const touch = event.touches[0];

          if (!touch) {
            return;
          }

          updateHoverFromClientX(touch.clientX, event.currentTarget);
        }}
        onTouchEnd={() => onHoverIndexChange(null)}
      >
        {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
          const x = CHART_PADDING.left + tick * chart.drawableWidth;

          return (
            <g key={tick}>
              <line
                x1={x}
                x2={x}
                y1={CHART_PADDING.top}
                y2={CHART_HEIGHT - CHART_PADDING.bottom}
                stroke="rgba(255,255,255,0.08)"
              />
              <text
                x={x}
                y={CHART_HEIGHT - 8}
                fill="rgba(255,255,255,0.48)"
                fontSize="22"
                textAnchor="middle"
              >
                {formatDistance(metrics.distanceMeters * tick)}
              </text>
            </g>
          );
        })}

        <line
          x1={CHART_PADDING.left}
          x2={CHART_WIDTH - CHART_PADDING.right}
          y1={CHART_HEIGHT - CHART_PADDING.bottom}
          y2={CHART_HEIGHT - CHART_PADDING.bottom}
          stroke="rgba(255,255,255,0.18)"
        />
        <path d={chart.areaPath} fill="rgba(200,16,46,0.22)" />
        <path
          d={chart.linePath}
          fill="none"
          stroke="#c8102e"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8"
        />

        {hoverProfilePoint ? (
          <g>
            <line
              x1={chart.xForDistance(hoverProfilePoint.distanceMeters)}
              x2={chart.xForDistance(hoverProfilePoint.distanceMeters)}
              y1={CHART_PADDING.top}
              y2={CHART_HEIGHT - CHART_PADDING.bottom}
              stroke="rgba(255,255,255,0.6)"
              strokeDasharray="8 8"
            />
            <circle
              cx={chart.xForDistance(hoverProfilePoint.distanceMeters)}
              cy={chart.yForElevation(hoverProfilePoint.elevationMeters)}
              r="13"
              fill="#f2b705"
              stroke="#ffffff"
              strokeWidth="5"
            />
          </g>
        ) : null}
      </svg>
    </div>
  );
}

export function EventRoutesViewer({ routes }: { routes: readonly EventRoute[] }) {
  const [selectedRouteId, setSelectedRouteId] = useState(routes[0]?.id ?? "");
  const [routeData, setRouteData] = useState<RouteData>({ status: "idle" });
  const [mapReady, setMapReady] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const leafletRef = useRef<LeafletModule | null>(null);
  const routeLayerRef = useRef<FeatureGroup | null>(null);
  const hoverMarkerRef = useRef<CircleMarker | null>(null);

  const selectedRoute = useMemo(
    () => routes.find((route) => route.id === selectedRouteId) ?? routes[0],
    [routes, selectedRouteId],
  );

  const activeData = useMemo<ActiveRouteData>(
    () =>
      routeData.status !== "idle" && routeData.routeId === selectedRoute?.id
        ? routeData
        : {
            status: "loading",
            message: "Caricamento tracciato GPX...",
          },
    [routeData, selectedRoute?.id],
  );

  useEffect(() => {
    let cancelled = false;
    let resizeFrame = 0;

    async function bootMap() {
      const leaflet = await import("leaflet");

      if (cancelled || !mapContainerRef.current || mapRef.current) {
        return;
      }

      leafletRef.current = leaflet;

      const map = leaflet.map(mapContainerRef.current, {
        attributionControl: true,
        preferCanvas: true,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      leaflet
        .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        })
        .addTo(map);

      mapRef.current = map;
      resizeFrame = requestAnimationFrame(() => {
        map.invalidateSize();
        setMapReady(true);
      });
    }

    bootMap();

    return () => {
      cancelled = true;
      cancelAnimationFrame(resizeFrame);
      routeLayerRef.current?.remove();
      hoverMarkerRef.current?.remove();
      mapRef.current?.remove();
      routeLayerRef.current = null;
      hoverMarkerRef.current = null;
      mapRef.current = null;
      leafletRef.current = null;
    };
  }, []);

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

        setRouteData({
          status: "ready",
          routeId: selectedRoute.id,
          points,
          metrics: computeMetrics(points),
        });
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setRouteData({
          status: "error",
          routeId: selectedRoute.id,
          message:
            "Non riesco a caricare questo GPX. Controlla che il file sia pubblicato nella cartella assets/tracciati.",
        });
      });

    return () => controller.abort();
  }, [selectedRoute]);

  useEffect(() => {
    if (
      !mapReady ||
      activeData.status !== "ready" ||
      !leafletRef.current ||
      !mapRef.current
    ) {
      return;
    }

    const leaflet = leafletRef.current;
    const map = mapRef.current;
    const latLngs: LatLngExpression[] = activeData.points.map((point) => [
      point.lat,
      point.lon,
    ]);
    const start = latLngs[0];
    const finish = latLngs.at(-1);

    routeLayerRef.current?.remove();
    hoverMarkerRef.current?.remove();
    hoverMarkerRef.current = null;

    const shadow = leaflet.polyline(latLngs, {
      color: "#ffffff",
      interactive: false,
      lineCap: "round",
      lineJoin: "round",
      opacity: 0.42,
      smoothFactor: 1,
      weight: 11,
    });
    const routeLine = leaflet.polyline(latLngs, {
      color: "#c8102e",
      interactive: true,
      lineCap: "round",
      lineJoin: "round",
      opacity: 0.98,
      smoothFactor: 1,
      weight: 5,
    });
    const layers: Layer[] = [shadow, routeLine];

    if (start) {
      layers.push(
        leaflet.marker(start, {
          icon: leaflet.divIcon({
            className: "",
            html: buildMarkerHtml("S", "#008c45"),
            iconAnchor: [17, 17],
            iconSize: [34, 34],
          }),
          interactive: false,
        }),
      );
    }

    if (finish) {
      layers.push(
        leaflet.marker(finish, {
          icon: leaflet.divIcon({
            className: "",
            html: buildMarkerHtml("F", "#f39c12"),
            iconAnchor: [17, 17],
            iconSize: [34, 34],
          }),
          interactive: false,
        }),
      );
    }

    const group = leaflet.featureGroup(layers).addTo(map);
    routeLayerRef.current = group;
    map.fitBounds(group.getBounds(), {
      maxZoom: 15,
      padding: [32, 32],
    });

    return () => {
      group.remove();
      if (routeLayerRef.current === group) {
        routeLayerRef.current = null;
      }
    };
  }, [activeData, mapReady]);

  const hoverPoint =
    activeData.status === "ready" && hoverIndex !== null
      ? activeData.points[hoverIndex]
      : undefined;

  useEffect(() => {
    if (!mapReady || !leafletRef.current || !mapRef.current) {
      return;
    }

    if (!hoverPoint) {
      hoverMarkerRef.current?.remove();
      hoverMarkerRef.current = null;
      return;
    }

    const leaflet = leafletRef.current;
    const map = mapRef.current;
    const latLng: LatLngExpression = [hoverPoint.lat, hoverPoint.lon];

    if (!hoverMarkerRef.current) {
      hoverMarkerRef.current = leaflet.circleMarker(latLng, {
        color: "#ffffff",
        fillColor: "#f2b705",
        fillOpacity: 1,
        interactive: false,
        opacity: 1,
        radius: 8,
        weight: 3,
      });
    } else {
      hoverMarkerRef.current.setLatLng(latLng);
    }

    if (!map.hasLayer(hoverMarkerRef.current)) {
      hoverMarkerRef.current.addTo(map);
    }
  }, [hoverPoint, mapReady]);

  if (!selectedRoute) {
    return null;
  }

  const metrics = activeData.status === "ready" ? activeData.metrics : undefined;

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
              onClick={() => {
                setSelectedRouteId(route.id);
                setHoverIndex(null);
              }}
            >
              {route.name}
            </button>
          );
        })}

        <a
          className="ml-auto inline-flex items-center bg-white px-4 py-2.5 font-display text-sm font-extrabold italic uppercase tracking-[0.1em] text-tbe-red transition hover:bg-tbe-paper"
          href={selectedRoute.gpxUrl}
          download
        >
          Scarica GPX
        </a>
      </div>

      <div className="grid min-[1001px]:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <div className="relative h-[min(68vh,560px)] min-h-[390px] bg-[#101012]">
            <div ref={mapContainerRef} className="absolute inset-0" />

            {activeData.status !== "ready" ? (
              <div
                className="absolute inset-0 z-[500] flex items-center justify-center bg-tbe-black/70 px-6 text-center backdrop-blur-sm"
                role="status"
              >
                <p className="max-w-[38ch] text-sm leading-relaxed text-white/75">
                  {activeData.message}
                </p>
              </div>
            ) : null}
          </div>

          {metrics ? (
            <ElevationChart
              metrics={metrics}
              hoverIndex={hoverIndex}
              onHoverIndexChange={setHoverIndex}
            />
          ) : null}
        </div>

        <aside className="border-t border-white/10 p-6 min-[1001px]:border-l min-[1001px]:border-t-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Tracciato
          </span>
          <h3 className="mt-3 font-display text-[clamp(28px,4vw,44px)] font-black italic uppercase leading-[0.9]">
            {selectedRoute.name}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            {selectedRoute.description}
          </p>

          {metrics ? (
            <dl className="mt-7 grid gap-4">
              <MetricCard
                label="Distanza"
                value={formatDistance(metrics.distanceMeters)}
              />
              <MetricCard
                label="Dislivello +"
                value={formatMeters(metrics.elevationGainMeters)}
              />
              <MetricCard
                label="Dislivello -"
                value={formatMeters(metrics.elevationLossMeters)}
              />
              <MetricCard
                label="Quota min/max"
                value={`${formatMeters(metrics.elevationMinMeters)} / ${formatMeters(metrics.elevationMaxMeters)}`}
              />
              <MetricCard
                label="Punti GPX"
                value={integerFormatter.format(metrics.pointCount)}
              />
            </dl>
          ) : null}

          <div className="mt-7 border-t border-white/10 pt-5">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
              File
            </dt>
            <dd className="mt-2 break-all text-xs leading-relaxed text-white/70">
              {selectedRoute.gpxUrl}
            </dd>
          </div>
        </aside>
      </div>
    </div>
  );
}
