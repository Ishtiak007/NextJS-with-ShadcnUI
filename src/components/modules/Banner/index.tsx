"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, ViewIcon, Zap } from "lucide-react";
import Link from "next/link";

export default function BannerSection() {
  return (
    <section className="relative w-full overflow-hidden bg-black text-white">
      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Radial gradient glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-gradient-radial from-violet-600/20 via-violet-900/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-20 left-1/4  rounded-full bg-gradient-radial from-cyan-500/10 via-cyan-900/5 to-transparent blur-3xl" />
      </div>

      {/* Decorative grid lines */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 py-28 text-center lg:py-36">
        {/* Headline */}
        <h1
          className="mb-6 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          <span className="block text-white">Ship faster.</span>
          <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent">
            Build better.
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          className="mb-10 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          The design system that never slows you down. Composable components,
          zero compromise on aesthetics — production-ready from day one.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="h-12 gap-2 rounded-full bg-violet-600 px-7 text-sm font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all hover:bg-violet-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.6)]"
          >
            <Link className="flex gap-3 items-center" href="#">
              Get started free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="ghost"
            className="h-12 gap-2 rounded-full border border-zinc-700 px-7 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-500 hover:bg-white/5 hover:text-white"
          >
            <Link className="flex gap-3 items-center" href="#">
              See live demo
              <ViewIcon className="h-4 w-4 text-gray-400" />
            </Link>
          </Button>
        </div>

        {/* Social proof */}
        <div className="mt-14 flex flex-col items-center gap-2">
          <div className="flex -space-x-2">
            {[
              "bg-pink-500",
              "bg-sky-500",
              "bg-amber-500",
              "bg-emerald-500",
              "bg-violet-500",
            ].map((color, i) => (
              <div
                key={i}
                className={`h-8 w-8 rounded-full border-2 border-black ${color} flex items-center justify-center text-[10px] font-bold text-white`}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <p className="text-xs text-zinc-500">
            Trusted by{" "}
            <span className="text-zinc-300 font-medium">12,000+</span>{" "}
            developers worldwide
          </p>
        </div>

        {/* Decorative bottom separator */}
        <div className="mt-20 h-px w-full max-w-md  to-transparent" />
      </div>
    </section>
  );
}
