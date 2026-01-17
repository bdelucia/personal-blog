import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import remarkWikiLinks from './src/lib/remark-wiki-links.mjs';

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkWikiLinks],
  },
  integrations: [
    svelte(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
  ],
  vite: {
    server: {
      watch: {
        ignored: ['**/.obsidian/**'],
      },
    },
  },
});
