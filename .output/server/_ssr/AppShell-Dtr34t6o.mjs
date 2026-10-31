import { n as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { A as LifeBuoy, C as Moon, E as MessageCircle, P as GraduationCap, Z as BriefcaseBusiness, g as Settings, h as Sparkles, i as Users, j as LayoutGrid, k as Lightbulb, p as Sun, tt as Bell, v as Search, w as MoonStar } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/AppShell-Dtr34t6o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var shapes_default = "/assets/shapes-CG5F2UXs.png";
var _jsxFileName = "/app/applet/src/components/AppShell.tsx";
var nav = [
	{
		to: "/",
		label: "Dashboard",
		icon: LayoutGrid
	},
	{
		to: "/assistant",
		label: "AI Assistant",
		icon: MessageCircle
	},
	{
		to: "/roadmap",
		label: "Explore Careers",
		icon: Search
	},
	{
		to: "/skills",
		label: "My Skills",
		icon: Lightbulb
	},
	{
		to: "/jobs",
		label: "Job Board",
		icon: BriefcaseBusiness
	},
	{
		to: "/learning",
		label: "Learning",
		icon: GraduationCap
	},
	{
		to: "/networking",
		label: "Networking",
		icon: Users
	}
];
function AppShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen p-3 md:p-8",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto flex max-w-[1400px] overflow-hidden rounded-3xl bg-background shadow-soft",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
				className: "hidden w-60 shrink-0 flex-col bg-sidebar p-5 lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mb-8 flex items-center gap-2 font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "grid h-7 w-7 place-items-center rounded-lg bg-ink text-xs text-ink-foreground",
							children: "P"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 25,
							columnNumber: 13
						}, this), "Pathfinder"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 24,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
						className: "space-y-1",
						children: nav.map((n, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: n.to,
							activeOptions: { exact: true },
							className: "flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-foreground/80 hover:bg-card/60",
							activeProps: n.to !== "/" || i === 0 ? { className: "bg-card font-semibold text-foreground" } : {},
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(n.icon, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 37,
									columnNumber: 17
								}, this),
								" ",
								n.label
							]
						}, i, true, {
							fileName: _jsxFileName,
							lineNumber: 30,
							columnNumber: 15
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 28,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative mt-auto rounded-2xl bg-card/70 p-4 pt-20 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								src: shapes_default,
								alt: "",
								width: 816,
								height: 816,
								loading: "lazy",
								className: "absolute -top-10 left-1/2 w-32 -translate-x-1/2"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 42,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "font-bold",
								children: "Upgrade to Pro"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 43,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Unlock mock interviews and AI roadmaps"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 44,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "mt-2 inline-block rounded-full bg-butter px-2 py-0.5 text-[10px] font-semibold",
								children: "Free for 1 month"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 45,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								className: "mt-3 w-full rounded-full bg-ink py-2 text-xs font-semibold text-ink-foreground",
								children: "Upgrade now"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 46,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 41,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-5 space-y-2 text-sm text-foreground/80",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "flex items-center gap-3 px-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LifeBuoy, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 49,
								columnNumber: 57
							}, this), " Support Center"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 49,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "flex items-center gap-3 px-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Settings, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 50,
								columnNumber: 57
							}, this), " Settings"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 50,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 48,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 23,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
				className: "min-w-0 flex-1 p-5 md:p-7",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
					className: "mb-6 flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex w-full max-w-xs items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 56,
								columnNumber: 15
							}, this), " Search careers, skills…"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 55,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/assistant",
							className: "ai-ring flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold",
							children: ["AI Assistant ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-3.5 w-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 59,
								columnNumber: 28
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 58,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "ml-auto flex items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeToggle, {}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 62,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bell, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 63,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "grid h-9 w-9 place-items-center rounded-full bg-sun font-bold",
									children: "S"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 64,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 61,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 54,
					columnNumber: 11
				}, this), children]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 53,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 22,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 21,
		columnNumber: 5
	}, this);
}
var modes = [
	"light",
	"dark",
	"night"
];
function applyMode(m) {
	const el = document.documentElement;
	el.classList.toggle("dark", m !== "light");
	el.classList.toggle("night", m === "night");
}
function ThemeToggle() {
	const [mode, setMode] = (0, import_react.useState)("light");
	(0, import_react.useEffect)(() => {
		const saved = localStorage.getItem("theme-mode");
		if (saved && modes.includes(saved)) {
			setMode(saved);
			applyMode(saved);
		}
	}, []);
	const next = () => {
		const m = modes[(modes.indexOf(mode) + 1) % modes.length];
		setMode(m);
		applyMode(m);
		localStorage.setItem("theme-mode", m);
	};
	const Icon = mode === "light" ? Sun : mode === "dark" ? Moon : MoonStar;
	const label = mode === "light" ? "Light mode" : mode === "dark" ? "Dark mode" : "Night mode";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		onClick: next,
		"aria-label": `${label} – click to switch`,
		title: label,
		className: "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition hover:bg-muted",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-4 w-4" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 95,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "hidden sm:inline",
			children: label.replace(" mode", "")
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 95,
			columnNumber: 35
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 94,
		columnNumber: 5
	}, this);
}
export { AppShell as t };
