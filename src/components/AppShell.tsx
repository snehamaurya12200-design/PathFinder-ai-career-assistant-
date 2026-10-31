import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutGrid,
  Search,
  Lightbulb,
  BriefcaseBusiness,
  GraduationCap,
  Users,
  MessageCircle,
  LifeBuoy,
  Settings,
  Sun,
  Moon,
  MoonStar,
  Sparkles,
  Crown,
  Compass,
} from "lucide-react";
import shapes from "@/assets/shapes.png";
import { usePathfinder } from "@/lib/pathfinder-store";
import { modes, applyMode, getSavedMode, setSavedMode, type ThemeMode } from "@/lib/theme";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { ProfileModal } from "@/components/ProfileModal";
import { SettingsModal } from "@/components/SettingsModal";
import { UpgradeProModal } from "@/components/UpgradeProModal";
import { SupportCenterModal } from "@/components/SupportCenterModal";
import { NotificationPopover } from "@/components/NotificationPopover";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutGrid },
  { to: "/assistant", label: "AI Assistant", icon: MessageCircle },
  { to: "/quest", label: "Career Quest", icon: Compass },
  { to: "/roadmap", label: "Explore Careers", icon: Search },
  { to: "/skills", label: "My Skills", icon: Lightbulb },
  { to: "/jobs", label: "Job Board", icon: BriefcaseBusiness },
  { to: "/learning", label: "Learning", icon: GraduationCap },
  { to: "/networking", label: "Networking", icon: Users },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const store = usePathfinder((s) => s);
  const isPro = store.subscription.plan === "pro";
  const navigate = useNavigate();

  // Modals state
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileMode, setProfileMode] = useState<"view" | "edit">("edit");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState("account");
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  // Search input state
  const [searchVal, setSearchVal] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchVal.trim()) return;
    navigate({ to: "/roadmap" });
  };

  return (
    <div className="min-h-screen p-3 md:p-8">
      <div className="mx-auto flex max-w-[1400px] overflow-hidden rounded-3xl bg-background shadow-soft">
        <aside className="hidden w-60 shrink-0 flex-col bg-sidebar p-5 lg:flex">
          <div className="mb-8 flex items-center gap-2 font-bold">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-ink text-xs text-ink-foreground">
              P
            </span>
            Pathfinder
          </div>
          <nav className="space-y-1">
            {nav.map((n, i) => (
              <Link
                key={i}
                to={n.to}
                activeOptions={{ exact: true }}
                className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-foreground/80 hover:bg-card/60"
                activeProps={
                  n.to !== "/" || i === 0
                    ? { className: "bg-card font-semibold text-foreground" }
                    : {}
                }
              >
                <n.icon className="h-4 w-4" /> {n.label}
              </Link>
            ))}
          </nav>
          <div className="relative mt-auto rounded-2xl bg-card/70 p-4 pt-20 text-center">
            <img
              src={shapes}
              alt=""
              width={816}
              height={816}
              loading="lazy"
              className="absolute -top-10 left-1/2 w-32 -translate-x-1/2 pointer-events-none"
            />
            <p className="font-bold flex items-center justify-center gap-1.5">
              {isPro ? (
                <>
                  <Crown className="h-4 w-4 text-sun" />
                  Pathfinder Pro
                </>
              ) : (
                "Upgrade to Pro"
              )}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {isPro
                ? "Unlimited mock interviews and roadmaps"
                : "Unlock mock interviews and AI roadmaps"}
            </p>
            <span
              className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${isPro ? "bg-mint/40 text-foreground" : "bg-butter"}`}
            >
              {isPro ? "Active Membership" : "Free for 1 month"}
            </span>
            <button
              type="button"
              onClick={() => setUpgradeOpen(true)}
              className="mt-3 w-full rounded-full bg-ink py-2 text-xs font-semibold text-ink-foreground transition hover:opacity-90 cursor-pointer"
            >
              {isPro ? "Manage Plan" : "Upgrade now"}
            </button>
          </div>
          <div className="mt-5 space-y-1 text-sm text-foreground/80">
            <button
              type="button"
              onClick={() => setSupportOpen(true)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-foreground/80 hover:bg-card/60 transition cursor-pointer"
            >
              <LifeBuoy className="h-4 w-4" /> Support Center
            </button>
            <button
              type="button"
              onClick={() => {
                setSettingsTab("account");
                setSettingsOpen(true);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-foreground/80 hover:bg-card/60 transition cursor-pointer"
            >
              <Settings className="h-4 w-4" /> Settings
            </button>
          </div>
        </aside>
        <main className="min-w-0 flex-1 p-5 md:p-7">
          <header className="mb-6 flex items-center gap-3">
            <form
              onSubmit={handleSearchSubmit}
              className="flex w-full max-w-xs items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground focus-within:ring-2 focus-within:ring-ring"
            >
              <Search className="h-4 w-4 shrink-0" />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search careers, skills…"
                className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </form>
            <Link
              to="/assistant"
              className="ai-ring flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold"
            >
              AI Assistant <Sparkles className="h-3.5 w-3.5" />
            </Link>
            <div className="ml-auto flex items-center gap-3 sm:gap-4">
              <ThemeToggle />
              <NotificationPopover />
              <ProfileDropdown
                onOpenEditProfile={() => {
                  setProfileMode("edit");
                  setProfileOpen(true);
                }}
                onOpenSettings={(tab) => {
                  setSettingsTab(tab || "account");
                  setSettingsOpen(true);
                }}
                onOpenUpgrade={() => setUpgradeOpen(true)}
              />
            </div>
          </header>
          {children}
        </main>
      </div>

      {/* Modals */}
      <ProfileModal open={profileOpen} onOpenChange={setProfileOpen} mode={profileMode} />
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} defaultTab={settingsTab} />
      <UpgradeProModal open={upgradeOpen} onOpenChange={setUpgradeOpen} />
      <SupportCenterModal open={supportOpen} onOpenChange={setSupportOpen} />
    </div>
  );
}

function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("light");
  useEffect(() => {
    const saved = getSavedMode();
    setMode(saved);
    applyMode(saved);
  }, []);

  const next = () => {
    const m = modes[(modes.indexOf(mode) + 1) % modes.length]!;
    setMode(m);
    setSavedMode(m);
  };

  const Icon = mode === "light" ? Sun : mode === "dark" ? Moon : MoonStar;
  const label = mode === "light" ? "Light mode" : mode === "dark" ? "Dark mode" : "Night mode";
  return (
    <button
      onClick={next}
      aria-label={`${label} – click to switch`}
      title={label}
      className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition hover:bg-muted cursor-pointer"
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{label.replace(" mode", "")}</span>
    </button>
  );
}
