import { useState } from "react";
import {
  X,
  History,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Calendar,
  Compass,
  Check,
} from "lucide-react";
import type { CareerDNA } from "@/lib/career-quest-data";
import { actions } from "@/lib/pathfinder-store";

interface CareerEvolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDNA: CareerDNA;
  history: CareerDNA[];
  onSelectVersion: (dna: CareerDNA) => void;
}

export function CareerEvolutionModal({
  isOpen,
  onClose,
  currentDNA,
  history,
  onSelectVersion,
}: CareerEvolutionModalProps) {
  const allVersions = [currentDNA, ...history.filter((h) => h.id !== currentDNA.id)];
  const [selectedId, setSelectedId] = useState<string>(currentDNA.id);

  if (!isOpen) return null;

  const activeCompareDNA = allVersions.find((v) => v.id === selectedId) || currentDNA;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white border border-stone-200 shadow-2xl font-sans max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-stone-200 p-5 sm:p-6">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-violet/10 text-violet">
              <History className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-lg">
                Career Evolution & Retake History
              </h3>
              <p className="text-xs text-stone-500">
                Track how your interests, strengths, and archetypes evolve over time.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-xl text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1">
          {/* Version Selector Tabs */}
          <div>
            <div className="text-xs font-mono font-bold uppercase text-stone-500 mb-2">
              Assessment Versions ({allVersions.length})
            </div>
            <div className="flex flex-wrap gap-2">
              {allVersions.map((item, idx) => {
                const isSelected = item.id === selectedId;
                const isLatest = idx === 0;

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all border ${
                      isSelected
                        ? "border-violet bg-lilac/30 text-violet shadow-sm"
                        : "border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100"
                    }`}
                  >
                    <span>Version {item.version || allVersions.length - idx}</span>
                    <span className="text-[10px] font-mono text-stone-400">
                      ({item.completedAt})
                    </span>
                    {isLatest && (
                      <span className="rounded-full bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.2 font-mono">
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Version Snapshot */}
          <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-stone-400">
                  Archetype for this snapshot
                </span>
                <h4 className="text-xl font-extrabold text-stone-900">
                  {activeCompareDNA.archetype.title}
                </h4>
                <p className="text-xs text-stone-600 italic">
                  "{activeCompareDNA.archetype.tagline}"
                </p>
              </div>

              {activeCompareDNA.id !== currentDNA.id && (
                <button
                  onClick={() => {
                    onSelectVersion(activeCompareDNA);
                    onClose();
                  }}
                  className="rounded-xl bg-ink px-4 py-2 text-xs font-bold text-white hover:bg-black transition-colors"
                >
                  Set as Active Report
                </button>
              )}
            </div>

            {/* Top 3 matches in this snapshot */}
            <div>
              <div className="text-xs font-mono font-bold uppercase text-stone-500 mb-2">
                Top Matches in this assessment:
              </div>
              <div className="space-y-2">
                {activeCompareDNA.careerMatches.slice(0, 3).map((m, i) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between rounded-xl bg-white border border-stone-200 p-3 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-800">0{i + 1}.</span>
                      <span className="font-bold text-stone-900">{m.title}</span>
                      <span className="text-stone-400">({m.domain})</span>
                    </div>
                    <span className="font-mono font-bold text-stone-700">{m.matchScore}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Dimension Scores */}
            <div>
              <div className="text-xs font-mono font-bold uppercase text-stone-500 mb-2">
                Key Dimensions in this snapshot:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="rounded-lg bg-white border border-stone-200 p-2 text-center">
                  <div className="text-stone-500 text-[10px]">Technical</div>
                  <div className="font-bold text-stone-900">
                    {activeCompareDNA.dimensions.technical}%
                  </div>
                </div>
                <div className="rounded-lg bg-white border border-stone-200 p-2 text-center">
                  <div className="text-stone-500 text-[10px]">Creative</div>
                  <div className="font-bold text-stone-900">
                    {activeCompareDNA.dimensions.creative}%
                  </div>
                </div>
                <div className="rounded-lg bg-white border border-stone-200 p-2 text-center">
                  <div className="text-stone-500 text-[10px]">Analytical</div>
                  <div className="font-bold text-stone-900">
                    {activeCompareDNA.dimensions.analytical}%
                  </div>
                </div>
                <div className="rounded-lg bg-white border border-stone-200 p-2 text-center">
                  <div className="text-stone-500 text-[10px]">Leadership</div>
                  <div className="font-bold text-stone-900">
                    {activeCompareDNA.dimensions.leadership}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-stone-200 p-4 bg-stone-50 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl px-5 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
