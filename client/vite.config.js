import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { createRequire } from "module";

globalThis.require = createRequire(import.meta.url);

export default defineConfig(async ({ command }) => {
  const plugins = [react()];

  if (command === "build") {
    const { default: vitePrerender } = await import("vite-plugin-prerender");
    const Renderer = vitePrerender.PuppeteerRenderer;

    plugins.push(
      vitePrerender({
        staticDir: path.join(__dirname, "dist"),

        routes: [
          "/",
          "/agents/agent-charlotte",
          "/agents/agent-ethan",
          "/agents/agent-benoit",
          "/agents/agent-amandine",
          "/agents/agent-margot",
          "/agents/agent-arthur",
          "/agents/agent-elisa",
          "/agents/agent-samy",
        ],

        renderer: new Renderer({
          renderAfterDocumentEvent: "prerender-ready",
          maxConcurrentRoutes: 4,
          timeout: 15000,
        }),
      })
    );
  }

  return { plugins };
});