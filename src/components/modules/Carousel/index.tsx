"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const cards = [
  {
    id: 1,
    category: "Design",
    title: "Spatial Interface Design",
    description:
      "Exploring the boundary between physical and digital through layered glass morphism and depth-first UI architecture.",
    author: "Mira Okonkwo",
    role: "Lead Designer, Vercel",
    rating: 5,
    accent: "from-violet-500 to-fuchsia-500",
    glow: "rgba(139,92,246,0.25)",
  },
  {
    id: 2,
    category: "Engineering",
    title: "Zero-Latency Data Pipelines",
    description:
      "How we cut p99 latency from 400ms to 12ms by rethinking our entire streaming infrastructure from the ground up.",
    author: "Theo Hartmann",
    role: "Staff Engineer, Stripe",
    rating: 5,
    accent: "from-cyan-400 to-sky-600",
    glow: "rgba(34,211,238,0.2)",
  },
  {
    id: 3,
    category: "Product",
    title: "Radical Simplicity",
    description:
      "The counterintuitive truth about feature reduction: removing 60% of our product's surface area tripled retention.",
    author: "Yuki Tanaka",
    role: "CPO, Linear",
    rating: 5,
    accent: "from-amber-400 to-orange-500",
    glow: "rgba(251,191,36,0.2)",
  },
  {
    id: 4,
    category: "Culture",
    title: "Async-First Leadership",
    description:
      "Running a 200-person fully distributed team across 14 time zones — the systems, rituals, and tools we rely on.",
    author: "Sofia Reyes",
    role: "CEO, Loom",
    rating: 5,
    accent: "from-emerald-400 to-teal-600",
    glow: "rgba(52,211,153,0.2)",
  },
  {
    id: 5,
    category: "Research",
    title: "Attention Is Not Enough",
    description:
      "A critical look at transformer limitations and why the next wave of AI will require fundamentally new architectures.",
    author: "Priya Nair",
    role: "Research Scientist, Anthropic",
    rating: 5,
    accent: "from-rose-400 to-pink-600",
    glow: "rgba(251,113,133,0.2)",
  },
];

export default function CarouselSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a] py-24 text-white">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-violet-900/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-14 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-500">
              Featured Stories
            </p>
            <h2
              className="text-4xl font-black leading-tight tracking-tight sm:text-5xl"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              From the{" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                community
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
            Perspectives from the builders, designers, and thinkers shaping what
            comes next.
          </p>
        </div>

        {/* Carousel */}
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {cards.map((card) => (
              <CarouselItem
                key={card.id}
                className="pl-4 sm:basis-1/2 lg:basis-1/3"
              >
                <div
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.05]"
                  style={{
                    boxShadow: `0 0 0 0 ${card.glow}`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      `0 20px 60px -10px ${card.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      `0 0 0 0 ${card.glow}`;
                  }}
                >
                  {/* Top row */}
                  <div className="mb-5 flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-400"
                    >
                      {card.category}
                    </Badge>
                    <Quote className="h-4 w-4 text-zinc-700" />
                  </div>

                  {/* Gradient accent line */}
                  <div
                    className={`mb-5 h-px w-12 rounded-full bg-gradient-to-r ${card.accent} opacity-80 transition-all duration-300 group-hover:w-20`}
                  />

                  {/* Content */}
                  <div className="flex-1">
                    <h3
                      className="mb-3 text-lg font-bold leading-snug text-white"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-500">
                      {card.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-5">
                    <div>
                      <p className="text-sm font-semibold text-zinc-200">
                        {card.author}
                      </p>
                      <p className="text-xs text-zinc-600">{card.role}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: card.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 fill-current bg-gradient-to-r ${card.accent} bg-clip-text text-transparent`}
                          style={{ color: "rgb(167,139,250)" }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Nav buttons */}
          <div className="mt-10 flex items-center gap-3">
            <CarouselPrevious className="static h-10 w-10 translate-y-0 rounded-full border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:bg-white/10 hover:text-white" />
            <CarouselNext className="static h-10 w-10 translate-y-0 rounded-full border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:bg-white/10 hover:text-white" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
