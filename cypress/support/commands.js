/* eslint-disable no-undef */
/// <reference types="cypress" />
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("checkCourseVideo", (idx) => {
  cy.get("#menu").click();
  cy.get("#courses").click();
  cy.get(".MuiBackdrop-root").click();
  cy.get(`#course${idx}`).click();
  cy.get(".MuiButton-label").click();
  cy.get(".react-player__play-icon").click();
  cy.wait(5000);
  cy.get("video").its("0.paused").should("eq", false);
});

Cypress.Commands.add('loginTestUser', () => {
  cy.visit("/login");
  cy.get("#email").type("justin1@email.com");
  cy.get("#password").type("123456");
  cy.get("#login").click();
})
