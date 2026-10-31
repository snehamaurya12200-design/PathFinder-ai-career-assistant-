import { n as __toESM } from "../_runtime.mjs";
import { t as AppShell } from "./AppShell-Dtr34t6o.mjs";
import { t as blob_default } from "./blob-C2oXkafd.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { I as FileText, T as Mic, _ as SendHorizontal, h as Sparkles, o as UserPen } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/assistant-CaljgvGk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/assistant.tsx?tsr-split=component";
var chips = [
	"Explore careers",
	"Skill gaps",
	"Mock interview",
	"Build roadmap",
	"Resume tips",
	"Internships"
];
function Assistant() {
	const [listening, setListening] = (0, import_react.useState)(false);
	const [msgs, setMsgs] = (0, import_react.useState)([{
		me: false,
		t: "Hi Sneha! Want me to review your CV and suggest your next best step?"
	}, {
		me: true,
		t: "Yes, I want to become a frontend developer."
	}]);
	const [text, setText] = (0, import_react.useState)("");
	const send = (t) => {
		if (!t.trim()) return;
		setMsgs((m) => [
			...m,
			{
				me: true,
				t
			},
			{
				me: false,
				t: "Great — tell me which skills you already have, and I'll map the gaps."
			}
		]);
		setText("");
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "relative mx-auto max-w-2xl overflow-hidden rounded-3xl border bg-card p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
				src: blob_default,
				alt: "",
				width: 816,
				height: 816,
				className: "pointer-events-none absolute -right-10 -top-10 w-40 opacity-80"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 29,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "text-3xl font-bold leading-tight",
				children: [
					"Hello",
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 30,
						columnNumber: 63
					}, this),
					"Sneha"
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 30,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "flex items-center gap-1 rounded-full bg-lilac px-3 py-1 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { className: "h-3 w-3" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 32,
						columnNumber: 93
					}, this), "Course material"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 32,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "flex items-center gap-1 rounded-full bg-lilac px-3 py-1 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserPen, { className: "h-3 w-3" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 33,
						columnNumber: 93
					}, this), "My profile"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 33,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 31,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-6 space-y-3",
				children: msgs.map((m, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: `flex gap-2 ${m.me ? "justify-end" : ""}`,
					children: [!m.me && /* @__PURE__ */ (void 0)(Sparkles, { className: "mt-1 h-4 w-4 shrink-0 text-violet" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 37,
						columnNumber: 25
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: `max-w-[75%] rounded-2xl px-4 py-2 text-sm ${m.me ? "bg-lilac" : ""}`,
						children: m.t
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 38,
						columnNumber: 15
					}, this)]
				}, i, true, {
					fileName: _jsxFileName,
					lineNumber: 36,
					columnNumber: 31
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 35,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-6 text-center text-xs text-muted-foreground",
				children: "Use tags for better assistance"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 41,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-2 flex flex-wrap justify-center gap-2",
				children: chips.map((c, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => send(c),
					className: `rounded-full px-3 py-1 text-xs ${[
						"bg-lilac",
						"bg-blush",
						"bg-butter"
					][i % 3]}`,
					children: c
				}, c, false, {
					fileName: _jsxFileName,
					lineNumber: 43,
					columnNumber: 32
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 42,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-5 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => setListening((l) => !l),
					"aria-label": "Voice input",
					className: `grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-ink-foreground ${listening ? "pulse-ring" : ""}`,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mic, { className: "h-5 w-5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 46,
						columnNumber: 212
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 46,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						send(text);
					},
					className: "ai-ring flex flex-1 items-center rounded-full px-4 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						value: text,
						onChange: (e) => setText(e.target.value),
						placeholder: listening ? "Listening…" : "Ask me anything…",
						className: "flex-1 bg-transparent text-sm outline-none"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 51,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "submit",
						"aria-label": "Send",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SendHorizontal, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 52,
							columnNumber: 53
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 52,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 47,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 45,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 28,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 27,
		columnNumber: 10
	}, this);
}
export { Assistant as component };
