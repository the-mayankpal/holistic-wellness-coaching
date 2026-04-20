import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'Wellness Coaching Studio',
  icon: () => (
    Object.assign(document.createElement('div'), {
      innerHTML: `<svg width="25" height="25" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="19" r="8.5" stroke="#9c512c" stroke-width="2.5" />
        <circle cx="24" cy="29" r="8.5" stroke="#9c512c" stroke-width="2.5" />
        <circle cx="19" cy="24" r="8.5" stroke="#9c512c" stroke-width="2.5" />
        <circle cx="29" cy="24" r="8.5" stroke="#9c512c" stroke-width="2.5" />
        <rect x="22.5" y="22.5" width="3" height="3" fill="none" stroke="#9c512c" stroke-width="2.5" transform="rotate(45 24 24)" />
      </svg>`
    }).firstChild
  ),

  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  basePath: '/studio',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
