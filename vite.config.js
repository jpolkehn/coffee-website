import { resolve } from "path";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";
import htmlImages from "vite-plugin-html-images";
import handlebars from "vite-plugin-handlebars";

module.exports = defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cafe: resolve(__dirname, "src/pages/cafe.html"),
        contact: resolve(__dirname, "src/pages/contact.html"),
        herkunft: resolve(__dirname, "src/pages/herkunft.html"),
        impressum: resolve(__dirname, "src/pages/impressum.html"),
        product: resolve(__dirname, "src/pages/product.html"),
        shop: resolve(__dirname, "src/pages/shop.html"),
      },
    },
  },
  plugins: [
    imagetools(),
    htmlImages(),
    handlebars({ partialDirectory: resolve(__dirname, "src/components") }),
  ],
});
