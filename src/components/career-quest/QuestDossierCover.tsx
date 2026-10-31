import { useState } from "react";
import {
  Compass,
  Sparkles,
  ArrowRight,
  History,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Layers,
} from "lucide-react";
import type { CareerDNA, CareerQuestProgress } from "@/lib/career-quest-data";
import { QUEST_ROUNDS } from "@/lib/career-quest-data";

interface QuestDossierCoverProps {
  onStart: () => void;
  onResume?: () => void;
  onViewDNA?: () => void;
  onOpenEvolution?: () => void;
  existingDNA?: CareerDNA;
  historyCount?: number;
  inProgress?: CareerQuestProgress | null;
}

export function QuestDossierCover({
  onStart,
  onResume,
  onViewDNA,
  onOpenEvolution,
  existingDNA,
  historyCount = 0,
  inProgress,
}: QuestDossierCoverProps) {
  const [hoveredRound, setHoveredRound] = useState<number | null>(null);

  return (
    <div className="relative min-h-[820px] w-full overflow-hidden rounded-3xl bg-[#FAF8F5] border border-stone-200/80 p-4 sm:p-8 md:p-12 shadow-sm font-sans select-none">
      {/* Light warm grid backdrop (NOT bright orange, per strict user instructions) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, #E8E3DA 1px, transparent 1px),
            linear-gradient(to bottom, #E8E3DA 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient soft glow patches */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-lilac/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-sun/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar Branding */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-stone-200/80 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-stone-500 uppercase">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          PATHFINDER DOSSIER // REF: QUEST-2026.4
        </div>
        <div className="flex items-center gap-3 text-xs text-stone-600 font-medium">
          <span className="rounded-full bg-stone-200/70 px-2.5 py-1">5 Discovery Rounds</span>
          <span className="rounded-full bg-stone-200/70 px-2.5 py-1">Gemini AI Synthesized</span>
          <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-1 font-semibold">
            100% Free & Ungraded
          </span>
        </div>
      </div>

      {/* Main Dossier Composition (Referencing Image 2 stacked paper aesthetic with light background) */}
      <div className="relative z-10 mx-auto mt-6 max-w-3xl">
        {/* Layer 3: Deepest back sheet (slanted right) */}
        <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-1 rounded-2xl bg-[#EFECE6] border border-stone-300 shadow-md opacity-70 pointer-events-none" />

        {/* Layer 2: Middle sheet (slanted left) */}
        <div className="absolute inset-0 -translate-x-2 translate-y-1.5 -rotate-1 rounded-2xl bg-[#F5F2EB] border border-stone-300 shadow-lg pointer-events-none" />

        {/* Layer 1: Front Primary Dossier Sheet */}
        <div className="relative rounded-2xl bg-white border border-stone-200/90 p-6 sm:p-10 md:p-12 shadow-xl">
          {/* Top Paperclip (Silver metallic graphic accent) */}
          <div className="absolute -top-4 left-10 sm:left-14 w-6 h-14 pointer-events-none">
            <svg viewBox="0 0 24 56" fill="none" className="w-full h-full drop-shadow-md">
              <path
                d="M 6 12 L 6 42 C 6 49 18 49 18 42 L 18 6 C 18 1 10 1 10 6 L 10 40 C 10 44 14 44 14 40 L 14 16"
                stroke="#64748b"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Right Binder Clip */}
          <div className="absolute -right-4 top-40 hidden sm:block w-9 h-14 pointer-events-none">
            <div className="relative w-8 h-12 bg-neutral-800 rounded-sm shadow-lg flex items-center justify-center">
              <div className="w-4 h-10 border-2 border-slate-300 rounded-t-full -ml-6" />
              <div className="w-1.5 h-6 bg-neutral-600 rounded" />
            </div>
          </div>

          {/* Oval Washi Tape / Editorial Stamp */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange/40 bg-orange/10 px-3 py-1 text-xs font-semibold tracking-wide text-orange">
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-ping" />
            Before You Pick Any Career Path...
          </div>

          {/* Editorial Headline with Bounding Boxes (Image 2 style) */}
          <div className="mt-2 text-stone-900">
            <h1 className="font-extrabold tracking-tight text-3xl sm:text-5xl md:text-6xl leading-[1.12]">
              I Ask{" "}
              <span className="relative inline-block mx-1">
                {/* Highlight bounding box around "These Five" */}
                <span className="relative z-10 px-2 py-0.5 text-violet">These Five</span>
                <span className="absolute inset-0 bg-lilac/50 border border-violet/40 rounded-sm -rotate-0.5" />
                <span className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-violet rounded-full" />
                <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-violet rounded-full" />
              </span>
              <br />
              <span className="relative inline-block my-1.5">
                {/* Highlight bounding box around "Questions" */}
                <span className="relative z-10 px-3 py-0.5 text-orange">Questions</span>
                <span className="absolute inset-0 bg-blush/60 border border-orange/50 rounded-sm rotate-0.5" />
                <span className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-orange rounded-full" />
                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-orange rounded-full" />
                <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-orange rounded-full" />
                <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-orange rounded-full" />
              </span>{" "}
              First.
            </h1>
          </div>

          {/* Subtitle / Philosophy */}
          <p className="mt-4 text-base sm:text-lg text-stone-600 font-normal leading-relaxed max-w-xl">
            A career without self-direction is just guesswork. Career Quest is a thoughtful, 5-round
            discovery adventure that maps your instincts, superpowers, and deep motivations into a
            personalized <strong className="text-stone-900 font-semibold">Career DNA</strong>{" "}
            report.
          </p>

          {/* Washi tape banner */}
          <div className="my-6 inline-block rotate-[-0.5deg] rounded bg-[#EAE5D9] px-4 py-1.5 text-xs sm:text-sm text-stone-700 font-mono shadow-inner border border-stone-300">
            📌 15 Core Questions • 3-5 Adaptive AI Follow-ups • 6 Minutes • Zero Judgments
          </div>

          {/* 5 Discovery Rounds Preview Chips */}
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-5 gap-2">
            {QUEST_ROUNDS.map((r) => (
              <div
                key={r.id}
                onMouseEnter={() => setHoveredRound(r.number)}
                onMouseLeave={() => setHoveredRound(null)}
                className={`cursor-default rounded-xl border p-2.5 transition-all text-left ${
                  hoveredRound === r.number
                    ? "border-stone-900 bg-stone-900 text-white shadow-md scale-105"
                    : "border-stone-200 bg-stone-50/70 hover:bg-stone-100/80 text-stone-800"
                }`}
              >
                <div className="text-[10px] font-mono font-bold opacity-70">ROUND 0{r.number}</div>
                <div className="text-xs font-bold truncate mt-0.5">
                  {r.title.replace("THE ", "")}
                </div>
                <div className="text-[10px] opacity-75 line-clamp-1 mt-0.5">{r.subtitle}</div>
              </div>
            ))}
          </div>

          {/* Existing Progress or Saved DNA Alert Banner */}
          {inProgress && (
            <div className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-violet/30 bg-lilac/25 p-3.5 text-sm">
              <div className="flex items-center gap-2 text-stone-800 font-medium">
                <span className="flex h-2 w-2 rounded-full bg-violet animate-pulse" />
                <span>
                  You have an unfinished quest session (
                  {Object.keys(inProgress.coreAnswers || {}).length}/15 answered)
                </span>
              </div>
              {onResume && (
                <button
                  onClick={onResume}
                  className="rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-black transition-colors"
                >
                  Resume Quest
                </button>
              )}
            </div>
          )}

          {existingDNA && !inProgress && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-sm">
              <div className="flex items-center gap-2 text-emerald-900">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold">Career DNA active:</span>{" "}
                  {existingDNA.archetype.title} (v{existingDNA.version})
                </div>
              </div>
              <div className="flex items-center gap-2">
                {onViewDNA && (
                  <button
                    onClick={onViewDNA}
                    className="rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800 transition-colors"
                  >
                    View Report
                  </button>
                )}
                {historyCount > 1 && onOpenEvolution && (
                  <button
                    onClick={onOpenEvolution}
                    className="flex items-center gap-1 rounded-lg border border-emerald-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-50"
                  >
                    <History className="h-3.5 w-3.5" />
                    Evolution ({historyCount})
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Call to Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-stone-200/80">
            <button
              onClick={onStart}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-ink px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-black/10 hover:bg-black hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <Compass className="h-5 w-5 text-sun group-hover:rotate-45 transition-transform" />
              <span>{existingDNA ? "Retake Career Quest" : "Start Career Quest"}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {existingDNA && onViewDNA && (
              <button
                onClick={onViewDNA}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-3.5 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors shadow-sm"
              >
                <Layers className="h-4 w-4 text-violet" />
                View My Career DNA
              </button>
            )}

            <div className="sm:ml-auto flex items-center gap-1.5 text-xs text-stone-500 font-medium">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>No account required • Auto-saved locally</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial footer quote */}
      <div className="relative z-10 mx-auto mt-8 max-w-xl text-center text-xs text-stone-500 font-mono">
        “You don’t discover what you love by thinking about it. You discover it by noticing what
        energizes you.”
      </div>
    </div>
  );
}
