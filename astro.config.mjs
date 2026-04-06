// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  base: import.meta.env.BASE_URL || '/',
  site: 'https://letterformat.in',
  integrations: [sitemap()],
});
