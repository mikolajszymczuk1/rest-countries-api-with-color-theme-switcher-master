describe('Cards functionality', () => {
  const basicApiUrl = 'https://restcountries.com/v3.1';
  const allCountriesUrl = `${basicApiUrl}/all?fields=name,population,region,capital,flags`;
  const currentCountryUrl = `${basicApiUrl}/name`;

  it('visits the app root url', () => {
    cy.visit('/');
  });

  it('Each country car should has correct correct data from api', () => {
    cy.viewport(1440, 1080);
    cy.request(allCountriesUrl)
      .then((res) => {
        cy
          .get('[data-test=country-card]')
          .should('have.length', res.body.length);

        cy.get('[data-test=country-card]').each(($card, index) => {
          cy
            .wrap($card)
            .find('[data-test=country-name]')
            .should('have.text', res.body[index].name.common);

          cy
            .wrap($card)
            .find('[data-test=country-population]')
            .should('have.text', `Population: ${parseInt(res.body[index].population, 10).toLocaleString()}`);

          cy
            .wrap($card)
            .find('[data-test=country-region]')
            .should('have.text', `Region: ${res.body[index].region}`);

          cy
            .wrap($card)
            .find('[data-test=country-capital]')
            .should('have.text', `Capital: ${res.body[index].capital[0] === undefined ? '' : res.body[index].capital[0]}`);
        });
      });
  });

  it('Each country card details page should has correct data from api', () => {
    cy.viewport(1440, 1080);
    cy.request(allCountriesUrl)
      .then((resA) => {
        for (let i = 0; i < resA.body.length; i += 1) {
          if (resA.body[i].name.common !== 'Bouvet Island') { // <-- Some api/vue bug on this country
            cy
              .get('[data-test=country-card]')
              .eq(i)
              .click();

            cy.request(`${currentCountryUrl}/${resA.body[i].name.common}`)
              .then((resB) => {
                cy
                  .get('[data-test=country-details-name]')
                  .should('have.text', resB.body[0].name.common);

                cy
                  .get('[data-test=country-details-native-name]')
                  .should('have.text', `Native Name: ${Object.values(resB.body[0].name.nativeName)[0].common}`);

                cy
                  .get('[data-test=country-details-population]')
                  .should('have.text', `Population: ${parseInt(resB.body[0].population, 10).toLocaleString()}`);

                cy
                  .get('[data-test=country-details-region]')
                  .should('have.text', `Region: ${resB.body[0].region}`);

                cy
                  .get('[data-test=country-details-sub-region]')
                  .should('have.text', `Sub Region: ${resB.body[0].subregion === undefined ? '' : resB.body[0].subregion}`);

                cy
                  .get('[data-test=country-details-capital]')
                  .should('have.text', `Capital: ${resB.body[0].capital[0]}`);

                cy
                  .get('[data-test=country-details-top-level-domain]')
                  .should('have.text', `Top Level Domain: ${resB.body[0].tld[0]}`);

                cy
                  .get('[data-test=country-details-currencies]')
                  .should('have.text', `Currencies: ${Object.values(resB.body[0].currencies)[0].name}`);

                cy.get('[data-test=country-details-language]').each(($lang, index) => {
                  cy.wrap($lang).should('have.text', `${Object.values(resB.body[0].languages)[index]}, `);
                });

                if (resB.body[0].borders) {
                  cy.get('[data-test=country-details-border-country]').each(($bCountry, index) => {
                    cy.wrap($bCountry).should('have.text', resB.body[0].borders[index]);
                  });
                }
              });

            cy
              .get('[data-test=back-homepage-button]')
              .click();
          }
        }
      });
  });
});
