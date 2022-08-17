// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:

import "./commands";
import "../../src/main";
import "../../node_modules/vuex";

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from "cypress/vue2";

Cypress.Commands.add("mount", mount);

import Vue from "vue";
import VueRouter from "vue-router";
import { router } from "../../src/router";

Cypress.Commands.add("mount", (component, options = {}) => {
  // Add the VueRouter plugin
  Vue.use(VueRouter);

  // Use the router passed in via options,
  // or the default one if not provided
  options.router = options.router || router;

  return mount(component, options);
});

// import Vuex from "vuex";
// import { store } from "../../src/store/index";

// Cypress.Commands.add("mount", (component, store) => {
// Setup options object
//   options.extensions = options.extensions || {};
//   options.extensions.plugins = options.extensions.plugins || [];

// Use store passed in from options, or initialize a new one
//   options.store = options.store || getStore();

// Add Vuex plugin
//   options.extensions.plugins.push(Vuex);

//   return mount(component, store);
// });
// Example use:
// cy.mount(MyComponent)
