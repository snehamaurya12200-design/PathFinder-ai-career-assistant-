import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check,
  ChevronRight,
  BookOpen,
  Clock,
  Trophy,
  X,
  Lock,
  Hammer,
  Code2,
  Palette,
  BarChart3,
  Play,
  Sparkles,
} from "lucide-react";
import { SectionShell } from "@/components/SectionShell";
import { Button } from "@/components/ui/button";
import html from "@/assets/html-course.jpg.asset.json";
import css from "@/assets/css-course.jpg.asset.json";
import tailwind from "@/assets/tailwind-course.jpg.asset.json";

import { actions, readiness, usePathfinder } from "@/lib/pathfinder-store";
import { goalSkills } from "@/lib/pathfinder-data";
import { toast } from "sonner";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Explore Careers — Pathfinder" },
      {
        name: "description",
        content:
          "Explore career paths and follow step-by-step roadmaps with courses and hands-on builds.",
      },
      { property: "og:title", content: "Explore Careers — Pathfinder" },
      {
        property: "og:description",
        content: "Pick a career path and track your roadmap progress.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Roadmap,
});

type Course = { title: string; image: { url: string }; progress: number; topics: string };
const careers = [
  {
    id: "frontend",
    name: "Frontend Developer",
    icon: Code2,
    salary: "₹6–18 LPA",
    demand: "High demand",
    color: "bg-lilac",
  },
  {
    id: "uiux",
    name: "UI/UX Designer",
    icon: Palette,
    salary: "₹5–16 LPA",
    demand: "Growing",
    color: "bg-blush",
  },
  {
    id: "data",
    name: "Data Analyst",
    icon: BarChart3,
    salary: "₹5–14 LPA",
    demand: "High demand",
    color: "bg-mint",
  },
] as const;
const steps = [
  {
    n: 1,
    title: "Get Started With Basics",
    level: "Beginner",
    hours: 8,
    points: 400,
    desc: "Master the fundamentals through guided courses, then test your skills with hands-on builds.",
    courses: [
      {
        title: "HTML Essentials",
        image: html,
        progress: 100,
        topics: "Semantic structure · Forms · Accessible markup",
      },
      {
        title: "CSS Essentials",
        image: css,
        progress: 100,
        topics: "Selectors · Flexbox · Grid · Responsive design",
      },
    ],
    builds: [
      {
        title: "TailwindCss Mastery 1",
        image: tailwind,
        progress: 100,
        topics: "Utility classes · Responsive layouts",
      },
      {
        title: "TailwindCss Mastery 2",
        image: tailwind,
        progress: 60,
        topics: "Component styling · Theming",
      },
    ],
  },
  {
    n: 2,
    title: "JavaScript & the Browser",
    level: "Intermediate",
    hours: 14,
    points: 650,
    desc: "Learn JavaScript, DOM events and fetching data to make your pages interactive.",
    courses: [],
    builds: [],
  },
  {
    n: 3,
    title: "React & Portfolio",
    level: "Advanced",
    hours: 20,
    points: 900,
    desc: "Build real apps with React and TypeScript and ship a portfolio employers love.",
    courses: [],
    builds: [],
  },
];

function Roadmap() {
  const st = usePathfinder((s) => s);
  const initialCareer =
    careers.find((c) => c.name.toLowerCase() === st.goal.toLowerCase())?.id ?? "frontend";
  const [career, setCareer] = useState<string>(initialCareer);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<Course | null>(null);
  const current = careers.find((c) => c.id === career) ?? careers[0]!;
  const s = steps[step]!;
  const all = [...s.courses, ...s.builds];
  const pct = all.length ? Math.round(all.reduce((a, c) => a + c.progress, 0) / all.length) : 0;

  function selectCareer(c: (typeof careers)[number]) {
    setCareer(c.id);
    setStep(0);
    actions.setGoal(c.name);
    toast.success(`Target career set to ${c.name}`, {
      description: "Roadmap, recommended courses, and dashboard have been updated.",
    });
  }

  return (
    <SectionShell>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">Explore Careers</h1>
          <p className="text-xs text-muted-foreground">
            Pick a path that fits your skills and follow its roadmap.
          </p>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-butter px-3 py-1 text-xs font-semibold">
          <Trophy className="h-4 w-4 text-orange" />
          1958 Points
        </span>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {careers.map((c) => {
          const active = c.name.toLowerCase() === st.goal.toLowerCase() || c.id === career;
          const matchPct = readiness(st, goalSkills(c.name));
          return (
            <button
              key={c.id}
              onClick={() => selectCareer(c)}
              className={`rounded-2xl border bg-card p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md ${active ? "border-violet ring-2 ring-lilac" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className={`grid h-10 w-10 place-items-center rounded-xl ${c.color}`}>
                  <c.icon className="h-5 w-5" />
                </span>
                {active && (
                  <span className="rounded-full bg-violet px-2 py-0.5 text-[10px] text-primary-foreground">
                    Selected Goal
                  </span>
                )}
              </div>
              <h2 className="mt-3 font-semibold">{c.name}</h2>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {c.salary} · {c.demand}
              </p>
              <div className="mt-3 flex items-center gap-2 text-[10px]">
                <div className="h-1.5 flex-1 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-success transition-all"
                    style={{ width: `${matchPct}%` }}
                  />
                </div>
                <b className="text-success">{matchPct}% match</b>
              </div>
            </button>
          );
        })}
      </div>

      <div className="section-surface border">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            Roadmaps <ChevronRight className="h-3 w-3" />
            <b className="text-foreground">{current.name} Roadmap</b>
          </p>
          <span className="flex items-center gap-1 text-xs text-violet">
            <Sparkles className="h-4 w-4" />
            AI-personalised for you
          </span>
        </div>

        {st.customRoadmap && (
          <div className="mb-6 rounded-2xl border border-violet/30 bg-lilac/25 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="flex items-center gap-2 text-sm font-bold text-violet">
                  <Sparkles className="h-4 w-4" />
                  AI Custom Roadmap: {st.customRoadmap.goal}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{st.customRoadmap.summary}</p>
              </div>
              <span className="rounded-full bg-violet px-2.5 py-0.5 text-[11px] font-semibold text-primary-foreground">
                Active Custom Track
              </span>
            </div>
            {st.customRoadmap.weeks && (
              <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {st.customRoadmap.weeks.map((w) => (
                  <div key={w.week} className="rounded-xl border bg-card p-2.5 text-xs">
                    <span className="font-bold text-violet">Week {w.week}: </span>
                    <span className="font-semibold">{w.title}</span>
                    {w.deliverable && (
                      <p className="mt-1 text-[11px] text-success">Milestone: {w.deliverable}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <ol className="mb-6 grid gap-3 sm:grid-cols-3">
          {steps.map((st, i) => {
            const locked = i > 0;
            return (
              <li key={st.n}>
                <button
                  disabled={locked}
                  onClick={() => setStep(i)}
                  className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left text-xs transition ${step === i ? "border-violet bg-lilac/40" : "bg-card"} ${locked ? "opacity-60" : "hover:bg-lilac/20"}`}
                >
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${locked ? "bg-muted" : "bg-violet text-primary-foreground"}`}
                  >
                    {locked ? <Lock className="h-3.5 w-3.5" /> : st.n}
                  </span>
                  <span>
                    <b className="block">Step {st.n}</b>
                    <span className="text-muted-foreground">{st.title}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="grid items-start gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between text-xs">
              <b>Step {s.n}</b>
              <span className="text-muted-foreground">{pct}% done</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-muted">
              <div className="h-full rounded-full bg-violet" style={{ width: `${pct}%` }} />
            </div>
            <h2 className="mt-5 text-sm font-bold">{s.title}</h2>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">{s.desc}</p>
            <div className="mt-5 grid grid-cols-2 gap-2 text-[11px]">
              {[
                [BookOpen, s.level],
                [Clock, `${s.hours} hours`],
                [Hammer, `${s.builds.length || 2} builds`],
                [Trophy, `+${s.points} pts`],
              ].map(([Icon, label]) => {
                const I = Icon as typeof BookOpen;
                return (
                  <span
                    key={String(label)}
                    className="flex items-center gap-1.5 rounded-lg bg-muted px-2 py-1.5"
                  >
                    <I className="h-3 w-3 text-violet" />
                    {String(label)}
                  </span>
                );
              })}
            </div>
            <Button
              className="mt-5 w-full"
              size="sm"
              onClick={() => setSelected(all.find((c) => c.progress < 100) ?? all[0] ?? null)}
            >
              <Play />
              Continue learning
            </Button>
          </aside>

          <div className="roadmap-line">
            <Group
              done
              title="Courses to Build Your Foundation"
              desc="Solidify core concepts with foundational courses."
              items={s.courses}
              onPick={setSelected}
            />
            <div className="mt-8">
              <Group
                title="Build Projects to Apply Your Skills"
                desc="Put your learning into action with hands-on builds."
                items={s.builds}
                onPick={setSelected}
              />
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-2xl bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selected.image.url} alt="" className="h-36 w-full object-cover" />
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">{selected.title}</h2>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Close"
                  onClick={() => setSelected(null)}
                >
                  <X />
                </Button>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{selected.topics}</p>
              <div className="mt-4 h-1.5 rounded-full bg-muted">
                <div
                  className={`h-full rounded-full ${selected.progress === 100 ? "bg-success" : "bg-violet"}`}
                  style={{ width: `${selected.progress}%` }}
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-success">
                  {selected.progress === 100 ? "Completed" : `${selected.progress}% complete`}
                </span>
                <Button size="sm">{selected.progress === 100 ? "Review" : "Resume"}</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </SectionShell>
  );
}

function Group({
  title,
  desc,
  items,
  onPick,
  done,
}: {
  title: string;
  desc: string;
  items: Course[];
  onPick: (c: Course) => void;
  done?: boolean;
}) {
  const complete = items.filter((i) => i.progress === 100).length;
  return (
    <section className="relative">
      <span
        className={`absolute -left-[46px] grid h-7 w-7 place-items-center rounded-full text-[10px] ${done ? "bg-violet text-primary-foreground shadow-soft" : "border-4 border-lilac border-r-violet bg-card"}`}
      >
        {done ? <Check className="h-5 w-5" /> : `${complete}/${items.length || 2}`}
      </span>
      <h2 className={`text-sm font-bold ${done ? "text-violet" : ""}`}>{title}</h2>
      <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
      {items.length === 0 ? (
        <p className="mt-4 flex items-center gap-2 rounded-xl border border-dashed p-4 text-xs text-muted-foreground">
          <Lock className="h-4 w-4" />
          Unlocks when you finish the previous step.
        </p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {items.map((c) => (
            <button
              key={c.title}
              onClick={() => onPick(c)}
              className="group overflow-hidden rounded-xl border bg-card text-left transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <img
                src={c.image.url}
                alt={c.title}
                className="aspect-[1.86] w-full object-cover transition group-hover:scale-105"
              />
              <div className="p-3">
                <span className="text-xs font-bold">{c.title}</span>
                <div className="mt-2 h-1 rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${c.progress === 100 ? "bg-mint" : "bg-violet"}`}
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
                <span className="mt-1 block text-[10px] text-success">
                  {c.progress === 100 ? "Completed" : `${c.progress}% complete`}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
