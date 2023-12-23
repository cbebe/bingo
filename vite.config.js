// @ts-check
import { resolve } from "path";
import { defineConfig } from "vite";
import pluginPurgeCss from "@mojojoejo/vite-plugin-purgecss";

export default defineConfig({
  base: "/bingo/",
  resolve: {
    alias: {
      "~bootstrap": resolve(__dirname, "node_modules/bootstrap"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        card: resolve(__dirname, "card.html"),
      },
    },
  },
  plugins: [pluginPurgeCss({ variables: true })],
});
