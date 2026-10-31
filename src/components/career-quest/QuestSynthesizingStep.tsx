import { useState, useEffect } from "react";
import { Sparkles, Brain, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { generateCareerDNAServerFn } from "@/lib/ai.functions";
import type { CareerDNA, QuestContext } from "@/lib/career-quest-data";

interface QuestSynthesizingStepProps {
  context: QuestContext;
  coreAnswers: Record<string, string | string[]>;
  adaptiveAnswers: Record<string, string>;
  version: number;
  onSuccess: (dna: CareerDNA) => void;
  onErrorFallback: () => void;
}

const SYNTHESIS_STEPS = [
  "Auditing 15 Core Discovery Scenarios & Trade-offs",
  "Decoding Adaptive AI Signals & Working Style",
  "Calculating 8 Cognitive & Execution Dimensions",
  "Synthesizing Identity Archetype & 10 Strengths",
  "Benchmarking Top 5 Career Matches & Starter Projects",
];

export function QuestSynthesizingStep({
  context,
  coreAnswers,
  adaptiveAnswers,
  version,
  onSuccess,
  onErrorFallback,
}: QuestSynthesizingStepProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev < SYNTHESIS_STEPS.length - 1 ? prev + 1 : prev));
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function synthesize() {
      try {
        const res = await generateCareerDNAServerFn({
          data: {
            context: {
              stage: context.stage,
              fieldOrSubject: context.fieldOrSubject,
              interests: context.interests,
              region: context.region,
            },
            coreAnswers,
            adaptiveAnswers,
            version,
          },
        });

        if (isMounted) {
          if (res.ok && res.dna) {
            onSuccess(res.dna);
          } else {
            onErrorFallback();
          }
        }
      } catch (err) {
        console.warn("Synthesis failed, falling back to local engine:", err);
        if (isMounted) {
          onErrorFallback();
        }
      }
    }

    synthesize();

    return () => {
      isMounted = false;
    };
  }, [context, coreAnswers, adaptiveAnswers, version, onSuccess, onErrorFallback]);

  return (
    <div className="relative mx-auto max-w-xl overflow-hidden rounded-3xl bg-white border border-stone-200/90 p-8 sm:p-14 text-center shadow-2xl font-sans">
      {/* Top Graphic Accent */}
      <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-violet via-lilac to-sun p-0.5 shadow-xl">
        <div className="flex h-full w-full items-center justify-center rounded-[22px] bg-white">
          <Brain className="h-9 w-9 text-violet animate-pulse" />
        </div>
        <Sparkles
          className="absolute -top-2 -right-2 h-6 w-6 text-sun animate-spin"
          style={{ animationDuration: "6s" }}
        />
      </div>

      <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
        Synthesizing Your Career DNA
      </h2>

      <p className="mt-2 text-sm text-stone-600 max-w-md mx-auto">
        Combining psychometric scenario weights with Google Gemini intelligence to formulate your
        tailored blueprint.
      </p>

      {/* Progress checklist */}
      <div className="mt-8 space-y-3 text-left">
        {SYNTHESIS_STEPS.map((step, idx) => {
          const isDone = idx < activeStepIndex;
          const isCurrent = idx === activeStepIndex;

          return (
            <div
              key={step}
              className={`flex items-center gap-3 rounded-xl p-3 border transition-all ${
                isCurrent
                  ? "border-violet/40 bg-lilac/20 text-stone-900 font-semibold shadow-sm"
                  : isDone
                    ? "border-emerald-200 bg-emerald-50/50 text-stone-700"
                    : "border-stone-100 bg-stone-50/50 text-stone-400 opacity-60"
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="h-5 w-5 text-violet animate-spin shrink-0" />
              ) : (
                <div className="h-5 w-5 rounded-full border border-stone-300 shrink-0" />
              )}
              <span className="text-xs sm:text-sm">{step}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-xs font-mono text-stone-400">
        Estimated completion: 2-4 seconds • Gemini Flash 2.5
      </div>
    </div>
  );
}
