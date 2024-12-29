// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from "@astrojs/react";

export default defineConfig({
  integrations: [mdx(), react()],
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
