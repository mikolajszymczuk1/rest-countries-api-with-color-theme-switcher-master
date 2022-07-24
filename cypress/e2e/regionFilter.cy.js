describe('Region filter', () => {
  it('visits the app root url', () => {
    cy.visit('/');
  });

  it('should show only cards from selected region', () => {
    cy.viewport(1440, 1080);
    cy.get('[data-test=selected-region]').click();
    for (let i = 0; i < 5; i += 1) {
      cy.get('[data-test=filter-item]').eq(i).click()
        .then((item) => {
          cy.wrap(item).invoke('text').then((text) => {
            cy.get('[data-test=country-card]').each(($card) => {
              cy
                .wrap($card)
                .find('[data-test=country-region]')
                .should('have.text', `Region: ${text}`);
            });
          });
        });

      cy.get('[data-test=selected-region]').click();
    }

    cy.get('[data-test=selected-region]').click();
  });
});
