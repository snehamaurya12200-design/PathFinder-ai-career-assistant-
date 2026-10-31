import { useState, useEffect } from "react";
import { Sparkles, Brain, ArrowRight, ArrowLeft, Check, Loader2, HelpCircle } from "lucide-react";
import { generateAdaptiveQuestionsServerFn } from "@/lib/ai.functions";
import { FALLBACK_ADAPTIVE_QUESTIONS, type QuestContext } from "@/lib/career-quest-data";

export interface AdaptiveQuestionItem {
  id: string;
  question: string;
  reason: string;
  dimension: string;
  options: Array<{ id: string; text: string }>;
}

interface QuestAdaptiveStepProps {
  context: QuestContext;
  coreAnswers: Record<string, string | string[]>;
  cachedQuestions?: AdaptiveQuestionItem[];
  cachedAnswers?: Record<string, string>;
  onComplete: (questions: AdaptiveQuestionItem[], answers: Record<string, string>) => void;
  onBack: () => void;
}

export function QuestAdaptiveStep({
  context,
  coreAnswers,
  cachedQuestions,
  cachedAnswers,
  onComplete,
  onBack,
}: QuestAdaptiveStepProps) {
  const [loading, setLoading] = useState(!cachedQuestions?.length);
  const [questions, setQuestions] = useState<AdaptiveQuestionItem[]>(
    cachedQuestions || FALLBACK_ADAPTIVE_QUESTIONS,
  );
  const [answers, setAnswers] = useState<Record<string, string>>(cachedAnswers || {});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (cachedQuestions?.length) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    async function fetchAdaptive() {
      try {
        setLoading(true);
        const res = await generateAdaptiveQuestionsServerFn({
          data: {
            stage: context.stage,
            fieldOrSubject: context.fieldOrSubject,
            interests: context.interests,
            coreAnswers,
          },
        });
        if (isMounted && res.questions?.length) {
          setQuestions(res.questions);
        }
      } catch (err) {
        console.warn("Using fallback adaptive questions:", err);
        if (isMounted) {
          setQuestions(FALLBACK_ADAPTIVE_QUESTIONS);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchAdaptive();
    return () => {
      isMounted = false;
    };
  }, [context, coreAnswers, cachedQuestions]);

  const currentQ = questions[currentIndex];
  const selectedOption = currentQ ? answers[currentQ.id] : undefined;

  const handleSelect = (optionId: string) => {
    if (!currentQ) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete(questions, answers);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      onBack();
    }
  };

  if (loading) {
    return (
      <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white border border-stone-200/90 p-8 sm:p-14 text-center shadow-xl font-sans">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-lilac/40 text-violet">
          <Brain className="h-8 w-8 animate-pulse" />
        </div>

        <h3 className="mt-6 text-2xl font-extrabold text-stone-900 tracking-tight">
          Analyzing Your 15 Discovery Signals...
        </h3>

        <p className="mt-2 text-sm text-stone-600 max-w-md mx-auto">
          Gemini AI is examining your responses across The Thinker, Explorer, Decision Maker, Hidden
          Talent, and Future Self to identify specific crossroads.
        </p>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-mono text-stone-400">
          <Loader2 className="h-4 w-4 animate-spin text-violet" />
          <span>Formulating 3 targeted adaptive questions...</span>
        </div>
      </div>
    );
  }

  if (!currentQ) {
    return null;
  }

  return (
    <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white border border-stone-200/90 shadow-2xl font-sans">
      {/* Progress Track */}
      <div className="w-full bg-stone-100 h-1.5">
        <div
          className="h-full bg-violet transition-all duration-300"
          style={{ width: `${Math.round(((currentIndex + 1) / questions.length) * 100)}%` }}
        />
      </div>

      <div
        className="relative p-6 sm:p-10 md:p-12"
        style={{
          backgroundImage: "radial-gradient(#d1d5db 1.2px, transparent 1.2px)",
          backgroundSize: "20px 20px",
        }}
      >
        {/* Header Pill */}
        <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-4">
          <div className="flex items-center gap-1.5 font-bold text-violet bg-lilac/30 border border-violet/30 px-2.5 py-0.5 rounded-full">
            <Sparkles className="h-3.5 w-3.5" />
            <span>
              AI ADAPTIVE SIGNAL {currentIndex + 1} OF {questions.length}
            </span>
          </div>
          <span className="text-stone-400 uppercase tracking-widest">GEMINI CLARIFIER</span>
        </div>

        {/* Question Title */}
        <div className="mt-4 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 leading-snug">
            {currentQ.question}
          </h2>

          {/* Reason Badge */}
          {currentQ.reason && (
            <div className="mt-3 inline-flex items-start gap-2 rounded-xl bg-stone-100/90 border border-stone-200 px-3.5 py-2 text-xs text-stone-700">
              <HelpCircle className="h-4 w-4 text-stone-500 shrink-0 mt-0.5" />
              <span>
                <strong>Why we ask this:</strong> {currentQ.reason}
              </span>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="mt-6 space-y-3">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect(opt.id)}
                className={`group flex w-full items-start gap-3.5 rounded-2xl border p-4 text-left transition-all ${
                  isSelected
                    ? "border-violet bg-violet text-white shadow-md scale-[1.01]"
                    : "border-stone-200 bg-white/95 hover:bg-stone-50 hover:border-stone-400 text-stone-900 shadow-sm"
                }`}
              >
                <div
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-xl font-mono text-xs font-bold transition-colors ${
                    isSelected
                      ? "bg-white text-violet"
                      : "bg-stone-100 text-stone-700 group-hover:bg-stone-200"
                  }`}
                >
                  {opt.id.toUpperCase()}
                </div>

                <div className="flex-1 text-sm sm:text-base font-medium pt-0.5 leading-relaxed">
                  {opt.text}
                </div>

                <div
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors mt-0.5 ${
                    isSelected
                      ? "border-white bg-white text-violet"
                      : "border-stone-300 bg-transparent group-hover:border-stone-400"
                  }`}
                >
                  {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer controls */}
        <div className="mt-8 flex items-center justify-between pt-4 border-t border-stone-200/80">
          <button
            type="button"
            onClick={handlePrev}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Previous
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!selectedOption}
            className={`inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold transition-all shadow-md ${
              selectedOption
                ? "bg-ink text-white hover:bg-black hover:scale-[1.02] cursor-pointer"
                : "bg-stone-200 text-stone-400 cursor-not-allowed shadow-none"
            }`}
          >
            <span>
              {currentIndex === questions.length - 1 ? "Synthesize Career DNA" : "Next Follow-up"}
            </span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
