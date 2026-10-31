import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronLeft,
  Bell,
  Lightbulb,
  Target,
  UserRound,
  NotebookPen,
  Sparkles,
  CircleCheck,
  TriangleAlert,
  CircleDot,
  Play,
} from "lucide-react";
import { SectionShell } from "@/components/SectionShell";
import { Button } from "@/components/ui/button";
import { usePathfinder } from "@/lib/pathfinder-store";
import { MockInterviewDialog } from "@/components/pathfinder/dialogs";
import call from "@/assets/interview-call.jpg.asset.json";

export const Route = createFileRoute("/interviews")({
  head: () => ({
    meta: [
      { title: "AI Interview — Pathfinder" },
      {
        name: "description",
        content: "Live mock interview with AI score, breakdown and actionable insights.",
      },
      { property: "og:title", content: "AI Interview — Pathfinder" },
      { property: "og:description", content: "Practice interviews and get instant AI feedback." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Interviews,
});

function Donut({ breakdown }: { breakdown: { label: string; value: number; color: string }[] }) {
  const r = 60,
    c = 2 * Math.PI * r,
    gap = 6;
  let offset = 0;
  return (
    <svg viewBox="0 0 160 160" className="h-40 w-40">
      {breakdown.map((s) => {
        const len = (s.value / 100) * c - gap;
        const el = (
          <circle
            key={s.label}
            cx="80"
            cy="80"
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={`${len} ${c}`}
            strokeDashoffset={-offset}
            transform="rotate(-90 80 80)"
          />
        );
        offset += (s.value / 100) * c;
        return el;
      })}
    </svg>
  );
}

function Interviews() {
  const st = usePathfinder((s) => s);
  const [moveOn, setMoveOn] = useState<"yes" | "no">("yes");
  const [dialogOpen, setDialogOpen] = useState(false);
  const recs = [Lightbulb, Target, UserRound, NotebookPen];

  const latest = st.detailedInterviews?.[0];
  const interviewScore = latest?.score ?? st.interviews[0]?.score ?? 78;
  const roleTitle = latest?.role ?? st.goal;

  const breakdownData = latest
    ? [
        { label: "Technical", value: latest.breakdown.technical, color: "var(--chart-cyan)" },
        { label: "Clarity", value: latest.breakdown.relevance, color: "var(--chart-green)" },
        { label: "Emotion", value: latest.breakdown.problemSolving, color: "var(--sun)" },
        {
          label: "Communication",
          value: latest.breakdown.communication,
          color: "var(--chart-pink)",
        },
        { label: "Confidence", value: latest.breakdown.confidence, color: "var(--chart-blue)" },
      ]
    : [
        { label: "Technical", value: 20, color: "var(--chart-cyan)" },
        { label: "Clarity", value: 10, color: "var(--chart-green)" },
        { label: "Emotion", value: 15, color: "var(--sun)" },
        { label: "Communication", value: 25, color: "var(--chart-pink)" },
        { label: "Confidence", value: 30, color: "var(--chart-blue)" },
      ];

  const strengthInsight =
    latest?.strength ?? "You demonstrated good domain fundamentals and composure.";
  const improvementInsight =
    latest?.improvement ??
    "Confidence dropped slightly during behavioral and system design questions.";
  const recommendationInsight =
    latest?.recommendation ??
    "Practice answering behavioral questions using the STAR method for clearer structure.";

  return (
    <SectionShell>
      <div className="rounded-2xl bg-interview-panel p-5">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Button
              asChild
              variant="outline"
              size="icon"
              aria-label="Back"
              className="h-8 w-8 bg-card"
            >
              <Link to="/">
                <ChevronLeft />
              </Link>
            </Button>
            <h1 className="text-sm font-semibold">Interview for {roleTitle}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              onClick={() => setDialogOpen(true)}
              className="flex items-center gap-1.5 bg-violet text-primary-foreground hover:bg-violet/90"
            >
              <Play className="h-3.5 w-3.5" /> Start New Mock Interview
            </Button>
            <Bell className="h-5 w-5 text-destructive" />
            <span className="rounded-full border bg-card px-6 py-1.5 text-xs font-semibold">
              Yelena
            </span>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl">
              <img src={call.url} alt="Interview video call" className="h-64 w-full object-cover" />
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_1.5fr]">
              <div className="rounded-2xl bg-card p-4 text-center">
                <h2 className="text-xs font-semibold">AI interview score</h2>
                <div className="mx-auto my-4 flex h-28 w-28 items-center justify-center rounded-full border-[6px] border-interview-blue">
                  <span className="text-3xl font-extrabold text-interview-blue">
                    {interviewScore}%
                  </span>
                </div>
                <p className="text-left text-[11px] text-muted-foreground">
                  {interviewScore >= 75
                    ? "Strong – mostly ready, keep sharpening edge cases"
                    : "Good – a few specific areas to improve before live rounds"}
                </p>
                <div className="mt-3 flex items-center gap-2 text-[11px]">
                  Move forward?
                  {(["yes", "no"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setMoveOn(v)}
                      className={`rounded-full px-3 py-0.5 capitalize ${moveOn === v ? "bg-violet text-primary-foreground" : "bg-muted"}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-card p-4">
                <h2 className="mx-auto mb-2 w-fit rounded-full bg-muted px-4 py-1 text-xs font-semibold">
                  AI Score Breakdown
                </h2>
                <div className="flex items-center justify-center gap-4">
                  <ul className="space-y-3 text-[11px]">
                    {breakdownData
                      .slice(0, 1)
                      .concat(breakdownData.slice(4))
                      .map((s) => (
                        <li key={s.label}>
                          {s.label}
                          <br />
                          <b>{s.value}%</b>
                        </li>
                      ))}
                  </ul>
                  <Donut breakdown={breakdownData} />
                  <ul className="space-y-3 text-right text-[11px]">
                    {breakdownData.slice(1, 4).map((s) => (
                      <li key={s.label}>
                        {s.label}
                        <br />
                        <b>{s.value}%</b>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-card p-4">
              <h2 className="mx-auto mb-4 w-fit rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                Practice recommendation
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {recs.map((Icon, i) => (
                  <button
                    key={i}
                    onClick={() => setDialogOpen(true)}
                    className="flex aspect-square items-center justify-center rounded-xl bg-muted shadow-sm transition hover:-translate-y-0.5"
                  >
                    <Icon
                      className={`h-8 w-8 ${["text-sun", "text-destructive", "text-interview-blue", "text-violet"][i]}`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-card p-4 text-[11px]">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-violet" />
                AI Insights
              </h2>
              <div className="space-y-3">
                <p className="flex gap-2">
                  <CircleCheck className="h-4 w-4 shrink-0 text-success" />
                  <span>
                    <b>Strength Insight</b>
                    <br />
                    {strengthInsight}
                  </span>
                </p>
                <p className="flex gap-2">
                  <TriangleAlert className="h-4 w-4 shrink-0 text-sun" />
                  <span>
                    <b>Improvement</b>
                    <br />
                    {improvementInsight}
                  </span>
                </p>
                <p className="flex gap-2">
                  <CircleDot className="h-4 w-4 shrink-0 text-destructive" />
                  <span>
                    <b>Actionable Recommendation</b>
                    <br />
                    {recommendationInsight}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MockInterviewDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </SectionShell>
  );
}
