/* eslint-disable no-undef */
/// <reference types="cypress" />

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

describe("Watching a course", () => {
  beforeEach("Log in", () => {
    cy.visit("/login");
    cy.get("#email").type("justin1@email.com");
    cy.get("#password").type("123456");
    cy.get("#login").click();
  });

  it("user should be able to watch course 1", () => {
    cy.checkCourseVideo(1);
  });
  it("user should be able to watch course 2", () => {
    cy.checkCourseVideo(2);
  });
  it("user should be able to watch course 3", () => {
    cy.checkCourseVideo(3);
  });
});
