import path from "path";
import { fileURLToPath } from "url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss(), visualizer({ sourcemap: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            const parts = id.split("node_modules/");
            const name = parts[parts.length - 1]
              .split("/")[0]
              .replace(/@/g, "");
            return `vendor.${name.replace("/", "_")}`;
          }
        },
      },
    },
  },
});
