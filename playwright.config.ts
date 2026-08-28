import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test/playwright/Scripts',
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    screenshot: 'on',
    video: 'off',
  },
  reporter: [['html', { outputFolder: 'test/reports/playwright' }], ['list']],
});
