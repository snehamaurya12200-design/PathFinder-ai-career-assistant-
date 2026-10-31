import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Save, Sparkles, HelpCircle } from "lucide-react";
import type { QuestQuestion } from "@/lib/career-quest-data";
import { QUEST_ROUNDS } from "@/lib/career-quest-data";

interface QuestQuestionCardProps {
  question: QuestQuestion;
  currentAnswer: string | string[] | undefined;
  onSelectOption: (optionId: string) => void;
  onNext: () => void;
  onPrev: () => void;
  onSaveAndExit: () => void;
  canGoBack: boolean;
  totalQuestions: number;
  currentQuestionNumber: number;
}

export function QuestQuestionCard({
  question,
  currentAnswer,
  onSelectOption,
  onNext,
  onPrev,
  onSaveAndExit,
  canGoBack,
  totalQuestions,
  currentQuestionNumber,
}: QuestQuestionCardProps) {
  const round = QUEST_ROUNDS.find((r) => r.number === question.roundId) ?? QUEST_ROUNDS[0];
  const isMulti = !!question.allowMultiple;

  // Selected array
  const selectedList = Array.isArray(currentAnswer)
    ? currentAnswer
    : currentAnswer
      ? [currentAnswer]
      : [];

  const hasSelection = selectedList.length > 0;
  const progressPercent = Math.round((currentQuestionNumber / totalQuestions) * 100);

  // Helper to render question text with highlighted words matching Reference Image 1
  const renderHighlightedHeadline = () => {
    const text = question.question;
    const highlightWords = question.highlightWords || [];
    if (!highlightWords.length) {
      return <span>{text}</span>;
    }

    // Try finding the primary highlight phrase
    const primaryPhrase = highlightWords[0];
    const parts = text.split(primaryPhrase);

    if (parts.length === 2) {
      return (
        <span>
          {parts[0]}
          <span className="relative inline-block mx-1 my-0.5">
            {/* Box highlight with corner dots matching Reference Image 1 */}
            <span className="relative z-10 px-2 py-0.5 text-stone-900 font-extrabold">
              {primaryPhrase}
            </span>
            <span
              className={`absolute inset-0 rounded-sm opacity-80 ${
                question.roundId === 1
                  ? "bg-lilac/60 border border-violet/40"
                  : question.roundId === 2
                    ? "bg-mint/60 border border-success/40"
                    : question.roundId === 3
                      ? "bg-butter border border-sun/50"
                      : question.roundId === 4
                        ? "bg-blush/70 border border-orange/40"
                        : "bg-sun/60 border border-sun"
              }`}
            />
            {/* Corner handle dots */}
            <span className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-stone-800 rounded-full" />
            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-stone-800 rounded-full" />
            <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-stone-800 rounded-full" />
            <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-stone-800 rounded-full" />
          </span>
          {parts[1]}
        </span>
      );
    }

    return <span>{text}</span>;
  };

  return (
    <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white border border-stone-200/90 shadow-2xl font-sans">
      {/* Top Progress Track */}
      <div className="w-full bg-stone-100 h-1.5">
        <div
          className="h-full bg-ink transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Card Body with Dot Grid Surface (Matching Reference Image 1) */}
      <div
        className="relative p-6 sm:p-10 md:p-12"
        style={{
          backgroundImage: "radial-gradient(#d1d5db 1.2px, transparent 1.2px)",
          backgroundSize: "20px 20px",
        }}
      >
        {/* Top Tagline / Meta */}
        <div className="flex items-center justify-between text-xs text-stone-500 font-mono mb-4">
          <span className="tracking-widest uppercase">@pathfinder.quest</span>
          <span className="font-semibold text-stone-700">
            Round {question.roundId} of 5: {round.title}
          </span>
        </div>

        {/* Numbered Circle (01) to (15) — exact matching Reference Image 1 */}
        <div className="flex justify-center my-3">
          <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-stone-800 bg-white font-extrabold text-stone-900 text-xl tracking-tight shadow-sm">
            {question.questionNumber < 10 ? `0${question.questionNumber}` : question.questionNumber}
          </div>
        </div>

        {/* Question Title */}
        <div className="text-center mt-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-stone-900 leading-tight">
            {renderHighlightedHeadline()}
          </h2>

          {/* Subtext and Prompt note (Image 1 style) */}
          {question.subtext && (
            <p className="mt-3 text-sm sm:text-base text-stone-600 font-normal max-w-lg mx-auto">
              {question.subtext}
            </p>
          )}

          {question.promptNote && (
            <div className="mt-2 inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-orange tracking-wide">
              {question.promptNote}
            </div>
          )}

          {isMulti && (
            <div className="mt-2 text-xs font-mono font-bold text-violet uppercase tracking-wider">
              ✦ Multi-Select: Choose any and all options that appeal to you
            </div>
          )}
        </div>

        {/* Option Cards Grid */}
        <div className="mt-8 space-y-3">
          {question.options.map((opt) => {
            const isSelected = selectedList.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelectOption(opt.id)}
                className={`group relative flex w-full items-start gap-3.5 rounded-2xl border p-4 text-left transition-all ${
                  isSelected
                    ? "border-stone-900 bg-stone-900 text-white shadow-md scale-[1.01]"
                    : "border-stone-200/90 bg-white/95 hover:bg-stone-50 hover:border-stone-400 text-stone-900 shadow-sm"
                }`}
              >
                {/* Letter Indicator badge (A, B, C...) */}
                <div
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-xl font-mono text-xs font-bold transition-colors ${
                    isSelected
                      ? "bg-white text-stone-900"
                      : "bg-stone-100 text-stone-700 group-hover:bg-stone-200"
                  }`}
                >
                  {opt.id}
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                  <div
                    className={`text-sm sm:text-base font-medium leading-relaxed ${isSelected ? "text-white" : "text-stone-900"}`}
                  >
                    {opt.label}
                  </div>
                  {opt.tagline && (
                    <div
                      className={`text-xs mt-1 ${isSelected ? "text-stone-300" : "text-stone-500"}`}
                    >
                      {opt.tagline}
                    </div>
                  )}
                </div>

                {/* Checkbox indicator */}
                <div
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors mt-0.5 ${
                    isSelected
                      ? "border-white bg-white text-stone-900"
                      : "border-stone-300 bg-transparent group-hover:border-stone-400"
                  }`}
                >
                  {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Card Footer Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200/80">
          <div className="flex items-center gap-2">
            {canGoBack && (
              <button
                type="button"
                onClick={onPrev}
                className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Previous
              </button>
            )}

            <button
              type="button"
              onClick={onSaveAndExit}
              className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 transition-colors px-2 py-1"
              title="Save current progress and return to dashboard"
            >
              <Save className="h-3.5 w-3.5" />
              <span>Save & Exit</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-400 font-mono">
              {currentQuestionNumber} / {totalQuestions}
            </span>

            <button
              type="button"
              onClick={onNext}
              disabled={!hasSelection}
              className={`inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold transition-all shadow-md ${
                hasSelection
                  ? "bg-ink text-white hover:bg-black hover:scale-[1.02] cursor-pointer"
                  : "bg-stone-200 text-stone-400 cursor-not-allowed shadow-none"
              }`}
            >
              <span>
                {currentQuestionNumber === totalQuestions ? "Review Signals" : "Continue"}
              </span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
