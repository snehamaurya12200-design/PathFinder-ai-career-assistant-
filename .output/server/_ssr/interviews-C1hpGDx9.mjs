import { n as __toESM } from "../_runtime.mjs";
import { t as SectionShell } from "./SectionShell-BA8J0Nr7.mjs";
import { t as Button } from "./button-BntFxScC.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { K as ChevronLeft, S as NotebookPen, U as CircleDot, W as CircleCheck, a as UserRound, f as Target, h as Sparkles, k as Lightbulb, tt as Bell, u as TriangleAlert } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/interviews-C1hpGDx9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var interview_call_jpg_asset_default = {
	version: 1,
	asset_id: "6770ac51-d1e7-43ff-b877-1dc5e4409a8e",
	project_id: "8986ea04-752f-406b-86ad-f779e4b7a1fe",
	url: "/__l5e/assets-v1/6770ac51-d1e7-43ff-b877-1dc5e4409a8e/interview-call.jpg",
	r2_key: "a/v1/8986ea04-752f-406b-86ad-f779e4b7a1fe/6770ac51-d1e7-43ff-b877-1dc5e4409a8e/interview-call.jpg",
	original_filename: "interview-call.jpg",
	size: 43883,
	content_type: "image/jpeg",
	created_at: "2026-10-31T12:21:47Z"
};
var _jsxFileName = "/app/applet/src/routes/interviews.tsx?tsr-split=component";
var breakdown = [
	{
		label: "Technical",
		value: 20,
		color: "var(--chart-cyan)"
	},
	{
		label: "Clarity",
		value: 10,
		color: "var(--chart-green)"
	},
	{
		label: "Emotion",
		value: 15,
		color: "var(--sun)"
	},
	{
		label: "Communication",
		value: 25,
		color: "var(--chart-pink)"
	},
	{
		label: "Confidence",
		value: 30,
		color: "var(--chart-blue)"
	}
];
function Donut() {
	const r = 60, c = 2 * Math.PI * r, gap = 6;
	let offset = 0;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		viewBox: "0 0 160 160",
		className: "h-40 w-40",
		children: breakdown.map((s) => {
			const len = s.value / 100 * c - gap;
			const el = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
				cx: "80",
				cy: "80",
				r,
				fill: "none",
				stroke: s.color,
				strokeWidth: "16",
				strokeLinecap: "round",
				strokeDasharray: `${len} ${c}`,
				strokeDashoffset: -offset,
				transform: "rotate(-90 80 80)"
			}, s.label, false, {
				fileName: _jsxFileName,
				lineNumber: 35,
				columnNumber: 18
			}, this);
			offset += s.value / 100 * c;
			return el;
		})
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 32,
		columnNumber: 10
	}, this);
}
function Interviews() {
	const [moveOn, setMoveOn] = (0, import_react.useState)("yes");
	const recs = [
		Lightbulb,
		Target,
		UserRound,
		NotebookPen
	];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionShell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "rounded-2xl bg-interview-panel p-5",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-5 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "outline",
					size: "icon",
					"aria-label": "Back",
					className: "h-8 w-8 bg-card",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronLeft, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 48,
						columnNumber: 97
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 48,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-sm font-semibold",
					children: "Interview for UI/UX designer"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 49,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 47,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bell, { className: "h-5 w-5 text-destructive" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 52,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "rounded-full border bg-card px-6 py-1.5 text-xs font-semibold",
					children: "Yelena"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 53,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 51,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 46,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-4 lg:grid-cols-[1fr_260px]",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative overflow-hidden rounded-2xl",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: interview_call_jpg_asset_default.url,
						alt: "Interview video call",
						className: "h-64 w-full object-cover"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 60,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 59,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-4 md:grid-cols-[1fr_1.5fr]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl bg-card p-4 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "text-xs font-semibold",
								children: "AI interview score"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 65,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mx-auto my-4 flex h-28 w-28 items-center justify-center rounded-full border-[6px] border-interview-blue",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-3xl font-extrabold text-interview-blue",
									children: "78%"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 67,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 66,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-left text-[11px] text-muted-foreground",
								children: "Good – mostly ready, a few areas to improve"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 69,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-3 flex items-center gap-2 text-[11px]",
								children: ["Move forward?", ["yes", "no"].map((v) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => setMoveOn(v),
									className: `rounded-full px-3 py-0.5 capitalize ${moveOn === v ? "bg-violet text-primary-foreground" : "bg-muted"}`,
									children: v
								}, v, false, {
									fileName: _jsxFileName,
									lineNumber: 72,
									columnNumber: 54
								}, this))]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 70,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 64,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl bg-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mx-auto mb-2 w-fit rounded-full bg-muted px-4 py-1 text-xs font-semibold",
							children: "AI Score Breakdown"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 76,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
									className: "space-y-3 text-[11px]",
									children: breakdown.slice(0, 1).concat(breakdown.slice(4)).map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
										s.label,
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 78,
											columnNumber: 143
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", { children: [s.value, "%"] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 78,
											columnNumber: 149
										}, this)
									] }, s.label, true, {
										fileName: _jsxFileName,
										lineNumber: 78,
										columnNumber: 116
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 78,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Donut, {}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 79,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
									className: "space-y-3 text-right text-[11px]",
									children: breakdown.slice(1, 4).map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
										s.label,
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 80,
											columnNumber: 127
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", { children: [s.value, "%"] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 80,
											columnNumber: 133
										}, this)
									] }, s.label, true, {
										fileName: _jsxFileName,
										lineNumber: 80,
										columnNumber: 100
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 80,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 77,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 75,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 63,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 58,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-2xl bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "mx-auto mb-4 w-fit rounded-full bg-muted px-3 py-1 text-xs font-semibold",
						children: "Practice recommendation"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 88,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-2 gap-4",
						children: recs.map((Icon, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							className: "flex aspect-square items-center justify-center rounded-xl bg-muted shadow-sm transition hover:-translate-y-0.5",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: `h-8 w-8 ${[
								"text-sun",
								"text-destructive",
								"text-interview-blue",
								"text-violet"
							][i]}` }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 91,
								columnNumber: 21
							}, this)
						}, i, false, {
							fileName: _jsxFileName,
							lineNumber: 90,
							columnNumber: 40
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 89,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 87,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-2xl bg-card p-4 text-[11px]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "mb-3 flex items-center gap-2 text-sm font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-4 w-4 text-violet" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 96,
							columnNumber: 80
						}, this), "AI Insights"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 96,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-4 w-4 shrink-0 text-success" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 98,
									columnNumber: 43
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", { children: "Strength Insight" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 98,
										columnNumber: 106
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 98,
										columnNumber: 129
									}, this),
									"You maintained strong confidence during technical questions."
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 98,
									columnNumber: 100
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 98,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TriangleAlert, { className: "h-4 w-4 shrink-0 text-sun" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 99,
									columnNumber: 43
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", { children: "Improvement" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 99,
										columnNumber: 104
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 99,
										columnNumber: 122
									}, this),
									"Confidence dropped slightly during behavioral questions."
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 99,
									columnNumber: 98
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 99,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleDot, { className: "h-4 w-4 shrink-0 text-destructive" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 100,
									columnNumber: 43
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", { children: "Actionable Recommendation" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 100,
										columnNumber: 108
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 100,
										columnNumber: 140
									}, this),
									"Practice answering behavioral questions using the ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", {
										className: "text-orange",
										children: "STAR"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 100,
										columnNumber: 196
									}, this),
									" method for clearer structure."
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 100,
									columnNumber: 102
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 100,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 97,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 95,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 86,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 57,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 45,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 44,
		columnNumber: 10
	}, this);
}
export { Interviews as component };
