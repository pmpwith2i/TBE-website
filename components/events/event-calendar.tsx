"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  CALENDAR_EVENTS,
  EVENT_FILTERS,
  type EventType,
  type CalendarEvent,
} from "@/constants/events";

const KICKER_COLOR: Record<NonNullable<CalendarEvent["kickerColor"]>, string> = {
  amber: "var(--tbe-amber)",
  italian: "var(--tbe-italian)",
};

function Row({ event }: { event: CalendarEvent }) {
  const inner = (
    <>
      <div className="event-date">
        <span className="day">{event.day}</span>
        <span className="month">{event.month}</span>
      </div>
      <div>
        <div
          className="event-type"
          style={
            event.kickerColor
              ? { color: KICKER_COLOR[event.kickerColor] }
              : undefined
          }
        >
          {event.kicker}
        </div>
        <div className="event-title">{event.title}</div>
      </div>
      <div className="event-place">{event.place}</div>
      <div className="event-cta">
        {event.cta}{" "}
        <span className="arrow" aria-hidden>
          →
        </span>
      </div>
    </>
  );

  if (event.href.startsWith("/")) {
    return (
      <Link href={event.href} className="event-row">
        {inner}
      </Link>
    );
  }
  return (
    <a href={event.href} className="event-row">
      {inner}
    </a>
  );
}

/**
 * Filterable season calendar. `header` (the section label + title) is passed
 * in from the server page; the pills sit to its right and drive the list.
 */
export function EventCalendar({ header }: { header: ReactNode }) {
  const [filter, setFilter] = useState<EventType | "all">("all");
  const events =
    filter === "all"
      ? CALENDAR_EVENTS
      : CALENDAR_EVENTS.filter((e) => e.type === filter);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 24,
          marginBottom: 40,
        }}
      >
        {header}
        <div className="pills">
          {EVENT_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              className={`pill${filter === f.value ? " active" : ""}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        {events.map((event) => (
          <Row key={`${event.day}-${event.month}-${event.title}`} event={event} />
        ))}
      </div>
    </>
  );
}
