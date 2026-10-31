import { useState } from "react";
import { Check, Sparkles, Zap, Shield, Crown, Star, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { usePathfinder, actions } from "@/lib/pathfinder-store";
import { toast } from "sonner";

interface UpgradeProModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpgradeProModal({ open, onOpenChange }: UpgradeProModalProps) {
  const store = usePathfinder((s) => s);
  const subscription = store.subscription;
  const isPro = subscription.plan === "pro";

  const [interval, setInterval] = useState<"monthly" | "yearly">("monthly");
  const [loading, setLoading] = useState(false);

  const handleUpgrade = () => {
    setLoading(true);
    setTimeout(() => {
      actions.upgradeToPro(interval);
      setLoading(false);
      toast.success("Pathfinder Pro Activated!", {
        description:
          "Your 1-month free trial is now live. Enjoy unlimited AI interviews and custom roadmaps.",
      });
      onOpenChange(false);
    }, 400);
  };

  const handleDowngrade = () => {
    actions.downgradeToFree();
    toast.info("Switched to Pathfinder Free plan", {
      description: "You can re-upgrade anytime to unlock unlimited AI features.",
    });
    onOpenChange(false);
  };

  const proFeatures = [
    {
      title: "Unlimited AI Roadmaps",
      desc: "Generate week-by-week personalized curriculums with live milestones",
    },
    {
      title: "Voice Mock Interviews",
      desc: "Realistic speech evaluation with rubric scorecards (Technical, Communication)",
    },
    {
      title: "1-Click CV Gap Diagnosis",
      desc: "In-depth resume parsing and matching to target job descriptions",
    },
    {
      title: "Priority Gemini 3.8 Engine",
      desc: "Fastest response latency with zero rate-limit throttling",
    },
    {
      title: "Course Certificates",
      desc: "Verified credentials to share directly on LinkedIn and resumes",
    },
    {
      title: "Exclusive Job Alerts",
      desc: "Early notifications when hiring partners list junior frontend & design roles",
    },
  ];

  const freeFeatures = [
    "1 custom AI learning roadmap",
    "Basic skill radar auditing",
    "1 mock interview per month",
    "Standard public job feed",
    "Standard AI assistant response speed",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl border-border bg-card p-6 sm:p-8 shadow-soft">
        <DialogHeader className="text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-butter text-ink shadow-sm mb-2">
            <Crown className="h-6 w-6 text-sun" />
          </div>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {isPro
              ? "Your Pathfinder Pro Membership"
              : "Accelerate Your Career with Pathfinder Pro"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground max-w-md mx-auto">
            {isPro
              ? "You have full access to unlimited voice mock interviews, custom week-by-week roadmaps, and CV gap diagnosis."
              : "Master high-demand tech skills faster with personalized AI coaching, realistic interview simulations, and verified roadmaps."}
          </DialogDescription>
        </DialogHeader>

        {/* Plan status & interval toggle */}
        {!isPro && (
          <div className="flex items-center justify-center gap-3 pt-2">
            <span
              className={`text-xs font-semibold ${interval === "monthly" ? "text-foreground" : "text-muted-foreground"}`}
            >
              Monthly
            </span>
            <button
              type="button"
              onClick={() => setInterval(interval === "monthly" ? "yearly" : "monthly")}
              className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-ink transition-colors focus:outline-none"
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-sun shadow-lg transition duration-200 ease-in-out ${
                  interval === "yearly" ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span
                className={`text-xs font-semibold ${interval === "yearly" ? "text-foreground" : "text-muted-foreground"}`}
              >
                Annual
              </span>
              <span className="rounded-full bg-mint/50 px-2 py-0.5 text-[10px] font-bold text-foreground">
                Save 25%
              </span>
            </div>
          </div>
        )}

        {/* Side-by-side tier cards */}
        <div className="grid grid-cols-1 gap-5 pt-4 md:grid-cols-2">
          {/* FREE TIER */}
          <div className="rounded-3xl border border-border/80 bg-background/50 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                  Free Starter
                </span>
                {!isPro && (
                  <span className="rounded-full bg-muted/80 px-2 py-0.5 text-[10px] font-semibold text-foreground">
                    Current Plan
                  </span>
                )}
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold text-foreground">$0</span>
                <span className="text-xs text-muted-foreground"> / forever</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Essential tools to evaluate skills and track daily learning progress.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-muted-foreground">
                {freeFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {isPro && (
              <div className="pt-6">
                <button
                  type="button"
                  onClick={handleDowngrade}
                  className="w-full rounded-full border border-border bg-card py-2 text-xs font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  Downgrade to Free
                </button>
              </div>
            )}
          </div>

          {/* PRO TIER */}
          <div className="relative rounded-3xl border-2 border-primary bg-card p-6 shadow-md flex flex-col justify-between">
            <span className="absolute -top-3 right-6 rounded-full bg-sun px-3 py-0.5 text-[10px] font-bold text-ink shadow-sm">
              MOST POPULAR
            </span>

            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="rounded-full bg-ink px-2.5 py-0.5 text-[11px] font-semibold text-ink-foreground">
                    Pathfinder Pro
                  </span>
                  <span className="rounded-full bg-butter px-2 py-0.5 text-[10px] font-semibold text-foreground">
                    1 Month Free
                  </span>
                </div>
                {isPro && (
                  <span className="rounded-full bg-mint/50 px-2.5 py-0.5 text-[10px] font-bold text-foreground flex items-center gap-1">
                    <Check className="h-3 w-3" /> Active
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-foreground">
                  {interval === "monthly" ? "$19" : "$14"}
                </span>
                <span className="text-xs text-muted-foreground">
                  / month {interval === "yearly" ? "(billed annually)" : ""}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Complete career intelligence suite with voice mock interviews and custom roadmaps.
              </p>

              <div className="mt-6 space-y-2.5 text-xs">
                {proFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-ink text-[10px] text-sun">
                      ✓
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{f.title}</p>
                      <p className="text-[11px] text-muted-foreground">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              {!isPro ? (
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleUpgrade}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-ink py-2.5 text-xs font-semibold text-ink-foreground shadow-sm transition hover:opacity-90 disabled:opacity-50"
                >
                  <Sparkles className="h-4 w-4 text-sun" />
                  {loading ? "Activating Trial..." : "Start 1-Month Free Trial"}
                </button>
              ) : (
                <div className="rounded-2xl bg-muted/40 p-3 text-center">
                  <p className="text-xs font-semibold text-foreground">Pro Membership is Active</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Trial valid until {new Date(subscription.activeUntil).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-muted/30 p-3 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Shield className="h-4 w-4 text-violet" />
            No risk • Demo trial environment • Cancel anytime with one click
          </span>
          <span className="font-medium text-foreground">Instant Activation</span>
        </div>

        <DialogFooter className="pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted"
          >
            Close
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
