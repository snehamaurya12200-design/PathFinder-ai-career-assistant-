import { useState } from "react";
import {
  User,
  Mail,
  GraduationCap,
  Briefcase,
  MapPin,
  Globe,
  Github,
  Sparkles,
  Check,
} from "lucide-react";
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

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "view" | "edit";
}

const EDUCATION_LEVEL_OPTIONS = [
  "Class 10",
  "Class 11",
  "Class 12",
  "Diploma",
  "Undergraduate",
  "Postgraduate",
  "PhD / Research",
  "Competitive Exams",
  "Working Professional",
];

const STREAM_OPTIONS = [
  "Computer Science & IT",
  "AI & Emerging Tech",
  "Science (PCM)",
  "Science (PCB)",
  "Medical & Healthcare",
  "Commerce & Finance",
  "Management & Business",
  "Law & Civil Services",
  "Arts & Humanities",
  "Design & Creative Arts",
  "Engineering (Core)",
  "Essential & Soft Skills",
];

export function ProfileModal({ open, onOpenChange, mode = "edit" }: ProfileModalProps) {
  const store = usePathfinder((s) => s);
  const profile = store.profile;

  const [isEditing, setIsEditing] = useState(mode === "edit");
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [headline, setHeadline] = useState(profile.headline);
  const [education, setEducation] = useState(profile.education);
  const [educationLevel, setEducationLevel] = useState(profile.educationLevel || "Undergraduate");
  const [stream, setStream] = useState(profile.stream || "Computer Science & IT");
  const [goal, setGoal] = useState(store.goal);
  const [location, setLocation] = useState(profile.location || "Bengaluru, India");
  const [bio, setBio] = useState(profile.bio || "");
  const [github, setGithub] = useState(profile.github || "");
  const [portfolio, setPortfolio] = useState(profile.portfolio || "");

  // Sync state when opened
  const handleOpen = (isOpen: boolean) => {
    if (isOpen) {
      setName(profile.name);
      setEmail(profile.email);
      setHeadline(profile.headline);
      setEducation(profile.education);
      setEducationLevel(profile.educationLevel || "Undergraduate");
      setStream(profile.stream || "Computer Science & IT");
      setGoal(store.goal);
      setLocation(profile.location || "Bengaluru, India");
      setBio(profile.bio || "");
      setGithub(profile.github || "");
      setPortfolio(profile.portfolio || "");
      setIsEditing(mode === "edit");
    }
    onOpenChange(isOpen);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Full name cannot be blank");
      return;
    }

    actions.updateProfile({
      name: name.trim(),
      email: email.trim(),
      headline: headline.trim(),
      education: education.trim(),
      educationLevel,
      stream,
      location: location.trim(),
      bio: bio.trim(),
      github: github.trim(),
      portfolio: portfolio.trim(),
    });

    if (goal.trim() && goal !== store.goal) {
      actions.setGoal(goal.trim());
    }

    toast.success("Profile updated successfully", {
      description:
        "Your personalized AI recommendations, course catalogue, and roadmaps will now use your updated academic profile.",
    });
    onOpenChange(false);
  };

  const topSkills = Object.entries(store.skills)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border-border bg-card p-6 shadow-soft">
        <DialogHeader className="text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sun text-lg font-bold text-ink shadow-sm">
                {profile.avatarInitials || "S"}
              </span>
              <div>
                <DialogTitle className="text-xl font-bold text-foreground">
                  {profile.name}
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  {profile.headline}
                </DialogDescription>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-muted"
            >
              {isEditing ? "Preview Profile" : "Edit Profile"}
            </button>
          </div>
        </DialogHeader>

        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="e.g. Sneha Maurya"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="e.g. sneha@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Primary Career Goal</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="Full Stack Engineer">Full Stack Engineer</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="AI / Machine Learning Specialist">
                      AI / Machine Learning Specialist
                    </option>
                    <option value="Medical & Healthcare Aspirant">
                      Medical & Healthcare Aspirant
                    </option>
                    <option value="Secondary School Student (Class 10-12)">
                      Secondary School Student (Class 10-12)
                    </option>
                    <option value="Chartered Accountant / Finance Specialist">
                      Chartered Accountant / Finance Specialist
                    </option>
                    <option value="Civil Services / UPSC Aspirant">
                      Civil Services / UPSC Aspirant
                    </option>
                    <option value="Legal Specialist / Corporate Lawyer">
                      Legal Specialist / Corporate Lawyer
                    </option>
                    <option value="Academic Researcher">Academic Researcher</option>
                    <option value="Business & Marketing Specialist">
                      Business & Marketing Specialist
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="e.g. Bengaluru, India"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Education Level</label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background py-2 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {EDUCATION_LEVEL_OPTIONS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Academic Stream</label>
                <select
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background py-2 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {STREAM_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Professional Headline</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full rounded-xl border border-input bg-background py-2 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="e.g. Aspiring Frontend Developer & UI Enthusiast"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Institution / Degree Details
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="e.g. B.Tech Computer Science (2021-2025)"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Short Bio / Career Summary
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-input bg-background p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Briefly describe your interests, learning journey, and target opportunities..."
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">GitHub Profile</label>
                <div className="relative">
                  <Github className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="url"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Portfolio Website</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="url"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="https://yourportfolio.dev"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="pt-3">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-ink px-5 py-2 text-xs font-semibold text-ink-foreground transition hover:opacity-90"
              >
                Save Changes
              </button>
            </DialogFooter>
          </form>
        ) : (
          <div className="space-y-5 pt-2">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl bg-lilac/30 p-3 text-center">
                <p className="text-[11px] font-medium text-muted-foreground">Target Role</p>
                <p className="mt-0.5 text-xs font-bold text-foreground">{store.goal}</p>
              </div>
              <div className="rounded-2xl bg-mint/30 p-3 text-center">
                <p className="text-[11px] font-medium text-muted-foreground">Lessons Done</p>
                <p className="mt-0.5 text-xs font-bold text-foreground">{store.lessonsDone}</p>
              </div>
              <div className="rounded-2xl bg-sun/30 p-3 text-center">
                <p className="text-[11px] font-medium text-muted-foreground">Study Hours</p>
                <p className="mt-0.5 text-xs font-bold text-foreground">{store.hours} hrs</p>
              </div>
              <div className="rounded-2xl bg-butter/50 p-3 text-center">
                <p className="text-[11px] font-medium text-muted-foreground">Plan Status</p>
                <p className="mt-0.5 text-xs font-bold text-foreground capitalize">
                  {store.subscription.plan === "pro" ? "Pro Member" : "Free Tier"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border/80 bg-background/50 p-4 space-y-2">
              <h4 className="text-xs font-semibold text-foreground">About & Background</h4>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {profile.bio || "No summary provided yet. Click 'Edit Profile' to add your bio."}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-violet" />
                  {profile.education}
                </span>
                {profile.educationLevel && (
                  <span className="rounded-full bg-lilac/50 px-2.5 py-0.5 text-[11px] font-semibold text-violet">
                    {profile.educationLevel}
                  </span>
                )}
                {profile.stream && (
                  <span className="rounded-full bg-mint/50 px-2.5 py-0.5 text-[11px] font-semibold text-primary-foreground">
                    {profile.stream}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-sun" />
                  {profile.location || "Bengaluru, India"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-foreground">Top Evaluated Skills</h4>
                <span className="text-[11px] text-muted-foreground">Based on assessments & CV</span>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {topSkills.map(([skill, val]) => (
                  <div key={skill} className="rounded-xl border border-border/70 bg-card p-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground">{skill}</span>
                      <span className="font-bold text-foreground">{val}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-ink transition-all"
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-muted/40 p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="h-4 w-4 text-violet shrink-0" />
                <span>Connected to Gemini AI Career Intelligence Engine</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-success">
                <Check className="h-3 w-3" /> Live Context Sync
              </span>
            </div>

            <DialogFooter>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full sm:w-auto rounded-full bg-ink px-5 py-2 text-xs font-semibold text-ink-foreground transition hover:opacity-90"
              >
                Edit Profile Details
              </button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
