import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell,
  Play,
  ChevronRight,
  Zap,
  Target,
  Clock,
  BookOpen,
  CheckCircle2,
  Circle,
  Lock,
  CalendarDays,
} from "lucide-react";
import { SectionShell } from "@/components/SectionShell";
import { Button } from "@/components/ui/button";
import { SkillRadar } from "@/components/SkillRadar";
import leader from "@/assets/leadership.jpg.asset.json";
import feedback from "@/assets/feedback.jpg.asset.json";
import awareness from "@/assets/awareness.jpg.asset.json";
import practices from "@/assets/practices.jpg.asset.json";
import styles from "@/assets/styles.jpg.asset.json";
import constructive from "@/assets/constructive.jpg.asset.json";
import { actions, usePathfinder } from "@/lib/pathfinder-store";
import {
  courses,
  recommend,
  testBank,
  ALL_EDUCATION_LEVELS,
  ALL_ACADEMIC_STREAMS,
  type EducationLevel,
} from "@/lib/pathfinder-data";
import { CourseDialog, MockInterviewDialog, MockTestDialog } from "@/components/pathfinder/dialogs";
import { toast } from "sonner";
import { z } from "zod";
import { Sparkles, Mic, ClipboardCheck, Search, Filter, X } from "lucide-react";

export const Route = createFileRoute("/learning")({
  validateSearch: z.object({
    course: z.string().optional(),
    open: z.enum(["test", "interview"]).optional(),
  }),
  head: () => ({
    meta: [
      { title: "My Development — Pathfinder" },
      {
        name: "description",
        content: "Leadership learning path, lessons and development skill comparison.",
      },
      { property: "og:title", content: "My Development — Pathfinder" },
      { property: "og:description", content: "Your leadership learning journey." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Learning,
});
const lessons = [
  {
    title: "Getting started: your first position",
    image: null,
    done: true,
    date: "Mar 16, 2022",
    mins: 5,
    about: "Understand where you stand today as a team member and future leader.",
  },
  {
    title: "Giving feedback",
    image: feedback,
    done: true,
    date: "Mar 22, 2022",
    mins: 8,
    about: "Learn simple ways to share feedback that people welcome.",
  },
  {
    title: "Learn more about leadership",
    image: awareness,
    done: true,
    date: "Mar 29, 2022",
    mins: 10,
    about: "What leadership really means and why it matters at work.",
  },
  {
    title: "Good practices",
    image: practices,
    done: true,
    date: "Apr 5, 2022",
    mins: 7,
    about: "Everyday habits of effective team leaders.",
  },
  {
    title: "Leadership styles",
    image: styles,
    done: true,
    date: "Apr 12, 2022",
    mins: 9,
    about: "Discover different leadership styles and when to use each one.",
  },
  {
    title: "Constructive feedback",
    image: constructive,
    done: true,
    date: "Apr 19, 2022",
    mins: 8,
    about: "Turn criticism into clear, helpful next steps.",
  },
  {
    title: "The leader in detail",
    image: practices,
    done: true,
    date: "Apr 26, 2022",
    mins: 12,
    about: "A closer look at the skills a great leader uses every day.",
  },
  {
    title: "The art of feedback",
    image: leader,
    done: false,
    date: "May 3, 2022",
    mins: 10,
    about: "Master timing, tone and follow-up when giving feedback.",
  },
  {
    title: "Putting it into practice",
    image: constructive,
    done: false,
    date: "May 10, 2022",
    mins: 15,
    about: "Apply everything you learned in a real-life scenario.",
  },
];

function Learning() {
  const [selected, setSelected] = useState(lessons.findIndex((l) => !l.done));
  const [reminder, setReminder] = useState(true);
  const [done, setDone] = useState<boolean[]>(lessons.map((l) => l.done));
  const lesson = lessons[selected]!;
  const completed = done.filter(Boolean).length;
  const pct = Math.round((completed / lessons.length) * 100);
  const nextOpen = done.findIndex((d) => !d);
  return (
    <SectionShell>
      <div className="section-surface">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold">
              <BookOpen className="h-5 w-5" />
              Management in the Workplace
            </h1>
            <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-mint px-2 py-0.5 font-semibold text-primary-foreground">
                In progress
              </span>
              <CalendarDays className="h-3.5 w-3.5" />
              Feb 28, 2022 – May 31, 2022
            </p>
          </div>
          <div className="min-w-56 rounded-xl border bg-card p-3">
            <div className="flex justify-between text-xs">
              <b>Your progress</b>
              <span className="text-muted-foreground">
                {completed} of {lessons.length} lessons
              </span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-mint transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-1 text-right text-[10px] font-semibold text-success">
              {pct}% complete
            </p>
          </div>
        </div>

        <div className="grid items-start gap-6 xl:grid-cols-[1.3fr_1fr]">
          <section>
            <div className="mb-4 flex items-center gap-3 rounded-xl border bg-card p-2">
              <img
                src={leader.url}
                alt="Leadership workshop"
                className="h-12 w-14 rounded-lg object-cover"
              />
              <div>
                <h2 className="font-semibold">Becoming a Leader</h2>
                <p className="text-[11px] text-muted-foreground">
                  9 short lessons · about 1.5 hours
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                aria-pressed={reminder}
                onClick={() => setReminder(!reminder)}
                className="ml-auto rounded-full text-orange"
              >
                <Bell className={reminder ? "fill-orange" : ""} />
                {reminder ? "Reminder on" : "Remind me"}
              </Button>
            </div>
            <ol className="space-y-2">
              {lessons.map((item, i) => {
                const isDone = done[i],
                  locked = !isDone && i !== nextOpen,
                  active = selected === i;
                return (
                  <li key={item.title}>
                    <button
                      disabled={locked}
                      onClick={() => setSelected(i)}
                      className={`flex w-full items-center gap-3 rounded-xl border bg-card p-2 text-left transition ${active ? "border-chart-cyan ring-2 ring-chart-cyan/30" : "hover:bg-muted/50"} ${locked ? "opacity-50" : ""}`}
                    >
                      <span className="w-5 text-center text-xs font-bold text-muted-foreground">
                        {i + 1}
                      </span>
                      {item.image ? (
                        <img
                          src={item.image.url}
                          alt=""
                          className="h-11 w-11 shrink-0 rounded-lg object-cover"
                        />
                      ) : (
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-muted">
                          <Target className="h-5 w-5 text-muted-foreground" />
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{item.title}</span>
                        <span className="text-[11px] text-muted-foreground">
                          {item.mins} min · {item.date}
                        </span>
                      </span>
                      {isDone ? (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      ) : locked ? (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <span className="rounded-full bg-orange px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                          Up next
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
          </section>

          <aside className="space-y-4">
            <div className="overflow-hidden rounded-xl border bg-card">
              {lesson.image && (
                <img src={lesson.image.url} alt="" className="h-36 w-full object-cover" />
              )}
              <div className="p-4">
                <p className="text-[11px] text-muted-foreground">
                  Lesson {selected + 1} · {lesson.mins} min
                </p>
                <h2 className="mt-1 text-lg font-semibold">{lesson.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{lesson.about}</p>
                <div className="mt-4 flex gap-2">
                  {done[selected] ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        toast(`Replaying: ${lesson.title}`, {
                          description: `${lesson.mins} min lesson`,
                        })
                      }
                    >
                      <Play />
                      Watch again
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => {
                        const d = [...done];
                        d[selected] = true;
                        setDone(d);
                        actions.lessonComplete();
                        actions.boostSkills(["Design Leadership", "Communication"], 2);
                        toast.success("Lesson complete", {
                          description: "Leadership & communication progress updated.",
                        });
                        setSelected(Math.min(selected + 1, lessons.length - 1));
                      }}
                    >
                      <Circle />
                      Mark as complete
                    </Button>
                  )}
                  {selected < lessons.length - 1 &&
                    (done[selected] || selected + 1 === nextOpen) && (
                      <Button size="sm" variant="ghost" onClick={() => setSelected(selected + 1)}>
                        Next <ChevronRight />
                      </Button>
                    )}
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <h3 className="text-sm font-semibold">Your skills</h3>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
                {[
                  [Zap, `${pct}%`, "Success rate"],
                  [Target, `${completed}/9`, "Skills mastered"],
                  [Clock, "52 min", "Time spent"],
                ].map(([Icon, value, label]) => {
                  const I = Icon as typeof Zap;
                  return (
                    <div key={String(label)} className="rounded-lg bg-muted p-2">
                      <I className="mx-auto h-4 w-4 text-chart-cyan" />
                      <b className="mt-1 block text-sm">{String(value)}</b>
                      <span className="text-muted-foreground">{String(label)}</span>
                    </div>
                  );
                })}
              </div>
              <SkillRadar compact development />
              <div className="flex flex-wrap justify-center gap-3 text-[10px]">
                <span className="text-chart-cyan">■ Current skill</span>
                <span className="text-chart-green">■ Theoretical skill</span>
                <span className="text-muted-foreground">■ Expected skill</span>
              </div>
              <p className="mt-4 text-xs font-semibold">What you will learn</p>
              <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                {[
                  "Give useful feedback to your team",
                  "Show confident leadership",
                  "Handle crisis situations calmly",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
      <CoursesHub />
    </SectionShell>
  );
}

function CoursesHub() {
  const search = Route.useSearch();
  const goal = usePathfinder((s) => s.goal);
  const skills = usePathfinder((s) => s.skills);
  const enrolled = usePathfinder((s) => s.enrolled);
  const list = usePathfinder((s) => s.learningList);
  const tests = usePathfinder((s) => s.tests);
  const interviews = usePathfinder((s) => s.interviews);
  const customRoadmap = usePathfinder((s) => s.customRoadmap);
  const profile = usePathfinder((s) => s.profile);

  const [tab, setTab] = useState<"All" | "Ongoing" | "Completed" | "My list">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [selectedStream, setSelectedStream] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedPricing, setSelectedPricing] = useState<string>("All");

  const [open, setOpen] = useState<{ id: string; reason?: string } | null>(
    search.course ? { id: search.course } : null,
  );
  const [testOpen, setTestOpen] = useState(search.open === "test");
  const [subject, setSubject] = useState<string | undefined>();
  const [ivOpen, setIvOpen] = useState(search.open === "interview");

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedLevel !== "All" ||
    selectedStream !== "All" ||
    selectedDifficulty !== "All" ||
    selectedPricing !== "All";

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedLevel("All");
    setSelectedStream("All");
    setSelectedDifficulty("All");
    setSelectedPricing("All");
  };

  const recs = recommend(goal, skills, Object.keys(enrolled), profile).slice(0, 3);

  const shown = courses.filter((c) => {
    // 1. Tab filter
    if (tab === "Ongoing" && (enrolled[c.id] === undefined || enrolled[c.id]! >= 100)) return false;
    if (tab === "Completed" && enrolled[c.id] !== 100) return false;
    if (tab === "My list" && !list.includes(c.id)) return false;

    // 2. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const match =
        c.title.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q) ||
        (c.provider && c.provider.toLowerCase().includes(q)) ||
        (c.stream && c.stream.toLowerCase().includes(q)) ||
        (c.category && c.category.toLowerCase().includes(q)) ||
        c.skills.some((s) => s.toLowerCase().includes(q));
      if (!match) return false;
    }

    // 3. Education level filter
    if (selectedLevel !== "All") {
      if (!c.educationLevels?.includes(selectedLevel as EducationLevel)) return false;
    }

    // 4. Stream filter
    if (selectedStream !== "All") {
      if (c.stream !== selectedStream) return false;
    }

    // 5. Difficulty filter
    if (selectedDifficulty !== "All") {
      if (c.level !== selectedDifficulty) return false;
    }

    // 6. Pricing filter
    if (selectedPricing !== "All") {
      if (c.pricing !== selectedPricing) return false;
    }

    return true;
  });

  const lastIv = interviews[0];

  return (
    <>
      {customRoadmap && (
        <div className="section-surface mt-6 border border-violet/30 bg-lilac/20">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold text-violet">
                <Sparkles className="h-5 w-5 text-violet" />
                Custom AI Roadmap: {customRoadmap.goal}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">{customRoadmap.summary}</p>
            </div>
            <span className="rounded-full bg-violet/15 px-3 py-1 text-xs font-semibold text-violet">
              Active Custom Plan
            </span>
          </div>

          {customRoadmap.weeks && customRoadmap.weeks.length > 0 && (
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {customRoadmap.weeks.map((w) => (
                <div key={w.week} className="rounded-xl border bg-card p-3 shadow-xs">
                  <span className="rounded-full bg-violet px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                    Week {w.week}
                  </span>
                  <h3 className="mt-2 text-xs font-bold">{w.title}</h3>
                  {w.topics && (
                    <ul className="mt-2 space-y-1 text-[11px] text-muted-foreground">
                      {w.topics.slice(0, 3).map((t, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-violet shrink-0" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {w.deliverable && (
                    <p className="mt-2 text-[10px] font-medium text-success">
                      Target: {w.deliverable}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="section-surface mt-6 border">
        {/* Header and status tabs */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <BookOpen className="h-5 w-5 text-violet" />
              Course Catalogue & Learning Tracks
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Comprehensive courses across engineering, sciences, medical, commerce, humanities &
              civil services.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {(["All", "Ongoing", "Completed", "My list"] as const).map((t) => (
              <Button
                key={t}
                size="sm"
                variant="outline"
                onClick={() => setTab(t)}
                className={tab === t ? "bg-lilac text-violet font-semibold" : ""}
              >
                {t}
              </Button>
            ))}
          </div>
        </div>

        {/* Discovery Search & Multi-Disciplinary Filters */}
        <div className="mb-5 space-y-3 rounded-2xl border border-border/80 bg-background/60 p-3.5">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative min-w-[220px] flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, skill, subject, or provider (e.g., Python, Anatomy, Khan, NPTEL)..."
                className="w-full rounded-xl border border-input bg-card py-2 pl-9 pr-8 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Quick Count Badge */}
            <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              {shown.length} {shown.length === 1 ? "course" : "courses"}
            </span>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-foreground transition hover:bg-muted"
              >
                <X className="h-3 w-3 text-muted-foreground" />
                Reset filters
              </button>
            )}
          </div>

          {/* Filter Dropdowns Grid */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {/* Education Level */}
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase text-muted-foreground">
                Education Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full rounded-xl border border-input bg-card px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="All">All Education Levels</option>
                {ALL_EDUCATION_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            {/* Academic Stream */}
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase text-muted-foreground">
                Academic Stream
              </label>
              <select
                value={selectedStream}
                onChange={(e) => setSelectedStream(e.target.value)}
                className="w-full rounded-xl border border-input bg-card px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="All">All Streams</option>
                {ALL_ACADEMIC_STREAMS.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Level */}
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase text-muted-foreground">
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full rounded-xl border border-input bg-card px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="All">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Pricing / Access */}
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase text-muted-foreground">
                Access Type
              </label>
              <select
                value={selectedPricing}
                onChange={(e) => setSelectedPricing(e.target.value)}
                className="w-full rounded-xl border border-input bg-card px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="All">All Pricing Types</option>
                <option value="Free">100% Free</option>
                <option value="Free to audit">Free to Audit</option>
                <option value="Paid">Paid Credential</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((c) => {
            const p = enrolled[c.id];
            return (
              <button
                key={c.id}
                onClick={() => setOpen({ id: c.id })}
                className={`rounded-2xl ${c.bg} p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 font-semibold">
                    <span className="line-clamp-1 text-sm text-foreground">{c.title}</span>
                    {p === 100 ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                    ) : p !== undefined ? (
                      <span className="shrink-0 rounded-full bg-card/80 px-2 py-0.5 text-[10px] font-medium text-foreground">
                        {p}% done
                      </span>
                    ) : c.pricing ? (
                      <span className="shrink-0 rounded-full bg-card/80 px-2 py-0.5 text-[10px] font-bold text-success">
                        {c.pricing}
                      </span>
                    ) : null}
                  </div>

                  {/* Provider & stream row */}
                  <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
                    {c.provider && <span>{c.provider}</span>}
                    {c.provider && c.stream && <span>·</span>}
                    {c.stream && <span>{c.stream}</span>}
                    {c.isMedical && (
                      <span className="rounded-full bg-destructive/10 px-1.5 py-0.2 text-[9px] font-bold text-destructive">
                        Academic
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{c.desc}</p>
                </div>

                <div className="mt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {[`${c.lessons} lessons`, c.duration, c.level].map((t) => (
                      <span key={t} className="rounded-full bg-card/70 px-2 py-0.5 text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                  {p !== undefined && (
                    <div className="mt-2.5 h-1.5 rounded-full bg-card/70">
                      <div className="h-full rounded-full bg-mint" style={{ width: `${p}%` }} />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
          {shown.length === 0 && (
            <div className="col-span-full py-10 text-center">
              <p className="text-sm font-medium text-foreground">
                No courses match your active filters.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try loosening your search term or resetting stream and education level filters.
              </p>
              <Button size="sm" variant="outline" onClick={resetFilters} className="mt-3">
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Profile-Powered Recommendations */}
      <div className="section-surface mt-6 border">
        <h2 className="mb-1 flex items-center gap-2 text-lg font-bold">
          <Sparkles className="h-5 w-5 text-violet" />
          Recommended for {goal}
        </h2>
        <p className="mb-4 text-xs text-muted-foreground">
          Tailored to your {profile.educationLevel || "academic"} profile in{" "}
          {profile.stream || goal} and verified skill gap analysis.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {recs.map((r) => (
            <div key={r.course.id} className="flex flex-col rounded-xl border bg-card p-4">
              <button
                onClick={() => setOpen({ id: r.course.id, reason: r.reason })}
                className="text-left"
              >
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
                  <span>{r.course.provider}</span>
                  <span>·</span>
                  <span>{r.course.stream}</span>
                </div>
                <p className="font-semibold text-foreground mt-0.5">{r.course.title}</p>
                <p className="mt-1.5 text-xs text-muted-foreground">{r.reason}</p>
              </button>
              <div className="mt-auto flex gap-2 pt-3">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={list.includes(r.course.id)}
                  onClick={() => {
                    actions.addToList(r.course.id);
                    toast.success("Added to your learning list");
                  }}
                >
                  {list.includes(r.course.id) ? "In list" : "Add to list"}
                </Button>
                <Button size="sm" onClick={() => setOpen({ id: r.course.id, reason: r.reason })}>
                  Details
                </Button>
              </div>
            </div>
          ))}
          {recs.length === 0 && (
            <p className="text-sm text-muted-foreground">
              You're enrolled in every recommended course for your profile.
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="section-surface border">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <ClipboardCheck className="h-5 w-5" />
            Mock tests & Academic Quizzes
          </h2>
          <p className="mb-3 text-xs text-muted-foreground">
            Multi-disciplinary timed quizzes across sciences, math, accounting, law, and
            engineering.
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(testBank).map((s) => (
              <Button
                key={s}
                size="sm"
                variant="outline"
                onClick={() => {
                  setSubject(s);
                  setTestOpen(true);
                }}
              >
                {s}
              </Button>
            ))}
          </div>
          {tests.length > 0 && (
            <ul className="mt-4 space-y-1 text-xs text-muted-foreground">
              {tests.slice(0, 4).map((t, i) => (
                <li key={i}>
                  {t.subject}:{" "}
                  <b className="text-foreground">
                    {t.score}/{t.total}
                  </b>{" "}
                  · {new Date(t.at).toLocaleDateString()}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="section-surface border">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Mic className="h-5 w-5" />
            Try your Mock Interview
          </h2>
          <p className="mb-3 text-xs text-muted-foreground">
            Answer role-specific questions one at a time and get AI feedback.
          </p>
          <Button onClick={() => setIvOpen(true)}>Start mock interview</Button>
          {lastIv && (
            <p className="mt-4 text-xs text-muted-foreground">
              Last: {lastIv.role} ({lastIv.difficulty}) —{" "}
              <b className="text-foreground">{lastIv.score}%</b>
            </p>
          )}
        </div>
      </div>

      <CourseDialog
        courseId={open?.id ?? null}
        reason={open?.reason}
        open={open !== null}
        onOpenChange={(o) => !o && setOpen(null)}
      />
      <MockTestDialog
        open={testOpen}
        initialSubject={subject}
        onOpenChange={(o) => {
          setTestOpen(o);
          if (!o) setSubject(undefined);
        }}
      />
      <MockInterviewDialog open={ivOpen} onOpenChange={setIvOpen} />
    </>
  );
}
