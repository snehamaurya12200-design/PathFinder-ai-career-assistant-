globalThis.__nitro_main__ = import.meta.url;
import { t as HookableCore } from "./_libs/hookable.mjs";
import { i as defineLazyEventHandler, n as HTTPError, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
// #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
// #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-10-31T12:44:34.628Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-10-31T12:44:34.628Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/AppShell-DFOF2jj8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a28-wxHvNt+ty/8/Y+UhMoO8n/adO1I\"",
		"mtime": "2026-10-31T12:44:33.639Z",
		"size": 10792,
		"path": "../public/assets/AppShell-DFOF2jj8.js"
	},
	"/assets/SectionShell-_zXhrpjq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"398-63drhG9e0OuHhJxznxdRx8voXUA\"",
		"mtime": "2026-10-31T12:44:33.639Z",
		"size": 920,
		"path": "../public/assets/SectionShell-_zXhrpjq.js"
	},
	"/assets/SkillRadar-BHzRKv_A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"810-AlYhppBdn55xWFWblQR/fwszKVI\"",
		"mtime": "2026-10-31T12:44:33.639Z",
		"size": 2064,
		"path": "../public/assets/SkillRadar-BHzRKv_A.js"
	},
	"/assets/assistant-CbEFIm1c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13ea-npQYngumpG7X8q9mAHOCGANxzb4\"",
		"mtime": "2026-10-31T12:44:33.639Z",
		"size": 5098,
		"path": "../public/assets/assistant-CbEFIm1c.js"
	},
	"/assets/blob-BTfvu_Jc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31-jl2IqUU5YTz0uY97nFBYEwUbMVs\"",
		"mtime": "2026-10-31T12:44:33.639Z",
		"size": 49,
		"path": "../public/assets/blob-BTfvu_Jc.js"
	},
	"/assets/blob-Df5TiUuQ.png": {
		"type": "image/png",
		"etag": "\"73992-Y06wPVLVERVw/XJtzWLl6edmPVE\"",
		"mtime": "2026-10-31T12:44:33.640Z",
		"size": 473490,
		"path": "../public/assets/blob-Df5TiUuQ.png"
	},
	"/assets/circle-check-82_WziTQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa-hsZEFhT0WnHv2kDkS3riUVWEkq0\"",
		"mtime": "2026-10-31T12:44:33.639Z",
		"size": 170,
		"path": "../public/assets/circle-check-82_WziTQ.js"
	},
	"/assets/button-N2UgiB1j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7d05-cW4zsEeqHf/cuH9HDX2iYDnQOMc\"",
		"mtime": "2026-10-31T12:44:33.639Z",
		"size": 32005,
		"path": "../public/assets/button-N2UgiB1j.js"
	},
	"/assets/dialogs-BZSHWdY1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15ceb-G+e3IF2OqzhQDTgMYP1hr/qOEEU\"",
		"mtime": "2026-10-31T12:44:33.639Z",
		"size": 89323,
		"path": "../public/assets/dialogs-BZSHWdY1.js"
	},
	"/assets/dist-wvHVdidZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12bfd-BP+3oPAAGEH/+BVMIb/T5NZo0AA\"",
		"mtime": "2026-10-31T12:44:33.639Z",
		"size": 76797,
		"path": "../public/assets/dist-wvHVdidZ.js"
	},
	"/assets/interviews-BgmRl6aD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"291e-zKk9/lsyp6/vn+IfTC5d3Snz60w\"",
		"mtime": "2026-10-31T12:44:33.639Z",
		"size": 10526,
		"path": "../public/assets/interviews-BgmRl6aD.js"
	},
	"/assets/jobs-BlYoEQck.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2438-C7gjKIivZJQWsLAwt1mSdpfwLe4\"",
		"mtime": "2026-10-31T12:44:33.639Z",
		"size": 9272,
		"path": "../public/assets/jobs-BlYoEQck.js"
	},
	"/assets/jsx-dev-runtime-Bg3BdZo6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b136-ru2VErLXnH4HI1wnb3M+TkRDP1w\"",
		"mtime": "2026-10-31T12:44:33.639Z",
		"size": 45366,
		"path": "../public/assets/jsx-dev-runtime-Bg3BdZo6.js"
	},
	"/assets/learning-Cc3CPyIu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b75-cVqhJXO5w7Cn2nS8cRzS/U+mO7M\"",
		"mtime": "2026-10-31T12:44:33.639Z",
		"size": 23413,
		"path": "../public/assets/learning-Cc3CPyIu.js"
	},
	"/assets/lock-BOegkj4Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c6-dTSweC1JJJKbJATaPjudQ3l61cM\"",
		"mtime": "2026-10-31T12:44:33.640Z",
		"size": 198,
		"path": "../public/assets/lock-BOegkj4Y.js"
	},
	"/assets/map-pin-CEOUAzp2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b4-WWqOQFSkkf9JXJ2O469oRb12i4U\"",
		"mtime": "2026-10-31T12:44:33.640Z",
		"size": 692,
		"path": "../public/assets/map-pin-CEOUAzp2.js"
	},
	"/assets/mic-ZJa_h_nU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e3-UN1YYra15PLlFTFlOLWuGS7GFbU\"",
		"mtime": "2026-10-31T12:44:33.640Z",
		"size": 227,
		"path": "../public/assets/mic-ZJa_h_nU.js"
	},
	"/assets/networking-CfRAuRu6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2824-JPNr1OxLaIvInh85/4yIveFmxJE\"",
		"mtime": "2026-10-31T12:44:33.640Z",
		"size": 10276,
		"path": "../public/assets/networking-CfRAuRu6.js"
	},
	"/assets/play-2NqEHytu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-fqhguS7abBFEw1xcOFfRg0LLlnA\"",
		"mtime": "2026-10-31T12:44:33.640Z",
		"size": 259,
		"path": "../public/assets/play-2NqEHytu.js"
	},
	"/assets/roadmap-CC21roJV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"42d2-zhIMpjTu7Kb9qHNhJ2GQm5pQsYw\"",
		"mtime": "2026-10-31T12:44:33.640Z",
		"size": 17106,
		"path": "../public/assets/roadmap-CC21roJV.js"
	},
	"/assets/routes-5cvV9GXg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b0a-Ms2caVbnSKNjpGZZ5venwnKPy7g\"",
		"mtime": "2026-10-31T12:44:33.640Z",
		"size": 19210,
		"path": "../public/assets/routes-5cvV9GXg.js"
	},
	"/assets/index-nODNIv1t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8cce8-GXKG8icyx4vYihbzsBVWa5QfSXc\"",
		"mtime": "2026-10-31T12:44:33.639Z",
		"size": 576744,
		"path": "../public/assets/index-nODNIv1t.js"
	},
	"/assets/gem-Duh8pW0V.png": {
		"type": "image/png",
		"etag": "\"819d2-P1P8AhptvZtOxy8i6BZyRFbE06M\"",
		"mtime": "2026-10-31T12:44:33.641Z",
		"size": 530898,
		"path": "../public/assets/gem-Duh8pW0V.png"
	},
	"/assets/shapes-CG5F2UXs.png": {
		"type": "image/png",
		"etag": "\"7a48c-Deu87mZIWSXK2dkJi1eFHRidxKM\"",
		"mtime": "2026-10-31T12:44:33.641Z",
		"size": 500876,
		"path": "../public/assets/shapes-CG5F2UXs.png"
	},
	"/assets/styles-CtxrsPLg.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13e26-RlcX0RGuoasTHJ4wbGxFjbBfK/A\"",
		"mtime": "2026-10-31T12:44:33.641Z",
		"size": 81446,
		"path": "../public/assets/styles-CtxrsPLg.css"
	},
	"/assets/skills-tdewFmfK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11f0-grLNXmlB4V2pWhh6133jbxWyOO8\"",
		"mtime": "2026-10-31T12:44:33.640Z",
		"size": 4592,
		"path": "../public/assets/skills-tdewFmfK.js"
	},
	"/assets/target-DY1DLy55.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"da-autjzMy7rLOzHy1N3cuDlNuwSuQ\"",
		"mtime": "2026-10-31T12:44:33.640Z",
		"size": 218,
		"path": "../public/assets/target-DY1DLy55.js"
	},
	"/assets/x-BACSOo6U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1de-joHyV1HnauXQK0haFIV+9yfXc+w\"",
		"mtime": "2026-10-31T12:44:33.640Z",
		"size": 478,
		"path": "../public/assets/x-BACSOo6U.js"
	},
	"/assets/tile-FnTGXmeG.png": {
		"type": "image/png",
		"etag": "\"7f909-eTQY4k5EKTCyrEpGMpy0PiIYLmo\"",
		"mtime": "2026-10-31T12:44:33.642Z",
		"size": 522505,
		"path": "../public/assets/tile-FnTGXmeG.png"
	},
	"/assets/aistudio/lovable-project-8986ea04-752f-406b-86ad-f779e4b7a1fe-2026-10-31_89fb3343.zip": {
		"type": "application/zip",
		"etag": "\"21e85b-TPQGQwZqC1j5u3oErlmi6rM0we8\"",
		"mtime": "2026-10-31T12:44:34.630Z",
		"size": 2222171,
		"path": "../public/assets/aistudio/lovable-project-8986ea04-752f-406b-86ad-f779e4b7a1fe-2026-10-31_89fb3343.zip"
	}
};
// #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
// node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
// #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_6qWkqV = defineLazyEventHandler(() => import("./_chunks/renderer-template.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_6qWkqV
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
// node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
// #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
// #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
// node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
// node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
// node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
export { cloudflare_module_default as default };
