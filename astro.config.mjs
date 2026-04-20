// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [
    react(),
    sanity({
      // We pull from environment variables for privacy, with fallbacks for build stability
      projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'jatg6f0i',
      dataset: process.env.PUBLIC_SANITY_DATASET || 'wellness_cms',
      studioBasePath: '/studio', 
    }),
  ],
  build: {
    inlineStylesheets: 'always'
  },
  vite: {
    plugins: [tailwindcss()],
    define: {
      // Enables "speedy mode" for styled-components in development
      'process.env.SC_DISABLE_SPEEDY': 'false',
    },
    optimizeDeps: {
      // Explicitly include heavy dependencies to prevent re-bundling delays
      include: [
        'sanity',
        'styled-components',
        'react',
        'react-dom',
        '@sanity/ui',
        '@sanity/icons',
      ],
    },
  }
});