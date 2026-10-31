import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  Building2,
  IndianRupee,
} from "lucide-react";
import { z } from "zod";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { jobs } from "@/lib/pathfinder-data";
import { actions, usePathfinder } from "@/lib/pathfinder-store";
import { ApplicationDialog, JobDialog, StatusBadge } from "@/components/pathfinder/dialogs";

export const Route = createFileRoute("/jobs")({
  validateSearch: z.object({ job: z.number().optional(), app: z.number().optional() }),
  head: () => ({
    meta: [
      { title: "Job Board — Pathfinder" },
      { name: "description", content: "Browse jobs matched to your skills with AI match scores." },
      { property: "og:title", content: "Job Board — Pathfinder" },
      { property: "og:description", content: "Find roles that fit your skills and roadmap." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Jobs,
});

const filters = [
  "All",
  "Full-time",
  "Internship",
  "Contract",
  "Part-time",
  "Saved",
  "Applied",
] as const;

function Jobs() {
  const search = Route.useSearch();
  const [q, setQ] = useState("");
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const [openJob, setOpenJob] = useState<number | null>(search.job ?? null);
  const [openApp, setOpenApp] = useState<number | null>(search.app ?? null);
  const saved = usePathfinder((s) => s.savedJobs);
  const applications = usePathfinder((s) => s.applications);
  const isApp = (id: number) => applications.some((a) => a.jobId === id);
  const list = jobs.filter(
    (j) =>
      (f === "All" ||
        j.type === f ||
        (f === "Saved" && saved.includes(j.id)) ||
        (f === "Applied" && isApp(j.id))) &&
      `${j.title} ${j.company} ${j.location} ${j.tags.join(" ")}`
        .toLowerCase()
        .includes(q.toLowerCase()),
  );
  return (
    <AppShell>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold">Job Board</h1>
        <span className="flex items-center gap-2 text-xs text-violet">
          <Sparkles className="h-4 w-4" />
          Matched to your skills · sample listings
        </span>
      </div>
      <div className="section-surface border">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <label className="flex min-w-60 flex-1 items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search roles, companies, skills…"
              className="w-full bg-transparent outline-none"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {filters.map((x) => (
              <Button
                key={x}
                size="sm"
                variant="outline"
                onClick={() => setF(x)}
                className={f === x ? "bg-lilac text-violet" : ""}
              >
                {x}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((j) => {
            const isSaved = saved.includes(j.id);
            const app = applications.find((a) => a.jobId === j.id);
            return (
              <article
                key={j.id}
                role="button"
                tabIndex={0}
                aria-label={`View ${j.title} at ${j.company}`}
                onClick={() => setOpenJob(j.id)}
                onKeyDown={(e) => e.key === "Enter" && setOpenJob(j.id)}
                className="flex cursor-pointer flex-col rounded-2xl border bg-card p-4 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${j.color}`}
                  >
                    <Building2 className="h-5 w-5" />
                  </span>
                  <button
                    aria-label="Save job"
                    onClick={(e) => {
                      e.stopPropagation();
                      actions.toggleSave(j.id);
                    }}
                    className="text-muted-foreground hover:text-violet"
                  >
                    {isSaved ? (
                      <BookmarkCheck className="h-5 w-5 text-violet" />
                    ) : (
                      <Bookmark className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <h2 className="font-semibold">{j.title}</h2>
                <p className="text-xs text-muted-foreground">{j.company}</p>
                <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {j.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <IndianRupee className="h-3 w-3" />
                    {j.salary.replace("₹", "")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {j.posted}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {j.tags.map((t) => (
                    <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between gap-3 border-t pt-3">
                  <div className="flex-1">
                    <p className="text-[10px] text-muted-foreground">
                      AI match <b className="text-success">{j.match}%</b>
                    </p>
                    <div className="mt-1 h-1.5 rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-success"
                        style={{ width: `${j.match}%` }}
                      />
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (app) setOpenApp(j.id);
                      else setOpenJob(j.id);
                    }}
                  >
                    {app ? app.status : "Apply"}
                  </Button>
                </div>
              </article>
            );
          })}
          {list.length === 0 && (
            <p className="col-span-full py-10 text-center text-sm text-muted-foreground">
              No jobs match your search.
            </p>
          )}
        </div>
      </div>

      <div className="section-surface mt-5 border">
        <h2 className="mb-3 font-semibold">
          My applications{" "}
          <span className="text-xs font-normal text-muted-foreground">
            · {applications.length} total · demo tracker, update statuses yourself
          </span>
        </h2>
        {applications.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            You haven't applied yet. Open a job and tap Apply.
          </p>
        ) : (
          <ul className="space-y-2">
            {applications.map((a) => {
              const j = jobs.find((x) => x.id === a.jobId)!;
              return (
                <li key={a.jobId}>
                  <button
                    onClick={() => setOpenApp(a.jobId)}
                    className="flex w-full items-center gap-3 rounded-xl border bg-card p-3 text-left transition hover:bg-muted/50"
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${j.color}`}
                    >
                      <Building2 className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">{j.title}</span>
                      <span className="text-[11px] text-muted-foreground">
                        {j.company} · applied {new Date(a.appliedAt).toLocaleDateString()}
                        {a.interview?.date
                          ? ` · interview ${a.interview.date} ${a.interview.time}`
                          : ""}
                      </span>
                    </span>
                    <StatusBadge status={a.status} />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <JobDialog
        jobId={openJob}
        open={openJob !== null}
        onOpenChange={(o) => !o && setOpenJob(null)}
      />
      <ApplicationDialog
        jobId={openApp}
        open={openApp !== null}
        onOpenChange={(o) => !o && setOpenApp(null)}
      />
    </AppShell>
  );
}
