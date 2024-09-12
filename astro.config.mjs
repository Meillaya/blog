// @ts-check
import { defineConfig } from 'astro/config';


export default defineConfig({

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
