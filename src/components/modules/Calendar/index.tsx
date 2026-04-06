"use client";

import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Clock,
  MapPin,
  Users,
  Plus,
  Sparkles,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Event {
  id: number;
  title: string;
  time: string;
  location: string;
  attendees: number;
  tag: string;
  tagColor: string;
  dotColor: string;
}

// ─── Event Data ───────────────────────────────────────────────────────────────

const eventsByDate: Record<string, Event[]> = {
  [fmt(today(0))]: [
    {
      id: 1,
      title: "Design System Review",
      time: "09:00 – 10:30 AM",
      location: "Room Orion",
      attendees: 6,
      tag: "Design",
      tagColor: "border-violet-500/30 bg-violet-500/10 text-violet-400",
      dotColor: "#a78bfa",
    },
    {
      id: 2,
      title: "Quarterly Roadmap Sync",
      time: "02:00 – 03:00 PM",
      location: "Zoom · remote",
      attendees: 12,
      tag: "Planning",
      tagColor: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
      dotColor: "#22d3ee",
    },
  ],
  [fmt(today(1))]: [
    {
      id: 3,
      title: "Engineering Standup",
      time: "10:00 – 10:20 AM",
      location: "Slack Huddle",
      attendees: 8,
      tag: "Engineering",
      tagColor: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
      dotColor: "#34d399",
    },
  ],
  [fmt(today(2))]: [
    {
      id: 4,
      title: "Investor Update Call",
      time: "11:00 AM – 12:00 PM",
      location: "Google Meet",
      attendees: 4,
      tag: "Finance",
      tagColor: "border-amber-500/30 bg-amber-500/10 text-amber-400",
      dotColor: "#fbbf24",
    },
    {
      id: 5,
      title: "Brand Identity Workshop",
      time: "03:00 – 05:00 PM",
      location: "Studio B",
      attendees: 9,
      tag: "Design",
      tagColor: "border-violet-500/30 bg-violet-500/10 text-violet-400",
      dotColor: "#a78bfa",
    },
  ],
  [fmt(today(5))]: [
    {
      id: 6,
      title: "Product Launch Rehearsal",
      time: "01:00 – 02:30 PM",
      location: "Main Stage",
      attendees: 20,
      tag: "Launch",
      tagColor: "border-rose-500/30 bg-rose-500/10 text-rose-400",
      dotColor: "#fb7185",
    },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function today(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d;
}

function fmt(d: Date) {
  return d.toISOString().split("T")[0];
}

function fmtDisplay(d: Date) {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

const dotDates = Object.keys(eventsByDate).map((s) => new Date(s));

// ─── Section ──────────────────────────────────────────────────────────────────

export default function CalendarSection() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const key = date ? fmt(date) : "";
  const events: Event[] = eventsByDate[key] ?? [];

  return (
    <section className="relative w-full overflow-hidden bg-[#080808] py-24 text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-[500px] w-[600px] rounded-full bg-violet-900/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[300px] w-[400px] rounded-full bg-cyan-900/8 blur-[100px]" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-600">
              Schedule
            </p>
            <h2
              className="text-4xl font-black leading-tight tracking-tight sm:text-5xl"
              style={{ fontFamily: "'Georgia','Times New Roman',serif" }}
            >
              Your{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Calendar
              </span>
            </h2>
          </div>
          <Button
            size="sm"
            className="h-9 gap-2 self-start rounded-xl bg-violet-600 px-4 text-xs font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:bg-violet-500 sm:self-auto"
          >
            <Plus className="h-3.5 w-3.5" />
            New Event
          </Button>
        </div>

        {/* Main layout */}
        <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
          {/* ── Calendar picker ── */}
          <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-1 backdrop-blur-sm">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              modifiers={{ hasEvent: dotDates }}
              modifiersClassNames={{
                hasEvent: "has-event",
              }}
              className="rounded-xl p-3 [--rdp-accent-color:theme(colors.violet.500)] [--rdp-background-color:theme(colors.violet.500/0.15)]"
              classNames={{
                months: "flex flex-col",
                month: "space-y-3",
                caption: "flex justify-center relative items-center px-2 py-1",
                caption_label: "text-sm font-semibold text-white",
                nav: "flex items-center gap-1",
                nav_button:
                  "h-7 w-7 rounded-lg border border-white/[0.08] bg-white/[0.03] text-zinc-400 hover:bg-white/[0.07] hover:text-white transition-colors flex items-center justify-center",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse",
                head_row: "flex mb-1",
                head_cell:
                  "text-zinc-600 w-9 text-[11px] font-semibold uppercase tracking-wider text-center",
                row: "flex w-full mt-1",
                cell: "h-9 w-9 text-center text-sm relative",
                day: "h-9 w-9 rounded-xl text-sm text-zinc-400 hover:bg-white/[0.06] hover:text-white transition-colors font-medium",
                day_selected:
                  "bg-violet-600 text-white hover:bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.4)] font-bold",
                day_today:
                  "text-violet-400 font-bold border border-violet-500/40",
                day_outside: "text-zinc-700 opacity-50",
                day_disabled: "text-zinc-700 opacity-30",
              }}
            />

            {/* Dot legend */}
            <div className="mx-3 mb-3 mt-1 flex items-center gap-2 rounded-xl border border-white/[0.04] bg-white/[0.02] px-3 py-2">
              <Sparkles className="h-3 w-3 text-violet-400" />
              <p className="text-[11px] text-zinc-600">
                Highlighted dates have scheduled events
              </p>
            </div>
          </div>

          {/* ── Event panel ── */}
          <div className="flex flex-col gap-4">
            {/* Date header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  {date ? fmtDisplay(date) : "Select a date"}
                </h3>
                <p className="text-xs text-zinc-600">
                  {events.length > 0
                    ? `${events.length} event${events.length > 1 ? "s" : ""} scheduled`
                    : "No events scheduled"}
                </p>
              </div>
              {events.length > 0 && (
                <Badge
                  variant="outline"
                  className="border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-[11px] font-bold tabular-nums text-violet-400"
                >
                  {events.length}
                </Badge>
              )}
            </div>

            {/* Events list */}
            <div className="flex flex-col gap-3">
              {events.length > 0 ? (
                events.map((event) => (
                  <div
                    key={event.id}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-200 hover:border-white/[0.1] hover:bg-white/[0.04] cursor-pointer"
                  >
                    {/* Left accent bar */}
                    <div
                      className="absolute left-0 top-0 h-full w-[3px] rounded-l-2xl"
                      style={{ background: event.dotColor }}
                    />

                    <div className="ml-2 flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 ${event.tagColor}`}
                          >
                            {event.tag}
                          </Badge>
                        </div>

                        <h4 className="mb-2.5 text-sm font-bold text-white leading-snug">
                          {event.title}
                        </h4>

                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2 text-[12px] text-zinc-500">
                            <Clock
                              className="h-3 w-3 shrink-0"
                              style={{ color: event.dotColor }}
                            />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-2 text-[12px] text-zinc-500">
                            <MapPin
                              className="h-3 w-3 shrink-0"
                              style={{ color: event.dotColor }}
                            />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-2 text-[12px] text-zinc-500">
                            <Users
                              className="h-3 w-3 shrink-0"
                              style={{ color: event.dotColor }}
                            />
                            {event.attendees} attendees
                          </div>
                        </div>
                      </div>

                      <ChevronRight className="h-4 w-4 shrink-0 text-zinc-700 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-400 mt-1" />
                    </div>
                  </div>
                ))
              ) : (
                /* Empty state */
                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/[0.06] bg-white/[0.01] py-16 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03]">
                    <Plus className="h-5 w-5 text-zinc-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-500">
                      No events here
                    </p>
                    <p className="mt-1 text-xs text-zinc-700">
                      Pick another date or create a new event
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-1 h-8 gap-1.5 rounded-xl border-white/[0.08] bg-white/[0.03] text-xs text-zinc-400 hover:bg-white/[0.07] hover:text-white"
                  >
                    <Plus className="h-3 w-3" />
                    Add event
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dot styles for event-marked days */}
      <style>{`
        .has-event::after {
          content: '';
          display: block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #a78bfa;
          margin: 2px auto 0;
        }
      `}</style>
    </section>
  );
}
