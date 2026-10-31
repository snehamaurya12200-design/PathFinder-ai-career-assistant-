import { useState } from "react";
import {
  GraduationCap,
  Briefcase,
  Sparkles,
  Compass,
  ArrowRight,
  ArrowLeft,
  Check,
  School,
  BookOpen,
  Shuffle,
  HelpCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { QUEST_STAGES, type QuestContext, type QuestStage } from "@/lib/career-quest-data";

interface QuestContextStepProps {
  initialContext?: QuestContext;
  onContinue: (context: QuestContext) => void;
  onBack: () => void;
}

const STAGE_ICONS: Record<QuestStage, LucideIcon> = {
  "School student — Classes 8–9": School,
  "Class 10": BookOpen,
  "Class 11–12": BookOpen,
  "Undergraduate student": GraduationCap,
  "Postgraduate student": GraduationCap,
  "Graduate / Fresh graduate": Sparkles,
  "Working professional": Briefcase,
  "Exploring a career change": Shuffle,
  "Other / Still figuring it out": HelpCircle,
};

const STAGE_SUBTITLES: Record<QuestStage, string> = {
  "School student — Classes 8–9": "Early exploration of passions and curiosity",
  "Class 10": "Crucial stream selection and subject orientation",
  "Class 11–12": "Targeting competitive exams, colleges, and core tracks",
  "Undergraduate student": "Building marketable skills, internships, and domains",
  "Postgraduate student": "Specialization, research, or executive transition",
  "Graduate / Fresh graduate": "Transitioning from campus to early career launch",
  "Working professional": "Skill acceleration, leveling up, and leadership",
  "Exploring a career change": "Pivoting to a new industry or discovering fresh alignment",
  "Other / Still figuring it out": "Open canvas exploration with zero predefined boxes",
};

export function QuestContextStep({ initialContext, onContinue, onBack }: QuestContextStepProps) {
  const [selectedStage, setSelectedStage] = useState<QuestStage>(
    initialContext?.stage || "Undergraduate student",
  );
  const [fieldOrSubject, setFieldOrSubject] = useState(initialContext?.fieldOrSubject || "");
  const [interests, setInterests] = useState(initialContext?.interests || "");

  const handleNext = () => {
    onContinue({
      stage: selectedStage,
      fieldOrSubject: fieldOrSubject.trim() || undefined,
      interests: interests.trim() || undefined,
    });
  };

  return (
    <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-white border border-stone-200/90 p-5 sm:p-10 shadow-xl font-sans">
      {/* Step Header */}
      <div className="flex items-center justify-between border-b border-stone-200/80 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dossier
        </button>
        <div className="text-xs font-mono tracking-widest text-stone-400 uppercase">
          STEP 01 OF 02 // CONTEXT
        </div>
      </div>

      <div className="mt-6 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-violet/10 px-3 py-1 text-xs font-semibold text-violet">
          <Compass className="h-3.5 w-3.5" />
          Personalizing Your Quest
        </div>
        <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Where are you in your journey right now?
        </h2>
        <p className="mt-1.5 text-sm sm:text-base text-stone-600">
          Career Quest personalizes question framing, follow-ups, and career recommendations to meet
          you exactly where you stand.
        </p>
      </div>

      {/* Stage Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {QUEST_STAGES.map((stg) => {
          const Icon = STAGE_ICONS[stg] || Compass;
          const isSelected = selectedStage === stg;
          return (
            <button
              key={stg}
              type="button"
              onClick={() => setSelectedStage(stg)}
              className={`group relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                isSelected
                  ? "border-violet bg-lilac/30 shadow-md ring-2 ring-violet/20"
                  : "border-stone-200/90 bg-stone-50/50 hover:bg-stone-100/70 hover:border-stone-300"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div
                    className={`grid h-8 w-8 place-items-center rounded-lg transition-colors ${
                      isSelected ? "bg-violet text-white" : "bg-stone-200/70 text-stone-700"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  {isSelected && (
                    <div className="grid h-5 w-5 place-items-center rounded-full bg-violet text-white">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                  )}
                </div>
                <div className="mt-3 font-bold text-stone-900 text-sm leading-snug">{stg}</div>
                <div className="mt-1 text-xs text-stone-500 line-clamp-2">
                  {STAGE_SUBTITLES[stg]}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Optional contextual hints */}
      <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50/80 p-4 sm:p-5 space-y-4">
        <div className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold">
          Optional Details (Enhances AI accuracy)
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Current stream or field (e.g. Science PCM, Commerce, CS, Design, Humanities):
            </label>
            <input
              type="text"
              value={fieldOrSubject}
              onChange={(e) => setFieldOrSubject(e.target.value)}
              placeholder="e.g. Computer Science, Grade 10, Biology..."
              className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-violet focus:outline-none focus:ring-1 focus:ring-violet"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Topics or curiosities currently pulling your attention:
            </label>
            <input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g. AI tools, psychology, game design, climate..."
              className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-violet focus:outline-none focus:ring-1 focus:ring-violet"
            />
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="mt-8 flex items-center justify-between pt-4 border-t border-stone-200/80">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl px-4 py-2.5 text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-black transition-all"
        >
          <span>Continue to Briefing</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
