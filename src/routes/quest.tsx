import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { usePathfinder, actions } from "@/lib/pathfinder-store";
import {
  CORE_QUESTIONS,
  generateFallbackCareerDNA,
  type CareerDNA,
  type CareerQuestProgress,
  type QuestContext,
  type QuestStage,
} from "@/lib/career-quest-data";
import { QuestDossierCover } from "@/components/career-quest/QuestDossierCover";
import { QuestContextStep } from "@/components/career-quest/QuestContextStep";
import { QuestIntroStep } from "@/components/career-quest/QuestIntroStep";
import { QuestQuestionCard } from "@/components/career-quest/QuestQuestionCard";
import {
  QuestAdaptiveStep,
  type AdaptiveQuestionItem,
} from "@/components/career-quest/QuestAdaptiveStep";
import { QuestSynthesizingStep } from "@/components/career-quest/QuestSynthesizingStep";
import { QuestDNAReport } from "@/components/career-quest/QuestDNAReport";
import { CareerEvolutionModal } from "@/components/career-quest/CareerEvolutionModal";

export const Route = createFileRoute("/quest")({
  head: () => ({
    meta: [
      { title: "Career Quest — Pathfinder" },
      {
        name: "description",
        content:
          "Discover your interests, hidden cognitive superpowers, and personalized Career DNA.",
      },
      { property: "og:title", content: "Career Quest — Pathfinder" },
      {
        property: "og:description",
        content: "Discover your interests and personalized Career DNA.",
      },
    ],
  }),
  component: CareerQuestPage,
});

type QuestFlowStep =
  "cover" | "context" | "intro" | "core" | "adaptive" | "synthesizing" | "report";

function CareerQuestPage() {
  const store = usePathfinder((s) => s);
  const navigate = useNavigate();

  // If user has active progress, offer to resume; if user has existing DNA and no progress, show cover with option to view report
  const [step, setStep] = useState<QuestFlowStep>("cover");
  const [context, setContext] = useState<QuestContext>({
    stage: "Undergraduate student",
  });
  const [coreAnswers, setCoreAnswers] = useState<Record<string, string | string[]>>({});
  const [currentCoreIndex, setCurrentCoreIndex] = useState(0);
  const [adaptiveQuestions, setAdaptiveQuestions] = useState<AdaptiveQuestionItem[]>([]);
  const [adaptiveAnswers, setAdaptiveAnswers] = useState<Record<string, string>>({});
  const [activeDNA, setActiveDNA] = useState<CareerDNA | undefined>(store.careerDNA);
  const [evolutionOpen, setEvolutionOpen] = useState(false);

  // Restore saved progress if available
  useEffect(() => {
    if (store.activeQuestProgress) {
      const p = store.activeQuestProgress;
      if (p.stage) {
        setContext({
          stage: p.stage as QuestStage,
          fieldOrSubject: p.fieldOrSubject,
          interests: p.interests,
          region: p.region,
        });
      }
      if (p.coreAnswers) {
        setCoreAnswers(p.coreAnswers);
      }
      if (typeof p.currentQuestionIndex === "number") {
        setCurrentCoreIndex(p.currentQuestionIndex);
      }
      if (p.adaptiveQuestions) {
        setAdaptiveQuestions(p.adaptiveQuestions as AdaptiveQuestionItem[]);
      }
      if (p.adaptiveAnswers) {
        setAdaptiveAnswers(p.adaptiveAnswers);
      }
    }
  }, [store.activeQuestProgress]);

  // Synchronize state with store
  const persistProgress = (
    nextStep: QuestFlowStep,
    nextIndex: number,
    nextCoreAnswers: Record<string, string | string[]>,
    nextAdaptiveAnswers: Record<string, string> = adaptiveAnswers,
    nextAdaptiveQuestions: AdaptiveQuestionItem[] = adaptiveQuestions,
  ) => {
    const progress: CareerQuestProgress = {
      stage: context.stage,
      fieldOrSubject: context.fieldOrSubject,
      interests: context.interests,
      region: context.region,
      currentStep: nextStep as CareerQuestProgress["currentStep"],
      currentQuestionIndex: nextIndex,
      coreAnswers: nextCoreAnswers,
      adaptiveAnswers: nextAdaptiveAnswers,
      adaptiveQuestions: nextAdaptiveQuestions,
      updatedAt: new Date().toISOString(),
    };
    actions.saveQuestProgress(progress);
  };

  // Start fresh quest
  const handleStartFresh = () => {
    actions.clearQuestProgress();
    setCoreAnswers({});
    setCurrentCoreIndex(0);
    setAdaptiveQuestions([]);
    setAdaptiveAnswers({});
    setStep("context");
  };

  // Resume unfinished quest
  const handleResume = () => {
    if (store.activeQuestProgress) {
      const savedStep = store.activeQuestProgress.currentStep;
      if (savedStep === "core") {
        setStep("core");
      } else if (savedStep === "adaptive") {
        setStep("adaptive");
      } else {
        setStep("core");
      }
    } else {
      setStep("core");
    }
  };

  // View existing DNA
  const handleViewDNA = () => {
    if (store.careerDNA) {
      setActiveDNA(store.careerDNA);
      setStep("report");
    }
  };

  // Step 1 -> Context selected
  const handleContextContinue = (ctx: QuestContext) => {
    setContext(ctx);
    setStep("intro");
  };

  // Step 2 -> Begin Core Questions
  const handleBeginCore = () => {
    setStep("core");
    setCurrentCoreIndex(0);
    persistProgress("core", 0, coreAnswers);
  };

  // Core question option select
  const currentQ = CORE_QUESTIONS[currentCoreIndex] || CORE_QUESTIONS[0];
  const currentAns = coreAnswers[currentQ.id];

  const handleSelectCoreOption = (optId: string) => {
    const isMulti = !!currentQ.allowMultiple;
    let nextAns: string | string[];

    if (isMulti) {
      const existing = Array.isArray(currentAns) ? currentAns : currentAns ? [currentAns] : [];
      if (existing.includes(optId)) {
        nextAns = existing.filter((x) => x !== optId);
      } else {
        nextAns = [...existing, optId];
      }
    } else {
      nextAns = optId;
    }

    const updatedCore = {
      ...coreAnswers,
      [currentQ.id]: nextAns,
    };
    setCoreAnswers(updatedCore);
    persistProgress("core", currentCoreIndex, updatedCore);
  };

  // Core question continue
  const handleNextCore = () => {
    if (currentCoreIndex < CORE_QUESTIONS.length - 1) {
      const nextIdx = currentCoreIndex + 1;
      setCurrentCoreIndex(nextIdx);
      persistProgress("core", nextIdx, coreAnswers);
    } else {
      // Completed all 15 core questions -> go to adaptive follow-up
      setStep("adaptive");
      persistProgress("adaptive", currentCoreIndex, coreAnswers);
    }
  };

  const handlePrevCore = () => {
    if (currentCoreIndex > 0) {
      const prevIdx = currentCoreIndex - 1;
      setCurrentCoreIndex(prevIdx);
      persistProgress("core", prevIdx, coreAnswers);
    } else {
      setStep("intro");
    }
  };

  const handleSaveAndExit = () => {
    persistProgress("core", currentCoreIndex, coreAnswers);
    navigate({ to: "/" });
  };

  // Step 4 -> Adaptive Completed
  const handleAdaptiveComplete = (
    questions: AdaptiveQuestionItem[],
    answers: Record<string, string>,
  ) => {
    setAdaptiveQuestions(questions);
    setAdaptiveAnswers(answers);
    persistProgress("adaptive", currentCoreIndex, coreAnswers, answers, questions);
    setStep("synthesizing");
  };

  // Step 5 -> Synthesis Success
  const handleSynthesisSuccess = (dna: CareerDNA) => {
    actions.saveCareerDNA(dna);
    setActiveDNA(dna);
    setStep("report");
  };

  const handleSynthesisFallback = () => {
    const nextVer = (store.careerDNA?.version || 0) + 1;
    const fallbackDNA = generateFallbackCareerDNA(context, coreAnswers, adaptiveAnswers, nextVer);
    actions.saveCareerDNA(fallbackDNA);
    setActiveDNA(fallbackDNA);
    setStep("report");
  };

  // History version selected
  const handleSelectEvolutionVersion = (dna: CareerDNA) => {
    setActiveDNA(dna);
  };

  return (
    <AppShell>
      <div className="w-full">
        {step === "cover" && (
          <QuestDossierCover
            onStart={handleStartFresh}
            onResume={store.activeQuestProgress ? handleResume : undefined}
            onViewDNA={store.careerDNA ? handleViewDNA : undefined}
            onOpenEvolution={() => setEvolutionOpen(true)}
            existingDNA={store.careerDNA}
            historyCount={(store.careerDNAHistory?.length || 0) + (store.careerDNA ? 1 : 0)}
            inProgress={store.activeQuestProgress}
          />
        )}

        {step === "context" && (
          <QuestContextStep
            initialContext={context}
            onContinue={handleContextContinue}
            onBack={() => setStep("cover")}
          />
        )}

        {step === "intro" && (
          <QuestIntroStep
            context={context}
            onBegin={handleBeginCore}
            onBack={() => setStep("context")}
          />
        )}

        {step === "core" && (
          <QuestQuestionCard
            question={currentQ}
            currentAnswer={currentAns}
            onSelectOption={handleSelectCoreOption}
            onNext={handleNextCore}
            onPrev={handlePrevCore}
            onSaveAndExit={handleSaveAndExit}
            canGoBack={true}
            totalQuestions={CORE_QUESTIONS.length}
            currentQuestionNumber={currentCoreIndex + 1}
          />
        )}

        {step === "adaptive" && (
          <QuestAdaptiveStep
            context={context}
            coreAnswers={coreAnswers}
            cachedQuestions={adaptiveQuestions.length ? adaptiveQuestions : undefined}
            cachedAnswers={adaptiveAnswers}
            onComplete={handleAdaptiveComplete}
            onBack={() => {
              setStep("core");
              setCurrentCoreIndex(CORE_QUESTIONS.length - 1);
            }}
          />
        )}

        {step === "synthesizing" && (
          <QuestSynthesizingStep
            context={context}
            coreAnswers={coreAnswers}
            adaptiveAnswers={adaptiveAnswers}
            version={(store.careerDNA?.version || 0) + 1}
            onSuccess={handleSynthesisSuccess}
            onErrorFallback={handleSynthesisFallback}
          />
        )}

        {step === "report" && activeDNA && (
          <QuestDNAReport
            dna={activeDNA}
            onRetake={handleStartFresh}
            onOpenEvolution={() => setEvolutionOpen(true)}
            historyCount={(store.careerDNAHistory?.length || 0) + (store.careerDNA ? 1 : 0)}
          />
        )}

        {/* Career Evolution Comparison Modal */}
        {activeDNA && (
          <CareerEvolutionModal
            isOpen={evolutionOpen}
            onClose={() => setEvolutionOpen(false)}
            currentDNA={activeDNA}
            history={store.careerDNAHistory || []}
            onSelectVersion={handleSelectEvolutionVersion}
          />
        )}
      </div>
    </AppShell>
  );
}
