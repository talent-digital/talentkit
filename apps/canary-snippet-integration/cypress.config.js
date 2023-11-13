import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 8000,
  retries: {
    runMode: 2, // Configure retry attempts for `cypress run`
    openMode: 0, // Configure retry attempts for `cypress open`
  },
  e2e: {
    baseUrl: "http://localhost:8080",
    video: false,
    screenshotOnRunFailure: false,
  },
  env: {
    devUrl: "https://devtd2.talentdigit.al",
  },
});
