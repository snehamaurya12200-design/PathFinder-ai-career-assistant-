import { n as __toESM } from "../_runtime.mjs";
import { n as cn, t as Button } from "./button-BntFxScC.mjs";
import { a as TSS_SERVER_FUNCTION, i as createServerFn, o as getServerFnById } from "./server-B0s_tX_D.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as stringType, i as objectType, n as enumType, t as arrayType } from "../_libs/zod.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { D as MapPin, H as CircleX, M as IndianRupee, T as Mic, W as CircleCheck, X as Building2, Y as CalendarDays, d as Timer, et as BookOpen, h as Sparkles, n as X, z as Clock } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/dialogs-BFb5juEv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var APP_STATUSES = [
	"Applied",
	"Under Review",
	"Shortlisted",
	"Interview Scheduled",
	"Selected",
	"Rejected"
];
var initialState = {
	goal: "Frontend Developer",
	skills: {
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
		"Product Thinking": 36
	},
	applications: [],
	savedJobs: [],
	enrolled: { "react-pro": 35 },
	learningList: [],
	lessonsDone: 46,
	hours: 127,
	tests: [],
	interviews: [],
	connections: {},
	events: [],
	groups: [],
	chat: [{
		me: false,
		t: "Hi Sneha! Want me to review your CV and suggest your next best step?"
	}, {
		me: true,
		t: "Yes, I want to become a frontend developer."
	}]
};
var KEY = "pathfinder-state-v1";
var state = initialState;
var hydrated = false;
var listeners = /* @__PURE__ */ new Set();
function hydrate() {
	if (hydrated || typeof window === "undefined") return;
	hydrated = true;
	try {
		const raw = localStorage.getItem(KEY);
		if (raw) state = {
			...initialState,
			...JSON.parse(raw)
		};
	} catch {}
}
function setState(fn) {
	hydrate();
	state = {
		...state,
		...fn(state)
	};
	try {
		localStorage.setItem(KEY, JSON.stringify(state));
	} catch {}
	listeners.forEach((l) => l());
}
function subscribe(l) {
	listeners.add(l);
	if (!hydrated) {
		hydrate();
		queueMicrotask(l);
	}
	return () => listeners.delete(l);
}
function usePathfinder(sel) {
	return (0, import_react.useSyncExternalStore)(subscribe, () => sel(state), () => sel(initialState));
}
var clamp = (n) => Math.max(0, Math.min(100, Math.round(n)));
var now = () => (/* @__PURE__ */ new Date()).toISOString();
var actions = {
	setGoal: (goal) => setState(() => ({ goal })),
	setSkill: (name, v) => setState((s) => ({ skills: {
		...s.skills,
		[name]: clamp(v)
	} })),
	removeSkill: (name) => setState((s) => {
		const k = { ...s.skills };
		delete k[name];
		return { skills: k };
	}),
	boostSkills: (names, by) => setState((s) => {
		const k = { ...s.skills };
		names.forEach((n) => {
			k[n] = clamp((k[n] ?? 0) + by);
		});
		return { skills: k };
	}),
	toggleSave: (id) => setState((s) => ({ savedJobs: s.savedJobs.includes(id) ? s.savedJobs.filter((x) => x !== id) : [...s.savedJobs, id] })),
	apply: (jobId, note) => setState((s) => s.applications.some((a) => a.jobId === jobId) ? {} : { applications: [...s.applications, {
		jobId,
		status: "Applied",
		appliedAt: now(),
		note,
		history: [{
			status: "Applied",
			at: now()
		}]
	}] }),
	updateApplication: (jobId, patch) => setState((s) => ({ applications: s.applications.map((a) => {
		if (a.jobId !== jobId) return a;
		const history = patch.status && patch.status !== a.status ? [...a.history, {
			status: patch.status,
			at: now()
		}] : a.history;
		return {
			...a,
			...patch,
			history
		};
	}) })),
	withdraw: (jobId) => setState((s) => ({ applications: s.applications.filter((a) => a.jobId !== jobId) })),
	enroll: (id) => setState((s) => s.enrolled[id] !== void 0 ? {} : {
		enrolled: {
			...s.enrolled,
			[id]: 0
		},
		learningList: s.learningList.filter((x) => x !== id)
	}),
	addToList: (id) => setState((s) => s.learningList.includes(id) || s.enrolled[id] !== void 0 ? {} : { learningList: [...s.learningList, id] }),
	removeFromList: (id) => setState((s) => ({ learningList: s.learningList.filter((x) => x !== id) })),
	progressCourse: (id, by, skills, lessonHours) => setState((s) => {
		const prev = s.enrolled[id] ?? 0;
		if (prev >= 100) return {};
		const next = clamp(prev + by);
		const k = { ...s.skills };
		const gain = next === 100 ? 8 : 2;
		skills.forEach((n) => {
			k[n] = clamp((k[n] ?? 0) + gain);
		});
		return {
			enrolled: {
				...s.enrolled,
				[id]: next
			},
			skills: k,
			lessonsDone: s.lessonsDone + 1,
			hours: s.hours + lessonHours
		};
	}),
	lessonComplete: () => setState((s) => ({
		lessonsDone: s.lessonsDone + 1,
		hours: s.hours + 1
	})),
	recordTest: (r, skills) => setState((s) => {
		const pct = r.score / r.total;
		const k = { ...s.skills };
		skills.forEach((n) => {
			const cur = k[n] ?? 0;
			k[n] = clamp(cur + (pct * 100 - cur) * .3);
		});
		return {
			tests: [{
				...r,
				at: now()
			}, ...s.tests],
			skills: k
		};
	}),
	recordInterview: (r) => setState((s) => ({
		interviews: [{
			...r,
			at: now()
		}, ...s.interviews],
		skills: {
			...s.skills,
			Communication: clamp((s.skills.Communication ?? 0) + (r.score >= 60 ? 6 : 2))
		}
	})),
	connect: (id) => setState((s) => ({ connections: {
		...s.connections,
		[id]: "pending"
	} })),
	acceptConnection: (id) => setState((s) => ({ connections: {
		...s.connections,
		[id]: "connected"
	} })),
	removeConnection: (id) => setState((s) => {
		const c = { ...s.connections };
		delete c[id];
		return { connections: c };
	}),
	toggleEvent: (id) => setState((s) => ({ events: s.events.includes(id) ? s.events.filter((x) => x !== id) : [...s.events, id] })),
	toggleGroup: (g) => setState((s) => ({ groups: s.groups.includes(g) ? s.groups.filter((x) => x !== g) : [...s.groups, g] })),
	setChat: (chat) => setState(() => ({ chat }))
};
/** Career readiness: average of goal skills, nudged by activity. */
function readiness(s, goalSkills) {
	if (!goalSkills.length) return 0;
	return clamp(goalSkills.reduce((a, n) => a + (s.skills[n] ?? 0), 0) / goalSkills.length);
}
var jobs = [
	{
		id: 1,
		title: "UI/UX Designer",
		company: "Voxa",
		location: "Bengaluru",
		type: "Full-time",
		salary: "₹12–18 LPA",
		match: 92,
		posted: "2d ago",
		tags: [
			"Figma",
			"Prototyping",
			"User research"
		],
		skills: [
			"Visual Design",
			"User Research",
			"Interaction Design"
		],
		color: "bg-lilac",
		description: "Design end-to-end flows for a consumer voice app, from research to high-fidelity prototypes.",
		eligibility: "0–2 years experience · Portfolio required · Any degree",
		apply: "Submit portfolio link and a short cover note. Demo listing."
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
		tags: [
			"React",
			"Tailwind",
			"TypeScript"
		],
		skills: [
			"React",
			"TypeScript",
			"Frontend"
		],
		color: "bg-mint",
		description: "Build accessible React interfaces for a cloud dashboard and collaborate with designers on a component library.",
		eligibility: "Freshers welcome · Strong JavaScript & React basics",
		apply: "Share GitHub profile and resume. Demo listing."
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
		description: "6-month internship supporting the design system team with components, documentation and audits.",
		eligibility: "Final-year students or recent graduates",
		apply: "Resume + 2 case studies. Demo listing."
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
		tags: [
			"HTML",
			"CSS",
			"JavaScript"
		],
		skills: ["Frontend", "JavaScript"],
		color: "bg-blush",
		description: "Build and maintain marketing websites and landing pages for agency clients.",
		eligibility: "0–1 years · HTML/CSS/JS fundamentals",
		apply: "Resume and one live project link. Demo listing."
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
		tags: [
			"Leadership",
			"Feedback",
			"UX"
		],
		skills: ["Design Leadership", "Communication"],
		color: "bg-lilac",
		description: "Lead a team of 4 designers on a 12-month health platform contract.",
		eligibility: "4+ years design · 1+ year leading people",
		apply: "Portfolio and references. Demo listing."
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
		apply: "Share two Tailwind builds. Demo listing."
	}
];
var courses = [
	{
		id: "react-pro",
		title: "React Pro",
		desc: "Advanced component patterns, hooks and performance.",
		duration: "6 hours",
		lessons: 7,
		level: "Intermediate",
		skills: ["React", "Frontend"],
		goals: ["Frontend Developer"],
		bg: "bg-blush"
	},
	{
		id: "web-foundations",
		title: "Web Foundations",
		desc: "HTML, CSS & JavaScript from scratch.",
		duration: "10 hours",
		lessons: 12,
		level: "Beginner",
		skills: ["Frontend", "JavaScript"],
		goals: ["Frontend Developer", "UI/UX Designer"],
		bg: "bg-lilac"
	},
	{
		id: "interview-prep",
		title: "Interview Prep",
		desc: "Crack technical and behavioural rounds.",
		duration: "5 hours",
		lessons: 9,
		level: "Advanced",
		skills: ["Communication", "Data Structures"],
		goals: [
			"Frontend Developer",
			"UI/UX Designer",
			"Data Analyst"
		],
		bg: "bg-butter"
	},
	{
		id: "typescript",
		title: "TypeScript Essentials",
		desc: "Types, generics and typing React apps.",
		duration: "4 hours",
		lessons: 8,
		level: "Intermediate",
		skills: ["TypeScript", "Frontend"],
		goals: ["Frontend Developer"],
		bg: "bg-mint"
	},
	{
		id: "dsa",
		title: "Data Structures in JS",
		desc: "Arrays, maps, trees and common interview problems.",
		duration: "8 hours",
		lessons: 10,
		level: "Intermediate",
		skills: ["Data Structures", "JavaScript"],
		goals: ["Frontend Developer", "Data Analyst"],
		bg: "bg-lilac"
	},
	{
		id: "communication",
		title: "Speaking with Confidence",
		desc: "Structure answers, present work and use STAR.",
		duration: "3 hours",
		lessons: 6,
		level: "Beginner",
		skills: ["Communication"],
		goals: [
			"Frontend Developer",
			"UI/UX Designer",
			"Data Analyst"
		],
		bg: "bg-blush"
	},
	{
		id: "ux-research",
		title: "UX Research Methods",
		desc: "Interviews, usability tests and synthesis.",
		duration: "5 hours",
		lessons: 8,
		level: "Beginner",
		skills: ["User Research", "Product Thinking"],
		goals: ["UI/UX Designer"],
		bg: "bg-butter"
	},
	{
		id: "design-leadership",
		title: "Design Leadership",
		desc: "Critiques, feedback and leading design teams.",
		duration: "4 hours",
		lessons: 7,
		level: "Advanced",
		skills: ["Design Leadership", "Communication"],
		goals: ["UI/UX Designer"],
		bg: "bg-mint"
	},
	{
		id: "sql-analytics",
		title: "SQL for Analytics",
		desc: "Queries, joins and dashboards for analysts.",
		duration: "7 hours",
		lessons: 10,
		level: "Beginner",
		skills: ["Data Structures", "Product Thinking"],
		goals: ["Data Analyst"],
		bg: "bg-lilac"
	}
];
var courseById = (id) => courses.find((c) => c.id === id);
var careerDetails = {
	frontend: {
		goal: "Frontend Developer",
		skills: [
			"Frontend",
			"JavaScript",
			"React",
			"TypeScript",
			"Data Structures",
			"Communication"
		],
		responsibilities: [
			"Build responsive, accessible user interfaces",
			"Turn designs into reusable components",
			"Work with APIs and manage app state",
			"Review code and fix performance issues"
		],
		jobs: [
			2,
			4,
			6
		]
	},
	uiux: {
		goal: "UI/UX Designer",
		skills: [
			"Visual Design",
			"User Research",
			"Interaction Design",
			"Product Thinking",
			"Design Leadership",
			"Communication"
		],
		responsibilities: [
			"Research user needs and pain points",
			"Create wireframes and prototypes",
			"Maintain a design system",
			"Test designs with real users"
		],
		jobs: [
			1,
			3,
			5
		]
	},
	data: {
		goal: "Data Analyst",
		skills: [
			"Data Structures",
			"Product Thinking",
			"Communication"
		],
		responsibilities: [
			"Clean and analyse datasets",
			"Build dashboards and reports",
			"Share insights with stakeholders",
			"Define and track key metrics"
		],
		jobs: []
	}
};
var goalSkills = (goal) => Object.values(careerDetails).find((c) => c.goal === goal)?.skills ?? [];
/** Recommend courses for goal, ranked by gap size. */
function recommend(goal, skills, exclude = []) {
	const need = goalSkills(goal);
	return courses.filter((c) => !exclude.includes(c.id) && (c.goals.includes(goal) || c.skills.some((s) => need.includes(s)))).map((c) => {
		const worst = c.skills.filter((s) => need.includes(s)).map((s) => ({
			s,
			v: skills[s] ?? 0
		})).sort((a, b) => a.v - b.v)[0];
		return {
			course: c,
			score: worst ? 100 - worst.v : 0,
			reason: worst ? `Your ${worst.s} is at ${worst.v}% — this closes that gap for ${goal}.` : `Supports your ${goal} goal.`
		};
	}).sort((a, b) => b.score - a.score);
}
var testBank = {
	JavaScript: {
		skills: ["JavaScript", "Frontend"],
		questions: [
			{
				q: "What does `typeof null` return?",
				options: [
					"'null'",
					"'object'",
					"'undefined'",
					"'number'"
				],
				answer: 1,
				explain: "A historical quirk: typeof null is 'object'."
			},
			{
				q: "Which method creates a new array with transformed items?",
				options: [
					"forEach",
					"map",
					"reduce",
					"find"
				],
				answer: 1,
				explain: "map returns a new array of the callback results."
			},
			{
				q: "`===` compares…",
				options: [
					"Value only",
					"Type only",
					"Value and type",
					"References only"
				],
				answer: 2,
				explain: "Strict equality checks both value and type, no coercion."
			},
			{
				q: "Which keyword declares a block-scoped constant?",
				options: [
					"var",
					"let",
					"const",
					"static"
				],
				answer: 2,
				explain: "const is block-scoped and cannot be reassigned."
			},
			{
				q: "What does `Promise.all` do if one promise rejects?",
				options: [
					"Ignores it",
					"Rejects immediately",
					"Waits for all then resolves",
					"Retries"
				],
				answer: 1,
				explain: "Promise.all rejects as soon as any input rejects."
			}
		]
	},
	React: {
		skills: ["React", "Frontend"],
		questions: [
			{
				q: "Which hook stores local component state?",
				options: [
					"useEffect",
					"useState",
					"useMemo",
					"useRef"
				],
				answer: 1,
				explain: "useState returns a value and a setter."
			},
			{
				q: "Keys in lists help React…",
				options: [
					"Style items",
					"Identify items between renders",
					"Sort items",
					"Fetch data"
				],
				answer: 1,
				explain: "Keys let React match elements across renders."
			},
			{
				q: "useEffect with an empty dependency array runs…",
				options: [
					"Every render",
					"Never",
					"Once after mount",
					"Before mount"
				],
				answer: 2,
				explain: "[] means run after the first render only."
			},
			{
				q: "Props are…",
				options: [
					"Mutable by child",
					"Read-only inputs",
					"Global state",
					"CSS classes"
				],
				answer: 1,
				explain: "Children should treat props as read-only."
			},
			{
				q: "Which avoids recalculating an expensive value?",
				options: [
					"useMemo",
					"useState",
					"useId",
					"useContext"
				],
				answer: 0,
				explain: "useMemo caches a computed value between renders."
			}
		]
	},
	"Data Structures": {
		skills: ["Data Structures"],
		questions: [
			{
				q: "Average lookup time in a hash map?",
				options: [
					"O(n)",
					"O(log n)",
					"O(1)",
					"O(n²)"
				],
				answer: 2,
				explain: "Hash maps give constant average lookup."
			},
			{
				q: "A stack follows…",
				options: [
					"FIFO",
					"LIFO",
					"Random order",
					"Priority order"
				],
				answer: 1,
				explain: "Last in, first out."
			},
			{
				q: "Binary search requires…",
				options: [
					"A sorted array",
					"A linked list",
					"A hash map",
					"Duplicates"
				],
				answer: 0,
				explain: "It halves a sorted range each step."
			},
			{
				q: "Which is best for BFS?",
				options: [
					"Stack",
					"Queue",
					"Heap",
					"Set"
				],
				answer: 1,
				explain: "BFS processes nodes in queue order."
			}
		]
	},
	"Visual Design": {
		skills: ["Visual Design", "Interaction Design"],
		questions: [
			{
				q: "Minimum WCAG AA contrast for body text?",
				options: [
					"2:1",
					"3:1",
					"4.5:1",
					"7:1"
				],
				answer: 2,
				explain: "AA requires 4.5:1 for normal text."
			},
			{
				q: "Visual hierarchy is mainly created by…",
				options: [
					"Size, weight and contrast",
					"Only colour",
					"Animations",
					"Fonts count"
				],
				answer: 0,
				explain: "Size, weight and contrast guide attention."
			},
			{
				q: "An 8pt grid helps with…",
				options: [
					"Consistent spacing",
					"Colour choice",
					"Copywriting",
					"Accessibility only"
				],
				answer: 0,
				explain: "It keeps spacing consistent and predictable."
			},
			{
				q: "Gestalt 'proximity' means…",
				options: [
					"Close items feel related",
					"Similar colours",
					"Closed shapes",
					"Symmetry"
				],
				answer: 0,
				explain: "Items placed together are perceived as a group."
			}
		]
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
					"Situation, Team, Action, Reason"
				],
				answer: 1,
				explain: "Situation, Task, Action, Result."
			},
			{
				q: "Best way to start a project walkthrough?",
				options: [
					"Tech stack",
					"The problem and goal",
					"Your title",
					"Tools used"
				],
				answer: 1,
				explain: "Lead with the problem so listeners have context."
			},
			{
				q: "When you don't know an answer, you should…",
				options: [
					"Guess confidently",
					"Stay silent",
					"Say so and reason aloud",
					"Change the topic"
				],
				answer: 2,
				explain: "Honest reasoning shows how you think."
			},
			{
				q: "Good feedback is…",
				options: [
					"Vague",
					"Specific and actionable",
					"Only positive",
					"Delivered publicly"
				],
				answer: 1,
				explain: "Specific, actionable feedback helps people improve."
			}
		]
	}
};
var interviewBank = {
	"Frontend Developer": {
		Easy: [
			"Tell me about yourself and why frontend?",
			"What is the difference between let, const and var?",
			"How do you make a page responsive?"
		],
		Medium: [
			"Explain how React decides when to re-render.",
			"How would you improve a slow-loading page?",
			"Describe a bug you fixed and how you found it."
		],
		Hard: [
			"Design the state management for a large dashboard.",
			"How would you build an accessible custom dropdown?",
			"Tell me about a disagreement with a teammate and how you resolved it."
		]
	},
	"UI/UX Designer": {
		Easy: [
			"Walk me through your design process.",
			"What makes a good user interface?",
			"How do you take feedback on your work?"
		],
		Medium: [
			"How do you validate a design decision?",
			"Tell me about a usability test that changed your design.",
			"How do you balance user needs with business goals?"
		],
		Hard: [
			"How would you build a design system from scratch?",
			"Describe leading a project with conflicting stakeholders.",
			"How do you measure the success of a redesign?"
		]
	},
	"Data Analyst": {
		Easy: [
			"Why data analysis?",
			"What is the difference between mean and median?",
			"Which tools do you use daily?"
		],
		Medium: [
			"How do you handle missing data?",
			"Explain a dashboard you built and its impact.",
			"How would you explain a finding to a non-technical manager?"
		],
		Hard: [
			"Design metrics for a new product launch.",
			"How would you detect a drop in user engagement?",
			"Tell me about an analysis that was wrong and what you learned."
		]
	}
};
var _jsxFileName$1 = "/app/applet/src/components/ui/dialog.tsx";
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 21,
	columnNumber: 3
}, void 0));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogOverlay, {}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 37,
	columnNumber: 5
}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-4 w-4" }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 48,
			columnNumber: 9
		}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "sr-only",
			children: "Close"
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 49,
			columnNumber: 9
		}, void 0)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 47,
		columnNumber: 7
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName$1,
	lineNumber: 38,
	columnNumber: 5
}, void 0)] }, void 0, true, {
	fileName: _jsxFileName$1,
	lineNumber: 36,
	columnNumber: 3
}, void 0));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 57,
	columnNumber: 3
}, void 0);
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 62,
	columnNumber: 3
}, void 0);
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 73,
	columnNumber: 3
}, void 0));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 85,
	columnNumber: 3
}, void 0));
DialogDescription.displayName = DialogDescription$1.displayName;
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var Input = objectType({
	system: stringType().max(4e3),
	messages: arrayType(objectType({
		role: enumType(["user", "assistant"]),
		content: stringType().max(6e3)
	})).max(40)
});
/** Calls Lovable AI Gateway (streamed SSE, consumed server-side) and returns the final text. */
var askAI = createServerFn({ method: "POST" }).inputValidator((d) => Input.parse(d)).handler(createSsrRpc("e6ce4f300af1ec33e34c8b840a63975ac94b41ab18b9a6fbe88567a0e0ab07f8"));
var _jsxFileName = "/app/applet/src/components/pathfinder/dialogs.tsx";
var statusColor = {
	Applied: "bg-lilac text-violet",
	"Under Review": "bg-butter",
	Shortlisted: "bg-mint text-primary-foreground",
	"Interview Scheduled": "bg-blush",
	Selected: "bg-success text-primary-foreground",
	Rejected: "bg-destructive text-destructive-foreground"
};
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: `rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColor[status]}`,
		children: status
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 18,
		columnNumber: 10
	}, this);
}
function JobDialog({ jobId, open, onOpenChange }) {
	const job = jobs.find((j) => j.id === jobId);
	const app = usePathfinder((s) => s.applications.find((a) => a.jobId === jobId));
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const [note, setNote] = (0, import_react.useState)("");
	const [showApp, setShowApp] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!open) {
			setConfirm(false);
			setNote("");
		}
	}, [open]);
	if (!job) return null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
		open: open && !showApp,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
			className: "max-h-[90vh] overflow-y-auto rounded-2xl bg-card",
			children: !confirm ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: `flex h-11 w-11 items-center justify-center rounded-xl ${job.color}`,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Building2, { className: "h-5 w-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 38,
							columnNumber: 106
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 38,
						columnNumber: 19
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-left",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, { children: job.title }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 39,
							columnNumber: 46
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, { children: [job.company, " · Sample listing"] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 39,
							columnNumber: 84
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 39,
						columnNumber: 19
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 37,
					columnNumber: 17
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 36,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap gap-3 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPin, { className: "h-3 w-3" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 43,
								columnNumber: 59
							}, this), job.location]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 43,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IndianRupee, { className: "h-3 w-3" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 44,
								columnNumber: 59
							}, this), job.salary.replace("₹", "")]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 44,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "h-3 w-3" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 45,
									columnNumber: 59
								}, this),
								job.type,
								" · ",
								job.posted
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 45,
							columnNumber: 17
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 42,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
					title: "Job description",
					children: job.description
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 47,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
					title: "Required skills",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap gap-1.5",
						children: job.tags.map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "rounded-full bg-muted px-2 py-0.5 text-[11px]",
							children: t
						}, t, false, {
							fileName: _jsxFileName,
							lineNumber: 48,
							columnNumber: 109
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 48,
						columnNumber: 48
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 48,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
					title: "Eligibility",
					children: job.eligibility
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 49,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
					title: "Application details",
					children: job.apply
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 50,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs",
					children: ["AI match ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", {
						className: "text-success",
						children: [job.match, "%"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 51,
						columnNumber: 47
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 51,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, {
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						onClick: () => actions.toggleSave(job.id),
						children: "Save job"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 53,
						columnNumber: 17
					}, this), app ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						onClick: () => setShowApp(true),
						children: ["View application · ", app.status]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 54,
						columnNumber: 24
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						onClick: () => setConfirm(true),
						children: "Apply"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 54,
						columnNumber: 108
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 52,
					columnNumber: 15
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 35,
				columnNumber: 13
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, { children: "Confirm application" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 59,
					columnNumber: 29
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, { children: [
					"Apply to ",
					job.title,
					" at ",
					job.company,
					"? This is a demo — no real employer receives it."
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 59,
					columnNumber: 75
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 59,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
					className: "text-xs font-semibold",
					children: ["Note for recruiter (optional)", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
						value: note,
						onChange: (e) => setNote(e.target.value),
						rows: 3,
						className: "mt-1 w-full rounded-xl border bg-background p-2 text-sm font-normal outline-none",
						placeholder: "Why you're a great fit…"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 61,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 60,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, {
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						onClick: () => setConfirm(false),
						children: "Back"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 64,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						onClick: () => {
							actions.apply(job.id, note || void 0);
							toast.success(`Applied to ${job.title}`, { description: "Status: Applied. Track it under My applications." });
							setConfirm(false);
							setShowApp(true);
						},
						children: "Confirm & apply"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 65,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 63,
					columnNumber: 15
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 58,
				columnNumber: 13
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 33,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 32,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ApplicationDialog, {
		jobId: job.id,
		open: open && showApp,
		onOpenChange: (o) => {
			setShowApp(o);
			if (!o) onOpenChange(false);
		}
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 71,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 31,
		columnNumber: 5
	}, this);
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
		className: "mb-1 text-xs font-semibold",
		children: title
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 77,
		columnNumber: 15
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "text-sm text-muted-foreground",
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 77,
		columnNumber: 68
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 77,
		columnNumber: 10
	}, this);
}
function ApplicationDialog({ jobId, open, onOpenChange }) {
	const app = usePathfinder((s) => s.applications.find((a) => a.jobId === jobId));
	const job = jobs.find((j) => j.id === jobId);
	const [iv, setIv] = (0, import_react.useState)({
		date: "",
		time: "",
		mode: "Video call",
		details: ""
	});
	const [onb, setOnb] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (app?.interview) setIv(app.interview);
		setOnb(app?.onboarding ?? "");
	}, [app?.jobId, open]);
	if (!job || !app) return null;
	const idx = APP_STATUSES.indexOf(app.status);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
			className: "max-h-[90vh] overflow-y-auto rounded-2xl bg-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, { children: [
					job.title,
					" · ",
					job.company
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 93,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, { children: [
					"Applied ",
					new Date(app.appliedAt).toLocaleDateString(),
					" · Demo tracker — update the status yourself when you hear back."
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 94,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 92,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
					className: "flex flex-wrap gap-1.5 text-[10px]",
					children: APP_STATUSES.map((s, i) => {
						const reached = app.status === s || i < idx && s !== "Rejected" && app.status !== "Rejected" || app.status === "Rejected" && i < 4 && app.history.some((h) => h.status === s);
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
							className: `rounded-full px-2 py-0.5 ${reached ? statusColor[s] : "bg-muted text-muted-foreground"}`,
							children: s
						}, s, false, {
							fileName: _jsxFileName,
							lineNumber: 99,
							columnNumber: 20
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 96,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
					className: "text-xs font-semibold",
					children: ["Update status", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						value: app.status,
						onChange: (e) => {
							actions.updateApplication(app.jobId, { status: e.target.value });
							toast(`Status updated: ${e.target.value}`);
						},
						className: "mt-1 w-full rounded-xl border bg-background p-2 text-sm font-normal",
						children: APP_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: s }, s, false, {
							fileName: _jsxFileName,
							lineNumber: 104,
							columnNumber: 38
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 103,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 102,
					columnNumber: 9
				}, this),
				app.status === "Interview Scheduled" && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-2 rounded-xl bg-muted p-3",
					children: [
						/* @__PURE__ */ (void 0)("p", {
							className: "flex items-center gap-1 text-xs font-semibold",
							children: [/* @__PURE__ */ (void 0)(CalendarDays, { className: "h-3.5 w-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 109,
								columnNumber: 74
							}, this), "Interview details"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 109,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (void 0)("input", {
								type: "date",
								"aria-label": "Interview date",
								value: iv.date,
								onChange: (e) => setIv({
									...iv,
									date: e.target.value
								}),
								className: "rounded-lg border bg-background p-1.5 text-sm"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 111,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("input", {
								type: "time",
								"aria-label": "Interview time",
								value: iv.time,
								onChange: (e) => setIv({
									...iv,
									time: e.target.value
								}),
								className: "rounded-lg border bg-background p-1.5 text-sm"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 112,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 110,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("select", {
							"aria-label": "Interview mode",
							value: iv.mode,
							onChange: (e) => setIv({
								...iv,
								mode: e.target.value
							}),
							className: "w-full rounded-lg border bg-background p-1.5 text-sm",
							children: [
								"Video call",
								"Phone",
								"In person"
							].map((m) => /* @__PURE__ */ (void 0)("option", { children: m }, m, false, {
								fileName: _jsxFileName,
								lineNumber: 115,
								columnNumber: 64
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 114,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("input", {
							"aria-label": "Interview notes",
							placeholder: "Link, address or interviewer name",
							value: iv.details,
							onChange: (e) => setIv({
								...iv,
								details: e.target.value
							}),
							className: "w-full rounded-lg border bg-background p-1.5 text-sm"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 117,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(Button, {
							size: "sm",
							onClick: () => {
								actions.updateApplication(app.jobId, { interview: iv });
								toast.success("Interview details saved");
							},
							children: "Save interview"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 118,
							columnNumber: 13
						}, this),
						app.interview?.date && /* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Saved: ",
								app.interview.date,
								" ",
								app.interview.time,
								" · ",
								app.interview.mode,
								app.interview.details ? ` · ${app.interview.details}` : ""
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 119,
							columnNumber: 37
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 108,
					columnNumber: 11
				}, this),
				app.status === "Selected" && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-2 rounded-xl bg-muted p-3",
					children: [
						/* @__PURE__ */ (void 0)("p", {
							className: "text-xs font-semibold",
							children: "Onboarding & next steps"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 124,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("ul", {
							className: "list-disc pl-4 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (void 0)("li", { children: "Accept the offer letter by email" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 125,
									columnNumber: 74
								}, this),
								/* @__PURE__ */ (void 0)("li", { children: "Submit ID and education documents" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 125,
									columnNumber: 115
								}, this),
								/* @__PURE__ */ (void 0)("li", { children: "Complete joining formalities before your start date" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 125,
									columnNumber: 157
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 125,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("textarea", {
							"aria-label": "Onboarding notes",
							rows: 2,
							value: onb,
							onChange: (e) => setOnb(e.target.value),
							placeholder: "Add instructions you received…",
							className: "w-full rounded-lg border bg-background p-1.5 text-sm"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 126,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(Button, {
							size: "sm",
							onClick: () => {
								actions.updateApplication(app.jobId, { onboarding: onb });
								toast.success("Onboarding notes saved");
							},
							children: "Save notes"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 127,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 123,
					columnNumber: 11
				}, this),
				app.note && /* @__PURE__ */ (void 0)(Section, {
					title: "Your note",
					children: app.note
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 130,
					columnNumber: 22
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mb-1 text-xs font-semibold",
					children: "History"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 131,
					columnNumber: 14
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
					className: "space-y-1 text-xs text-muted-foreground",
					children: app.history.map((h, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
						new Date(h.at).toLocaleString(),
						" — ",
						h.status
					] }, i, true, {
						fileName: _jsxFileName,
						lineNumber: 131,
						columnNumber: 150
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 131,
					columnNumber: 67
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 131,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, {
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						onClick: () => {
							actions.withdraw(app.jobId);
							toast("Application withdrawn");
							onOpenChange(false);
						},
						children: "Withdraw"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 133,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						onClick: () => onOpenChange(false),
						children: "Done"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 134,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 132,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 91,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 90,
		columnNumber: 5
	}, this);
}
function CourseDialog({ courseId, reason, open, onOpenChange }) {
	const course = courseId ? courseById(courseId) : void 0;
	const progress = usePathfinder((s) => courseId ? s.enrolled[courseId] : void 0);
	const inList = usePathfinder((s) => courseId ? s.learningList.includes(courseId) : false);
	if (!course) return null;
	const enrolled = progress !== void 0;
	const step = Math.ceil(100 / course.lessons);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
			className: "rounded-2xl bg-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookOpen, { className: "h-5 w-5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 152,
						columnNumber: 72
					}, this), course.title]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 152,
					columnNumber: 23
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, { children: course.desc }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 152,
					columnNumber: 132
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 152,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap gap-2 text-[11px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "rounded-full bg-muted px-2 py-0.5",
							children: course.duration
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 154,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "rounded-full bg-muted px-2 py-0.5",
							children: [course.lessons, " lessons"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 155,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "rounded-full bg-muted px-2 py-0.5",
							children: course.level
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 156,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 153,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
					title: "Skills covered",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap gap-1.5",
						children: course.skills.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "rounded-full bg-lilac px-2 py-0.5 text-[11px]",
							children: s
						}, s, false, {
							fileName: _jsxFileName,
							lineNumber: 158,
							columnNumber: 107
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 158,
						columnNumber: 41
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 158,
					columnNumber: 9
				}, this),
				reason && /* @__PURE__ */ (void 0)("p", {
					className: "flex gap-1.5 text-xs text-violet",
					children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "h-3.5 w-3.5 shrink-0" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 159,
						columnNumber: 68
					}, this), reason]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 159,
					columnNumber: 20
				}, this),
				enrolled && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex justify-between text-xs",
					children: [/* @__PURE__ */ (void 0)("span", { children: "Progress" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 161,
						columnNumber: 62
					}, this), /* @__PURE__ */ (void 0)("span", { children: [progress, "%"] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 161,
						columnNumber: 83
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 161,
					columnNumber: 16
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "mt-1 h-2 rounded-full bg-muted",
					children: /* @__PURE__ */ (void 0)("div", {
						className: "h-full rounded-full bg-mint transition-all",
						style: { width: `${progress}%` }
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 161,
						columnNumber: 161
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 161,
					columnNumber: 113
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 161,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, {
					className: "gap-2",
					children: [
						!enrolled && !inList && /* @__PURE__ */ (void 0)(Button, {
							variant: "outline",
							onClick: () => {
								actions.addToList(course.id);
								toast("Added to your learning list");
							},
							children: "Add to learning list"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 164,
							columnNumber: 36
						}, this),
						!enrolled && inList && /* @__PURE__ */ (void 0)(Button, {
							variant: "outline",
							onClick: () => actions.removeFromList(course.id),
							children: "Remove from list"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 165,
							columnNumber: 35
						}, this),
						!enrolled ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							onClick: () => {
								actions.enroll(course.id);
								toast.success(`Enrolled in ${course.title}`, { description: "Find it under Ongoing courses." });
							},
							children: "Enroll"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 167,
							columnNumber: 13
						}, this) : progress < 100 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							onClick: () => {
								actions.progressCourse(course.id, step, course.skills, 1);
								if (progress + step >= 100) toast.success(`Course completed: ${course.title}`, { description: `Skills improved: ${course.skills.join(", ")}` });
								else toast("Lesson completed");
							},
							children: "Complete next lesson"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 169,
							columnNumber: 13
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "flex items-center gap-1 text-sm text-success",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 170,
								columnNumber: 78
							}, this), "Completed"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 170,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 163,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 151,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 150,
		columnNumber: 5
	}, this);
}
function MockTestDialog({ open, onOpenChange, initialSubject }) {
	const subjects = Object.keys(testBank);
	const [subject, setSubject] = (0, import_react.useState)(null);
	const [i, setI] = (0, import_react.useState)(0);
	const [answers, setAnswers] = (0, import_react.useState)([]);
	const [done, setDone] = (0, import_react.useState)(false);
	const [left, setLeft] = (0, import_react.useState)(0);
	const history = usePathfinder((s) => s.tests);
	const bank = subject ? testBank[subject] : null;
	(0, import_react.useEffect)(() => {
		if (open) {
			setSubject(initialSubject ?? null);
			setDone(false);
			setI(0);
		}
	}, [open, initialSubject]);
	(0, import_react.useEffect)(() => {
		if (bank) {
			setAnswers(bank.questions.map(() => null));
			setLeft(bank.questions.length * 30);
			setI(0);
			setDone(false);
		}
	}, [subject]);
	(0, import_react.useEffect)(() => {
		if (!open || !bank || done) return;
		if (left <= 0) {
			submit();
			return;
		}
		const t = setTimeout(() => setLeft((l) => l - 1), 1e3);
		return () => clearTimeout(t);
	}, [
		left,
		open,
		done,
		bank
	]);
	const score = bank ? bank.questions.reduce((a, q, k) => a + (answers[k] === q.answer ? 1 : 0), 0) : 0;
	function submit() {
		if (!bank || !subject || done) return;
		setDone(true);
		actions.recordTest({
			subject,
			score,
			total: bank.questions.length
		}, bank.skills);
		toast.success(`Test submitted: ${score}/${bank.questions.length}`, { description: `${bank.skills.join(", ")} progress updated.` });
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
			className: "max-h-[90vh] overflow-y-auto rounded-2xl bg-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, { children: ["Mock test", subject ? ` · ${subject}` : ""] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 207,
					columnNumber: 23
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, { children: !subject ? "Choose a subject to start." : done ? "Results and explanations" : `Question ${i + 1} of ${bank.questions.length}` }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 207,
					columnNumber: 91
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 207,
					columnNumber: 9
				}, this),
				!subject && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("div", {
					className: "grid grid-cols-2 gap-2",
					children: subjects.map((s) => /* @__PURE__ */ (void 0)(Button, {
						variant: "outline",
						onClick: () => setSubject(s),
						children: s
					}, s, false, {
						fileName: _jsxFileName,
						lineNumber: 210,
						columnNumber: 74
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 210,
					columnNumber: 13
				}, this), history.length > 0 && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
					className: "mb-1 text-xs font-semibold",
					children: "Test history"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 211,
					columnNumber: 41
				}, this), /* @__PURE__ */ (void 0)("ul", {
					className: "space-y-1 text-xs text-muted-foreground",
					children: history.slice(0, 6).map((h, k) => /* @__PURE__ */ (void 0)("li", { children: [
						h.subject,
						" — ",
						h.score,
						"/",
						h.total,
						" · ",
						new Date(h.at).toLocaleDateString()
					] }, k, true, {
						fileName: _jsxFileName,
						lineNumber: 211,
						columnNumber: 190
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 211,
					columnNumber: 99
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 211,
					columnNumber: 36
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 209,
					columnNumber: 11
				}, this),
				bank && !done && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
					/* @__PURE__ */ (void 0)("p", {
						className: "flex items-center gap-1 text-xs text-orange",
						children: [
							/* @__PURE__ */ (void 0)(Timer, { className: "h-3.5 w-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 216,
								columnNumber: 72
							}, this),
							Math.floor(left / 60),
							":",
							String(left % 60).padStart(2, "0"),
							" left"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 216,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("p", {
						className: "text-sm font-semibold",
						children: bank.questions[i].q
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 217,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "space-y-2",
						children: bank.questions[i].options.map((o, k) => /* @__PURE__ */ (void 0)("button", {
							onClick: () => setAnswers((a) => a.map((v, j) => j === i ? k : v)),
							className: `w-full rounded-xl border p-2 text-left text-sm ${answers[i] === k ? "border-violet bg-lilac" : "bg-card hover:bg-muted"}`,
							children: o
						}, k, false, {
							fileName: _jsxFileName,
							lineNumber: 219,
							columnNumber: 15
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 218,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)(DialogFooter, {
						className: "gap-2",
						children: [/* @__PURE__ */ (void 0)(Button, {
							variant: "outline",
							disabled: i === 0,
							onClick: () => setI(i - 1),
							children: "Previous"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 222,
							columnNumber: 15
						}, this), i < bank.questions.length - 1 ? /* @__PURE__ */ (void 0)(Button, {
							onClick: () => setI(i + 1),
							children: "Next"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 223,
							columnNumber: 48
						}, this) : /* @__PURE__ */ (void 0)(Button, {
							onClick: submit,
							children: "Submit test"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 223,
							columnNumber: 100
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 221,
						columnNumber: 13
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 215,
					columnNumber: 11
				}, this),
				bank && done && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
					/* @__PURE__ */ (void 0)("p", {
						className: "text-3xl font-bold",
						children: [
							score,
							"/",
							bank.questions.length,
							" ",
							/* @__PURE__ */ (void 0)("span", {
								className: "text-sm font-normal text-muted-foreground",
								children: [
									"(",
									Math.round(score / bank.questions.length * 100),
									"%)"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 229,
								columnNumber: 79
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 229,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("ul", {
						className: "space-y-3",
						children: bank.questions.map((q, k) => {
							const ok = answers[k] === q.answer;
							return /* @__PURE__ */ (void 0)("li", {
								className: "rounded-xl bg-muted p-3 text-xs",
								children: [
									/* @__PURE__ */ (void 0)("p", {
										className: "flex gap-1.5 font-semibold",
										children: [ok ? /* @__PURE__ */ (void 0)(CircleCheck, { className: "h-4 w-4 shrink-0 text-success" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 232,
											columnNumber: 126
										}, this) : /* @__PURE__ */ (void 0)(CircleX, { className: "h-4 w-4 shrink-0 text-destructive" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 232,
											columnNumber: 187
										}, this), q.q]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 232,
										columnNumber: 78
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "mt-1",
										children: [
											"Correct: ",
											/* @__PURE__ */ (void 0)("b", { children: q.options[q.answer] }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 232,
												columnNumber: 283
											}, this),
											!ok && answers[k] != null ? ` · You chose: ${q.options[answers[k]]}` : !ok ? " · Not answered" : ""
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 232,
										columnNumber: 254
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "mt-1 text-muted-foreground",
										children: q.explain
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 232,
										columnNumber: 417
									}, this)
								]
							}, k, true, {
								fileName: _jsxFileName,
								lineNumber: 232,
								columnNumber: 22
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 230,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)(DialogFooter, {
						className: "gap-2",
						children: [/* @__PURE__ */ (void 0)(Button, {
							variant: "outline",
							onClick: () => setSubject(null),
							children: "Take another test"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 234,
							columnNumber: 45
						}, this), /* @__PURE__ */ (void 0)(Button, {
							onClick: () => onOpenChange(false),
							children: "Close"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 234,
							columnNumber: 130
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 234,
						columnNumber: 13
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 228,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 206,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 205,
		columnNumber: 5
	}, this);
}
function heuristic(answer) {
	const words = answer.trim().split(/\s+/).filter(Boolean).length;
	const star = [
		"situation",
		"task",
		"action",
		"result",
		"because",
		"example",
		"learned"
	].filter((w) => answer.toLowerCase().includes(w)).length;
	return {
		score: Math.min(100, Math.round(Math.min(words, 80) * .8 + star * 6)),
		text: words < 15 ? "Answer is quite short — add a concrete example and the result." : star >= 2 ? "Good structure with examples. Keep it concise and finish with the impact." : "Clear answer. Try the STAR method (Situation, Task, Action, Result) to add structure."
	};
}
function MockInterviewDialog({ open, onOpenChange }) {
	const goal = usePathfinder((s) => s.goal);
	const [role, setRole] = (0, import_react.useState)(goal);
	const [diff, setDiff] = (0, import_react.useState)("Medium");
	const [started, setStarted] = (0, import_react.useState)(false);
	const [i, setI] = (0, import_react.useState)(0);
	const [answer, setAnswer] = (0, import_react.useState)("");
	const [fb, setFb] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [listening, setListening] = (0, import_react.useState)(false);
	const recRef = (0, import_react.useRef)(null);
	const qs = (0, import_react.useMemo)(() => interviewBank[role]?.[diff] ?? [], [role, diff]);
	const finished = started && fb.length === qs.length && qs.length > 0;
	const saved = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (open) {
			setRole(Object.keys(interviewBank).includes(goal) ? goal : "Frontend Developer");
			setStarted(false);
			setI(0);
			setFb([]);
			setAnswer("");
			saved.current = false;
		}
	}, [open, goal]);
	(0, import_react.useEffect)(() => {
		if (finished && !saved.current) {
			saved.current = true;
			const avg = Math.round(fb.reduce((a, f) => a + f.score, 0) / fb.length);
			actions.recordInterview({
				role,
				difficulty: diff,
				score: avg
			});
		}
	}, [finished]);
	async function submitAnswer() {
		const q = qs[i];
		if (!answer.trim()) return;
		setLoading(true);
		let f = heuristic(answer);
		try {
			const r = await askAI({ data: {
				system: `You are an interview coach for a ${role} role (${diff} difficulty). Give 2-3 sentences of feedback covering content, communication and relevant skills. End with a line exactly "Score: N" where N is 0-100.`,
				messages: [{
					role: "user",
					content: `Question: ${q}\nAnswer: ${answer}`
				}]
			} });
			if (r.ok) {
				const m = r.text.match(/Score:\s*(\d{1,3})/i);
				f = {
					score: m ? Math.min(100, Number(m[1])) : f.score,
					text: r.text.replace(/Score:\s*\d{1,3}.*$/i, "").trim()
				};
			}
		} catch {}
		setFb((x) => [...x, {
			...f,
			q,
			a: answer
		}]);
		setAnswer("");
		setLoading(false);
	}
	function voice() {
		const W = window;
		const C = W.SpeechRecognition ?? W.webkitSpeechRecognition;
		if (!C) {
			toast.error("Voice input isn't supported in this browser. Please type your answer.");
			return;
		}
		if (listening) {
			recRef.current?.stop();
			return;
		}
		const r = new C();
		r.lang = "en-IN";
		r.interimResults = false;
		r.onresult = (e) => setAnswer((a) => `${a} ${e.results[0][0].transcript}`.trim());
		r.onend = () => setListening(false);
		r.onerror = () => setListening(false);
		recRef.current = r;
		setListening(true);
		r.start();
	}
	const avg = fb.length ? Math.round(fb.reduce((a, f) => a + f.score, 0) / fb.length) : 0;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
			className: "max-h-[90vh] overflow-y-auto rounded-2xl bg-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, { children: "Mock interview" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 306,
					columnNumber: 23
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, { children: !started ? "Pick a role and difficulty." : finished ? "Your performance summary" : `Question ${i + 1} of ${qs.length} · ${role} · ${diff}` }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 306,
					columnNumber: 64
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 306,
					columnNumber: 9
				}, this),
				!started && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
					/* @__PURE__ */ (void 0)("label", {
						className: "text-xs font-semibold",
						children: ["Target role", /* @__PURE__ */ (void 0)("select", {
							value: role,
							onChange: (e) => setRole(e.target.value),
							className: "mt-1 w-full rounded-xl border bg-background p-2 text-sm font-normal",
							children: Object.keys(interviewBank).map((r) => /* @__PURE__ */ (void 0)("option", { children: r }, r, false, {
								fileName: _jsxFileName,
								lineNumber: 309,
								columnNumber: 247
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 309,
							columnNumber: 65
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 309,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "flex gap-2",
						children: [
							"Easy",
							"Medium",
							"Hard"
						].map((d) => /* @__PURE__ */ (void 0)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => setDiff(d),
							className: diff === d ? "bg-lilac text-violet" : "",
							children: d
						}, d, false, {
							fileName: _jsxFileName,
							lineNumber: 310,
							columnNumber: 80
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 310,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)(DialogFooter, { children: /* @__PURE__ */ (void 0)(Button, {
						onClick: () => setStarted(true),
						children: "Start interview"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 311,
						columnNumber: 27
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 311,
						columnNumber: 13
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 308,
					columnNumber: 11
				}, this),
				started && !finished && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [fb[i - 1] && /* @__PURE__ */ (void 0)("div", {
					className: "rounded-xl bg-muted p-3 text-xs",
					children: [/* @__PURE__ */ (void 0)("p", {
						className: "font-semibold",
						children: [
							"Feedback on previous answer · ",
							fb[i - 1].score,
							"/100"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 316,
						columnNumber: 76
					}, this), /* @__PURE__ */ (void 0)("p", {
						className: "mt-1 text-muted-foreground",
						children: fb[i - 1].text
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 316,
						columnNumber: 161
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 316,
					columnNumber: 27
				}, this), fb.length === i ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
					/* @__PURE__ */ (void 0)("p", {
						className: "text-sm font-semibold",
						children: qs[i]
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 319,
						columnNumber: 17
					}, this),
					/* @__PURE__ */ (void 0)("textarea", {
						"aria-label": "Your answer",
						rows: 4,
						value: answer,
						onChange: (e) => setAnswer(e.target.value),
						placeholder: listening ? "Listening…" : "Type your answer or use the mic…",
						className: "w-full rounded-xl border bg-background p-2 text-sm outline-none"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 320,
						columnNumber: 17
					}, this),
					/* @__PURE__ */ (void 0)(DialogFooter, {
						className: "gap-2",
						children: [/* @__PURE__ */ (void 0)(Button, {
							variant: "outline",
							onClick: voice,
							className: listening ? "pulse-ring" : "",
							children: [/* @__PURE__ */ (void 0)(Mic, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 322,
								columnNumber: 103
							}, this), listening ? "Stop" : "Speak"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 322,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)(Button, {
							disabled: loading || !answer.trim(),
							onClick: submitAnswer,
							children: loading ? "Evaluating…" : "Submit answer"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 323,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 321,
						columnNumber: 17
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 318,
					columnNumber: 15
				}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("div", {
					className: "rounded-xl bg-muted p-3 text-xs",
					children: [/* @__PURE__ */ (void 0)("p", {
						className: "font-semibold",
						children: [
							"Feedback · ",
							fb[i].score,
							"/100"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 328,
						columnNumber: 66
					}, this), /* @__PURE__ */ (void 0)("p", {
						className: "mt-1 text-muted-foreground",
						children: fb[i].text
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 328,
						columnNumber: 128
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 328,
					columnNumber: 17
				}, this), /* @__PURE__ */ (void 0)(DialogFooter, { children: /* @__PURE__ */ (void 0)(Button, {
					onClick: () => setI(i + 1),
					children: i + 1 < qs.length ? "Next question" : "See summary"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 329,
					columnNumber: 31
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 329,
					columnNumber: 17
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 327,
					columnNumber: 15
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 315,
					columnNumber: 11
				}, this),
				finished && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
					/* @__PURE__ */ (void 0)("p", {
						className: "text-3xl font-bold text-interview-blue",
						children: [avg, "%"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 336,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("p", {
						className: "text-xs text-muted-foreground",
						children: [avg >= 75 ? "Strong — you're interview-ready." : avg >= 50 ? "Good — a few areas to improve." : "Keep practising — add examples and structure.", " Saved to your progress."]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 337,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("ul", {
						className: "space-y-2",
						children: fb.map((f, k) => /* @__PURE__ */ (void 0)("li", {
							className: "rounded-xl bg-muted p-3 text-xs",
							children: [/* @__PURE__ */ (void 0)("p", {
								className: "font-semibold",
								children: [
									f.q,
									" · ",
									f.score,
									"/100"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 338,
								columnNumber: 113
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "mt-1 text-muted-foreground",
								children: f.text
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 338,
								columnNumber: 167
							}, this)]
						}, k, true, {
							fileName: _jsxFileName,
							lineNumber: 338,
							columnNumber: 57
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 338,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)(DialogFooter, {
						className: "gap-2",
						children: [/* @__PURE__ */ (void 0)(Button, {
							variant: "outline",
							onClick: () => {
								setStarted(false);
								setI(0);
								setFb([]);
								saved.current = false;
							},
							children: "Try again"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 339,
							columnNumber: 45
						}, this), /* @__PURE__ */ (void 0)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (void 0)(Link, {
								to: "/interviews",
								onClick: () => onOpenChange(false),
								children: "View interview report"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 339,
								columnNumber: 187
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 339,
							columnNumber: 171
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 339,
						columnNumber: 13
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 335,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 305,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 304,
		columnNumber: 5
	}, this);
}
export { MockTestDialog as a, courseById as c, jobs as d, readiness as f, usePathfinder as h, MockInterviewDialog as i, courses as l, testBank as m, CourseDialog as n, StatusBadge as o, recommend as p, JobDialog as r, actions as s, ApplicationDialog as t, goalSkills as u };
