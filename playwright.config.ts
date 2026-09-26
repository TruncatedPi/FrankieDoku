import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 15_000,
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4173/FrankieDoku/', reducedMotion: 'reduce', trace: 'retain-on-failure' },
  projects: [
    { name: 'chromium', testMatch: 'game.spec.ts', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', testMatch: 'game.spec.ts', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', testMatch: 'game.spec.ts', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chromium', testMatch: 'mobile.spec.ts', use: { ...devices['Pixel 7'] } },
  ],
  webServer: [
    { command: process.env.CI ? 'node scripts/serve-built.mjs' : 'npm run build && node scripts/serve-built.mjs', url: 'http://127.0.0.1:4173/FrankieDoku/', timeout: 120_000, reuseExistingServer: true },
    { command: 'npm run dev -- --host 127.0.0.1 --port 3173 --strictPort', url: 'http://127.0.0.1:3173', reuseExistingServer: true },
  ],
});
