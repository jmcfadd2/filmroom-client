/* eslint-disable no-undef */
/// <reference types="cypress" />


describe("Watching a course", () => {
  beforeEach("Log in", () => {
    cy.loginTestUser()
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
