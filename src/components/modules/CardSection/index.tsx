"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  Layers,
  Zap,
  ShieldCheck,
  BarChart3,
  Globe,
  Cpu,
} from "lucide-react";

const cards = [
  {
    id: 1,
    icon: Zap,
    badge: "Core",
    title: "Instant Deployment",
    description:
      "End-to-end encryption, SOC 2 Type II certified, with granular role-based access controls baked in.",
    stat: "99.99%",
    statLabel: "Uptime SLA",
    meta: "Updated 2h ago",
    accent: "#a78bfa",
    glow: "rgba(167,139,250,0.15)",
    border: "rgba(167,139,250,0.2)",
    featured: false,
  },
  {
    id: 2,
    icon: ShieldCheck,
    badge: "Security",
    title: "Instant Deployment",
    description:
      "End-to-end encryption, SOC 2 Type II certified, with granular role-based access controls baked in.",
    stat: "256-bit",
    statLabel: "AES Encryption",
    meta: "ISO 27001 certified",
    accent: "#34d399",
    glow: "rgba(52,211,153,0.15)",
    border: "rgba(52,211,153,0.2)",
    featured: true,
  },
  {
    id: 3,
    icon: BarChart3,
    badge: "Analytics",
    title: "Instant Deployment",
    description:
      "End-to-end encryption, SOC 2 Type II certified, with granular role-based access controls baked in.",
    stat: "< 50ms",
    statLabel: "Query latency",
    meta: "12M events/day",
    accent: "#fb923c",
    glow: "rgba(251,146,60,0.15)",
    border: "rgba(251,146,60,0.2)",
    featured: false,
  },
];

export default function CardSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#080808] py-24 text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-1/4 h-[400px] w-[600px] rounded-full bg-violet-900/10 blur-[100px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[300px] w-[500px] rounded-full bg-cyan-900/10 blur-[100px]" />
      </div>

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-600">
            What is inside
          </p>
          <h2
            className="mb-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl"
            style={{ fontFamily: "'Georgia','Times New Roman',serif" }}
          >
            Everything you need.{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Nothing you dont.
            </span>
          </h2>
          <p className="text-sm leading-relaxed text-zinc-500">
            A complete platform built for teams who refuse to compromise on
            speed, security, or scale.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Card
                key={card.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border bg-white/[0.02] text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderColor: card.featured
                    ? card.border
                    : "rgba(255,255,255,0.06)",
                  boxShadow: card.featured
                    ? `0 0 40px -10px ${card.glow}, inset 0 1px 0 ${card.border}`
                    : "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    card.border;
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    `0 20px 50px -12px ${card.glow}, inset 0 1px 0 ${card.border}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    card.featured ? card.border : "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    card.featured
                      ? `0 0 40px -10px ${card.glow}, inset 0 1px 0 ${card.border}`
                      : "none";
                }}
              >
                {/* Featured ribbon */}
                {card.featured && (
                  <div
                    className="absolute right-4 top-0 h-px w-16 rounded-full"
                    style={{
                      background: `linear-gradient(to right, transparent, ${card.accent})`,
                    }}
                  />
                )}

                <CardHeader className="pb-3">
                  {/* Icon + badge row */}
                  <div className="mb-4 flex items-start justify-between">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        background: `${card.glow}`,
                        border: `1px solid ${card.border}`,
                      }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: card.accent }}
                      />
                    </div>

                    <CardAction>
                      <Badge
                        variant="outline"
                        className="border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-400"
                      >
                        {card.badge}
                      </Badge>
                    </CardAction>
                  </div>

                  <CardTitle
                    className="text-base font-bold text-white"
                    style={{ fontFamily: "'Georgia',serif" }}
                  >
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-zinc-500">
                    {card.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 pb-4">
                  {/* Stat block */}
                  <div
                    className="flex items-center gap-3 rounded-xl p-3"
                    style={{
                      background: `${card.glow}`,
                      border: `1px solid ${card.border}`,
                    }}
                  >
                    <div>
                      <p
                        className="text-xl font-black leading-none"
                        style={{ color: card.accent }}
                      >
                        {card.stat}
                      </p>
                      <p className="mt-0.5 text-[11px] text-zinc-600">
                        {card.statLabel}
                      </p>
                    </div>
                    <div
                      className="ml-auto h-6 w-px"
                      style={{ background: card.border }}
                    />
                    <p className="text-[11px] text-zinc-600">{card.meta}</p>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1.5 rounded-lg px-3 text-xs font-medium text-zinc-500 transition-all hover:bg-white/5 hover:text-white group-hover:translate-x-0.5"
                    style={
                      { "--hover-color": card.accent } as React.CSSProperties
                    }
                  >
                    Learn more
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
