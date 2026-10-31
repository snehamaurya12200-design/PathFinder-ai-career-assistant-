import { r as HTTPResponse } from "../_libs/h3+rou3+srvx.mjs";
// #nitro/virtual/renderer-template
var rendererTemplate = () => new HTTPResponse("<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Pathfinder</title>\n    <meta name=\"description\" content=\"Your career journey, made clearer.\" />\n    <meta property=\"og:title\" content=\"Pathfinder\" />\n    <meta property=\"og:description\" content=\"Your career journey, made clearer.\" />\n    <meta property=\"og:type\" content=\"website\" />\n    <meta name=\"twitter:card\" content=\"summary_large_image\" />\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.tsx\"><\/script>\n  </body>\n</html>\n\n", { headers: { "content-type": "text/html; charset=utf-8" } });
// node_modules/nitro/dist/runtime/internal/routes/renderer-template.mjs
function renderIndexHTML(event) {
	return rendererTemplate(event.req);
}
export { renderIndexHTML as default };
