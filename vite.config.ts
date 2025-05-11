import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Sebastian_Swiderski_Web_Wroclaw/",
  plugins: [react()],
  optimizeDeps: {
    include: ["lucide-react"],
  },
});
