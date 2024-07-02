import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default: 'nx run final-project:serve',
        production: 'nx run final-project:preview',
      },
      ciWebServerCommand: 'nx run final-project:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
