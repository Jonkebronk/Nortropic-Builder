import { defineConfig } from 'astro/config';

// Statisk sajt. Dev-servern lyssnar bara på 127.0.0.1 (guide/n1-forsta-sajten.md, Förhandsvisning).
export default defineConfig({
  output: 'static',
  server: { host: '127.0.0.1' },
});
