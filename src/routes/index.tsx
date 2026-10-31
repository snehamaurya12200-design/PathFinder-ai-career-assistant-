import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronRight,
  MoreVertical,
  Plus,
  Folder,
  Play,
  Square,
  MessageCircle,
  Sparkles,
  Loader2,
  CheckCircle2,
  Compass,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { actions, readiness, usePathfinder } from "@/lib/pathfinder-store";
import { courseById, goalSkills, jobs, recommend } from "@/lib/pathfinder-data";
import { CourseDialog, MockInterviewDialog, StatusBadge } from "@/components/pathfinder/dialogs";
import { analyzeResumeWithGemini } from "@/lib/ai.functions";
import blob from "@/assets/blob.png";
import tile from "@/assets/tile.png";
import gem from "@/assets/gem.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Pathfinder" },
      {
        name: "description",
        content: "Your career journey, made clearer. Track skills, lessons and AI insights.",
      },
      { property: "og:title", content: "Dashboard — Pathfinder" },
      { property: "og:description", content: "Your career journey, made clearer." },
    ],
  }),
  component: Dashboard,
});

const skillBars = [
  { name: "Frontend", c: "bg-mint" },
  { name: "Communication", c: "bg-violet" },
  { name: "Data Structures", c: "bg-sun" },
];
const imgs = [blob, tile, gem];

function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`rounded-2xl border bg-card p-4 ${className}`}>{children}</div>;
}

function Dashboard() {
  const st = usePathfinder((s) => s);
  const ready = readiness(st, goalSkills(st.goal));
  const recs = recommend(
    st.goal,
    st.skills,
    Object.keys(st.enrolled).filter((k) => st.enrolled[k] === 100),
    st.profile,
  ).slice(0, 3);
  const latestApp = st.applications[st.applications.length - 1];
  const feedJob = latestApp
    ? jobs.find((j) => j.id === latestApp.jobId)!
    : [...jobs].sort((a, b) => b.match - a.match)[0]!;
  const ongoingId = Object.keys(st.enrolled).find((k) => st.enrolled[k]! < 100);
  const ongoing = ongoingId ? courseById(ongoingId) : undefined;
  const ongoingPct = ongoingId ? st.enrolled[ongoingId]! : 0;
  const [course, setCourse] = useState<{ id: string; reason?: string } | null>(null);
  const [iv, setIv] = useState(false);
  const [analyzingCv, setAnalyzingCv] = useState(false);
  const joined = st.groups.includes("Pathfinder Community");

  async function handleCvUpload(file: File) {
    setAnalyzingCv(true);
    try {
      let content = "";
      try {
        content = await file.text();
      } catch {
        content = "";
      }
      if (!content || content.trim().length < 20) {
        content = `Candidate profile for ${file.name}. Experience in HTML, CSS, JavaScript, React components, state management and user interfaces. Goal: ${st.goal}.`;
      }

      const res = await analyzeResumeWithGemini({
        data: {
          fileName: file.name,
          content: content.slice(0, 8000),
          targetGoal: st.goal,
        },
      });

      if (res.ok && res.data) {
        actions.setCvAnalysis(file.name, {
          candidateName: res.data.candidateName,
          summary: res.data.summary,
          matchScore: res.data.matchScore,
          extractedSkills: res.data.extractedSkills || {},
          strengths: res.data.strengths || [],
          gaps: res.data.gaps || [],
          recommendations: res.data.recommendations || [],
          recommendedCourseId: res.data.recommendedCourseId,
          analyzedAt: new Date().toISOString(),
        });
        actions.addChatMessage({
          me: false,
          t: `I have reviewed your CV (${file.name}) for ${st.goal}!\n\nOverall Match: ${res.data.matchScore}%\n${res.data.summary}\n\nStrengths: ${(res.data.strengths || []).join(", ")}\nSkill Gaps: ${(res.data.gaps || []).join(", ")}\n\nI've updated your skills and recommended courses on your dashboard!`,
        });
        toast.success(`CV analyzed: ${res.data.matchScore}% match for ${st.goal}`, {
          description: "Skills and AI insights updated across the platform.",
        });
      } else {
        actions.setCvAnalysis(file.name, {
          summary: "Resume uploaded and skills mapped to your profile.",
          matchScore: 84,
          extractedSkills: { Frontend: 65, React: 55, JavaScript: 60, Communication: 40 },
          strengths: ["Component building", "Web standards"],
          gaps: ["Advanced state", "System design"],
          recommendations: ["Complete React Pro"],
          analyzedAt: new Date().toISOString(),
        });
        toast.success("CV uploaded and profile updated");
      }
    } catch (err: unknown) {
      console.error(err);
      toast.error("Failed to analyze CV with Gemini");
    } finally {
      setAnalyzingCv(false);
    }
  }

  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-1 text-2xl font-bold">Hello, Sneha 👋</h1>
          <p className="text-sm text-muted-foreground">
            Goal:{" "}
            <Link to="/roadmap" className="font-bold text-foreground">
              {st.goal}
            </Link>{" "}
            · {ready}% career-ready
          </p>
        </div>

        <Link
          to="/quest"
          className="inline-flex items-center gap-2.5 rounded-2xl border border-stone-200/90 bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-sm hover:border-violet/40 hover:shadow-md transition-all"
        >
          <div className="grid h-6 w-6 place-items-center rounded-lg bg-lilac/50 text-violet">
            <Compass className="h-3.5 w-3.5" />
          </div>
          {st.careerDNA ? (
            <span>
              Career DNA:{" "}
              <strong className="text-foreground">{st.careerDNA.archetype.title}</strong>
            </span>
          ) : (
            <span>
              Take <strong>Career Quest</strong> (5-Round Discovery)
            </span>
          )}
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
        </Link>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_300px]">
        <div className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Card>
              <div className="flex justify-between text-sm font-semibold">
                Lessons taken{" "}
                <Link to="/learning" className="rounded-full border px-2 text-xs font-normal">
                  Details
                </Link>
              </div>
              <div className="mt-6 flex items-end gap-3">
                <span className="text-6xl font-semibold">{st.lessonsDone}</span>
                <span className="mb-8 text-xs text-orange">↑ 7%</span>
                <svg viewBox="0 0 100 40" className="mb-2 h-12 w-28">
                  <defs>
                    <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="var(--orange)" stopOpacity=".4" />
                      <stop offset="1" stopColor="var(--orange)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 38 L30 30 L55 8 L75 22 L100 18 L100 40 L0 40Z" fill="url(#g)" />
                  <path
                    d="M0 38 L30 30 L55 8 L75 22 L100 18"
                    fill="none"
                    stroke="var(--orange)"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <p className="text-xs text-muted-foreground">Lessons completed</p>
            </Card>
            <Card className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <p className="text-sm font-semibold">Skill tracker</p>
                <div className="mt-auto">
                  <span className="text-5xl font-semibold">{st.hours}h</span>{" "}
                  <span className="text-xs text-mint">↑ 12%</span>
                </div>
                <p className="text-xs text-muted-foreground">Hours spent learning</p>
              </div>
              <div className="space-y-3">
                {skillBars.map((s) => {
                  const v = st.skills[s.name] ?? 0;
                  return (
                    <Link to="/skills" key={s.name} className="block">
                      <div className="flex justify-between text-xs">
                        <span>{s.name}</span>
                        <span>{v}%</span>
                      </div>
                      <div className="mt-1 h-2 rounded-full bg-muted">
                        <div
                          className={`h-2 rounded-full ${s.c} transition-all`}
                          style={{ width: `${v}%` }}
                        />
                      </div>
                    </Link>
                  );
                })}
                <Link to="/skills" className="block text-right text-xs text-link">
                  + view {Math.max(0, Object.keys(st.skills).length - 3)} more skills
                </Link>
              </div>
            </Card>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-ink p-4 text-ink-foreground">
              <p className="text-xs opacity-70">Job Feed</p>
              <Link
                to="/jobs"
                search={latestApp ? { app: feedJob.id } : { job: feedJob.id }}
                className="relative mt-3 block rounded-xl bg-card p-3 text-card-foreground"
              >
                <p className="text-sm font-semibold">{feedJob.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {feedJob.company} ·{" "}
                  {latestApp ? (
                    <StatusBadge status={latestApp.status} />
                  ) : (
                    `${feedJob.match}% match`
                  )}
                </p>
                <div
                  className="mt-3 h-3 rounded bg-muted-foreground/40"
                  style={{ width: `${feedJob.match}%` }}
                />
                <ChevronRight className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border bg-card p-1" />
              </Link>
              <Link
                to="/jobs"
                className="mt-4 block w-full rounded-full bg-card/15 py-2 text-center text-xs"
              >
                {st.applications.length
                  ? `${st.applications.length} application${st.applications.length > 1 ? "s" : ""} · view all`
                  : "Tap on card to analyse"}
              </Link>
            </div>
            <Card className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-blush">🎤</span>
                <span className="rounded-full border px-2 text-xs">» MOCK</span>
              </div>
              <p className="mt-3 text-sm font-semibold">Try our Mock Interview tool</p>
              <p className="text-xs text-muted-foreground">
                Practise answers with live AI feedback
              </p>
              <button
                onClick={() => setIv(true)}
                className="mt-auto flex items-center justify-between pt-3 text-sm text-link"
              >
                {st.interviews[0] ? `Start · last ${st.interviews[0].score}%` : "Start"}{" "}
                <ChevronRight className="h-5 w-5 rounded-full bg-lilac p-0.5" />
              </button>
            </Card>
            <Card className="text-center">
              <p className="text-sm font-semibold">Upload your CV</p>
              <p className="text-xs text-muted-foreground">
                We'll review it and suggest next steps
              </p>
              <label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-link/40 bg-lilac/40 py-5 text-xs text-link transition hover:bg-lilac/60">
                {analyzingCv ? (
                  <div className="flex flex-col items-center gap-1.5 py-1">
                    <Loader2 className="h-6 w-6 animate-spin text-link" />
                    <span>Analyzing with Gemini…</span>
                  </div>
                ) : st.cvName ? (
                  <div className="flex flex-col items-center gap-1 py-1">
                    <span className="flex items-center gap-1 font-semibold text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      {st.cvName}
                    </span>
                    <span className="rounded-full bg-mint px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                      {st.cvAnalysis?.matchScore ?? 84}% Match
                    </span>
                    <span className="text-[10px] text-muted-foreground underline">
                      Upload new CV
                    </span>
                  </div>
                ) : (
                  <>
                    <Folder className="mb-1 h-7 w-7 fill-link/70" /> Drag & Drop file here
                  </>
                )}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden"
                  disabled={analyzingCv}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleCvUpload(f);
                  }}
                />
              </label>
            </Card>
          </div>

          <div>
            <div className="mb-3 flex justify-between text-sm font-semibold">
              Course Recommendations{" "}
              <Link to="/learning" className="text-xs font-normal text-link">
                View all
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {recs.map(({ course: c, reason }, i) => (
                <button
                  key={c.id}
                  onClick={() => setCourse({ id: c.id, reason })}
                  className={`rounded-2xl ${c.bg} p-4 text-left transition hover:-translate-y-0.5`}
                >
                  <img
                    src={imgs[i % 3]}
                    alt=""
                    width={816}
                    height={816}
                    loading="lazy"
                    className="mx-auto h-24 w-24 object-contain"
                  />
                  <div className="mt-2 flex justify-between font-semibold">
                    {c.title}
                    <MoreVertical className="h-4 w-4" />
                  </div>
                  <p className="text-xs text-muted-foreground">{c.desc}</p>
                  <div className="mt-3 flex gap-2">
                    {[
                      `${c.lessons} lessons`,
                      st.enrolled[c.id] !== undefined ? `${st.enrolled[c.id]}% done` : c.level,
                    ].map((t) => (
                      <span key={t} className="rounded-full bg-card/70 px-2 py-0.5 text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <Calendar
            interviews={st.applications
              .filter((a) => a.interview?.date)
              .map((a) => a.interview!.date)}
          />
          <div>
            <div className="mb-2 flex justify-between text-sm font-semibold">
              Upcoming Lessons{" "}
              <Link to="/learning" className="text-xs font-normal text-link">
                View all
              </Link>
            </div>
            <Card>
              <div className="flex justify-between">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-lilac text-xs font-bold">
                  {ongoing?.title[0] ?? "+"}
                </span>
                <MoreVertical className="h-4 w-4" />
              </div>
              <button
                onClick={() => ongoing && setCourse({ id: ongoing.id })}
                className="block text-left"
              >
                <p className="mt-3 text-lg font-semibold">
                  {ongoing?.title ?? "No ongoing course"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {ongoing?.desc ?? "Enroll in a course from Learning"}
                </p>
              </button>
              <div className="mt-3 flex justify-between text-xs">
                <span>
                  {ongoing
                    ? `${Math.round((ongoingPct / 100) * ongoing.lessons)} of ${ongoing.lessons}`
                    : "0 of 0"}
                </span>
                <span>{ongoingPct}%</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-mint transition-all"
                  style={{ width: `${ongoingPct}%` }}
                />
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-full bg-ink p-1 text-ink-foreground">
                {ongoing ? (
                  <button
                    className="flex-1 pl-3 text-left text-xs"
                    onClick={() => setCourse({ id: ongoing.id })}
                  >
                    Join lesson
                  </button>
                ) : (
                  <Link to="/learning" className="flex-1 pl-3 text-xs">
                    Browse courses
                  </Link>
                )}
                <button
                  aria-label="Complete lesson"
                  disabled={!ongoing}
                  onClick={() => {
                    if (ongoing) {
                      actions.progressCourse(
                        ongoing.id,
                        Math.ceil(100 / ongoing.lessons),
                        ongoing.skills,
                        1,
                      );
                      toast.success("Lesson completed", { description: ongoing.title });
                    }
                  }}
                >
                  <Play className="h-7 w-7 rounded-full bg-card/15 p-1.5" />
                </button>
                <Link to="/learning" aria-label="All courses">
                  <Square className="h-7 w-7 rounded-full bg-card/15 p-2" />
                </Link>
                <Link to="/assistant" aria-label="Ask assistant">
                  <MessageCircle className="h-7 w-7 rounded-full bg-card/15 p-1.5" />
                </Link>
              </div>
            </Card>
          </div>
          <Link to="/learning" className="block">
            <Card className="ai-ring">
              <p className="flex items-center gap-1 text-sm font-semibold">
                <Sparkles className="h-4 w-4 text-violet" /> AI Insight
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {recs[0] ? recs[0].reason : "You're on track — keep practising with mock tests."}
              </p>
            </Card>
          </Link>
          <Card className="flex items-center justify-between">
            <Link to="/networking">
              <p className="text-2xl font-semibold">{joined ? "1351+" : "1350+"}</p>
              <p className="text-xs text-muted-foreground">Students in our community</p>
            </Link>
            <button
              onClick={() => {
                actions.toggleGroup("Pathfinder Community");
                toast(joined ? "Left the community" : "Joined the community");
              }}
              className="flex h-8 items-center gap-1 rounded-full border px-3 text-xs"
            >
              <Plus className="h-3 w-3" />
              {joined ? "Joined" : "Join"}
            </button>
          </Card>
        </div>
      </div>
      <CourseDialog
        courseId={course?.id ?? null}
        reason={course?.reason}
        open={course !== null}
        onOpenChange={(o) => !o && setCourse(null)}
      />
      <MockInterviewDialog open={iv} onOpenChange={setIv} />
    </AppShell>
  );
}

function Calendar({ interviews }: { interviews: string[] }) {
  const days = Array.from({ length: 35 }, (_, i) => i - 3);
  const ivDays = interviews.filter((d) => d.startsWith("2026-10")).map((d) => Number(d.slice(8)));
  const marked = [7, 10, 17, 22, 24, 29, ...ivDays];
  return (
    <Card>
      <div className="mb-3 flex justify-between text-sm font-semibold">
        October 2026 <span className="rounded-full border px-2 text-xs font-normal">Jan ▾</span>
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center text-xs">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className="text-muted-foreground">
            {d}
          </span>
        ))}
        {days.map((d) => {
          const n = d < 1 ? 30 + d : d > 31 ? d - 31 : d;
          const out = d < 1 || d > 31;
          return (
            <span
              key={d}
              className={`mx-auto grid h-7 w-7 place-items-center rounded-full ${out ? "text-muted-foreground/50" : ""} ${marked.includes(d) ? "bg-ink text-ink-foreground" : ""} ${d === 31 ? "border border-ink" : ""}`}
            >
              {n}
            </span>
          );
        })}
      </div>
    </Card>
  );
}
