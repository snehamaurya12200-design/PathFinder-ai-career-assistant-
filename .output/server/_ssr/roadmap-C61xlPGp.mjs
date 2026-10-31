import { n as __toESM } from "../_runtime.mjs";
import { t as SectionShell } from "./SectionShell-BA8J0Nr7.mjs";
import { t as Button } from "./button-BntFxScC.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { G as ChevronRight, J as ChartColumn, N as Hammer, O as Lock, R as CodeXml, b as Play, et as BookOpen, h as Sparkles, l as Trophy, n as X, q as Check, x as Palette, z as Clock } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/roadmap-C61xlPGp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var html_course_jpg_asset_default = {
	version: 1,
	asset_id: "0e20ee99-61e8-45ae-b6d4-fc104cf24f3d",
	project_id: "8986ea04-752f-406b-86ad-f779e4b7a1fe",
	url: "/__l5e/assets-v1/0e20ee99-61e8-45ae-b6d4-fc104cf24f3d/html-course.jpg",
	r2_key: "a/v1/8986ea04-752f-406b-86ad-f779e4b7a1fe/0e20ee99-61e8-45ae-b6d4-fc104cf24f3d/html-course.jpg",
	original_filename: "html-course.jpg",
	size: 6719,
	content_type: "image/jpeg",
	created_at: "2026-10-31T12:21:45Z"
};
var css_course_jpg_asset_default = {
	version: 1,
	asset_id: "abf5f905-e062-475f-a42b-8f1498e66583",
	project_id: "8986ea04-752f-406b-86ad-f779e4b7a1fe",
	url: "/__l5e/assets-v1/abf5f905-e062-475f-a42b-8f1498e66583/css-course.jpg",
	r2_key: "a/v1/8986ea04-752f-406b-86ad-f779e4b7a1fe/abf5f905-e062-475f-a42b-8f1498e66583/css-course.jpg",
	original_filename: "css-course.jpg",
	size: 6935,
	content_type: "image/jpeg",
	created_at: "2026-10-31T12:21:42Z"
};
var tailwind_course_jpg_asset_default = {
	version: 1,
	asset_id: "9de26356-3509-42ed-ac5a-cc4ca93d5c8c",
	project_id: "8986ea04-752f-406b-86ad-f779e4b7a1fe",
	url: "/__l5e/assets-v1/9de26356-3509-42ed-ac5a-cc4ca93d5c8c/tailwind-course.jpg",
	r2_key: "a/v1/8986ea04-752f-406b-86ad-f779e4b7a1fe/9de26356-3509-42ed-ac5a-cc4ca93d5c8c/tailwind-course.jpg",
	original_filename: "tailwind-course.jpg",
	size: 6657,
	content_type: "image/jpeg",
	created_at: "2026-10-31T12:21:53Z"
};
var _jsxFileName = "/app/applet/src/routes/roadmap.tsx?tsr-split=component";
var careers = [
	{
		id: "frontend",
		name: "Frontend Developer",
		icon: CodeXml,
		match: 92,
		salary: "₹6–18 LPA",
		demand: "High demand",
		color: "bg-lilac"
	},
	{
		id: "uiux",
		name: "UI/UX Designer",
		icon: Palette,
		match: 86,
		salary: "₹5–16 LPA",
		demand: "Growing",
		color: "bg-blush"
	},
	{
		id: "data",
		name: "Data Analyst",
		icon: ChartColumn,
		match: 71,
		salary: "₹5–14 LPA",
		demand: "High demand",
		color: "bg-mint"
	}
];
var steps = [
	{
		n: 1,
		title: "Get Started With Basics",
		level: "Beginner",
		hours: 8,
		points: 400,
		desc: "Master the fundamentals through guided courses, then test your skills with hands-on builds.",
		courses: [{
			title: "HTML Essentials",
			image: html_course_jpg_asset_default,
			progress: 100,
			topics: "Semantic structure · Forms · Accessible markup"
		}, {
			title: "CSS Essentials",
			image: css_course_jpg_asset_default,
			progress: 100,
			topics: "Selectors · Flexbox · Grid · Responsive design"
		}],
		builds: [{
			title: "TailwindCss Mastery 1",
			image: tailwind_course_jpg_asset_default,
			progress: 100,
			topics: "Utility classes · Responsive layouts"
		}, {
			title: "TailwindCss Mastery 2",
			image: tailwind_course_jpg_asset_default,
			progress: 60,
			topics: "Component styling · Theming"
		}]
	},
	{
		n: 2,
		title: "JavaScript & the Browser",
		level: "Intermediate",
		hours: 14,
		points: 650,
		desc: "Learn JavaScript, DOM events and fetching data to make your pages interactive.",
		courses: [],
		builds: []
	},
	{
		n: 3,
		title: "React & Portfolio",
		level: "Advanced",
		hours: 20,
		points: 900,
		desc: "Build real apps with React and TypeScript and ship a portfolio employers love.",
		courses: [],
		builds: []
	}
];
function Roadmap() {
	const [career, setCareer] = (0, import_react.useState)("frontend");
	const [step, setStep] = (0, import_react.useState)(0);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const current = careers.find((c) => c.id === career);
	const s = steps[step];
	const all = [...s.courses, ...s.builds];
	const pct = all.length ? Math.round(all.reduce((a, c) => a + c.progress, 0) / all.length) : 0;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionShell, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-5 flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "text-xl font-bold",
				children: "Explore Careers"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 99,
				columnNumber: 14
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-xs text-muted-foreground",
				children: "Pick a path that fits your skills and follow its roadmap."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 99,
				columnNumber: 68
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 99,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "flex items-center gap-2 rounded-full bg-butter px-3 py-1 text-xs font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trophy, { className: "h-4 w-4 text-orange" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 100,
					columnNumber: 106
				}, this), "1958 Points"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 100,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 98,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-6 grid gap-4 md:grid-cols-3",
			children: careers.map((c) => {
				const active = c.id === career;
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => {
						setCareer(c.id);
						setStep(0);
					},
					className: `rounded-2xl border bg-card p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md ${active ? "border-violet ring-2 ring-lilac" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: `grid h-10 w-10 place-items-center rounded-xl ${c.color}`,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(c.icon, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 111,
									columnNumber: 93
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 111,
								columnNumber: 17
							}, this), active && /* @__PURE__ */ (void 0)("span", {
								className: "rounded-full bg-violet px-2 py-0.5 text-[10px] text-primary-foreground",
								children: "Selected"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 112,
								columnNumber: 28
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 110,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mt-3 font-semibold",
							children: c.name
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 114,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-[11px] text-muted-foreground",
							children: [
								c.salary,
								" · ",
								c.demand
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 115,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-3 flex items-center gap-2 text-[10px]",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "h-1.5 flex-1 rounded-full bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "h-full rounded-full bg-success",
									style: { width: `${c.match}%` }
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 116,
									columnNumber: 125
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 116,
								columnNumber: 73
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", {
								className: "text-success",
								children: [c.match, "% match"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 118,
								columnNumber: 26
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 116,
							columnNumber: 15
						}, this)
					]
				}, c.id, true, {
					fileName: _jsxFileName,
					lineNumber: 106,
					columnNumber: 16
				}, this);
			})
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 103,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "section-surface border",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-6 flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: [
							"Roadmaps ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "h-3 w-3" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 125,
								columnNumber: 89
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", {
								className: "text-foreground",
								children: [current.name, " Roadmap"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 125,
								columnNumber: 125
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 125,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "flex items-center gap-1 text-xs text-violet",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 126,
							columnNumber: 73
						}, this), "AI-personalised for you"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 126,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 124,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
					className: "mb-6 grid gap-3 sm:grid-cols-3",
					children: steps.map((st, i) => {
						const locked = i > 0;
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							disabled: locked,
							onClick: () => setStep(i),
							className: `flex w-full items-center gap-3 rounded-xl border p-3 text-left text-xs transition ${step === i ? "border-violet bg-lilac/40" : "bg-card"} ${locked ? "opacity-60" : "hover:bg-lilac/20"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: `grid h-7 w-7 shrink-0 place-items-center rounded-full ${locked ? "bg-muted" : "bg-violet text-primary-foreground"}`,
								children: locked ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 134,
									columnNumber: 164
								}, this) : st.n
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 134,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", {
								className: "block",
								children: ["Step ", st.n]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 135,
								columnNumber: 25
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground",
								children: st.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 135,
								columnNumber: 61
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 135,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 133,
							columnNumber: 17
						}, this) }, st.n, false, {
							fileName: _jsxFileName,
							lineNumber: 132,
							columnNumber: 18
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 129,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid items-start gap-6 lg:grid-cols-[240px_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
						className: "rounded-xl border bg-card p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", { children: ["Step ", s.n] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 143,
									columnNumber: 72
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-muted-foreground",
									children: [pct, "% done"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 143,
									columnNumber: 89
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 143,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-2 h-1.5 rounded-full bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "h-full rounded-full bg-violet",
									style: { width: `${pct}%` }
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 144,
									columnNumber: 63
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 144,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "mt-5 text-sm font-bold",
								children: s.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 147,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 text-xs leading-5 text-muted-foreground",
								children: s.desc
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 148,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-5 grid grid-cols-2 gap-2 text-[11px]",
								children: [
									[BookOpen, s.level],
									[Clock, `${s.hours} hours`],
									[Hammer, `${s.builds.length || 2} builds`],
									[Trophy, `+${s.points} pts`]
								].map(([Icon, label]) => {
									return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "flex items-center gap-1.5 rounded-lg bg-muted px-2 py-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-3 w-3 text-violet" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 152,
											columnNumber: 118
										}, this), String(label)]
									}, String(label), true, {
										fileName: _jsxFileName,
										lineNumber: 152,
										columnNumber: 22
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 149,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								className: "mt-5 w-full",
								size: "sm",
								onClick: () => setSelected(all.find((c) => c.progress < 100) ?? all[0] ?? null),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Play, {}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 155,
									columnNumber: 134
								}, this), "Continue learning"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 155,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 142,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "roadmap-line",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, {
							done: true,
							title: "Courses to Build Your Foundation",
							desc: "Solidify core concepts with foundational courses.",
							items: s.courses,
							onPick: setSelected
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 159,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-8",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Group, {
								title: "Build Projects to Apply Your Skills",
								desc: "Put your learning into action with hands-on builds.",
								items: s.builds,
								onPick: setSelected
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 160,
								columnNumber: 35
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 160,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 158,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 141,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 123,
			columnNumber: 7
		}, this),
		selected && /* @__PURE__ */ (void 0)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": selected.title,
			className: "fixed inset-0 z-50 grid place-items-center bg-ink/50 p-6",
			onClick: () => setSelected(null),
			children: /* @__PURE__ */ (void 0)("div", {
				className: "w-full max-w-md overflow-hidden rounded-2xl bg-card",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ (void 0)("img", {
					src: selected.image.url,
					alt: "",
					className: "h-36 w-full object-cover"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 167,
					columnNumber: 13
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "p-6",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)("h2", {
								className: "text-lg font-bold",
								children: selected.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 169,
								columnNumber: 66
							}, this), /* @__PURE__ */ (void 0)(Button, {
								size: "icon",
								variant: "ghost",
								"aria-label": "Close",
								onClick: () => setSelected(null),
								children: /* @__PURE__ */ (void 0)(X, {}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 169,
									columnNumber: 210
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 169,
								columnNumber: 121
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 169,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: selected.topics
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 170,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "mt-4 h-1.5 rounded-full bg-muted",
							children: /* @__PURE__ */ (void 0)("div", {
								className: `h-full rounded-full ${selected.progress === 100 ? "bg-success" : "bg-violet"}`,
								style: { width: `${selected.progress}%` }
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 171,
								columnNumber: 65
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 171,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "mt-4 flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-sm text-success",
								children: selected.progress === 100 ? "Completed" : `${selected.progress}% complete`
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 174,
								columnNumber: 71
							}, this), /* @__PURE__ */ (void 0)(Button, {
								size: "sm",
								children: selected.progress === 100 ? "Review" : "Resume"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 174,
								columnNumber: 193
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 174,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 168,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 166,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 165,
			columnNumber: 20
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 97,
		columnNumber: 10
	}, this);
}
function Group({ title, desc, items, onPick, done }) {
	const complete = items.filter((i) => i.progress === 100).length;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: `absolute -left-[46px] grid h-7 w-7 place-items-center rounded-full text-[10px] ${done ? "bg-violet text-primary-foreground shadow-soft" : "border-4 border-lilac border-r-violet bg-card"}`,
				children: done ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-5 w-5" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 195,
					columnNumber: 222
				}, this) : `${complete}/${items.length || 2}`
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 195,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: `text-sm font-bold ${done ? "text-violet" : ""}`,
				children: title
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 196,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: desc
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 197,
				columnNumber: 7
			}, this),
			items.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-4 flex items-center gap-2 rounded-xl border border-dashed p-4 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "h-4 w-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 198,
					columnNumber: 139
				}, this), "Unlocks when you finish the previous step."]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 198,
				columnNumber: 29
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4 grid gap-4 sm:grid-cols-2",
				children: items.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => onPick(c),
					className: "group overflow-hidden rounded-xl border bg-card text-left transition hover:-translate-y-0.5 hover:shadow-md",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: c.image.url,
						alt: c.title,
						className: "aspect-[1.86] w-full object-cover transition group-hover:scale-105"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 200,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs font-bold",
								children: c.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 202,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-2 h-1 rounded-full bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: `h-full rounded-full ${c.progress === 100 ? "bg-mint" : "bg-violet"}`,
									style: { width: `${c.progress}%` }
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 203,
									columnNumber: 65
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 203,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "mt-1 block text-[10px] text-success",
								children: c.progress === 100 ? "Completed" : `${c.progress}% complete`
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 206,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 201,
						columnNumber: 15
					}, this)]
				}, c.title, true, {
					fileName: _jsxFileName,
					lineNumber: 199,
					columnNumber: 27
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 198,
				columnNumber: 216
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 194,
		columnNumber: 10
	}, this);
}
export { Roadmap as component };
