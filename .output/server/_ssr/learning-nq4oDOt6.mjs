import { n as __toESM } from "../_runtime.mjs";
import { t as SectionShell } from "./SectionShell-BA8J0Nr7.mjs";
import { t as Button } from "./button-BntFxScC.mjs";
import { t as SkillRadar } from "./SkillRadar-DsRh6ZZ0.mjs";
import { a as MockTestDialog, h as usePathfinder, i as MockInterviewDialog, l as courses, m as testBank, n as CourseDialog, p as recommend, s as actions } from "./dialogs-BFb5juEv.mjs";
import { n as Route$3 } from "./router-DW38PKps.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { B as ClipboardCheck, G as ChevronRight, O as Lock, T as Mic, V as Circle, W as CircleCheck, Y as CalendarDays, b as Play, et as BookOpen, f as Target, h as Sparkles, t as Zap, tt as Bell, z as Clock } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/learning-nq4oDOt6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var leadership_jpg_asset_default = {
	version: 1,
	asset_id: "26cd7f14-5eea-4815-a1b3-a79e37c12283",
	project_id: "8986ea04-752f-406b-86ad-f779e4b7a1fe",
	url: "/__l5e/assets-v1/26cd7f14-5eea-4815-a1b3-a79e37c12283/leadership.jpg",
	r2_key: "a/v1/8986ea04-752f-406b-86ad-f779e4b7a1fe/26cd7f14-5eea-4815-a1b3-a79e37c12283/leadership.jpg",
	original_filename: "leadership.jpg",
	size: 2890,
	content_type: "image/jpeg",
	created_at: "2026-10-31T12:21:48Z"
};
var feedback_jpg_asset_default = {
	version: 1,
	asset_id: "c9008833-f914-4aeb-81d8-f3b29fefae59",
	project_id: "8986ea04-752f-406b-86ad-f779e4b7a1fe",
	url: "/__l5e/assets-v1/c9008833-f914-4aeb-81d8-f3b29fefae59/feedback.jpg",
	r2_key: "a/v1/8986ea04-752f-406b-86ad-f779e4b7a1fe/c9008833-f914-4aeb-81d8-f3b29fefae59/feedback.jpg",
	original_filename: "feedback.jpg",
	size: 2929,
	content_type: "image/jpeg",
	created_at: "2026-10-31T12:21:43Z"
};
var awareness_jpg_asset_default = {
	version: 1,
	asset_id: "5b27b568-e9ff-481b-8149-7ada3cf4fb89",
	project_id: "8986ea04-752f-406b-86ad-f779e4b7a1fe",
	url: "/__l5e/assets-v1/5b27b568-e9ff-481b-8149-7ada3cf4fb89/awareness.jpg",
	r2_key: "a/v1/8986ea04-752f-406b-86ad-f779e4b7a1fe/5b27b568-e9ff-481b-8149-7ada3cf4fb89/awareness.jpg",
	original_filename: "awareness.jpg",
	size: 2637,
	content_type: "image/jpeg",
	created_at: "2026-10-31T12:21:40Z"
};
var practices_jpg_asset_default = {
	version: 1,
	asset_id: "c171f921-a250-4bf9-8ae7-7e248af73fb8",
	project_id: "8986ea04-752f-406b-86ad-f779e4b7a1fe",
	url: "/__l5e/assets-v1/c171f921-a250-4bf9-8ae7-7e248af73fb8/practices.jpg",
	r2_key: "a/v1/8986ea04-752f-406b-86ad-f779e4b7a1fe/c171f921-a250-4bf9-8ae7-7e248af73fb8/practices.jpg",
	original_filename: "practices.jpg",
	size: 1982,
	content_type: "image/jpeg",
	created_at: "2026-10-31T12:21:50Z"
};
var styles_jpg_asset_default = {
	version: 1,
	asset_id: "415cdfb5-b6e2-4988-a7a6-13d040332b42",
	project_id: "8986ea04-752f-406b-86ad-f779e4b7a1fe",
	url: "/__l5e/assets-v1/415cdfb5-b6e2-4988-a7a6-13d040332b42/styles.jpg",
	r2_key: "a/v1/8986ea04-752f-406b-86ad-f779e4b7a1fe/415cdfb5-b6e2-4988-a7a6-13d040332b42/styles.jpg",
	original_filename: "styles.jpg",
	size: 2987,
	content_type: "image/jpeg",
	created_at: "2026-10-31T12:21:52Z"
};
var constructive_jpg_asset_default = {
	version: 1,
	asset_id: "a894528b-5b0c-4298-a5c0-ef120df2c40b",
	project_id: "8986ea04-752f-406b-86ad-f779e4b7a1fe",
	url: "/__l5e/assets-v1/a894528b-5b0c-4298-a5c0-ef120df2c40b/constructive.jpg",
	r2_key: "a/v1/8986ea04-752f-406b-86ad-f779e4b7a1fe/a894528b-5b0c-4298-a5c0-ef120df2c40b/constructive.jpg",
	original_filename: "constructive.jpg",
	size: 2866,
	content_type: "image/jpeg",
	created_at: "2026-10-31T12:21:41Z"
};
var _jsxFileName = "/app/applet/src/routes/learning.tsx?tsr-split=component";
var lessons = [
	{
		title: "Getting started: your first position",
		image: null,
		done: true,
		date: "Mar 16, 2022",
		mins: 5,
		about: "Understand where you stand today as a team member and future leader."
	},
	{
		title: "Giving feedback",
		image: feedback_jpg_asset_default,
		done: true,
		date: "Mar 22, 2022",
		mins: 8,
		about: "Learn simple ways to share feedback that people welcome."
	},
	{
		title: "Learn more about leadership",
		image: awareness_jpg_asset_default,
		done: true,
		date: "Mar 29, 2022",
		mins: 10,
		about: "What leadership really means and why it matters at work."
	},
	{
		title: "Good practices",
		image: practices_jpg_asset_default,
		done: true,
		date: "Apr 5, 2022",
		mins: 7,
		about: "Everyday habits of effective team leaders."
	},
	{
		title: "Leadership styles",
		image: styles_jpg_asset_default,
		done: true,
		date: "Apr 12, 2022",
		mins: 9,
		about: "Discover different leadership styles and when to use each one."
	},
	{
		title: "Constructive feedback",
		image: constructive_jpg_asset_default,
		done: true,
		date: "Apr 19, 2022",
		mins: 8,
		about: "Turn criticism into clear, helpful next steps."
	},
	{
		title: "The leader in detail",
		image: practices_jpg_asset_default,
		done: true,
		date: "Apr 26, 2022",
		mins: 12,
		about: "A closer look at the skills a great leader uses every day."
	},
	{
		title: "The art of feedback",
		image: leadership_jpg_asset_default,
		done: false,
		date: "May 3, 2022",
		mins: 10,
		about: "Master timing, tone and follow-up when giving feedback."
	},
	{
		title: "Putting it into practice",
		image: constructive_jpg_asset_default,
		done: false,
		date: "May 10, 2022",
		mins: 15,
		about: "Apply everything you learned in a real-life scenario."
	}
];
function Learning() {
	const [selected, setSelected] = (0, import_react.useState)(lessons.findIndex((l) => !l.done));
	const [reminder, setReminder] = (0, import_react.useState)(true);
	const [done, setDone] = (0, import_react.useState)(lessons.map((l) => l.done));
	const lesson = lessons[selected];
	const completed = done.filter(Boolean).length;
	const pct = Math.round(completed / lessons.length * 100);
	const nextOpen = done.findIndex((d) => !d);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionShell, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "section-surface",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-6 flex flex-wrap items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "flex items-center gap-2 text-2xl font-bold",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookOpen, { className: "h-5 w-5" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 94,
					columnNumber: 72
				}, this), "Management in the Workplace"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 94,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-2 flex items-center gap-2 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "rounded-full bg-mint px-2 py-0.5 font-semibold text-primary-foreground",
						children: "In progress"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 95,
						columnNumber: 87
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CalendarDays, { className: "h-3.5 w-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 95,
						columnNumber: 194
					}, this),
					"Feb 28, 2022 – May 31, 2022"
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 95,
				columnNumber: 13
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 93,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "min-w-56 rounded-xl border bg-card p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex justify-between text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", { children: "Your progress" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 98,
							columnNumber: 59
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-muted-foreground",
							children: [
								completed,
								" of ",
								lessons.length,
								" lessons"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 98,
							columnNumber: 79
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 98,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-2 h-2 rounded-full bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "h-full rounded-full bg-mint transition-all",
							style: { width: `${pct}%` }
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 99,
							columnNumber: 61
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 99,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-right text-[10px] font-semibold text-success",
						children: [pct, "% complete"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 102,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 97,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 92,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid items-start gap-6 xl:grid-cols-[1.3fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-4 flex items-center gap-3 rounded-xl border bg-card p-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: leadership_jpg_asset_default.url,
						alt: "Leadership workshop",
						className: "h-12 w-14 rounded-lg object-cover"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 109,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-semibold",
						children: "Becoming a Leader"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 110,
						columnNumber: 20
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[11px] text-muted-foreground",
						children: "9 short lessons · about 1.5 hours"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 110,
						columnNumber: 72
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 110,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "ghost",
						size: "sm",
						"aria-pressed": reminder,
						onClick: () => setReminder(!reminder),
						className: "ml-auto rounded-full text-orange",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bell, { className: reminder ? "fill-orange" : "" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 111,
							columnNumber: 157
						}, this), reminder ? "Reminder on" : "Remind me"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 111,
						columnNumber: 15
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 108,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
				className: "space-y-2",
				children: lessons.map((item, i) => {
					const isDone = done[i], locked = !isDone && i !== nextOpen;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						disabled: locked,
						onClick: () => setSelected(i),
						className: `flex w-full items-center gap-3 rounded-xl border bg-card p-2 text-left transition ${selected === i ? "border-chart-cyan ring-2 ring-chart-cyan/30" : "hover:bg-muted/50"} ${locked ? "opacity-50" : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "w-5 text-center text-xs font-bold text-muted-foreground",
								children: i + 1
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 120,
								columnNumber: 23
							}, this),
							item.image ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								src: item.image.url,
								alt: "",
								className: "h-11 w-11 shrink-0 rounded-lg object-cover"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 121,
								columnNumber: 37
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Target, { className: "h-5 w-5 text-muted-foreground" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 121,
									columnNumber: 211
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 121,
								columnNumber: 130
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "block truncate text-sm font-medium",
									children: item.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 122,
									columnNumber: 56
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[11px] text-muted-foreground",
									children: [
										item.mins,
										" min · ",
										item.date
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 122,
									columnNumber: 128
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 122,
								columnNumber: 23
							}, this),
							isDone ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-5 w-5 text-success" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 123,
								columnNumber: 33
							}, this) : locked ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "h-4 w-4 text-muted-foreground" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 123,
								columnNumber: 94
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "rounded-full bg-orange px-2 py-0.5 text-[10px] font-semibold text-primary-foreground",
								children: "Up next"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 123,
								columnNumber: 147
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 119,
						columnNumber: 21
					}, this) }, item.title, false, {
						fileName: _jsxFileName,
						lineNumber: 118,
						columnNumber: 22
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 113,
				columnNumber: 13
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 107,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "overflow-hidden rounded-xl border bg-card",
					children: [lesson.image && /* @__PURE__ */ (void 0)("img", {
						src: lesson.image.url,
						alt: "",
						className: "h-36 w-full object-cover"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 132,
						columnNumber: 32
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-muted-foreground",
								children: [
									"Lesson ",
									selected + 1,
									" · ",
									lesson.mins,
									" min"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 134,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "mt-1 text-lg font-semibold",
								children: lesson.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 135,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: lesson.about
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 136,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4 flex gap-2",
								children: [done[selected] ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => toast(`Replaying: ${lesson.title}`, { description: `${lesson.mins} min lesson` }),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Play, {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 140,
										columnNumber: 21
									}, this), "Watch again"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 138,
									columnNumber: 37
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									size: "sm",
									onClick: () => {
										const d = [...done];
										d[selected] = true;
										setDone(d);
										actions.lessonComplete();
										actions.boostSkills(["Design Leadership", "Communication"], 2);
										toast.success("Lesson complete", { description: "Leadership & communication progress updated." });
										setSelected(Math.min(selected + 1, lessons.length - 1));
									},
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Circle, {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 150,
										columnNumber: 20
									}, this), "Mark as complete"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 140,
									columnNumber: 52
								}, this), selected < lessons.length - 1 && (done[selected] || selected + 1 === nextOpen) && /* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => setSelected(selected + 1),
									children: ["Next ", /* @__PURE__ */ (void 0)(ChevronRight, {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 151,
										columnNumber: 183
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 151,
									columnNumber: 102
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 137,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 133,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 131,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-xl border bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold",
							children: "Your skills"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 156,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-3 grid grid-cols-3 gap-2 text-center text-[11px]",
							children: [
								[
									Zap,
									`${pct}%`,
									"Success rate"
								],
								[
									Target,
									`${completed}/9`,
									"Skills mastered"
								],
								[
									Clock,
									"52 min",
									"Time spent"
								]
							].map(([Icon, value, label]) => {
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-lg bg-muted p-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "mx-auto h-4 w-4 text-chart-cyan" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 160,
											columnNumber: 85
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", {
											className: "mt-1 block text-sm",
											children: String(value)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 160,
											columnNumber: 134
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-muted-foreground",
											children: String(label)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 160,
											columnNumber: 187
										}, this)
									]
								}, String(label), true, {
									fileName: _jsxFileName,
									lineNumber: 160,
									columnNumber: 24
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 157,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SkillRadar, {
							compact: true,
							development: true
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 163,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap justify-center gap-3 text-[10px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-chart-cyan",
									children: "■ Current skill"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 164,
									columnNumber: 80
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-chart-green",
									children: "■ Theoretical skill"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 164,
									columnNumber: 136
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-muted-foreground",
									children: "■ Expected skill"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 164,
									columnNumber: 197
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 164,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-4 text-xs font-semibold",
							children: "What you will learn"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 165,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
							className: "mt-2 space-y-1.5 text-xs text-muted-foreground",
							children: [
								"Give useful feedback to your team",
								"Show confident leadership",
								"Handle crisis situations calmly"
							].map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-3.5 w-3.5 shrink-0 text-success" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 167,
									columnNumber: 164
								}, this), t]
							}, t, true, {
								fileName: _jsxFileName,
								lineNumber: 167,
								columnNumber: 129
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 166,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 155,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 130,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 106,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 91,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CoursesHub, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 173,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 90,
		columnNumber: 10
	}, this);
}
function CoursesHub() {
	const search = Route$3.useSearch();
	const goal = usePathfinder((s) => s.goal);
	const skills = usePathfinder((s) => s.skills);
	const enrolled = usePathfinder((s) => s.enrolled);
	const list = usePathfinder((s) => s.learningList);
	const tests = usePathfinder((s) => s.tests);
	const interviews = usePathfinder((s) => s.interviews);
	const [tab, setTab] = (0, import_react.useState)("All");
	const [open, setOpen] = (0, import_react.useState)(search.course ? { id: search.course } : null);
	const [testOpen, setTestOpen] = (0, import_react.useState)(search.open === "test");
	const [subject, setSubject] = (0, import_react.useState)();
	const [ivOpen, setIvOpen] = (0, import_react.useState)(search.open === "interview");
	const recs = recommend(goal, skills, Object.keys(enrolled)).slice(0, 3);
	const shown = courses.filter((c) => tab === "All" || tab === "Ongoing" && enrolled[c.id] !== void 0 && enrolled[c.id] < 100 || tab === "Completed" && enrolled[c.id] === 100 || tab === "My list" && list.includes(c.id));
	const lastIv = interviews[0];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "section-surface mt-6 border",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-4 flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "flex items-center gap-2 text-lg font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookOpen, { className: "h-5 w-5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 200,
						columnNumber: 69
					}, this), "Courses"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 200,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						"All",
						"Ongoing",
						"Completed",
						"My list"
					].map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => setTab(t),
						className: tab === t ? "bg-lilac text-violet" : "",
						children: t
					}, t, false, {
						fileName: _jsxFileName,
						lineNumber: 201,
						columnNumber: 113
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 201,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 199,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
				children: [shown.map((c) => {
					const p = enrolled[c.id];
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => setOpen({ id: c.id }),
						className: `rounded-2xl ${c.bg} p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md`,
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex justify-between font-semibold",
								children: [c.title, p === 100 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-4 w-4 text-success" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 209,
									columnNumber: 91
								}, this) : p !== void 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "rounded-full bg-card/70 px-2 text-[10px]",
									children: "Enrolled"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 209,
									columnNumber: 161
								}, this) : null]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 209,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: c.desc
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 210,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: [
									`${c.lessons} lessons`,
									c.duration,
									c.level
								].map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "rounded-full bg-card/70 px-2 py-0.5 text-[10px]",
									children: t
								}, t, false, {
									fileName: _jsxFileName,
									lineNumber: 211,
									columnNumber: 116
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 211,
								columnNumber: 17
							}, this),
							p !== void 0 && /* @__PURE__ */ (void 0)("div", {
								className: "mt-3 h-1.5 rounded-full bg-card/70",
								children: /* @__PURE__ */ (void 0)("div", {
									className: "h-full rounded-full bg-mint",
									style: { width: `${p}%` }
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 212,
									columnNumber: 89
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 212,
								columnNumber: 37
							}, this)
						]
					}, c.id, true, {
						fileName: _jsxFileName,
						lineNumber: 206,
						columnNumber: 18
					}, this);
				}), shown.length === 0 && /* @__PURE__ */ (void 0)("p", {
					className: "col-span-full py-6 text-center text-sm text-muted-foreground",
					children: "No courses here yet."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 217,
					columnNumber: 34
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 203,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 198,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "section-surface mt-6 border",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "mb-1 flex items-center gap-2 text-lg font-bold",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-5 w-5 text-violet" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 222,
							columnNumber: 72
						}, this),
						"Recommended for ",
						goal
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 222,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mb-4 text-xs text-muted-foreground",
					children: "Based on your career goal and skill gaps."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 223,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-4 md:grid-cols-3",
					children: [recs.map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col rounded-xl border bg-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setOpen({
								id: r.course.id,
								reason: r.reason
							}),
							className: "text-left",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "font-semibold",
								children: r.course.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 229,
								columnNumber: 37
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: r.reason
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 229,
								columnNumber: 86
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 226,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-auto flex gap-2 pt-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								size: "sm",
								variant: "outline",
								disabled: list.includes(r.course.id),
								onClick: () => {
									actions.addToList(r.course.id);
									toast("Added to your learning list");
								},
								children: list.includes(r.course.id) ? "In list" : "Add to list"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 231,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								size: "sm",
								onClick: () => setOpen({
									id: r.course.id,
									reason: r.reason
								}),
								children: "Details"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 235,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 230,
							columnNumber: 15
						}, this)]
					}, r.course.id, true, {
						fileName: _jsxFileName,
						lineNumber: 225,
						columnNumber: 26
					}, this)), recs.length === 0 && /* @__PURE__ */ (void 0)("p", {
						className: "text-sm text-muted-foreground",
						children: "You're enrolled in every recommended course."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 241,
						columnNumber: 33
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 224,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 221,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-6 grid gap-6 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "section-surface border",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "flex items-center gap-2 text-lg font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ClipboardCheck, { className: "h-5 w-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 247,
							columnNumber: 69
						}, this), "Mock tests"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 247,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mb-3 text-xs text-muted-foreground",
						children: "Timed quizzes. Your score updates your skill progress."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 248,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap gap-2",
						children: Object.keys(testBank).map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => {
								setSubject(s);
								setTestOpen(true);
							},
							children: s
						}, s, false, {
							fileName: _jsxFileName,
							lineNumber: 249,
							columnNumber: 81
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 249,
						columnNumber: 11
					}, this),
					tests.length > 0 && /* @__PURE__ */ (void 0)("ul", {
						className: "mt-4 space-y-1 text-xs text-muted-foreground",
						children: tests.slice(0, 4).map((t, i) => /* @__PURE__ */ (void 0)("li", { children: [
							t.subject,
							": ",
							/* @__PURE__ */ (void 0)("b", {
								className: "text-foreground",
								children: [
									t.score,
									"/",
									t.total
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 253,
								columnNumber: 151
							}, this),
							" · ",
							new Date(t.at).toLocaleDateString()
						] }, i, true, {
							fileName: _jsxFileName,
							lineNumber: 253,
							columnNumber: 126
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 253,
						columnNumber: 32
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 246,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "section-surface border",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "flex items-center gap-2 text-lg font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mic, { className: "h-5 w-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 256,
							columnNumber: 69
						}, this), "Try your Mock Interview"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 256,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mb-3 text-xs text-muted-foreground",
						children: "Answer role-specific questions one at a time and get AI feedback."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 257,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						onClick: () => setIvOpen(true),
						children: "Start mock interview"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 258,
						columnNumber: 11
					}, this),
					lastIv && /* @__PURE__ */ (void 0)("p", {
						className: "mt-4 text-xs text-muted-foreground",
						children: [
							"Last: ",
							lastIv.role,
							" (",
							lastIv.difficulty,
							") — ",
							/* @__PURE__ */ (void 0)("b", {
								className: "text-foreground",
								children: [lastIv.score, "%"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 259,
								columnNumber: 116
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 259,
						columnNumber: 22
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 255,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 245,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CourseDialog, {
			courseId: open?.id ?? null,
			reason: open?.reason,
			open: open !== null,
			onOpenChange: (o) => !o && setOpen(null)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 263,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MockTestDialog, {
			open: testOpen,
			initialSubject: subject,
			onOpenChange: (o) => {
				setTestOpen(o);
				if (!o) setSubject(void 0);
			}
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 264,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MockInterviewDialog, {
			open: ivOpen,
			onOpenChange: setIvOpen
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 268,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 197,
		columnNumber: 10
	}, this);
}
export { Learning as component };
