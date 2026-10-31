import { useSyncExternalStore } from "react";
import type { CareerDNA, CareerQuestProgress } from "@/lib/career-quest-data";

export type AppStatus =
  "Applied" | "Under Review" | "Shortlisted" | "Interview Scheduled" | "Selected" | "Rejected";
export const APP_STATUSES: AppStatus[] = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Interview Scheduled",
  "Selected",
  "Rejected",
];

export type Application = {
  jobId: number;
  status: AppStatus;
  appliedAt: string;
  note?: string;
  history: { status: AppStatus; at: string }[];
  interview?: { date: string; time: string; mode: string; details: string };
  onboarding?: string;
};
export type TestResult = { subject: string; score: number; total: number; at: string };
export type InterviewResult = { role: string; difficulty: string; score: number; at: string };
export type ChatMsg = {
  me: boolean;
  t: string;
  error?: boolean;
  retryText?: string;
};

export type DetailedInterviewReport = {
  id: string;
  role: string;
  difficulty: string;
  score: number;
  at: string;
  breakdown: {
    technical: number;
    problemSolving: number;
    communication: number;
    relevance: number;
    confidence: number;
  };
  feedback: string;
  strength?: string;
  improvement?: string;
  recommendation?: string;
  questionsAnswers: Array<{ q: string; a: string; score: number; text: string }>;
};

export type CVAnalysis = {
  candidateName?: string;
  summary: string;
  matchScore: number;
  extractedSkills: Record<string, number>;
  strengths: string[];
  gaps: string[];
  recommendations: string[];
  recommendedCourseId?: string;
  analyzedAt: string;
};

export type RoadmapStepItem = {
  title: string;
  progress: number;
  topics: string;
};

export type CustomRoadmapWeek = {
  week: number;
  title: string;
  topics: string[];
  deliverable: string;
};

export type CustomRoadmap = {
  goal: string;
  summary: string;
  generatedAt: string;
  weeks?: CustomRoadmapWeek[];
  steps?: Array<{
    n: number;
    title: string;
    level: string;
    hours: number;
    points: number;
    desc: string;
    courses: RoadmapStepItem[];
    builds: RoadmapStepItem[];
  }>;
};

export type UserProfile = {
  name: string;
  email: string;
  education: string;
  headline: string;
  avatarInitials: string;
  location?: string;
  bio?: string;
  github?: string;
  portfolio?: string;
  educationLevel?: string;
  stream?: string;
  targetExam?: string;
};

export type UserSettings = {
  account: {
    fullName: string;
    email: string;
    phone: string;
  };
  appearance: "light" | "dark" | "night";
  notifications: {
    learningReminders: boolean;
    interviewReminders: boolean;
    applicationUpdates: boolean;
    courseAnnouncements: boolean;
    weeklyDigest: boolean;
  };
  aiPreferences: {
    autoSpeak: boolean;
    textOnly: boolean;
    voiceInputEnabled: boolean;
    voiceName: string;
  };
  privacy: {
    shareProfileWithAI: boolean;
    saveChatHistory: boolean;
    analytics: boolean;
  };
};

export type SubscriptionPlan = "free" | "pro";
export type UserSubscription = {
  plan: SubscriptionPlan;
  interval: "monthly" | "yearly";
  activeUntil: string;
  isTrial: boolean;
  startedAt: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  type: "lesson" | "interview" | "job" | "roadmap" | "system";
  at: string;
  read: boolean;
  link?: string;
};

export type SupportTicket = {
  id: string;
  subject: string;
  category:
    "AI Assistant" | "Courses & Learning" | "Job Applications" | "Account & Billing" | "Other";
  priority: "Normal" | "High" | "Urgent";
  message: string;
  createdAt: string;
  status: "Received" | "Under Review" | "Resolved";
};

export type PathfinderState = {
  goal: string;
  skills: Record<string, number>;
  applications: Application[];
  savedJobs: number[];
  enrolled: Record<string, number>; // courseId -> progress 0-100
  learningList: string[];
  lessonsDone: number;
  hours: number;
  tests: TestResult[];
  interviews: InterviewResult[];
  detailedInterviews: DetailedInterviewReport[];
  connections: Record<number, "pending" | "connected">;
  events: number[];
  groups: string[];
  chat: ChatMsg[];
  cvName?: string;
  cvAnalysis?: CVAnalysis;
  customRoadmap?: CustomRoadmap;
  profile: UserProfile;
  settings: UserSettings;
  subscription: UserSubscription;
  notifications: NotificationItem[];
  supportTickets: SupportTicket[];
  careerDNA?: CareerDNA;
  careerDNAHistory: CareerDNA[];
  activeQuestProgress?: CareerQuestProgress | null;
};

export const DEFAULT_SKILLS: Record<string, number> = {
  Frontend: 60,
  Communication: 12,
  "Data Structures": 27,
  JavaScript: 55,
  React: 48,
  TypeScript: 20,
  "Interaction Design": 75,
  "User Research": 85,
  "Content Strategy": 50,
  "Visual Design": 94,
  "Design Leadership": 40,
  "Product Thinking": 36,
};

export const initialProfile: UserProfile = {
  name: "Sneha Maurya",
  email: "snehamaurya12200@gmail.com",
  education: "B.Tech Computer Science (2021-2025)",
  headline: "Aspiring Frontend Developer & UI Enthusiast",
  avatarInitials: "S",
  location: "Bengaluru, India",
  bio: "Passionate about building responsive, accessible web interfaces and learning modern frontend frameworks.",
  github: "https://github.com/sneha-maurya",
  portfolio: "https://sneha-dev.portfolio",
  educationLevel: "Undergraduate",
  stream: "Computer Science & IT",
};

export const initialSettings: UserSettings = {
  account: {
    fullName: "Sneha Maurya",
    email: "snehamaurya12200@gmail.com",
    phone: "+91 98765 43210",
  },
  appearance: "light",
  notifications: {
    learningReminders: true,
    interviewReminders: true,
    applicationUpdates: true,
    courseAnnouncements: true,
    weeklyDigest: false,
  },
  aiPreferences: {
    autoSpeak: false,
    textOnly: false,
    voiceInputEnabled: true,
    voiceName: "Kore",
  },
  privacy: {
    shareProfileWithAI: true,
    saveChatHistory: true,
    analytics: false,
  },
};

export const initialSubscription: UserSubscription = {
  plan: "free",
  interval: "monthly",
  activeUntil: "2026-11-30T00:00:00Z",
  isTrial: false,
  startedAt: "2026-10-01T00:00:00Z",
};

export const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Lesson Reminder",
    message: "Next lesson 'Component State Management' is ready in React Pro.",
    type: "lesson",
    at: "10m ago",
    read: false,
    link: "/learning",
  },
  {
    id: "notif-2",
    title: "Job Application Update",
    message: "FinTech Labs moved your Junior Frontend application to Shortlisted!",
    type: "job",
    at: "2h ago",
    read: false,
    link: "/jobs",
  },
  {
    id: "notif-3",
    title: "Mock Interview Ready",
    message: "Frontend Developer (Medium difficulty) is unlocked and waiting for you.",
    type: "interview",
    at: "Yesterday",
    read: true,
    link: "/",
  },
  {
    id: "notif-4",
    title: "AI Skill Insight",
    message: "Your TypeScript score improved! Try taking the Advanced React assessment next.",
    type: "roadmap",
    at: "2d ago",
    read: true,
    link: "/skills",
  },
];

export const initialState: PathfinderState = {
  goal: "Frontend Developer",
  skills: DEFAULT_SKILLS,
  applications: [],
  savedJobs: [],
  enrolled: { "react-pro": 35 },
  learningList: [],
  lessonsDone: 46,
  hours: 127,
  tests: [],
  interviews: [],
  detailedInterviews: [],
  connections: {},
  events: [],
  groups: [],
  chat: [
    { me: false, t: "Hi Sneha! Want me to review your CV and suggest your next best step?" },
    { me: true, t: "Yes, I want to become a frontend developer." },
  ],
  profile: initialProfile,
  settings: initialSettings,
  subscription: initialSubscription,
  notifications: initialNotifications,
  supportTickets: [],
  careerDNAHistory: [],
  activeQuestProgress: null,
};

const KEY = "pathfinder-state-v1";
let state: PathfinderState = initialState;
let hydrated = false;
const listeners = new Set<() => void>();

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = {
        ...initialState,
        ...parsed,
        profile: { ...initialProfile, ...(parsed.profile || {}) },
        settings: {
          ...initialSettings,
          ...(parsed.settings || {}),
          account: { ...initialSettings.account, ...(parsed.settings?.account || {}) },
          notifications: {
            ...initialSettings.notifications,
            ...(parsed.settings?.notifications || {}),
          },
          aiPreferences: {
            ...initialSettings.aiPreferences,
            ...(parsed.settings?.aiPreferences || {}),
          },
          privacy: { ...initialSettings.privacy, ...(parsed.settings?.privacy || {}) },
        },
        subscription: { ...initialSubscription, ...(parsed.subscription || {}) },
        notifications: parsed.notifications ?? initialNotifications,
        supportTickets: parsed.supportTickets ?? [],
        careerDNA: parsed.careerDNA,
        careerDNAHistory: parsed.careerDNAHistory ?? [],
        activeQuestProgress: parsed.activeQuestProgress ?? null,
      };
    }
  } catch {
    /* ignore */
  }
}

export function getState() {
  hydrate();
  return state;
}

export function setState(fn: (s: PathfinderState) => Partial<PathfinderState>) {
  hydrate();
  state = { ...state, ...fn(state) };
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  // notify once after hydration on the client
  if (!hydrated) {
    hydrate();
    queueMicrotask(l);
  }
  return () => listeners.delete(l);
}

export function usePathfinder<T>(sel: (s: PathfinderState) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => sel(state),
    () => sel(initialState),
  );
}

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));
const now = () => new Date().toISOString();

/* ---------- actions ---------- */
export const actions = {
  setGoal: (goal: string) => setState(() => ({ goal })),
  setSkill: (name: string, v: number) =>
    setState((s) => ({ skills: { ...s.skills, [name]: clamp(v) } })),
  removeSkill: (name: string) =>
    setState((s) => {
      const k = { ...s.skills };
      delete k[name];
      return { skills: k };
    }),
  boostSkills: (names: string[], by: number) =>
    setState((s) => {
      const k = { ...s.skills };
      names.forEach((n) => {
        k[n] = clamp((k[n] ?? 0) + by);
      });
      return { skills: k };
    }),
  toggleSave: (id: number) =>
    setState((s) => ({
      savedJobs: s.savedJobs.includes(id)
        ? s.savedJobs.filter((x) => x !== id)
        : [...s.savedJobs, id],
    })),
  apply: (jobId: number, note?: string) =>
    setState((s) =>
      s.applications.some((a) => a.jobId === jobId)
        ? {}
        : {
            applications: [
              ...s.applications,
              {
                jobId,
                status: "Applied",
                appliedAt: now(),
                note,
                history: [{ status: "Applied", at: now() }],
              },
            ],
          },
    ),
  updateApplication: (jobId: number, patch: Partial<Application>) =>
    setState((s) => ({
      applications: s.applications.map((a) => {
        if (a.jobId !== jobId) return a;
        const history =
          patch.status && patch.status !== a.status
            ? [...a.history, { status: patch.status, at: now() }]
            : a.history;
        return { ...a, ...patch, history };
      }),
    })),
  withdraw: (jobId: number) =>
    setState((s) => ({ applications: s.applications.filter((a) => a.jobId !== jobId) })),
  enroll: (id: string) =>
    setState((s) =>
      s.enrolled[id] !== undefined
        ? {}
        : {
            enrolled: { ...s.enrolled, [id]: 0 },
            learningList: s.learningList.filter((x) => x !== id),
          },
    ),
  addToList: (id: string) =>
    setState((s) =>
      s.learningList.includes(id) || s.enrolled[id] !== undefined
        ? {}
        : { learningList: [...s.learningList, id] },
    ),
  removeFromList: (id: string) =>
    setState((s) => ({ learningList: s.learningList.filter((x) => x !== id) })),
  progressCourse: (id: string, by: number, skills: string[], lessonHours: number) =>
    setState((s) => {
      const prev = s.enrolled[id] ?? 0;
      if (prev >= 100) return {};
      const next = clamp(prev + by);
      const k = { ...s.skills };
      const gain = next === 100 ? 8 : 2;
      skills.forEach((n) => {
        k[n] = clamp((k[n] ?? 0) + gain);
      });
      return {
        enrolled: { ...s.enrolled, [id]: next },
        skills: k,
        lessonsDone: s.lessonsDone + 1,
        hours: s.hours + lessonHours,
      };
    }),
  lessonComplete: () => setState((s) => ({ lessonsDone: s.lessonsDone + 1, hours: s.hours + 1 })),
  recordTest: (r: Omit<TestResult, "at">, skills: string[]) =>
    setState((s) => {
      const pct = r.score / r.total;
      const k = { ...s.skills };
      skills.forEach((n) => {
        const cur = k[n] ?? 0;
        k[n] = clamp(cur + (pct * 100 - cur) * 0.3);
      });
      return { tests: [{ ...r, at: now() }, ...s.tests], skills: k };
    }),
  recordInterview: (r: Omit<InterviewResult, "at">) =>
    setState((s) => ({
      interviews: [{ ...r, at: now() }, ...s.interviews],
      skills: {
        ...s.skills,
        Communication: clamp((s.skills.Communication ?? 0) + (r.score >= 60 ? 6 : 2)),
      },
    })),
  connect: (id: number) =>
    setState((s) => ({ connections: { ...s.connections, [id]: "pending" } })),
  acceptConnection: (id: number) =>
    setState((s) => ({ connections: { ...s.connections, [id]: "connected" } })),
  removeConnection: (id: number) =>
    setState((s) => {
      const c = { ...s.connections };
      delete c[id];
      return { connections: c };
    }),
  toggleEvent: (id: number) =>
    setState((s) => ({
      events: s.events.includes(id) ? s.events.filter((x) => x !== id) : [...s.events, id],
    })),
  toggleGroup: (g: string) =>
    setState((s) => ({
      groups: s.groups.includes(g) ? s.groups.filter((x) => x !== g) : [...s.groups, g],
    })),
  setChat: (chat: ChatMsg[]) => setState(() => ({ chat })),
  addChatMessage: (msg: ChatMsg) => setState((s) => ({ chat: [...s.chat, msg] })),
  clearChat: () =>
    setState(() => ({
      chat: [
        {
          me: false,
          t: "Hi Sneha! I am your AI Career Advisor. Ask me anything about goals, skills, learning roadmaps, or interview prep!",
        },
      ],
    })),
  setCvAnalysis: (cvName: string, analysis: CVAnalysis) =>
    setState((s) => {
      const mergedSkills = { ...s.skills };
      if (analysis.extractedSkills) {
        Object.entries(analysis.extractedSkills).forEach(([k, v]) => {
          if (typeof v === "number") {
            const cur = mergedSkills[k] ?? 0;
            mergedSkills[k] = clamp(Math.max(cur, v));
          }
        });
      }
      return {
        cvName,
        cvAnalysis: analysis,
        skills: mergedSkills,
      };
    }),
  updateSkillMap: (skillsMap: Record<string, number>) =>
    setState((s) => {
      const k = { ...s.skills };
      Object.entries(skillsMap).forEach(([name, v]) => {
        k[name] = clamp(v);
      });
      return { skills: k };
    }),
  setCustomRoadmap: (roadmap: CustomRoadmap) => setState(() => ({ customRoadmap: roadmap })),
  recordDetailedInterview: (report: DetailedInterviewReport) =>
    setState((s) => {
      const commGain = report.breakdown.communication >= 65 ? 8 : 4;
      const techSkill =
        s.goal === "Frontend Developer"
          ? "Frontend"
          : s.goal === "UI/UX Designer"
            ? "Interaction Design"
            : "Data Structures";
      const techGain = report.breakdown.technical >= 65 ? 8 : 4;
      const k = {
        ...s.skills,
        Communication: clamp((s.skills.Communication ?? 0) + commGain),
        [techSkill]: clamp((s.skills[techSkill] ?? 0) + techGain),
      };
      const summaryResult: InterviewResult = {
        role: report.role,
        difficulty: report.difficulty,
        score: report.score,
        at: report.at,
      };
      return {
        detailedInterviews: [report, ...(s.detailedInterviews || [])],
        interviews: [summaryResult, ...s.interviews],
        skills: k,
      };
    }),
  updateProfile: (patch: Partial<UserProfile>) =>
    setState((s) => {
      const nextProfile = { ...s.profile, ...patch };
      if (patch.name && !patch.avatarInitials) {
        nextProfile.avatarInitials = patch.name.trim().charAt(0).toUpperCase() || "S";
      }
      return { profile: nextProfile };
    }),
  updateSettings: (patch: Partial<UserSettings>) =>
    setState((s) => ({
      settings: {
        ...s.settings,
        ...patch,
        account: { ...s.settings.account, ...(patch.account || {}) },
        notifications: { ...s.settings.notifications, ...(patch.notifications || {}) },
        aiPreferences: { ...s.settings.aiPreferences, ...(patch.aiPreferences || {}) },
        privacy: { ...s.settings.privacy, ...(patch.privacy || {}) },
      },
    })),
  upgradeToPro: (interval: "monthly" | "yearly" = "monthly") =>
    setState((s) => ({
      subscription: {
        plan: "pro",
        interval,
        activeUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        isTrial: true,
        startedAt: now(),
      },
      notifications: [
        {
          id: `notif-${Date.now()}`,
          title: "Pro Activated!",
          message: "You now have unlimited AI mock interviews and custom roadmaps.",
          type: "system",
          at: "Just now",
          read: false,
        },
        ...s.notifications,
      ],
    })),
  downgradeToFree: () =>
    setState((s) => ({
      subscription: {
        plan: "free",
        interval: "monthly",
        activeUntil: now(),
        isTrial: false,
        startedAt: now(),
      },
      notifications: [
        {
          id: `notif-${Date.now()}`,
          title: "Subscription Updated",
          message: "You are currently on the Pathfinder Free plan.",
          type: "system",
          at: "Just now",
          read: false,
        },
        ...s.notifications,
      ],
    })),
  markNotificationRead: (id: string) =>
    setState((s) => ({
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
  markAllNotificationsRead: () =>
    setState((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
    })),
  clearNotifications: () =>
    setState(() => ({
      notifications: [],
    })),
  addNotification: (item: Omit<NotificationItem, "id" | "at" | "read">) =>
    setState((s) => ({
      notifications: [
        {
          ...item,
          id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          at: "Just now",
          read: false,
        },
        ...s.notifications,
      ],
    })),
  submitSupportTicket: (ticket: Omit<SupportTicket, "id" | "createdAt" | "status">): string => {
    const id = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: SupportTicket = {
      ...ticket,
      id,
      createdAt: now(),
      status: "Received",
    };
    setState((s) => ({
      supportTickets: [newTicket, ...(s.supportTickets || [])],
      notifications: [
        {
          id: `notif-${Date.now()}`,
          title: `Ticket Submitted (#${id})`,
          message: `Your inquiry regarding "${ticket.subject}" has been received. Our career team will respond shortly.`,
          type: "system",
          at: "Just now",
          read: false,
        },
        ...s.notifications,
      ],
    }));
    return id;
  },
  saveCareerDNA: (dna: CareerDNA) => {
    setState((s) => {
      const history = s.careerDNA
        ? [s.careerDNA, ...(s.careerDNAHistory || [])]
        : s.careerDNAHistory || [];
      return {
        careerDNA: dna,
        careerDNAHistory: history,
        activeQuestProgress: null,
        notifications: [
          {
            id: `notif-${Date.now()}`,
            title: `Career DNA Synthesized: ${dna.archetype.title}`,
            message: `Your discovery report is ready! Top career match: ${dna.careerMatches[0]?.title ?? "Exploration Path"}.`,
            type: "roadmap",
            at: "Just now",
            read: false,
            link: "/quest",
          },
          ...s.notifications,
        ],
      };
    });
  },
  saveQuestProgress: (progress: CareerQuestProgress | null) => {
    setState(() => ({
      activeQuestProgress: progress,
    }));
  },
  clearQuestProgress: () => {
    setState(() => ({
      activeQuestProgress: null,
    }));
  },
  adoptCareerGoal: (newGoal: string) => {
    setState((s) => ({
      goal: newGoal,
      profile: {
        ...s.profile,
        headline: `${newGoal} Aspirant`,
      },
      notifications: [
        {
          id: `notif-${Date.now()}`,
          title: `Career Target Updated: ${newGoal}`,
          message: `Your learning path and recommended modules have aligned to ${newGoal}.`,
          type: "roadmap",
          at: "Just now",
          read: false,
          link: "/roadmap",
        },
        ...s.notifications,
      ],
    }));
  },
  resetAllData: () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(KEY);
        localStorage.removeItem("theme-mode");
        localStorage.removeItem("pathfinder_auto_speak");
      } catch {
        /* ignore */
      }
    }
    setState(() => ({ ...initialState }));
  },
};

/** Career readiness: average of goal skills, nudged by activity. */
export function readiness(s: PathfinderState, goalSkills: string[]) {
  if (!goalSkills.length) return 0;
  const avg = goalSkills.reduce((a, n) => a + (s.skills[n] ?? 0), 0) / goalSkills.length;
  return clamp(avg);
}
