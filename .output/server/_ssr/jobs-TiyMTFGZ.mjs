import { n as __toESM } from "../_runtime.mjs";
import { t as AppShell } from "./AppShell-Dtr34t6o.mjs";
import { t as Button } from "./button-BntFxScC.mjs";
import { d as jobs, h as usePathfinder, o as StatusBadge, r as JobDialog, s as actions, t as ApplicationDialog } from "./dialogs-BFb5juEv.mjs";
import { r as Route$4 } from "./router-DW38PKps.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { $ as BookmarkCheck, D as MapPin, M as IndianRupee, Q as Bookmark, X as Building2, h as Sparkles, v as Search, z as Clock } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/jobs-TiyMTFGZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/jobs.tsx?tsr-split=component";
var filters = [
	"All",
	"Full-time",
	"Internship",
	"Contract",
	"Part-time",
	"Saved",
	"Applied"
];
function Jobs() {
	const search = Route$4.useSearch();
	const [q, setQ] = (0, import_react.useState)("");
	const [f, setF] = (0, import_react.useState)("All");
	const [openJob, setOpenJob] = (0, import_react.useState)(search.job ?? null);
	const [openApp, setOpenApp] = (0, import_react.useState)(search.app ?? null);
	const saved = usePathfinder((s) => s.savedJobs);
	const applications = usePathfinder((s) => s.applications);
	const isApp = (id) => applications.some((a) => a.jobId === id);
	const list = jobs.filter((j) => (f === "All" || j.type === f || f === "Saved" && saved.includes(j.id) || f === "Applied" && isApp(j.id)) && `${j.title} ${j.company} ${j.location} ${j.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-5 flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "text-xl font-bold",
				children: "Job Board"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 22,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "flex items-center gap-2 text-xs text-violet",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-4 w-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 23,
					columnNumber: 71
				}, this), "Matched to your skills · sample listings"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 23,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 21,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "section-surface border",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-5 flex flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
					className: "flex min-w-60 flex-1 items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "h-4 w-4 text-muted-foreground" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 28,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search roles, companies, skills…",
						className: "w-full bg-transparent outline-none"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 29,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 27,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap gap-2",
					children: filters.map((x) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => setF(x),
						className: f === x ? "bg-lilac text-violet" : "",
						children: x
					}, x, false, {
						fileName: _jsxFileName,
						lineNumber: 32,
						columnNumber: 31
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 31,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 26,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
				children: [list.map((j) => {
					const isSaved = saved.includes(j.id);
					const app = applications.find((a) => a.jobId === j.id);
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
						role: "button",
						tabIndex: 0,
						"aria-label": `View ${j.title} at ${j.company}`,
						onClick: () => setOpenJob(j.id),
						onKeyDown: (e) => e.key === "Enter" && setOpenJob(j.id),
						className: "flex cursor-pointer flex-col rounded-2xl border bg-card p-4 transition hover:-translate-y-0.5 hover:shadow-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mb-3 flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: `flex h-11 w-11 items-center justify-center rounded-xl ${j.color}`,
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Building2, { className: "h-5 w-5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 41,
										columnNumber: 104
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 41,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									"aria-label": "Save job",
									onClick: (e) => {
										e.stopPropagation();
										actions.toggleSave(j.id);
									},
									className: "text-muted-foreground hover:text-violet",
									children: isSaved ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookmarkCheck, { className: "h-5 w-5 text-violet" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 46,
										columnNumber: 32
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bookmark, { className: "h-5 w-5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 46,
										columnNumber: 84
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 42,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 40,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "font-semibold",
								children: j.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 49,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: j.company
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 50,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-3 flex flex-wrap gap-3 text-[11px] text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPin, { className: "h-3 w-3" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 52,
											columnNumber: 61
										}, this), j.location]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 52,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IndianRupee, { className: "h-3 w-3" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 53,
											columnNumber: 61
										}, this), j.salary.replace("₹", "")]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 53,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "h-3 w-3" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 54,
											columnNumber: 61
										}, this), j.posted]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 54,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 51,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-3 flex flex-wrap gap-1.5",
								children: j.tags.map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "rounded-full bg-muted px-2 py-0.5 text-[10px]",
									children: t
								}, t, false, {
									fileName: _jsxFileName,
									lineNumber: 57,
									columnNumber: 36
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 56,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4 flex items-center justify-between gap-3 border-t pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-[10px] text-muted-foreground",
										children: ["AI match ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", {
											className: "text-success",
											children: [j.match, "%"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 61,
											columnNumber: 79
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 61,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "mt-1 h-1.5 rounded-full bg-muted",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "h-full rounded-full bg-success",
											style: { width: `${j.match}%` }
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 62,
											columnNumber: 71
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 62,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 60,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									size: "sm",
									onClick: (e) => {
										e.stopPropagation();
										if (app) setOpenApp(j.id);
										else setOpenJob(j.id);
									},
									children: app ? app.status : "Apply"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 66,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 59,
								columnNumber: 17
							}, this)
						]
					}, j.id, true, {
						fileName: _jsxFileName,
						lineNumber: 39,
						columnNumber: 18
					}, this);
				}), list.length === 0 && /* @__PURE__ */ (void 0)("p", {
					className: "col-span-full py-10 text-center text-sm text-muted-foreground",
					children: "No jobs match your search."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 73,
					columnNumber: 33
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 35,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 25,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "section-surface mt-5 border",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "mb-3 font-semibold",
				children: ["My applications ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-xs font-normal text-muted-foreground",
					children: [
						"· ",
						applications.length,
						" total · demo tracker, update statuses yourself"
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 78,
					columnNumber: 60
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 78,
				columnNumber: 9
			}, this), applications.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm text-muted-foreground",
				children: "You haven't applied yet. Open a job and tap Apply."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 79,
				columnNumber: 38
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
				className: "space-y-2",
				children: applications.map((a) => {
					const j = jobs.find((x) => x.id === a.jobId);
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => setOpenApp(a.jobId),
						className: "flex w-full items-center gap-3 rounded-xl border bg-card p-3 text-left transition hover:bg-muted/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: `flex h-9 w-9 items-center justify-center rounded-lg ${j.color}`,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Building2, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 84,
									columnNumber: 104
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 84,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "block text-sm font-medium",
									children: j.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 85,
									columnNumber: 54
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[11px] text-muted-foreground",
									children: [
										j.company,
										" · applied ",
										new Date(a.appliedAt).toLocaleDateString(),
										a.interview?.date ? ` · interview ${a.interview.date} ${a.interview.time}` : ""
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 85,
									columnNumber: 114
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 85,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatusBadge, { status: a.status }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 86,
								columnNumber: 21
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 83,
						columnNumber: 19
					}, this) }, a.jobId, false, {
						fileName: _jsxFileName,
						lineNumber: 82,
						columnNumber: 18
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 79,
				columnNumber: 140
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 77,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(JobDialog, {
			jobId: openJob,
			open: openJob !== null,
			onOpenChange: (o) => !o && setOpenJob(null)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 93,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ApplicationDialog, {
			jobId: openApp,
			open: openApp !== null,
			onOpenChange: (o) => !o && setOpenApp(null)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 94,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 20,
		columnNumber: 10
	}, this);
}
export { Jobs as component };
