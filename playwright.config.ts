import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./playwright",
  fullyParallel: false, // Ensure tests do not run in parallel
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Ensure only one worker is used
  reporter: [["html"], ["allure-playwright"]],
  use: {
    trace: "on-first-retry",
    screenshot: "on",
    headless: false,
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport:
          process.env.CI === "true"
            ? { width: 1920, height: 1080 }
            : { width: 1700, height: 900 },
      },
    },
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
  ],
})
