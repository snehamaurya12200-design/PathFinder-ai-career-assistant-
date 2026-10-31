import { useState, useEffect } from "react";
import {
  User,
  KeyRound,
  Sun,
  Moon,
  MoonStar,
  Bell,
  Sparkles,
  Shield,
  Volume2,
  VolumeX,
  Trash2,
  AlertTriangle,
  Check,
  CheckCircle2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { usePathfinder, actions } from "@/lib/pathfinder-store";
import { applyMode, getSavedMode, setSavedMode, type ThemeMode } from "@/lib/theme";
import { toast } from "sonner";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: string;
}

export function SettingsModal({ open, onOpenChange, defaultTab = "account" }: SettingsModalProps) {
  const store = usePathfinder((s) => s);
  const settings = store.settings;
  const profile = store.profile;

  // Active tab
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Account form state
  const [fullName, setFullName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(settings.account?.phone || "+91 98765 43210");

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwUpdated, setPwUpdated] = useState(false);

  // Theme mode
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>("light");

  // Notification toggles
  const [learningReminders, setLearningReminders] = useState(
    settings.notifications.learningReminders,
  );
  const [interviewReminders, setInterviewReminders] = useState(
    settings.notifications.interviewReminders,
  );
  const [applicationUpdates, setApplicationUpdates] = useState(
    settings.notifications.applicationUpdates,
  );
  const [courseAnnouncements, setCourseAnnouncements] = useState(
    settings.notifications.courseAnnouncements,
  );
  const [weeklyDigest, setWeeklyDigest] = useState(settings.notifications.weeklyDigest);

  // AI Preferences
  const [autoSpeak, setAutoSpeak] = useState(settings.aiPreferences.autoSpeak);
  const [textOnly, setTextOnly] = useState(settings.aiPreferences.textOnly);
  const [voiceInputEnabled, setVoiceInputEnabled] = useState(
    settings.aiPreferences.voiceInputEnabled,
  );
  const [voiceName, setVoiceName] = useState(settings.aiPreferences.voiceName || "Kore");

  // Privacy
  const [shareProfileWithAI, setShareProfileWithAI] = useState(settings.privacy.shareProfileWithAI);
  const [saveChatHistory, setSaveChatHistory] = useState(settings.privacy.saveChatHistory);
  const [analytics, setAnalytics] = useState(settings.privacy.analytics);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Sync on open
  useEffect(() => {
    if (open) {
      setFullName(profile.name);
      setEmail(profile.email);
      setPhone(settings.account?.phone || "+91 98765 43210");
      setCurrentTheme(getSavedMode());
      setLearningReminders(settings.notifications.learningReminders);
      setInterviewReminders(settings.notifications.interviewReminders);
      setApplicationUpdates(settings.notifications.applicationUpdates);
      setCourseAnnouncements(settings.notifications.courseAnnouncements);
      setWeeklyDigest(settings.notifications.weeklyDigest);
      setAutoSpeak(settings.aiPreferences.autoSpeak);
      setTextOnly(settings.aiPreferences.textOnly);
      setVoiceInputEnabled(settings.aiPreferences.voiceInputEnabled);
      setVoiceName(settings.aiPreferences.voiceName || "Kore");
      setShareProfileWithAI(settings.privacy.shareProfileWithAI);
      setSaveChatHistory(settings.privacy.saveChatHistory);
      setAnalytics(settings.privacy.analytics);
      setPwUpdated(false);
      setShowResetConfirm(false);
      if (defaultTab) setActiveTab(defaultTab);
    }
  }, [open, settings, profile, defaultTab]);

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    actions.updateProfile({ name: fullName.trim(), email: email.trim() });
    actions.updateSettings({
      account: {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
      },
    });

    toast.success("Account details saved successfully");
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      toast.error("Please enter your current password");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPwUpdated(true);
    toast.success("Password changed successfully", {
      description: "Your login credentials have been securely updated.",
    });
    setTimeout(() => setPwUpdated(false), 4000);
  };

  const handleThemeChange = (mode: ThemeMode) => {
    setCurrentTheme(mode);
    setSavedMode(mode);
    actions.updateSettings({ appearance: mode });
    toast.info(`${mode.charAt(0).toUpperCase() + mode.slice(1)} mode active`);
  };

  const handleToggleAutoSpeak = (checked: boolean) => {
    setAutoSpeak(checked);
    if (typeof window !== "undefined") {
      localStorage.setItem("pathfinder_auto_speak", String(checked));
    }
    actions.updateSettings({
      aiPreferences: {
        ...settings.aiPreferences,
        autoSpeak: checked,
        textOnly: !checked && textOnly,
      },
    });
    toast(
      checked ? "Voice spoken responses enabled" : "Spoken responses disabled (Text-only mode)",
    );
  };

  const handleToggleTextOnly = (checked: boolean) => {
    setTextOnly(checked);
    if (checked) {
      setAutoSpeak(false);
      if (typeof window !== "undefined") {
        localStorage.setItem("pathfinder_auto_speak", "false");
      }
    }
    actions.updateSettings({
      aiPreferences: {
        ...settings.aiPreferences,
        textOnly: checked,
        autoSpeak: checked ? false : autoSpeak,
      },
    });
    toast(checked ? "Text-only response mode active" : "Multimedia response mode active");
  };

  const handleClearHistory = () => {
    actions.clearChat();
    toast.success("AI Conversation history cleared", {
      description: "The assistant has reset its chat memory to default greeting.",
    });
  };

  const handleFullReset = () => {
    actions.resetAllData();
    setShowResetConfirm(false);
    onOpenChange(false);
    toast.success("Pathfinder reset to initial state", {
      description: "Default mock data and goals have been re-seeded.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border-border bg-card p-6 shadow-soft">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl font-bold text-foreground">Settings</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Manage your account preferences, appearance, AI behaviors, and notification channels.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full pt-1">
          <TabsList className="grid w-full grid-cols-5 rounded-2xl bg-muted/60 p-1 text-xs">
            <TabsTrigger value="account" className="rounded-xl py-1.5 text-xs font-semibold">
              Account
            </TabsTrigger>
            <TabsTrigger value="appearance" className="rounded-xl py-1.5 text-xs font-semibold">
              Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-xl py-1.5 text-xs font-semibold">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="ai" className="rounded-xl py-1.5 text-xs font-semibold">
              AI Config
            </TabsTrigger>
            <TabsTrigger value="privacy" className="rounded-xl py-1.5 text-xs font-semibold">
              Privacy
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: ACCOUNT */}
          <TabsContent value="account" className="space-y-5 pt-3">
            <form onSubmit={handleSaveAccount} className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-violet" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Personal Information
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-input bg-background py-2 px-3 text-sm text-foreground focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-input bg-background py-2 px-3 text-sm text-foreground focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background py-2 px-3 text-sm text-foreground focus:ring-2 focus:ring-ring"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-full bg-ink px-4 py-1.5 text-xs font-semibold text-ink-foreground transition hover:opacity-90"
                >
                  Save Profile Details
                </button>
              </div>
            </form>

            <div className="border-t border-border pt-4">
              <form onSubmit={handleUpdatePassword} className="space-y-3">
                <div className="flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-sun" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Password & Security
                  </h4>
                </div>

                {pwUpdated && (
                  <div className="flex items-center gap-2 rounded-xl bg-mint/30 p-2.5 text-xs text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>Password updated successfully!</span>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-input bg-background py-2 px-3 text-sm text-foreground focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 6 chars"
                      className="w-full rounded-xl border border-input bg-background py-2 px-3 text-sm text-foreground focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Confirm New</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-input bg-background py-2 px-3 text-sm text-foreground focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="rounded-full border border-border bg-muted/60 px-4 py-1.5 text-xs font-semibold text-foreground transition hover:bg-muted"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </TabsContent>

          {/* TAB 2: APPEARANCE */}
          <TabsContent value="appearance" className="space-y-4 pt-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Theme & Interface Mode
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Choose the visual theme that suits your working environment. Your choice is saved
                automatically.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => handleThemeChange("light")}
                className={`relative flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition ${
                  currentTheme === "light"
                    ? "border-primary bg-card ring-2 ring-primary/20 shadow-sm"
                    : "border-border bg-card/60 hover:bg-card"
                }`}
              >
                <div className="grid h-10 w-10 place-items-center rounded-full bg-sun/30 text-ink">
                  <Sun className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Light Mode</p>
                  <p className="text-[10px] text-muted-foreground">
                    Clean, high-contrast lavender & white
                  </p>
                </div>
                {currentTheme === "light" && (
                  <span className="absolute top-2 right-2 grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    ✓
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleThemeChange("dark")}
                className={`relative flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition ${
                  currentTheme === "dark"
                    ? "border-primary bg-card ring-2 ring-primary/20 shadow-sm"
                    : "border-border bg-card/60 hover:bg-card"
                }`}
              >
                <div className="grid h-10 w-10 place-items-center rounded-full bg-violet/30 text-violet">
                  <Moon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Dark Mode</p>
                  <p className="text-[10px] text-muted-foreground">
                    Comfortable for evening study sessions
                  </p>
                </div>
                {currentTheme === "dark" && (
                  <span className="absolute top-2 right-2 grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    ✓
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleThemeChange("night")}
                className={`relative flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition ${
                  currentTheme === "night"
                    ? "border-primary bg-card ring-2 ring-primary/20 shadow-sm"
                    : "border-border bg-card/60 hover:bg-card"
                }`}
              >
                <div className="grid h-10 w-10 place-items-center rounded-full bg-mint/30 text-primary-foreground">
                  <MoonStar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Night Mode</p>
                  <p className="text-[10px] text-muted-foreground">
                    Deep contrast with subtle purple tint
                  </p>
                </div>
                {currentTheme === "night" && (
                  <span className="absolute top-2 right-2 grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    ✓
                  </span>
                )}
              </button>
            </div>
          </TabsContent>

          {/* TAB 3: NOTIFICATIONS */}
          <TabsContent value="notifications" className="space-y-4 pt-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Notification Channels & Frequency
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Control which alerts appear in your top notifications feed and browser reminders.
              </p>
            </div>

            <div className="space-y-3 divide-y divide-border/60">
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Learning & Lesson Reminders
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Alerts when your scheduled curriculum modules and exercises are due
                  </p>
                </div>
                <Switch
                  checked={learningReminders}
                  onCheckedChange={(checked) => {
                    setLearningReminders(checked);
                    actions.updateSettings({
                      notifications: { ...settings.notifications, learningReminders: checked },
                    });
                  }}
                />
              </div>

              <div className="flex items-center justify-between pt-3">
                <div>
                  <p className="text-xs font-semibold text-foreground">Mock Interview Alerts</p>
                  <p className="text-[11px] text-muted-foreground">
                    Reminders for scheduled practice interviews and feedback readiness
                  </p>
                </div>
                <Switch
                  checked={interviewReminders}
                  onCheckedChange={(checked) => {
                    setInterviewReminders(checked);
                    actions.updateSettings({
                      notifications: { ...settings.notifications, interviewReminders: checked },
                    });
                  }}
                />
              </div>

              <div className="flex items-center justify-between pt-3">
                <div>
                  <p className="text-xs font-semibold text-foreground">Job Application Updates</p>
                  <p className="text-[11px] text-muted-foreground">
                    Status changes when companies shortlist, schedule, or review your applications
                  </p>
                </div>
                <Switch
                  checked={applicationUpdates}
                  onCheckedChange={(checked) => {
                    setApplicationUpdates(checked);
                    actions.updateSettings({
                      notifications: { ...settings.notifications, applicationUpdates: checked },
                    });
                  }}
                />
              </div>

              <div className="flex items-center justify-between pt-3">
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Course & Content Announcements
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    New modules added to enrolled courses and roadmap milestone releases
                  </p>
                </div>
                <Switch
                  checked={courseAnnouncements}
                  onCheckedChange={(checked) => {
                    setCourseAnnouncements(checked);
                    actions.updateSettings({
                      notifications: { ...settings.notifications, courseAnnouncements: checked },
                    });
                  }}
                />
              </div>

              <div className="flex items-center justify-between pt-3">
                <div>
                  <p className="text-xs font-semibold text-foreground">Weekly Progress Digest</p>
                  <p className="text-[11px] text-muted-foreground">
                    Sunday summary of hours logged, skills boosted, and test performance
                  </p>
                </div>
                <Switch
                  checked={weeklyDigest}
                  onCheckedChange={(checked) => {
                    setWeeklyDigest(checked);
                    actions.updateSettings({
                      notifications: { ...settings.notifications, weeklyDigest: checked },
                    });
                  }}
                />
              </div>
            </div>
          </TabsContent>

          {/* TAB 4: AI PREFERENCES */}
          <TabsContent value="ai" className="space-y-4 pt-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                AI Career Advisor Behaviors
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Fine-tune voice responses, speech synthesis models, and conversation modes.
              </p>
            </div>

            <div className="space-y-3 divide-y divide-border/60">
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Automatic Spoken Responses
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    AI automatically reads aloud its replies using high-fidelity Gemini speech
                  </p>
                </div>
                <Switch checked={autoSpeak} onCheckedChange={handleToggleAutoSpeak} />
              </div>

              <div className="flex items-center justify-between pt-3">
                <div>
                  <p className="text-xs font-semibold text-foreground">Text-Only Response Mode</p>
                  <p className="text-[11px] text-muted-foreground">
                    Disable all automatic voice playback for silent environments
                  </p>
                </div>
                <Switch checked={textOnly} onCheckedChange={handleToggleTextOnly} />
              </div>

              <div className="flex items-center justify-between pt-3">
                <div>
                  <p className="text-xs font-semibold text-foreground">Microphone Voice Input</p>
                  <p className="text-[11px] text-muted-foreground">
                    Enable hands-free dictation button on the AI Assistant screen
                  </p>
                </div>
                <Switch
                  checked={voiceInputEnabled}
                  onCheckedChange={(checked) => {
                    setVoiceInputEnabled(checked);
                    actions.updateSettings({
                      aiPreferences: { ...settings.aiPreferences, voiceInputEnabled: checked },
                    });
                  }}
                />
              </div>

              <div className="flex items-center justify-between pt-3">
                <div>
                  <p className="text-xs font-semibold text-foreground">AI Voice Persona</p>
                  <p className="text-[11px] text-muted-foreground">
                    Select the tone and timber of the synthetic speech engine
                  </p>
                </div>
                <select
                  value={voiceName}
                  onChange={(e) => {
                    const next = e.target.value;
                    setVoiceName(next);
                    actions.updateSettings({
                      aiPreferences: { ...settings.aiPreferences, voiceName: next },
                    });
                    toast.info(`Voice persona switched to ${next}`);
                  }}
                  className="rounded-xl border border-input bg-background py-1.5 px-3 text-xs text-foreground focus:ring-2 focus:ring-ring"
                >
                  <option value="Kore">Kore (Balanced & Clear)</option>
                  <option value="Puck">Puck (Engaging & Warm)</option>
                  <option value="Fenrir">Fenrir (Deep & Professional)</option>
                  <option value="Aoede">Aoede (Friendly & Calm)</option>
                </select>
              </div>
            </div>
          </TabsContent>

          {/* TAB 5: PRIVACY & DATA */}
          <TabsContent value="privacy" className="space-y-4 pt-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Data Privacy & Chat Management
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Control how your profile and skill evaluations are utilized by the career
                intelligence model.
              </p>
            </div>

            <div className="space-y-3 divide-y divide-border/60">
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Share Profile with AI Advisor
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Allows Gemini to reference your name, skills, and target goal to give tailored
                    feedback
                  </p>
                </div>
                <Switch
                  checked={shareProfileWithAI}
                  onCheckedChange={(checked) => {
                    setShareProfileWithAI(checked);
                    actions.updateSettings({
                      privacy: { ...settings.privacy, shareProfileWithAI: checked },
                    });
                  }}
                />
              </div>

              <div className="flex items-center justify-between pt-3">
                <div>
                  <p className="text-xs font-semibold text-foreground">Save Conversation History</p>
                  <p className="text-[11px] text-muted-foreground">
                    Store previous chat turns so the assistant maintains conversational context
                  </p>
                </div>
                <Switch
                  checked={saveChatHistory}
                  onCheckedChange={(checked) => {
                    setSaveChatHistory(checked);
                    actions.updateSettings({
                      privacy: { ...settings.privacy, saveChatHistory: checked },
                    });
                  }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-border/80 bg-muted/30 p-4 space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Clear AI Conversation History
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Reset chat messages back to the initial career greeting
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
                >
                  Clear Chat
                </button>
              </div>

              <div className="border-t border-border/60 pt-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-destructive">
                    Reset All Pathfinder Data
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Clears local state, mock applications, skills, and resets to defaults
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(true)}
                  className="rounded-full bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/20"
                >
                  Reset All Data
                </button>
              </div>
            </div>

            {showResetConfirm && (
              <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-4 space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2 text-destructive font-semibold text-xs">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Are you sure you want to reset everything?</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  This will reset all your enrolled course progress, mock interview logs, custom
                  roadmaps, and profile changes back to factory defaults.
                </p>
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(false)}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground hover:bg-muted"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleFullReset}
                    className="rounded-full bg-destructive px-3.5 py-1 text-xs font-semibold text-destructive-foreground hover:bg-destructive/90"
                  >
                    Confirm Reset
                  </button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter className="pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-full bg-ink px-5 py-2 text-xs font-semibold text-ink-foreground transition hover:opacity-90"
          >
            Close Settings
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
