/// <reference types="cypress" />
import "@testing-library/cypress/add-commands";

const USER_DB = { username: "test", password: "1234" };

const login = (username: string, password: string) => {
  cy.visit("/login");

  cy.findByLabelText("username").type(username);
  cy.findByLabelText("password").type(password);

  cy.findByRole("button", { name: "로그인" }).click();

  cy.url().should("eq", Cypress.config("baseUrl") + "/");
};

Cypress.Commands.add(
  "login",
  (username = USER_DB.username, password = USER_DB.password) => {
    login(username, password);
  }
);

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(username?: string, password?: string): Chainable<void>;
    }
  }
}
