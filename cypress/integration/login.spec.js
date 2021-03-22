/// <reference types="cypress" />

describe('Logging In Test Account', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('#email').type('justin1@email.com')
    cy.get('#password').type('123456')
    cy.get('#login').click()
  });
})