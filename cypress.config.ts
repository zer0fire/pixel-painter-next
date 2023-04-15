import { defineConfig } from "cypress";

export default defineConfig({
  reporter: "junit",

  reporterOptions: {
    mochaFile: "results/test-[hash].xml",
    toConsole: true,
  },

  viewportHeight: 800,
  viewportWidth: 1600,

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on: any, config: any) {
      // implement node event listeners here
    },
  },
});
