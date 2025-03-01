// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from "@astrojs/react";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  integrations: [
    mdx({
      // Enable .mdx files to use imports and exports
      extendMarkdownConfig: true,
      // Ensure .mdx files can use layouts and other features
      recmaPlugins: [],
    }), 
    react()
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
  vite: {
    build: {
      rollupOptions: {
        input: {
          main: 'src/scripts/*',
          // Add other script entry points as needed
        },
      },
    },
  },
});
