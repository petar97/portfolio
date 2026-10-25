import { defineConfig, devices } from "@playwright/test";

const PORT = 4173;

// Tests run against the production static export (basePath /portfolio), not the dev server
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://127.0.0.1:${PORT}/portfolio/`,
    trace: "retain-on-failure",
  },
  // Viewport is past the xl breakpoint, so the desktop nav is visible
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } }],
  webServer: {
    // CI builds in an earlier step; locally, build first so tests never hit a stale export
    command: process.env.CI ? "node e2e/serve.mjs" : "npm run build && node e2e/serve.mjs",
    url: `http://127.0.0.1:${PORT}/portfolio/`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
