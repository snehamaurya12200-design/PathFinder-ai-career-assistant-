import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  MapPin,
  IndianRupee,
  Clock,
  Building2,
  CheckCircle2,
  XCircle,
  Timer,
  Mic,
  CalendarDays,
  BookOpen,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  GraduationCap,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { actions, APP_STATUSES, usePathfinder, type AppStatus } from "@/lib/pathfinder-store";
import { courseById, interviewBank, jobs, testBank, type Course } from "@/lib/pathfinder-data";
import { askAI, evaluateInterviewAnswerWithGemini } from "@/lib/ai.functions";

type OpenProps = { open: boolean; onOpenChange: (o: boolean) => void };

const statusColor: Record<AppStatus, string> = {
  Applied: "bg-lilac text-violet",
  "Under Review": "bg-butter",
  Shortlisted: "bg-mint text-primary-foreground",
  "Interview Scheduled": "bg-blush",
  Selected: "bg-success text-primary-foreground",
  Rejected: "bg-destructive text-destructive-foreground",
};
export function StatusBadge({ status }: { status: AppStatus }) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColor[status]}`}>
      {status}
    </span>
  );
}

/* ---------------- Job details + apply ---------------- */
export function JobDialog({ jobId, open, onOpenChange }: OpenProps & { jobId: number | null }) {
  const job = jobs.find((j) => j.id === jobId);
  const app = usePathfinder((s) => s.applications.find((a) => a.jobId === jobId));
  const [confirm, setConfirm] = useState(false);
  const [note, setNote] = useState("");
  const [showApp, setShowApp] = useState(false);
  useEffect(() => {
    if (!open) {
      setConfirm(false);
      setNote("");
    }
  }, [open]);
  if (!job) return null;
  return (
    <>
      <Dialog open={open && !showApp} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl bg-card">
          {!confirm ? (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${job.color}`}
                  >
                    <Building2 className="h-5 w-5" />
                  </span>
                  <div className="text-left">
                    <DialogTitle>{job.title}</DialogTitle>
                    <DialogDescription>{job.company} · Sample listing</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <IndianRupee className="h-3 w-3" />
                  {job.salary.replace("₹", "")}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {job.type} · {job.posted}
                </span>
              </div>
              <Section title="Job description">{job.description}</Section>
              <Section title="Required skills">
                <div className="flex flex-wrap gap-1.5">
                  {job.tags.map((t) => (
                    <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>
              </Section>

              {(() => {
                const userSkills: Record<string, number> = app
                  ? {}
                  : (window as unknown as { __lastSkills?: Record<string, number> })
                      ?.__lastSkills || {};
                const jobSkillScores = job.skills.map((s) => ({
                  name: s,
                  score:
                    userSkills[s] ??
                    (s === "Frontend" ? 60 : s === "React" ? 48 : s === "Visual Design" ? 94 : 35),
                }));
                const matched = jobSkillScores.filter((x) => x.score >= 50);
                const gaps = jobSkillScores.filter((x) => x.score < 50);
                const calcMatch = Math.round(
                  jobSkillScores.reduce((a, b) => a + b.score, 0) / (jobSkillScores.length || 1),
                );
                return (
                  <div className="rounded-xl border bg-muted/40 p-3 text-xs space-y-2">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="flex items-center gap-1.5 text-violet">
                        <Sparkles className="h-3.5 w-3.5" />
                        Skill Suitability Analysis
                      </span>
                      <b className="text-success">{calcMatch}% match</b>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {jobSkillScores.map((s) => (
                        <span
                          key={s.name}
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${s.score >= 50 ? "bg-mint/40 text-primary-foreground" : "bg-orange/20 text-orange"}`}
                        >
                          {s.name}: {s.score}%
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {matched.length > 0
                        ? `Strong fit in ${matched.map((m) => m.name).join(", ")}.`
                        : "Foundational match."}
                      {gaps.length > 0
                        ? ` Focus on ${gaps.map((g) => g.name).join(", ")} before technical rounds.`
                        : " Ready for technical interviews."}
                    </p>
                  </div>
                );
              })()}

              <Section title="Eligibility">{job.eligibility}</Section>
              <Section title="Application details">{job.apply}</Section>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => actions.toggleSave(job.id)}>
                  Save job
                </Button>
                {app ? (
                  <Button onClick={() => setShowApp(true)}>View application · {app.status}</Button>
                ) : (
                  <Button onClick={() => setConfirm(true)}>Apply</Button>
                )}
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Confirm application</DialogTitle>
                <DialogDescription>
                  Apply to {job.title} at {job.company}? This is a demo — no real employer receives
                  it.
                </DialogDescription>
              </DialogHeader>
              <label className="text-xs font-semibold">
                Note for recruiter (optional)
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded-xl border bg-background p-2 text-sm font-normal outline-none"
                  placeholder="Why you're a great fit…"
                />
              </label>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setConfirm(false)}>
                  Back
                </Button>
                <Button
                  onClick={() => {
                    actions.apply(job.id, note || undefined);
                    toast.success(`Applied to ${job.title}`, {
                      description: "Status: Applied. Track it under My applications.",
                    });
                    setConfirm(false);
                    setShowApp(true);
                  }}
                >
                  Confirm & apply
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      <ApplicationDialog
        jobId={job.id}
        open={open && showApp}
        onOpenChange={(o) => {
          setShowApp(o);
          if (!o) onOpenChange(false);
        }}
      />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-xs font-semibold">{title}</p>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

/* ---------------- Application details ---------------- */
export function ApplicationDialog({
  jobId,
  open,
  onOpenChange,
}: OpenProps & { jobId: number | null }) {
  const app = usePathfinder((s) => s.applications.find((a) => a.jobId === jobId));
  const job = jobs.find((j) => j.id === jobId);
  const [iv, setIv] = useState({ date: "", time: "", mode: "Video call", details: "" });
  const [onb, setOnb] = useState("");
  useEffect(() => {
    if (app?.interview) setIv(app.interview);
    setOnb(app?.onboarding ?? "");
  }, [app?.jobId, open]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!job || !app) return null;
  const idx = APP_STATUSES.indexOf(app.status);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl bg-card">
        <DialogHeader>
          <DialogTitle>
            {job.title} · {job.company}
          </DialogTitle>
          <DialogDescription>
            Applied {new Date(app.appliedAt).toLocaleDateString()} · Demo tracker — update the
            status yourself when you hear back.
          </DialogDescription>
        </DialogHeader>
        <ol className="flex flex-wrap gap-1.5 text-[10px]">
          {APP_STATUSES.map((s, i) => {
            const reached =
              app.status === s ||
              (i < idx && s !== "Rejected" && app.status !== "Rejected") ||
              (app.status === "Rejected" && i < 4 && app.history.some((h) => h.status === s));
            return (
              <li
                key={s}
                className={`rounded-full px-2 py-0.5 ${reached ? statusColor[s] : "bg-muted text-muted-foreground"}`}
              >
                {s}
              </li>
            );
          })}
        </ol>
        <label className="text-xs font-semibold">
          Update status
          <select
            value={app.status}
            onChange={(e) => {
              actions.updateApplication(app.jobId, { status: e.target.value as AppStatus });
              toast(`Status updated: ${e.target.value}`);
            }}
            className="mt-1 w-full rounded-xl border bg-background p-2 text-sm font-normal"
          >
            {APP_STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        {app.status === "Interview Scheduled" && (
          <div className="space-y-2 rounded-xl bg-muted p-3">
            <p className="flex items-center gap-1 text-xs font-semibold">
              <CalendarDays className="h-3.5 w-3.5" />
              Interview details
            </p>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                aria-label="Interview date"
                value={iv.date}
                onChange={(e) => setIv({ ...iv, date: e.target.value })}
                className="rounded-lg border bg-background p-1.5 text-sm"
              />
              <input
                type="time"
                aria-label="Interview time"
                value={iv.time}
                onChange={(e) => setIv({ ...iv, time: e.target.value })}
                className="rounded-lg border bg-background p-1.5 text-sm"
              />
            </div>
            <select
              aria-label="Interview mode"
              value={iv.mode}
              onChange={(e) => setIv({ ...iv, mode: e.target.value })}
              className="w-full rounded-lg border bg-background p-1.5 text-sm"
            >
              {["Video call", "Phone", "In person"].map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            <input
              aria-label="Interview notes"
              placeholder="Link, address or interviewer name"
              value={iv.details}
              onChange={(e) => setIv({ ...iv, details: e.target.value })}
              className="w-full rounded-lg border bg-background p-1.5 text-sm"
            />
            <Button
              size="sm"
              onClick={() => {
                actions.updateApplication(app.jobId, { interview: iv });
                toast.success("Interview details saved");
              }}
            >
              Save interview
            </Button>
            {app.interview?.date && (
              <p className="text-xs text-muted-foreground">
                Saved: {app.interview.date} {app.interview.time} · {app.interview.mode}
                {app.interview.details ? ` · ${app.interview.details}` : ""}
              </p>
            )}
          </div>
        )}
        {app.status === "Selected" && (
          <div className="space-y-2 rounded-xl bg-muted p-3">
            <p className="text-xs font-semibold">Onboarding & next steps</p>
            <ul className="list-disc pl-4 text-xs text-muted-foreground">
              <li>Accept the offer letter by email</li>
              <li>Submit ID and education documents</li>
              <li>Complete joining formalities before your start date</li>
            </ul>
            <textarea
              aria-label="Onboarding notes"
              rows={2}
              value={onb}
              onChange={(e) => setOnb(e.target.value)}
              placeholder="Add instructions you received…"
              className="w-full rounded-lg border bg-background p-1.5 text-sm"
            />
            <Button
              size="sm"
              onClick={() => {
                actions.updateApplication(app.jobId, { onboarding: onb });
                toast.success("Onboarding notes saved");
              }}
            >
              Save notes
            </Button>
          </div>
        )}
        {app.note && <Section title="Your note">{app.note}</Section>}
        <div>
          <p className="mb-1 text-xs font-semibold">History</p>
          <ul className="space-y-1 text-xs text-muted-foreground">
            {app.history.map((h, i) => (
              <li key={i}>
                {new Date(h.at).toLocaleString()} — {h.status}
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => {
              actions.withdraw(app.jobId);
              toast("Application withdrawn");
              onOpenChange(false);
            }}
          >
            Withdraw
          </Button>
          <Button onClick={() => onOpenChange(false)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Course details ---------------- */
export function CourseDialog({
  courseId,
  reason,
  open,
  onOpenChange,
}: OpenProps & { courseId: string | null; reason?: string }) {
  const course = courseId ? courseById(courseId) : undefined;
  const progress = usePathfinder((s) => (courseId ? s.enrolled[courseId] : undefined));
  const inList = usePathfinder((s) => (courseId ? s.learningList.includes(courseId) : false));
  if (!course) return null;
  const enrolled = progress !== undefined;
  const step = Math.ceil(100 / (course.lessons || 10));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border-border bg-card p-6 shadow-soft">
        <DialogHeader className="text-left">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-lilac/50 px-2.5 py-0.5 text-[10px] font-semibold text-violet">
              {course.stream || "General"}
            </span>
            {course.provider && (
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-foreground">
                {course.provider}
              </span>
            )}
            {course.pricing && (
              <span className="rounded-full bg-mint/50 px-2.5 py-0.5 text-[10px] font-bold text-success">
                {course.pricing}
              </span>
            )}
          </div>
          <DialogTitle className="mt-2 flex items-center gap-2 text-xl font-bold">
            <BookOpen className="h-5 w-5 text-violet" />
            {course.title}
          </DialogTitle>
          <DialogDescription className="text-xs leading-relaxed text-muted-foreground">
            {course.desc}
          </DialogDescription>
        </DialogHeader>

        {/* Medical disclaimer requirement */}
        {course.isMedical && (
          <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-3.5 text-xs text-destructive">
            <div className="flex items-start gap-2">
              <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Academic & Educational Resource Notice</p>
                <p className="mt-1 text-[11px] leading-relaxed text-destructive/90">
                  This course is designed exclusively for educational, theoretical, and academic
                  enrichment. It does <strong>NOT</strong> confer clinical qualifications,
                  healthcare credentials, medical licensing, or legal authority to diagnose or treat
                  patients.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick stats pills */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 text-center text-xs">
          <div className="rounded-xl bg-muted/60 p-2">
            <span className="block text-[10px] text-muted-foreground">Duration</span>
            <b className="text-foreground">{course.duration}</b>
          </div>
          <div className="rounded-xl bg-muted/60 p-2">
            <span className="block text-[10px] text-muted-foreground">Lessons</span>
            <b className="text-foreground">{course.lessons} lessons</b>
          </div>
          <div className="rounded-xl bg-muted/60 p-2">
            <span className="block text-[10px] text-muted-foreground">Difficulty</span>
            <b className="text-foreground">{course.level}</b>
          </div>
          <div className="rounded-xl bg-muted/60 p-2">
            <span className="block text-[10px] text-muted-foreground">Format</span>
            <b className="truncate text-foreground text-[11px]">{course.format || "Structured"}</b>
          </div>
        </div>

        {/* Education levels */}
        {course.educationLevels && course.educationLevels.length > 0 && (
          <div className="space-y-1.5">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <GraduationCap className="h-3.5 w-3.5 text-violet" />
              Target Education Levels
            </p>
            <div className="flex flex-wrap gap-1.5">
              {course.educationLevels.map((lvl) => (
                <span
                  key={lvl}
                  className="rounded-full bg-butter/60 px-2.5 py-0.5 text-[10px] font-medium text-foreground"
                >
                  {lvl}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Skills covered */}
        <Section title="Skills Covered & Competencies">
          <div className="flex flex-wrap gap-1.5 pt-1">
            {course.skills.map((s) => (
              <span
                key={s}
                className="rounded-full bg-lilac/60 px-2.5 py-0.5 text-[11px] font-medium text-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </Section>

        {/* Syllabus / Module Breakdown */}
        {course.syllabus && course.syllabus.length > 0 && (
          <Section title="Syllabus & Curriculum Modules">
            <ol className="mt-1 space-y-1.5">
              {course.syllabus.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 rounded-xl border border-border/70 bg-background/50 px-3 py-2 text-xs text-foreground"
                >
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground">
                    {idx + 1}
                  </span>
                  <span className="min-w-0 flex-1">{item}</span>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {reason && (
          <div className="rounded-2xl border border-violet/20 bg-lilac/30 p-3 text-xs text-violet">
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 shrink-0 mt-0.5 text-violet" />
              <div>
                <p className="font-semibold">Why this is recommended for you</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{reason}</p>
              </div>
            </div>
          </div>
        )}

        {enrolled && (
          <div className="rounded-2xl border border-border/70 bg-card p-3.5 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-foreground">Learning Progress</span>
              <span className="font-bold text-foreground">{progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-mint transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {course.url && (
          <div className="flex items-center justify-between rounded-2xl bg-muted/40 p-3 text-xs">
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground">Verified Direct Course Platform</p>
              <p className="truncate text-[11px] text-muted-foreground">{course.url}</p>
            </div>
            <a
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-muted"
            >
              <span>Visit Platform</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}

        <DialogFooter className="gap-2 sm:justify-between">
          <div className="flex items-center gap-2">
            {!enrolled && !inList && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  actions.addToList(course.id);
                  toast.success("Added to your learning wishlist");
                }}
              >
                Add to learning list
              </Button>
            )}
            {!enrolled && inList && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  actions.removeFromList(course.id);
                  toast("Removed from learning list");
                }}
              >
                Remove from list
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!enrolled ? (
              <Button
                onClick={() => {
                  actions.enroll(course.id);
                  toast.success(`Enrolled in ${course.title}`, {
                    description: "Track your progress under Ongoing courses.",
                  });
                }}
              >
                Enroll Now
              </Button>
            ) : progress! < 100 ? (
              <Button
                onClick={() => {
                  actions.progressCourse(course.id, step, course.skills, 1);
                  if (progress! + step >= 100)
                    toast.success(`Course completed: ${course.title}`, {
                      description: `Skills improved: ${course.skills.join(", ")}`,
                    });
                  else toast.success("Lesson completed!");
                }}
              >
                Complete next lesson (+{step}%)
              </Button>
            ) : (
              <span className="flex items-center gap-1 text-sm font-semibold text-success">
                <CheckCircle2 className="h-4 w-4" />
                Course Completed
              </span>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Mock test ---------------- */
export function MockTestDialog({
  open,
  onOpenChange,
  initialSubject,
}: OpenProps & { initialSubject?: string }) {
  const subjects = Object.keys(testBank);
  const [subject, setSubject] = useState<string | null>(null);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [done, setDone] = useState(false);
  const [left, setLeft] = useState(0);
  const history = usePathfinder((s) => s.tests);
  const bank = subject ? testBank[subject]! : null;

  useEffect(() => {
    if (open) {
      setSubject(initialSubject ?? null);
      setDone(false);
      setI(0);
    }
  }, [open, initialSubject]);
  useEffect(() => {
    if (bank) {
      setAnswers(bank.questions.map(() => null));
      setLeft(bank.questions.length * 30);
      setI(0);
      setDone(false);
    }
  }, [subject]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!open || !bank || done) return;
    if (left <= 0) {
      submit();
      return;
    }
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left, open, done, bank]); // eslint-disable-line react-hooks/exhaustive-deps

  const score = bank
    ? bank.questions.reduce((a, q, k) => a + (answers[k] === q.answer ? 1 : 0), 0)
    : 0;
  function submit() {
    if (!bank || !subject || done) return;
    setDone(true);
    actions.recordTest({ subject, score, total: bank.questions.length }, bank.skills);
    toast.success(`Test submitted: ${score}/${bank.questions.length}`, {
      description: `${bank.skills.join(", ")} progress updated.`,
    });
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl bg-card">
        <DialogHeader>
          <DialogTitle>Mock test{subject ? ` · ${subject}` : ""}</DialogTitle>
          <DialogDescription>
            {!subject
              ? "Choose a subject to start."
              : done
                ? "Results and explanations"
                : `Question ${i + 1} of ${bank!.questions.length}`}
          </DialogDescription>
        </DialogHeader>
        {!subject && (
          <>
            <div className="grid grid-cols-2 gap-2">
              {subjects.map((s) => (
                <Button key={s} variant="outline" onClick={() => setSubject(s)}>
                  {s}
                </Button>
              ))}
            </div>
            {history.length > 0 && (
              <div>
                <p className="mb-1 text-xs font-semibold">Test history</p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {history.slice(0, 6).map((h, k) => (
                    <li key={k}>
                      {h.subject} — {h.score}/{h.total} · {new Date(h.at).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
        {bank && !done && (
          <>
            <p className="flex items-center gap-1 text-xs text-orange">
              <Timer className="h-3.5 w-3.5" />
              {Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")} left
            </p>
            <p className="text-sm font-semibold">{bank.questions[i]!.q}</p>
            <div className="space-y-2">
              {bank.questions[i]!.options.map((o, k) => (
                <button
                  key={k}
                  onClick={() => setAnswers((a) => a.map((v, j) => (j === i ? k : v)))}
                  className={`w-full rounded-xl border p-2 text-left text-sm ${answers[i] === k ? "border-violet bg-lilac" : "bg-card hover:bg-muted"}`}
                >
                  {o}
                </button>
              ))}
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" disabled={i === 0} onClick={() => setI(i - 1)}>
                Previous
              </Button>
              {i < bank.questions.length - 1 ? (
                <Button onClick={() => setI(i + 1)}>Next</Button>
              ) : (
                <Button onClick={submit}>Submit test</Button>
              )}
            </DialogFooter>
          </>
        )}
        {bank && done && (
          <>
            <p className="text-3xl font-bold">
              {score}/{bank.questions.length}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                ({Math.round((score / bank.questions.length) * 100)}%)
              </span>
            </p>
            <ul className="space-y-3">
              {bank.questions.map((q, k) => {
                const ok = answers[k] === q.answer;
                return (
                  <li key={k} className="rounded-xl bg-muted p-3 text-xs">
                    <p className="flex gap-1.5 font-semibold">
                      {ok ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                      ) : (
                        <XCircle className="h-4 w-4 shrink-0 text-destructive" />
                      )}
                      {q.q}
                    </p>
                    <p className="mt-1">
                      Correct: <b>{q.options[q.answer]}</b>
                      {!ok && answers[k] != null
                        ? ` · You chose: ${q.options[answers[k]!]}`
                        : !ok
                          ? " · Not answered"
                          : ""}
                    </p>
                    <p className="mt-1 text-muted-foreground">{q.explain}</p>
                  </li>
                );
              })}
            </ul>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setSubject(null)}>
                Take another test
              </Button>
              <Button onClick={() => onOpenChange(false)}>Close</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Mock interview ---------------- */
type Feedback = { score: number; text: string };
function heuristic(answer: string): Feedback {
  const words = answer.trim().split(/\s+/).filter(Boolean).length;
  const star = ["situation", "task", "action", "result", "because", "example", "learned"].filter(
    (w) => answer.toLowerCase().includes(w),
  ).length;
  const score = Math.min(100, Math.round(Math.min(words, 80) * 0.8 + star * 6));
  return {
    score,
    text:
      words < 15
        ? "Answer is quite short — add a concrete example and the result."
        : star >= 2
          ? "Good structure with examples. Keep it concise and finish with the impact."
          : "Clear answer. Try the STAR method (Situation, Task, Action, Result) to add structure.",
  };
}

export function MockInterviewDialog({ open, onOpenChange }: OpenProps) {
  const goal = usePathfinder((s) => s.goal);
  const [role, setRole] = useState(goal);
  const [diff, setDiff] = useState("Medium");
  const [started, setStarted] = useState(false);
  const [i, setI] = useState(0);
  const [answer, setAnswer] = useState("");
  const [fb, setFb] = useState<(Feedback & { q: string; a: string })[]>([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const recRef = useRef<{ stop: () => void } | null>(null);
  const qs = useMemo(() => interviewBank[role]?.[diff] ?? [], [role, diff]);
  const finished = started && fb.length === qs.length && qs.length > 0;
  const saved = useRef(false);

  useEffect(() => {
    if (open) {
      setRole(Object.keys(interviewBank).includes(goal) ? goal : "Frontend Developer");
      setStarted(false);
      setI(0);
      setFb([]);
      setAnswer("");
      saved.current = false;
    }
  }, [open, goal]);
  useEffect(() => {
    if (finished && !saved.current) {
      saved.current = true;
      const avg = Math.round(fb.reduce((a, f) => a + f.score, 0) / fb.length);
      const avgBreakdown = {
        technical: Math.round(
          fb.reduce((a, f) => a + (f.breakdown?.technical ?? f.score), 0) / fb.length,
        ),
        problemSolving: Math.round(
          fb.reduce((a, f) => a + (f.breakdown?.problemSolving ?? f.score), 0) / fb.length,
        ),
        communication: Math.round(
          fb.reduce((a, f) => a + (f.breakdown?.communication ?? f.score), 0) / fb.length,
        ),
        relevance: Math.round(
          fb.reduce((a, f) => a + (f.breakdown?.relevance ?? f.score), 0) / fb.length,
        ),
        confidence: Math.round(
          fb.reduce((a, f) => a + (f.breakdown?.confidence ?? f.score), 0) / fb.length,
        ),
      };
      actions.recordDetailedInterview({
        id: "interview-" + Date.now(),
        role,
        difficulty: diff,
        score: avg,
        at: new Date().toISOString(),
        breakdown: avgBreakdown,
        feedback: fb.map((f) => f.text).join(" "),
        strength: fb[0]?.strength || "Demonstrated clear technical domain concepts",
        improvement: fb[0]?.improvement || "Provide more concrete metrics and structure",
        recommendation:
          fb[0]?.recommendation || "Structure behavioral answers with the STAR method",
        questionsAnswers: fb.map((f) => ({ q: f.q, a: f.a, score: f.score, text: f.text })),
      });
      toast.success(`Mock interview completed: ${avg}%`, {
        description: "Communication and role competencies updated in My Skills.",
      });
    }
  }, [finished]); // eslint-disable-line react-hooks/exhaustive-deps

  async function submitAnswer() {
    const q = qs[i]!;
    if (!answer.trim()) return;
    setLoading(true);
    let f: Feedback & {
      breakdown?: {
        technical: number;
        problemSolving: number;
        communication: number;
        relevance: number;
        confidence: number;
      };
      strength?: string;
      improvement?: string;
      recommendation?: string;
    } = heuristic(answer);
    try {
      const r = await evaluateInterviewAnswerWithGemini({
        data: {
          role,
          difficulty: diff,
          question: q,
          answer,
          questionIndex: i + 1,
          totalQuestions: qs.length,
        },
      });
      if (r.ok && r.data) {
        f = {
          score: r.data.score ?? f.score,
          text: r.data.feedback || f.text,
          breakdown: r.data.breakdown || {
            technical: 75,
            problemSolving: 70,
            communication: 75,
            relevance: 80,
            confidence: 75,
          },
          strength: r.data.strength,
          improvement: r.data.improvement,
          recommendation: r.data.recommendation,
        };
      }
    } catch {
      /* fall back to heuristic */
    }
    setFb((x) => [...x, { ...f, q, a: answer }]);
    setAnswer("");
    setLoading(false);
  }

  function voice() {
    const W = window as unknown as {
      SpeechRecognition?: new () => SR;
      webkitSpeechRecognition?: new () => SR;
    };
    const C = W.SpeechRecognition ?? W.webkitSpeechRecognition;
    if (!C) {
      toast.error("Voice input isn't supported in this browser. Please type your answer.");
      return;
    }
    if (listening) {
      recRef.current?.stop();
      return;
    }
    const r = new C();
    r.lang = "en-IN";
    r.interimResults = false;
    r.onresult = (e) => setAnswer((a) => `${a} ${e.results[0]![0]!.transcript}`.trim());
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    recRef.current = r;
    setListening(true);
    r.start();
  }

  const avg = fb.length ? Math.round(fb.reduce((a, f) => a + f.score, 0) / fb.length) : 0;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl bg-card">
        <DialogHeader>
          <DialogTitle>Mock interview</DialogTitle>
          <DialogDescription>
            {!started
              ? "Pick a role and difficulty."
              : finished
                ? "Your performance summary"
                : `Question ${i + 1} of ${qs.length} · ${role} · ${diff}`}
          </DialogDescription>
        </DialogHeader>
        {!started && (
          <>
            <label className="text-xs font-semibold">
              Target role
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 w-full rounded-xl border bg-background p-2 text-sm font-normal"
              >
                {Object.keys(interviewBank).map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </label>
            <div className="flex gap-2">
              {["Easy", "Medium", "Hard"].map((d) => (
                <Button
                  key={d}
                  size="sm"
                  variant="outline"
                  onClick={() => setDiff(d)}
                  className={diff === d ? "bg-lilac text-violet" : ""}
                >
                  {d}
                </Button>
              ))}
            </div>
            <DialogFooter>
              <Button onClick={() => setStarted(true)}>Start interview</Button>
            </DialogFooter>
          </>
        )}
        {started && !finished && (
          <>
            {fb[i - 1] && (
              <div className="rounded-xl bg-muted p-3 text-xs">
                <p className="font-semibold">
                  Feedback on previous answer · {fb[i - 1]!.score}/100
                </p>
                <p className="mt-1 text-muted-foreground">{fb[i - 1]!.text}</p>
              </div>
            )}
            {fb.length === i ? (
              <>
                <p className="text-sm font-semibold">{qs[i]}</p>
                <textarea
                  aria-label="Your answer"
                  rows={4}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder={listening ? "Listening…" : "Type your answer or use the mic…"}
                  className="w-full rounded-xl border bg-background p-2 text-sm outline-none"
                />
                <DialogFooter className="gap-2">
                  <Button
                    variant="outline"
                    onClick={voice}
                    className={listening ? "pulse-ring" : ""}
                  >
                    <Mic />
                    {listening ? "Stop" : "Speak"}
                  </Button>
                  <Button disabled={loading || !answer.trim()} onClick={submitAnswer}>
                    {loading ? "Evaluating…" : "Submit answer"}
                  </Button>
                </DialogFooter>
              </>
            ) : (
              <>
                <div className="rounded-xl bg-muted p-3 text-xs">
                  <p className="font-semibold">Feedback · {fb[i]!.score}/100</p>
                  <p className="mt-1 text-muted-foreground">{fb[i]!.text}</p>
                </div>
                <DialogFooter>
                  <Button onClick={() => setI(i + 1)}>
                    {i + 1 < qs.length ? "Next question" : "See summary"}
                  </Button>
                </DialogFooter>
              </>
            )}
          </>
        )}
        {finished && (
          <>
            <p className="text-3xl font-bold text-interview-blue">{avg}%</p>
            <p className="text-xs text-muted-foreground">
              {avg >= 75
                ? "Strong — you're interview-ready."
                : avg >= 50
                  ? "Good — a few areas to improve."
                  : "Keep practising — add examples and structure."}{" "}
              Saved to your progress.
            </p>
            <ul className="space-y-2">
              {fb.map((f, k) => (
                <li key={k} className="rounded-xl bg-muted p-3 text-xs">
                  <p className="font-semibold">
                    {f.q} · {f.score}/100
                  </p>
                  <p className="mt-1 text-muted-foreground">{f.text}</p>
                </li>
              ))}
            </ul>
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setStarted(false);
                  setI(0);
                  setFb([]);
                  saved.current = false;
                }}
              >
                Try again
              </Button>
              <Button asChild>
                <Link to="/interviews" onClick={() => onOpenChange(false)}>
                  View interview report
                </Link>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

type SR = {
  lang: string;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: (e: { results: { [k: number]: { [k: number]: { transcript: string } } } }) => void;
  onend: () => void;
  onerror: () => void;
};
export type { SR };
export type { Course };
