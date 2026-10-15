import { defineConfig } from 'astro/config';

// Statisk sajt. Dev-servern lyssnar bara på 127.0.0.1 (guide/n1-forsta-sajten.md, Förhandsvisning).
export default defineConfig({
  output: 'static',
  // Stilmallen läggs i varje sida, så att första besöket slipper en blockerande hämtning (Lighthouse: render-blocking).
  // Den är liten, och de flesta besök på en liten firmas sajt är första besök (Johnny 2026-10-16: så hög prestanda som möjligt).
  build: { inlineStylesheets: 'always' },
  server: { host: '127.0.0.1' },
});
