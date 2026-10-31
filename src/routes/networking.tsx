import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  Sparkles,
  UserCheck,
  UserPlus,
  MessageCircle,
  CalendarDays,
  Users,
  Video,
  MapPin,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { actions, usePathfinder } from "@/lib/pathfinder-store";
import { toast } from "sonner";

export const Route = createFileRoute("/networking")({
  head: () => ({
    meta: [
      { title: "Networking — Pathfinder" },
      {
        name: "description",
        content: "Connect with mentors and peers, join communities and attend career events.",
      },
      { property: "og:title", content: "Networking — Pathfinder" },
      {
        property: "og:description",
        content: "Grow your professional network with mentors, peers and events.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Networking,
});

const people = [
  {
    id: 1,
    name: "Ananya Rao",
    role: "Senior UX Designer",
    company: "Voxa",
    mutual: 12,
    mentor: true,
    color: "bg-lilac",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    role: "Frontend Engineer",
    company: "Nimbus Labs",
    mutual: 8,
    mentor: false,
    color: "bg-mint",
  },
  {
    id: 3,
    name: "Priya Shah",
    role: "Product Manager",
    company: "Brightpath",
    mutual: 5,
    mentor: true,
    color: "bg-butter",
  },
  {
    id: 4,
    name: "Arjun Nair",
    role: "Design Lead",
    company: "Kite Health",
    mutual: 15,
    mentor: true,
    color: "bg-blush",
  },
  {
    id: 5,
    name: "Sneha Iyer",
    role: "React Developer",
    company: "Pixelcraft",
    mutual: 3,
    mentor: false,
    color: "bg-lilac",
  },
  {
    id: 6,
    name: "Karan Verma",
    role: "Data Analyst",
    company: "Orbit Studio",
    mutual: 6,
    mentor: false,
    color: "bg-mint",
  },
];

const events = [
  { id: 1, title: "Portfolio Review Night", date: "Nov 6 · 7:00 PM", place: "Online", icon: Video },
  {
    id: 2,
    title: "Frontend Meetup Bengaluru",
    date: "Nov 12 · 6:30 PM",
    place: "Bengaluru",
    icon: MapPin,
  },
  {
    id: 3,
    title: "Ask a Design Lead (AMA)",
    date: "Nov 18 · 5:00 PM",
    place: "Online",
    icon: Video,
  },
];

const groups = [
  { name: "UI/UX Designers India", members: "12.4k" },
  { name: "React Developers", members: "8.9k" },
  { name: "Women in Tech Leadership", members: "5.1k" },
];

const tabs = ["All", "Mentors", "Peers"] as const;

const initials = (n: string) =>
  n
    .split(" ")
    .map((p) => p[0])
    .join("");

function Networking() {
  const st = usePathfinder((s) => s);
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");

  const connectedIds = Object.keys(st.connections).map(Number);
  const going = st.events;
  const joined = st.groups;

  const list = people.filter(
    (p) =>
      (tab === "All" || (tab === "Mentors") === p.mentor) &&
      `${p.name} ${p.role} ${p.company}`.toLowerCase().includes(q.toLowerCase()),
  );

  function handleConnect(id: number, name: string) {
    if (st.connections[id]) {
      actions.removeConnection(id);
      toast(`Connection removed with ${name}`);
    } else {
      actions.acceptConnection(id);
      toast.success(`Connected with ${name}`);
    }
  }

  function handleMessage(name: string) {
    toast.info(`Message prompt with ${name} opened in Assistant`);
  }

  return (
    <AppShell>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">Networking</h1>
          <p className="text-xs text-muted-foreground">
            Meet mentors and peers who can help you grow.
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="rounded-full bg-lilac px-3 py-1 font-semibold text-violet">
            {48 + connectedIds.length} connections
          </span>
          <span className="rounded-full bg-butter px-3 py-1 font-semibold">
            {going.length} events
          </span>
        </div>
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-[1fr_300px]">
        <section className="section-surface border">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <label className="flex min-w-56 flex-1 items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search people, roles, companies…"
                className="w-full bg-transparent outline-none"
              />
            </label>
            <div className="flex gap-2">
              {tabs.map((t) => (
                <Button
                  key={t}
                  size="sm"
                  variant="outline"
                  onClick={() => setTab(t)}
                  className={tab === t ? "bg-lilac text-violet" : ""}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>
          <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-violet">
            <Sparkles className="h-4 w-4" />
            Suggested for you
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => {
              const isC = !!st.connections[p.id];
              return (
                <article
                  key={p.id}
                  className="flex flex-col items-center rounded-2xl border bg-card p-4 text-center transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span
                    className={`grid h-14 w-14 place-items-center rounded-full text-lg font-bold ${p.color}`}
                  >
                    {initials(p.name)}
                  </span>
                  <h2 className="mt-3 font-semibold">{p.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {p.role} · {p.company}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-[10px]">
                    {p.mentor && (
                      <span className="rounded-full bg-mint px-2 py-0.5 font-semibold text-primary-foreground">
                        Mentor
                      </span>
                    )}
                    <span className="text-muted-foreground">{p.mutual} mutual connections</span>
                  </div>
                  <div className="mt-4 flex w-full gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      variant={isC ? "outline" : "default"}
                      onClick={() => handleConnect(p.id, p.name)}
                    >
                      {isC ? (
                        <>
                          <UserCheck className="mr-1 h-3.5 w-3.5" />
                          Connected
                        </>
                      ) : (
                        <>
                          <UserPlus className="mr-1 h-3.5 w-3.5" />
                          Connect
                        </>
                      )}
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      aria-label={`Message ${p.name}`}
                      className="h-8 w-8"
                      onClick={() => handleMessage(p.name)}
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </article>
              );
            })}
            {list.length === 0 && (
              <p className="col-span-full py-10 text-center text-sm text-muted-foreground">
                No people match your search.
              </p>
            )}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl border bg-card p-4">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <CalendarDays className="h-4 w-4 text-violet" />
              Upcoming events
            </h2>
            <ul className="space-y-3">
              {events.map((e) => {
                const g = going.includes(e.id);
                return (
                  <li key={e.id} className="rounded-xl bg-muted p-3">
                    <p className="text-sm font-medium">{e.title}</p>
                    <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                      <e.icon className="h-3 w-3" />
                      {e.place} · {e.date}
                    </p>
                    <Button
                      size="sm"
                      variant={g ? "outline" : "default"}
                      className="mt-2 h-7 w-full text-xs"
                      onClick={() => {
                        actions.toggleEvent(e.id);
                        toast(g ? "RSVP cancelled" : "RSVP confirmed! Added to your schedule.");
                      }}
                    >
                      {g ? "You're going ✓" : "RSVP"}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="rounded-2xl border bg-card p-4">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Users className="h-4 w-4 text-violet" />
              Communities
            </h2>
            <ul className="space-y-2">
              {groups.map((g) => {
                const j = joined.includes(g.name);
                return (
                  <li key={g.name} className="flex items-center justify-between gap-2">
                    <span>
                      <span className="block text-sm">{g.name}</span>
                      <span className="text-[11px] text-muted-foreground">{g.members} members</span>
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      className={`h-7 text-xs ${j ? "bg-lilac text-violet" : ""}`}
                      onClick={() => {
                        actions.toggleGroup(g.name);
                        toast(j ? `Left ${g.name}` : `Joined ${g.name}`);
                      }}
                    >
                      {j ? "Joined" : "Join"}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
