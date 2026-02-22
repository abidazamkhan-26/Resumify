import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }) => ({
  server: command === "serve" ? { port: 3004 } : undefined,
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
}));
