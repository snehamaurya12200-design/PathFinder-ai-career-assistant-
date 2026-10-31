import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Sparkles,
  Compass,
  ArrowRight,
  RotateCcw,
  History,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Briefcase,
  GraduationCap,
  BookmarkCheck,
  Target,
  ExternalLink,
  Flame,
  Lightbulb,
  Calendar,
  Share2,
  Copy,
  Printer,
  ShieldAlert,
  HelpCircle,
} from "lucide-react";
import type { CareerDNA, CareerDNAMatch, CareerDNAStrength } from "@/lib/career-quest-data";
import { usePathfinder, actions } from "@/lib/pathfinder-store";

interface QuestDNAReportProps {
  dna: CareerDNA;
  onRetake: () => void;
  onOpenEvolution?: () => void;
  historyCount?: number;
}

export function QuestDNAReport({
  dna,
  onRetake,
  onOpenEvolution,
  historyCount = 0,
}: QuestDNAReportProps) {
  const store = usePathfinder((s) => s);
  const navigate = useNavigate();

  const [expandedMatchId, setExpandedMatchId] = useState<string>(
    dna.careerMatches[0]?.id || "match-1",
  );
  const [copied, setCopied] = useState(false);
  const [savedGoalToast, setSavedGoalToast] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedMatchId((prev) => (prev === id ? "" : id));
  };

  const handleAdoptGoal = (match: CareerDNAMatch) => {
    actions.adoptCareerGoal(match.title);
    setSavedGoalToast(`Career target set to "${match.title}"! Profile & Roadmap updated.`);
    setTimeout(() => setSavedGoalToast(null), 4000);
  };

  const handleCopySummary = () => {
    const text = `PATHFINDER CAREER DNA REPORT
Archetype: ${dna.archetype.title}
Tagline: ${dna.archetype.tagline}
Top Match: ${dna.careerMatches[0]?.title} (${dna.careerMatches[0]?.matchScore}% Match)
Stage: ${dna.context.stage}
Completed: ${dna.completedAt}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const dimensionsList = [
    {
      key: "analytical",
      label: "Analytical Rigor",
      value: dna.dimensions.analytical,
      color: "bg-blue-500",
    },
    {
      key: "creative",
      label: "Creative Intuition",
      value: dna.dimensions.creative,
      color: "bg-pink-500",
    },
    {
      key: "technical",
      label: "Technical Affinity",
      value: dna.dimensions.technical,
      color: "bg-violet",
    },
    {
      key: "leadership",
      label: "Leadership & Agency",
      value: dna.dimensions.leadership,
      color: "bg-amber-500",
    },
    {
      key: "empathy",
      label: "Human Empathy",
      value: dna.dimensions.empathy,
      color: "bg-emerald-500",
    },
    {
      key: "autonomy",
      label: "Autonomous Drive",
      value: dna.dimensions.autonomy,
      color: "bg-purple-600",
    },
    {
      key: "adaptability",
      label: "Adaptive Resilience",
      value: dna.dimensions.adaptability,
      color: "bg-teal-500",
    },
    {
      key: "socialImpact",
      label: "Mission & Impact",
      value: dna.dimensions.socialImpact,
      color: "bg-orange",
    },
  ];

  return (
    <div className="relative mx-auto max-w-4xl space-y-8 font-sans pb-16">
      {/* Toast alert */}
      {savedGoalToast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white shadow-2xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{savedGoalToast}</span>
        </div>
      )}

      {/* Top Dossier Navigation & Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white border border-stone-200/90 p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-lilac/40 text-violet font-bold">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono tracking-widest text-stone-500 uppercase">
                CAREER DNA DOSSIER
              </span>
              <span className="rounded-full bg-violet/10 px-2 py-0.5 text-[10px] font-bold text-violet">
                v{dna.version}.0
              </span>
            </div>
            <div className="text-sm font-bold text-stone-900">
              {dna.context.stage} • Synthesized {dna.completedAt}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {historyCount > 1 && onOpenEvolution && (
            <button
              onClick={onOpenEvolution}
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors shadow-sm"
            >
              <History className="h-3.5 w-3.5 text-violet" />
              <span>Career Evolution ({historyCount})</span>
            </button>
          )}

          <button
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors shadow-sm"
            title="Copy summary text"
          >
            <Copy className="h-3.5 w-3.5 text-stone-500" />
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors shadow-sm"
            title="Print or save as PDF"
          >
            <Printer className="h-3.5 w-3.5 text-stone-500" />
            <span>Print</span>
          </button>

          <button
            onClick={onRetake}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors shadow-sm"
          >
            <RotateCcw className="h-3.5 w-3.5 text-stone-500" />
            <span>Retake Quest</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: ARCHETYPE HERO CARD */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-10 shadow-lg">
        {/* Decorative corner washi tape */}
        <div className="absolute top-4 right-6 rotate-1 rounded bg-[#EAE5D9] px-3 py-1 text-[11px] font-mono text-stone-600 border border-stone-300">
          CONFIDENTIAL DOSSIER
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-violet/10 border border-violet/20 px-3.5 py-1 text-xs font-bold text-violet">
          <Sparkles className="h-3.5 w-3.5" />
          <span>YOUR PRIMARY CAREER ARCHETYPE</span>
        </div>

        <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
          {dna.archetype.title}
        </h1>

        <p className="mt-2 text-base sm:text-xl font-medium text-stone-600 italic">
          “{dna.archetype.tagline}”
        </p>

        <div className="mt-6 text-sm sm:text-base text-stone-700 leading-relaxed space-y-3 max-w-3xl">
          {dna.archetype.description.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Trait badges */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-stone-100">
          {dna.archetype.traits.map((trait) => (
            <span
              key={trait}
              className="rounded-full bg-stone-100 border border-stone-200 px-3.5 py-1 text-xs font-bold text-stone-800"
            >
              ✦ {trait}
            </span>
          ))}
        </div>
      </div>

      {/* SECTION 2: 8 COGNITIVE & EXECUTION DIMENSIONS */}
      <div className="rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-extrabold text-stone-900">
              Cognitive & Working Dimensions
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Normalized score distribution from your 15 core scenarios and adaptive signals.
            </p>
          </div>
          <span className="text-xs font-mono text-stone-400">8 VECTORS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dimensionsList.map((dim) => (
            <div key={dim.key} className="rounded-2xl border border-stone-100 bg-stone-50/70 p-3.5">
              <div className="flex items-center justify-between text-xs font-bold text-stone-800 mb-2">
                <span>{dim.label}</span>
                <span className="font-mono text-stone-900">{dim.value}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
                <div
                  className={`h-full rounded-full ${dim.color} transition-all duration-500`}
                  style={{ width: `${dim.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: TOP 5 CAREER MATCHES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
              Top 5 Career Matches
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Ranked and contextualized specifically to your stage ({dna.context.stage}).
            </p>
          </div>
          <div className="text-xs font-mono text-stone-400">AI MATCHED</div>
        </div>

        <div className="space-y-4">
          {dna.careerMatches.map((match, idx) => {
            const isExpanded = expandedMatchId === match.id;
            const isCurrentGoal = store.goal.toLowerCase() === match.title.toLowerCase();

            return (
              <div
                key={match.id}
                className={`overflow-hidden rounded-3xl border transition-all ${
                  isExpanded
                    ? "border-stone-900 bg-white shadow-xl ring-1 ring-stone-900/10"
                    : "border-stone-200/90 bg-white hover:border-stone-300 shadow-sm"
                }`}
              >
                {/* Header row */}
                <div
                  onClick={() => toggleExpand(match.id)}
                  className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-white font-extrabold text-base">
                      0{idx + 1}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                          {match.domain}
                        </span>
                        {isCurrentGoal && (
                          <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                            Current Goal
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                        {match.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-lg font-black text-stone-900">{match.matchScore}%</div>
                      <div className="text-[10px] font-mono text-stone-400 uppercase">DNA FIT</div>
                    </div>

                    <div className="grid h-8 w-8 place-items-center rounded-xl bg-stone-100 text-stone-600">
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-stone-100 p-5 sm:p-8 space-y-6 bg-[#FAFAF8]">
                    {/* Summary & Why Matched */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="rounded-2xl bg-white border border-stone-200 p-4">
                        <div className="text-xs font-mono font-bold text-stone-500 uppercase mb-1">
                          Role Summary
                        </div>
                        <p className="text-sm text-stone-800 leading-relaxed">{match.summary}</p>
                      </div>

                      <div className="rounded-2xl bg-lilac/25 border border-violet/30 p-4">
                        <div className="text-xs font-mono font-bold text-violet uppercase mb-1 flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>Why This Matches Your DNA</span>
                        </div>
                        <p className="text-sm text-stone-800 leading-relaxed">{match.whyMatched}</p>
                      </div>
                    </div>

                    {/* Day in the Life */}
                    <div className="rounded-2xl bg-white border border-stone-200 p-4 sm:p-5">
                      <div className="text-xs font-mono font-bold text-stone-500 uppercase mb-2">
                        Day In The Life Snapshot
                      </div>
                      <p className="text-sm text-stone-700 leading-relaxed">{match.dayInTheLife}</p>
                    </div>

                    {/* Key Skills & Outlook */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="rounded-2xl bg-white border border-stone-200 p-4">
                        <div className="text-xs font-mono font-bold text-stone-500 uppercase mb-2">
                          Key Skills to Cultivate
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {match.keySkills.map((sk) => (
                            <span
                              key={sk}
                              className="rounded-lg bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-800"
                            >
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-2xl bg-white border border-stone-200 p-4">
                        <div className="text-xs font-mono font-bold text-stone-500 uppercase mb-2">
                          Industry & Growth Outlook
                        </div>
                        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                          {match.growthOutlook}
                        </p>
                      </div>
                    </div>

                    {/* Starter Project */}
                    <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-4 sm:p-5">
                      <div className="text-xs font-mono font-bold text-amber-800 uppercase mb-1 flex items-center gap-1.5">
                        <Flame className="h-4 w-4 text-orange" />
                        <span>Recommended 1-Week Starter Project</span>
                      </div>
                      <p className="text-sm text-stone-800 font-medium leading-relaxed">
                        {match.starterProject}
                      </p>
                    </div>

                    {/* Match Action Toolbar */}
                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      <button
                        onClick={() => handleAdoptGoal(match)}
                        disabled={isCurrentGoal}
                        className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all shadow-sm ${
                          isCurrentGoal
                            ? "bg-stone-200 text-stone-500 cursor-default"
                            : "bg-ink text-white hover:bg-black"
                        }`}
                      >
                        <Target className="h-4 w-4 text-sun" />
                        <span>
                          {isCurrentGoal ? "Active Target Goal" : "Adopt as My Target Goal"}
                        </span>
                      </button>

                      <Link
                        to="/learning"
                        search={{ query: match.recommendedCourseQuery || match.title }}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors shadow-sm"
                      >
                        <GraduationCap className="h-4 w-4 text-violet" />
                        <span>Explore Courses</span>
                      </Link>

                      <Link
                        to="/roadmap"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors shadow-sm"
                      >
                        <Compass className="h-4 w-4 text-stone-500" />
                        <span>View Roadmap</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 4: 10 CORE STRENGTHS & EVIDENCE */}
      <div className="rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
              10 Core Strengths & Evidence
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Uncovered from your uncensored choices across the 5 discovery rounds.
            </p>
          </div>
          <span className="text-xs font-mono text-stone-400">10 PILLARS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dna.strengths.map((str, i) => (
            <div
              key={str.name}
              className="rounded-2xl border border-stone-200/90 bg-stone-50/50 p-4 sm:p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-stone-900 text-sm sm:text-base">
                    0{i + 1}. {str.name}
                  </span>
                  <span className="rounded-full bg-stone-200/80 px-2.5 py-0.5 text-[10px] font-mono uppercase text-stone-700 font-semibold">
                    {str.category}
                  </span>
                </div>

                <div className="mt-2 text-xs text-stone-600 leading-relaxed">
                  <strong className="text-stone-800">Observed Evidence:</strong> {str.evidence}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-stone-200/60 text-xs text-violet font-medium">
                💡 <strong>Growth Tip:</strong> {str.growthTip}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: UNEXPECTED WILDCARD DISCOVERY */}
      {dna.unexpectedMatch && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blush/40 via-white to-sun/30 border border-orange/30 p-6 sm:p-8 shadow-md">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-orange/15 border border-orange/30 px-3 py-1 text-xs font-bold text-orange">
            <Lightbulb className="h-3.5 w-3.5" />
            <span>THE WILDCARD MATCH (NON-OBVIOUS DISCOVERY)</span>
          </div>

          <h3 className="mt-3 text-2xl font-extrabold text-stone-900">
            {dna.unexpectedMatch.title}
          </h3>

          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mt-0.5">
            {dna.unexpectedMatch.domain}
          </div>

          <p className="mt-3 text-sm text-stone-700 leading-relaxed max-w-2xl">
            {dna.unexpectedMatch.reason}
          </p>

          <div className="mt-4 rounded-xl bg-white/80 border border-stone-200 p-3.5 text-xs text-stone-800">
            <strong>Curiosity Hook:</strong> {dna.unexpectedMatch.explorationHook}
          </div>
        </div>
      )}

      {/* SECTION 6: 7-DAY ACTION PLAYBOOK */}
      <div className="rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">
          Next 7-Day Low-Pressure Playbook
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Tiny, zero-anxiety experiments to test your resonance without committing your whole life.
        </p>

        <div className="mt-6 space-y-3">
          {dna.actionableNextSteps.map((step) => (
            <div
              key={step.day}
              className="flex items-start gap-3.5 rounded-2xl border border-stone-200 bg-stone-50/60 p-4"
            >
              <div className="grid h-8 w-16 shrink-0 place-items-center rounded-xl bg-ink text-white font-mono text-xs font-bold">
                {step.day}
              </div>
              <div>
                <div className="font-bold text-stone-900 text-sm sm:text-base">{step.title}</div>
                <div className="text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed">
                  {step.action}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 7: WHAT WE STILL DON'T KNOW */}
      {dna.whatWeStillDontKnow?.length > 0 && (
        <div className="rounded-3xl bg-stone-100/80 border border-stone-200 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-stone-700 font-bold text-sm mb-2">
            <HelpCircle className="h-4 w-4 text-stone-500" />
            <span>Honest Scientific Humility: What We Still Don't Know</span>
          </div>
          <p className="text-xs text-stone-500 mb-4">
            No quiz can predict everything. Here are remaining ambiguities that can only be answered
            by hands-on experimentation:
          </p>

          <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
            {dna.whatWeStillDontKnow.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-stone-400 font-mono">0{idx + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* FINAL ACTIONS FOOTER */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-ink text-white p-6 sm:p-8 shadow-xl">
        <div>
          <div className="text-lg font-bold">Ready to take your next step?</div>
          <div className="text-xs text-stone-300 mt-0.5">
            Explore curated learning modules and AI mock interviews tailored to{" "}
            {dna.careerMatches[0]?.title}.
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/roadmap"
            className="inline-flex items-center gap-2 rounded-xl bg-sun px-5 py-3 text-xs sm:text-sm font-bold text-ink hover:bg-yellow-300 transition-colors shadow-sm"
          >
            <span>Explore Custom Roadmap</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
