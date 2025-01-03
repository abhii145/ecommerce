import type { Config } from "jest"

const config: Config = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transform TypeScript files with ts-jest
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.svg$": "<rootDir>/__mocks__/fileMock.js",
    "^@/(.*)$": "<rootDir>/src/$1", // Adjust paths if needed
  },
  collectCoverage: true, // Enable coverage collection
  coverageDirectory: "coverage", // Output directory for coverage
  coverageReporters: ["text", "html"], // Generate text and HTML coverage reports
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}", // Include source files for coverage
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/coverage/**",
    "!**/*.config.{js,ts}",
    "!playwright/**", // Exclude all Playwright spec files
    "!src/App.tsx",
    "!src/main.tsx",
    "!src/vite-env.d.ts",
    "!src/hooks/index.ts",
    "!src/hooks/usePromoCode.ts",
    "!src/pages/Home.tsx",
    "!src/store/store.ts",
    "!src/store/cartSlice.ts",
    "!src/store/favoritesSlice.ts",
    "!src/store/promoCodeSlice.ts",
    "!src/store/recentlyViewedSlice.ts",
    "!src/store/ordersSlice.ts",
    "!src/utils/categoryImages.ts",
    "!src/components/index.ts",
    "!src/pages/index.ts",
    "!src/utils/downloadPdf.ts",
  ],
  coverageThreshold: {
    global: {
      statements: 77, // Enforce coverage thresholds
      branches: 70,
      functions: 75,
      lines: 77,
    },
  },
}

export default config
