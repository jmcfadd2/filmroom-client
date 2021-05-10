/// <reference types="cypress" />

describe('Create and Stage Session', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('#email').type('justin1@email.com')
    cy.get('#password').type('123456')
    cy.get('#login').click()
    cy.get('#menu').click()

  });

  it('Start Workout', () => {
    cy.get('#train').click()
    cy.get('#topic').type('0')
    cy.get('#type').type('0')
    
  })

})