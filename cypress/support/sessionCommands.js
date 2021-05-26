/* eslint-disable no-undef */
/// <reference types="cypress" />

Cypress.Commands.add('startSession', () => {
  cy.get("#menu").click();
    cy.get("#train").click();
    cy.get(".MuiBackdrop-root").click();
    cy.get("#topic").click();
    cy.get("#Basketball").click();
    cy.get("#type").click();
    cy.get("#Workout").click();
    cy.get("#add-drill").click();
    cy.get("#mui-component-select-userDrill").click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.get(".MuiDialogContent-root > form > .MuiButtonBase-root").click();
    cy.get("#mui-component-select-userDrill").click();
    cy.get(".MuiList-root > :nth-child(2)").click();
    cy.get(".MuiDialogContent-root > form > .MuiButtonBase-root").click();
    cy.get('.MuiDialog-container').click()
    cy.get(".MuiPaper-root > .MuiIconButton-root").click();
    cy.get("#submit-button").click();
})

Cypress.Commands.add('finishSession', () => {
  cy.get(":nth-child(1) > .MuiInputBase-root > .MuiInputBase-input").type("9");
  cy.get(":nth-child(3) > .MuiInputBase-root > .MuiInputBase-input").type("10");
  cy.get(
    ".makeStyles-actionsContainer-237 > div > .MuiButtonBase-root"
  ).click();
  cy.get(":nth-child(1) > .MuiInputBase-root > .MuiInputBase-input").type("9");
  cy.get(":nth-child(3) > .MuiInputBase-root > .MuiInputBase-input").type("10");
  cy.get(
    ".makeStyles-actionsContainer-237 > div > .MuiButtonBase-root"
  ).click();
})

Cypress.Commands.add('postSession', () => {
  cy.get(":nth-child(5) > .MuiInputBase-root > .MuiInputBase-input").type(
    "Another great workout!"
  );
  cy.get(
    ":nth-child(2) > .MuiGrid-container > :nth-child(2) > .MuiButtonBase-root"
  ).click();
})
