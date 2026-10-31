import { useState } from "react";
import { User, Settings, Sparkles, LogOut, GraduationCap, ChevronRight, Crown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { usePathfinder } from "@/lib/pathfinder-store";
import { toast } from "sonner";

interface ProfileDropdownProps {
  onOpenEditProfile: () => void;
  onOpenSettings: (tab?: string) => void;
  onOpenUpgrade: () => void;
}

export function ProfileDropdown({
  onOpenEditProfile,
  onOpenSettings,
  onOpenUpgrade,
}: ProfileDropdownProps) {
  const store = usePathfinder((s) => s);
  const profile = store.profile;
  const isPro = store.subscription.plan === "pro";
  const [open, setOpen] = useState(false);

  const handleSignOut = () => {
    setOpen(false);
    toast.info("Signed out of Pathfinder (Demo Session)", {
      description: "Your local profile and progress remain securely saved on this device.",
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="User Profile Menu"
          className="relative grid h-9 w-9 place-items-center rounded-full bg-sun font-bold text-ink transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {profile.avatarInitials || "S"}
          {isPro && (
            <span
              title="Pro Member"
              className="absolute -bottom-0.5 -right-0.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-ink text-[8px] text-sun"
            >
              ★
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-80 rounded-3xl border-border bg-card p-4 shadow-soft"
      >
        {/* Header / Avatar Info */}
        <div className="flex items-center gap-3 pb-3 border-b border-border/80">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sun font-bold text-ink shadow-sm text-base">
            {profile.avatarInitials || "S"}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="truncate text-sm font-bold text-foreground">{profile.name}</p>
              {isPro && (
                <span className="rounded-full bg-butter px-1.5 py-0.2 text-[9px] font-bold text-foreground">
                  PRO
                </span>
              )}
            </div>
            <p className="truncate text-xs text-muted-foreground">{profile.email}</p>
          </div>
        </div>

        {/* Career & Education summary */}
        <div className="my-3 space-y-2 rounded-2xl bg-muted/40 p-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Target Role</span>
            <span className="font-semibold text-foreground">{store.goal}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Education</span>
            <span
              className="truncate max-w-[140px] font-medium text-foreground text-right"
              title={profile.education}
            >
              {profile.education}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-border/50">
            <span className="text-muted-foreground">Learning Progress</span>
            <span className="font-medium text-foreground">
              {store.lessonsDone} lessons • {store.hours}h
            </span>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onOpenEditProfile();
            }}
            className="flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-xs font-medium text-foreground transition hover:bg-muted"
          >
            <span className="flex items-center gap-2.5">
              <User className="h-4 w-4 text-muted-foreground" />
              View & Edit Profile
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          </button>

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onOpenSettings();
            }}
            className="flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-xs font-medium text-foreground transition hover:bg-muted"
          >
            <span className="flex items-center gap-2.5">
              <Settings className="h-4 w-4 text-muted-foreground" />
              Account & Settings
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          </button>

          {!isPro ? (
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onOpenUpgrade();
              }}
              className="flex w-full items-center justify-between rounded-xl bg-butter/40 px-2.5 py-2 text-xs font-medium text-foreground transition hover:bg-butter/70"
            >
              <span className="flex items-center gap-2.5 font-semibold">
                <Crown className="h-4 w-4 text-sun" />
                Upgrade to Pro
              </span>
              <span className="rounded-full bg-ink px-1.5 py-0.5 text-[9px] font-bold text-ink-foreground">
                1 Mo Free
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onOpenUpgrade();
              }}
              className="flex w-full items-center justify-between rounded-xl bg-mint/20 px-2.5 py-2 text-xs font-medium text-foreground transition hover:bg-mint/40"
            >
              <span className="flex items-center gap-2.5 font-semibold">
                <Crown className="h-4 w-4 text-success" />
                Manage Pro Plan
              </span>
              <span className="text-[10px] text-muted-foreground">Active</span>
            </button>
          )}

          <div className="pt-1 border-t border-border/80">
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-destructive transition hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
