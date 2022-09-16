import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://devtd2.talentdigit.al",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
