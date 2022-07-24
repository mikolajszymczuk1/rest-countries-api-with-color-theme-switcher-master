describe('Search bar', () => {
  const basicApiUrl = 'https://restcountries.com/v3.1';
  const allCountriesUrl = `${basicApiUrl}/all?fields=name,population,region,capital,flags`;

  it('visits the app root url', () => {
    cy.visit('/');
  });

  it('should correctly filter countries cards by typed string in search bar', () => {
    cy.viewport(1440, 1080);
    cy.request(allCountriesUrl)
      .then((res) => {
        for (let i = 0; i < res.body.length; i += 1) {
          cy.get('[data-test=search-country-input]').as('input').type(res.body[i].name.common);

          cy.get('[data-test=country-card]').each(($card) => {
            cy
              .wrap($card)
              .find('[data-test=country-name]')
              .should('contain', res.body[i].name.common);
          });

          cy.get('@input').clear();
        }
      });
  });
});
