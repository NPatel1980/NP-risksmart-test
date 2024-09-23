// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 2,
  use: {
    headless: false, // Set to false to see the browser
    screenshot: 'only-on-failure', // Optional: Take a screenshot on failure
  },
  outputDir: 'screenshots/failures', // Optional: Output directory for screenshots
  // Optional: Specify projects for different browsers
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
});
