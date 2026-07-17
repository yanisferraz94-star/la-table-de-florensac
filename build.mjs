import { cp, mkdir, rm, writeFile } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await mkdir("dist/client", { recursive: true });
for (const file of ["index.html", "styles.css", "script.js"]) {
  await cp(file, `dist/client/${file}`);
}
await cp("images", "dist/client/images", { recursive: true });
await cp(".openai", "dist/.openai", { recursive: true });
await mkdir("dist/server", { recursive: true });
await writeFile("dist/server/index.js", `
export default {
  async fetch(request, env) {
    if (env?.ASSETS?.fetch) {
      const url = new URL(request.url);
      if (url.pathname === "/") url.pathname = "/index.html";
      return env.ASSETS.fetch(new Request(url, request));
    }
    return new Response("Site indisponible", { status: 503 });
  }
};
`);
