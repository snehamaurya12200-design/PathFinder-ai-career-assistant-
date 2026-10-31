import {
  ArrowRight,
  ArrowLeft,
  Clock,
  ShieldCheck,
  Sparkles,
  Brain,
  Compass,
  HelpCircle,
} from "lucide-react";
import { QUEST_ROUNDS, type QuestContext } from "@/lib/career-quest-data";

interface QuestIntroStepProps {
  context: QuestContext;
  onBegin: () => void;
  onBack: () => void;
}

export function QuestIntroStep({ context, onBegin, onBack }: QuestIntroStepProps) {
  return (
    <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-white border border-stone-200/90 p-5 sm:p-10 shadow-xl font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-stone-200/80 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Edit Stage
        </button>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-violet/10 px-2.5 py-0.5 text-xs font-semibold text-violet">
            {context.stage}
          </span>
          <span className="text-xs font-mono text-stone-400">QUEST DOSSIER</span>
        </div>
      </div>

      <div className="mt-6 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          How Career Quest Works
        </h2>
        <p className="mt-1.5 text-sm sm:text-base text-stone-600">
          This is not an exam, a personality box, or a standard aptitude quiz. It is an iterative
          discovery engine designed to surface how your mind operates when free from expectations.
        </p>
      </div>

      {/* Key Guarantees */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <Clock className="h-4 w-4 text-orange" />
            <span>5 to 7 Minutes</span>
          </div>
          <p className="mt-1 text-xs text-stone-500">
            15 core scenario questions plus 3 adaptive follow-ups tailored by Gemini.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Zero Judgments</span>
          </div>
          <p className="mt-1 text-xs text-stone-500">
            No right or wrong answers. Contradictions are welcomed and explored.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <Sparkles className="h-4 w-4 text-violet" />
            <span>Rich Career DNA</span>
          </div>
          <p className="mt-1 text-xs text-stone-500">
            Generates your Archetype, 10 Strengths, Top 5 Matches & Starter Projects.
          </p>
        </div>
      </div>

      {/* 5 Discovery Rounds Breakdown */}
      <div className="mt-8">
        <div className="text-xs font-mono uppercase tracking-widest text-stone-500 font-bold mb-3">
          The 5 Discovery Rounds
        </div>

        <div className="space-y-2.5">
          {QUEST_ROUNDS.map((round) => (
            <div
              key={round.id}
              className="flex items-start gap-3.5 rounded-2xl border border-stone-200 bg-white p-3.5 sm:p-4 hover:border-stone-300 transition-colors"
            >
              <div
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl font-mono text-xs font-bold ${round.accentBg} ${round.accentText} border ${round.accentBorder}`}
              >
                0{round.number}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900 text-sm">{round.title}</span>
                  <span className="text-[10px] font-mono text-stone-400">3 Questions</span>
                </div>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{round.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final note */}
      <div className="mt-6 rounded-2xl bg-amber-50/80 border border-amber-200/80 p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
        <Brain className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
        <span>
          <strong>Pro-tip:</strong> Go with your initial, uncensored gut instinct. Don't pick what
          sounds prestigious or expected by others — pick what genuinely pulls you.
        </span>
      </div>

      {/* Bottom Actions */}
      <div className="mt-8 flex items-center justify-between pt-4 border-t border-stone-200/80">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl px-4 py-2.5 text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          Back
        </button>

        <button
          type="button"
          onClick={onBegin}
          className="inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3 text-sm font-bold text-white shadow-lg shadow-black/10 hover:bg-black transition-all hover:scale-[1.01]"
        >
          <span>Begin Round 1: The Thinker</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
