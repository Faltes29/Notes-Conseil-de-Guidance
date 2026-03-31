import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// REMPLACEZ 'nom-de-votre-depot' par le nom réel de votre projet sur GitHub
export default defineConfig(() => ({
  base: "./", // Utiliser des chemins relatifs pour plus de flexibilité
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [dyadComponentTagger(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));