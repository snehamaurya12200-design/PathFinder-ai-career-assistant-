export type QuestStage =
  | "School student — Classes 8–9"
  | "Class 10"
  | "Class 11–12"
  | "Undergraduate student"
  | "Postgraduate student"
  | "Graduate / Fresh graduate"
  | "Working professional"
  | "Exploring a career change"
  | "Other / Still figuring it out";

export const QUEST_STAGES: QuestStage[] = [
  "School student — Classes 8–9",
  "Class 10",
  "Class 11–12",
  "Undergraduate student",
  "Postgraduate student",
  "Graduate / Fresh graduate",
  "Working professional",
  "Exploring a career change",
  "Other / Still figuring it out",
];

export type QuestContext = {
  stage: QuestStage;
  fieldOrSubject?: string;
  interests?: string;
  region?: string;
};

export type QuestOption = {
  id: string; // "A", "B", "C"...
  label: string;
  tagline?: string;
  weights: Record<string, number>; // Dimensions e.g. creative, analytical, technical, leadership...
};

export type QuestQuestion = {
  id: string; // "q1" .. "q15"
  roundId: number; // 1 to 5
  roundName: string;
  roundPurpose: string;
  questionNumber: number; // 1 to 15
  question: string;
  highlightWords?: string[]; // words to highlight with color boxes like in reference images
  subtext?: string;
  promptNote?: string;
  allowMultiple?: boolean;
  options: QuestOption[];
};

export type CareerDNAStrength = {
  name: string;
  category: "cognitive" | "execution" | "creative" | "interpersonal" | "strategic";
  score: number; // 0-100
  evidence: string;
  growthTip: string;
};

export type CareerDNAMatch = {
  id: string;
  title: string;
  domain: string;
  matchScore: number; // 0-100
  summary: string;
  whyMatched: string;
  dayInTheLife: string;
  keySkills: string[];
  growthOutlook: string;
  starterProject: string;
  recommendedCourseQuery?: string;
};

export type CareerDNA = {
  id: string;
  version: number;
  completedAt: string;
  context: {
    stage: string;
    fieldOrSubject?: string;
    interests?: string;
    region?: string;
  };
  archetype: {
    title: string;
    tagline: string;
    description: string;
    traits: string[];
  };
  dimensions: {
    analytical: number;
    creative: number;
    technical: number;
    leadership: number;
    empathy: number;
    autonomy: number;
    adaptability: number;
    socialImpact: number;
  };
  strengths: CareerDNAStrength[];
  careerMatches: CareerDNAMatch[];
  unexpectedMatch: {
    title: string;
    domain: string;
    reason: string;
    explorationHook: string;
  };
  actionableNextSteps: Array<{
    day: string;
    title: string;
    action: string;
  }>;
  whatWeStillDontKnow: string[];
  answersSummary: Record<string, string | string[]>;
};

export type CareerQuestProgress = {
  stage?: string;
  fieldOrSubject?: string;
  interests?: string;
  region?: string;
  currentStep: "context" | "intro" | "core" | "adaptive" | "report";
  currentQuestionIndex: number;
  coreAnswers: Record<string, string | string[]>;
  adaptiveQuestions?: Array<{
    id: string;
    question: string;
    reason: string;
    dimension: string;
    options: Array<{ id: string; text: string }>;
  }>;
  adaptiveAnswers?: Record<string, string>;
  updatedAt: string;
};

export type QuestRoundInfo = {
  number: number;
  id: string;
  title: string;
  subtitle: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  boxColor: string;
};

export const QUEST_ROUNDS: QuestRoundInfo[] = [
  {
    number: 1,
    id: "the-thinker",
    title: "THE THINKER",
    subtitle: "Understand how you approach problems, curiosity, and original ideas.",
    accentBg: "bg-lilac/30",
    accentBorder: "border-violet/40",
    accentText: "text-violet",
    boxColor: "bg-lilac/70 text-violet border-violet/30",
  },
  {
    number: 2,
    id: "the-explorer",
    title: "THE EXPLORER",
    subtitle: "Discover your genuine interests and curiosity across diverse fields.",
    accentBg: "bg-mint/30",
    accentBorder: "border-success/40",
    accentText: "text-success",
    boxColor: "bg-mint/70 text-primary-foreground border-mint",
  },
  {
    number: 3,
    id: "the-decision-maker",
    title: "THE DECISION MAKER",
    subtitle: "Understand your decision-making instincts and teamwork preferences.",
    accentBg: "bg-butter/50",
    accentBorder: "border-sun/40",
    accentText: "text-ink",
    boxColor: "bg-butter text-ink border-sun/50",
  },
  {
    number: 4,
    id: "the-hidden-talent",
    title: "THE HIDDEN TALENT",
    subtitle: "Uncover natural abilities and superpowers beyond exam marks or titles.",
    accentBg: "bg-blush/40",
    accentBorder: "border-orange/40",
    accentText: "text-orange",
    boxColor: "bg-blush text-orange border-orange/30",
  },
  {
    number: 5,
    id: "the-future-self",
    title: "THE FUTURE SELF",
    subtitle: "Map your core motivations, ambition, and ideal working environment.",
    accentBg: "bg-sun/30",
    accentBorder: "border-sun",
    accentText: "text-ink",
    boxColor: "bg-sun/60 text-ink border-sun",
  },
];

export const CORE_QUESTIONS: QuestQuestion[] = [
  /* ------------------- ROUND 1: THE THINKER ------------------- */
  {
    id: "q1",
    roundId: 1,
    roundName: "THE THINKER",
    roundPurpose: "Understand how you approach problems and ideas.",
    questionNumber: 1,
    question:
      "Imagine you have ₹10,000 and an opportunity to create something interesting. What excites you most?",
    highlightWords: ["₹10,000", "What excites you"],
    subtext: "Not what you think you should do — what genuinely sounds fun?",
    promptNote: "→ Unlocks your foundational creation instinct",
    allowMultiple: false,
    options: [
      {
        id: "A",
        label: "Build an application or software tool that solves a real everyday problem.",
        weights: { technical: 3, problemSolving: 3, analytical: 2 },
      },
      {
        id: "B",
        label: "Create a brand, visual experience, film, or artistic creative project.",
        weights: { creative: 4, design: 3, storytelling: 2 },
      },
      {
        id: "C",
        label: "Start a small business or prototype and see if people actually buy your idea.",
        weights: { entrepreneurship: 4, leadership: 2, business: 3 },
      },
      {
        id: "D",
        label: "Research an intriguing scientific topic and experiment with new possibilities.",
        weights: { research: 4, analytical: 3, scientific: 3 },
      },
      {
        id: "E",
        label:
          "Organize a community event, club, or movement bringing people together around an idea.",
        weights: { leadership: 3, communication: 3, empathy: 3 },
      },
    ],
  },
  {
    id: "q2",
    roundId: 1,
    roundName: "THE THINKER",
    roundPurpose: "Understand your intuition when facing the unknown.",
    questionNumber: 2,
    question:
      "You're given a completely unfamiliar, ambiguous problem. What is your first instinct?",
    highlightWords: ["unfamiliar problem", "first instinct"],
    subtext: "There is no wrong way to tackle uncertainty.",
    promptNote: "→ Reveals your cognitive troubleshooting methodology",
    allowMultiple: false,
    options: [
      {
        id: "A",
        label: "Break it down systematically into smaller, manageable chunks.",
        weights: { analytical: 4, problemSolving: 3, organization: 2 },
      },
      {
        id: "B",
        label: "Look for inspiration, unconventional analogies, and alternative approaches.",
        weights: { creative: 4, adaptability: 3 },
      },
      {
        id: "C",
        label: "Understand who is affected, listen to their stories, and map what they need.",
        weights: { empathy: 4, communication: 3, research: 2 },
      },
      {
        id: "D",
        label: "Dive right in and experiment hands-on until something clicks.",
        weights: { technical: 2, adaptability: 3, problemSolving: 3 },
      },
      {
        id: "E",
        label: "Discuss it openly with others to gather diverse viewpoints and perspectives.",
        weights: { communication: 4, leadership: 2, empathy: 2 },
      },
    ],
  },
  {
    id: "q3",
    roundId: 1,
    roundName: "THE THINKER",
    roundPurpose: "Discover what generates genuine flow states for you.",
    questionNumber: 3,
    question:
      "Which of these activities could keep you deeply occupied for hours without losing focus?",
    highlightWords: ["occupied for hours", "without losing focus"],
    subtext: "Think about times you completely forgot to check your phone.",
    promptNote: "→ Measures your sustained engagement drive",
    allowMultiple: false,
    options: [
      {
        id: "A",
        label: "Solving a complicated puzzle, logic problem, or code bug.",
        weights: { analytical: 4, problemSolving: 4 },
      },
      {
        id: "B",
        label: "Creating something from scratch (art, writing, music, video, or design).",
        weights: { creative: 4, design: 3 },
      },
      {
        id: "C",
        label: "Understanding how people behave, psychology, and interpersonal dynamics.",
        weights: { empathy: 4, research: 3, psychology: 3 },
      },
      {
        id: "D",
        label: "Exploring emerging technologies, futuristic gadgets, and novel discoveries.",
        weights: { technical: 3, curiosity: 4, research: 2 },
      },
      {
        id: "E",
        label: "Planning, organizing, and coordinating an ambitious project or itinerary.",
        weights: { organization: 4, leadership: 3 },
      },
    ],
  },

  /* ------------------- ROUND 2: THE EXPLORER ------------------- */
  {
    id: "q4",
    roundId: 2,
    roundName: "THE EXPLORER",
    roundPurpose: "Map your curiosity and reading habits across fields.",
    questionNumber: 4,
    question: "Which of these areas would you voluntarily explore in your free time?",
    highlightWords: ["voluntarily explore", "free time"],
    subtext: "Select all that spark genuine curiosity for you.",
    promptNote: "→ Multi-select enabled: Pick 1 to 5 fields that attract you",
    allowMultiple: true,
    options: [
      {
        id: "A",
        label: "AI, robotics, and emerging technology.",
        weights: { technical: 3, ai: 3, curiosity: 2 },
      },
      {
        id: "B",
        label: "Human behaviour, psychology, and societal change.",
        weights: { empathy: 3, psychology: 3, humanities: 2 },
      },
      {
        id: "C",
        label: "Art, graphic design, architecture, and visual storytelling.",
        weights: { creative: 3, design: 3 },
      },
      {
        id: "D",
        label: "Business, startups, entrepreneurship, and marketing.",
        weights: { business: 3, entrepreneurship: 3, leadership: 2 },
      },
      {
        id: "E",
        label: "Science, medicine, healthcare, and biotechnology.",
        weights: { scientific: 3, medical: 3, research: 2 },
      },
      {
        id: "F",
        label: "Environment, biodiversity, ecology, and sustainability.",
        weights: { scientific: 2, sustainability: 3, empathy: 2 },
      },
      {
        id: "G",
        label: "Finance, stock markets, economics, and investments.",
        weights: { finance: 3, analytical: 3, business: 2 },
      },
      {
        id: "H",
        label: "Law, civil services, public policy, and constitutional rights.",
        weights: { law: 3, policy: 3, communication: 2 },
      },
      {
        id: "I",
        label: "Education, pedagogy, mentorship, and cognitive growth.",
        weights: { communication: 3, empathy: 3, education: 3 },
      },
      {
        id: "J",
        label: "Media, investigative journalism, broadcasting, and content.",
        weights: { communication: 3, creative: 2, storytelling: 3 },
      },
    ],
  },
  {
    id: "q5",
    roundId: 2,
    roundName: "THE EXPLORER",
    roundPurpose: "Identify your intrinsic love of learning without external pressure.",
    questionNumber: 5,
    question:
      "If you could spend one whole month learning something without worrying about exams or marks, what would you choose?",
    highlightWords: ["one whole month", "without worrying about marks"],
    subtext: "Imagine zero grades, zero judgment — just pure immersion.",
    promptNote: "→ Uncovers your highest-affinity passion domain",
    allowMultiple: false,
    options: [
      {
        id: "A",
        label: "Building an AI-powered software application or robotic prototype.",
        weights: { technical: 4, problemSolving: 3, ai: 3 },
      },
      {
        id: "B",
        label: "Understanding cognitive neuroscience and how human minds make choices.",
        weights: { empathy: 3, research: 4, psychology: 4 },
      },
      {
        id: "C",
        label: "Designing an immersive physical product, fashion line, or digital game.",
        weights: { creative: 4, design: 4 },
      },
      {
        id: "D",
        label: "Learning how high-growth businesses scale and launch products.",
        weights: { business: 4, leadership: 3, entrepreneurship: 3 },
      },
      {
        id: "E",
        label: "Exploring astronomical discoveries, genetics, or quantum physics.",
        weights: { scientific: 4, research: 4 },
      },
      {
        id: "F",
        label: "Creating short films, writing a novel, or producing investigative podcasts.",
        weights: { storytelling: 4, creative: 3, communication: 3 },
      },
      {
        id: "G",
        label: "Understanding how democratic constitutions, judiciary, and global treaties work.",
        weights: { law: 4, policy: 3, analytical: 3 },
      },
      {
        id: "H",
        label: "Something completely different that I haven't seen listed here yet.",
        weights: { curiosity: 3, adaptability: 3 },
      },
    ],
  },
  {
    id: "q6",
    roundId: 2,
    roundName: "THE EXPLORER",
    roundPurpose: "Clarify the nature of impact that feels most meaningful.",
    questionNumber: 6,
    question: "What kind of real-world challenges give you the strongest sense of purpose?",
    highlightWords: ["real-world challenges", "strongest purpose"],
    subtext: "What makes you say: 'I want to fix that'?",
    promptNote: "→ Categorizes your mission alignment",
    allowMultiple: false,
    options: [
      {
        id: "A",
        label: "Technical & algorithmic problems (systems, automation, software bugs).",
        weights: { technical: 4, problemSolving: 3 },
      },
      {
        id: "B",
        label: "Human & social problems (inequality, mental health, education access).",
        weights: { empathy: 4, communication: 3, policy: 2 },
      },
      {
        id: "C",
        label: "Creative & communication problems (boring designs, ineffective messaging).",
        weights: { creative: 4, communication: 3, design: 2 },
      },
      {
        id: "D",
        label: "Business & economic problems (market inefficiencies, financial gaps).",
        weights: { business: 4, finance: 3, analytical: 2 },
      },
      {
        id: "E",
        label: "Scientific & environmental problems (clean energy, conservation, climate).",
        weights: { scientific: 4, sustainability: 4 },
      },
      {
        id: "F",
        label: "Health & well-being challenges (curing diseases, improving patient care).",
        weights: { medical: 4, scientific: 3, empathy: 3 },
      },
      {
        id: "G",
        label: "I'm not sure yet — I want to explore different challenges first.",
        weights: { adaptability: 3, curiosity: 3 },
      },
    ],
  },

  /* ------------------- ROUND 3: THE DECISION MAKER ------------------- */
  {
    id: "q7",
    roundId: 3,
    roundName: "THE DECISION MAKER",
    roundPurpose: "Examine high-pressure teamwork instincts.",
    questionNumber: 7,
    question:
      "Your team has only 24 hours left before a major submission, and things are going off-track. What do you do?",
    highlightWords: ["24 hours left", "What do you do?"],
    subtext: "How do you navigate crunch time when stakes are high?",
    promptNote: "→ Identifies your crisis response role",
    allowMultiple: false,
    options: [
      {
        id: "A",
        label:
          "Pinpoint the single biggest bottleneck and personally roll up my sleeves to fix it.",
        weights: { problemSolving: 4, technical: 2 },
      },
      {
        id: "B",
        label: "Pivot creatively and pitch a bold, simplified approach that still wows everyone.",
        weights: { creative: 4, adaptability: 3 },
      },
      {
        id: "C",
        label: "Reorganize the tasks, clarify ownership, and make sure everyone knows their part.",
        weights: { leadership: 4, organization: 4 },
      },
      {
        id: "D",
        label:
          "Find a clever shortcut or smart automated tool to get the work done in half the time.",
        weights: { problemSolving: 3, technical: 3, adaptability: 3 },
      },
      {
        id: "E",
        label: "Check in with the stressed teammates, boost morale, and reset clear communication.",
        weights: { empathy: 4, communication: 4 },
      },
    ],
  },
  {
    id: "q8",
    roundId: 3,
    roundName: "THE DECISION MAKER",
    roundPurpose: "Measure your appetite for novelty versus certainty.",
    questionNumber: 8,
    question:
      "You have two paths in front of you: one proven and familiar, one completely uncharted. What tilts your choice?",
    highlightWords: ["familiar", "uncharted", "tilts your choice"],
    subtext: "Are you drawn to discovery, stability, or maximum impact?",
    promptNote: "→ Maps risk orientation and growth drivers",
    allowMultiple: false,
    options: [
      {
        id: "A",
        label: "The excitement of learning completely new skills and exploring uncharted ground.",
        weights: { curiosity: 4, adaptability: 4 },
      },
      {
        id: "B",
        label: "Stability, clear expectations, and predictable success.",
        weights: { organization: 4, analytical: 2 },
      },
      {
        id: "C",
        label: "Which path can make the biggest visible impact on the community.",
        weights: { leadership: 3, empathy: 3 },
      },
      {
        id: "D",
        label: "Sheer personal passion and what gives me butterflies of excitement.",
        weights: { creative: 3, curiosity: 3 },
      },
      {
        id: "E",
        label: "Long-term compounding career growth and strategic opportunities.",
        weights: { business: 3, analytical: 3, leadership: 2 },
      },
    ],
  },
  {
    id: "q9",
    roundId: 3,
    roundName: "THE DECISION MAKER",
    roundPurpose: "Understand your ultimate decision filter.",
    questionNumber: 9,
    question: "When making a crucial decision that will impact your future, what anchors you most?",
    highlightWords: ["crucial decision", "what anchors you"],
    subtext: "When all advice is conflicting, what is your compass?",
    promptNote: "→ Uncovers your core evaluation metric",
    allowMultiple: false,
    options: [
      {
        id: "A",
        label: "Concrete facts, verified data, and demonstrable evidence.",
        weights: { analytical: 4, research: 3 },
      },
      {
        id: "B",
        label: "Creative potential, imagination, and what could be possible.",
        weights: { creative: 4, design: 2 },
      },
      {
        id: "C",
        label: "How it impacts the people I care about and ethical harmony.",
        weights: { empathy: 4, communication: 3 },
      },
      {
        id: "D",
        label: "Practical, tangible results and speed of execution.",
        weights: { problemSolving: 3, business: 3, organization: 2 },
      },
      {
        id: "E",
        label: "A big-picture strategic vision 5 to 10 years down the line.",
        weights: { leadership: 4, business: 2, analytical: 2 },
      },
    ],
  },

  /* ------------------- ROUND 4: THE HIDDEN TALENT ------------------- */
  {
    id: "q10",
    roundId: 4,
    roundName: "THE HIDDEN TALENT",
    roundPurpose: "Identify your spontaneous peer reputation.",
    questionNumber: 10,
    question: "What do friends, classmates, or colleagues naturally come to you for?",
    highlightWords: ["naturally come to you", "hidden talent"],
    subtext: "What comes so naturally to you that you might take it for granted?",
    promptNote: "→ Highlights peer-validated strengths",
    allowMultiple: false,
    options: [
      {
        id: "A",
        label: "Help solving tricky, frustrating problems that got them stuck.",
        weights: { problemSolving: 4, analytical: 3 },
      },
      {
        id: "B",
        label: "Fresh, imaginative ideas, creative concepts, and design feedback.",
        weights: { creative: 4, design: 3 },
      },
      {
        id: "C",
        label: "A patient listening ear, thoughtful advice, and emotional empathy.",
        weights: { empathy: 4, communication: 3 },
      },
      {
        id: "D",
        label: "Taking charge, structuring the chaos, and making things actually happen.",
        weights: { leadership: 4, organization: 4 },
      },
      {
        id: "E",
        label: "Breaking down complex, confusing concepts into crystal-clear explanations.",
        weights: { communication: 4, analytical: 3, education: 3 },
      },
      {
        id: "F",
        label: "Technical troubleshooting, setting up tools, or code debugging.",
        weights: { technical: 4, problemSolving: 2 },
      },
      {
        id: "G",
        label: "I'm still figuring that out — I have diverse budding interests.",
        weights: { curiosity: 3, adaptability: 3 },
      },
    ],
  },
  {
    id: "q11",
    roundId: 4,
    roundName: "THE HIDDEN TALENT",
    roundPurpose: "Observe your organic startup impulse.",
    questionNumber: 11,
    question:
      "Imagine a close friend wants to start an ambitious new project but has no idea where to begin. What do you naturally do?",
    highlightWords: ["ambitious new project", "naturally do"],
    subtext: "How do you help turn a blank canvas into motion?",
    promptNote: "→ Measures initiation and collaboration instincts",
    allowMultiple: false,
    options: [
      {
        id: "A",
        label: "Sit down with them and outline a step-by-step roadmap with clear milestones.",
        weights: { organization: 4, leadership: 3 },
      },
      {
        id: "B",
        label: "Brainstorm wild, provocative ideas to help find their unique hook.",
        weights: { creative: 4, design: 2 },
      },
      {
        id: "C",
        label: "Deep-dive into research to find what exists, competitor gaps, and best practices.",
        weights: { research: 4, analytical: 3 },
      },
      {
        id: "D",
        label: "Help them interview potential users or audience members to find the real need.",
        weights: { empathy: 4, communication: 3, research: 2 },
      },
      {
        id: "E",
        label: "Help them start building the actual prototype or technical skeleton immediately.",
        weights: { technical: 4, problemSolving: 3 },
      },
      {
        id: "F",
        label: "Connect them with other talented people who have the exact skills they need.",
        weights: { leadership: 3, communication: 4, networking: 4 },
      },
    ],
  },
  {
    id: "q12",
    roundId: 4,
    roundName: "THE HIDDEN TALENT",
    roundPurpose: "Identify the praise that resonates deepest with your self-concept.",
    questionNumber: 12,
    question: "Which of these compliments would feel most deeply satisfying to hear?",
    highlightWords: ["most deeply satisfying", "compliment"],
    subtext: "Which one touches the core of who you strive to be?",
    promptNote: "→ Unlocks your identity aspiration",
    allowMultiple: false,
    options: [
      {
        id: "A",
        label: "'You have an incredibly original, creative mind.'",
        weights: { creative: 4, design: 3 },
      },
      {
        id: "B",
        label: "'You have a rare ability to understand complex, intricate things easily.'",
        weights: { analytical: 4, research: 3 },
      },
      {
        id: "C",
        label: "'You truly understand people and make everyone feel valued.'",
        weights: { empathy: 4, communication: 4 },
      },
      {
        id: "D",
        label: "'You are someone who knows how to make big things happen against all odds.'",
        weights: { leadership: 4, business: 3, organization: 2 },
      },
      {
        id: "E",
        label: "'No matter how tough the situation is, you always find a working solution.'",
        weights: { problemSolving: 4, adaptability: 3 },
      },
      {
        id: "F",
        label: "'You notice subtle, vital details and patterns that everyone else misses.'",
        weights: { analytical: 3, research: 3, creative: 2 },
      },
    ],
  },

  /* ------------------- ROUND 5: THE FUTURE SELF ------------------- */
  {
    id: "q13",
    roundId: 5,
    roundName: "THE FUTURE SELF",
    roundPurpose: "Discover your preferred workspace culture and environment.",
    questionNumber: 13,
    question: "Which working environment sounds most energizing for your future day-to-day?",
    highlightWords: ["most energizing", "working environment"],
    subtext: "Where do you picture yourself doing your best, happiest work?",
    promptNote: "→ Maps workspace culture compatibility",
    allowMultiple: false,
    options: [
      {
        id: "A",
        label: "Fast-moving, high-energy startup with flat hierarchy and big autonomy.",
        weights: { entrepreneurship: 4, adaptability: 4, technical: 2 },
      },
      {
        id: "B",
        label: "Curious research laboratory, think-tank, or intellectual university center.",
        weights: { scientific: 4, research: 4, analytical: 3 },
      },
      {
        id: "C",
        label: "Dynamic creative studio, design agency, or media production room.",
        weights: { creative: 4, design: 4, storytelling: 3 },
      },
      {
        id: "D",
        label: "Respected, structured organization with global teams and clear career ladders.",
        weights: { organization: 4, business: 3, leadership: 2 },
      },
      {
        id: "E",
        label: "Running my own independent business, practice, or venture as a founder.",
        weights: { entrepreneurship: 5, leadership: 4, business: 3 },
      },
      {
        id: "F",
        label: "Hospital, clinical care facility, or public health humanitarian organization.",
        weights: { medical: 4, empathy: 4, scientific: 2 },
      },
      {
        id: "G",
        label: "Flexible, location-independent lifestyle where I work independently on my terms.",
        weights: { autonomy: 5, adaptability: 3, creative: 2 },
      },
      {
        id: "H",
        label: "I'm still exploring what kind of environment suits me best.",
        weights: { curiosity: 3, adaptability: 3 },
      },
    ],
  },
  {
    id: "q14",
    roundId: 5,
    roundName: "THE FUTURE SELF",
    roundPurpose: "Pinpoint your primary underlying motivation.",
    questionNumber: 14,
    question: "What ultimately motivates you more than anything else?",
    highlightWords: ["ultimately motivates you", "core driver"],
    subtext: "What fuels your stamina when projects get hard?",
    promptNote: "→ Identifies your core motivational driver",
    allowMultiple: false,
    options: [
      {
        id: "A",
        label: "Creating something genuinely meaningful and beautiful from nothing.",
        weights: { creative: 4, craftsmanship: 3 },
      },
      {
        id: "B",
        label: "Financial independence, wealth creation, and tangible lifestyle growth.",
        weights: { business: 4, finance: 3, achievement: 3 },
      },
      {
        id: "C",
        label: "Directly helping people, easing suffering, and bettering society.",
        weights: { empathy: 5, policy: 3, socialImpact: 4 },
      },
      {
        id: "D",
        label: "Continuously learning, acquiring deep mastery, and understanding truth.",
        weights: { research: 4, scientific: 3, curiosity: 4 },
      },
      {
        id: "E",
        label: "Earning respect, public recognition, and standing as a leader in my craft.",
        weights: { leadership: 4, achievement: 4 },
      },
      {
        id: "F",
        label: "Complete freedom, flexibility, and sovereignty over my time.",
        weights: { autonomy: 5, adaptability: 3 },
      },
    ],
  },
  {
    id: "q15",
    roundId: 5,
    roundName: "THE FUTURE SELF",
    roundPurpose: "Envision your 5-year pride milestone.",
    questionNumber: 15,
    question:
      "Imagine yourself five years from today. Which accomplishment would make you feel most deeply proud?",
    highlightWords: ["five years from today", "deeply proud"],
    subtext: "Close your eyes: which milestone gives you goosebumps?",
    promptNote: "→ Establishes your North Star ambition",
    allowMultiple: false,
    options: [
      {
        id: "A",
        label: "Having built a successful, thriving product, venture, or company.",
        weights: { entrepreneurship: 4, business: 4, leadership: 3 },
      },
      {
        id: "B",
        label: "Becoming an authoritative, deeply respected specialist in my chosen discipline.",
        weights: { research: 4, technical: 3, mastery: 4 },
      },
      {
        id: "C",
        label: "Knowing my work made a transformative difference in people's real lives.",
        weights: { empathy: 5, socialImpact: 4, communication: 3 },
      },
      {
        id: "D",
        label: "Having created innovative creative works that touched or inspired thousands.",
        weights: { creative: 4, design: 3, storytelling: 3 },
      },
      {
        id: "E",
        label: "Leading, mentoring, and empowering a high-performing team of people.",
        weights: { leadership: 5, communication: 3, organization: 3 },
      },
      {
        id: "F",
        label: "Enjoying the freedom and flexibility to choose my projects and lifestyle.",
        weights: { autonomy: 5, adaptability: 4 },
      },
    ],
  },
];

/* ------------------- Fallback Adaptive Questions ------------------- */
export const FALLBACK_ADAPTIVE_QUESTIONS = [
  {
    id: "followup_01",
    question:
      "When working with technology and ideas, where does your curiosity naturally gravitate?",
    reason:
      "Disentangling whether you prefer building technical engines, crafting user interfaces, or analyzing data.",
    dimension: "tech_orientation",
    allowMultiple: false,
    options: [
      { id: "a", text: "Building the underlying logic, architecture, and code." },
      { id: "b", text: "Designing how it looks, feels, and how users interact with it." },
      { id: "c", text: "Analyzing the data and numbers to uncover insights and trends." },
      { id: "d", text: "Leading the product roadmap and turning it into a business." },
      { id: "e", text: "I'm not sure yet — I want to explore multiple facets." },
    ],
  },
  {
    id: "followup_02",
    question: "If your work directly involves people, which role sounds most natural to you?",
    reason:
      "Clarifying personal dynamic preference between advising, leading, creating, or researching.",
    dimension: "people_dynamic",
    allowMultiple: false,
    options: [
      { id: "a", text: "Deep 1-on-1 counseling, mentoring, or patient care." },
      { id: "b", text: "Inspiring and coordinating a team towards a shared goal." },
      { id: "c", text: "Communicating ideas through compelling media, writing, or speech." },
      { id: "d", text: "Conducting user research to understand behavior objectively." },
      { id: "e", text: "I prefer working mostly independently on heads-down challenges." },
    ],
  },
  {
    id: "followup_03",
    question:
      "When thinking about learning new skills over the next year, what format attracts you most?",
    reason: "Understanding practical execution style to recommend tailored starter projects.",
    dimension: "learning_modality",
    allowMultiple: false,
    options: [
      { id: "a", text: "Building real, functional mini-projects and shipping them." },
      { id: "b", text: "Reading deep books, foundational theories, and research papers." },
      { id: "c", text: "Taking structured, guided courses with certifications." },
      { id: "d", text: "Learning by shadow-interning or collaborating directly with mentors." },
      { id: "e", text: "I'm still figuring out my best learning style." },
    ],
  },
];

export function generateFallbackCareerDNA(
  context: QuestContext,
  coreAnswers: Record<string, string | string[]>,
  adaptiveAnswers: Record<string, string> = {},
  version = 1,
): CareerDNA {
  // 1. Calculate weights across dimensions
  const dims: Record<string, number> = {
    analytical: 10,
    creative: 10,
    technical: 10,
    leadership: 10,
    empathy: 10,
    autonomy: 10,
    adaptability: 10,
    socialImpact: 10,
  };

  for (const q of CORE_QUESTIONS) {
    const rawAns = coreAnswers[q.id];
    if (!rawAns) continue;
    const selectedIds = Array.isArray(rawAns) ? rawAns : [rawAns];
    for (const optId of selectedIds) {
      const opt = q.options.find((o) => o.id === optId);
      if (opt && opt.weights) {
        for (const [k, v] of Object.entries(opt.weights)) {
          dims[k] = (dims[k] ?? 0) + (v ?? 0) * 8;
        }
      }
    }
  }

  // Factor adaptive answers
  if (adaptiveAnswers["followup_01"] === "a") dims.technical += 15;
  if (adaptiveAnswers["followup_01"] === "b") dims.creative += 15;
  if (adaptiveAnswers["followup_01"] === "c") dims.analytical += 15;
  if (adaptiveAnswers["followup_01"] === "d") dims.leadership += 15;

  if (adaptiveAnswers["followup_02"] === "a") dims.empathy += 15;
  if (adaptiveAnswers["followup_02"] === "b") dims.leadership += 15;
  if (adaptiveAnswers["followup_02"] === "c") dims.creative += 10;
  if (adaptiveAnswers["followup_02"] === "e") dims.autonomy += 15;

  // Normalize scores to 0-100 range
  const normalizedDims = {
    analytical: Math.min(98, Math.max(25, Math.round(dims.analytical ?? 50))),
    creative: Math.min(98, Math.max(25, Math.round(dims.creative ?? 50))),
    technical: Math.min(98, Math.max(25, Math.round(dims.technical ?? 50))),
    leadership: Math.min(98, Math.max(25, Math.round(dims.leadership ?? 50))),
    empathy: Math.min(98, Math.max(25, Math.round(dims.empathy ?? 50))),
    autonomy: Math.min(98, Math.max(25, Math.round(dims.autonomy ?? 50))),
    adaptability: Math.min(98, Math.max(25, Math.round(dims.adaptability ?? 50))),
    socialImpact: Math.min(98, Math.max(25, Math.round(dims.socialImpact ?? 50))),
  };

  // Determine top Archetype
  let archetypeTitle = "The Visionary Systems Architect";
  let tagline = "Architecting clean structures and turning abstract ideas into tangible reality";
  let description =
    "You possess a rare balance of deep technical intuition and architectural curiosity. Rather than settling for surface-level fixes, you gravitate naturally towards the root mechanisms of how things work — whether that is software systems, product design, or complex organizations. You thrive when given sovereignty over your craft, and you have an instinct for clarity amid ambiguity.";
  let traits = ["Systems Thinking", "Creative Problem Solver", "High Autonomy", "Insight Driven"];

  if (normalizedDims.creative >= 75 && normalizedDims.creative > normalizedDims.technical) {
    archetypeTitle = "The Creative Product Alchemist";
    tagline = "Fusing human empathy, visual elegance, and innovative storytelling";
    description =
      "Your standout strength is bridging imagination and human experience. You notice aesthetic subtleties and emotional friction points that others overlook. You thrive when shaping experiences, whether through design, narrative, or user-centric technology.";
    traits = [
      "Intuitive Aesthetic",
      "Empathic Designer",
      "Narrative Builder",
      "Iterative Explorer",
    ];
  } else if (
    normalizedDims.leadership >= 70 &&
    normalizedDims.leadership > normalizedDims.analytical
  ) {
    archetypeTitle = "The Strategic Catalyst & Builder";
    tagline = "Aligning people, vision, and execution to build what's next";
    description =
      "You operate naturally as an orchestrator and strategic connector. You have a knack for sizing up big-picture goals, rallying collaborative energy, and unblocking team obstacles with calm poise and pragmatic focus.";
    traits = ["Strategic Vision", "Team Empowerment", "Decisive Clarity", "Outcome Focused"];
  } else if (normalizedDims.empathy >= 75) {
    archetypeTitle = "The Human-Centered Strategist";
    tagline = "Transforming insights into positive real-world human impact";
    description =
      "Your guiding compass is genuine human well-being and purposeful contribution. You combine thoughtful listening with systematic follow-through, ensuring solutions serve real people with dignity and impact.";
    traits = ["Deep Empathy", "Ethical Compass", "Collaborative Trust", "Impact Seeker"];
  } else if (normalizedDims.analytical >= 75) {
    archetypeTitle = "The Quantitative Explorer & Strategist";
    tagline = "Uncovering hidden signals from data and building predictive clarity";
    description =
      "You are driven by truth, evidence, and rigorous thinking. Where others see messy noise, you see patterns waiting to be decoded. You make decisions grounded in empirical reality while maintaining a sharp eye on strategic upside.";
    traits = ["Rigorous Analysis", "Pattern Recognition", "Objective Truth", "Hypothesis Driven"];
  }

  // 10 Detailed Strengths
  const strengths: CareerDNAStrength[] = [
    {
      name: "First-Principles Thinking",
      category: "cognitive",
      score: normalizedDims.analytical,
      evidence:
        "Your answers in Round 1 highlighted a preference for deconstructing how systems tick rather than accepting surface dogma.",
      growthTip:
        "Keep writing down your mental models; translating complex intuition into concise diagrams sharpens your leadership.",
    },
    {
      name: "Iterative Prototyping",
      category: "execution",
      score: Math.min(95, normalizedDims.technical + 5),
      evidence:
        "You favored tangible trial-and-error over endless hypothetical debate when facing new challenges.",
      growthTip:
        "Pair rapid prototyping with user feedback loops within 48 hours of initial brainstorming.",
    },
    {
      name: "Adaptive Sense-Making",
      category: "strategic",
      score: normalizedDims.adaptability,
      evidence:
        "When plans shift, you instinctively look for the emerging opportunity rather than resisting the pivot.",
      growthTip:
        "Document 'lessons learned' after pivots so your adaptability becomes institutional wisdom.",
    },
    {
      name: "Creative Synthesis",
      category: "creative",
      score: normalizedDims.creative,
      evidence:
        "You consistently linked ideas across seemingly unrelated fields like design, code, and user psychology.",
      growthTip:
        "Build a 'swipe file' of cross-industry inspirations to spark novel solutions in your primary field.",
    },
    {
      name: "Empathetic Observation",
      category: "interpersonal",
      score: normalizedDims.empathy,
      evidence:
        "In decision scenarios, you weighed human morale and user friction alongside bottom-line efficiency.",
      growthTip:
        "Practice user research interviews to turn intuitive empathy into structured product requirements.",
    },
    {
      name: "Independent Ownership",
      category: "execution",
      score: normalizedDims.autonomy,
      evidence:
        "You thrive most with clear outcomes and minimal micromanagement, taking full responsibility for quality.",
      growthTip:
        "Overcommunicate milestone status proactively so stakeholders feel complete confidence leaving you autonomous.",
    },
    {
      name: "Clarity in Communication",
      category: "interpersonal",
      score: Math.min(92, Math.round((normalizedDims.leadership + normalizedDims.creative) / 2)),
      evidence:
        "Your preferred communication scenarios favored crisp, visual, and narrative explanations.",
      growthTip:
        "Practice elevator pitches for complex technical concepts to non-technical stakeholders.",
    },
    {
      name: "Calm Under Ambiguity",
      category: "strategic",
      score: normalizedDims.adaptability,
      evidence:
        "You handle undefined project boundaries by establishing initial anchor hypotheses and moving steadily.",
      growthTip:
        "Define 'definition of done' criteria upfront to guard against scope creep in ambiguous spaces.",
    },
    {
      name: "Craftsmanship & Detail Orientation",
      category: "execution",
      score: Math.min(96, normalizedDims.technical),
      evidence:
        "You care about how polish, ergonomics, and clean structure elevate ordinary work to excellence.",
      growthTip:
        "Balance high standards with time-boxing so perfectionism never bottlenecks release momentum.",
    },
    {
      name: "Purpose & Mission Alignment",
      category: "strategic",
      score: normalizedDims.socialImpact,
      evidence:
        "In Round 5, your envisioned legacy prioritized meaningful transformation over purely vanity metrics.",
      growthTip:
        "Evaluate every project against whether it builds genuine utility or lasting human value.",
    },
  ];

  // Top 5 Career Matches
  const careerMatches: CareerDNAMatch[] = [
    {
      id: "match-1",
      title:
        normalizedDims.technical >= 70
          ? "Full-Stack Software Engineer & Systems Architect"
          : "Product Designer & UX Strategist",
      domain: normalizedDims.technical >= 70 ? "Engineering & Tech" : "Design & Product",
      matchScore: 96,
      summary:
        "Build end-to-end user experiences powered by solid underlying logic and robust architecture.",
      whyMatched:
        "Your blend of high technical/creative curiosity and strong autonomy makes you exceptional at taking complete ownership of solutions from concept to deployment.",
      dayInTheLife:
        "Collaborating with cross-functional peers in morning syncs, designing modular components, writing clean code/prototypes, and analyzing user metrics in the afternoon.",
      keySkills: [
        "System Architecture",
        "Modern TypeScript / React",
        "UI/UX Design Systems",
        "API Engineering",
        "Problem Diagnostics",
      ],
      growthOutlook:
        "Exceptional demand globally (+28% projected 5-year growth). High remote flexibility and strong compensation trajectory.",
      starterProject:
        "Build an open-source productivity dashboard with real-time state synchronization and accessible keyboard navigation.",
      recommendedCourseQuery: "Full Stack Development",
    },
    {
      id: "match-2",
      title: "AI Product Manager & Solutions Engineer",
      domain: "Product & Strategy",
      matchScore: 91,
      summary:
        "Translate bleeding-edge generative AI capabilities into practical, delightful products that solve real human friction.",
      whyMatched:
        "Matches your strong balance of strategic thinking, analytical rigor, and curiosity about emerging technologies.",
      dayInTheLife:
        "Interviewing users, defining product specifications, testing LLM prompt chains and latency, and prioritizing roadmap milestones with engineering teams.",
      keySkills: [
        "Product Strategy",
        "LLM Integration & Prompting",
        "User Research",
        "Metrics & KPIs",
        "Agile Execution",
      ],
      growthOutlook:
        "Fastest-growing discipline worldwide (+35% YoY expansion as businesses adopt frontier AI).",
      starterProject:
        "Create a functional prototype of a voice-driven assistant that helps college students prepare for technical interviews.",
      recommendedCourseQuery: "AI & Machine Learning",
    },
    {
      id: "match-3",
      title: "Interactive UX / Creative Technologist",
      domain: "Design & Technology",
      matchScore: 87,
      summary:
        "Bridge visual design, motion aesthetics, and engineering to craft immersive, memorable digital experiences.",
      whyMatched:
        "Directly rewards your creative eye, spatial thinking, and joy in building things that look and feel premium.",
      dayInTheLife:
        "Prototyping fluid micro-animations in Figma and code, crafting interactive visual canvas systems, and refining typography hierarchy.",
      keySkills: [
        "Design Systems",
        "Figma",
        "Tailwind CSS",
        "Motion Graphics",
        "Accessibility (a11y)",
      ],
      growthOutlook:
        "High demand across innovative tech startups, design studios, and product companies seeking brand differentiation.",
      starterProject:
        "Design and code a showcase portfolio featuring smooth scroll triggers, dark mode transitions, and interactive 3D cards.",
      recommendedCourseQuery: "UI/UX Design",
    },
    {
      id: "match-4",
      title: "Data Intelligence & Machine Learning Specialist",
      domain: "Data & Analytics",
      matchScore: 84,
      summary:
        "Decode complex data lakes to uncover non-obvious behavioral patterns and power automated decision engines.",
      whyMatched:
        "Leverages your high analytical score and instinct for finding underlying truths inside noisy information.",
      dayInTheLife:
        "Querying analytical databases, engineering feature models in Python, validating hypothesis accuracy, and presenting dashboards to executives.",
      keySkills: [
        "Python & SQL",
        "Data Modeling",
        "Predictive Analytics",
        "Visualization (Tableau/Observable)",
        "Statistical Inference",
      ],
      growthOutlook: "Steady global demand across fintech, healthcare, e-commerce, and logistics.",
      starterProject:
        "Analyze a public dataset of job market trends and generate an interactive report with actionable insights for students.",
      recommendedCourseQuery: "Data Science & Python",
    },
    {
      id: "match-5",
      title: "Technical Entrepreneur / Founder in Residence",
      domain: "Venture & Innovation",
      matchScore: 81,
      summary:
        "Launch innovative ventures from scratch, solving unaddressed customer pain points with speed and sovereign control.",
      whyMatched:
        "Reflects your high autonomy, resilience, and ambition to see your work create measurable real-world change.",
      dayInTheLife:
        "Talking directly with prospective customers, rapidly validating MVP features, pitching ideas, and refining unit economics.",
      keySkills: [
        "MVP Development",
        "Customer Discovery",
        "Storytelling & Pitching",
        "Growth Experimentation",
        "Financial Modeling",
      ],
      growthOutlook:
        "Infinite upside potential; builds the most versatile skillset for modern leadership.",
      starterProject:
        "Launch a micro-SaaS landing page with a waitlist to test interest in a niche tool for college campus communities.",
      recommendedCourseQuery: "Entrepreneurship & Leadership",
    },
  ];

  // Unexpected Match
  const unexpectedMatch = {
    title: "Computational Biologist or Bio-Informatics Designer",
    domain: "Science & Healthcare Technology",
    reason:
      "Because your answers demonstrate both systematic pattern-matching and an appreciation for living, adaptive systems, you are uniquely equipped to thrive where technology interfaces with biological sciences.",
    explorationHook:
      "Modern healthcare is becoming an information science. Exploring open databases like AlphaFold or genome visualization tools could reveal an unexpected passion.",
  };

  // Next Steps
  const actionableNextSteps = [
    {
      day: "Day 1–2",
      title: "Run a 60-Minute Curiosity Sandbox",
      action:
        "Pick the starter project from your #1 match above. Spend 60 minutes sketching out its user flow or basic file structure with zero pressure to finish.",
    },
    {
      day: "Day 3–4",
      title: "Connect with One Practitioner in this Domain",
      action:
        "Search LinkedIn or Twitter for a professional working in your top matched role. Send a 2-line polite question asking about the hardest part of their week.",
    },
    {
      day: "Day 5–7",
      title: "Add One Tailored Skill to Your Pathfinder Roadmap",
      action:
        "Enroll in a foundational course on Pathfinder aligned with your top recommendation and complete the first lesson module.",
    },
  ];

  // What We Still Don't Know
  const whatWeStillDontKnow = [
    "Whether you gain more energy from high-velocity sprint environments (startups) versus deep, methodical long-term research cycles.",
    "Your tolerance for operational administrative work when scaling a project beyond the initial creative spark.",
    "How strongly you prioritize location independence versus the camaraderie of in-person studio collaboration.",
  ];

  const answersSummary: Record<string, string | string[]> = { ...coreAnswers, ...adaptiveAnswers };

  return {
    id: `dna-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    version,
    completedAt: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    context: {
      stage: context.stage,
      fieldOrSubject: context.fieldOrSubject,
      interests: context.interests,
      region: context.region,
    },
    archetype: {
      title: archetypeTitle,
      tagline,
      description,
      traits,
    },
    dimensions: normalizedDims,
    strengths,
    careerMatches,
    unexpectedMatch,
    actionableNextSteps,
    whatWeStillDontKnow,
    answersSummary,
  };
}
