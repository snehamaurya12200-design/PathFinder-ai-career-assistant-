import { n as __toESM } from "../_runtime.mjs";
import { t as AppShell } from "./AppShell-Dtr34t6o.mjs";
import { t as Button } from "./button-BntFxScC.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { D as MapPin, E as MessageCircle, Y as CalendarDays, c as UserCheck, h as Sparkles, i as Users, r as Video, s as UserPlus, v as Search } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/networking-B85VVEbv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/networking.tsx?tsr-split=component";
var people = [
	{
		id: 1,
		name: "Ananya Rao",
		role: "Senior UX Designer",
		company: "Voxa",
		mutual: 12,
		mentor: true,
		color: "bg-lilac"
	},
	{
		id: 2,
		name: "Rahul Mehta",
		role: "Frontend Engineer",
		company: "Nimbus Labs",
		mutual: 8,
		mentor: false,
		color: "bg-mint"
	},
	{
		id: 3,
		name: "Priya Shah",
		role: "Product Manager",
		company: "Brightpath",
		mutual: 5,
		mentor: true,
		color: "bg-butter"
	},
	{
		id: 4,
		name: "Arjun Nair",
		role: "Design Lead",
		company: "Kite Health",
		mutual: 15,
		mentor: true,
		color: "bg-blush"
	},
	{
		id: 5,
		name: "Sneha Iyer",
		role: "React Developer",
		company: "Pixelcraft",
		mutual: 3,
		mentor: false,
		color: "bg-lilac"
	},
	{
		id: 6,
		name: "Karan Verma",
		role: "Data Analyst",
		company: "Orbit Studio",
		mutual: 6,
		mentor: false,
		color: "bg-mint"
	}
];
var events = [
	{
		id: 1,
		title: "Portfolio Review Night",
		date: "Nov 6 · 7:00 PM",
		place: "Online",
		icon: Video
	},
	{
		id: 2,
		title: "Frontend Meetup Bengaluru",
		date: "Nov 12 · 6:30 PM",
		place: "Bengaluru",
		icon: MapPin
	},
	{
		id: 3,
		title: "Ask a Design Lead (AMA)",
		date: "Nov 18 · 5:00 PM",
		place: "Online",
		icon: Video
	}
];
var groups = [
	{
		name: "UI/UX Designers India",
		members: "12.4k"
	},
	{
		name: "React Developers",
		members: "8.9k"
	},
	{
		name: "Women in Tech Leadership",
		members: "5.1k"
	}
];
var tabs = [
	"All",
	"Mentors",
	"Peers"
];
var initials = (n) => n.split(" ").map((p) => p[0]).join("");
function Networking() {
	const [q, setQ] = (0, import_react.useState)("");
	const [tab, setTab] = (0, import_react.useState)("All");
	const [connected, setConnected] = (0, import_react.useState)([]);
	const [going, setGoing] = (0, import_react.useState)([]);
	const [joined, setJoined] = (0, import_react.useState)([]);
	const toggle = (arr, v, set) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
	const list = people.filter((p) => (tab === "All" || tab === "Mentors" === p.mentor) && `${p.name} ${p.role} ${p.company}`.toLowerCase().includes(q.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mb-5 flex flex-wrap items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
			className: "text-xl font-bold",
			children: "Networking"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 95,
			columnNumber: 14
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-xs text-muted-foreground",
			children: "Meet mentors and peers who can help you grow."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 95,
			columnNumber: 63
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 95,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex gap-2 text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "rounded-full bg-lilac px-3 py-1 font-semibold text-violet",
				children: [48 + connected.length, " connections"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 97,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "rounded-full bg-butter px-3 py-1 font-semibold",
				children: [going.length, " events"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 98,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 96,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 94,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid items-start gap-6 xl:grid-cols-[1fr_300px]",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "section-surface border",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-5 flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "flex min-w-56 flex-1 items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "h-4 w-4 text-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 106,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Search people, roles, companies…",
							className: "w-full bg-transparent outline-none"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 107,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 105,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-2",
						children: tabs.map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => setTab(t),
							className: tab === t ? "bg-lilac text-violet" : "",
							children: t
						}, t, false, {
							fileName: _jsxFileName,
							lineNumber: 109,
							columnNumber: 56
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 109,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 104,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mb-3 flex items-center gap-1.5 text-xs font-semibold text-violet",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 111,
						columnNumber: 91
					}, this), "Suggested for you"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 111,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: [list.map((p) => {
						const isC = connected.includes(p.id);
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
							className: "flex flex-col items-center rounded-2xl border bg-card p-4 text-center transition hover:-translate-y-0.5 hover:shadow-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: `grid h-14 w-14 place-items-center rounded-full text-lg font-bold ${p.color}`,
									children: initials(p.name)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 116,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "mt-3 font-semibold",
									children: p.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 117,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										p.role,
										" · ",
										p.company
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 118,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-2 flex items-center gap-2 text-[10px]",
									children: [p.mentor && /* @__PURE__ */ (void 0)("span", {
										className: "rounded-full bg-mint px-2 py-0.5 font-semibold text-primary-foreground",
										children: "Mentor"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 120,
										columnNumber: 34
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground",
										children: [p.mutual, " mutual connections"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 121,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 119,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-4 flex w-full gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										size: "sm",
										className: "flex-1",
										variant: isC ? "outline" : "default",
										onClick: () => toggle(connected, p.id, setConnected),
										children: isC ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserCheck, {}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 124,
											columnNumber: 159
										}, this), "Connected"] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 124,
											columnNumber: 157
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserPlus, {}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 124,
											columnNumber: 189
										}, this), "Connect"] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 124,
											columnNumber: 187
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 124,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										size: "icon",
										variant: "outline",
										"aria-label": `Message ${p.name}`,
										className: "h-8 w-8",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, {}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 125,
											columnNumber: 112
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 125,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 123,
									columnNumber: 19
								}, this)
							]
						}, p.id, true, {
							fileName: _jsxFileName,
							lineNumber: 115,
							columnNumber: 20
						}, this);
					}), list.length === 0 && /* @__PURE__ */ (void 0)("p", {
						className: "col-span-full py-10 text-center text-sm text-muted-foreground",
						children: "No people match your search."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 129,
						columnNumber: 35
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 112,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 103,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border bg-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "mb-3 flex items-center gap-2 text-sm font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CalendarDays, { className: "h-4 w-4 text-violet" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 135,
						columnNumber: 80
					}, this), "Upcoming events"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 135,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
					className: "space-y-3",
					children: events.map((e) => {
						const g = going.includes(e.id);
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
							className: "rounded-xl bg-muted p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm font-medium",
									children: e.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 140,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 flex items-center gap-1 text-[11px] text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(e.icon, { className: "h-3 w-3" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 141,
											columnNumber: 99
										}, this),
										e.place,
										" · ",
										e.date
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 141,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									size: "sm",
									variant: g ? "outline" : "default",
									className: "mt-2 h-7 w-full text-xs",
									onClick: () => toggle(going, e.id, setGoing),
									children: g ? "You're going ✓" : "RSVP"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 142,
									columnNumber: 21
								}, this)
							]
						}, e.id, true, {
							fileName: _jsxFileName,
							lineNumber: 139,
							columnNumber: 22
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 136,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 134,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border bg-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "mb-3 flex items-center gap-2 text-sm font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "h-4 w-4 text-violet" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 148,
						columnNumber: 80
					}, this), "Communities"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 148,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
					className: "space-y-2",
					children: groups.map((g) => {
						const j = joined.includes(g.name);
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "block text-sm",
								children: g.name
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 153,
								columnNumber: 27
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[11px] text-muted-foreground",
								children: [g.members, " members"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 153,
								columnNumber: 74
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 153,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								size: "sm",
								variant: "outline",
								className: `h-7 text-xs ${j ? "bg-lilac text-violet" : ""}`,
								onClick: () => toggle(joined, g.name, setJoined),
								children: j ? "Joined" : "Join"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 154,
								columnNumber: 21
							}, this)]
						}, g.name, true, {
							fileName: _jsxFileName,
							lineNumber: 152,
							columnNumber: 22
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 149,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 147,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 133,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 102,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 93,
		columnNumber: 10
	}, this);
}
export { Networking as component };
