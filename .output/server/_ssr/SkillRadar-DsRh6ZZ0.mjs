import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/SkillRadar-DsRh6ZZ0.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/SkillRadar.tsx";
function SkillRadar({ compact = false, development = false }) {
	const rings = [
		1,
		.8,
		.6,
		.4,
		.2
	];
	const point = (i, r) => `${160 + Math.sin(i * Math.PI / 3) * 105 * r},${150 - Math.cos(i * Math.PI / 3) * 105 * r}`;
	const values = development ? [
		.8,
		.65,
		.6,
		.75,
		.9,
		.65
	] : [
		.84,
		.58,
		.37,
		.32,
		.92,
		.74
	];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		viewBox: "0 0 320 300",
		className: compact ? "mx-auto w-full max-w-72" : "mx-auto w-full max-w-96",
		role: "img",
		"aria-label": development ? "Current, theoretical and expected skill comparison" : "Skill graph: research 84, content 58, leadership 37, product thinking 32, visual design 92, interaction 74",
		children: [
			rings.map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("polygon", {
				points: Array.from({ length: 6 }, (_, i) => point(i, r)).join(" "),
				fill: "none",
				stroke: "var(--border)",
				strokeWidth: "2"
			}, r, false, {
				fileName: _jsxFileName,
				lineNumber: 7,
				columnNumber: 21
			}, this)),
			Array.from({ length: 6 }, (_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", {
				x1: "160",
				y1: "150",
				x2: point(i, 1).split(",")[0],
				y2: point(i, 1).split(",")[1],
				stroke: "var(--border)"
			}, i, false, {
				fileName: _jsxFileName,
				lineNumber: 8,
				columnNumber: 42
			}, this)),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("polygon", {
				points: values.map((r, i) => point(i, r)).join(" "),
				fill: development ? "var(--chart-green)" : "var(--violet)",
				fillOpacity: ".3",
				stroke: development ? "var(--chart-green)" : "var(--violet)",
				strokeWidth: "3"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 9,
				columnNumber: 5
			}, this),
			development ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("polygon", {
				points: [
					.28,
					.15,
					.35,
					.3,
					.85,
					.2
				].map((r, i) => point(i, r)).join(" "),
				fill: "var(--chart-cyan)",
				fillOpacity: ".35",
				stroke: "var(--chart-cyan)",
				strokeWidth: "2"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 10,
				columnNumber: 20
			}, this) : values.map((r, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
				cx: point(i, r).split(",")[0],
				cy: point(i, r).split(",")[1],
				r: "5",
				fill: "var(--violet)",
				stroke: "var(--card)",
				strokeWidth: "2"
			}, i, false, {
				fileName: _jsxFileName,
				lineNumber: 10,
				columnNumber: 204
			}, this)),
			(development ? [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6"
			] : [
				"RES 84",
				"CON 58",
				"LEA 37",
				"PT 32",
				"VIS 92",
				"INT 74"
			]).map((label, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", {
				x: point(i, 1.22).split(",")[0],
				y: Number(point(i, 1.22).split(",")[1]) + 4,
				textAnchor: "middle",
				fill: "var(--foreground)",
				fontSize: "10",
				children: label
			}, i, false, {
				fileName: _jsxFileName,
				lineNumber: 11,
				columnNumber: 130
			}, this))
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 6,
		columnNumber: 10
	}, this);
}
export { SkillRadar as t };
