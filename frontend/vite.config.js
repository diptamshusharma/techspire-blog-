import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration: we only need the React plugin
export default defineConfig({
  plugins: [react()],
});
