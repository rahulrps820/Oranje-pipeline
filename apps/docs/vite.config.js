import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The docs app renders the library from source rather than from a build artefact: there is no
// build step in this package (`main: src/index.ts`, `tsc --noEmit`), and pointing Vite at the
// source means a component edit shows up on the page without a publish.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
});
