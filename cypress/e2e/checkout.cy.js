/// <reference types='cypress' />

import PageObject from '../support/PageObject';
const { faker } = require('@faker-js/faker');

const pageObject = new PageObject();

const name = faker.person.firstName();
const country = faker.location.country();
const city = faker.location.city();
const creditCard = faker.finance.creditCardNumber();
const month = faker.date.month();
const year = faker.number.int({ min: 1900, max: 2025 });

describe('checkout', () => {
  before(() => {
    cy.visit('');
  });

  it('should show entered data in modal window after purchasing', () => {
    cy.contains(`[onclick="byCat('notebook')"]`, 'Laptops')
      .click();
    cy.contains('.card-title', 'Sony vaio i7')
      .click();
    cy.contains('a', 'Add to cart')
      .click();
    pageObject.assertAllert('Product added');
    cy.get('#cartur')
      .click();
    cy.contains('td', 'Sony vaio i7')
      .should('be.visible');
    cy.get('[data-target="#orderModal"]')
      .click();
    cy.get('#name')
      .type(name);
    cy.get('#country')
      .type(country);
    cy.get('#city')
      .type(city);
    cy.get('#card')
      .type(creditCard);
    cy.get('#month')
      .type(month);
    cy.get('#year')
      .type(year);
    cy.contains('button', 'Purchase')
      .click();
    cy.contains('h2', 'Thank you for your purchase!')
      .should('be.visible');
    cy.contains('.lead', name)
      .should('be.visible');
    cy.contains('.lead', creditCard)
      .should('be.visible');
    cy.contains('button', 'OK')
      .click();
  });
});
