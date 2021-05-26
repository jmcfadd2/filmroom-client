/* eslint-disable no-undef */
/// <reference types="cypress" />

describe("session test suite", () => {
  beforeEach(() => {
    cy.loginTestUser();
  });
  it("should create and post session", () => {
    cy.startSession()
    cy.finishSession()
    cy.postSession()
  });
});
