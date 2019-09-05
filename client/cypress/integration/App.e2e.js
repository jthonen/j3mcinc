/* eslint-disable no-undef */
Cypress.env('RETRIES', 2);

describe('App E2E', () => {
    it("should have a div with an id='NavigationBar' and className='row'", () => {
        cy.visit('/', { timeout: 80000 });
        cy.get('div#NavigationBar').should("have.class", "row");
    });
});
