import { t as AppShell } from "./AppShell-Dtr34t6o.mjs";
import { t as Button } from "./button-BntFxScC.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/SectionShell-BA8J0Nr7.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/SectionShell.tsx";
function SectionShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
		"aria-label": "Career sections",
		className: "mb-6 flex flex-wrap gap-2",
		children: [
			{
				to: "/interviews",
				label: "Interviews"
			},
			{
				to: "/roadmap",
				label: "My Roadmaps"
			},
			{
				to: "/learning",
				label: "My development"
			},
			{
				to: "/skills",
				label: "Assessment Report"
			}
		].map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			asChild: true,
			variant: "outline",
			size: "sm",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: item.to,
				activeProps: { className: "bg-lilac text-violet" },
				children: item.label
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 8,
				columnNumber: 267
			}, this)
		}, item.to, false, {
			fileName: _jsxFileName,
			lineNumber: 8,
			columnNumber: 209
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 7,
		columnNumber: 20
	}, this), children] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 7,
		columnNumber: 10
	}, this);
}
export { SectionShell as t };
