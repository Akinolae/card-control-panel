import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["echarts"],
    },
  },
  server: {
    port: 3002,
  },
  appType: "spa",
});
