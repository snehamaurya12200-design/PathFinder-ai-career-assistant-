import { a as TSS_SERVER_FUNCTION, i as createServerFn } from "./server-B0s_tX_D.mjs";
import { a as stringType, i as objectType, n as enumType, t as arrayType } from "../_libs/zod.mjs";
import processModule from "node:process";
// node_modules/.nitro/vite/services/ssr/assets/ai.functions-DllCcBDA.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var Input = objectType({
	system: stringType().max(4e3),
	messages: arrayType(objectType({
		role: enumType(["user", "assistant"]),
		content: stringType().max(6e3)
	})).max(40)
});
/** Calls Lovable AI Gateway (streamed SSE, consumed server-side) and returns the final text. */
var askAI_createServerFn_handler = createServerRpc({
	id: "e6ce4f300af1ec33e34c8b840a63975ac94b41ab18b9a6fbe88567a0e0ab07f8",
	name: "askAI",
	filename: "src/lib/ai.functions.ts"
}, (opts) => askAI.__executeServer(opts));
var askAI = createServerFn({ method: "POST" }).inputValidator((d) => Input.parse(d)).handler(askAI_createServerFn_handler, async ({ data }) => {
	const key = processModule.env.LOVABLE_API_KEY;
	if (!key) return {
		ok: false,
		error: "AI is not configured."
	};
	const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Lovable-API-Key": key,
			"X-Lovable-AIG-SDK": "fetch"
		},
		body: JSON.stringify({
			model: "openai/gpt-6-astra",
			instructions: data.system,
			input: data.messages.map((m) => ({
				role: m.role,
				content: m.content
			})),
			reasoning: { effort: "low" },
			store: false,
			stream: true
		})
	});
	if (!res.ok || !res.body) {
		let msg = `AI request failed (${res.status}).`;
		try {
			const j = await res.json();
			msg = j?.error?.message ?? j?.message ?? msg;
		} catch {}
		if (res.status === 402) msg = "AI credits have run out for this workspace. " + msg;
		if (res.status === 429) msg = "Too many requests — please wait a moment and try again.";
		return {
			ok: false,
			error: msg
		};
	}
	const reader = res.body.getReader();
	const dec = new TextDecoder();
	let buf = "", text = "";
	for (;;) {
		const { value, done } = await reader.read();
		if (done) break;
		buf += dec.decode(value, { stream: true });
		const lines = buf.split("\n");
		buf = lines.pop() ?? "";
		for (const line of lines) {
			if (!line.startsWith("data:")) continue;
			const payload = line.slice(5).trim();
			if (!payload || payload === "[DONE]") continue;
			try {
				const ev = JSON.parse(payload);
				if (ev.type === "response.output_text.delta") text += ev.delta ?? "";
				if (ev.type === "error" || ev.type === "response.failed") return {
					ok: false,
					error: ev.error?.message ?? ev.response?.error?.message ?? "AI error."
				};
			} catch {}
		}
	}
	if (!text.trim()) return {
		ok: false,
		error: "The assistant could not answer that request."
	};
	return {
		ok: true,
		text: text.trim()
	};
});
export { askAI_createServerFn_handler };
