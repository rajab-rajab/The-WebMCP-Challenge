const { mkdirSync, readFileSync, rmSync, writeFileSync } = require("node:fs");
const { join } = require("node:path");

const root = __dirname;
const dist = join(root, "dist");
const files = [
  ["/", "index.html", "text/html; charset=utf-8"],
  ["/index.html", "index.html", "text/html; charset=utf-8"],
  ["/styles.css", "styles.css", "text/css; charset=utf-8"],
  ["/app.js", "app.js", "text/javascript; charset=utf-8"]
];

const assets = Object.fromEntries(files.map(([url, file, type]) => [url, {
  body: readFileSync(join(root, file), "utf8"), type
}]));

const worker = `const assets = ${JSON.stringify(assets)};
export default {
  async fetch(request) {
    const path = new URL(request.url).pathname;
    const asset = assets[path];
    if (!asset) return new Response("Not found", { status: 404 });
    return new Response(asset.body, {
      headers: {
        "content-type": asset.type,
        "cross-origin-opener-policy": "same-origin",
        "cross-origin-embedder-policy": "require-corp",
        "permissions-policy": "tools=(self)",
        "cache-control": path === "/" || path === "/index.html" ? "no-cache" : "public, max-age=300"
      }
    });
  }
};\n`;

rmSync(dist, { recursive: true, force: true });
mkdirSync(join(dist, "server"), { recursive: true });
writeFileSync(join(dist, "server", "index.js"), worker);
console.log("Built Cloudflare-compatible Sites bundle.");
