import { n as __toESM } from "../_runtime.mjs";
import { t as AppShell } from "./AppShell-Dtr34t6o.mjs";
import { c as courseById, d as jobs, f as readiness, h as usePathfinder, i as MockInterviewDialog, n as CourseDialog, o as StatusBadge, p as recommend, s as actions, u as goalSkills } from "./dialogs-BFb5juEv.mjs";
import { t as blob_default } from "./blob-C2oXkafd.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { E as MessageCircle, F as Folder, G as ChevronRight, L as EllipsisVertical, b as Play, h as Sparkles, m as Square, y as Plus } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/routes-CJdujZs8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var tile_default = "/assets/tile-FnTGXmeG.png";
var gem_default = "/assets/gem-Duh8pW0V.png";
var _jsxFileName = "/app/applet/src/routes/index.tsx?tsr-split=component";
var skillBars = [
	{
		name: "Frontend",
		c: "bg-mint"
	},
	{
		name: "Communication",
		c: "bg-violet"
	},
	{
		name: "Data Structures",
		c: "bg-sun"
	}
];
var imgs = [
	blob_default,
	tile_default,
	gem_default
];
function Card({ className = "", children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: `rounded-2xl border bg-card p-4 ${className}`,
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 30,
		columnNumber: 10
	}, this);
}
function Dashboard() {
	const st = usePathfinder((s) => s);
	const ready = readiness(st, goalSkills(st.goal));
	const recs = recommend(st.goal, st.skills, Object.keys(st.enrolled).filter((k) => st.enrolled[k] === 100)).slice(0, 3);
	const latestApp = st.applications[st.applications.length - 1];
	const feedJob = latestApp ? jobs.find((j) => j.id === latestApp.jobId) : [...jobs].sort((a, b) => b.match - a.match)[0];
	const ongoingId = Object.keys(st.enrolled).find((k) => st.enrolled[k] < 100);
	const ongoing = ongoingId ? courseById(ongoingId) : void 0;
	const ongoingPct = ongoingId ? st.enrolled[ongoingId] : 0;
	const [course, setCourse] = (0, import_react.useState)(null);
	const [iv, setIv] = (0, import_react.useState)(false);
	const [cv, setCv] = (0, import_react.useState)(null);
	const joined = st.groups.includes("Pathfinder Community");
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
			className: "mb-1 text-2xl font-bold",
			children: "Hello, Sneha 👋"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 49,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "mb-6 text-sm text-muted-foreground",
			children: [
				"Goal: ",
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/roadmap",
					className: "font-bold text-foreground",
					children: st.goal
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 50,
					columnNumber: 63
				}, this),
				" · ",
				ready,
				"% career-ready"
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 50,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-5 xl:grid-cols-[1fr_300px]",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-5 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex justify-between text-sm font-semibold",
								children: ["Lessons taken ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/learning",
									className: "rounded-full border px-2 text-xs font-normal",
									children: "Details"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 55,
									columnNumber: 89
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 55,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-6 flex items-end gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-6xl font-semibold",
										children: st.lessonsDone
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 57,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "mb-8 text-xs text-orange",
										children: "↑ 7%"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 58,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
										viewBox: "0 0 100 40",
										className: "mb-2 h-12 w-28",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("defs", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("linearGradient", {
												id: "g",
												x1: "0",
												x2: "0",
												y1: "0",
												y2: "1",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
													offset: "0",
													stopColor: "var(--orange)",
													stopOpacity: ".4"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 59,
													columnNumber: 127
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
													offset: "1",
													stopColor: "var(--orange)",
													stopOpacity: "0"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 59,
													columnNumber: 189
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 59,
												columnNumber: 76
											}, this) }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 59,
												columnNumber: 70
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
												d: "M0 38 L30 30 L55 8 L75 22 L100 18 L100 40 L0 40Z",
												fill: "url(#g)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 59,
												columnNumber: 274
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
												d: "M0 38 L30 30 L55 8 L75 22 L100 18",
												fill: "none",
												stroke: "var(--orange)",
												strokeWidth: "2"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 59,
												columnNumber: 350
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 59,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 56,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: "Lessons completed"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 61,
								columnNumber: 15
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 54,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-col",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-sm font-semibold",
										children: "Skill tracker"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 65,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "mt-auto",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-5xl font-semibold",
												children: [st.hours, "h"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 66,
												columnNumber: 42
											}, this),
											" ",
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-xs text-mint",
												children: "↑ 12%"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 66,
												columnNumber: 102
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 66,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-muted-foreground",
										children: "Hours spent learning"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 67,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 64,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-3",
								children: [skillBars.map((s) => {
									const v = st.skills[s.name] ?? 0;
									return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/skills",
										className: "block",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex justify-between text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: s.name }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 73,
												columnNumber: 67
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [v, "%"] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 73,
												columnNumber: 88
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 73,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "mt-1 h-2 rounded-full bg-muted",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: `h-2 rounded-full ${s.c} transition-all`,
												style: { width: `${v}%` }
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 74,
												columnNumber: 69
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 74,
											columnNumber: 21
										}, this)]
									}, s.name, true, {
										fileName: _jsxFileName,
										lineNumber: 72,
										columnNumber: 24
									}, this);
								}), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/skills",
									className: "block text-right text-xs text-link",
									children: [
										"+ view ",
										Math.max(0, Object.keys(st.skills).length - 3),
										" more skills"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 79,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 69,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 63,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 53,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-5 md:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-2xl bg-ink p-4 text-ink-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs opacity-70",
										children: "Job Feed"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 86,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/jobs",
										search: latestApp ? { app: feedJob.id } : { job: feedJob.id },
										className: "relative mt-3 block rounded-xl bg-card p-3 text-card-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "text-sm font-semibold",
												children: feedJob.title
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 92,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "mt-1 text-xs text-muted-foreground",
												children: [
													feedJob.company,
													" · ",
													latestApp ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatusBadge, { status: latestApp.status }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 93,
														columnNumber: 100
													}, this) : `${feedJob.match}% match`
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 93,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "mt-3 h-3 rounded bg-muted-foreground/40",
												style: { width: `${feedJob.match}%` }
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 94,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border bg-card p-1" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 97,
												columnNumber: 17
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 87,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/jobs",
										className: "mt-4 block w-full rounded-full bg-card/15 py-2 text-center text-xs",
										children: st.applications.length ? `${st.applications.length} application${st.applications.length > 1 ? "s" : ""} · view all` : "Tap on card to analyse"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 99,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 85,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
								className: "flex flex-col",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "grid h-8 w-8 place-items-center rounded-full bg-blush",
											children: "🎤"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 102,
											columnNumber: 56
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "rounded-full border px-2 text-xs",
											children: "» MOCK"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 102,
											columnNumber: 137
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 102,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-3 text-sm font-semibold",
										children: "Try our Mock Interview tool"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 103,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-muted-foreground",
										children: "Practise answers with live AI feedback"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 104,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: () => setIv(true),
										className: "mt-auto flex items-center justify-between pt-3 text-sm text-link",
										children: [
											st.interviews[0] ? `Start · last ${st.interviews[0].score}%` : "Start",
											" ",
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "h-5 w-5 rounded-full bg-lilac p-0.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 105,
												columnNumber: 201
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 105,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 101,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
								className: "text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-sm font-semibold",
										children: "Upload your CV"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 108,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-muted-foreground",
										children: "We'll review it and suggest next steps"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 109,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "mt-3 flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-link/40 bg-lilac/40 py-5 text-xs text-link",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Folder, { className: "mb-1 h-7 w-7 fill-link/70" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 111,
												columnNumber: 17
											}, this),
											" ",
											cv ?? "Drag & Drop file here",
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
												type: "file",
												accept: ".pdf,.doc,.docx",
												className: "hidden",
												onChange: (e) => {
													const f = e.target.files?.[0];
													if (f) {
														setCv(f.name);
														toast.success("CV uploaded", { description: "Ask the AI Assistant for a review and next steps." });
													}
												}
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 112,
												columnNumber: 17
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 110,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 107,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 84,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mb-3 flex justify-between text-sm font-semibold",
						children: ["Course Recommendations ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/learning",
							className: "text-xs font-normal text-link",
							children: "View all"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 126,
							columnNumber: 101
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 126,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-5 md:grid-cols-3",
						children: recs.map(({ course: c, reason }, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setCourse({
								id: c.id,
								reason
							}),
							className: `rounded-2xl ${c.bg} p-4 text-left transition hover:-translate-y-0.5`,
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
									src: imgs[i % 3],
									alt: "",
									width: 816,
									height: 816,
									loading: "lazy",
									className: "mx-auto h-24 w-24 object-contain"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 135,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-2 flex justify-between font-semibold",
									children: [c.title, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EllipsisVertical, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 136,
										columnNumber: 85
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 136,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-muted-foreground",
									children: c.desc
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 137,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-3 flex gap-2",
									children: [`${c.lessons} lessons`, st.enrolled[c.id] !== void 0 ? `${st.enrolled[c.id]}% done` : c.level].map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "rounded-full bg-card/70 px-2 py-0.5 text-[10px]",
										children: t
									}, t, false, {
										fileName: _jsxFileName,
										lineNumber: 138,
										columnNumber: 161
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 138,
									columnNumber: 19
								}, this)
							]
						}, c.id, true, {
							fileName: _jsxFileName,
							lineNumber: 131,
							columnNumber: 22
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 127,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 125,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 52,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calendar, { interviews: st.applications.filter((a) => a.interview?.date).map((a) => a.interview.date) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 145,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mb-2 flex justify-between text-sm font-semibold",
						children: ["Upcoming Lessons ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/learning",
							className: "text-xs font-normal text-link",
							children: "View all"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 147,
							columnNumber: 95
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 147,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "grid h-8 w-8 place-items-center rounded-lg bg-lilac text-xs font-bold",
								children: ongoing?.title[0] ?? "+"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 149,
								columnNumber: 53
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EllipsisVertical, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 149,
								columnNumber: 174
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 149,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => ongoing && setCourse({ id: ongoing.id }),
							className: "block text-left",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-3 text-lg font-semibold",
								children: ongoing?.title ?? "No ongoing course"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 152,
								columnNumber: 45
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: ongoing?.desc ?? "Enroll in a course from Learning"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 153,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 150,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-3 flex justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ongoing ? `${Math.round(ongoingPct / 100 * ongoing.lessons)} of ${ongoing.lessons}` : "0 of 0" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 154,
								columnNumber: 66
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [ongoingPct, "%"] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 154,
								columnNumber: 175
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 154,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-1 h-2 rounded-full bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "h-2 rounded-full bg-mint transition-all",
								style: { width: `${ongoingPct}%` }
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 155,
								columnNumber: 63
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 155,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-4 flex items-center gap-2 rounded-full bg-ink p-1 text-ink-foreground",
							children: [
								ongoing ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									className: "flex-1 pl-3 text-left text-xs",
									onClick: () => setCourse({ id: ongoing.id }),
									children: "Join lesson"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 159,
									columnNumber: 28
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/learning",
									className: "flex-1 pl-3 text-xs",
									children: "Browse courses"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 161,
									columnNumber: 42
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									"aria-label": "Complete lesson",
									disabled: !ongoing,
									onClick: () => {
										if (ongoing) {
											actions.progressCourse(ongoing.id, Math.ceil(100 / ongoing.lessons), ongoing.skills, 1);
											toast.success("Lesson completed", { description: ongoing.title });
										}
									},
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Play, { className: "h-7 w-7 rounded-full bg-card/15 p-1.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 169,
										columnNumber: 18
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 162,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/learning",
									"aria-label": "All courses",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Square, { className: "h-7 w-7 rounded-full bg-card/15 p-2" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 170,
										columnNumber: 63
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 170,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/assistant",
									"aria-label": "Ask assistant",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { className: "h-7 w-7 rounded-full bg-card/15 p-1.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 171,
										columnNumber: 66
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 171,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 158,
							columnNumber: 15
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 148,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 146,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/learning",
						className: "block",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
							className: "ai-ring",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "flex items-center gap-1 text-sm font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-4 w-4 text-violet" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 176,
									columnNumber: 74
								}, this), " AI Insight"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 176,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: recs[0] ? recs[0].reason : "You're on track — keep practising with mock tests."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 177,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 175,
							columnNumber: 50
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 175,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/networking",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-2xl font-semibold",
								children: joined ? "1351+" : "1350+"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 180,
								columnNumber: 36
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: "Students in our community"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 180,
								columnNumber: 106
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 180,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => {
								actions.toggleGroup("Pathfinder Community");
								toast(joined ? "Left the community" : "Joined the community");
							},
							className: "flex h-8 items-center gap-1 rounded-full border px-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "h-3 w-3" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 184,
								columnNumber: 87
							}, this), joined ? "Joined" : "Join"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 181,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 179,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 144,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 51,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CourseDialog, {
			courseId: course?.id ?? null,
			reason: course?.reason,
			open: course !== null,
			onOpenChange: (o) => !o && setCourse(null)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 188,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MockInterviewDialog, {
			open: iv,
			onOpenChange: setIv
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 189,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 48,
		columnNumber: 10
	}, this);
}
function Calendar({ interviews }) {
	const days = Array.from({ length: 35 }, (_, i) => i - 3);
	const marked = [
		7,
		10,
		17,
		22,
		24,
		29,
		...interviews.filter((d) => d.startsWith("2026-10")).map((d) => Number(d.slice(8)))
	];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mb-3 flex justify-between text-sm font-semibold",
		children: ["October 2026 ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "rounded-full border px-2 text-xs font-normal",
			children: "Jan ▾"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 203,
			columnNumber: 85
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 203,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid grid-cols-7 gap-y-2 text-center text-xs",
		children: [[
			"S",
			"M",
			"T",
			"W",
			"T",
			"F",
			"S"
		].map((d, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "text-muted-foreground",
			children: d
		}, i, false, {
			fileName: _jsxFileName,
			lineNumber: 205,
			columnNumber: 60
		}, this)), days.map((d) => {
			const n = d < 1 ? 30 + d : d > 31 ? d - 31 : d;
			return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: `mx-auto grid h-7 w-7 place-items-center rounded-full ${d < 1 || d > 31 ? "text-muted-foreground/50" : ""} ${marked.includes(d) ? "bg-ink text-ink-foreground" : ""} ${d === 31 ? "border border-ink" : ""}`,
				children: n
			}, d, false, {
				fileName: _jsxFileName,
				lineNumber: 209,
				columnNumber: 16
			}, this);
		})]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 204,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 202,
		columnNumber: 10
	}, this);
}
export { Dashboard as component };
