import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { crearSlugs } from './extensiones/slugs';

export default defineConfig({
  publicDir: './estaticos',
  compressHTML: true,
  outDir: './publico',
  srcDir: './fuente',

  site: 'https://portafolio.juancgonzalez.com',
  base: '/',
  build: {
    assets: 'estaticos',
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },

  integrations: [mdx()],
  markdown: {
    remarkPlugins: [crearSlugs],
  },
});
