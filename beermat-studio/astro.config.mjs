import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://beermat.studio',
  output: 'static',
  compressHTML: true,
  build: {
    // Inline the (small) stylesheet so nothing blocks first paint.
    inlineStylesheets: 'always',
  },
  devToolbar: { enabled: false },
});
