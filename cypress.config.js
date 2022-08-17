/* eslint-disable no-unused-vars */
const { defineConfig } = require("cypress");
// import admin from "firebase-admin";
// import { plugin as cypressFirebasePlugin } from "cypress-firebase";

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "vue-cli",
      bundler: "webpack",
    },
  },
  //   e2e: {
  //     baseUrl: "http://localhost:8080",
  //     supportFile: "cypress/support/e2e/e2e.js",
  //     setupNodeEvents(on, config) {
  //       cypressFirebasePlugin(on, config, admin);
  //       // e2e testing node events setup code
  //     },
  //   },
});
