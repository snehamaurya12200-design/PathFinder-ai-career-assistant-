// Demo/sample data for the Pathfinder prototype. Not real employers or listings.

export const jobs = [
  {
    id: 1,
    title: "UI/UX Designer",
    company: "Voxa",
    location: "Bengaluru",
    type: "Full-time",
    salary: "₹12–18 LPA",
    match: 92,
    posted: "2d ago",
    tags: ["Figma", "Prototyping", "User research"],
    skills: ["Visual Design", "User Research", "Interaction Design"],
    color: "bg-lilac",
    description:
      "Design end-to-end flows for a consumer voice app, from research to high-fidelity prototypes.",
    eligibility: "0–2 years experience · Portfolio required · Any degree",
    apply: "Submit portfolio link and a short cover note. Demo listing.",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Nimbus Labs",
    location: "Remote",
    type: "Full-time",
    salary: "₹10–16 LPA",
    match: 88,
    posted: "1d ago",
    tags: ["React", "Tailwind", "TypeScript"],
    skills: ["React", "TypeScript", "Frontend"],
    color: "bg-mint",
    description:
      "Build accessible React interfaces for a cloud dashboard and collaborate with designers on a component library.",
    eligibility: "Freshers welcome · Strong JavaScript & React basics",
    apply: "Share GitHub profile and resume. Demo listing.",
  },
  {
    id: 3,
    title: "Product Designer Intern",
    company: "Brightpath",
    location: "Pune",
    type: "Internship",
    salary: "₹30k / month",
    match: 81,
    posted: "5h ago",
    tags: ["Design systems", "Figma"],
    skills: ["Visual Design", "Product Thinking"],
    color: "bg-butter",
    description:
      "6-month internship supporting the design system team with components, documentation and audits.",
    eligibility: "Final-year students or recent graduates",
    apply: "Resume + 2 case studies. Demo listing.",
  },
  {
    id: 4,
    title: "Junior Web Developer",
    company: "Orbit Studio",
    location: "Hyderabad",
    type: "Full-time",
    salary: "₹6–9 LPA",
    match: 76,
    posted: "3d ago",
    tags: ["HTML", "CSS", "JavaScript"],
    skills: ["Frontend", "JavaScript"],
    color: "bg-blush",
    description: "Build and maintain marketing websites and landing pages for agency clients.",
    eligibility: "0–1 years · HTML/CSS/JS fundamentals",
    apply: "Resume and one live project link. Demo listing.",
  },
  {
    id: 5,
    title: "Team Lead – Design",
    company: "Kite Health",
    location: "Remote",
    type: "Contract",
    salary: "₹20–26 LPA",
    match: 69,
    posted: "1w ago",
    tags: ["Leadership", "Feedback", "UX"],
    skills: ["Design Leadership", "Communication"],
    color: "bg-lilac",
    description: "Lead a team of 4 designers on a 12-month health platform contract.",
    eligibility: "4+ years design · 1+ year leading people",
    apply: "Portfolio and references. Demo listing.",
  },
  {
    id: 6,
    title: "Tailwind CSS Developer",
    company: "Pixelcraft",
    location: "Mumbai",
    type: "Part-time",
    salary: "₹4–6 LPA",
    match: 85,
    posted: "4d ago",
    tags: ["Tailwind", "Responsive"],
    skills: ["Frontend"],
    color: "bg-mint",
    description: "Part-time role converting designs into responsive Tailwind pages.",
    eligibility: "Any experience · Tailwind portfolio",
    apply: "Share two Tailwind builds. Demo listing.",
  },
];
export type Job = (typeof jobs)[number];

import {
  ALL_COURSES,
  ALL_EDUCATION_LEVELS,
  ALL_ACADEMIC_STREAMS,
  ALL_COURSE_CATEGORIES,
  type Course,
  type EducationLevel,
  type AcademicStream,
  type CourseCategory,
} from "./courses-catalog";

export type { Course, EducationLevel, AcademicStream, CourseCategory };
export { ALL_COURSES, ALL_EDUCATION_LEVELS, ALL_ACADEMIC_STREAMS, ALL_COURSE_CATEGORIES };

export const courses: Course[] = ALL_COURSES;

export const courseById = (id: string): Course | undefined => {
  const direct = ALL_COURSES.find((c) => c.id === id);
  if (direct) return direct;
  // Legacy aliases
  const aliases: Record<string, string> = {
    typescript: "typescript-essentials",
    dsa: "dsa-princeton",
    communication: "speaking-with-confidence",
    "ux-research": "ux-research-nng",
    "sql-analytics": "sql-perf-stanford",
    "design-systems": "figma-design-systems",
  };
  if (aliases[id]) return ALL_COURSES.find((c) => c.id === aliases[id]);
  return undefined;
};

export const careerDetails: Record<
  string,
  { goal: string; skills: string[]; responsibilities: string[]; jobs: number[] }
> = {
  frontend: {
    goal: "Frontend Developer",
    skills: ["Frontend", "JavaScript", "React", "TypeScript", "Data Structures", "Communication"],
    responsibilities: [
      "Build responsive, accessible user interfaces",
      "Turn designs into reusable components",
      "Work with APIs and manage app state",
      "Review code and fix performance issues",
    ],
    jobs: [2, 4, 6],
  },
  uiux: {
    goal: "UI/UX Designer",
    skills: [
      "Visual Design",
      "User Research",
      "Interaction Design",
      "Product Thinking",
      "Design Leadership",
      "Communication",
    ],
    responsibilities: [
      "Research user needs and pain points",
      "Create wireframes and prototypes",
      "Maintain a design system",
      "Test designs with real users",
    ],
    jobs: [1, 3, 5],
  },
  data: {
    goal: "Data Analyst",
    skills: ["Data Analysis", "SQL", "Python", "Data Structures", "Communication"],
    responsibilities: [
      "Clean and analyse datasets",
      "Build dashboards and reports",
      "Share insights with stakeholders",
      "Define and track key metrics",
    ],
    jobs: [],
  },
  ai_ml: {
    goal: "AI / Machine Learning Specialist",
    skills: [
      "Artificial Intelligence",
      "Machine Learning",
      "Python",
      "Deep Learning",
      "Mathematics",
    ],
    responsibilities: [
      "Design and train machine learning models",
      "Fine-tune generative AI architectures and prompt flows",
      "Evaluate algorithmic bias and model safety",
      "Deploy scalable inference endpoints on edge/cloud",
    ],
    jobs: [],
  },
  fullstack: {
    goal: "Full Stack Engineer",
    skills: ["Frontend", "Backend", "APIs", "JavaScript", "TypeScript", "System Design"],
    responsibilities: [
      "Architect end-to-end web architectures",
      "Build scalable REST/GraphQL APIs and services",
      "Design relational schemas and optimization queries",
      "Manage CI/CD deployment pipelines",
    ],
    jobs: [2, 4],
  },
  medical: {
    goal: "Medical & Healthcare Aspirant",
    skills: ["Human Anatomy", "Physiology", "Biochemistry", "Biology", "Medical Terminology"],
    responsibilities: [
      "Master foundational anatomical and physiological systems",
      "Understand clinical biochemistry pathways and biomarkers",
      "Prepare for medical entrance examinations (NEET / MCAT)",
      "Study patient safety protocols and bioethics",
    ],
    jobs: [],
  },
  school_student: {
    goal: "Secondary School Student (Class 10-12)",
    skills: ["Mathematics", "Physics", "Chemistry", "Biology", "Problem Solving"],
    responsibilities: [
      "Master core board curriculum standards (CBSE/ICSE/State)",
      "Build foundational conceptual clarity in science & math",
      "Prepare for board exams and competitive entrance tests",
      "Explore diverse career disciplines and future options",
    ],
    jobs: [],
  },
  commerce: {
    goal: "Chartered Accountant / Finance Specialist",
    skills: ["Financial Accounting", "Corporate Finance", "Taxation", "Economics", "Excel"],
    responsibilities: [
      "Analyze balance sheets, P&L statements, and cash flows",
      "Perform DCF valuation modeling and capital budgeting",
      "Ensure statutory direct tax and GST compliance",
      "Prepare for professional accounting credentials (CA, CFA, CPA)",
    ],
    jobs: [],
  },
  civil_services: {
    goal: "Civil Services / UPSC Aspirant",
    skills: ["Indian Polity", "Constitutional Law", "Governance", "Economics", "Ethics"],
    responsibilities: [
      "Master constitutional provisions and democratic governance",
      "Analyze national macroeconomics and budget policies",
      "Develop structured answer writing for public policy challenges",
      "Cultivate high ethical standards and administrative acumen",
    ],
    jobs: [],
  },
  lawyer: {
    goal: "Legal Specialist / Corporate Lawyer",
    skills: [
      "Constitutional Law",
      "Contract Drafting",
      "Legal Reasoning",
      "Corporate Law",
      "Jurisprudence",
    ],
    responsibilities: [
      "Draft commercial contracts and shareholder agreements",
      "Conduct statutory compliance and regulatory analysis",
      "Interpret judicial precedents and statutory frameworks",
      "Analyze corporate disputes and intellectual property rights",
    ],
    jobs: [],
  },
  researcher: {
    goal: "Academic Researcher",
    skills: [
      "Academic Writing",
      "Research Methods",
      "Data Analysis",
      "Critical Thinking",
      "Qualitative Analysis",
    ],
    responsibilities: [
      "Design rigorous scientific and social methodologies",
      "Conduct comprehensive peer-reviewed literature reviews",
      "Collect and analyze primary quantitative/qualitative data",
      "Publish discoveries in international journals",
    ],
    jobs: [],
  },
  business: {
    goal: "Business & Marketing Specialist",
    skills: [
      "Marketing",
      "Brand Strategy",
      "Strategic Management",
      "Project Management",
      "Leadership",
    ],
    responsibilities: [
      "Develop go-to-market and user acquisition funnels",
      "Formulate competitive positioning and brand messaging",
      "Lead cross-functional agile project delivery",
      "Measure customer lifetime value and unit economics",
    ],
    jobs: [],
  },
};

export const goalSkills = (goal: string) => {
  const match = Object.values(careerDetails).find(
    (c) =>
      c.goal.toLowerCase() === goal.toLowerCase() ||
      goal.toLowerCase().includes(c.goal.toLowerCase()),
  );
  return match?.skills ?? [];
};

/** Recommend courses for goal, ranked by educational background, stream, and skill gap size. */
export function recommend(
  goal: string,
  skills: Record<string, number>,
  exclude: string[] = [],
  profile?: { education?: string; educationLevel?: string; stream?: string },
) {
  const need = goalSkills(goal);
  const userStream = (profile?.stream || "").toLowerCase();
  const userLevel = profile?.educationLevel || "";

  return ALL_COURSES.filter((c) => !exclude.includes(c.id))
    .map((c) => {
      let score = 0;
      let reason = "";

      // 1. Check goal direct affinity
      const directGoal = c.goals.some(
        (g) =>
          g.toLowerCase().includes(goal.toLowerCase()) ||
          goal.toLowerCase().includes(g.toLowerCase()),
      );
      if (directGoal) score += 45;

      // 2. Stream affinity
      if (
        userStream &&
        (c.stream.toLowerCase().includes(userStream) || userStream.includes(c.stream.toLowerCase()))
      ) {
        score += 35;
      }

      // 3. Education Level affinity
      if (userLevel && c.educationLevels.includes(userLevel as EducationLevel)) {
        score += 25;
      }

      // 4. Skill gap calculations
      const matchingSkills = c.skills.filter((s) => need.includes(s) || skills[s] !== undefined);
      if (matchingSkills.length > 0) {
        const sorted = matchingSkills
          .map((s) => ({ s, v: skills[s] ?? 0 }))
          .sort((a, b) => a.v - b.v);
        const worst = sorted[0];
        if (worst) {
          const gap = Math.max(0, 100 - worst.v);
          score += Math.round(gap * 0.4);
          reason = `Your ${worst.s} is at ${worst.v}% — this closes that gap for ${goal}.`;
        }
      }

      if (!reason) {
        if (userLevel && c.educationLevels.includes(userLevel as EducationLevel)) {
          reason = `Specially curated for ${userLevel} students pursuing ${c.stream}.`;
        } else if (userStream && c.stream.toLowerCase().includes(userStream)) {
          reason = `Essential foundation for your ${c.stream} specialization.`;
        } else if (directGoal) {
          reason = `Recommended curriculum for your ${goal} target.`;
        } else {
          reason = `Strengthens core competency in ${c.skills[0] || c.category}.`;
        }
      }

      return { course: c, score, reason };
    })
    .sort((a, b) => b.score - a.score);
}

export type Question = { q: string; options: string[]; answer: number; explain: string };

export const testBank: Record<string, { skills: string[]; questions: Question[] }> = {
  JavaScript: {
    skills: ["JavaScript", "Frontend"],
    questions: [
      {
        q: "What does `typeof null` return?",
        options: ["'null'", "'object'", "'undefined'", "'number'"],
        answer: 1,
        explain: "A historical quirk: typeof null is 'object'.",
      },
      {
        q: "Which method creates a new array with transformed items?",
        options: ["forEach", "map", "reduce", "find"],
        answer: 1,
        explain: "map returns a new array of the callback results.",
      },
      {
        q: "`===` compares…",
        options: ["Value only", "Type only", "Value and type", "References only"],
        answer: 2,
        explain: "Strict equality checks both value and type, no coercion.",
      },
      {
        q: "Which keyword declares a block-scoped constant?",
        options: ["var", "let", "const", "static"],
        answer: 2,
        explain: "const is block-scoped and cannot be reassigned.",
      },
      {
        q: "What does `Promise.all` do if one promise rejects?",
        options: ["Ignores it", "Rejects immediately", "Waits for all then resolves", "Retries"],
        answer: 1,
        explain: "Promise.all rejects as soon as any input rejects.",
      },
    ],
  },
  React: {
    skills: ["React", "Frontend"],
    questions: [
      {
        q: "Which hook stores local component state?",
        options: ["useEffect", "useState", "useMemo", "useRef"],
        answer: 1,
        explain: "useState returns a value and a setter.",
      },
      {
        q: "Keys in lists help React…",
        options: ["Style items", "Identify items between renders", "Sort items", "Fetch data"],
        answer: 1,
        explain: "Keys let React match elements across renders.",
      },
      {
        q: "useEffect with an empty dependency array runs…",
        options: ["Every render", "Never", "Once after mount", "Before mount"],
        answer: 2,
        explain: "[] means run after the first render only.",
      },
      {
        q: "Props are…",
        options: ["Mutable by child", "Read-only inputs", "Global state", "CSS classes"],
        answer: 1,
        explain: "Children should treat props as read-only.",
      },
      {
        q: "Which avoids recalculating an expensive value?",
        options: ["useMemo", "useState", "useId", "useContext"],
        answer: 0,
        explain: "useMemo caches a computed value between renders.",
      },
    ],
  },
  "Data Structures": {
    skills: ["Data Structures"],
    questions: [
      {
        q: "Average lookup time in a hash map?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
        answer: 2,
        explain: "Hash maps give constant average lookup.",
      },
      {
        q: "A stack follows…",
        options: ["FIFO", "LIFO", "Random order", "Priority order"],
        answer: 1,
        explain: "Last in, first out.",
      },
      {
        q: "Binary search requires…",
        options: ["A sorted array", "A linked list", "A hash map", "Duplicates"],
        answer: 0,
        explain: "It halves a sorted range each step.",
      },
      {
        q: "Which is best for BFS?",
        options: ["Stack", "Queue", "Heap", "Set"],
        answer: 1,
        explain: "BFS processes nodes in queue order.",
      },
    ],
  },
  "Visual Design": {
    skills: ["Visual Design", "Interaction Design"],
    questions: [
      {
        q: "Minimum WCAG AA contrast for body text?",
        options: ["2:1", "3:1", "4.5:1", "7:1"],
        answer: 2,
        explain: "AA requires 4.5:1 for normal text.",
      },
      {
        q: "Visual hierarchy is mainly created by…",
        options: ["Size, weight and contrast", "Only colour", "Animations", "Fonts count"],
        answer: 0,
        explain: "Size, weight and contrast guide attention.",
      },
      {
        q: "An 8pt grid helps with…",
        options: ["Consistent spacing", "Colour choice", "Copywriting", "Accessibility only"],
        answer: 0,
        explain: "It keeps spacing consistent and predictable.",
      },
      {
        q: "Gestalt 'proximity' means…",
        options: ["Close items feel related", "Similar colours", "Closed shapes", "Symmetry"],
        answer: 0,
        explain: "Items placed together are perceived as a group.",
      },
    ],
  },
  Communication: {
    skills: ["Communication"],
    questions: [
      {
        q: "STAR stands for…",
        options: [
          "Skill, Task, Action, Result",
          "Situation, Task, Action, Result",
          "Story, Talk, Answer, Review",
          "Situation, Team, Action, Reason",
        ],
        answer: 1,
        explain: "Situation, Task, Action, Result.",
      },
      {
        q: "Best way to start a project walkthrough?",
        options: ["Tech stack", "The problem and goal", "Your title", "Tools used"],
        answer: 1,
        explain: "Lead with the problem so listeners have context.",
      },
      {
        q: "When you don't know an answer, you should…",
        options: [
          "Guess confidently",
          "Stay silent",
          "Say so and reason aloud",
          "Change the topic",
        ],
        answer: 2,
        explain: "Honest reasoning shows how you think.",
      },
      {
        q: "Good feedback is…",
        options: ["Vague", "Specific and actionable", "Only positive", "Delivered publicly"],
        answer: 1,
        explain: "Specific, actionable feedback helps people improve.",
      },
    ],
  },
  Physics: {
    skills: ["Physics", "Mechanics", "Problem Solving"],
    questions: [
      {
        q: "What is the SI unit of work and energy?",
        options: ["Newton", "Watt", "Joule", "Pascal"],
        answer: 2,
        explain: "The Joule (J) is the SI unit of work and energy (1 J = 1 N·m).",
      },
      {
        q: "Which law states that induced EMF opposes the change in magnetic flux?",
        options: ["Ohm's Law", "Lenz's Law", "Ampere's Law", "Coulomb's Law"],
        answer: 1,
        explain: "Lenz's law provides the direction of induced electromotive force.",
      },
      {
        q: "When a projectile reaches its maximum height, its vertical velocity is…",
        options: ["Maximum", "Zero", "Equal to initial horizontal velocity", "Negative"],
        answer: 1,
        explain: "At the peak, vertical velocity momentarily equals zero before reversing.",
      },
      {
        q: "Capacitance of a parallel plate capacitor increases when…",
        options: [
          "Plate area decreases",
          "Distance between plates increases",
          "A dielectric slab is inserted",
          "Voltage is removed",
        ],
        answer: 2,
        explain: "Inserting a dielectric of constant K multiplies capacitance by K.",
      },
    ],
  },
  Chemistry: {
    skills: ["Chemistry", "Atomic Structure", "Chemical Bonding"],
    questions: [
      {
        q: "What is the hybridisation of carbon in methane (CH₄)?",
        options: ["sp", "sp²", "sp³", "sp³d"],
        answer: 2,
        explain: "Carbon forms four equivalent single sigma bonds in a tetrahedral sp³ geometry.",
      },
      {
        q: "A solution with pH = 3 is how many times more acidic than pH = 5?",
        options: ["2 times", "10 times", "100 times", "1000 times"],
        answer: 2,
        explain: "The pH scale is logarithmic: ΔpH of 2 corresponds to a 10² = 100-fold increase.",
      },
      {
        q: "Which quantum number specifies the orientation of an orbital in space?",
        options: ["Principal (n)", "Azimuthal (l)", "Magnetic (m)", "Spin (s)"],
        answer: 2,
        explain: "Magnetic quantum number m determines the spatial orientation.",
      },
      {
        q: "Which element has the highest electronegativity on the Pauling scale?",
        options: ["Oxygen", "Chlorine", "Fluorine", "Nitrogen"],
        answer: 2,
        explain: "Fluorine has the highest electronegativity at 3.98.",
      },
    ],
  },
  Biology: {
    skills: ["Biology", "Cell Biology", "Genetics"],
    questions: [
      {
        q: "Which organelle is known as the powerhouse of eukaryotic cells?",
        options: ["Ribosome", "Mitochondria", "Golgi apparatus", "Lysosome"],
        answer: 1,
        explain: "Mitochondria generate the majority of cellular adenosine triphosphate (ATP).",
      },
      {
        q: "DNA replication is described as…",
        options: ["Conservative", "Semi-conservative", "Dispersive", "Random"],
        answer: 1,
        explain:
          "Meselson & Stahl demonstrated that each new double helix contains one old and one new strand.",
      },
      {
        q: "In which phase of mitosis do sister chromatids separate toward opposite poles?",
        options: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
        answer: 2,
        explain: "During anaphase, centromeres split and sister chromatids are pulled apart.",
      },
      {
        q: "Which blood type is considered the universal red blood cell donor?",
        options: ["O Negative", "AB Positive", "A Positive", "O Positive"],
        answer: 0,
        explain: "O Negative lacks A, B, and Rh surface antigens, preventing immune rejection.",
      },
    ],
  },
  Mathematics: {
    skills: ["Mathematics", "Calculus", "Algebra"],
    questions: [
      {
        q: "What is the derivative of f(x) = ln(x) with respect to x?",
        options: ["eˣ", "1/x", "x", "1/x²"],
        answer: 1,
        explain: "d/dx [ln(x)] = 1/x for all x > 0.",
      },
      {
        q: "The value of sin²(θ) + cos²(θ) is always…",
        options: ["0", "1", "tan(θ)", "2"],
        answer: 1,
        explain: "This is the fundamental Pythagorean trigonometric identity.",
      },
      {
        q: "What is the limit of (sin x)/x as x approaches 0?",
        options: ["0", "1", "Infinity", "Undefined"],
        answer: 1,
        explain: "By L'Hôpital's rule or geometric definition, lim_{x→0} (sin x)/x = 1.",
      },
      {
        q: "If two vectors are perpendicular, their dot product equals…",
        options: ["1", "-1", "0", "Their cross product"],
        answer: 2,
        explain: "u · v = |u||v|cos(90°) = 0.",
      },
    ],
  },
  "Financial Accounting": {
    skills: ["Financial Accounting", "Accounting", "Financial Records"],
    questions: [
      {
        q: "According to the fundamental accounting equation, Assets equal…",
        options: [
          "Liabilities - Equity",
          "Liabilities + Equity",
          "Revenue - Expenses",
          "Cash + Receivables",
        ],
        answer: 1,
        explain: "Assets = Liabilities + Owner's Equity.",
      },
      {
        q: "Which financial statement reports financial position at a specific point in time?",
        options: ["Income Statement", "Cash Flow Statement", "Balance Sheet", "Trial Balance"],
        answer: 2,
        explain:
          "The Balance Sheet is a snapshot of assets, liabilities, and equity on a specific date.",
      },
      {
        q: "Under accrual accounting, revenue is recognized when…",
        options: [
          "Cash is deposited in the bank",
          "An order is received",
          "Performance obligation is satisfied / earned",
          "The tax year closes",
        ],
        answer: 2,
        explain:
          "Revenue is recognized when goods/services are delivered, regardless of cash timing.",
      },
    ],
  },
  "Indian Polity": {
    skills: ["Indian Polity", "Constitutional Law", "Governance"],
    questions: [
      {
        q: "Which article of the Indian Constitution is called the 'Heart and Soul' by Dr. B.R. Ambedkar?",
        options: ["Article 14", "Article 19", "Article 21", "Article 32"],
        answer: 3,
        explain:
          "Article 32 guarantees the Right to Constitutional Remedies through Supreme Court writs.",
      },
      {
        q: "The concept of 'Basic Structure' of the Constitution was established in…",
        options: [
          "Golaknath Case (1967)",
          "Kesavananda Bharati Case (1973)",
          "Minerva Mills Case (1980)",
          "Maneka Gandhi Case (1978)",
        ],
        answer: 1,
        explain:
          "The 13-judge bench in Kesavananda Bharati ruled Parliament cannot alter the basic structure.",
      },
      {
        q: "Who is the ex-officio Chairman of the Rajya Sabha?",
        options: [
          "President of India",
          "Prime Minister of India",
          "Vice-President of India",
          "Speaker of Lok Sabha",
        ],
        answer: 2,
        explain: "The Vice-President of India serves as ex-officio Chairman of the Rajya Sabha.",
      },
    ],
  },
  "General Aptitude": {
    skills: ["Quantitative Aptitude", "Problem Solving", "Logic"],
    questions: [
      {
        q: "If a car travels 180 km in 3 hours, what is its speed in meters per second?",
        options: ["15 m/s", "16.67 m/s", "20 m/s", "25 m/s"],
        answer: 1,
        explain: "Speed = 180 km / 3 h = 60 km/h. Convert to m/s: 60 × (5/18) = 16.67 m/s.",
      },
      {
        q: "A merchant buys an item for ₹800 and sells it for ₹1000. What is the profit percentage?",
        options: ["20%", "25%", "15%", "30%"],
        answer: 1,
        explain: "Profit = ₹200. Profit % = (200 / 800) × 100 = 25%.",
      },
      {
        q: "What is the next number in the sequence: 2, 6, 12, 20, 30, …?",
        options: ["40", "42", "44", "46"],
        answer: 1,
        explain:
          "Differences are +4, +6, +8, +10, so next difference is +12: 30 + 12 = 42 (also n² + n).",
      },
    ],
  },
};

export const interviewBank: Record<string, Record<string, string[]>> = {
  "Frontend Developer": {
    Easy: [
      "Tell me about yourself and why frontend?",
      "What is the difference between let, const and var?",
      "How do you make a page responsive?",
    ],
    Medium: [
      "Explain how React decides when to re-render.",
      "How would you improve a slow-loading page?",
      "Describe a bug you fixed and how you found it.",
    ],
    Hard: [
      "Design the state management for a large dashboard.",
      "How would you build an accessible custom dropdown?",
      "Tell me about a disagreement with a teammate and how you resolved it.",
    ],
  },
  "UI/UX Designer": {
    Easy: [
      "Walk me through your design process.",
      "What makes a good user interface?",
      "How do you take feedback on your work?",
    ],
    Medium: [
      "How do you validate a design decision?",
      "Tell me about a usability test that changed your design.",
      "How do you balance user needs with business goals?",
    ],
    Hard: [
      "How would you build a design system from scratch?",
      "Describe leading a project with conflicting stakeholders.",
      "How do you measure the success of a redesign?",
    ],
  },
  "Data Analyst": {
    Easy: [
      "Why data analysis?",
      "What is the difference between mean and median?",
      "Which tools do you use daily?",
    ],
    Medium: [
      "How do you handle missing data?",
      "Explain a dashboard you built and its impact.",
      "How would you explain a finding to a non-technical manager?",
    ],
    Hard: [
      "Design metrics for a new product launch.",
      "How would you detect a drop in user engagement?",
      "Tell me about an analysis that was wrong and what you learned.",
    ],
  },
};

export const people = [
  {
    id: 1,
    name: "Ananya Rao",
    role: "Senior UX Designer",
    company: "Voxa",
    mutual: 12,
    mentor: true,
    color: "bg-lilac",
    bio: "8 years designing voice and mobile products. Mentors early-career designers on portfolios.",
    skills: ["User Research", "Figma", "Mentoring"],
    location: "Bengaluru",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    role: "Frontend Engineer",
    company: "Nimbus Labs",
    mutual: 8,
    mentor: false,
    color: "bg-mint",
    bio: "Builds React dashboards and loves accessibility.",
    skills: ["React", "TypeScript", "A11y"],
    location: "Remote",
  },
  {
    id: 3,
    name: "Priya Shah",
    role: "Product Manager",
    company: "Brightpath",
    mutual: 5,
    mentor: true,
    color: "bg-butter",
    bio: "PM for design-system tooling. Happy to talk career switches into product.",
    skills: ["Roadmaps", "Discovery"],
    location: "Pune",
  },
  {
    id: 4,
    name: "Arjun Nair",
    role: "Design Lead",
    company: "Kite Health",
    mutual: 15,
    mentor: true,
    color: "bg-blush",
    bio: "Leads a health design team. Runs monthly portfolio reviews.",
    skills: ["Leadership", "UX"],
    location: "Remote",
  },
  {
    id: 5,
    name: "Sneha Iyer",
    role: "React Developer",
    company: "Pixelcraft",
    mutual: 3,
    mentor: false,
    color: "bg-lilac",
    bio: "Tailwind and React enthusiast, 2 years in.",
    skills: ["React", "Tailwind"],
    location: "Mumbai",
  },
  {
    id: 6,
    name: "Karan Verma",
    role: "Data Analyst",
    company: "Orbit Studio",
    mutual: 6,
    mentor: false,
    color: "bg-mint",
    bio: "SQL, dashboards and experiment analysis.",
    skills: ["SQL", "Analytics"],
    location: "Hyderabad",
  },
];
