import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionShell } from "@/components/SectionShell";
import { SkillRadar } from "@/components/SkillRadar";
import { usePathfinder, readiness } from "@/lib/pathfinder-store";
import { goalSkills } from "@/lib/pathfinder-data";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skill Assessment — Pathfinder" },
      {
        name: "description",
        content: "Design assessment, strengths, skill gaps and your skill graph.",
      },
      { property: "og:title", content: "Skill Assessment — Pathfinder" },
      { property: "og:description", content: "Your design strengths and skill gaps." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Skills,
});

function Skills() {
  const st = usePathfinder((s) => s);
  const needed = goalSkills(st.goal);
  const overallScore = readiness(st, needed.length ? needed : Object.keys(st.skills));

  const skillEntries = Object.entries(st.skills);
  const strengths = skillEntries.filter(([, v]) => v >= 50);
  const gaps = skillEntries.filter(([, v]) => v < 50);

  const displayStrengths =
    strengths.length > 0
      ? strengths.slice(0, 4)
      : [
          ["Visual Design", 94],
          ["User Research", 85],
          ["Interaction Design", 75],
          ["Content Strategy", 50],
        ];
  const displayGaps =
    gaps.length > 0
      ? gaps.slice(0, 4)
      : [
          ["Design Leadership", 40],
          ["Product Thinking", 36],
        ];

  const heights = [12, 25, 43, 68, 87, 89, 102, 98, 88, 81, 67, 55, 33, 22, 19, 16, 13, 11];

  return (
    <SectionShell>
      <div className="section-surface mx-auto max-w-4xl">
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div className="pt-4">
            <div className="reference-card ml-auto max-w-56 p-6">
              <h2 className="text-sm font-semibold">{st.goal} Score</h2>
              <p className="mt-2 flex items-start gap-2">
                <span className="text-6xl font-bold">{overallScore}</span>
                <span className="font-semibold text-success">+6</span>
              </p>
              <p className="mt-3 text-sm text-muted-foreground">Reliability</p>
              <div className="mt-2 flex items-center gap-3">
                <div className="h-2.5 flex-1 rounded-full bg-muted">
                  <div className="h-full w-[40%] rounded-full bg-violet" />
                </div>
                <span className="text-xs text-muted-foreground">40%</span>
              </div>
            </div>
            <h1 className="mt-12 text-2xl font-bold">Assessment Report</h1>
            <div className="mt-4 h-2.5 w-4/5 rounded-full bg-muted" />
          </div>
          <div className="reference-card p-5">
            <h2 className="text-2xl font-bold">Skill Graph</h2>
            <SkillRadar skills={st.skills} />
          </div>
        </div>

        <div
          className="relative mt-8 flex h-56 items-end gap-2 border-b border-dashed pb-1"
          aria-label="Assessment distribution: intermediate"
        >
          <span className="absolute left-[36%] top-0 rounded-lg bg-ink px-3 py-2 text-xs font-bold text-ink-foreground">
            {overallScore >= 75 ? "ADVANCED" : overallScore >= 45 ? "INTERMEDIATE" : "BEGINNER"}
          </span>
          {heights.map((height, i) => (
            <div
              key={i}
              className={`assessment-bar min-w-0 flex-1 ${i === 7 ? "bg-success" : i > 5 && i < 12 ? "bg-mint/30" : ""}`}
              style={{ height: `${height * 1.6}px` }}
            />
          ))}
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="mb-5 text-sm font-bold">Strengths</h2>
            <div className="space-y-4">
              {displayStrengths.map(([name, value]) => (
                <div
                  key={name as string}
                  className="grid grid-cols-2 items-center gap-3 text-xs text-muted-foreground"
                >
                  <span className="font-medium text-foreground">{name}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-success"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-sm font-bold">Skill Gaps</h2>
              <Link to="/learning" className="text-xs text-link hover:underline">
                Close gaps with courses →
              </Link>
            </div>
            <div className="space-y-4">
              {displayGaps.map(([name, value]) => (
                <div
                  key={name as string}
                  className="grid grid-cols-2 items-center gap-3 text-xs text-muted-foreground"
                >
                  <span className="font-medium text-foreground">{name}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-orange"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
