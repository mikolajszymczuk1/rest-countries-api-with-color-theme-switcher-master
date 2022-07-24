describe('Dark mode', () => {
  it('visits the app root url', () => {
    cy.visit('/');
  });

  it('should correctly set dark mode and save dark mode state to local storage', () => {
    cy.viewport(1440, 1080);

    cy
      .get('html')
      .should('not.have.class', 'dark');

    cy
      .get('[data-test=dark-mode-button]')
      .as('darkMode')
      .click();

    cy
      .get('html')
      .should('have.class', 'dark');

    cy.reload();

    cy
      .get('html')
      .should('have.class', 'dark');

    cy.get('@darkMode').click();

    cy
      .get('html')
      .should('not.have.class', 'dark');

    cy.reload();

    cy
      .get('html')
      .should('not.have.class', 'dark');
  });
});
