/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.fbx', '**/*.png'],
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@components", replacement: "/src/components" },
      { find: "@", replacement: "/src" },
    ],
  },
  test: {
    environment: "jsdom",
    globals: true,
  },
});
