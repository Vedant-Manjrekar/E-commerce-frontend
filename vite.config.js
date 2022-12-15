import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

devServer: {
  historyApiFallback: true;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
