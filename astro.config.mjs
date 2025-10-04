// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from "@astrojs/react";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import sitemap from '@astrojs/sitemap';

import node from '@astrojs/node';

export default defineConfig({
  site: 'https://meillaya.com',
  server: {
    host: '0.0.0.0'
},
output: "static",
  integrations: [
    mdx({
      // Enable .mdx files to use imports and exports
      extendMarkdownConfig: true,
      // Ensure .mdx files can use layouts and other features
      recmaPlugins: [],
    }), 
    react(),
    sitemap()
  ],

  markdown: {
    syntaxHighlight: 'shiki',
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    // Explicitly allow HTML in Markdown
    remarkRehype: { allowDangerousHtml: true }
  },

  // Configure image optimization globally
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  adapter: node({
    mode: 'standalone',
  }),
});